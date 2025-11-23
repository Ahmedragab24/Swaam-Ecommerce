import { Loader } from "lucide-react";
import Image from "next/image";

interface IProps {
  type: "page" | "Btn";
  title?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const LoaderSpin = ({ title = "Loading...", size, type }: IProps) => {
  return (
    <div
      className={`flex gap-2 justify-center items-center ${
        type === "page" && "flex-col gap-4 "
      }`}
    >
      {type === "Btn" ? (
        <Loader className="w-4 h-4 animate-spin text-white" />
      ) : (
        <Image
          src="/Icons/loading.svg"
          alt="loader"
          width={70}
          height={70}
          className="animate-spin"
        />
      )}

      <h1
        className={`${type === "Btn" ? "text-white" : "text-muted"} font-bold ${
          size === "sm" && "text-sm"
        } ${size === "md" && "text-xl"}
        ${size === "lg" && "text-3xl"}  
        `}
      >
        {title}
      </h1>
    </div>
  );
};

export default LoaderSpin;
