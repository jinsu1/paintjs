# paintjs
자바스크립트로만든 그림판\
기능 : 색깔선택, 두께선택, 붓과 페인트 선택, 전체 지우기, 이미지 저장 
https://jinsu1.github.io/paintjs/

![PaintJS](https://user-images.githubusercontent.com/69416518/115513857-80018000-a2be-11eb-9969-f668c86e01a0.JPG)

메모
=====

  const ctx = canvas.getContext("2d");
  자주사용하므로 변수화
***
function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
}
캔버스 내의 x,y좌표
***

MDN에 나와있는 canvas 명령어

선 색깔   
ctx.strokeStyle = "#2c2c2c";   
   
선 굵기   
ctx.lineWidth = 2.5;   
   
사각형 색깔   
ctx.fillStyle = "green";   
   
사각형 그리기 (x좌표 ,y좌표, 가로길이, 세로길이)   
ctx.fillRect(x, y, width, height);   
   
새로운 path의 시작을 알림
ctx.beginPath()    
   
path의 시작점 
moveTo    
   
path의 시작점과 끝점을 연결
lineTo    
     
획을 그음
stroke   
***
  if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }

painting이 false 일 때 (클릭하지 않았을 떄) beginPath() (패스의 시작을선언) 와 moveTo() (시작점을 선언)가 패스의 시작점을 지속적으로 만들며   
캔버스위를 움직임   
   
painting이 true가 되면(클릭되어지면) 패스의 시작점을 만드는 것을 그만두고 lineTo()(시작점과 끝점의 x,y좌표를 연결)를 실행하여 비어있는 선인 path를만듬   
stroke() 비어있는 path에 스타일을 적용함(ctx.fillstyle="#c2c2c2")   
   
***
   
canvas를 이용하기 위해선 Css에서도 canvas의 크기를 지정하지만   
js에서도 픽셀조작을 위한 크기를 별도로 지정해줘야함    
    
css   
.canvas {   
  width: 550px;   
  height: 550px;   
}   
   
js   
canvas.width = 550;   
canvas.height = 550;   
   
***
   
Array.from(colors);   
   
colors라는 오브젝트를 배열로 만들어서 불러옴   
   
***
   
function changeColor(event) {    
   const color = event.target.style.backgroundColor;    
   ctx.strokeStyle = color;    
}    
    
Array.from(colors).forEach(colorTool => colorTool.addEventListener("click", changeColor));    
     
colors 배열을 각각 colorTool이라는 이름으로 하나씩 불러와 click이벤트에 chageColor메소드를 넣음    
    
이벤트에 담겨온 타겟의 스타일의 백그라운드 속성을 변수에담음    
    
***
HTML    
 <input type="range" id="jsRange" min="0.1" max="5" value="2.5" step="0.1">    
    
JS    
if(penRange) {    
    penRange.addEventListener("**input**", changeRange);    
}
     
input 타입의 오브젝트의 이벤트 발생 조건은 input이다    

***

*pen range 바에 따라 실시간 값 보여주기 

1. HTML 에서만하기
```
<input type="range" id="jsRange" min="0.1" max="20" value="2.5" step="0.1" 
	      oninput="document.getElementById('rangeNum').innerHTML=this.value" >

<span id="rangeNum">2.5</span>
```
2. JS에서만 하기 
```
HTML
<input type="range" id="jsRange" min="0.1" max="20" value="2.5" step="0.1">
<span id="rangeNum">2.5</span>

JS 
*const rangeNum = document.getElementById("rangeNum");

function changeRange(event) {
    const range = event.target.value;
    ctx.lineWidth = range;
   **rangeNum.innerHTML = event.target.value;**
}

if(penRange) {
    penRange.addEventListener("input", changeRange);
```



***
버튼 누를 때마다 버튼이 바뀌게하는 조건문   
```
function buttonMode() {
    if(filling === true) {
        filling = false;
        mode.innerText="Fill";
    } else {
        filling = true;
        mode.innerText="Paint";      
    }
```


***
```
canvas.addListener("contextmenu ", handleContextMenu);

//contextmenu === 마우스오른쪽클릭 

function handleContextMenu(event) {
     event.preventDefault();  //마우스 오른쪽클릭 불가능(사진저장불가)
}

```

***
save버튼 활성화

JS   
```
const saveBtn = document.getElementById("jsSave");

function saveFile() {
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS";
    link.click();
}

if(saveBtn) {
    saveBtn.addEventListener("click", saveFile);
}
```
***
canvas clear하기
```
ctx.clearRect(x, y, width, height);
```
