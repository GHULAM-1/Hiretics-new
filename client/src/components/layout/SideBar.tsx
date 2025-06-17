"use client";

import {
  Home,
  Star,
  Trash,
  Settings,
  LogOut,
  BarChart,
  Crown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SidebarProps } from "@/types/sidebar-types";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import axios from "axios";

const navItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Star, label: "Favourites", href: "/favourites" },
  { icon: Trash, label: "Trash", href: "/trash" },
  { icon: Settings, label: "Settings", href: "/settings" },
  { icon: BarChart, label: "Analytics", href: "/analytics" },
];

export const Sidebar = ({
  isMobileOpen,
  setIsMobileOpen,
  collapsed,
  setCollapsed,
}: SidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isUserSubscribed, setIsUserSubscribed] = useState(false);
  const storedUser = localStorage.getItem("user");
  const user = JSON.parse(storedUser || "{}");
  const getUserSubscription = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL_SUBSCRIPTION}/subs?user_id=${user.id}`
      );
      if (response.data.plan === "free") {
        setIsUserSubscribed(false);
      } else {
        setIsUserSubscribed(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserSubscription();
  }, []);

  const handleLogout = async () => {
    console.log("Logging out...");
    await supabase.auth.signOut();
    toast.success("Logged out successfully!");
    router.replace("/signin");
  };

  return (
    <>
      <div
        className={cn(
          "bg-white h-full flex flex-col justify-between fixed lg:static z-40 transition-all duration-300 shadow-md lg:shadow-none",
          collapsed ? "w-16" : "w-[250px]",
          isMobileOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0"
        )}
      >
        <div
          className={cn(
            "flex flex-col",
            collapsed ? "items-center" : "items-start",
            "py-6 px-4"
          )}
        >
          <h1
            onClick={() => setCollapsed(!collapsed)}
            className="text-2xl cursor-pointer font-bold text-[#16A34A] mb-6 border-b border-[#E4E4E7] w-full pb-3"
          >
            {collapsed ? "H" : "Hiretics"}
          </h1>

          <div
            className={cn(
              "flex flex-col gap-4 w-full",
              !collapsed && "px-[12px]"
            )}
          >
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                >
                  <Button
                    variant="ghost"
                    className={cn(
                      "flex items-center gap-3 w-full hover:cursor-pointer justify-start text-sm",
                      isActive && "bg-[#DCFCE7] text-[#16A34A]",
                      collapsed && "justify-center px-0"
                    )}
                  >
                    <item.icon
                      size={20}
                      className={cn(
                        "text-gray-500",
                        isActive && "text-[#16A34A] fill-[#16A34A]"
                      )}
                      fill={isActive ? "#16A34A" : "#52525B"}
                    />
                    {!collapsed && <span>{item.label}</span>}
                    {item.label === "Analytics" && !isUserSubscribed && (
                      <Crown size={20} className="text-yellow-600 ml-2" />
                    )}
                  </Button>
                </Link>
              );
            })}
            {!isUserSubscribed && (
              <Link href="/pricing" className="mt-5">
                <Button className="bg-[#16A34A] text-white w-full">
                  Subscribe to Pro
                </Button>
              </Link>
            )}
          </div>
        </div>

        <div
          className={cn(
            "flex pb-4 w-full justify-end",
            collapsed ? "justify-center" : "px-[25px]"
          )}
        >
          <Button
            variant="ghost"
            className={cn(
              "text-gray-600 w-full justify-start",
              collapsed && "w-10 p-0 justify-center"
            )}
            onClick={handleLogout}
          >
            <LogOut size={20} />
            {!collapsed && <span className="ml-2">Logout</span>}
          </Button>
        </div>
      </div>
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
};
