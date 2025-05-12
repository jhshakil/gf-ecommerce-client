import { AvatarFallback } from "@radix-ui/react-avatar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  alt?: string;
  className?: string;
  fallback?: string;
};

const AvatarComponent = ({
  src,
  className = "w-8 h-8",
  alt = "profile",
  fallback = "S",
}: Props) => {
  return (
    <div className="relative">
      <Avatar className={cn(className)}>
        <AvatarImage src={src} alt={alt} className="object-cover" />
        <AvatarFallback className="uppercase flex justify-center items-center w-full h-full bg-secondary">
          {fallback}
        </AvatarFallback>
      </Avatar>
    </div>
  );
};

export default AvatarComponent;
