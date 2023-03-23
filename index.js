const cells = document.querySelectorAll(".cell");
const board = document.querySelector(".board");
const defaultArr = [
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
  [" ", " ", " ", [1, "♟"], " ", " ", " ", " "],
  [" ", " ", [1, "♔"], " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " "],
];

function render(arr) {
  const twoDemArr = arr.map((_, i) => {
    if (i > 7) return;
    return [...cells].slice(i * 8, i * 8 + 8);
  });
  twoDemArr.forEach((row, x) => {
    row.forEach((cell, y) => {
      if (arr[x][y] == " ") return;
      const color = arr[x][y][0];
      const figure = arr[x][y][1];
      cell.insertAdjacentHTML(
        "afterbegin",
        `<p data-coords='${x},${x}' class='${
          color > 0 ? "balck" : "white"
        } figure'>${figure}</p>`
      );
    });
  });
}

function run(e) {
  const element = e.target.closest(".cell").children[0];
  if (!element) return;
  const coords = element.dataset.coords.split(",").map((el) => +el);
  const figure = [element.classList[0] == "white" ? 0 : 1, element.textContent];
  console.log(figure, coords);
}

render(defaultArr);

board.addEventListener("click", run);
