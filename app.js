let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector(".msg");

let scoreX = 0;
let scoreO = 0;
let turnO = true;

let playerXName = "Player X";
let playerOName = "Player O";

const Winpatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

document.getElementById("startGameBtn").addEventListener("click", () => {
  const xName = document.getElementById("playerX").value.trim();
  const oName = document.getElementById("playerO").value.trim();

  if (xName) playerXName = xName;
  if (oName) playerOName = oName;

  document.getElementById("nameX").innerText = playerXName;
  document.getElementById("nameO").innerText = playerOName;

  document.getElementById("player-inputs").classList.add("hide");
  document.getElementById("container").classList.remove("hide");

  scoreX = 0;
  scoreO = 0;

  document.getElementById("scoreX").textContent = scoreX;
  document.getElementById("scoreO").textContent = scoreO;
});

const resetGame = () => {
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      turnO = false;
    } else {
      box.innerText = "X";
      turnO = true;
    }

    box.disabled = true;
    checkWinner();
  });
});

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  let winnerName = winner === "X" ? playerXName : playerOName;
  msg.innerText = " Congratulations, " + winnerName + "!";
  msgContainer.classList.remove("hide");
  disableBoxes();
  updateScore(winner);
};

const showDraw = () => {
  msg.innerText = " It's a Draw!";
  msgContainer.classList.remove("hide");
};

const updateScore = (winner) => {
  if (winner === "X") {
    scoreX++;
    document.getElementById("scoreX").textContent = scoreX;
  } else if (winner === "O") {
    scoreO++;
    document.getElementById("scoreO").textContent = scoreO;
  }
};

const checkWinner = () => {
  let winnerFound = false;

  for (let pattern of Winpatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        winnerFound = true;
        return;
      }
    }
  }

  let allFilled = [...boxes].every((box) => box.innerText !== "");
  if (!winnerFound && allFilled) {
    showDraw();
  }
};

resetBtn.addEventListener("click", resetGame);
