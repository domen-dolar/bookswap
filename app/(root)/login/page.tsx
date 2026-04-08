import LoginPage from "@/app/components/LoginPage";
import { Suspense } from "react";

const Login = () => {
  return (
    <Suspense fallback={null}>
      <LoginPage />
    </Suspense>
  );
};
export default Login;
