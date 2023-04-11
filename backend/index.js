const express = require("express");
const { request, response } = require("express");
const fs = require("fs");

try {
  // const site = "https://chess-1uq7.onrender.com/"; PRODUCTION
  const site = "http://127.0.0.1:3000/";
  let initialState = [
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
      [0, "♙"],
      [0, "♙"],
      [0, "♙"],
      [0, "♙"],
      [0, "♙"],
      [0, "♙"],
      [0, "♙"],
      [0, "♙"],
    ],
    [" ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " "],
    [
      [1, "♙"],
      [1, "♙"],
      [1, "♙"],
      [1, "♙"],
      [1, "♙"],
      [1, "♙"],
      [1, "♙"],
      [1, "♙"],
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
  const sessions = [];
  const app = express();
  app.set("views", __dirname + "/static");
  app.set("view engine", "ejs"); // set the view engine to ejs
  app.use(express.static("public"));
  app.use(express.json());

  const getBoard = (request, response) => {
    const id = request.params.id;
    console.log(id);
    const color = id[id.length - 1];

    if (color === "1" && id.length === 5) {
      console.log(id);
      const data = {
        isDark: true,
        sessId: id,
      };
      return response.render("index_page", data);
    }
    if (id.length === 4) {
      const session = sessions.find((el) => +el.id == id);
      return response.status(200).json({
        status: "success",
        data: { board: session.board, isWhite: session.isWhite },
      });
    }
  };
  const updateBoard = (request, response) => {
    console.log(request.body);
    const id = request.params.id;
    const color = id[id.length - 1];
    const session = sessions.find((el) => +el.id == id.slice(0, -1));
    session.board = request.body.board;
    session.isWhite = request.body.isWhite;
    response.status(200).json({
      status: "success",
      data: "ok",
    });
  };

  const sendLink = (request, response) => {
    const sessionId = `${Math.random()}`.slice(2, 6);
    sessions.push({
      id: sessionId,
      board: initialState,
      isWhite: true,
    });
    response.status(200).json({
      status: "succes",
      data: site + sessionId + "1",
    });
  };

  app.get("/", function (req, res) {
    const data = {
      isDark: false,
    };
    res.render("index_page", data);
  });
  app.get("/link", sendLink);
  app.get("/:id", getBoard);
  app.post("/:id", updateBoard);

  const port = 3000;

  app.listen(port, () => {
    console.log(`App running on port ${port}`);
  });
} catch (e) {
  console.log(e);
}
// ONLY ON PRODUCTION
// try {
//   function randomInRange(from, to) {
//     var r = Math.random();
//     return Math.floor(r * (to - from) + from);
//   }
//   setInterval(() => {
//     axios
//       .get(site)
//       .then((res) => res)
//       .catch((e) => console.log(e));
//   }, 399999 + randomInRange(-500, 500));
// } catch (e) {
//   console.log(e);
// }
