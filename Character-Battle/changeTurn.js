const shop = document.querySelector(".shop"),
  characterList = shop.querySelector(".characterList"),
  BOTTOM = document.querySelector(".bottom"),
  probabilityInfo = document.querySelector(".probabilityInfo"),
  battleBoard = BOTTOM.querySelector("table"),
  enemyZone = battleBoard.getElementsByClassName("enemyZone"),
  enemyInfo = document.querySelector(".enemyInfo"),
  enemyInfoImg = enemyInfo.querySelectorAll("img"),
  lotteryCost = document.querySelector(".lotteryCost");

const level = document.querySelector(".levelUp"),
  gold = document.querySelector(".gold"),
  currentExp = level.querySelector(".exp"),
  round = document.querySelector(".round"),
  currentRnd = round.querySelector("input"),
  life = document.querySelector(".life"),
  currentLfe = life.querySelector("input"),
  lottoCost = Number(lotteryCost.innerText);

let currentLvl = level.querySelector(".level"),
  currentLevel = Number(currentLvl.innerText),
  currentGld = gold.querySelector("input"),
  currentGold = Number(currentGld.value),
  currentEXP = Number(currentExp.innerText),
  currentRound = Number(currentRnd.value),
  currentLife = Number(currentLfe.value);

changeMoney = (number) => {
  currentGld.value = currentGold + number;
  currentGold += number;
};

changeLife = (number) => {
  currentLfe.value = currentLife - number;
  currentLife -= number;
};

changeRound = () => {
  currentRnd.value = Number(currentRnd.value) + 1;
  currentRound += 1;
};

changeExp = (number) => {
  currentExp.innerText = eval(currentEXP + number);
  currentEXP += number;
};

changeLevel = () => {
  currentLvl.innerText = currentLevel + 1;
  currentLevel += 1;
};

changeLotteryCost = () => {
  if (currentLevel === 1) {
    lotteryCost.innerText = 100;
  } else if (currentLevel === 2) {
    lotteryCost.innerText = 300;
  } else {
    lotteryCost.innerText = 1000;
  }
};

charactersPercent = () => {
  const randomNumber = Math.random() * 100;
  if (currentLevel === 1) {
    if (randomNumber < 27) {
      return "루피(1성)";
    } else if (randomNumber < 54) {
      return "조로(1성)";
    } else if (randomNumber < 80) {
      return "로우(1성)";
    } else if (randomNumber < 84) {
      return "에넬(2성)";
    } else if (randomNumber < 88) {
      return "에이스(2성)";
    } else if (randomNumber < 92) {
      return "루치(2성)";
    } else if (randomNumber < 95) {
      return "검은수염(2성)";
    } else if (randomNumber < 97) {
      return "미호크(3성)";
    } else if (randomNumber < 99) {
      return "흰수염(3성)";
    } else {
      return "골드로져(3성)";
    }
  } else if (currentLevel === 2) {
    if (randomNumber < 12.5) {
      return "에넬(2성)";
    } else if (randomNumber < 25) {
      return "에이스(2성)";
    } else if (randomNumber < 37.5) {
      return "루치(2성)";
    } else if (randomNumber < 50) {
      return "검은수염(2성)";
    } else if (randomNumber < 65) {
      return "미호크(3성)";
    } else if (randomNumber < 80) {
      return "흰수염(3성)";
    } else if (randomNumber < 95) {
      return "골드로져(3성)";
    } else if (randomNumber < 96.2) {
      return "피콜로(4성)";
    } else if (randomNumber < 97.4) {
      return "프리저(4성)";
    } else if (randomNumber < 98.5) {
      return "트랭크스(4성)";
    } else if (randomNumber < 99.25) {
      return "골드프리저(5성)";
    } else {
      return "손오공블루(5성)";
    }
  } else {
    if (randomNumber < 17) {
      return "미호크(3성)";
    } else if (randomNumber < 34) {
      return "흰수염(3성)";
    } else if (randomNumber < 50) {
      return "골드로져(3성)";
    } else if (randomNumber < 62) {
      return "피콜로(4성)";
    } else if (randomNumber < 74) {
      return "프리저(4성)";
    } else if (randomNumber < 85) {
      return "트랭크스(4성)";
    } else if (randomNumber < 92.5) {
      return "골드프리저(5성)";
    } else {
      return "손오공블루(5성)";
    }
  }
};

