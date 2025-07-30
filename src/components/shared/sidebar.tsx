"use client";
import { currentUser, removeUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { logoutUser } from "@/services/auth";
import { User, ShoppingBag, Menu, X, Sparkles, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

interface SidebarProps {
  userName?: string;
}

const DashboardSidebar: React.FC<SidebarProps> = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();
  const user = useAppSelector(currentUser);
  const dispatch = useAppDispatch()

  const adminNavItems = [
    {
      name: "Overview",
      href: "/dashboard/admin/overview",
      icon: Sparkles,
    },
    {
      name: "Flights",
      href: "/dashboard/admin/flights",
      icon: User,
    },
    {
      name: "Bookings",
      href: "/dashboard/admin/bookings",
      icon: ShoppingBag,
    },
  ];
  const userNavItems = [
    {
      name: "My Booking",
      href: "/dashboard/admin/my-bookings",
      icon: ShoppingBag,
    },
  ];

  const isActive = (href: string) => pathname === href;
  const handleLogOut = async () => {
    await logoutUser();
    dispatch(removeUser())
  };
  return (
    <div>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md border"
      >
        {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed top-0 left-0 h-screen w-64 bg-foreground border-r border-gray-200 
        transform transition-transform duration-300 ease-in-out z-40
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 border-2 cursor-pointer border-orange-500 bg-[#101940] rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-xl">
                  {user?.name?.slice(0, 1)}
                </span>
              </div>
              <span className="text-white font-semibold text-xs">
                {user?.name}
              </span>
            </div>
          </div>
          {/* Navigation */}
          <nav className="flex-grow flex-1 p-4">
            <ul className="space-y-2">
              {(user?.role === "ADMIN" ? adminNavItems : userNavItems)?.map(
                (item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileOpen(false)}
                        className={`
                        flex items-center p-2 rounded-lg transition-all duration-200 group
                        ${
                          active
                            ? "bg-primary text-white shadow-lg"
                            : "text-white hover:bg-gray-50 hover:text-[#101940]"
                        }
                      `}
                      >
                        <Icon
                          size={20}
                          className={`
                          mr-3 transition-colors
                          ${
                            active
                              ? "text-white"
                              : "text-gray-400 group-hover:text-[#101940]"
                          }
                        `}
                        />
                        <span
                          className={`font-medium text-white" 
                          `}
                        >
                          {item.name}
                        </span>
                        {active && (
                          <div className="w-2 h-2 bg-white rounded-full ml-auto" />
                        )}
                      </Link>
                    </li>
                  );
                }
              )}
            </ul>
          </nav>
          <div className="flex justify-end mb-2 mr-2">
            <button className="bg-white px-2 py-1 rounded text-black text-xs flex items-center gap-2 hover:cursor-pointer" onClick={handleLogOut}>
              Logout <LogOut size={12}/>
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default DashboardSidebar;
