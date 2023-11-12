import "./lib/messages_nft.tact";

// Master contract

message RegisterAccount {

}

// Account contract

message InitializeAccount {
    owner: Address;
    collection_content: Cell;
    royalty_params: RoyaltyParams;
}
