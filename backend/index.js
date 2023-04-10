const express = require("express");
const { request, response } = require("express");
const fs = require("fs");

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
      data: session.board,
    });
  }
};
const updateBoard = (request, response) => {
  const id = request.params.id;
  const color = id[id.length - 1];
  const session = sessions.find((el) => +el.id == id.slice(0, -1));
  session.board = request.body;

  response.status(200).json({
    status: "success",
    data: "ok",
  });
};
const sendDark = (request, response) => {};
app.get("/", function (req, res) {
  initialState = def;
  const data = {
    isDark: false,
  };
  res.render("index_page", data);
});
app.get("/link", function (req, res) {
  const sessionId = `${Math.random()}`.slice(2, 6);
  sessions.push({
    id: sessionId,
    board: initialState,
  });
  res.status(200).json({
    status: "succes",
    data: "http://127.0.0.1:3000/" + sessionId + "1",
  });
});
app.get("/:id", getBoard);
app.get("/:id/:new", sendDark);
app.post("/:id", updateBoard);
app.delete("/api", (request, response) => {
  initialState = [
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
  response.status(200).json({
    status: "success",
    data: "ok",
  });
});

const port = 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

let def = [
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
