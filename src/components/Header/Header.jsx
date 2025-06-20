import { LogOut } from "lucide-react";
import { useGetUser } from "../../hooks/useGetUser";
import { useLogout } from "../../hooks/useLogout";
import UpdateModal from "./UpdateModal";

function Header() {
  const { data: user, isLoading } = useGetUser();
  const logoutMutation = useLogout();

  const handleLogout = () => logoutMutation.mutate();

  return (
    <header className="bg-customDarkBlue text-white py-2 shadow-md">
      <div className="mx-auto flex justify-between items-center px-4">
        <div className="flex items-center space-x-2">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-12 w-auto object-contain"
          />
        </div>

        <div className="flex items-center space-x-3 md:space-x-5">
          <div className="h-6 md:h-8 w-px bg-white opacity-90"></div>

          <div className="flex items-center space-x-2">
            {isLoading ? (
              <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse" />
            ) : (
              <>
                <img
                  src={user?.profileImage?.url}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="hidden md:block">{user?.userName}</span>
              </>
            )}
          </div>

          <UpdateModal user={user} />

          <button
            onClick={handleLogout}
            className="p-2 border border-[#3B44B2] rounded-lg bg-[#21234e] hover:bg-[#2a2d64] transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
