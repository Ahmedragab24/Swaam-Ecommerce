
import { Card, CardContent, CardHeader } from "./ui/card";

const UserCardPackage = (UserPackage: any) => {
  const {
    advertisementsRemaining,
    advertisementsTotal,
    packageDate,
    packageExpiryDate,
    packageID,
    packageType,
    packageName,
    packageStatus,
  } = UserPackage;
  return (
    <Card className="max-w-[350px] w-full lg:w-[350px] mx-auto Gradient_Card_Teal cursor-auto">
      <CardHeader className="text-center pb-4">
        <h2 className="text-xl font-bold text-gray-900 mb-2">{packageID}</h2>
        <h3 className="text-lg font-semibold text-primary">{packageName}</h3>
      </CardHeader>

      <CardContent className="space-y-4 px-10 pb-6 lg:text-lg">
        <div className="flex justify-between items-center">
          <span className="text-primary font-medium">{packageDate}</span>
          <span className="text-gray-700 font-medium">تاريخ الاشتراك</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-primary font-medium">{packageExpiryDate}</span>
          <span className="text-gray-700 font-medium">تاريخ الانتهاء</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-primary font-medium">{packageStatus}</span>
          <span className="text-gray-700 font-medium">حالة الاشتراك</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-primary font-medium">{packageType}</span>
          <span className="text-gray-700 font-medium">نوع الاشتراك</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-primary font-medium">
            {advertisementsTotal}
          </span>
          <span className="text-gray-700 font-medium">الاعلانات الكلية</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-primary font-medium">
            {advertisementsRemaining}
          </span>
          <span className="text-gray-700 font-medium">الاعلانات المتبقية</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserCardPackage;
