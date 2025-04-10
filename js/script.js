//############################### FUNZIONI

// FUNZIONE CALCOLO PREZZO
const priceCalc = (Type, userKm) => {
  const kmPrice = 0.21;

  let totalPrice = userKm * kmPrice;

  if (Type === "Adulto") {
    return totalPrice;
  }
  // SCONTO SE MINORENNI
  else if (Type === "Under 18") {
    return discountUnder18(totalPrice);
  }
  // SCONTO SE ANZIANI
  else if (Type === "Over 65") {
    return discountOver65(totalPrice);
  }
};

// FUNZIONE SCONTO UNDER 18
const discountUnder18 = (totalPrice) => {
  const discountPriceUnder18 = 20;
  let discountUnder18 = (totalPrice * discountPriceUnder18) / 100;
  totalPrice = totalPrice - discountUnder18;
  return totalPrice;
};

// FUNZIONE SCONTO UNDER 65
const discountOver65 = (totalPrice) => {
  const discountPriceOver65 = 40;
  let discountOver65 = (totalPrice * discountPriceOver65) / 100;
  totalPrice = totalPrice - discountOver65;
  return totalPrice;
};

// FUNZIONE CALCOLO CARROZZA
const getRandomCarriage = () => Math.floor(Math.random() * 12) + 1;

// FUNZIONE CALCOLO CP
const getCPCode = () => Math.floor(Math.random() * 90000) + 10000;

// FUNZIONE COMPOSIZIONE CARD
const compositionCard = (totalPrice, userName, userSurname, userType, userKm) => {
  const cpCard = getCPCode();
  const carrige = getRandomCarriage();
  document.getElementById("nameCard").innerText = `${userName} ${userSurname}`;
  document.getElementById("cpCard").innerText = `Codice CP: ${cpCard}`;
  document.getElementById("carrigeCard").innerHTML = `<strong>Carrozza N.</strong> ${carrige}`;
  document.getElementById("kmRoadCard").innerHTML = `<strong>Distanza da percorrere:</strong> ${userKm}Km`;
  document.getElementById("typeClientCard").innerText = `${userType}`;
};

// FUNZIONE GESTIONE ERROR ALERT
const getAlertForm = () => {
  document.getElementById("alert").classList.remove("d-none");
  document.getElementById("alert").classList.add("d-block");
};

//############################### ALGORITMO

// ACQUISIZIONE DATI FORM

const nomeEl = document.getElementById("inputName");
const cognomeEl = document.getElementById("inputSurname");
const kmEl = document.getElementById("inputKm");
const TypeClientEl = document.getElementById("inputTypeClient");
const ticketForm = document.getElementById("ticketForm");

ticketForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // ASSEGNAZIONE VALORI FORM
  const userName = nomeEl.value;
  const userSurname = cognomeEl.value;
  const userKm = parseInt(kmEl.value);
  const userType = TypeClientEl.value;

  // GESTIONE ERRORI
  if (!userName) {
    getAlertForm();
    return;
  }
  if (!userSurname) {
    getAlertForm();
    return;
  }
  if (!userKm) {
    getAlertForm();
    return;
  }

  // CALCOLO BIGLIETTO
  const totalPrice = priceCalc(userType, userKm);
  console.log(totalPrice);

  // COMPOSIZIONE CARD
  compositionCard(totalPrice, userName, userSurname, userType, userKm);

  // VISUALIZZAZIONE CARD
  document.getElementById("ticketCard").classList.remove("d-none");
  document.getElementById("ticketCard").classList.add("d-block");
});

// CANCELLA DATI FORM

cancelForm.addEventListener("click", function (event) {
  document.getElementById("ticketForm").reset();
  document.getElementById("ticketCard").classList.add("d-none");
  console.log(document.getElementById("alert"));

  document.getElementById("alert").classList.add("d-none");
});
