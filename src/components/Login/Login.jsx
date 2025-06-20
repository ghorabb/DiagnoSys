import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useLogin } from "../../hooks/useLogin";

const roles = ["doctor", "laboratory", "radiology", "receptionist"];

export default function Login() {
  const [selectedRole, setSelectedRole] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const loginMutation = useLogin(selectedRole);

  function onSubmit(data) {
    if (!selectedRole) {
      toast.error("Please select your role!");
      return;
    }
    loginMutation.mutate({ ...data, role: selectedRole });
  }

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gray-100 px-4">
      <div className="w-full max-w-md md:max-w-lg lg:max-w-xl bg-white p-6 md:p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center">
          Sign in to your account
        </h2>
        <p className="text-gray-500 text-center">
          Welcome back! Please enter your details.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /[^@\s]+@[^@\s]+\.[^@\s]+/,
                  message: "Invalid email format",
                },
              })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-customBlue"
              placeholder="Enter your Email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Must be at least 6 characters",
                },
              })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-customBlue"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
            <p className="text-sm mt-2">
              <a href="/forget-password" className="text-blue-500 underline">
                Forget Password?
              </a>
            </p>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
            {roles.slice(0, 3).map((role) => (
              <button
                key={role}
                type="button"
                className={`px-4 py-2 rounded-lg border text-center ${
                  selectedRole === role
                    ? "bg-customBlue text-white"
                    : "bg-white"
                }`}
                onClick={() => setSelectedRole(role)}
              >
                {role}
              </button>
            ))}
          </div>
          <div className="mt-2 grid grid-cols-1 sm:grid-cols-1 gap-2">
            {roles.slice(3).map((role) => (
              <button
                key={role}
                type="button"
                className={`px-4 py-2 rounded-lg border text-center ${
                  selectedRole === role
                    ? "bg-customBlue text-white"
                    : "bg-white"
                }`}
                onClick={() => setSelectedRole(role)}
              >
                {role}
              </button>
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-customBlue text-white py-2 rounded-lg mt-4"
            disabled={loginMutation.isLoading}
          >
            {loginMutation.isPending ? "Logging in..." : "Log in"}
          </button>
        </form>
      </div>
    </div>
  );
}
