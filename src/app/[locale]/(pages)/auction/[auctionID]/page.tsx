import ProductDetailsPage from "../../categories/[categoryId]/[products]/[productID]/page";

const AuctionDetailsPage = async ({
  params,
}: {
  params: Promise<{ auctionID: string }>;
}) => {
  const { auctionID } = await params;

  return (
    <div className="Container my-20">
      <ProductDetailsPage
        params={Promise.resolve({ productID: auctionID })}
        type="auction"
      />
    </div>
  );
};

export default AuctionDetailsPage;
