function calculateBill() {
  const oldReadingEl = document.getElementById("old");
  const currentReadingEl = document.getElementById("current");
  const arrearsEl = document.getElementById("arrears");
  const customerNameEl = document.getElementById("customer");
  const billDateEl = document.getElementById("currentDate");
  const resultEl = document.getElementById("result");

  const oldReading = parseInt(oldReadingEl.value, 10);
  const currentReading = parseInt(currentReadingEl.value, 10);
  const arrears = parseInt(arrearsEl.value || 0, 10);
  const customerName = customerNameEl.value.trim();

  // Validation
  if (isNaN(oldReading) || isNaN(currentReading)) {
    alert("Please enter valid meter readings");
    return;
  }

  if (currentReading < oldReading) {
    alert("Current reading cannot be less than old reading");
    return;
  }

  // Today's date (YYYY-MM-DD)
  const today = new Date();
  const todayISO = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000
  )
    .toISOString()
    .split("T")[0];

  if (billDateEl.value > todayISO) {
    alert("Bill date cannot be greater than today");
    return;
  }

  // Due date (15 days from today)
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 15);

  // Unit calculation
  const units = currentReading - oldReading;
  let amount = 0;

  if (units <= 100) {
    amount = units * 10;
  } else if (units <= 200) {
    amount = 100 * 10 + (units - 100) * 15;
  } else if (units <= 300) {
    amount = 100 * 10 + 100 * 15 + (units - 200) * 20;
  } else {
    amount =
      100 * 10 + 100 * 15 + 100 * 20 + (units - 300) * 25;
  }

  // Add arrears
  if (!isNaN(arrears) && arrears > 0) {
    amount += arrears;
  }

  // Display result
  resultEl.innerHTML = `
    Dear ${customerName},<br>
    Units Consumed: ${units}<br>
    Total Bill Amount: ₹${amount}<br>
    Pay By Date: ${dueDate.toLocaleDateString()}
  `;
}

// Clear result on reset
document.getElementById("reset").addEventListener("click", () => {
  document.getElementById("result").innerHTML = "";
});

// Form submit
document.getElementById("form_app").addEventListener("submit", (e) => {
  e.preventDefault();
  calculateBill();
});
