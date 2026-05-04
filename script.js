const puzzles = {
  blackboard: {
    title: "黑板方程式",
    question: "黑板發出微弱的綠光。\n\n3x + 7 = 22\n\n請求出 x 的值。",
    answer: "5",
    hint: "先將 7 移到等號右邊，再把兩邊同除以 3。",
    fragmentName: "線性片段",
    fragmentValue: "5",
    solved: false,
  },

  desk: {
    title: "上鎖的書桌",
    question:
      "書桌上貼著一張紙條：\n\n一瓶溶液共有 150 ml，其中 20% 是酸性成分。\n\n請問酸性成分有多少 ml？",
    answer: "30",
    hint: "20% 可以寫成 0.2，所以可以計算 150 × 0.2。",
    fragmentName: "比例片段",
    fragmentValue: "30",
    solved: false,
  },

  clock: {
    title: "破損的時鐘",
    question:
      "時鐘上的數字不斷閃爍：\n\n2, 6, 12, 20, 30, ?\n\n請找出下一個數字。",
    answer: "42",
    hint: "觀察相鄰兩項的差：4, 6, 8, 10，下一個差應該是多少？",
    fragmentName: "數列片段",
    fragmentValue: "42",
    solved: false,
  },

  map: {
    title: "座標地圖",
    question:
      "地圖上標記著兩個點：\n\nA(2, 3), B(8, 3)\n\n請問 A 到 B 的距離是多少？",
    answer: "6",
    hint: "兩點的 y 座標相同，所以只需要比較 x 座標的差。",
    fragmentName: "距離片段",
    fragmentValue: "6",
    solved: false,
  },

  terminal: {
    title: "方程式終端",
    question: "SYSTEM LOCKED.\n\nx² - 5x + 6 = 0\n\n請輸入較小的根。",
    answer: "2",
    hint: "可以分解成 (x - 2)(x - 3) = 0。",
    fragmentName: "根值片段",
    fragmentValue: "2",
    solved: false,
  },

  door: {
    title: "出口門",
    question:
      "最終密碼順序如下：\n\n根值 → 距離 → 數列 → 線性 → 比例\n\n請輸入最後的逃脫密碼。",
    answer: "2642530",
    hint: "依照門上的順序排列你收集到的所有碎片。",
    fragmentName: "逃脫",
    fragmentValue: "Escape",
    solved: false,
  },
};

const gameState = {
  lives: 3,
  score: 100,
  timeLeft: 600,
  currentPuzzleKey: null,
  timerId: null,
  gameOver: false,
  inventory: [],
};

const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const endingScreen = document.getElementById("ending-screen");

const startButton = document.getElementById("start-button");
const restartButton = document.getElementById("restart-button");

const timerElement = document.getElementById("timer");
const livesElement = document.getElementById("lives");
const scoreElement = document.getElementById("score");
const inventoryElement = document.getElementById("inventory");

const puzzleModal = document.getElementById("puzzle-modal");
const puzzleTitle = document.getElementById("puzzle-title");
const puzzleQuestion = document.getElementById("puzzle-question");
const answerInput = document.getElementById("answer-input");
const feedback = document.getElementById("feedback");

const submitAnswerButton = document.getElementById("submit-answer");
const hintButton = document.getElementById("hint-button");
const closeModalButton = document.getElementById("close-modal");

const endingTitle = document.getElementById("ending-title");
const endingMessage = document.getElementById("ending-message");

startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", restartGame);
submitAnswerButton.addEventListener("click", checkAnswer);
hintButton.addEventListener("click", showHint);
closeModalButton.addEventListener("click", closeModal);

document.querySelectorAll(".room-object").forEach((object) => {
  object.addEventListener("click", () => {
    const puzzleKey = object.dataset.puzzle;
    openPuzzle(puzzleKey);
  });
});

answerInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    checkAnswer();
  }
});

function startGame() {
  startScreen.classList.remove("active");
  gameScreen.classList.add("active");

  updateStatus();
  startTimer();
}

function restartGame() {
  location.reload();
}

function startTimer() {
  gameState.timerId = setInterval(() => {
    if (gameState.gameOver) {
      return;
    }

    gameState.timeLeft--;
    updateStatus();

    if (gameState.timeLeft <= 0) {
      endGame(false, "時間歸零。教室被無限延伸的方程式吞沒。");
    }
  }, 1000);
}

function updateStatus() {
  const minutes = Math.floor(gameState.timeLeft / 60);
  const seconds = gameState.timeLeft % 60;
  const formattedTime = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  timerElement.textContent = `時間：${formattedTime}`;
  livesElement.textContent = `生命：${"❤️".repeat(gameState.lives)}`;
  scoreElement.textContent = `分數：${gameState.score}`;

  if (gameState.timeLeft <= 60) {
    timerElement.classList.add("warning");
  }
}

