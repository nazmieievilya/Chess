import { initialState } from "./constants.js";
import {
  calcRookMoves,
  calcBishopMoves,
  calcQueenMoves,
  calcPawnMoves,
  calcKnightMoves,
  calcKingMoves,
} from "./modules/movesOfFigures.js";
import { moveFigure, killFigure } from "./modules/module.js";
import { updateWhoGoes, render, drawMoves, clear } from "./modules/view.js";
const cells = document.querySelectorAll(".cell");
const board = document.querySelector(".board");
const move = document.querySelector(".moves");
let boardState = initialState;
let isWhite = true;

let selectedFig = "";
function run(e) {
  const cell = e.target.closest(".cell");
  if (cell.classList.contains("kill")) {
    isWhite = !isWhite;
    boardState = killFigure(
      selectedFig,
      boardState,
      e.target.dataset.coords.split(","),
      clear,
      render,
      updateWhoGoes,
      cells,
      move
    );

    updateWhoGoes(isWhite, move);
    return;
  }
  if (cell.classList.contains("hightlight")) {
    isWhite = !isWhite;
    boardState = moveFigure(
      selectedFig,
      boardState,
      e.target.dataset.coords.split(","),
      clear,
      render,
      updateWhoGoes,
      cells,
      move
    );
    updateWhoGoes(isWhite, move);
    return;
  }

  cells.forEach((cell) => cell.classList.remove("hightlight"));
  cells.forEach((cell) => cell.classList.remove("kill"));
  const element = cell.children[0];
  if (!element) return;
  const coords = element.dataset.coords.split(",").map((el) => +el);
  const figure = [element.classList[0] == "white" ? 0 : 1, element.textContent];
  selectedFig = coords;
  if ((figure[0] === 1 && isWhite) || (figure[0] === 0 && !isWhite)) return;
  if (figure[1] === "♞") {
    const moves = calcKnightMoves(coords);
    const availableMoves = moves.filter((move) => {
      if (
        boardState[move[0]][move[1]] == " " ||
        boardState[move[0]][move[1]][0] !== figure[0]
      )
        return true;
    });
    drawMoves(availableMoves, boardState, cells);
  }
  if (figure[1] === "♙") {
    const moves = calcPawnMoves(coords, boardState, figure[0]);
    drawMoves(moves, boardState, cells);
  }
  if (figure[1] === "♛") {
    const moves = calcQueenMoves(coords, boardState, figure[0]);
    drawMoves(moves, boardState, cells);
  }
  if (figure[1] === "♜") {
    const moves = calcRookMoves(coords, boardState, figure[0]);
    drawMoves(moves, boardState, cells);
  }
  if (figure[1] === "♝") {
    const moves = calcBishopMoves(coords, boardState, figure[0]);
    drawMoves(moves, boardState, cells);
  }
  if (figure[1] === "♔") {
    const moves = calcKingMoves(coords, boardState, figure[0]);
    console.log(moves);
    const availableMoves = moves.filter((move) => {
      if (
        move[0] >= 0 &&
        move[0] <= 7 &&
        move[1] >= 0 &&
        move[1] <= 7 &&
        boardState?.[move[0]]?.[move[1]]?.[1] !== "♔"
      )
        return true;
    });
    drawMoves(availableMoves, boardState, cells);
  }
}
// TODO: write function that will return "true" if between kings are at least 2 units difference in coords
render(boardState, cells);
board.addEventListener("click", run);
updateWhoGoes(isWhite, move);
