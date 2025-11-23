"use client";

import { Plus } from "lucide-react";
import Model from "./model";
import AddBORACard from "./addBORACard";
import { useState } from "react";
import { useTranslations } from "next-intl";

const BtnBanner = () => {
  const [open, setOpen] = useState(false);
  const t = useTranslations("Models");

  return (
    <Model
      open={open}
      setOpen={setOpen}
      ModelContentStyle="max-w-[500px]"
      BtnTitle={t("Banner.BtnTitle")}
      BtnIcon={<Plus className="w-6 h-6" />}
      BtnVariant="secondary"
      ModelTitle={t("Banner.ModelTitle")}
      ModelDescription={t("Banner.ModelDescription")}
    >
      <AddBORACard setOpen={setOpen} />
    </Model>
  );
};

export default BtnBanner;
