import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { Address } from 'ton-core/dist/address/Address'
import { DSocialNetworkMaster } from '@d0rich/ton-contracts/wrappers/DSocialNetworkMaster'
import { useAppConfig } from '../../../shared/composables/useAppConfig'

const mainnetMasterContracts = [
  'EQDQdnigA1y4tf8FXuYJMR_qW_nOaOikW-cXQTlsGZFao50R'
]
const testnetMasterContracts = [
  'EQDQdnigA1y4tf8FXuYJMR_qW_nOaOikW-cXQTlsGZFao50R'
]

export const useMasterContractStore = defineStore('master-contract', () => {
  const appConfig = useAppConfig()
  const masterContractsReleases = ref(
    appConfig.network === 'MAINNET'
      ? mainnetMasterContracts
      : testnetMasterContracts
  )
  const allContracts = computed(() =>
    masterContractsReleases.value.map(masterContractFromAddress)
  )
  const latestContract = computed(() => allContracts.value[0])
  const contractAddress = ref(latestContract.value.address.toString())

  return {
    latestContract,
    allContracts,
    contractAddress
  }
})

function masterContractFromAddress(address: string | Address) {
  if (typeof address === 'string') {
    address = Address.parse(address)
  }
  return DSocialNetworkMaster.fromAddress(address)
}
