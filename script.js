function placeBid() {
    alert("Successfully Bid!");
  }
  const Buttons = 
    document.querySelectorAll(".art-card button");
  Buttons.forEach(button => {
    button.addEventListener("click", placeBid);
  });
  