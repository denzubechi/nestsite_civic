/**
 * v0 by Vercel.
 * @see https://v0.dev/t/5aJg3DFWpNT
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge, BellIcon } from "lucide-react";

export default function NotificationsDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative rounded-full">
          <BellIcon size={18} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="center" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex items-center justify-between p-2">
            <h2 className="text-primary ">Notification</h2>

            <a href="#" className="text-red-600">
              Clear All
            </a>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="mx-4" />

        {/* <DropdownMenuGroup className="px-2">
                    {
                        [0, 0, 0, 0].map((_, index) => (
                            <DropdownMenuItem key={index}>
                                <div className="flex items-start space-x-4">
                                    <Avatar>
                                        <AvatarImage src="/placeholder-user.jpg" />
                                        <AvatarFallback>U</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="mb-2">John Bryan submitted compliance.</p>
                                        <p className="text-xs text-gray-500">2 days ago</p>
                                    </div>
                                </div>
                            </DropdownMenuItem>
                        ))
                    }

                </DropdownMenuGroup> */}
        <DropdownMenuSeparator className="mx-4" />

        <DropdownMenuItem className="p-4">
          <p className="text-primary text-center text-xs w-full">
            View all Notifications
          </p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
