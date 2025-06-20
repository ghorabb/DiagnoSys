import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useUpdateProfile } from "../../hooks/useUpdateProfile";

function UpdateForm({ user }) {
  const { mutate, isPending } = useUpdateProfile();
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (user) {
      reset({
        userName: user.userName || "",
        specialization: user.specialization || "",
        phone: user.phone || "",
      });
    }
  }, [user, reset]);

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("userName", data.userName);
    formData.append("specialization", data.specialization);
    formData.append("phone", data.phone);
    if (data.profileImage?.length > 0) {
      formData.append("profileImage", data.profileImage[0]);
    }
    mutate(formData);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 p-4 bg-white rounded-xl shadow-md"
    >
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Username
        </label>
        <input
          {...register("userName")}
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-customBlue"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Specialization
        </label>
        <input
          {...register("specialization")}
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-customBlue"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Phone
        </label>
        <input
          {...register("phone")}
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-customBlue"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Profile Image
        </label>
        <input
          {...register("profileImage")}
          type="file"
          accept="image/*"
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-customBlue"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isPending}
          className="bg-customBlue text-white px-6 py-2 rounded-xl transition-colors disabled:opacity-50"
        >
          {isPending ? "Updating..." : "Update Profile"}
        </button>
      </div>
    </form>
  );
}

export default UpdateForm;
