import { toNano } from 'ton-core';
import { DSocialNetworkPost } from '../wrappers/DSocialNetworkPost';
import { NetworkProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider) {
    const dSocialNetworkPost = provider.open(await DSocialNetworkPost.fromInit());

    await dSocialNetworkPost.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(dSocialNetworkPost.address);

    // run methods on `dSocialNetworkPost`
}
