import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import stylistic from "@stylistic/eslint-plugin";
import perfectionist from "eslint-plugin-perfectionist";
import reactRefresh from "eslint-plugin-react-refresh";
import unicorn from "eslint-plugin-unicorn";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import jsxA11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import tailwind from "eslint-plugin-tailwindcss";
import importPlugin from 'eslint-plugin-import';
import cssPlugin from "eslint-plugin-css"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [
    importPlugin.flatConfigs.recommended,
    cssPlugin.configs["flat/standard"],
    ...tailwind.configs["flat/recommended"],
    ...fixupConfigRules(compat.extends(
        "eslint:recommended",
        "plugin:react-hooks/recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
    )),
    {
        ignores:["eslint.config.mjs"]
    },
    {
        plugins: {
            "@stylistic": stylistic,
            perfectionist: fixupPluginRules(perfectionist),
            "react-refresh": reactRefresh,
            unicorn,
            'jsx-a11y': jsxA11y,
            react
        },

        languageOptions: {
            globals: {
                ...globals.browser,
            },

            parser: tsParser,
            ecmaVersion: 2022,
            sourceType: "script",

            parserOptions: {
                projectService: "./tsconfig.json",
                ecmaFeatures: {
                    jsx: true
                }
            },
        },

        settings: {
            react: {
                version: "detect",
            },

            "import/parsers": {
                "@typescript-eslint/parser": [".ts", ".tsx"],
            },

            "import/resolver": {
                typescript: true,
            },
        },

        rules: {
            "indent": ["warn", 4],
            "import/no-unresolved": "off",
            "@stylistic/block-spacing": "warn",
            "@stylistic/brace-style": "warn",
            "@stylistic/comma-dangle": "warn",
            "@stylistic/comma-spacing": "warn",
            "@stylistic/function-call-spacing": "warn",
            "@stylistic/key-spacing": "warn",
            "@stylistic/keyword-spacing": "warn",

            "@stylistic/member-delimiter-style": ["warn", {
                multiline: {
                    delimiter: "semi",
                    requireLast: true,
                },

                singleline: {
                    delimiter: "semi",
                    requireLast: true,
                },

                multilineDetection: "brackets",
            }],

            "@stylistic/object-curly-spacing": ["warn", "always"],

            "@stylistic/quotes": ["error", "single", {
                avoidEscape: true,
                allowTemplateLiterals: true,
            }],

            "@stylistic/semi": "warn",
            "@stylistic/space-before-blocks": "warn",
            "@stylistic/space-infix-ops": "warn",
            "@stylistic/type-annotation-spacing": "warn",
            "@stylistic/jsx-closing-bracket-location": "warn",
            "@stylistic/jsx-closing-tag-location": "warn",
            "@stylistic/jsx-curly-brace-presence": "warn",
            "@stylistic/jsx-curly-newline": "warn",
            "@stylistic/jsx-curly-spacing": ["warn", "always"],
            "@stylistic/jsx-equals-spacing": "warn",
            "@stylistic/jsx-indent-props": "warn",
            "@stylistic/jsx-quotes": ["warn", "prefer-single"],

            "@stylistic/no-extra-parens": ["error", "all", {
                conditionalAssign: true,
                ignoreJSX: "multi-line",
            }],

            "@stylistic/arrow-parens": ["error", "as-needed"],
            "@stylistic/jsx-first-prop-new-line": "warn",
            "@stylistic/jsx-max-props-per-line": ["warn", { "maximum": 1 }],

            "@typescript-eslint/consistent-type-imports": "warn",
            "@typescript-eslint/no-non-null-assertion": "off",

            "@typescript-eslint/no-unused-vars": ["error", {
                argsIgnorePattern: "^_",
                varsIgnorePattern: "^_",
                caughtErrorsIgnorePattern: "^_",
            }],

            "@typescript-eslint/restrict-template-expressions": "off",

            "import/order": ["error", {
                alphabetize: {
                    order: "asc",
                    caseInsensitive: true,
                },

                groups: [
                    ["external", "builtin"],
                    "internal",
                    ["sibling", "parent"],
                    "index",
                    "unknown",
                ],

                pathGroups: [{
                    group: "internal",
                    pattern: "@/**/*.!(less)*(?*)",
                }, {
                    group: "unknown",
                    pattern: "*.{less,css}*(?*)",

                    patternOptions: {
                        matchBase: true,
                    },

                    position: "after",
                }],

                pathGroupsExcludedImportTypes: [],
                warnOnUnassignedImports: true,
            }],

            "jsx-a11y/media-has-caption": "off",
            "no-unused-vars": "off",

            "react-refresh/only-export-components": ["warn", {
                allowConstantExport: true,
            }],

            "react/jsx-boolean-value": "error",
            "react/jsx-newline": "error",
            "react/jsx-no-useless-fragment": "error",

            "react/jsx-pascal-case": ["error", {
                allowAllCaps: false,
            }],

            "react/jsx-sort-props": ["warn", {
                callbacksLast: true,
                multiline: "last",
                shorthandFirst: true,
                reservedFirst: true,
            }],

            "react/jsx-wrap-multilines": ["warn", {
                arrow: "parens-new-line",
                assignment: "parens-new-line",
                condition: "parens-new-line",
                declaration: "parens-new-line",
                logical: "parens-new-line",
                prop: "parens-new-line",
                return: "parens-new-line",
            }],

            "react/prefer-read-only-props": "warn",
            "react/prop-types": "off",
            "react/react-in-jsx-scope": "off",

            "react/self-closing-comp": ["error", {
                component: true,
                html: true,
            }],

            "sort-imports": ["error", {
                ignoreCase: true,
                ignoreDeclarationSort: true,
            }],

            "perfectionist/sort-imports": "off",

            "perfectionist/sort-interfaces": ["warn", {
                type: "natural",
                partitionByNewLine: true,
            }],

            "perfectionist/sort-jsx-props": "off",
            "perfectionist/sort-named-imports": "off",

            "perfectionist/sort-objects": ["warn", {
                type: "natural",
                ignorePattern: ["tableActions"],
                partitionByNewLine: true,
            }],

            "tailwindcss/no-custom-classname": "off",
            "unicorn/better-regex": "error",
            "unicorn/consistent-destructuring": "error",
            "unicorn/prefer-includes": "warn",
        },
    }
];