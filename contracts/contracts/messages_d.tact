import "./lib/messages_nft.tact";

// Master contract

message RegisterAccount {
    query_id: Int as uint64;
}

// Account contract

message InitializeAccount {
    query_id: Int as uint64;
    owner: Address;
    collection_content: NftCollectionMetadata;
    royalty_params: RoyaltyParams;
}
