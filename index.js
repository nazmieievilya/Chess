const cells = document.querySelectorAll(".cell");
const board = document.querySelector(".board");
const move = document.querySelector(".moves");
let defaultArr = [
  [
    [0, "♜"],
    [0, "♞"],
    [0, "♝"],
    [0, "♛"],
    [0, "♔"],
    [0, "♝"],
    [0, "♞"],
    [0, "♜"],
  ],
  [
    [0, "♟"],
    [0, "♟"],
    [0, "♟"],
    [0, "♟"],
    [0, "♟"],
    [0, "♟"],
    [0, "♟"],
    [0, "♟"],
  ],
  [" ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " "],
  [
    [1, "♟"],
    [1, "♟"],
    [1, "♟"],
    [1, "♟"],
    [1, "♟"],
    [1, "♟"],
    [1, "♟"],
    [1, "♟"],
  ],
  [
    [1, "♜"],
    [1, "♞"],
    [1, "♝"],
    [1, "♛"],
    [1, "♔"],
    [1, "♝"],
    [1, "♞"],
    [1, "♜"],
  ],
];
let isWhite = true;
function calcKnightMoves(knight, horse) {
  return [
    [knight[0] + 1, knight[1] + 2],
    [knight[0] + 1, knight[1] - 2],
    [knight[0] + 2, knight[1] + 1],
    [knight[0] + 2, knight[1] - 1],
    [knight[0] - 1, knight[1] - 2],
    [knight[0] - 1, knight[1] + 2],
    [knight[0] - 2, knight[1] - 1],
    [knight[0] - 2, knight[1] + 1],
  ].filter((coord) => {
    if (coord[0] < 8 && coord[0] >= 0 && coord[1] < 8 && coord[1] >= 0)
      return true;
  });
}

function updateWhoGoes(isWhite) {
  if (isWhite) return move.classList.add("white");
  move.classList.remove("white");
}

function calcPawnMoves(pawn, arr, color) {
  if (arr[pawn[0]][pawn[1]][0] === 1) {
    if (pawn[0] == 6) {
      const allMoves = [];
      if (arr[pawn[0] - 1][pawn[1]] === " ")
        allMoves.push([pawn[0] - 1, pawn[1]]);
      if (arr[pawn[0] - 2][pawn[1]] === " ")
        allMoves.push([pawn[0] - 2, pawn[1]]);
      if (
        arr[pawn[0] - 1][pawn[1] + 1]?.[0] !== color &&
        arr[pawn[0] - 1][pawn[1] + 1] !== " "
      )
        allMoves.push([pawn[0] - 1, pawn[1] + 1]);
      if (
        arr[pawn[0] - 1][pawn[1] - 1]?.[0] !== color &&
        arr[pawn[0] - 1][pawn[1] - 1] !== " "
      )
        allMoves.push([pawn[0] - 1, pawn[1] - 1]);
      return allMoves;
    }
    const allMoves = [];
    if (arr[pawn[0] - 1][pawn[1]] === " ")
      allMoves.push([pawn[0] - 1, pawn[1]]);
    if (
      arr[pawn[0] - 1][pawn[1] + 1]?.[0] !== color &&
      arr[pawn[0] - 1][pawn[1] + 1] !== " "
    )
      allMoves.push([pawn[0] - 1, pawn[1] + 1]);
    if (
      arr[pawn[0] - 1][pawn[1] - 1]?.[0] !== color &&
      arr[pawn[0] - 1][pawn[1] - 1] !== " "
    )
      allMoves.push([pawn[0] - 1, pawn[1] - 1]);
    return allMoves;
  }
  if (pawn[0] == 1) {
    const allMoves = [];
    if (arr[pawn[0] + 1][pawn[1]] === " ")
      allMoves.push([pawn[0] + 1, pawn[1]]);
    if (arr[pawn[0] + 2][pawn[1]]) allMoves.push([pawn[0] + 2, pawn[1]]);
    if (
      arr[pawn[0] + 1][pawn[1] + 1]?.[0] !== color &&
      arr[pawn[0] + 1][pawn[1] + 1] != " "
    )
      allMoves.push([pawn[0] + 1, pawn[1] + 1]);
    if (
      arr[pawn[0] + 1][pawn[1] - 1]?.[0] !== color &&
      arr[pawn[0] + 1][pawn[1] - 1] != " "
    )
      allMoves.push([pawn[0] + 1, pawn[1] - 1]);
    return allMoves;
  }
  const allMoves = [];
  if (arr[pawn[0] + 1][pawn[1]] === " ") allMoves.push([pawn[0] + 1, pawn[1]]);
  if (
    arr[pawn[0] + 1][pawn[1] + 1]?.[0] !== color &&
    arr[pawn[0] + 1][pawn[1] + 1] != " "
  )
    allMoves.push([pawn[0] + 1, pawn[1] + 1]);
  if (
    arr[pawn[0] + 1][pawn[1] - 1]?.[0] !== color &&
    arr[pawn[0] + 1][pawn[1] - 1] != " "
  )
    allMoves.push([pawn[0] + 1, pawn[1] - 1]);
  return allMoves;
}
const twoDamnArr = (arr) =>
  arr.map((_, i) => {
    if (i > 7) return;
    return [...cells].slice(i * 8, i * 8 + 8);
  });
function render(arr) {
  const twoDemArr = twoDamnArr(arr);
  twoDemArr.forEach((row, x) => {
    row.forEach((cell, y) => {
      if (arr[x][y] == " ") return;
      const color = arr[x][y][0];
      const figure = arr[x][y][1];
      cell.insertAdjacentHTML(
        "afterbegin",
        `<p data-coords='${x},${y}' class='${
          color > 0 ? "balck" : "white"
        } figure'>${figure}</p>`
      );
    });
  });
}

function drawMoves(moves, arr) {
  const twoDemArr = twoDamnArr(arr);
  moves.forEach((move) => {
    if (twoDemArr[move[0]][move[1]]?.textContent) {
      twoDemArr[move[0]][move[1]].classList.add("kill");
      twoDemArr[move[0]][move[1]].dataset.coords = [move[0], move[1]].join(",");
      return;
    }
    twoDemArr[move[0]][move[1]]?.classList.add("hightlight");
    const dataset = twoDemArr[move[0]][move[1]]?.dataset;
    dataset ? (dataset.coords = [move[0], move[1]].join(",")) : null;
  });
}
function clear() {
  cells.forEach((cell) => {
    cell.innerHTML = "";
  });
}

function moveFigure(figure, arr, coordsToMove) {
  const newArr = JSON.parse(JSON.stringify(arr));
  newArr[+coordsToMove[0]][+coordsToMove[1]] = newArr[figure[0]][figure[1]];
  newArr[figure[0]][figure[1]] = " ";
  defaultArr = newArr;
  clear();
  render(newArr);
  cells.forEach((cell) => cell.classList.remove("hightlight"));
  cells.forEach((cell) => cell.classList.remove("kill"));
  isWhite = !isWhite;
  updateWhoGoes(isWhite);
}
function killFigure(figure, arr, coordsToMove) {
  const newArr = JSON.parse(JSON.stringify(arr));
  newArr[+coordsToMove[0]][+coordsToMove[1]] = newArr[figure[0]][figure[1]];
  newArr[figure[0]][figure[1]] = " ";
  defaultArr = newArr;
  clear();
  render(newArr);
  cells.forEach((cell) => cell.classList.remove("hightlight"));
  cells.forEach((cell) => cell.classList.remove("kill"));
  isWhite = !isWhite;
  updateWhoGoes(isWhite);
}
let selectedFig = "";
function run(e) {
  if (e.target.classList.contains("kill")) {
    return killFigure(
      selectedFig,
      defaultArr,
      e.target.dataset.coords.split(",")
    );
  }
  if (e.target.classList.contains("hightlight")) {
    return moveFigure(
      selectedFig,
      defaultArr,
      e.target.dataset.coords.split(",")
    );
  }

  cells.forEach((cell) => cell.classList.remove("hightlight"));
  cells.forEach((cell) => cell.classList.remove("kill"));
  const element = e.target.closest(".cell").children[0];
  if (!element) return;
  const coords = element.dataset.coords.split(",").map((el) => +el);
  const figure = [element.classList[0] == "white" ? 0 : 1, element.textContent];
  selectedFig = coords;
  if ((figure[0] === 1 && isWhite) || (figure[0] === 0 && !isWhite)) return;
  if (figure[1] === "♞") {
    const moves = calcKnightMoves(coords);
    const availableMoves = moves.filter((move) => {
      if (
        defaultArr[move[0]][move[1]] == " " ||
        defaultArr[move[0]][move[1]][0] !== figure[0]
      )
        return true;
    });

    // rendering
    drawMoves(availableMoves, defaultArr);
  }
  if (figure[1] === "♟") {
    const moves = calcPawnMoves(coords, defaultArr, figure[0]);
    // const availableMoves = moves.filter((move) => {
    //   if (
    //     defaultArr[move[0]][move[1]] == " " ||
    //     defaultArr[move[0]][move[1]][0] == figure[0]
    //   )
    //     return true;
    // });
    console.log(moves);
    drawMoves(moves, defaultArr);
  }
  if (figure[1] === "♛") {
    const moves = calcQueenMoves(coords, defaultArr, figure[0]);
    // const availableMoves = moves.filter((move) => {
    //   if (defaultArr[move[0]][move[1]].?[0] !== figure[0]) return true;
    // });
    // console.log(availableMoves);
    // drawMoves(availableMoves, defaultArr);
    console.log(moves);
    drawMoves(moves, defaultArr);
  }
  if (figure[1] === "♜") {
    const moves = calcRookMoves(coords, defaultArr, figure[0]);
    const availableMoves = moves.filter((move) => {
      if (
        defaultArr[move[0]][move[1]] == " " ||
        defaultArr[move[0]][move[1]][0] !== figure[0]
      )
        return true;
    });
    console.log(moves);
    drawMoves(moves, defaultArr);
  }
  if (figure[1] === "♝") {
    const moves = calcBishopMoves(coords, defaultArr, figure[0]);
    const availableMoves = moves.filter((move) => {
      if (
        defaultArr[move[0]][move[1]] == " " ||
        defaultArr[move[0]][move[1]][0] !== figure[0]
      )
        return true;
    });
    console.log(moves);
    drawMoves(moves, defaultArr);
  }
}

render(defaultArr);

board.addEventListener("click", run);

function calcHor(figure, board, color) {
  const arr = [];

  for (let i = figure[0] + 1; i < 8; i++) {
    if (board[i][figure[1]]?.[0] === color) break;
    arr.push([i, figure[1]]);
    if (board[i][figure[1]]?.[0] !== color && board[i][figure[1]] !== " ")
      break;
  }

  // checking vertically backwards
  for (let d = figure[0] - 1; d >= 0; d--) {
    if (board[d][figure[1]]?.[0] === color) break;
    arr.push([d, figure[1]]);
    if (board[d][figure[1]]?.[0] !== color && board[d][figure[1]] !== " ")
      break;
  }

  // checking to right
  for (let r = figure[1] + 1; r < 8; r++) {
    if (board[figure[0]][r]?.[0] === color) break;
    arr.push([figure[0], r]);
    if (board[figure[0]][r]?.[0] !== color && board[figure[0]][r] !== " ")
      break;
  }
  for (let r = figure[1] - 1; r >= 0; r--) {
    if (board[figure[0]][r]?.[0] === color) break;
    arr.push([figure[0], r]);
    if (board[figure[0]][r]?.[0] !== color && board[figure[0]][r] !== " ")
      break;
  }
  return arr;
}
function calcDiag(figure, board, color) {
  const arr = [];
  for (let dr = figure[0] + 1; dr < 8; dr++) {
    if (board[dr][figure[1] + dr - figure[0]]?.[0] === color) break;
    arr.push([dr, figure[1] + dr - figure[0]]);
    if (
      board[dr][figure[1] + dr - figure[0]]?.[0] !== color &&
      board[dr][figure[1] + dr - figure[0]] !== " "
    )
      break;
  }
  // from right-bottom to right-top
  for (let dl = figure[0] - 1; dl >= 0; dl--) {
    if (figure[1] - (figure[0] - dl) < 0) break;
    if (board[dl][figure[1] - (figure[0] - dl)]?.[0] === color) break;
    arr.push([dl, figure[1] - (figure[0] - dl)]);
    if (
      board[dl][figure[1] - (figure[0] - dl)]?.[0] !== color &&
      board[dl][figure[1] - (figure[0] - dl)] !== " "
    )
      break;
  }

  // From right-top to left-bottom
  for (let dlb = figure[0] + 1; dlb < 8; dlb++) {
    if (figure[1] - (dlb - figure[0]) < 0) break;
    if (board[dlb][figure[1] - (dlb - figure[0])]?.[0] === color) break;
    arr.push([dlb, figure[1] - (dlb - figure[0])]);
    if (
      board[dlb][figure[1] - (dlb - figure[0])]?.[0] !== color &&
      board[dlb][figure[1] - (dlb - figure[0])] !== " "
    )
      break;
  }
  // From left-bottom to right-top

  for (let dlt = figure[0] - 1; dlt >= 0; dlt--) {
    if (board[dlt][figure[1] + figure[0] - dlt]?.[0] === color) break;
    arr.push([dlt, figure[1] + figure[0] - dlt]);
    if (
      board[dlt][figure[1] + figure[0] - dlt]?.[0] !== color &&
      board[dlt][figure[1] + figure[0] - dlt] !== " "
    )
      break;
  }
  return arr;
}
function calcRookMoves(rook, board, color) {
  return calcHor(rook, board, color);
}
function calcBishopMoves(bishop, board, color) {
  return calcDiag(bishop, board, color);
}
function calcQueenMoves(queen, board, color) {
  return [...calcDiag(queen, board, color), ...calcHor(queen, board, color)];
}
updateWhoGoes(isWhite);
