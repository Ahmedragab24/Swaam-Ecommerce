"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AddBannerFormSchema } from "@/schemas/addBannerSchema";
import CustomUploadImageField from "@/components/customUploadImageField";
import LoaderSpin from "@/components/loader";
import CustomSelect from "@/components/customSelect";
import { Nationality, StateProductOptions } from "@/constants";
import { ToggleContact } from "@/components/toggleContact";
import {
  ImageIcon,
  Package,
  MapPin,
  MessageSquare,
  Megaphone,
} from "lucide-react";
import { BreadcrumbDemo } from "@/components/breadcrumb";
import CustomProductStateField from "@/components/customProductStateField";
import CustomCard from "@/components/CustomCard";
import { useTranslations } from "next-intl";
import CustomFormItem from "@/components/CustomFormItem";
import { useCreateProductMutation } from "@/store/services/Products";
import { toast } from "sonner";
import { ErrorType } from "@/types";

const AddBannerPage = () => {
  const [CreateProduct, { isLoading }] = useCreateProductMutation();
  const t = useTranslations("AddAdvertise");

  const form = useForm<z.infer<typeof AddBannerFormSchema>>({
    resolver: zodResolver(AddBannerFormSchema),
    defaultValues: {
      photo: undefined,
      photoGroup: undefined,
      productName: "",
      productState: "new",
      productCategory: "",
      productSubCategory: "",
      description: "",
      otherDetails: "",
      location: "",
      price: "",
      contactMethods: [],
    },
  });

  function onSubmit(values: z.infer<typeof AddBannerFormSchema>) {

    const data = new FormData();
    data.append("name", values.productName);
    data.append("description", values.description);
    data.append("images[]", values.photo);
    if (values.photoGroup) {
      values.photoGroup.forEach((file: any) => {
        data.append("images[]", file);
      });
    }
    data.append("type", "product");
    data.append("condition", values.productState);
    data.append("price", values.price);
    data.append("category_id", values.productCategory);
    data.append("sub_category_id", values.productSubCategory);
    data.append("city_id", values.location);
    if (values.contactMethods) {
      values.contactMethods.forEach((method) => {
        data.append("communication_methods", method);
      });
    }
    data.append("notes", values.otherDetails || "");


    try {
      CreateProduct(data).unwrap();
      toast.success(t("Success"));
    } catch (error) {
      const err = error as ErrorType;
      toast.error(err.data?.message || t("Error"));
    }
  }

  return (
    <div className="min-h-screen Container my-20">
      <h1 className="Title_Section pt-10 pb-4">
        <BreadcrumbDemo />
      </h1>
      <div className="max-w-8xl mx-auto py-6 px-4 border-2 border-primary  rounded-3xl bg-white/80">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center gap-4">
            <h1 className="text-xl md:text-3xl font-bold text-gray-900 mb-2">
              {t("Title")}
            </h1>
            <Megaphone className="w-8 h-8 text-primary" />
          </div>
          <p className="text-md md:text-lg text-gray-600">{t("Description")}</p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid lg:grid-cols-2 gap-4"
          >
            {/* Images Section */}
            <CustomCard
              title={t("Images.Title")}
              description={t("Images.Description")}
              icon={<ImageIcon className="w-5 h-5 text-primary" />}
              bgColor="Gradient_Card_Teal"
            >
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3 text-center">
                  {t("Images.MainImageTitle")}
                </h3>
                <CustomUploadImageField
                  type="single"
                  typeSingle="square"
                  control={form.control}
                />
              </div>
              <Separator />
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  {t("Images.OtherImagesTitle")}
                </h3>
                <CustomUploadImageField
                  type="photoGroup"
                  control={form.control}
                />
              </div>
            </CustomCard>

            {/* Product Details Section */}
            <CustomCard
              title={t("Details.Title")}
              description={t("Details.Description")}
              icon={<Package className="w-5 h-5 text-primary" />}
              bgColor="Gradient_Card_Teal"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <FormField
                  control={form.control}
                  name="productName"
                  render={({ field }) => (
                    <CustomFormItem
                      field={field}
                      label={t("Details.ProductLabel")}
                      placeholder={t("Details.ProductPlaceholder")}
                      type="text"
                      className="bg-white border-primary rounded-2xl h-12"
                    />
                  )}
                />

                <FormField
                  control={form.control}
                  name="productState"
                  render={({ field }) => (
                    <CustomProductStateField
                      control={form.control}
                      name="productState"
                      label={t("Details.StateLabel")}
                      options={StateProductOptions}
                    />
                  )}
                />

                <FormField
                  control={form.control}
                  name="productCategory"
                  render={({ field }) => (
                    <CustomSelect
                      control={form.control}
                      name="productCategory"
                      label={t("Details.CategoryLabel")}
                      placeholder={t("Details.CategoryPlaceholder")}
                      selectList={Nationality}
                      className="bg-white border-primary rounded-2xl !h-12"
                    />
                  )}
                />
                <FormField
                  control={form.control}
                  name="productSubCategory"
                  render={({ field }) => (
                    <CustomSelect
                      control={form.control}
                      name="productSubCategory"
                      label={t("Details.SubCategoryLabel")}
                      placeholder={t("Details.CategoryPlaceholder")}
                      selectList={Nationality}
                      className="bg-white border-primary rounded-2xl !h-12"
                    />
                  )}
                />

                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <CustomFormItem
                          field={field}
                          label={t("Details.PriceLabel")}
                          type="number"
                          placeholder="0.00"
                          className="bg-white border-primary rounded-2xl h-12"
                        />
                      )}
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <CustomFormItem
                        field={field}
                        label={t("Details.DescriptionLabel")}
                        placeholder={t("Details.DescriptionPlaceholder")}
                        typeInput="textarea"
                        className="bg-white border-primary rounded-2xl min-h-[120px]"
                      />
                    )}
                  />
                </div>

                <div className="md:col-span-2">
                  <FormField
                    control={form.control}
                    name="otherDetails"
                    render={({ field }) => (
                      <CustomFormItem
                        field={field}
                        label={t("Details.OtherNots")}
                        placeholder={t("Details.OtherNotsPlaceholder")}
                        typeInput="textarea"
                        className="bg-white border-primary rounded-2xl min-h-[120px]"
                      />
                    )}
                  />
                </div>
              </div>
            </CustomCard>

            {/* Location & Contact Section */}
            <CustomCard
              title={t("Location&Contact.Title")}
              description={t("Location&Contact.Description")}
              icon={<MapPin className="w-5 h-5 text-primary" />}
              bgColor="Gradient_Card_Teal"
            >
              <div className="flex flex-col md:flex-row items-center gap-6">
                <CustomSelect
                  control={form.control}
                  name="location"
                  label={t("Location&Contact.LocationLabel")}
                  placeholder={t("Location&Contact.LocationPlaceholder")}
                  selectList={Nationality}
                  className="bg-white border-primary rounded-2xl !h-12 w-full w-[200px]"
                />

                <div className="flex items-center gap-2">
                  <FormField
                    control={form.control}
                    name="contactMethods"
                    render={({ field }) => (
                      <ToggleContact
                        control={form.control}
                        name="contactMethods"
                        label={t("Location&Contact.ContactLabel")}
                      />
                    )}
                  />
                </div>
              </div>
            </CustomCard>

            {/* Submit Section */}
            <Card className="Gradient_Card_Teal cursor-auto">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <MessageSquare className="w-4 h-4" />
                    <span>{t("Submit.Title")}</span>
                  </div>

                  <Button
                    size="lg"
                    type="submit"
                    className="w-full max-w-md h-12 text-lg font-medium"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <LoaderSpin
                        type="Btn"
                        size="sm"
                        title={t("Submit.Loading")}
                      />
                    ) : (
                      t("Submit.SubmitButton")
                    )}
                  </Button>

                  <p className="text-sm text-gray-500 max-w-md mx-auto">
                    {t("Submit.Description")}
                  </p>
                </div>
              </CardContent>
            </Card>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddBannerPage;
