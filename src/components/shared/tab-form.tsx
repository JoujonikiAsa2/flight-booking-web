import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import Input from "../ui/input";
import { Loader2Icon } from "lucide-react";

export default function TabForm({
  isLoading,
  onSubmit,
  formType,
}: {
  isLoading: boolean;
  onSubmit: (value: FieldValues) => void;
  formType: string;
}) {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm();
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="font-medium">
          Email
        </label>
        <div>
          <Input
            type="text"
            placeholder="Enter your email"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="text-red-500 text-xs">Email is required</span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="font-medium">
          Password
        </label>
        <div>
          <Input
            type="password"
            placeholder="Enter your password"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <span className="text-red-500 text-xs">Password is required</span>
          )}
        </div>
      </div>
      {formType === "register" && (
        <>
          <div className="flex flex-col gap-2">
            <label htmlFor="phone" className="font-medium">
              Name
            </label>
            <div>
              <Input
                type="text"
                placeholder="Enter your name"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <span className="text-red-500 text-xs">Name is required</span>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="phone" className="font-medium">
              Phone
            </label>
            <div>
              <Input
                type="text"
                placeholder="Enter your phone"
                {...register("phone", { required: true })}
              />
              {errors.phone && (
                <span className="text-red-500 text-xs">Phone is required</span>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="gender" className="font-medium">
              Gender
            </label>
            <div>
              <select
                {...register("gender")}
                className="border w-full h-10 p-2 rounded focus:outline-1"
              >
                <option value="female">female</option>
                <option value="male">male</option>
                <option value="other">other</option>
              </select>
              {errors.gender && (
                <span className="text-red-500 text-xs">Gender is required</span>
              )}
            </div>
          </div>
        </>
      )}
      <button
        className="w-full h-10 p-2 rounded mt-2 bg-foreground text-white"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? <Loader2Icon className="animate-spin mx-auto"/> : <span>{formType === "login" ? "Sign In" : "Register"}</span>}
      </button>
    </form>
  );
}
