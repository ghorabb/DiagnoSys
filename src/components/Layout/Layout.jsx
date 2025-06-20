import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import PageTitle from "../../ui/PageTitle";

function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <PageTitle />
      <Header />
      <main className="flex-1 container mx-auto p-2">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
