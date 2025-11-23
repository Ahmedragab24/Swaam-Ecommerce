"use client";

import { MessageCircleMore } from "lucide-react";
import Model from "./model";
import { useState } from "react";
import { ChatConversation } from "./ChatCard";
// import { useTranslations } from "next-intl";

const BtnChat = () => {
  const [open, setOpen] = useState(false);
  //   const t = useTranslations("Models");

  return (
    <Model
      open={open}
      setOpen={setOpen}
      ModelContentStyle="max-w-[500px]"
      BtnTitle={"Chat"}
      BtnStyle="flex-1 sm:flex-none sm:min-w-[200px] h-14 text-base font-semibold"
      BtnIcon={<MessageCircleMore className="w-6 h-6" />}
      BtnVariant="outline"
    >
      <ChatConversation />
    </Model>
  );
};

export default BtnChat;
