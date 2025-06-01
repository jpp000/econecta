import { useEffect, useState } from "react";
import Donations from "./Donations";
import { useNavbarStore } from "@/store/useNavbarStore";

const DonationsContainer = () => {
  const donationAmounts = [
    { value: 10, label: "R$10" },
    { value: 25, label: "R$25" },
    { value: 50, label: "R$50" },
    { value: 100, label: "R$100" },
    { value: 0, label: "Outro" },
  ];

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
  const [selectedAmount, setSelectedAmount] = useState(25);
  const [customAmount, setCustomAmount] = useState("");

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    if (amount > 0) {
      setCustomAmount("");
    }
  };

  const { setVariant } = useNavbarStore();

  useEffect(() => {
      setVariant("dark");
  }, [setVariant]);

  return (
    <Donations
      testimonials={testimonials}
      handleAmountSelect={handleAmountSelect}
      donationAmounts={donationAmounts}
      selectedAmount={selectedAmount}
      customAmount={customAmount}
      setCustomAmount={setCustomAmount}
    />
  );
};

export default DonationsContainer;
