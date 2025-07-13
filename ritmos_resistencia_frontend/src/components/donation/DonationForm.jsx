import React, { useState } from "react";
import { DollarSign, Heart, CreditCard, Smartphone } from "lucide-react"; 
import { toast } from "sonner";
import styles from '../../styles/donation/DonationForm.module.css'; 

const DonationForm = () => {
  const [selectedAmount, setSelectedAmount] = useState("25");
  const [customAmount, setCustomAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [donorInfo, setDonorInfo] = useState({
    name: "",
    email: "",
    message: ""
  });

  const predefinedAmounts = ["10", "25", "50", "100", "250"];

  const handleDonation = (e) => {
    e.preventDefault();
    const amount = customAmount || selectedAmount;
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Por favor, selecione ou digite um valor para doação.", {
        description: "O valor da doação deve ser maior que zero."
      });
      return;
    }
    toast.success(`Obrigado pela sua doação de R$ ${amount}!`, {
      description: "Sua contribuição faz a diferença na vida dos artistas."
    });
    setSelectedAmount("25");
    setCustomAmount("");
    setPaymentMethod("credit-card");
    setDonorInfo({ name: "", email: "", message: "" });
  };

  const handleInputChange = (field, value) => {
    setDonorInfo(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className={styles.donationCard}>
      <div className={styles.donationCardHeader}>
        <h2 className={styles.cardTitleIcon}>
          <Heart className={styles.cardTitleIconSvg} />
          Fazer uma Doação
        </h2>
        <p className={styles.cardDescriptionHeader}>
          Escolha o valor que gostaria de contribuir
        </p>
      </div>
      <div className={styles.donationCardContent}>
        <form onSubmit={handleDonation} className={styles.formSpacing}>
          <div>
            <label className={styles.sectionLabel}>Valor da Doação</label>
            <div className={styles.amountButtonsGrid}>
              {predefinedAmounts.map((amount) => (
                <button
                  key={amount}
                  type="button"
                  className={`${styles.amountButton} ${selectedAmount === amount ? styles.amountButtonSelected : ''}`}
                  onClick={() => {
                    setSelectedAmount(amount);
                    setCustomAmount("");
                  }}
                >
                  R$ {amount}
                </button>
              ))}
            </div>
            <div className={styles.customAmountContainer}>
              <DollarSign className={styles.customAmountIcon} />
              <input
                type="number"
                placeholder="Outro valor"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setSelectedAmount("");
                }}
                className={styles.customAmountInput}
                min="1"
              />
            </div>
          </div>

          <div className={styles.separator}></div>

          <div className={styles.paymentMethodContainer}>
            <label className={styles.sectionLabel}>Método de Pagamento</label>
            <div className={styles.paymentMethodOptions}>
              <label className={`${styles.paymentMethodOption} ${paymentMethod === 'credit-card' ? styles.paymentMethodSelected : ''}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="credit-card"
                  checked={paymentMethod === 'credit-card'}
                  onChange={() => setPaymentMethod('credit-card')}
                  className={styles.paymentMethodRadio}
                />
                <CreditCard className={styles.paymentMethodIcon} />
                <span>Cartão de Crédito/Débito</span>
              </label>
              <label className={`${styles.paymentMethodOption} ${paymentMethod === 'pix' ? styles.paymentMethodSelected : ''}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="pix"
                  checked={paymentMethod === 'pix'}
                  onChange={() => setPaymentMethod('pix')}
                  className={styles.paymentMethodRadio}
                />
                <Smartphone className={styles.paymentMethodIcon} />
                <span>PIX</span>
              </label>
            </div>
          </div>

          <div className={styles.separator}></div>

          <div className={styles.donorInfoContainer}>
            <label className={styles.sectionLabel}>Suas Informações (Opcional)</label>
            <div className={styles.donorInfoGrid}>
              <div>
                <label htmlFor="name" className={styles.inputLabel}>Nome</label>
                <input
                  id="name"
                  type="text"
                  value={donorInfo.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className={styles.textInput}
                  placeholder="Seu nome"
                />
              </div>
              <div>
                <label htmlFor="email" className={styles.inputLabel}>Email</label>
                <input
                  id="email"
                  type="email"
                  value={donorInfo.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={styles.textInput}
                  placeholder="seu@email.com"
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className={styles.inputLabel}>Mensagem para o Artista</label>
              <textarea
                id="message"
                value={donorInfo.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                className={styles.textareaInput}
                placeholder="Deixe uma mensagem de apoio..."
                rows={3}
              ></textarea>
            </div>
          </div>

          <button
            type="submit"
            className={styles.donateButton}
          >
            Doar R$ {customAmount || selectedAmount}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DonationForm;