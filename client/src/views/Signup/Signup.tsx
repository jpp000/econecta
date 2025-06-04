import { Eye, EyeOff, Loader2, Sprout } from "lucide-react";
import { Link } from "react-router-dom";

interface SignupProps {
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  showConfirmPassword: boolean;
  setShowConfirmPassword: (show: boolean) => void;
  isLoading: boolean;
  register: any;
  handleSubmit: any;
  onSubmit: (data: any) => void;
  errors: any;
}

const Signup = ({
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  isLoading,
  register,
  handleSubmit,
  onSubmit,
  errors,
}: SignupProps) => {
  return (
    <div className="min-h-screen mt-18 flex flex-col md:flex-row">
      {/* Lado esquerdo - Formulário */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-16">
        <div className="w-full max-w-md">
          <div className="flex items-center mb-8">
            <div className="bg-yellow-400 rounded-full p-2 mr-2">
              <Sprout className="h-6 w-6 text-green-950" />
            </div>
            <h1 className="text-2xl font-bold text-green-950">Econecta</h1>
          </div>

          <h2 className="text-3xl font-semibold text-green-950 mb-2">
            Crie uma conta
          </h2>
          <p className="text-gray-500 mb-8">Junte-se à revolução verde hoje</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Nome de usuário
              </label>
              <input
                id="username"
                type="text"
                {...register("username")}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.username ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-green-950 focus:border-transparent transition-all`}
                placeholder="Escolha um nome de usuário"
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register("email")}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-green-950 focus:border-transparent transition-all`}
                placeholder="Digite seu email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Senha
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-green-950 focus:border-transparent transition-all`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirmar senha
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword")}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-green-950 focus:border-transparent transition-all`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="h-4 w-4 text-green-[#2F4F4F] focus:ring-green-950 border-gray-300 rounded"
              />
              <label
                htmlFor="terms"
                className="ml-2 block text-sm text-gray-700"
              >
                Eu concordo com os{" "}
                <a href="#" className="text-green-950 hover:text-gray-700/70">
                  Termos de Serviço
                </a>{" "}
                e{" "}
                <a href="#" className="text-green-950 hover:text-gray-700/70">
                  Política de Privacidade
                </a>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-black bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5 mr-2" />
                  Criando conta...
                </>
              ) : (
                "Criar conta"
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-900">
            Já possui uma conta?{" "}
            <Link
              to={"/login"}
              className="font-medium text-green-950 hover:text-gray-700/70 transition-all"
            >
              Entrar
            </Link>
          </p>
        </div>
      </div>

      {/* Lado direito - Imagem */}
      <div className="hidden md:block md:w-1/2 bg-green-100">
        <div
          className="h-full w-full bg-cover bg-center relative"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-green-900/50 backdrop-blur-sm"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-12">
            <h2 className="text-4xl font-bold mb-4 text-center">
              Bem-vindo ao Econecta
            </h2>
            <p className="text-xl text-center max-w-md">
              Crie sua conta e junte-se a milhares de indivíduos conscientes
              que fazem a diferença todos os dias.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
