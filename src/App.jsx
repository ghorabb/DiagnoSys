import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

import Doctor from "./components/Doctor/Doctor";
import Lab from "./components/Lab/Lab";
import Layout from "./components/Layout/Layout";
import Login from "./components/Login/Login";
import NotFound from "./components/NotFound/NotFound";
import RadCenter from "./components/RadCenter/RadCenter";
import Receptionist from "./components/Receptionist/Receptionist";
import ProtectedRoute from "./ui/ProtectedRoute";
import { CalendarProvider } from "./context/CalendarContext";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import { HelmetProvider } from "react-helmet-async";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "forget-password",
    element: <ForgetPassword />,
  },
  {
    path: "reset-password",
    element: <ResetPassword />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "doctor",
        element: <ProtectedRoute allowedRole="doctor" />,
        children: [{ path: "", element: <Doctor /> }],
      },
      {
        path: "laboratory",
        element: <ProtectedRoute allowedRole="laboratory" />,
        children: [{ path: "", element: <Lab /> }],
      },
      {
        path: "receptionist",
        element: <ProtectedRoute allowedRole="receptionist" />,
        children: [{ path: "", element: <Receptionist /> }],
      },
      {
        path: "radiology",
        element: <ProtectedRoute allowedRole="radiology" />,
        children: [{ path: "", element: <RadCenter /> }],
      },
    ],
  },
]);

function App() {
  return (
    <CalendarProvider>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <RouterProvider router={router} />
          <Toaster
            position="top-center"
            gutter={12}
            containerStyle={{ margin: "8px" }}
            toastOptions={{
              success: {
                duration: 3000,
              },
              error: {
                duration: 5000,
              },
              style: {
                fontSize: "16px",
                maxWidth: "500px",
                padding: "16px 24px",
                backgroundColor: "#fff",
                color: "#374151",
              },
            }}
          />
        </HelmetProvider>
      </QueryClientProvider>
    </CalendarProvider>
  );
}


export default App;
