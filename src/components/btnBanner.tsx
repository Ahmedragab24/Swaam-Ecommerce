"use client";

import { Plus } from "lucide-react";
import Model from "./model";
import AddBORACard from "./addBORACard";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { getAuthTokenClient } from "@/lib/auth/auth-client";
import { toast } from "sonner";
import BtnRegister from "./btnRegister";

const BtnBanner = () => {
  const [open, setOpen] = useState(false);
  const t = useTranslations("Models");
  const token = getAuthTokenClient();

  return (
    <>
      {token ? (
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
      ) : null}
    </>
  );
};

export default BtnBanner;
