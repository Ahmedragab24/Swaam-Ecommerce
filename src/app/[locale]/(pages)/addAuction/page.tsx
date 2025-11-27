"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import CustomUploadImageField from "@/components/customUploadImageField";
import CustomFormField from "@/components/CustomFormItem";
import LoaderSpin from "@/components/loader";
import CustomSelect from "@/components/customSelect";
import { StateProductOptions } from "@/constants";
import { ToggleContact } from "@/components/toggleContact";
import {
  ImageIcon,
  Package,
  MapPin,
  MessageSquare,
  Gavel,
  ChevronDownIcon,
} from "lucide-react";
import { BreadcrumbDemo } from "@/components/breadcrumb";
import { AddAuctionFormSchema } from "@/schemas/addAuctionSchema";
import CustomCard from "@/components/CustomCard";
import { useLocale, useTranslations } from "next-intl";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useCreateAuctionMutation } from "@/store/services/Auctions";
import { toast, Toaster } from "sonner";
import { ErrorType } from "@/types";
import CustomProductStateField from "@/components/customProductStateField";
import {
  useGetHomeQuery,
  useGetSubCategoriesQuery,
} from "@/store/services/Home";
import { useGetCitiesQuery } from "@/store/services/Countries";

type FormValues = z.infer<typeof AddAuctionFormSchema>;

