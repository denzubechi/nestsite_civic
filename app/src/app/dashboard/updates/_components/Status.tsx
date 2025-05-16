import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

interface NavProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof buttonVariants> {
  value: 'PUBLISHED' | 'DRAFT';
}

const buttonVariants = cva(
  "rounded-md flex justify-center items-center p-2 capitalize whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "text-[#ffffff] bg-[#BDBDBD]",
        PUBLISHED: "text-[#FFFFFF] bg-[#1691B2]",
        DRAFT: "text-[#ffffff] bg-[#BDBDBD]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export default function BlogStatus({
  value,
  className,
}: NavProps) {
  return (
    <div
      className={cn(buttonVariants({ variant: value, className }))}
    >
      {value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()}
    </div>
  );
}
