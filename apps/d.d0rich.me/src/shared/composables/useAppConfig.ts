const staticConfig = {
  network: import.meta.env.VITE_TON_NETWORK ?? 'TESTNET'
}

Object.freeze(staticConfig)

export const useAppConfig = () => {
  return staticConfig
}
