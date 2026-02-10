//Este archivo amplía las definiciones 
// de tipos de TypeScript para incluir import.meta.env.
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_APP_NAME: string;
 
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}