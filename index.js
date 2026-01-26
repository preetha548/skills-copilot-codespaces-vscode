const source = document.getElementById("source");

source.addEventListener("cut", function (event) {
  const selection = document.getSelection().toString();

  // Put modified text into clipboard
  event.clipboardData.setData("text/plain", selection.toLowerCase());

  // Prevent default cut behavior
  event.preventDefault();

  // Remove selected text manually
  document.getSelection().deleteFromDocument();
});

