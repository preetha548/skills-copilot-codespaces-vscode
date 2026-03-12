// Simple animation for menu sections

let sections = document.querySelectorAll(".menu-section");

sections.forEach((section, index) => {
    section.style.opacity = 0;

    setTimeout(() => {
        section.style.transition = "1s";
        section.style.opacity = 1;
    }, index * 500);
});