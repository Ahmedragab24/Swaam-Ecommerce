import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PackageDetails",
  description: "hexa ecommerce",
};

const PackageDetailsPage = async ({
  params,
}: {
  params: Promise<{ packageID: string }>;
}) => {
  const { packageID } = await params;

  return (
    <div className="Container my-20 py-10">
      <h1>{packageID}</h1>
    </div>
  );
};

export default PackageDetailsPage;
