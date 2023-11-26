import "./lib/messages_nft.tact";

// Master contract


// Blog contract

message EditBlogMetadata {
    query_id: Int as uint64;
    new_metadata: NftCollectionMetadata;
}

struct BlogInfo {
    id: Int;
    master_contract: Address;
    owner: Address;
    collection_content: NftCollectionMetadata;
    is_initialized: Bool;
}

// Post contract

message EditBlogPost {
    query_id: Int as uint64;
    new_metadata: NftMetadata;
}

struct PostInfo {
    blog: Address;
    id: Int;
    owner: Address;
    nft_content: NftMetadata;
}
