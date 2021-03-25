'use strict';

const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const penRange = document.getElementById("jsRange");
const rangeNum = document.getElementById("rangeNum");
const mode = document.getElementById("jsMode");

const COLOR_black = "#2c2c2c";
const SIZE_canvas = 550;

canvas.width = SIZE_canvas;
canvas.height = SIZE_canvas;

ctx.strokeStyle = COLOR_black;
ctx.lineWidth = 2.5;
ctx.fillStyle = COLOR_black;


let painting = false;
let filling = false;

function startPainting() {
    if(!filling) {
    painting = true;
    }
}

function stopPainting() {
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

function handleCanvasClick() {
    if(filling) {
    ctx.fillRect(0, 0, SIZE_canvas, SIZE_canvas);
    }
 }   

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
}

function changeColor(event) {
   const color = event.target.style.backgroundColor;
   ctx.strokeStyle = color;
   ctx.fillStyle = color;
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

function buttonMode() {
    if(filling === true) {
        filling = false;
        mode.innerText="Fill";
    } else {
        filling = true;
        mode.innerText="Paint";  
    }
}

if(mode) {
    mode.addEventListener("click", buttonMode);
}