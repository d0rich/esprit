// TODO: fix tests
// import { Blockchain, SandboxContract } from '@ton-community/sandbox'
// import { toNano } from 'ton-core'
// import { DSocialNetworkPost } from '../wrappers/DSocialNetworkPost'
// import '@ton-community/test-utils'

// describe('DSocialNetworkPost', () => {
//   let blockchain: Blockchain
//   let dSocialNetworkPost: SandboxContract<DSocialNetworkPost>

//   beforeEach(async () => {
//     blockchain = await Blockchain.create()

//     dSocialNetworkPost = blockchain.openContract(
//       await DSocialNetworkPost.fromInit()
//     )

//     const deployer = await blockchain.treasury('deployer')

//     const deployResult = await dSocialNetworkPost.send(
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
//       to: dSocialNetworkPost.address,
//       deploy: true,
//       success: true
//     })
//   })

//   it('should deploy', async () => {
//     // the check is done inside beforeEach
//     // blockchain and dSocialNetworkPost are ready to use
//   })
// })
