import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface CustomCardProps {
  bgColor?: "Gradient_Card_Yellow" | "Gradient_Card_Teal";
  className?: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const CustomCard = ({
  bgColor,
  className,
  title,
  description,
  children,
  icon,
}: CustomCardProps) => {
  return (
    <Card className={`${bgColor} ${className} !cursor-auto !shadow-none`}>
      <CardHeader className="pb-4 ">
        <div className="flex items-center gap-2">
          {icon && icon}
          <CardTitle className="text-xl font-bold">{title}</CardTitle>
        </div>
        <CardDescription className="text-lg">{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">{children}</CardContent>
    </Card>
  );
};

export default CustomCard;
