import { defineStore } from 'pinia'
import { ref } from 'vue'
import { Address } from 'ton-core/dist/address/Address'
import { DSocialNetworkMaster } from '@d0rich/ton-contracts/wrappers/DSocialNetworkMaster'

const masterContractAddress = 'kQBzW8ZRV2T-rx3xfAwIZyiO2FN4wCpI7If4Exj7vX9DElJG'

export const useMasterContractStore = defineStore('master-contract', () => {
  const masterContract = masterContractFromAddress(masterContractAddress)
  const userFriendlyAddress = ref(masterContract.address.toString())

  return {
    masterContract,
    userFriendlyAddress
  }
})

function masterContractFromAddress(address: string | Address) {
  if (typeof address === 'string') {
    address = Address.parse(address)
  }
  return DSocialNetworkMaster.fromAddress(address)
}
