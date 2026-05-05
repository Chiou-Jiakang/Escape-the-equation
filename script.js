let puzzles = {};

const FINAL_CODE_ORDER = ["clock", "map", "terminal", "blackboard", "desk"];

const SOUND_PATHS = {
  correct: "assets/sounds/correct.mp3",
  wrong: "assets/sounds/wrong.mp3",
  unlock: "assets/sounds/unlock.mp3",
  success: "assets/sounds/success.mp3",
  gameover: "assets/sounds/gameover.mp3",
};

const soundManager = {
  enabled: true,
  sounds: {},

  initialize() {
    Object.entries(SOUND_PATHS).forEach(([key, path]) => {
      const audio = new Audio(path);
      audio.preload = "auto";
      audio.volume = 0.55;
      this.sounds[key] = audio;
    });

    this.updateToggleButton();
  },

  play(key) {
    if (!this.enabled || !this.sounds[key]) {
      return;
    }

    try {
      const sound = this.sounds[key];
      sound.currentTime = 0;

      const playPromise = sound.play();

      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {
          // Browser autoplay restrictions or missing audio files should not break the game.
        });
      }
    } catch (error) {
      // Audio failure should never interrupt gameplay.
    }
  },

  toggle() {
    this.enabled = !this.enabled;
    this.updateToggleButton();
  },

  updateToggleButton() {
    const button = document.getElementById("sound-toggle");

    if (!button) {
      return;
    }

    button.textContent = this.enabled ? "音效：開" : "音效：關";
    button.classList.toggle("muted", !this.enabled);
    button.setAttribute("aria-pressed", String(this.enabled));
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
  wrongAttempts: 0,
  hintsUsed: 0,
  doorUnlockSoundPlayed: false,
};

const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const endingScreen = document.getElementById("ending-screen");

const startButton = document.getElementById("start-button");
const restartButton = document.getElementById("restart-button");
const soundToggleButton = document.getElementById("sound-toggle");

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
const endingSummary = document.getElementById("ending-summary");

soundManager.initialize();

startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", restartGame);
submitAnswerButton.addEventListener("click", checkAnswer);
hintButton.addEventListener("click", showHint);
closeModalButton.addEventListener("click", closeModal);

if (soundToggleButton) {
  soundToggleButton.addEventListener("click", () => {
    soundManager.toggle();
  });
}

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
  resetGameState();

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

function resetGameState() {
  gameState.lives = 3;
  gameState.score = 100;
  gameState.timeLeft = 600;
  gameState.currentPuzzleKey = null;
  gameState.gameOver = false;
  gameState.inventory = [];
  gameState.wrongAttempts = 0;
  gameState.hintsUsed = 0;
  gameState.doorUnlockSoundPlayed = false;

  document.querySelectorAll(".room-object").forEach((object) => {
    object.classList.remove("solved");
  });

  endingSummary.innerHTML = "";
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
  const formattedTime = formatTime(gameState.timeLeft);

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
    soundManager.play("success");
    endGame(true, "最後一道鎖發出清脆聲響。你成功逃出了教室。");
    return;
  }

  soundManager.play("correct");

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
  soundManager.play("wrong");

  gameState.lives--;
  gameState.score -= 10;
  gameState.timeLeft = Math.max(0, gameState.timeLeft - 15);
  gameState.wrongAttempts++;

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
    gameState.hintsUsed++;
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

    if (!gameState.doorUnlockSoundPlayed) {
      soundManager.play("unlock");
      gameState.doorUnlockSoundPlayed = true;
    }
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

function getPerformanceRating(success) {
  if (!success) {
    return {
      key: "failed",
      label: "Failed｜逃脫失敗",
      description: "生命值歸零或時間歸零，未能成功逃離教室。",
    };
  }

  if (
    gameState.lives === 3 &&
    gameState.hintsUsed === 0 &&
    gameState.timeLeft >= 300
  ) {
    return {
      key: "perfect",
      label: "Perfect Escape｜完美逃脫",
      description: "無傷、無提示，並在 5 分鐘內成功逃脫。",
    };
  }

  if (
    gameState.lives === 1 ||
    gameState.timeLeft < 90 ||
    gameState.hintsUsed >= 3
  ) {
    return {
      key: "narrow",
      label: "Narrow Escape｜驚險逃脫",
      description: "成功逃脫，但過程接近壓線，風險偏高。",
    };
  }

  if (
    gameState.lives === 3 &&
    gameState.hintsUsed <= 1 &&
    gameState.timeLeft >= 180
  ) {
    return {
      key: "clean",
      label: "Clean Escape｜俐落逃脫",
      description: "保持完整生命值，並以穩定節奏完成逃脫。",
    };
  }

  return {
    key: "escaped",
    label: "Escaped｜普通逃脫",
    description: "成功逃脫，但表現未達完美或俐落標準。",
  };
}

function formatTime(totalSeconds) {
  const safeSeconds = Math.max(totalSeconds, 0);
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function renderEndingSummary(success) {
  const rating = getPerformanceRating(success);

  endingSummary.innerHTML = `
    <div class="rating-badge ${rating.key}">
      ${rating.label}
    </div>

    <p>${rating.description}</p>

    <div class="summary-grid">
      <div class="summary-item">
        <span class="summary-label">最終分數</span>
        <span class="summary-value">${gameState.score}</span>
      </div>

      <div class="summary-item">
        <span class="summary-label">剩餘時間</span>
        <span class="summary-value">${formatTime(gameState.timeLeft)}</span>
      </div>

      <div class="summary-item">
        <span class="summary-label">剩餘生命</span>
        <span class="summary-value">${Math.max(gameState.lives, 0)} / 3</span>
      </div>

      <div class="summary-item">
        <span class="summary-label">答錯次數</span>
        <span class="summary-value">${gameState.wrongAttempts}</span>
      </div>

      <div class="summary-item">
        <span class="summary-label">使用提示</span>
        <span class="summary-value">${gameState.hintsUsed}</span>
      </div>

      <div class="summary-item">
        <span class="summary-label">完成碎片</span>
        <span class="summary-value">${gameState.inventory.length} / 5</span>
      </div>
    </div>
  `;
}

function endGame(success, message) {
  gameState.gameOver = true;
  clearInterval(gameState.timerId);

  if (!success) {
    soundManager.play("gameover");
  }

  puzzleModal.classList.add("hidden");
  gameScreen.classList.remove("active");
  endingScreen.classList.add("active");

  if (success) {
    endingLabel.textContent = "ESCAPE SUCCESSFUL";
    endingTitle.textContent = "成功逃脫";
    endingMessage.textContent = message;
  } else {
    endingLabel.textContent = "GAME OVER";
    endingTitle.textContent = "遊戲結束";
    endingMessage.textContent = message;
  }

  renderEndingSummary(success);
}
