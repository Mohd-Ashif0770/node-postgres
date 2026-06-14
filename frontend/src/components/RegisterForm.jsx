import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userRegisterSchema } from "../validations/auth.validations";
import { useState } from "react";
import { userRegister } from "../services/auth.api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const inputClass =
  "w-full border border-gray-300 py-2 px-3 rounded-md text-sm outline-none focus:ring-1 focus:ring-blue-500";

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userRegisterSchema),
    mode: "onChange"
  });

  const submitHandler = async (data) => {
    try {
      setLoading(true);

      const response = await userRegister(data);

      if (response.status === 201) {
        toast.success("Registration completed");
        navigate("/login")
        reset();
      }
    } catch (error) {
      const message = error.response.data.message || "Failed to register user";
      toast.error(message);
    }finally{
        setLoading(false)
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="w-full max-w-md bg-white space-y-5 p-6 rounded-lg shadow-md"
      >
        <h2 className="text-center text-2xl font-medium text-blue-500">
          Create Account
        </h2>

        <div>
          <label className="block text-sm mb-1">Name:</label>
          <input
            type="text"
            {...register("name")}
            placeholder="enter name"
            className={inputClass}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm mb-1">Email:</label>
          <input
            type="email"
            {...register("email")}
            placeholder="enter email address"
            className={inputClass}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm mb-1">Password:</label>
          <input
            type="password"
            {...register("password")}
            placeholder="enter password"
            className={inputClass}
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm mb-1">Confirm Password:</label>
          <input
            type="password"
            {...register("confirmPassword")}
            placeholder="enter confirm password"
            className={inputClass}
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="cursor-pointer bg-blue-500 text-white py-1.5 px-4 rounded"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
