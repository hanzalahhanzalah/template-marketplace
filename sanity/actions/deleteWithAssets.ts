import { useState, useCallback } from 'react';
import { useClient, DocumentActionComponent, DocumentActionProps } from 'sanity';
import { TrashIcon } from '@sanity/icons';

interface AssetReference {
    _ref: string;
}

export function createDeleteWithAssetsAction(originalDeleteAction: DocumentActionComponent) {
    return (props: DocumentActionProps) => {
        const originalResult = originalDeleteAction(props);
        const [isDeleting, setIsDeleting] = useState(false);
        const client = useClient({ apiVersion: '2023-05-03' });

        const onHandle = useCallback(async () => {
            setIsDeleting(true);

            try {
                // 1. Fetch the document to find referenced assets
                const doc = await client.getDocument(props.id);

                if (doc) {
                    // Setup a transaction
                    const transaction = client.transaction();

                    // Find all image references in the document
                    // This is a simple recursive function to find all _type: 'image' or _type: 'file' references
                    const findAssetRefs = (obj: unknown): string[] => {
                        let refs: string[] = [];
                        if (!obj || typeof obj !== 'object') return refs;

                        const typedObj = obj as Record<string, unknown>;

                        if (typedObj._type === 'image' && typedObj.asset) {
                            const asset = typedObj.asset as AssetReference;
                            if (asset._ref) refs.push(asset._ref);
                        }
                        if (typedObj._type === 'file' && typedObj.asset) {
                            const asset = typedObj.asset as AssetReference;
                            if (asset._ref) refs.push(asset._ref);
                        }

                        for (const key in typedObj) {
                            if (Object.prototype.hasOwnProperty.call(typedObj, key)) {
                                refs = refs.concat(findAssetRefs(typedObj[key]));
                            }
                        }
                        return refs;
                    };

                    const assetRefsToDelete = findAssetRefs(doc);

                    // Add asset deletions to transaction
                    // Note: In Sanity, deleting an asset document deletes the actual file
                    assetRefsToDelete.forEach(ref => {
                        transaction.delete(ref);
                    });

                    // Add the main document deletion to the transaction
                    transaction.delete(props.id);
                    // Also delete the draft if it exists
                    transaction.delete(`drafts.${props.id}`);

                    // Execute the transaction
                    await transaction.commit();
                } else {
                    // If we can't fetch it, just try to delete the ID directly
                    await client.delete(props.id);
                    await client.delete(`drafts.${props.id}`);
                }

                // Call the original onHandle (this usually just closes the dialog or navigates away)
                if (originalResult && originalResult.onHandle) {
                    originalResult.onHandle();
                }

            } catch (err) {
                console.error("Failed to delete document and assets", err);
                // Fallback to standard delete if the transaction fails
                if (originalResult && originalResult.onHandle) {
                    originalResult.onHandle();
                }
            } finally {
                setIsDeleting(false);
            }
        }, [client, props.id, originalResult]);

        // If the original action is null/undefined (e.g., user doesn't have permission), return it
        if (!originalResult) {
            return null;
        }

        return {
            ...originalResult,
            label: isDeleting ? 'Deleting permanently...' : 'Delete permanently (with assets)',
            icon: TrashIcon,
            onHandle,
            tone: 'critical' as const,
        };
    };
}
