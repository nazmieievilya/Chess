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
export function calcRookMoves(rook, board, color) {
  return calcHor(rook, board, color);
}
export function calcBishopMoves(bishop, board, color) {
  return calcDiag(bishop, board, color);
}
export function calcQueenMoves(queen, board, color) {
  return [...calcDiag(queen, board, color), ...calcHor(queen, board, color)];
}

export function calcPawnMoves(pawn, arr, color) {
  if (arr[pawn[0]][pawn[1]][0] === 1) {
    if (pawn[0] == 6) {
      const allMoves = [];
      if (arr[pawn[0] - 1][pawn[1]] === " ")
        allMoves.push([pawn[0] - 1, pawn[1]]);
      if (
        arr[pawn[0] - 2][pawn[1]] === " " &&
        arr[pawn[0] - 1][pawn[1]] === " "
      )
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
    if (arr[pawn[0] + 2][pawn[1]] === " " && arr[pawn[0] + 1][pawn[1]] === " ")
      allMoves.push([pawn[0] + 2, pawn[1]]);
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

export function calcKnightMoves(knight, horse) {
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
