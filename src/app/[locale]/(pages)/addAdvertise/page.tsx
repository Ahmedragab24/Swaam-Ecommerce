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
import { StateProductOptions } from "@/constants";
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
import { useLocale, useTranslations } from "next-intl";
import CustomFormItem from "@/components/CustomFormItem";
import { useCreateProductMutation } from "@/store/services/Products";
import { toast } from "sonner";
import { ErrorType } from "@/types";
import {
  useGetHomeQuery,
  useGetSubCategoriesQuery,
} from "@/store/services/Home";
import { useMemo } from "react";
import { useGetCitiesQuery } from "@/store/services/Countries";

const AddBannerPage = () => {
  const t = useTranslations("AddAdvertise");
  const lang = useLocale();

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

  const [CreateProduct, { isLoading }] = useCreateProductMutation();

  const { data: Categories } = useGetHomeQuery();
  const CategoriesData = Categories?.data?.categories || [];

  const categoryId = useMemo(
    () => Number(form.watch("productCategory") || 0),
    [form.watch("productCategory")]
  );

  const { data: SubCategories } = useGetSubCategoriesQuery(categoryId, {
    skip: !categoryId,
  });

  const { data: Cities } = useGetCitiesQuery();
  const CitiesData = Cities?.data || [];

  async function onSubmit(values: z.infer<typeof AddBannerFormSchema>) {
    const data = new FormData();

    data.append("name", values.productName);
    data.append("description", values.description);
    data.append("type", "product");
    data.append("condition", values.productState);
    data.append("price", values.price);
    data.append("category_id", values.productCategory);
    data.append("sub_category_id", values.productSubCategory);
    data.append("city_id", values.location);
    data.append("notes", values.otherDetails || "");

    // Main Image
    if (values.photo instanceof File) {
      data.append("images[]", values.photo);
    }

    // Gallery Images
    if (values.photoGroup && values.photoGroup.length > 0) {
      Array.from(values.photoGroup).forEach((file) => {
        data.append("images[]", file);
      });
    }

    // Contact Methods
    values.contactMethods?.forEach((method) => {
      data.append("communication_methods[]", method);
    });

    try {
      await CreateProduct(data).unwrap();
      toast.success(t("Success"));
      form.reset();
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

      <div className="max-w-8xl mx-auto py-6 px-4 border-2 border-primary rounded-3xl bg-white/80">
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
            {/* Images */}
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

            {/* Product Details */}
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

                <CustomProductStateField
                  control={form.control}
                  name="productState"
                  label={t("Details.StateLabel")}
                  options={StateProductOptions}
                />

                <CustomSelect
                  control={form.control}
                  name="productCategory"
                  label={t("Details.CategoryLabel")}
                  placeholder={t("Details.CategoryPlaceholder")}
                  selectList={CategoriesData.map((item) => ({
                    value: String(item.id),
                    label: item.name,
                  }))}
                  className="bg-white border-primary rounded-2xl !h-12"
                />

                <CustomSelect
                  control={form.control}
                  name="productSubCategory"
                  label={t("Details.SubCategoryLabel")}
                  placeholder={
                    categoryId
                      ? t("Details.SubCategoryPlaceholder")
                      : t("Details.SelectCategoryFirst")
                  }
                  selectList={
                    categoryId
                      ? SubCategories?.data?.subcategories?.map((item) => ({
                          value: String(item.id),
                          label: item.name,
                        })) || []
                      : []
                  }
                  className="bg-white border-primary rounded-2xl !h-12"
                />

                <div className="col-span-1 md:col-span-2">
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

                <div className="col-span-1 md:col-span-2">
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

                <div className="col-span-1 md:col-span-2">
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

            {/* Location & Contact */}
            <CustomCard
              title={t("Location&Contact.Title")}
              description={t("Location&Contact.Description")}
              icon={<MapPin className="w-5 h-5 text-primary" />}
              bgColor="Gradient_Card_Teal"
            >
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-full md:w-[200px]">
                  <CustomSelect
                    control={form.control}
                    name="location"
                    label={t("Location&Contact.LocationLabel")}
                    placeholder={t("Location&Contact.LocationPlaceholder")}
                    selectList={CitiesData.map((city) => ({
                      value: String(city.id),
                      label: lang === "ar" ? city.name_ar : city.name_en,
                    }))}
                    className="bg-white border-primary rounded-2xl !h-12"
                  />
                </div>

                <ToggleContact
                  control={form.control}
                  name="contactMethods"
                  label={t("Location&Contact.ContactLabel")}
                />
              </div>
            </CustomCard>

            {/* Submit */}
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
