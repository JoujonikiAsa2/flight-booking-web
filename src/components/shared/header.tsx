"use client";
import React from "react";
import { Badge } from "../ui/badge";
import Button from "../ui/button";
import { logoutUser } from "@/services/auth";
import Link from "next/link";
import { useAppSelector, useAppDispatch } from "@/redux/hook";
import { currentUser, removeUser } from "@/redux/features/auth/authSlice";

export default function Header() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(currentUser);
  const handleLogOut = async () => {
    await logoutUser();
    dispatch(removeUser());
  };
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">FlyBuddy</h1>
          </Link>
          <div className="flex items-center space-x-4">
            {user && (
              <Badge variant="secondary" className="px-3 py-1">
                {user?.role === "admin" ? "Admin" : "User"}
              </Badge>
            )}
            {user && (
              <span className="text-sm text-gray-600">
                Welcome, {user?.name}
              </span>
            )}
            {user ? (
              <>
                <Button
                  className="bg-primary text-white h-8 p-0 px-2"
                  onClick={handleLogOut}
                >
                  Logout
                </Button>
                {user?.role === "ADMIN" ? <Link
                  href={`/dashboard/admin/overview`}
                >
                  <Button
                    className="bg-foreground text-white h-8 p-0 px-2"
                  >
                    Dashboard
                  </Button>
                </Link>:<Link
                  href={`/dashboard/user/my-bookings`}
                >
                  <Button
                    className="ml-2 bg-foreground text-white h-8 p-0 px-2"
                  >
                    Dashboard
                  </Button>
                </Link>}
              </>
            ) : (
              <Link href="/login">
                <Button className="bg-primary text-white h-8 p-0 px-2">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
