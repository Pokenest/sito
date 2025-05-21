// Inizializza EmailJS (sostituisci con la tua Public Key)
emailjs.init("ZWwRHbOZLQ8rHcW7F");

document.querySelector(".checkout-btn").addEventListener("click", function (e) {
  e.preventDefault(); // evita reindirizzamento immediato

  const tiktokUsername = document.getElementById("tiktok-username").value.trim();

  if (!tiktokUsername) {
    alert("Per favore inserisci il tuo username TikTok.");
    return;
  }

  const cart = JSON.parse(localStorage.getItem("cart") || "{}");

  if (Object.keys(cart).length === 0) {
    alert("Il carrello è vuoto.");
    return;
  }

  let orderSummary = "";
  let total = 0;

  for (const id in cart) {
    const item = cart[id];
    const itemTotal = item.prezzo * item.quantity;
    total += itemTotal;

    orderSummary += `- ${item.nome} (x${item.quantity}) - € ${itemTotal.toFixed(2)}\n`;
  }

  orderSummary += `\nTotale: € ${total.toFixed(2)}`;

  const templateParams = {
    username: tiktokUsername,
    order_details: orderSummary
  };

  console.log("Inviando email con i seguenti dati:", templateParams);

  emailjs.send("service_pokenest1", "template_832s92g", templateParams)
    .then(function () {
      console.log("Email inviata con successo!");
      // Reindirizza a PayPal solo dopo che la mail è stata mandata
      window.location.href = "https://www.paypal.com/paypalme/pokenestonline";
    })
    .catch(function (error) {
      console.error("Errore nell'invio dell'email:", error);
      alert("Errore durante l'invio dell'email. Riprova.");
    });
});
