/// <reference types="vite/client" />interface ImportMetaEnv {

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: 'TESTNET' | 'MAINNET'
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
