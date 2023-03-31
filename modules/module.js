export function moveFigure(
  figure,
  arr,
  coordsToMove,
  clear,
  render,
  updateWhoGoes,
  cells,
  move
) {
  const newArr = JSON.parse(JSON.stringify(arr));
  newArr[+coordsToMove[0]][+coordsToMove[1]] = newArr[figure[0]][figure[1]];
  newArr[figure[0]][figure[1]] = " ";
  newArr;
  clear(cells);
  render(newArr, cells);
  cells.forEach((cell) => cell.classList.remove("hightlight"));
  cells.forEach((cell) => cell.classList.remove("kill"));

  return newArr;
}
export function killFigure(
  figure,
  arr,
  coordsToMove,
  clear,
  render,
  updateWhoGoes,
  cells,
  move
) {
  const newArr = JSON.parse(JSON.stringify(arr));
  newArr[+coordsToMove[0]][+coordsToMove[1]] = newArr[figure[0]][figure[1]];
  newArr[figure[0]][figure[1]] = " ";

  clear(cells);
  render(newArr, cells);
  cells.forEach((cell) => cell.classList.remove("hightlight"));
  cells.forEach((cell) => cell.classList.remove("kill"));

  return newArr;
}
