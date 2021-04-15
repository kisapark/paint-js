const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const color = document.getElementsByClassName("jsColor")
const input = document.querySelector("input");
const modeBtn = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const message = document.getElementById("jsMessage");

const defaultColor = "#2c2c2c";

canvas.width = 700;
canvas.height = 700;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = defaultColor;
ctx.fillStyle = defaultColor;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
    painting = false;
  }

function startPainting() {
    painting = true;
  }

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting) {
        ctx.beginPath(); 
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
        //ctx.closePath();
    }
}

function onMouseDown(event) {
    painting = true;
}

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove)
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleContext);
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

Array.from(color).forEach(color => 
    color.addEventListener("click", handleColorClick));

input.addEventListener("input", handleBrushSize);

function handleBrushSize() {
    const currentSize = input.value; //Nico wrote event.target.value;
    console.log(currentSize);
    ctx.lineWidth = currentSize;
}

if (modeBtn) {
    modeBtn.addEventListener("click", handleModeClick);
}

function handleModeClick() {
    if (filling === true) {
        filling = false;
        modeBtn.innerText = "Fill";
        message.innerText = "you're in paint mode now"
    } else { 
        filling = true; 
        modeBtn.innerText = "Paint";
        message.innerText = "you're in fill mode now"
    }
}

function handleCanvasClick() {
    if (filling === true) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function handleContext(event) {
    event.preventDefault();
}

if (saveBtn) {
    saveBtn.addEventListener("click", saveCanvas);
}

function saveCanvas() {
    const imageUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "paint-js";
    link.click();
    console.log(link);
}