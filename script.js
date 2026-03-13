function changeMessage(){

    const messages = [
        "Have a wonderful day!",
        "May all your dreams come true!",
        "Stay happy and keep smiling!",
        "Wishing you success and joy!",
        "You are amazing!"
    ];

    let random = Math.floor(Math.random() * messages.length);

    document.getElementById("message").innerText = messages[random];
}