makeList = () => {
  if (characterList.children.length < 20) {
    const li = document.createElement("li"),
      span = document.createElement("span"),
      arrangeBtn = document.createElement("button"),
      sellBtn = document.createElement("button"),
      characterName = charactersPercent();
    span.innerText = characterName;
    arrangeBtn.innerText = "✅";
    arrangeBtn.addEventListener("click", arrangeCharacter);
    sellBtn.innerText = "💲";
    sellBtn.addEventListener("click", sellCharacter);
    characterList.appendChild(li);
    li.appendChild(arrangeBtn);
    li.appendChild(sellBtn);
    li.appendChild(span);
  } else {
    alert("영웅은 최대 20기까지만 보유 가능합니다.");
  }
};

drawLots = () => {
  const money = Number(lotteryCost.innerText);
  if (characterList.children.length < 20) {
    if (currentGold < money) {
      alert("금이 부족합니다!");
    } else {
      changeMoney(-money);
      makeList();
    }
  } else {
    alert("영웅은 최대 20기까지만 보유 가능합니다!");
  }
};

arrangeCharacter = (event) => {
  event.preventDefault();
  const td = event.target,
    li = td.parentNode,
    span = li.children[2],
    characterName = span.innerText;
  let i, j, x;
  for (i = 0; i < 3; i++) {
    for (j = 1; j < 8; j++) {
      const colorTarget = battleBoard.rows[i].cells[j];
      if (colorTarget.children.length === 0) {
        colorTarget.classList.add("nothingOnBoard");
      }
    }
  }
  const choosePosition = battleBoard.getElementsByClassName("nothingOnBoard");
  for (x = 0; x < choosePosition.length; x++) {
    choosePosition[x].addEventListener("click", putCharacter);
  }
  characterList.removeChild(li);
  return (VALUE = characterName);
};

putCharacter = function () {
  const position = event.target,
    determineCharacter = VALUE.slice(0, VALUE.length - 4),
    div = document.createElement("div"),
    img = document.createElement("img"),
    p = document.createElement("p"),
    choosePosition = battleBoard.getElementsByClassName("nothingOnBoard");
  let i, j, x;
  if (determineCharacter === "루피") {
    img.src = "Characters/1.jpg";
    p.innerText = "150";
  } else if (determineCharacter === "조로") {
    img.src = "Characters/2.jpg";
    p.innerText = "200";
  } else if (determineCharacter === "로우") {
    img.src = "Characters/3.jpg";
    p.innerText = "250";
  } else if (determineCharacter === "에넬") {
    img.src = "Characters/4.jpg";
    p.innerText = "350";
  } else if (determineCharacter === "에이스") {
    img.src = "Characters/5.jpg";
    p.innerText = "400";
  } else if (determineCharacter === "루치") {
    img.src = "Characters/6.jpg";
    p.innerText = "500";
  } else if (determineCharacter === "검은수염") {
    img.src = "Characters/7.jpg";
    p.innerText = "600";
  } else if (determineCharacter === "미호크") {
    img.src = "Characters/8.jpg";
    p.innerText = "800";
  } else if (determineCharacter === "흰수염") {
    img.src = "Characters/9.jpg";
    p.innerText = "1000";
  } else if (determineCharacter === "골드로져") {
    img.src = "Characters/10.jpg";
    p.innerText = "1500";
  } else if (determineCharacter === "피콜로") {
    img.src = "Characters/11.jpg";
    p.innerText = "3000";
  } else if (determineCharacter === "프리저") {
    img.src = "Characters/12.jpg";
    p.innerText = "5000";
  } else if (determineCharacter === "트랭크스") {
    img.src = "Characters/13.jpg";
    p.innerText = "6000";
  } else if (determineCharacter === "골드프리저") {
    img.src = "Characters/14.jpg";
    p.innerText = "8000";
  } else {
    img.src = "Characters/15.jpg";
    p.innerText = "15000";
  }
  div.classList.add("characterOnBoard");
  div.appendChild(img);
  div.appendChild(p);
  position.appendChild(div);
  for (x = 0; x < choosePosition.length; x++) {
    choosePosition[x].removeEventListener("click", putCharacter);
  }
  for (i = 0; i < 3; i++) {
    for (j = 1; j < 8; j++) {
      battleBoard.rows[i].cells[j].classList.remove("nothingOnBoard");
    }
  }
};

