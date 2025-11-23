import Image from "next/image";
import { Button } from "./ui/button";

const ProvidersLogin = () => {
  return (
    <div className="w-fit flex gap-2 justify-between items-center my-4 mx-auto">
      <Button variant={"outline"} className="border-2">
        <h1>Google</h1>
        <Image src={"/icons/google.svg"} alt="google" width={20} height={20} />
      </Button>
      <Button variant={"outline"} className="border-2">
        <h1>Facebook</h1>
        <Image
          src={"/icons/facebook.svg"}
          alt="google"
          width={20}
          height={20}
        />
      </Button>
    </div>
  );
};

export default ProvidersLogin;
