import { Eye, EyeOff, Loader2, Sprout } from "lucide-react";
import { Link } from "react-router-dom";

interface LoginProps {
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  isLoading: boolean;
  register: any;
  handleSubmit: any;
  onSubmit: (data: any) => void;
  errors: any;
}

const Login = ({
  showPassword,
  setShowPassword,
  isLoading,
  register,
  handleSubmit,
  onSubmit,
  errors,
}: LoginProps) => {
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
            Bem-vindo de volta
          </h2>
          <p className="text-gray-500 mb-8">
            Por favor, insira seus dados para entrar
          </p>

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
                placeholder="Insira seu nome de usuário"
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.username.message}
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

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-green-[#2F4F4F] focus:ring-green-950 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Lembrar de mim
                </label>
              </div>
              <a
                href="#"
                className="text-sm font-medium text-green-[#2F4F4F] hover:text-green-950"
              >
                Esqueceu a senha?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-black bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5 mr-2" />
                  Entrando...
                </>
              ) : (
                "Entrar"
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-900">
            Não tem uma conta?{" "}
            <Link
              to={"/signup"}
              className="font-medium text-green-950 hover:text-gray-700/70 transition-all"
            >
              Cadastre-se
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
              "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-green-900/50 backdrop-blur-sm"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-12">
            <h2 className="text-4xl font-bold mb-4 text-center">
              Junte-se à nós
            </h2>
            <p className="text-xl text-center max-w-md">
              Cada pequena ação conta! Faça parte do movimento que muda o mundo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
