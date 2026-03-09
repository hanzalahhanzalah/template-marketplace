import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemaTypes';
import { media } from 'sanity-plugin-media';

export default defineConfig({
    name: 'templatelayer',
    title: 'TemplateLayer Studio',

    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ath1uvh6',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

    basePath: '/studio',

    plugins: [structureTool(), visionTool(), media()],

    schema: {
        types: schemaTypes,
    },

    document: {
        actions: (prev, context) => {
            // Reorder actions to make "Delete" more prominent
            const deleteAction = prev.find((action) => action.action === 'delete');
            const otherActions = prev.filter((action) => action.action !== 'delete');

            if (deleteAction) {
                // Put delete at the end or start depending on preference
                // Standard order: [Publish, ..., Delete]
                return [...otherActions, deleteAction];
            }

            return prev;
        },
    },
});