function openPuzzle(puzzleKey) {
  if (gameState.gameOver) {
    return;
  }

  const puzzle = puzzles[puzzleKey];

  if (puzzleKey === "door" && !allMainPuzzlesSolved()) {
    puzzleTitle.textContent = "出口門";
    puzzleQuestion.textContent =
      "門仍然被鎖住。\n\n你必須先解開五個教室謎題，收集所有碎片後，才能輸入最終密碼。";
    feedback.textContent = "";
    answerInput.value = "";
    answerInput.disabled = true;
    submitAnswerButton.disabled = true;
    hintButton.disabled = true;
    puzzleModal.classList.remove("hidden");
    return;
  }

  if (puzzle.solved && puzzleKey !== "door") {
    puzzleTitle.textContent = "已經解開";
    puzzleQuestion.textContent = `你已經解開這道謎題。\n\n已取得：${puzzle.fragmentName} = ${puzzle.fragmentValue}`;
    feedback.textContent = "";
    answerInput.value = "";
    answerInput.disabled = true;
    submitAnswerButton.disabled = true;
    hintButton.disabled = true;
    puzzleModal.classList.remove("hidden");
    return;
  }

  gameState.currentPuzzleKey = puzzleKey;

  puzzleTitle.textContent = puzzle.title;
  puzzleQuestion.textContent = puzzle.question;
  feedback.textContent = "";
  answerInput.value = "";
  answerInput.disabled = false;
  submitAnswerButton.disabled = false;
  hintButton.disabled = false;

  puzzleModal.classList.remove("hidden");
  answerInput.focus();
}

function closeModal() {
  puzzleModal.classList.add("hidden");
  answerInput.disabled = false;
  submitAnswerButton.disabled = false;
  hintButton.disabled = false;
}

function checkAnswer() {
  const puzzleKey = gameState.currentPuzzleKey;
  const puzzle = puzzles[puzzleKey];

  if (!puzzle) {
    return;
  }

  const userAnswer = answerInput.value.trim();

  if (userAnswer === "") {
    feedback.textContent = "先輸入答案。門不會因為你發呆就自己打開，謝謝。";
    return;
  }

  if (normalizeAnswer(userAnswer) === normalizeAnswer(puzzle.answer)) {
    handleCorrectAnswer(puzzleKey);
  } else {
    handleWrongAnswer();
  }
}

function normalizeAnswer(answer) {
  return answer.replace(/\s+/g, "").toLowerCase();
}

function handleCorrectAnswer(puzzleKey) {
  const puzzle = puzzles[puzzleKey];

  if (puzzleKey === "door") {
    endGame(true, "最後一道鎖發出清脆聲響。你成功逃出了教室。");
    return;
  }

  puzzle.solved = true;

  gameState.score += 20;
  gameState.inventory.push({
    name: puzzle.fragmentName,
    value: puzzle.fragmentValue,
  });

  feedback.textContent = `答對了。你取得了 ${puzzle.fragmentName} = ${puzzle.fragmentValue}。`;

  const object = document.querySelector(`[data-puzzle="${puzzleKey}"]`);
  object.classList.add("solved");

  updateInventory();
  updateStatus();

  setTimeout(() => {
    closeModal();
  }, 1200);
}

function handleWrongAnswer() {
  gameState.lives--;
  gameState.score -= 10;
  gameState.timeLeft = Math.max(0, gameState.timeLeft - 15);

  feedback.textContent = "答錯了。扣 1 點生命，並損失 15 秒。";

  document.querySelector(".modal-content").classList.add("shake");

  setTimeout(() => {
    document.querySelector(".modal-content").classList.remove("shake");
  }, 300);

  updateStatus();

  if (gameState.lives <= 0) {
    endGame(false, "生命歸零。方程式贏了這一局，你被教室留下來補考。");
  }
}

function showHint() {
  const puzzleKey = gameState.currentPuzzleKey;
  const puzzle = puzzles[puzzleKey];

  if (!puzzle) {
    return;
  }

  gameState.score -= 15;
  gameState.timeLeft = Math.max(0, gameState.timeLeft - 20);

  feedback.textContent = `提示：${puzzle.hint}`;

  updateStatus();
}

function updateInventory() {
  if (gameState.inventory.length === 0) {
    inventoryElement.textContent = "尚未取得任何碎片。";
    return;
  }

  inventoryElement.innerHTML = "";

  gameState.inventory.forEach((item) => {
    const itemElement = document.createElement("div");
    itemElement.className = "inventory-item";
    itemElement.textContent = `${item.name}：${item.value}`;
    inventoryElement.appendChild(itemElement);
  });
}

function allMainPuzzlesSolved() {
  return (
    puzzles.blackboard.solved &&
    puzzles.desk.solved &&
    puzzles.clock.solved &&
    puzzles.map.solved &&
    puzzles.terminal.solved
  );
}

function endGame(success, message) {
  gameState.gameOver = true;
  clearInterval(gameState.timerId);

  puzzleModal.classList.add("hidden");
  gameScreen.classList.remove("active");
  endingScreen.classList.add("active");

  if (success) {
    endingTitle.textContent = "成功逃脫";
    endingMessage.textContent = `${message}\n\n最終分數：${gameState.score}`;
  } else {
    endingTitle.textContent = "遊戲結束";
    endingMessage.textContent = `${message}\n\n最終分數：${gameState.score}`;
  }
}
