import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { userLoginSchema } from "../validations/auth.validations";
import { useState } from "react";
import { toast } from "sonner";
import { userLogin } from "../services/auth.api";
import { useNavigate } from "react-router-dom";

const inputClass =
  "w-full border border-gray-300 py-2 px-3 rounded-md text-sm outline-none focus:ring-1 focus:ring-blue-500";
const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userLoginSchema),
  });

  const submitHandler = async (data) => {
    try {
      setLoading(true);
      const response = await userLogin(data);

      if (response.status === 200) {
        toast.success("user logged in");
        reset();
        navigate("/");
      }
    } catch (error) {
      const message = error.response.data.message || "Login failed";
      toast.error(message);
    }finally{
        setLoading(false)
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="w-full max-w-md space-y-5 bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-center text-2xl font-medium text-blue-500">
          Login User
        </h2>
        <div>
          <label className="block mb-1 text-sm">Email : </label>
          <input
            type="text"
            {...register("email")}
            placeholder="enter email"
            className={inputClass}
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 text-sm">Password : </label>
          <input
            type="password"
            {...register("password")}
            placeholder="enter password"
            className={inputClass}
          />
          {errors.password && (
            <p className="text-sm text-red-500 mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white py-1.5 px-4 rounded cursor-pointer"
          >
            {loading ? "Logging..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