sellCharacter = () => {
  const btn = event.target,
    li = btn.parentNode,
    span = li.children[2],
    characterName = span.innerText,
    characterClass = characterName.slice(
      characterName.length - 3,
      characterName.length - 1
    );
  if (characterClass === "1성") {
    changeMoney(50);
  } else if (characterClass === "2성") {
    changeMoney(100);
  } else if (characterClass === "3성") {
    changeMoney(200);
  } else if (characterClass === "4성") {
    changeMoney(400);
  } else {
    changeMoney(800);
  }
  characterList.removeChild(li);
};

levelUp = () => {
  if (currentLevel === 1) {
    if (currentGold < 400 || currentEXP < 4500) {
      alert("금과 경험치를 확인해주세요!");
    } else {
      changeLevel();
      changeLotteryCost();
      changeMoney(-400);
    }
  } else if (currentLevel === 2) {
    if (currentGold < 800 || currentEXP < 50000) {
      alert("금과 경험치를 확인해주세요!");
    } else {
      changeLevel();
      changeLotteryCost();
      changeMoney(-800);
    }
  } else {
    alert("3단계가 가장 높은 단계입니다!");
  }
};

goForwardEnemies = (left, right) => {
  currentPosition = battleBoard.rows[left].cells[right];
  nextPosition = battleBoard.rows[left].cells[right + 1];
  if (currentPosition.children.length === 1) {
    currentChild = currentPosition.children[0];
    if (currentChild.className === "enemyOnBoard") {
      if (nextPosition.children.length === 1) {
        nextChild = nextPosition.children[0];
        const enemyNumber = Number(currentChild.innerHTML.slice(18, 19)) - 1,
          enemyPow = document.getElementsByClassName("enemyPower");
        changeGld = (number) => {
          changeMoney(Number(enemyPow[number].innerText) / 2);
        };
        changeEXP = (number) => {
          changeExp(Number(enemyPow[number].innerText));
        };
        if (Number(currentChild.innerText) > Number(nextChild.innerText)) {
          currentChild.children[1].innerText =
            Number(currentChild.innerText) - Number(nextChild.innerText);
          nextPosition.innerHTML = currentPosition.innerHTML;
          currentPosition.innerHTML = "";
        } else {
          changeGld(enemyNumber);
          changeEXP(enemyNumber);
          if (Number(currentChild.innerText) === Number(nextChild.innerText)) {
            currentPosition.innerHTML = "";
            nextPosition.innerHTML = "";
          } else {
            nextChild.children[1].innerText =
              Number(nextChild.innerText) - Number(currentChild.innerText);
            currentPosition.innerHTML = "";
          }
        }
      } else {
        nextPosition.innerHTML = currentPosition.innerHTML;
        currentPosition.innerHTML = "";
      }
    }
  }
  lastZone = battleBoard.rows[left].cells[7];
  removedTarget = lastZone.children[0];
  if (
    lastZone.children.length === 1 &&
    removedTarget.className === "enemyOnBoard"
  ) {
    changeLife(Number(removedTarget.innerText));
    lastZone.removeChild(removedTarget);
  }
};

moveEnemies = () => {
  let currentPosition, nextPosition, currentChild, nextChild, lastZone;
  let x, y;
  for (x = 2; x >= 0; x--) {
    for (y = 6; y >= 0; y--) {
      goForwardEnemies(x, y);
    }
  }
};

createEnemies = (number) => {
  for (i = 0; i < 3; i++) {
    const div = document.createElement("div"),
      img = document.createElement("img"),
      p = document.createElement("p");
    if (number === 2) {
      img.src = "Enemies/1.jpg";
    } else if (number === 3) {
      img.src = "Enemies/2.jpg";
    } else {
      img.src = "Enemies/3.jpg";
    }
    if (currentRound < 5) {
      p.innerText = 4 * number + 1 * number * (currentRound - 1);
    } else if (currentRound < 9) {
      p.innerText = 10 * number + 2 * number * (currentRound - 5);
    } else if (currentRound < 13) {
      p.innerText = 30 * number + 12 * number * (currentRound - 9);
    } else {
      p.innerText = 100 * number + 100 * number * (currentRound - 13);
    }
    div.classList.add("enemyOnBoard");
    div.appendChild(img);
    div.appendChild(p);
    enemyZone[i].appendChild(div);
  }
};

