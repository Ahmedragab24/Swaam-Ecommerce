import React, { ReactNode } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ModelProps {
  BtnTitle?: string;
  BtnIcon?: ReactNode;
  BtnSize?: "sm" | null | "lg" | "icon";

  BtnStyle?: string;
  BtnVariant?:
    | "default"
    | "ghost"
    | "blur"
    | "link"
    | "outline"
    | "secondary"
    | "destructive";
  ModelTitle?: string;
  ModelDescription?: string;
  children: ReactNode;
  ModelContentStyle?: string;
  open?: boolean;
  setOpen?: (open: boolean) => void;
}

const Model = ({
  BtnTitle,
  BtnIcon,
  BtnSize,
  BtnStyle,
  BtnVariant,
  ModelDescription,
  ModelTitle,
  children,
  ModelContentStyle,
  open,
  setOpen,
}: ModelProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={BtnVariant} size={BtnSize} className={`${BtnStyle}`}>
          {BtnTitle}
          {BtnIcon}
        </Button>
      </DialogTrigger>
      <DialogContent
        className={`rounded-4xl bg-white/90 backdrop-blur-xs ${ModelContentStyle}`}
      >
        <DialogHeader className="flex flex-col justify-center items-center text-center">
          <DialogTitle className="text-2xl font-bold text-center">
            {ModelTitle}
          </DialogTitle>
          {ModelDescription && (
            <DialogDescription className="text-md text-gray-600 max-w-[320px] text-center">
              {ModelDescription}
            </DialogDescription>
          )}
        </DialogHeader>

        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
};

export default Model;
