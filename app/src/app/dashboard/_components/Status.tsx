import { StatusType } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { Dot } from "lucide-react";

interface NavProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof buttonVariants> {
  value: StatusType;
  variant?: StatusType;
}

const buttonVariants = cva(
  "border rounded-md flex justify-center items-center p-1 font-medium capitalize pr-5 whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "text-[#1691B2] border-[#1691B2]",
        ACTIVE: "text-[#1691B2] border-[#1691B2]",
        COMPLETED: "text-[#00552B] border-[#00552B]",
        PUBLISHED: "text-[#00552B] border-[#00552B]",
        DRAFT: "text-[#00552B] border-[#00552B]",
        PAID: "text-[#00552B] border-[#00552B]",
        NEW: "text-[#00552B] border-[#00552B]",
        VERIFIED: "text-[#FF1717] border-[#FF1717]",
        UNVERIFIED: "text-[#FF1717] border-[#FF1717]",
        PENDING: "text-[#E4B600] border-[#E4B600]",
        RESTRICTED: "text-[#E4B600] border-[#E4B600]",
        DOWNGRADE: "text-[#FF1717] border-[#FF1717]",
        CANCELLED: "text-[#FF1717] border-[#FF1717]",
        REJECTED: "text-[#FF1717] border-[#FF1717]",
        BANNED: "text-[#FF1717] border-[#FF1717]",
        UPGRADE: "text-[#FF1717] border-[#FF1717]",
        CANCEL: "text-[#FF1717] border-[#FF1717]",
        RENEW: "text-[#FF1717] border-[#FF1717]",
        link: "text-[#FF1717] border-[#FF1717]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export default function Status({
  value,
  variant,
  className,
}: NavProps) {
  return (
    <div
      className={cn(buttonVariants({ variant: value, className }))}
    >
      <Dot size={60} className="-m-4" />
      {value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()}
    </div>
  );
}
