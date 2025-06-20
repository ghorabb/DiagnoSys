import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const titles = {
  "/doctor": "Doctor - DiagnoSys",
  "/laboratory": "Laboratory - DiagnoSys",
  "/radiology": "Radiology Center - DiagnoSys",
  "/receptionist": "Receptionist - DiagnoSys",
  "/login": "Login - DiagnoSys",
  "/forget-password": "Forget Password - DiagnoSys",
  "/reset-password": "Reset Password - DiagnoSys",
};

function PageTitle() {
  const { pathname } = useLocation();
  const title = titles[pathname] || "DiagnoSys";

  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
}

export default PageTitle;
