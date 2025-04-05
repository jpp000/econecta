import Login from "./Login";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { LoginData, loginSchema } from "@/schemas/loginSchema";

const LoginContainer = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { isLoading, login } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginData) => {
    login(data);
  };

  return (
    <Login
      showPassword={showPassword}
      setShowPassword={setShowPassword}
      isLoading={isLoading}
      register={register}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      errors={errors}
    />
  );
};

export default LoginContainer;
