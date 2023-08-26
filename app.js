/*const 시작_시간 = new Date();

function setTime() {
  const 현재_시간 = new Date();
  const 흐른_시간 = new Date(현재_시간 - 시작_시간);
  const 분 = 흐른_시간.getMinutes().toString();
  const 초 = 흐른_시간.getSeconds().toString();
  const timeH1 = document.querySelector("#timer");
  timeH1.innerText = `${분.padStart(2, "0")}:${초.padStart(2, "0")}`;
}

setInterval(setTime, 1000);
*/

let index = 0;
let attempts = 0;
const 정답 = "CHOCO";

function appStart() {
  const nextLine = () => {
    if (attempts === 6) return gameover();
    attempts++;
    index = 0;
  };

  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료되었습니다!";
    div.classList.add("game-over");
    document.body.appendChild(div);
  };
  const gameover = () => {
    window.removeEventListener("keydown", handdleKeydown);
    window.removeEventListener("click", handdleClick);

    clearInterval(timer);
    displayGameover();
  };

  const handdleEnterKey = () => {
    let 맞은_갯수 = 0;

    //서버에서 정답 받아오는 코드
    const keyRow = document.querySelector(`.row-${attempts}`);

    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );

      const 입력_글자 = block.innerText;
      const 정답_글자 = 정답[i];

      const keyBoard = document.querySelector(
        `.key-board[data-key='${입력_글자}']`
      );
      if (입력_글자 === 정답_글자) {
        block.style.background = "rgb(146, 254, 149)";
        keyBoard.classList.add("green");
        맞은_갯수 += 1;
        block.classList.remove("line");
        keyRow.classList.add("board-vib");
      } else if (정답.includes(입력_글자)) {
        block.style.background = "rgb(255, 235, 107)";
        keyRow.classList.add("board-vib");
        keyBoard.classList.add("yellow");
        block.classList.remove("line");
      } else {
        block.style.background = "rgb(195, 195, 195)";
        block.classList.remove("line");
        keyBoard.classList.add("gray");
        keyRow.classList.add("board-vib");
      }
    }

    //키보드 색깔 바꾸기

    if (맞은_갯수 === 5) {
      gameover();
      keyRow.classList.add("board-scale");
      keyRow.classList.remove("board-vib");
    } else nextLine();
  };

  const handdleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-block[data-index='${attempts}${index - 1}']`
      );

      preBlock.innerText = "";
      preBlock.classList.remove("line");
    } //블럭 하나 지우는 함수
    if (index !== 0) index -= 1; //인덱스 한칸 뒤로 가게 만드는 함수
  };

  //실제 키보드 눌렀을 때 이벤트
  const handdleKeydown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );

    if (event.key === "Backspace") handdleBackspace();
    else if (index === 5) {
      if (event.key === "Enter") handdleEnterKey();
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index += 1;
      thisBlock.classList.add("line");
    }
  };

  //가상 키보드 클릭 시 이벤트
  const handdleClick = (event) => {
    const clickKey = event.target.getAttribute("data-key");
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );
    if (clickKey === "Backspace") handdleBackspace();
    else if (index === 5) {
      if (clickKey === "Enter") handdleEnterKey();
      else return;
    } else if (clickKey !== null && clickKey.length === 1) {
      thisBlock.innerText = clickKey;
      index += 1;
      thisBlock.classList.add("line");
    }
    console.log(`${clickKey}`);
  };

  const startTimer = () => {
    const 시작_시간 = new Date();

    function setTime() {
      const 현재_시간 = new Date();
      const 흐른_시간 = new Date(현재_시간 - 시작_시간);
      const 분 = 흐른_시간.getMinutes().toString();
      const 초 = 흐른_시간.getSeconds().toString();
      const timeH1 = document.querySelector("#timer");
      timeH1.innerText = `${분.padStart(2, "0")}:${초.padStart(2, "0")}`;
    }

    timer = setInterval(setTime, 1000);
  };

  const mobileRegex = [
    /Android/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i,
  ];

  startTimer();
  window.addEventListener("keydown", handdleKeydown);
  window.addEventListener("click", handdleClick);
  mobileRegex.addEventListener("touchstart", handdleClick, false);
}

appStart();
