import { UserPackagesList } from "@/constants";
import UserCardPackage from "./userCardPackage";

const UserPackages = () => {
  return (
    <div className=" mx-auto mb-6 bg-card/30 drop-shadow-md shadow-lg rounded-xl p-4 md:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl text-gray-700 font-medium">تفاصيل الإشتراك</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-4 items-center">
        {UserPackagesList.map((item) => (
          <UserCardPackage
            key={item.packageID}
            packageID={item.packageID}
            packageName={item.packageName}
            packageType={item.packageType}
            packageStatus={item.packageStatus}
            advertisementsRemaining={item.advertisementsRemaining}
            advertisementsTotal={item.advertisementsTotal}
            packageDate={item.packageDate}
            packageExpiryDate={item.packageExpiryDate}
          />
        ))}
      </div>
    </div>
  );
};

export default UserPackages;
