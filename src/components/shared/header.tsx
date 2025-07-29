import React from "react";
import { Badge } from "../ui/badge";
import Button from "../ui/button";
import getUser from "@/helpers/getUser";

export default async function Header() {
    const user = await getUser()
  return (
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">FlyBuddy</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="px-3 py-1">
                {user?.role === "admin" ? "Admin" : "User"}
              </Badge>
              <span className="text-sm text-gray-600">
                Welcome, {user?.name}
              </span>
              <Button className="bg-primary text-white h-8 p-0 px-2">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>
  );
}
