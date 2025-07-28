"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { FieldValues, SubmitHandler } from "react-hook-form";
import TabForm from "./tab-form";
import { toast } from "sonner";

export default function AuthenticationForm() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [formType, setFormType] = React.useState("");

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/auth/${formType}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const response = await res.json();
      setIsLoading(false);
      toast.success(response.message);
      console.log(response);
    } catch (error) {
      console.error(error);
      toast.success("Internal Server error");
    }
  };

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-card p-6 rounded-xl space-y-2">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <h1 className="text-3xl font-bold text-gray-900">FlyBuddy</h1>
          </div>
          <p className="text-gray-600">
            Sign in to your account or create a new one
          </p>
        </div>

        <div className="min-h-68">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 h-10">
              <TabsTrigger value="login" className="rounded">
                Login
              </TabsTrigger>
              <TabsTrigger value="register" className="rounded">
                Register
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login" onClick={() => setFormType("login")}>
              <TabForm
                isLoading={isLoading}
                onSubmit={onSubmit}
                formType="login"
              />
            </TabsContent>

            <TabsContent
              value="register"
              onClick={() => setFormType("register")}
            >
              <TabForm
                isLoading={isLoading}
                onSubmit={onSubmit}
                formType="register"
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
