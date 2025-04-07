import { InfiniteCarousel } from "@/components/InfiniteCarousel/InfiniteCarousel";
import { Leaf, Check, ChevronDown, Lock } from "lucide-react";

interface DonationProps {
  testimonials: any;
  handleInputChange: any;
  handleAmountSelect: any;
  handleSubmit: any;
  donationAmounts: any;
  paymentMethods: any;
  selectedAmount: number;
  customAmount: string;
  setCustomAmount: any;
  formData: any;
}

const Donations = ({
  testimonials,
  handleInputChange,
  handleAmountSelect,
  handleSubmit,
  donationAmounts,
  paymentMethods,
  selectedAmount,
  customAmount,
  setCustomAmount,
  formData,
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
                  Escolha seu método de pagamento preferido
                </p>
              </div>

              <div className="px-6 py-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Payment Method Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Método de pagamento
                    </label>
                    <div className="grid grid-cols-1 gap-3">
                      {paymentMethods.map((method: any) => (
                        <button
                          key={method.id}
                          type="button"
                          className="flex items-center justify-center gap-2 py-3 px-4 rounded-md border text-sm font-medium bg-[#2F4F4F] text-white border-[#2F4F4F]"
                        >
                          {method.icon}
                        </button>
                      ))}
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

                  {/* Address Information */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">
                      Endereço de cobrança
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label
                          htmlFor="address"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Endereço
                        </label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#2F4F4F] focus:border-[#2F4F4F] sm:text-sm"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="city"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Cidade
                          </label>
                          <input
                            type="text"
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#2F4F4F] focus:border-[#2F4F4F] sm:text-sm"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="state"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Estado
                          </label>
                          <div className="relative">
                            <select
                              id="state"
                              name="state"
                              value={formData.state}
                              onChange={handleInputChange}
                              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#2F4F4F] focus:border-[#2F4F4F] sm:text-sm appearance-none"
                            >
                              <option value="">Selecione</option>
                              <option value="AC">Acre</option>
                              <option value="AL">Alagoas</option>
                              <option value="AP">Amapá</option>
                              <option value="AM">Amazonas</option>
                              <option value="BA">Bahia</option>
                              <option value="CE">Ceará</option>
                              <option value="DF">Distrito Federal</option>
                              <option value="ES">Espírito Santo</option>
                              <option value="GO">Goiás</option>
                              <option value="MA">Maranhão</option>
                              <option value="MT">Mato Grosso</option>
                              <option value="MS">Mato Grosso do Sul</option>
                              <option value="MG">Minas Gerais</option>
                              <option value="PA">Pará</option>
                              <option value="PB">Paraíba</option>
                              <option value="PR">Paraná</option>
                              <option value="PE">Pernambuco</option>
                              <option value="PI">Piauí</option>
                              <option value="RJ">Rio de Janeiro</option>
                              <option value="RN">Rio Grande do Norte</option>
                              <option value="RS">Rio Grande do Sul</option>
                              <option value="RO">Rondônia</option>
                              <option value="RR">Roraima</option>
                              <option value="SC">Santa Catarina</option>
                              <option value="SP">São Paulo</option>
                              <option value="SE">Sergipe</option>
                              <option value="TO">Tocantins</option>
                              {/* Add more states as needed */}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                              <ChevronDown className="h-4 w-4 text-gray-400" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="zip"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          CEP
                        </label>
                        <input
                          type="text"
                          id="zip"
                          name="zip"
                          value={formData.zip}
                          onChange={handleInputChange}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#2F4F4F] focus:border-[#2F4F4F] sm:text-sm"
                          placeholder="00000-000"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="px-6 py-6 border-t flex flex-col">
                    <button
                      type="submit"
                      className="w-full bg-[#ece94c] hover:bg-[#ece94c]/90 text-black font-medium py-3 rounded-md flex items-center justify-center gap-2"
                    >
                      <Lock className="w-4 h-4" />
                      Finalizar doação
                    </button>
                    <p className="text-xs text-gray-500 mt-3 text-center">
                      Suas informações de pagamento são seguras e criptografadas
                    </p>
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
              className="bg-white p-6 rounded-lg shadow-sm border"
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
