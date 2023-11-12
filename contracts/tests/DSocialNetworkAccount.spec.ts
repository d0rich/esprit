// TODO: fix tests
// import { Blockchain, SandboxContract } from '@ton-community/sandbox'
// import { toNano } from 'ton-core'
// import { DSocialNetworkAccount } from '../wrappers/DSocialNetworkAccount'
// import '@ton-community/test-utils'

// describe('DSocialNetworkAccount', () => {
//   let blockchain: Blockchain
//   let dSocialNetworkAccount: SandboxContract<DSocialNetworkAccount>

//   beforeEach(async () => {
//     blockchain = await Blockchain.create()

//     dSocialNetworkAccount = blockchain.openContract(
//       await DSocialNetworkAccount.fromInit()
//     )

//     const deployer = await blockchain.treasury('deployer')

//     const deployResult = await dSocialNetworkAccount.send(
//       deployer.getSender(),
//       {
//         value: toNano('0.05')
//       },
//       {
//         $$type: 'Deploy',
//         queryId: 0n
//       }
//     )

//     expect(deployResult.transactions).toHaveTransaction({
//       from: deployer.address,
//       to: dSocialNetworkAccount.address,
//       deploy: true,
//       success: true
//     })
//   })

//   it('should deploy', async () => {
//     // the check is done inside beforeEach
//     // blockchain and dSocialNetworkAccount are ready to use
//   })
// })
