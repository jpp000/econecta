import { InfiniteCarousel } from "@/components/InfiniteCarousel/InfiniteCarousel";
import { Leaf, Check } from "lucide-react";

interface DonationProps {
  testimonials: any;
  handleAmountSelect: any;
  donationAmounts: any;
  selectedAmount: number;
  customAmount: string;
  setCustomAmount: any;
}

const Donations = ({
  testimonials,
  handleAmountSelect,
  donationAmounts,
  selectedAmount,
  customAmount,
  setCustomAmount,
}: DonationProps) => {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 bg-green-100/30">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-[#2F4F4F] rounded-full opacity-20 blur-md"></div>
              <div className="relative bg-[#2F4F4F] text-white p-3 rounded-full">
                <Leaf className="w-6 h-6" strokeWidth={1.5} />
              </div>
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#2F4F4F] mb-3">
            Faça sua doação
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Sua contribuição ajuda a financiar projetos de sustentabilidade e
            educação ambiental em todo o Brasil.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column - Donation Info */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl border shadow-sm p-6 sticky top-24 flex flex-col gap-6">
              <div>
                <h2 className="text-xl font-semibold text-[#2F4F4F]">
                  Sua doação
                </h2>
                <p className="text-sm text-gray-500">
                  Escolha quanto você quer doar
                </p>
              </div>

              <div className="space-y-6">
                {/* Donation Amount */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Valor da doação
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {donationAmounts.map((amount: any) => (
                      <button
                        key={amount.value}
                        type="button"
                        onClick={() => handleAmountSelect(amount.value)}
                        className={`py-2 px-3 rounded-md border text-sm font-medium transition-colors ${
                          selectedAmount === amount.value
                            ? "bg-[#2F4F4F] text-white border-[#2F4F4F]"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {amount.label}
                      </button>
                    ))}
                  </div>
                  {selectedAmount === 0 && (
                    <div className="mt-3">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">R$</span>
                        </div>
                        <input
                          type="text"
                          name="customAmount"
                          value={customAmount}
                          onChange={(e) => setCustomAmount(e.target.value)}
                          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#2F4F4F] focus:border-[#2F4F4F] sm:text-sm"
                          placeholder="Outro valor"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Impact Information */}
                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                  <h3 className="font-medium text-green-800 mb-2">
                    Seu impacto
                  </h3>
                  <ul className="space-y-2 text-sm text-green-700">
                    <li className="flex items-start">
                      <Check className="w-4 h-4 mr-2 mt-0.5 text-green-600" />
                      <span>Plantio de árvores nativas</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 mr-2 mt-0.5 text-green-600" />
                      <span>Educação ambiental para comunidades</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 mr-2 mt-0.5 text-green-600" />
                      <span>Proteção de áreas de preservação</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Payment Form */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl border shadow-sm">
              <div className="px-6 py-6 border-b">
                <h2 className="text-xl font-semibold text-[#2F4F4F]">
                  Informações de pagamento
                </h2>
                <p className="text-sm text-gray-500">
                  Faça seu pagamento via pix
                </p>
              </div>

              <div className="px-6 py-6">
                <form className="space-y-6">
                  {/* Payment Method Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Método de pagamento
                    </label>
                    <div className="grid grid-cols-1 gap-3">
                      <button
                        type="button"
                        className="flex items-center justify-center gap-2 py-3 px-4 rounded-md border text-sm font-medium bg-[#2F4F4F] text-white border-[#2F4F4F]"
                      >
                        Pix
                      </button>
                    </div>
                  </div>

                  {/* PIX Information */}
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 text-center">
                    <div className="mb-4">
                      <div className="mx-auto w-32 h-32 bg-white p-2 rounded-lg shadow-sm">
                        <div className="w-full h-full border-2 border-dashed border-gray-300 rounded flex items-center justify-center">
                          <span className="text-sm text-gray-500">
                            Código QR PIX
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-yellow-800 mb-2">
                      Escaneie o código QR com seu aplicativo bancário ou copie
                      a chave PIX abaixo
                    </p>
                    <div className="flex items-center justify-center">
                      <input
                        type="text"
                        value="00020126580014br.gov.bcb.pix0136example@econecta.org.br5204000053039865802BR5913Econecta ONG6008Sao Paulo62070503***63041D3D"
                        readOnly
                        className="block w-full max-w-xs px-3 py-2 border border-gray-300 rounded-l-md shadow-sm text-xs bg-gray-50"
                      />
                      <button
                        type="button"
                        className="bg-[#2F4F4F] text-white px-3 py-2 rounded-r-md text-sm"
                        onClick={() => alert("Código PIX copiado!")}
                      >
                        Copiar
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Testimonials */}
      <div className="mt-16">
        <h2 className="text-2xl font-serif font-bold text-[#2F4F4F] text-center mb-8">
          O que dizem nossos doadores
        </h2>

        <InfiniteCarousel>
          {testimonials.map((testimonial: any, index: number) => (
            <div
              key={index}
              className="h-[200px] w-[700px] bg-white p-6 rounded-lg shadow-sm border m-auto flex flex-col justify-between"
            >
              <p className="text-gray-600 mb-4 italic">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-[#2F4F4F] rounded-full flex items-center justify-center text-white font-medium">
                  {testimonial.name.charAt(0)}
                </div>
                <div className="ml-3">
                  <h4 className="font-medium text-gray-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </InfiniteCarousel>
      </div>
    </div>
  );
};

export default Donations;
