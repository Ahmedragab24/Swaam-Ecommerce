interface Props {
  title: string;
}

const TitleSection = ({ title }: Props) => {
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <h1 className="Title_Section">{title}</h1>
      <hr className="bg-primary w-12 sm:w-16 lg:w-24 xl:w-32 h-0.5 sm:h-1 rounded-full my-auto" />
    </div>
  );
};

export default TitleSection;
