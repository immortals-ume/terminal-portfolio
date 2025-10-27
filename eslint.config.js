// eslint.config.js
import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
    {
        ignores: [
            "node_modules/**", 
            ".next/**", 
            "out/**", 
            "coverage/**", 
            "playwright-report/**", 
            "test-results/**", 
            ".jest-cache/**",
            "public/sw.js",
            "*.config.js",
            "*.config.cjs",
            "jest.*.js",
            "scripts/**",
            "next-env.d.ts",
            "__mocks__/**"
        ],
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ["**/*.{js,jsx,ts,tsx}"],
        languageOptions: {
            globals: {
                React: "readonly",
                JSX: "readonly",
                console: "readonly",
                process: "readonly",
                global: "readonly",
                window: "readonly",
                document: "readonly",
            },
        },
        rules: {
            "react/react-in-jsx-scope": "off",
            "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
            "@typescript-eslint/no-explicit-any": "off",
            "no-console": "off",
            "prefer-const": "error",
            "no-var": "error",
            "@typescript-eslint/triple-slash-reference": "off",
        },
    },
    // Test files configuration
    {
        files: ["**/__tests__/**/*", "**/*.test.*", "**/*.spec.*"],
        languageOptions: {
            globals: {
                jest: "readonly",
                describe: "readonly",
                it: "readonly",
                test: "readonly",
                expect: "readonly",
                beforeAll: "readonly",
                afterAll: "readonly",
                beforeEach: "readonly",
                afterEach: "readonly",
            },
        },
        rules: {
            "@typescript-eslint/no-explicit-any": "off",
            "no-console": "off",
        },
    }
);
