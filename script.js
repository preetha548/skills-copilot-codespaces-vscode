// Date
document.getElementById("date").textContent =
    new Date().toDateString();

// Breaking News
document.getElementById("ticker").textContent =
    "Global markets surge | Major sports final tonight | New AI breakthrough announced";

// Dark Mode
document.getElementById("themeToggle").onclick = () => {
    document.body.classList.toggle("dark");
};

// News Filter
function filterNews(category) {
    const articles = document.querySelectorAll("article");
    articles.forEach(article => {
        if (category === "all" || article.classList.contains(category)) {
            article.style.display = "block";
        } else {
            article.style.display = "none";
        }
    });
}
