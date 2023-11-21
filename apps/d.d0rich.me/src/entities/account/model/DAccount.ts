import { DSocialNetworkAccount } from '@d0rich/contracts/wrappers/DSocialNetworkAccount'

export class DAccount {
  // eslint-disable-next-line no-useless-constructor
  constructor(public readonly contract: DSocialNetworkAccount) {}
}
