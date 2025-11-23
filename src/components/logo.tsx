import Image from "next/image";

const Logo = () => {
  return (
    <div className="w-32 h-auto">
      <Image
        src={"/logo.png"}
        alt="Hexa"
        width={100}
        height={100}
        className="object-contain md:w-full md:h-full object-center"
        priority
        loading="eager"
        unoptimized
        placeholder="blur"
        blurDataURL="/Hexa.png"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        quality={100}
      />
    </div>
  );
};

export default Logo;
