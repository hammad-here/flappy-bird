let score = 0;
let y = 30; //y-axis of bird
let g = innerHeight / 4000; //gravity effect
function createObstacle() {
    let upperHeight = 0;
    let lowerHeight = 0;
    upperHeight = 20 + Math.random() * 45;
    lowerHeight = 100 - upperHeight - 35;
    let upper = document.createElement("img")
    upper.setAttribute("src", "asset/flappyBirdPipe.jpeg");
    upper.setAttribute("class", "obs");
    upper.style.height = upperHeight + "vh";
    let lower = document.createElement("img")
    lower.setAttribute("src", "asset/flappyBirdPipe - down.jpeg");
    lower.setAttribute("class", "obs");
    lower.style.height = lowerHeight + "vh";
    lower.style.top = upperHeight + 35 + "vh";
    document.body.appendChild(upper)
    document.body.appendChild(lower)
    return [lower, upper, upperHeight]
}
let birdMotion = setInterval(() => {
    if (y < 90 && y > 0) {
        g += innerHeight / 20000;
        y += g;
        document.getElementById("bird").style.top = y + "vh";
    }
}, 25);
let obsCreateMotion = setInterval(() => {
    obstacleMotion(createObstacle(), 100)
}, 2500);

function obstacleMotion(elem, i) {
    let x = setInterval(() => {
        i -= 0.25;
        if (i < 26 && i > 14 && !(y > elem[2] && y < elem[2] + 25)) {
            clearInterval(birdMotion);
            clearInterval(obsCreateMotion);
            let gameOver = document.createElement("span");
            gameOver.innerText = "GAME OVER";
            gameOver.style.top = 40 + "vh";
            gameOver.style.left = 37 + "vw";
            document.getElementsByTagName("div")[0].append(gameOver);
        } else if (i < 5) {
            score++
            document.getElementsByTagName("span")[0].innerText = score
            elem[1].remove()
            elem[0].remove()
            clearInterval(x)
        }
        elem[0].style.left = i + "vw"
        elem[1].style.left = i + "vw"
    }, 20)
}
//making bird jump when click space
window.addEventListener("keydown", e => {
    if (e.code == "Space") {
        g = -innerHeight / 600
    }
})