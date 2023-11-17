import "./lib/messages_nft.tact";

// Master contract

message RegisterAccount {
    query_id: Int as uint64;
    account_name: String;
    account_description: String;
}

// Account contract

message InitializeAccount {
    query_id: Int as uint64;
    owner: Address;
    collection_content: NftCollectionMetadata;
}

struct AccountInfo {
    id: Int;
    master_contract: Address;
    owner: Address;
    collection_content: NftCollectionMetadata;
    is_initialized: Bool;
}

// Post contract

struct PostInfo {
    account: Address;
    id: Int;
    owner: Address;
    nft_content: NftMetadata;
}
