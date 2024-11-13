// noinspection JSFileReferences

/// <reference types="vite/client" >
/// <reference types="vite-plugin-svgr/client" />

interface ImportMeta {
    readonly env: {
        readonly VITE_API_KEY: string;
        readonly VITE_AUTH_DOMAIN: string;
        readonly VITE_PROJECT_ID: string;
        readonly VITE_STORAGE_BUCKET: string;
        readonly VITE_MESSAGING_SENDER_ID: string;
        readonly VITE_APP_ID: string;
        readonly VITE_MEASUREMENT_ID: string;
        readonly VITE_API_HOST: string;
    };
}