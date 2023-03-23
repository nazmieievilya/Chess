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
}

render(defaultArr);

board.addEventListener("click", run);
