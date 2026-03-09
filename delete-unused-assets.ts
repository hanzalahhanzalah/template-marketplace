/**
 * This script will find and delete all assets (images and files) that are not referenced by any document.
 * It's useful for cleaning up after deleting documents that had images attached.
 */
import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ath1uvh6',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    token: process.env.SANITY_API_READ_TOKEN, // Assuming they might have this, but let's try with write token if possible
    apiVersion: '2023-05-03',
    useCdn: false,
})

const query = `
  *[ _type in ["sanity.imageAsset", "sanity.fileAsset"] ]
  {_id, "refs": count(*[references(^._id)])}
  [refs == 0]
  ._id
`

async function deleteUnusedAssets() {
    console.log('Fetching unused assets...')

    try {
        const assetIds = await client.fetch(query)
        console.log(`Found ${assetIds.length} unused assets.`)

        if (assetIds.length === 0) {
            console.log('No unused assets to delete.')
            return
        }

        console.log('Deleting assets...')

        // Delete in batches to avoid overwhelming the API
        const batchSize = 10
        for (let i = 0; i < assetIds.length; i += batchSize) {
            const batch = assetIds.slice(i, i + batchSize)
            const transaction = client.transaction()

            batch.forEach(id => {
                transaction.delete(id)
            })

            await transaction.commit()
            console.log(`Deleted batch ${i / batchSize + 1} of ${Math.ceil(assetIds.length / batchSize)}`)
        }

        console.log('Done deleting unused assets.')
    } catch (err) {
        console.error('Error fetching/deleting unused assets:', err)
    }
}

deleteUnusedAssets()
