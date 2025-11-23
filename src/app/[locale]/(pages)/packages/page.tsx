import { Packages } from "@/constants/index";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CardPackage from "@/components/cardPackage";
import type { Metadata } from "next";
import { PackageType } from "@/types/Package";

export const metadata: Metadata = {
  title: "Packages",
  description: "hexa ecommerce",
};

const PackagesPage = () => {
  return (
    <div className="Container mx-auto mt-20 py-10">
      <Tabs defaultValue="monthly" className="w-full">
        <TabsList className="max-w-3xl w-[70%] px-8 py-2 mb-8 mx-auto">
          <TabsTrigger value="monthly">شهريا</TabsTrigger>
          <TabsTrigger value="yearly">سنويا</TabsTrigger>
        </TabsList>
        <TabsContent value="monthly">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mx-8">
            {Packages.map((item: PackageType) => (
              <CardPackage key={item.id} Package={item} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="yearly">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mx-8">
            {Packages.map((item: PackageType) => (
              <CardPackage key={item.id} Package={item} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PackagesPage;
