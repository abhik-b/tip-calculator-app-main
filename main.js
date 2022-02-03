const bill = document.getElementById("bill");
const tip = document.getElementById("tip");
const people = document.getElementById("people");
const reset = document.getElementById("reset");
const total = document.getElementById("total");
const tipAmount = document.getElementById("tip-amount");
const tip_percent_selects = document.querySelectorAll(".tip-percent-select");
let tipPercent = 5;

//selecting tip percent
tip_percent_selects.forEach(function (tp_select) {
  tp_select.addEventListener("click", function (e) {
    tip.value = "";
    resetTipSelectStyles();
    tipPercent = parseInt(e.target.innerHTML.replace("%", ""));
    e.target.classList.add("active");
    setTipValue(bill.value, tipPercent);
    setTotalValue(bill.value, people.value, tipPercent);
  });
});

// Main Functionality of the app
bill.addEventListener("input", function (e) {
  bill.classList.remove("text-grayish-cyan-1");
  reset.classList.remove("opacity-20");
  reset.disabled = false;
  const billValue = e.target.value === "" ? 0 : parseFloat(e.target.value);
  setTipValue(billValue, tipPercent);
  setTotalValue(billValue, people.value, tipPercent);
});

tip.addEventListener("input", function (e) {
  const tipValue = e.target.value === "" ? 5 : parseFloat(e.target.value);
  resetTipSelectStyles();
  tipPercent = tipValue;
  setTotalValue(bill.value, people.value, tipPercent);
  setTipValue(bill.value, tipPercent);
});

people.addEventListener("input", function (e) {
  people.classList.remove("text-grayish-cyan-1");
  reset.classList.remove("opacity-20");
  reset.disabled = false;
  if (e.target.value === "" || e.target.value < 1) {
    console.log("hi");
    document.getElementById("people-error").classList.remove("hidden");
  } else {
    document.getElementById("people-error").classList.add("hidden");
    const peopleValue = e.target.value === "" ? 0 : parseFloat(e.target.value);
    console.log(peopleValue);
    setTotalValue(bill.value, peopleValue, tipPercent);
  }
});

reset.addEventListener("click", function (e) {
  setTotalValue(0, 0, 0);
  setTipValue(0, 0, 0);
  bill.value = "0";
  people.value = "0";
  bill.classList.add("text-grayish-cyan-1");
  people.classList.add("text-grayish-cyan-1");
  document.getElementById("people-error").classList.remove("hidden");
  reset.classList.add("opacity-20");
  reset.disabled = true;
});

// utility functions
function setTotalValue(billValue, peopleValue, tipPercent) {
  if (peopleValue > 0) {
    let totalValue = parseFloat(
      billValue / peopleValue + billValue * (tipPercent / 100)
    ).toFixed(2);
    total.innerHTML = `$ ${totalValue === "NaN" ? 0.0 : totalValue}`;
  } else {
    total.innerHTML = `$ 0.00`;
  }
}
function setTipValue(billValue = 0, tipPercent) {
  let tipValue = parseFloat(billValue * (tipPercent / 100)).toFixed(2);
  tipAmount.innerHTML = `$ ${tipValue}`;
}

function resetTipSelectStyles() {
  tip_percent_selects.forEach(function (tp_select) {
    tp_select.classList.remove("active");
  });
}
