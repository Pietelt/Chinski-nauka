const canvas = document.getElementById("draw-canvas");
const ctx = canvas.getContext("2d");

ctx.lineWidth = 6;
ctx.lineCap = "round";
ctx.strokeStyle = "black";

let drawing = false;

function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    if (e.touches) {
        return {
            x: e.touches[0].clientX - rect.left,
            y: e.touches[0].clientY - rect.top
        };
    }
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };
}

function startDraw(e) {
    drawing = true;
    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    e.preventDefault();
}

function drawCanvas(e) {
    if (!drawing) return;
    const pos = getPos(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    e.preventDefault();
}

function stopDraw() {
    drawing = false;
    ctx.beginPath();
}

canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", drawCanvas);
canvas.addEventListener("mouseup", stopDraw);
canvas.addEventListener("mouseleave", stopDraw);

canvas.addEventListener("touchstart", startDraw, { passive: false });
canvas.addEventListener("touchmove", drawCanvas, { passive: false });
canvas.addEventListener("touchend", stopDraw);

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
