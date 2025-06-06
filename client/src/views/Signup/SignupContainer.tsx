import { useCallback, useEffect, useState } from "react";
import Signup from "./Signup";
import { useAuthStore } from "@/store/useAuthStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupData, signupSchema } from "@/schemas/signupSchema";
import { useNavbarStore } from "@/store/useNavbarStore";

const SignupContainer = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { isLoading, signup } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = useCallback(
    (data: SignupData) => {
      signup(data);
    },
    [signup]
  );

  const { setVariant } = useNavbarStore();

  useEffect(() => {
    setVariant("light");
  }, [setVariant]);

  return (
    <Signup
      showPassword={showPassword}
      setShowPassword={setShowPassword}
      showConfirmPassword={showConfirmPassword}
      setShowConfirmPassword={setShowConfirmPassword}
      isLoading={isLoading}
      register={register}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      errors={errors}
    />
  );
};

export default SignupContainer;
