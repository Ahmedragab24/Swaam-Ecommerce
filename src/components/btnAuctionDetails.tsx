"use client";

import { Gavel, Send } from "lucide-react";
import Model from "./model";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "./ui/scroll-area";

import { useTranslations } from "next-intl";
import { ProductType } from "@/types";
import { useState } from "react";
import {
  useGetAllBidsForProductQuery,
  usePlaceNewBidMutation,
} from "@/store/services/Auctions";
import { toast } from "sonner";

interface Props {
  product: ProductType;
}

const BtnAuctionDetails = ({ product }: Props) => {
  const t = useTranslations("ProductDetails");

  const [amount, setAmount] = useState<string>("");

  const { data } = useGetAllBidsForProductQuery(product.id);
  const AllBids = data?.data?.bids || [];

  const [Bid, { isLoading }] = usePlaceNewBidMutation();

  const HandelerBidAuction = async () => {
    if (!amount || Number(amount) <= 0) {
      toast.error(t("BidValidationError"));
      return;
    }

    try {
      await Bid({ productId: product.id, amount: Number(amount) }).unwrap();
      toast.success(t("BidSuccess"));
      setAmount("");
    } catch {
      toast.error(t("BidError"));
    }
  };

  return (
    <Model
      BtnStyle="text-lg font-bold !px-20 h-11"
      BtnIcon={<Gavel className="w-8 h-8" />}
      BtnTitle={t("AuctionBtnTitle")}
      ModelTitle={t("AuctionModelTitle")}
      // ModelContentStyle="h-fit !w-auto rounded-md border"
    >
      <ScrollArea className="h-fit w-auto rounded-md border">
        <div
          className="relative max-w-md mx-auto min-h-screen lg:min-h-[40vh] flex flex-col"
          dir="rtl"
        >
          {/* Chat Messages */}
          <div className="flex-1 p-4 space-y-4 overflow-y-auto">
            {AllBids.map((item: any) => (
              <div key={item.id} className="flex items-start gap-3">
                <Avatar className="w-10 h-10 flex-shrink-0">
                  <AvatarImage src={item?.user?.image || "/placeholder.svg"} />
                  <AvatarFallback className="bg-gray-600 text-white text-sm">
                    {item?.user?.name?.charAt(0) || "؟"}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="rounded-2xl rounded-tr-sm px-4 py-3 max-w-[280px] bg-gray-100">
                    <p className="text-gray-800 text-sm leading-relaxed">
                      {item.amount}
                    </p>
                  </div>

                  <div className="mt-1 text-xs text-gray-500 text-right">
                    {item.created_at}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 bg-white rounded-3xl border-t sticky bottom-0 z-10">
            <div className="flex items-center gap-2">
              <Input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder={t("ChatPlaceholder")}
                type="number"
                min={product.price}
                className="flex-1 pr-4 pl-12 py-3 rounded-full border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />

              <Button
                onClick={HandelerBidAuction}
                size="icon"
                disabled={isLoading}
                className="w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-600 text-white flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </ScrollArea>
    </Model>
  );
};

export default BtnAuctionDetails;
