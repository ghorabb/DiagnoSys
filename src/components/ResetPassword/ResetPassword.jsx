import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useResetPassword } from "../../hooks/useResetPassword";

export default function ResetPassword() {
  const location = useLocation();
  const emailFromForget = location.state?.email || "";

  const [formData, setFormData] = useState({
    email: emailFromForget,
    password: "",
    confirmPassword: "",
    forgetCode: "",
  });

  const { mutate: resetPassword, isPending } = useResetPassword();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return alert("Passwords do not match");
    }

    resetPassword(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-customBlue mb-6">
          Reset Password
        </h2>

        {["email", "forgetCode", "password", "confirmPassword"].map((field) => (
          <div key={field} className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              {field === "forgetCode"
                ? "Reset Code"
                : field.replace(/([A-Z])/g, " $1")}
            </label>
            <input
              type={
                field.toLowerCase().includes("password") ? "password" : "text"
              }
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-customBlue"
              placeholder={`Enter ${field}`}
            />
          </div>
        ))}

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-customBlue text-white py-2 rounded-md"
        >
          {isPending ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}