const AddAuctionPage: React.FC = () => {
  const t = useTranslations("AddAuction");
  const [createAuction, { isLoading }] = useCreateAuctionMutation();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const lang = useLocale();

  const form = useForm<FormValues>({
    resolver: zodResolver(AddAuctionFormSchema),
    defaultValues: {
      photo: undefined,
      photoGroup: undefined,
      productName: "",
      productState: "new",
      productCategory: "",
      description: "",
      otherDetails: "",
      location: "",
      priceTo: "",
      contactMethods: [],
      auctionDuration: "",
    },
  });

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

  const onSubmit = async (values: FormValues) => {
    // build FormData safely
    const data = new FormData();

    data.append("name", values.productName ?? "");
    data.append("description", values.description ?? "");
    data.append("condition", values.productState ?? "");
    data.append("starting_price", String(values.priceTo ?? ""));
    data.append("category_id", String(values.productCategory ?? ""));
    data.append("notes", values.otherDetails ?? "");
    data.append("city_id", String(values.location ?? ""));
    data.append("type", "auction");

    // images: photo (single) and photoGroup (could be File or File[])
    const photo = values.photo as File | undefined | null;
    if (photo) {
      data.append("images[]", photo);
    }

    const group = values.photoGroup as File[] | File | undefined | null;
    if (Array.isArray(group)) {
      group.forEach((f) => data.append("images[]", f));
    } else if (group instanceof File) {
      data.append("images[]", group);
    }

    // communication methods: array
    if (Array.isArray(values.contactMethods)) {
      values.contactMethods.forEach((m) =>
        data.append("communication_methods[]", String(m))
      );
    }

    // auction end date: prefer form value, fallback to local date state
    const auctionEnd =
      values.auctionDuration || (date ? date.toISOString() : "");
    if (auctionEnd) {
      data.append("auction_end_date", auctionEnd);
    }

    try {
      await createAuction(data).unwrap();
      toast.success(t("Success") || "تم إضافة المزاد بنجاح");
      form.reset(); // clear form after success
      setDate(undefined);
    } catch (err) {
      const error = err as ErrorType;
      toast.error(error?.data?.message || t("Error") || "حدث خطأ");
    }
  };

  return (
    <div className="min-h-screen Container my-20">
      <Toaster />
      <h1 className="Title_Section pt-10 pb-4">
        <BreadcrumbDemo />
      </h1>

      <div className="max-w-8xl mx-auto py-6 px-4 border-2 border-primary rounded-3xl bg-white/80">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center gap-4 items-center">
            <h1 className="text-xl md:text-3xl font-bold text-gray-900 mb-2">
              {t("Title")}
            </h1>
            <Gavel className="w-8 h-8 text-amber-600" />
          </div>
          <p className="text-md md:text-lg text-gray-600">{t("Description")}</p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 lg:grid-cols-2 gap-4"
          >
            {/* Images Section */}
            <CustomCard
              bgColor="Gradient_Card_Teal"
              title={t("Images.Title")}
              description={t("Images.Description")}
              icon={<ImageIcon className="w-5 h-5 text-primary" />}
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
              bgColor="Gradient_Card_Teal"
              title={t("Details.Title")}
              description={t("Details.Description")}
              icon={<Package className="w-5 h-5 text-primary" />}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="productName"
                  render={({ field }) => (
                    <CustomFormField
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
                      selectList={CategoriesData.map((item) => ({
                        value: String(item.id),
                        label: item.name,
                      }))}
                      className="bg-white border-primary rounded-2xl !h-12"
                    />
                  )}
                />

                <FormField
                  control={form.control}
                  name="priceTo"
                  render={({ field }) => (
                    <CustomFormField
                      field={field}
                      label={t("Details.PriceToLabel")}
                      placeholder={t("Details.PriceToPlaceholder") || "0.00"}
                      type="number"
                      className="bg-white border-primary rounded-2xl h-12"
                    />
                  )}
                />

                <FormField
                  control={form.control}
                  name="auctionDuration"
                  render={() => (
                    <div className="flex flex-col gap-3">
                      <Label htmlFor="date" className="px-1">
                        {t("Details.DurationLabel")}
                      </Label>
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            id="date"
                            className="w-full h-11 rounded-2xl justify-between font-normal"
                          >
                            {date
                              ? date.toLocaleDateString()
                              : `${t("Details.SelectDate")}`}
                            <ChevronDownIcon />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-auto overflow-hidden p-0"
                          align="start"
                        >
                          <Calendar
                            mode="single"
                            selected={date}
                            captionLayout="dropdown"
                            onSelect={(date) => {
                              setDate(date);
                              setOpen(false);
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  )}
                />

                <div className="md:col-span-2">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <CustomFormField
                        field={field}
                        label={t("Details.DescriptionLabel")}
                        placeholder={t("Details.DescriptionPlaceholder")}
                        type="text"
                        typeInput="textarea"
                        className="bg-white border-primary rounded-2xl min-h-[200px] p-4"
                      />
                    )}
                  />
                </div>
              </div>
            </CustomCard>

            {/* Location & Contact Section */}
            <CustomCard
              bgColor="Gradient_Card_Teal"
              title={t("Location&Contact.Title")}
              description={t("Location&Contact.Description")}
              icon={<MapPin className="w-5 h-5 text-primary" />}
            >
              <div className="flex flex-col md:flex-row gap-6">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <CustomSelect
                      control={form.control}
                      name="location"
                      label={t("Location&Contact.LocationLabel")}
                      placeholder={t("Location&Contact.LocationPlaceholder")}
                      selectList={CitiesData.map((item) => ({
                        value: String(item.id),
                        label: lang === "ar" ? item.name_ar : item.name_en,
                      }))}
                      className="md:w-[200px] bg-white border-primary rounded-2xl !h-12"
                    />
                  )}
                />

                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    {/* ToggleContact should connect to react-hook-form via control & name */}
                    <ToggleContact
                      control={form.control}
                      name="contactMethods"
                      label={t("Location&Contact.ContactLabel")}
                    />
                  </div>
                </div>
              </div>
            </CustomCard>

            {/* Product State Section */}
            <div className="Gradient_Card_Teal cursor-auto shadow-none p-8 rounded-2xl flex flex-col justify-center items-center gap-4">
              <p className="max-w-[250px] mx-auto text-center text-lg font-medium">
                {t("ProductState.Title")}
              </p>
              <span className="text-lg text-primary font-bold">
                {t("ProductState.Price")}
              </span>
            </div>

            {/* Submit Section */}
            <Card className="lg:col-span-2 Gradient_Card_Teal cursor-auto shadow-none">
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

export default AddAuctionPage;