createLikum = () => {
  createEnemies(2);
};

createCell = () => {
  createEnemies(3);
};

createVirus = () => {
  createEnemies(25);
};

summonEnemies = () => {
  const create1 = setInterval(createLikum, 500);
  setTimeout(function () {
    clearInterval(create1);
  }, 2600);
  setTimeout(createCell, 3000);
  setTimeout(createCell, 3500);
  setTimeout(createCell, 4000);
  setTimeout(createCell, 4500);
  setTimeout(createCell, 5000);
  setTimeout(createVirus, 5500);
  if (currentRound === 5 || currentRound === 10 || currentRound === 15) {
    setTimeout(createVirus, 6000);
  }
  const move = setInterval(moveEnemies, 501);
  setTimeout(function () {
    clearInterval(move);
  }, 9100);
};

showProb = () => {
  probabilityInfo.classList.remove("HIDE");
};

hideProb = () => {
  probabilityInfo.classList.add("HIDE");
};

showShop = () => {
  shop.classList.remove("HIDE");
};

hideShop = () => {
  shop.classList.add("HIDE");
};

victoryOrDefeat = () => {
  if (currentLife < 0) {
    alert("패배!");
    location.reload();
  } else if (currentLife >= 0 && currentRound === 15) {
    alert("승리!");
    location.reload();
  }
};

arrangeBoard = () => {
  let i, j;
  const characters = battleBoard.getElementsByClassName("characterOnBoard");
  for (i = 0; i < characters.length; i++) {
    characters[i].id = `ch${i + 1}`;
  }
  for (i = 0; i < characters.length; i++) {
    const character = battleBoard.querySelector(`#ch${i + 1}`),
      previousPosition = character.parentNode,
      line = previousPosition.parentNode;
    loop: for (j = 7; j > 0; j--) {
      const exist = line.cells[j];
      if (exist.children[0] === character) {
        break;
      } else if (exist.innerHTML === "") {
        line.cells[j].appendChild(character);
        break;
      } else {
        continue loop;
      }
    }
  }
};

readyTurn = () => {
  arrangeBoard();
  showShop();
  const lotteryBtn = shop.querySelector("#lotteryBtn"),
    probability = shop.querySelector("#probability"),
    levelUpBtn = shop.querySelector("#levelUpBtn"),
    battleBtn = shop.querySelector("#battleBtn");
  lotteryBtn.addEventListener("click", drawLots);
  probability.addEventListener("click", showProb);
  levelUpBtn.addEventListener("click", levelUp);
  battleBtn.addEventListener("click", battleTurn);
  probabilityInfo.addEventListener("mouseleave", hideProb);
  let x, enemyPower;
  for (x = 0; x < 3; x++) {
    enemyPower = enemyInfoImg[x].nextElementSibling;
    if (x === 0) {
      if (currentRound < 5) {
        enemyPower.innerText = 8 + 2 * (currentRound - 1);
      } else if (currentRound < 9) {
        enemyPower.innerText = 20 + 4 * (currentRound - 5);
      } else if (currentRound < 13) {
        enemyPower.innerText = 60 + 24 * (currentRound - 9);
      } else {
        enemyPower.innerText = 200 + 200 * (currentRound - 13);
      }
    } else if (x === 1) {
      if (currentRound < 5) {
        enemyPower.innerText = 12 + 3 * (currentRound - 1);
      } else if (currentRound < 9) {
        enemyPower.innerText = 30 + 6 * (currentRound - 5);
      } else if (currentRound < 13) {
        enemyPower.innerText = 90 + 36 * (currentRound - 9);
      } else {
        enemyPower.innerText = 300 + 300 * (currentRound - 13);
      }
    } else {
      if (currentRound < 5) {
        enemyPower.innerText = 100 + 25 * (currentRound - 1);
      } else if (currentRound < 9) {
        enemyPower.innerText = 250 + 50 * (currentRound - 5);
      } else if (currentRound < 13) {
        enemyPower.innerText = 750 + 300 * (currentRound - 9);
      } else {
        enemyPower.innerText = 2500 + 2500 * (currentRound - 13);
      }
    }
  }
};

battleTurn = () => {
  hideShop();
  summonEnemies();
  setTimeout(victoryOrDefeat, 9050);
  setTimeout(changeRound, 9100);
  setTimeout(readyTurn, 9100);
};

init = () => {
  readyTurn();
  };
init();
