import { Icons } from "./icons";
import { cn } from "@/lib/utils";

interface TitleInfoProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
}

export default function TitleInfo({
  title,
  className,
}: TitleInfoProps) {
  const Info = Icons["info"];
  return (
    <div
      className={cn(
        "flex w-[168px] flex-row items-center justify-between",
        className
      )}
    >
      

      <span className="text-xl font-bold">{title}</span>
      <Info className="ml-4 h-4 w-4 text-gray-400 " />
    </div>
  );
}
