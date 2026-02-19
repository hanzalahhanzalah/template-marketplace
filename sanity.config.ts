import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemaTypes';
import { media } from 'sanity-plugin-media';

export default defineConfig({
    name: 'templateforge',
    title: 'TemplateForge Studio',

    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ath1uvh6',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

    basePath: '/studio',

    plugins: [structureTool(), visionTool(), media()],

    schema: {
        types: schemaTypes,
    },
});
