const cells = document.querySelectorAll(".cell");
const board = document.querySelector(".board");
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

function calcPawnMoves(pawn) {
  if (defaultArr[pawn[0]][pawn[1]][0] === 1) {
    if (pawn[0] == 6) {
      return [
        [pawn[0] - 1, pawn[1]],
        [pawn[0] - 2, pawn[1]],
      ];
    }
    return [[pawn[0] - 1, pawn[1]]];
  }
  if (pawn[0] == 1) {
    return [
      [pawn[0] + 1, pawn[1]],
      [pawn[0] + 2, pawn[1]],
    ];
  }
  return [[pawn[0] + 1, pawn[1]]];
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
    twoDemArr[move[0]][move[1]].classList.add("hightlight");
    twoDemArr[move[0]][move[1]].dataset.coords = [move[0], move[1]].join(",");
  });
}
function clear() {
  cells.forEach((cell) => {
    cell.innerHTML = "";
  });
}

function moveFigure(figure, arr, coordsToMove) {
  console.log(coordsToMove);
  console.log(figure);
  const newArr = JSON.parse(JSON.stringify(arr));
  newArr[+coordsToMove[0]][+coordsToMove[1]] = newArr[figure[0]][figure[1]];
  newArr[figure[0]][figure[1]] = " ";
  defaultArr = newArr;
  clear();
  render(newArr);
  cells.forEach((cell) => cell.classList.remove("hightlight"));
}
let selectedFig = "";
function run(e) {
  if (e.target.classList.contains("hightlight"))
    return moveFigure(
      selectedFig,
      defaultArr,
      e.target.dataset.coords.split(",")
    );
  cells.forEach((cell) => cell.classList.remove("hightlight"));
  const element = e.target.closest(".cell").children[0];
  if (!element) return;
  const coords = element.dataset.coords.split(",").map((el) => +el);
  const figure = [element.classList[0] == "white" ? 0 : 1, element.textContent];
  selectedFig = coords;
  if (figure[1] === "♞") {
    const moves = calcKnightMoves(coords);
    const availableMoves = moves.filter((move) => {
      if (defaultArr[move[0]][move[1]] == " ") return true;
    });

    // rendering
    drawMoves(availableMoves, defaultArr);
  }
  if (figure[1] === "♟") {
    const moves = calcPawnMoves(coords);
    const availableMoves = moves.filter((move) => {
      if (defaultArr[move[0]][move[1]] == " ") return true;
    });
    drawMoves(availableMoves, defaultArr);
  }
  if (figure[1] === "♛") {
    const moves = calcQueenMoves(coords, defaultArr);
    const availableMoves = moves.filter((move) => {
      if (defaultArr[move[0]][move[1]] == " ") return true;
    });
    console.log(moves);
    drawMoves(availableMoves, defaultArr);
  }
  if (figure[1] === "♜") {
    const moves = calcRookMoves(coords, defaultArr);
    const availableMoves = moves.filter((move) => {
      if (defaultArr[move[0]][move[1]] == " ") return true;
    });
    console.log(moves);
    drawMoves(availableMoves, defaultArr);
  }
  if (figure[1] === "♝") {
    const moves = calcBishopMoves(coords, defaultArr);
    const availableMoves = moves.filter((move) => {
      if (defaultArr[move[0]][move[1]] == " ") return true;
    });
    console.log(moves);
    drawMoves(availableMoves, defaultArr);
  }
}

render(defaultArr);

board.addEventListener("click", run);

function calcHor(figure, board) {
  const arr = [];

  for (let i = figure[0] + 1; i < 8; i++) {
    if (board[i][figure[1]] != " ") break;
    arr.push([i, figure[1]]);
  }

  // checking vertically backwards
  for (let d = figure[0] - 1; d >= 0; d--) {
    if (board[d][figure[1]] != " ") break;
    arr.push([d, figure[1]]);
  }

  // checking to right
  for (let r = figure[1] + 1; r < 8; r++) {
    if (board[figure[0]][r] != " ") break;
    arr.push([figure[0], r]);
  }
  for (let r = figure[1] - 1; r >= 0; r--) {
    if (board[figure[0]][r] != " ") break;
    arr.push([figure[0], r]);
  }
  return arr;
}
function calcDiag(figure, board) {
  const arr = [];
  for (let dr = figure[0] + 1; dr < 8; dr++) {
    if (board[dr][figure[1] + dr - figure[0]] != " ") break;
    arr.push([dr, figure[1] + dr - figure[0]]);
  }
  // from right-bottom to right-top
  for (let dl = figure[0] - 1; dl >= 0; dl--) {
    if (figure[1] - (figure[0] - dl) < 0) break;
    if (board[dl][figure[1] - (figure[0] - dl)] != " ") break;
    arr.push([dl, figure[1] - (figure[0] - dl)]);
  }

  // From right-top to left-bottom
  for (let dlb = figure[0] + 1; dlb < 8; dlb++) {
    if (figure[1] - (dlb - figure[0]) < 0) break;
    if (board[dlb][figure[1] - (dlb - figure[0])] != " ") break;
    arr.push([dlb, figure[1] - (dlb - figure[0])]);
  }
  // From left-bottom to right-top

  for (let dlt = figure[0] - 1; dlt >= 0; dlt--) {
    if (board[dlt][figure[1] + figure[0] - dlt] != " ") break;
    arr.push([dlt, figure[1] + figure[0] - dlt]);
  }
  return arr;
}
function calcRookMoves(rook, board) {
  return calcHor(rook, board);
}
function calcBishopMoves(bishop, board) {
  return calcDiag(bishop, board);
}
function calcQueenMoves(queen, board) {
  return [...calcDiag(queen, board), ...calcHor(queen, board)];
}
