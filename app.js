'use strict';

const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const penRange = document.getElementById("jsRange");
const rangeNum = document.getElementById("rangeNum");

canvas.width = 550;
canvas.height = 550;

ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;

let painting = false;

function startPainting(event) {
    painting = true;
}

function stopPainting(event) {
    painting = false;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
}

function changeColor(event) {
   const color = event.target.style.backgroundColor;
   ctx.strokeStyle = color;
}

Array.from(colors).forEach(colorTool => colorTool.addEventListener("click", changeColor));

function changeRange(event) {
    const range = event.target.value;
    ctx.lineWidth = range;
    rangeNum.innerHTML = event.target.value;
}

if(penRange) {
    penRange.addEventListener("input", changeRange);
}