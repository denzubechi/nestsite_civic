import { StatusType } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

interface NavProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof buttonVariants> {
  value: StatusType;
}

const buttonVariants = cva(
  "inline-block p-2 px-4 rounded-full capitalize ",
  {
    variants: {
      variant: {
        default: "text-[#1691B2] bg-[#1691b21a]",
        ACTIVE: "text-[#1691B2] bg-[#1691b21a]",
        COMPLETED: "text-[#00552B] bg-[#C7EBD6]",
        PUBLISHED: "text-[#00552B] border-[#00552B]",
        DRAFT: "text-[#00552B] border-[#00552B]",
        VERIFIED: "text-[#FF1717] bg-[#FFEAE1]",
        UNVERIFIED: "text-[#FF1717] bg-[#FFEAE1]",
        PENDING: "text-[#E4B600] bg-[#FFF8D7] font-semibold",
        DOWNGRADE: "text-[#FF1717] bg-[#FFEAE1]",
        CANCELLED: "text-[#FF1717] bg-[#FFEAE1]",
        UPGRADE: "text-[#FF1717] bg-[#FFEAE1]",
        CANCEL: "text-[#FF1717] bg-[#FFEAE1]",
        RENEW: "text-[#FF1717] bg-[#FFEAE1]",
        link: "text-[#FF1717] bg-[#FFEAE1]",

        PAID: "text-[#00552B] border-[#00552B]",
        NEW: "text-[#00552B] border-[#00552B]",
        RESTRICTED: "text-[#E4B600] border-[#E4B600]",
        REJECTED: "text-[#FF1717] border-[#FF1717]",
        BANNED: "text-[#FF1717] border-[#FF1717]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export default function StatusSecondary({
  value,
  className,
}: NavProps) {
  return (
    <div
      className={cn(buttonVariants({ variant: value as StatusType, className }))}
    >
      {value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()}
    </div>
  );
}
