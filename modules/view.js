export function updateWhoGoes(isWhite, move) {
  if (isWhite) return move.classList?.add("white");
  move.classList?.remove("white");
}

const twoDamnArr = (arr, cells) =>
  arr.map((_, i) => {
    if (i > 7) return;
    return [...cells].slice(i * 8, i * 8 + 8);
  });
export function render(arr, cells) {
  const twoDemArr = twoDamnArr(arr, cells);
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

export function drawMoves(moves, arr, cells) {
  const twoDemArr = twoDamnArr(arr, cells);
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
export function clear(cells) {
  cells.forEach((cell) => {
    cell.innerHTML = "";
  });
}
