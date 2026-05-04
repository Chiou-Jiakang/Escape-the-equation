let puzzles = {};

const FINAL_CODE_ORDER = ["clock", "map", "terminal", "blackboard", "desk"];

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
const missionText = document.getElementById("mission-text");

const puzzleModal = document.getElementById("puzzle-modal");
const puzzleTitle = document.getElementById("puzzle-title");
const puzzleQuestion = document.getElementById("puzzle-question");
const answerInput = document.getElementById("answer-input");
const feedback = document.getElementById("feedback");

const submitAnswerButton = document.getElementById("submit-answer");
const hintButton = document.getElementById("hint-button");
const closeModalButton = document.getElementById("close-modal");

const endingLabel = document.getElementById("ending-label");
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
  initializeRandomPuzzles();

  startScreen.classList.remove("active");
  gameScreen.classList.add("active");

  updateStatus();
  updateInventory();
  updateDoorState();
  updateMissionText();
  startTimer();
}

function restartGame() {
  location.reload();
}

function initializeRandomPuzzles() {
  puzzles = {
    blackboard: createPuzzleFromPool("blackboard"),
    desk: createPuzzleFromPool("desk"),
    clock: createPuzzleFromPool("clock"),
    map: createPuzzleFromPool("map"),
    terminal: createPuzzleFromPool("terminal"),
    door: {
      title: "出口門",
      question:
        "出口門上浮現最後一道規則：\n\n時鐘 → 地圖 → 終端 → 黑板 → 書桌\n\n請依照順序排列你收集到的碎片，輸入最終逃脫密碼。",
      answer: "",
      hint: "請照右側出口門規則排列碎片：時鐘片段、地圖片段、終端片段、黑板片段、書桌片段。",
      fragmentName: "逃脫",
      fragmentValue: "Escape",
      solved: false,
      hintUsed: false,
    },
  };

  puzzles.door.answer = generateFinalCode();
}

function createPuzzleFromPool(poolKey) {
  if (
    !puzzlePools ||
    !puzzlePools[poolKey] ||
    puzzlePools[poolKey].length === 0
  ) {
    throw new Error(`Puzzle pool is missing or empty: ${poolKey}`);
  }

  const pool = puzzlePools[poolKey];
  const selectedPuzzle = pool[Math.floor(Math.random() * pool.length)];

  return {
    ...selectedPuzzle,
    fragmentValue: selectedPuzzle.answer,
    solved: false,
    hintUsed: false,
  };
}

function generateFinalCode() {
  return FINAL_CODE_ORDER.map((key) => puzzles[key].fragmentValue).join("");
}

function startTimer() {
  clearInterval(gameState.timerId);

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
  livesElement.textContent = `生命：${"❤️".repeat(Math.max(gameState.lives, 0))}`;
  scoreElement.textContent = `分數：${gameState.score}`;

  if (gameState.timeLeft <= 60) {
    timerElement.classList.add("warning");
  } else {
    timerElement.classList.remove("warning");
  }
}

function openPuzzle(puzzleKey) {
  if (gameState.gameOver) {
    return;
  }

  const puzzle = puzzles[puzzleKey];

  if (!puzzle) {
    return;
  }

  if (puzzleKey === "door" && !allMainPuzzlesSolved()) {
    gameState.currentPuzzleKey = null;

    puzzleTitle.textContent = "出口門";
    puzzleQuestion.textContent =
      "門仍然被鎖住。\n\n你必須先解開五個教室謎題，收集所有碎片後，才能輸入最終密碼。";
    feedback.textContent = "";
    answerInput.value = "";
    setModalInputState(false);
    puzzleModal.classList.remove("hidden");
    return;
  }

  if (puzzle.solved && puzzleKey !== "door") {
    gameState.currentPuzzleKey = null;

    puzzleTitle.textContent = "已經解開";
    puzzleQuestion.textContent = `你已經解開這道謎題。\n\n已取得：${puzzle.fragmentName} = ${puzzle.fragmentValue}`;
    feedback.textContent = "";
    answerInput.value = "";
    setModalInputState(false);
    puzzleModal.classList.remove("hidden");
    return;
  }

  gameState.currentPuzzleKey = puzzleKey;

  puzzleTitle.textContent = puzzle.title;
  puzzleQuestion.textContent = puzzle.question;
  feedback.textContent = "";
  answerInput.value = "";
  setModalInputState(true);

  puzzleModal.classList.remove("hidden");
  answerInput.focus();
}

function closeModal() {
  puzzleModal.classList.add("hidden");
  answerInput.value = "";
  feedback.textContent = "";
  setModalInputState(true);
}

function setModalInputState(enabled) {
  answerInput.disabled = !enabled;
  submitAnswerButton.disabled = !enabled;
  hintButton.disabled = !enabled;
}

function checkAnswer() {
  const puzzleKey = gameState.currentPuzzleKey;
  const puzzle = puzzles[puzzleKey];

  if (!puzzle || gameState.gameOver) {
    return;
  }

  const validation = validateAnswerFormat(answerInput.value);

  if (!validation.valid) {
    feedback.textContent = validation.message;
    return;
  }

  const normalizedCorrectAnswer = normalizeAnswer(puzzle.answer);

  if (validation.value === normalizedCorrectAnswer) {
    handleCorrectAnswer(puzzleKey);
  } else {
    handleWrongAnswer();
  }
}

function normalizeAnswer(answer) {
  return String(answer)
    .replace(/[０-９]/g, (char) =>
      String.fromCharCode(char.charCodeAt(0) - 0xfee0),
    )
    .replace(/\s+/g, "")
    .replace(/^x=/i, "")
    .toLowerCase();
}

