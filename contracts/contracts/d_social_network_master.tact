import "@stdlib/deploy";
import "@stdlib/ownable";
import "./lib/trait_nft_collection.tact";
import "./lib/trait_nft_collection_royalty_extention.tact";
import "./lib/trait_accounting.tact";
import "./lib/trait_personal_fees.tact";
import "./lib/trait_storage_controller.tact";
import "./messages_d.tact";
import "./d_social_network_blog.tact";

contract DSocialNetworkMaster with NftCollection, NftCollectionRoyaltyExtention, Deployable, OwnableTransferable, Accounting, PersonalFees, StorageController  {
    version: String = "v1.2";
    owner: Address;
    personal_fees_destination: Address;

    // NFT Collection
    next_item_index: Int as uint32 = 0;
    collection_content: NftCollectionMetadata;
    royalty_params: RoyaltyParams;

    const CREATE_BLOG_FEE: Int = ton("0.5");

    init() {
        let ctx: Context = context();
        self.owner = ctx.sender;
        self.personal_fees_destination = ctx.sender;
        let name_sb: StringBuilder = beginString();
        name_sb.append("D Social Network Master ");
        name_sb.append(self.version);
        let description_sb: StringBuilder = beginString();
        description_sb.append("Master contract ");
        description_sb.append(self.version);
        description_sb.append(" for D Social Network, which is also NFT collection of blogs.");
        self.collection_content = NftCollectionMetadata {
            image: "https://d.d0rich.me/og/image.jpg",
            name: name_sb.toString(),
            description: description_sb.toString()
        };
        self.royalty_params = RoyaltyParams{
            numerator: 7,
            denominator: 100,
            destination: self.owner
        };
    }

    get fun get_version(): String {
        return self.version;
    }

    get fun get_blogs_count(): Int {
        return self.next_item_index;
    }

    get fun get_blog_address_by_index(item_index: Int): Address?{
        let initCode: StateInit = self.getNftItemInit(item_index);
        return contractAddress(initCode);
    }

    // Mint NFT items (blogs)

    override fun getNftItemInit(item_index: Int): StateInit {
        return initOf DSocialNetworkBlog(item_index, myAddress(), self.personal_fees_destination);
    }

    override fun onBeforeMintNft(msg: MintNft) {
        require(context().value + ton("0.05") >= self.CREATE_BLOG_FEE, "not enough funds to create a blog");
    }

    override fun onAfterMintNft(msg: MintNft) {
        let sb: StringBuilder = beginString();
        sb.append("D Blog Created: ");
        sb.append(msg.individual_content.name);
        self.sendPersonalFee(self.CREATE_BLOG_FEE, sb.toString());
    }

    override fun calculateNftItemInitialBalance(): Int {
        return self.calculateSendAmountToHoldFeeFromRecieved(self.CREATE_BLOG_FEE);
    }

}
