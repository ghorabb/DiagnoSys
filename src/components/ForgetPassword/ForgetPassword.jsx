import { useState } from "react";
import { useForgetPassword } from "../../hooks/useForgetPassword";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const { mutate: sendCode, isPending } = useForgetPassword();

  const handleSubmit = (e) => {
    e.preventDefault();
    sendCode({ email });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-customBlue mb-6">
          Forget Password
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-customBlue"
            placeholder="Enter your email"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-customBlue text-white py-2 rounded-md"
        >
          {isPending ? "Sending..." : "Send Reset Code"}
        </button>
      </form>
    </div>
  );
}
