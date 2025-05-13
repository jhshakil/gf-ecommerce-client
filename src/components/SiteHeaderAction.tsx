"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";
import AvatarComponent from "./AvatarComponent";
import { useRouter } from "next/navigation";
import { logoutService } from "@/services/AuthService";
import { useAuth } from "@/context/auth.provider";

const SiteHeaderAction = () => {
  const { setUser, setCustomer } = useAuth();

  const router = useRouter();
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="cursor-pointer">
            <AvatarComponent src={""} fallback={"S"} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel className="line-clamp-1">Email</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => router.push("/customer")}
            className={"cursor-pointer"}
          >
            <User className="mr-2 h-4 w-4" />
            <span>Account</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              logoutService();
              setUser(null);
              setCustomer(null);
            }}
            className="cursor-pointer"
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SiteHeaderAction;
