import { useState } from "react";
import Donations from "./Donations";

const DonationsContainer = () => {
  const donationAmounts = [
    { value: 10, label: "R$10" },
    { value: 25, label: "R$25" },
    { value: 50, label: "R$50" },
    { value: 100, label: "R$100" },
    { value: 0, label: "Outro" },
  ]
  
  const paymentMethods = [
    {
      id: "pix",
      name: "Pix",
      icon: <div className="w-5 h-5 flex items-center justify-center text-s font-bold">Pix</div>,
    },
  ]
  const testimonials = [
    {
      name: "Ana Silva",
      quote:
        "Doar para a Econecta me faz sentir que estou contribuindo diretamente para um futuro mais sustentável.",
      role: "Doadora mensal desde 2022",
    },
    {
      name: "Carlos Mendes",
      quote:
        "A transparência da Econecta é impressionante. Recebo atualizações regulares sobre como minha doação está sendo utilizada.",
      role: "Doador desde 2021",
    },
    {
      name: "Mariana Costa",
      quote:
        "Conheci o trabalho da Econecta através de um amigo e fiquei impressionada com o impacto que eles têm nas comunidades locais.",
      role: "Doadora recente",
    },
  ];
  const [selectedAmount, setSelectedAmount] = useState(25)
  const [customAmount, setCustomAmount] = useState("")
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    state: "",
    zip: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount)
    if (amount > 0) {
      setCustomAmount("")
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const donationAmount = selectedAmount === 0 ? Number.parseFloat(customAmount) : selectedAmount

    if (isNaN(donationAmount) || donationAmount <= 0) {
      alert("Por favor, insira um valor de doação válido maior que 0.")
      return
    }

    console.log({
      amount: donationAmount,
      ...formData,
    })
    alert("Doação processada com sucesso! Obrigado pela sua contribuição.")
  }
  return <Donations
    testimonials={testimonials}
    handleInputChange={handleInputChange}
    handleAmountSelect={handleAmountSelect}
    handleSubmit={handleSubmit}
    donationAmounts={donationAmounts}
    paymentMethods={paymentMethods}
    selectedAmount={selectedAmount}
    customAmount={customAmount}
    setCustomAmount={setCustomAmount} 
    formData={formData}
  />;
}

export default DonationsContainer;