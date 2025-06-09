import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import reactRefresh from 'eslint-plugin-react-refresh';
import reactHooks from 'eslint-plugin-react-hooks';
import { defineConfig } from 'eslint/config';

export default defineConfig([
    tseslint.configs.recommended,
    reactRefresh.configs.recommended,
    reactHooks.configs['recommended-latest'],
    {
        files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.browser,
                ...globals.es2020,
                ...globals.jest,
            },
        },
        plugins: {
            js,
        },
        extends: ['js/recommended'],
        rules: {
            'react-hooks/exhaustive-deps': 'off',
            'arrow-body-style': ['error', 'as-needed'],
        },
    },
]);
