const container = document.getElementById("chapters");

for(let i=1;i<=8;i++){

let chapter = document.createElement("div");
chapter.classList.add("chapter");

chapter.innerHTML = `
<h3>CHAPTER/SCENE:</h3>

<p>POV:</p>
<input type="text">

<p>TIME:</p>
<input type="text">

<p>EVENTS:</p>
<textarea></textarea>
`;

container.appendChild(chapter);

}