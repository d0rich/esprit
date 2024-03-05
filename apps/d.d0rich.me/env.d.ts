/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TON_NETWORK: 'TESTNET' | 'MAINNET'
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