function validateAnswerFormat(answer) {
  const normalized = normalizeAnswer(answer);

  if (normalized === "") {
    return {
      valid: false,
      message: "先輸入答案。空白不是數學答案，這招騙不了門鎖。",
    };
  }

  if (/[\u4e00-\u9fff]/.test(normalized)) {
    return {
      valid: false,
      message: "請使用阿拉伯數字作答，例如 5、30、42。中文數字目前不接受。",
    };
  }

  if (/[a-zA-Z]/.test(normalized)) {
    return {
      valid: false,
      message: "答案只需要輸入數字，不需要輸入英文、單位或完整句子。",
    };
  }

  if (!/^-?\d+(\.\d+)?$/.test(normalized)) {
    return {
      valid: false,
      message: "答案格式錯誤。請只輸入數字，例如 5、30、42。",
    };
  }

  return {
    valid: true,
    value: normalized,
  };
}

function handleCorrectAnswer(puzzleKey) {
  const puzzle = puzzles[puzzleKey];

  if (puzzle.solved && puzzleKey !== "door") {
    feedback.textContent = "這道謎題已經解開了，不會重複取得碎片。";
    return;
  }

  setModalInputState(false);
  triggerScreenFlash("correct");

  if (puzzleKey === "door") {
    puzzles.door.solved = true;
    endGame(true, "最後一道鎖發出清脆聲響。你成功逃出了教室。");
    return;
  }

  puzzle.solved = true;
  gameState.score += 20;

  gameState.inventory.push({
    key: puzzleKey,
    name: puzzle.fragmentName,
    value: puzzle.fragmentValue,
  });

  feedback.textContent = `答對了。你取得了 ${puzzle.fragmentName} = ${puzzle.fragmentValue}。`;

  const object = document.querySelector(`[data-puzzle="${puzzleKey}"]`);
  if (object) {
    object.classList.add("solved");
  }

  updateInventory();
  updateStatus();
  updateDoorState();
  updateMissionText();

  setTimeout(() => {
    closeModal();
  }, 1250);
}

function handleWrongAnswer() {
  triggerScreenFlash("wrong");

  gameState.lives--;
  gameState.score -= 10;
  gameState.timeLeft = Math.max(0, gameState.timeLeft - 15);

  feedback.textContent = "答錯了。扣 1 點生命，並損失 15 秒。";

  const modalContent = document.querySelector(".modal-content");
  modalContent.classList.add("shake");

  setTimeout(() => {
    modalContent.classList.remove("shake");
  }, 300);

  updateStatus();

  if (gameState.lives <= 0) {
    endGame(false, "生命歸零。方程式贏了這一局，你被教室留下來補考。");
  }
}

function showHint() {
  const puzzleKey = gameState.currentPuzzleKey;
  const puzzle = puzzles[puzzleKey];

  if (!puzzle || gameState.gameOver) {
    return;
  }

  if (!puzzle.hintUsed) {
    gameState.score -= 15;
    gameState.timeLeft = Math.max(0, gameState.timeLeft - 20);
    puzzle.hintUsed = true;
    updateStatus();
    feedback.textContent = `提示：${puzzle.hint}\n\n已扣 15 分與 20 秒。`;
  } else {
    feedback.textContent = `提示：${puzzle.hint}\n\n這題已經扣過提示代價，不會重複扣分。`;
  }
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

function updateMissionText() {
  const solvedCount = Object.keys(puzzles).filter(
    (key) => key !== "door" && puzzles[key].solved,
  ).length;

  if (solvedCount < 5) {
    missionText.textContent = `已收集 ${solvedCount} / 5 個碎片。繼續調查教室中的可疑物件。`;
  } else {
    missionText.textContent =
      "五個碎片已全部收集完成。出口門開始發光，現在可以輸入最終密碼。";
  }
}

function allMainPuzzlesSolved() {
  return (
    puzzles.blackboard &&
    puzzles.desk &&
    puzzles.clock &&
    puzzles.map &&
    puzzles.terminal &&
    puzzles.blackboard.solved &&
    puzzles.desk.solved &&
    puzzles.clock.solved &&
    puzzles.map.solved &&
    puzzles.terminal.solved
  );
}

function updateDoorState() {
  const door = document.querySelector('[data-puzzle="door"]');

  if (!door) {
    return;
  }

  if (allMainPuzzlesSolved()) {
    door.classList.remove("locked");
    door.classList.add("unlocked");
  } else {
    door.classList.add("locked");
    door.classList.remove("unlocked");
  }
}

function triggerScreenFlash(type) {
  const flash = document.getElementById("screen-flash");

  if (!flash) {
    return;
  }

  flash.className = "";
  void flash.offsetWidth;
  flash.classList.add(type);
}

function endGame(success, message) {
  gameState.gameOver = true;
  clearInterval(gameState.timerId);

  puzzleModal.classList.add("hidden");
  gameScreen.classList.remove("active");
  endingScreen.classList.add("active");

  if (success) {
    endingLabel.textContent = "ESCAPE SUCCESSFUL";
    endingTitle.textContent = "成功逃脫";
    endingMessage.textContent = `${message}\n\n最終分數：${gameState.score}`;
  } else {
    endingLabel.textContent = "GAME OVER";
    endingTitle.textContent = "遊戲結束";
    endingMessage.textContent = `${message}\n\n最終分數：${gameState.score}`;
  }
}
