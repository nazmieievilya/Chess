const axios = require("axios");
const express = require("express");
const { request, response } = require("express");
const fs = require("fs");
const path = require("path");
const stream = require("stream");

try {
  const site = "https://chess-6p0b.onrender.com/";
  // const site = "http://127.0.0.1:3000/";

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
  let sessions = [];
  const app = express();
  app.set("views", __dirname + "/static");
  app.set("view engine", "ejs"); // set the view engine to ejs
  app.use(express.static("public"));
  app.use(express.json());
  app.locals.axios = axios;
  const getBoard = (request, response) => {
    const id = request.params.id;

    const color = id[id.length - 1];

    if (color === "1" && id.length === 5) {
      const data = {
        isDark: true,
        sessId: id,
        site: site,
      };
      return response.render("index_page", data);
    }
    if (id.length === 4) {
      const session = sessions.find((el) => +el.id == id);

      if (session == undefined)
        return response.status(404).json({
          status: "not found",
        });
      return response.status(200).json({
        status: "success",
        data: { board: session.board, isWhite: session.isWhite },
      });
    }
  };
  const updateBoard = (request, response) => {
    const id = request.params.id;
    const color = id[id.length - 1];
    const session = sessions.find((el) => +el.id == id.slice(0, -1));
    session.board = request.body.board;
    session.isWhite = request.body.isWhite;
    (session.time = Date.now()),
      response.status(200).json({
        status: "success",
        data: "ok",
      });
  };
  const sesExp = (request, response) => {
    const data = {
      link: site,
    };
    return response.render("session_expired", data);
  };
  const sendLink = (request, response) => {
    const sessionId = `${Math.random()}`.slice(2, 6);
    sessions.push({
      id: sessionId,
      board: initialState,
      isWhite: true,
      time: Date.now(),
    });
    response.status(200).json({
      status: "succes",
      data: site + sessionId + "1",
    });
  };

  app.get("/", function (req, res) {
    const data = {
      isDark: false,
      site: site,
    };
    res.render("index_page", data);
  });
  app.get("/link", sendLink);
  app.get("/session_expired", sesExp);
  app.get("/:id", getBoard);
  app.post("/:id", updateBoard);
  app.get("/image", (req, res) => {
    const r = fs.createReadStream(__dirname + "/chess.png"); // or any other way to get a readable stream
    const ps = new stream.PassThrough(); // <---- this makes a trick with stream error handling
    stream.pipeline(
      r,
      ps, // <---- this makes a trick with stream error handling
      (err) => {
        if (err) {
          console.log(err); // No such file or any other kind of error
          return res.sendStatus(400);
        }
      }
    );
    ps.pipe(res); // <---- this makes a trick with stream error handling
  });

  const port = 3000;

  app.listen(port, () => {
    console.log(`App running on port ${port}`);
  });
  setInterval(() => {
    if (sessions.length === 0) return;
    sessions.forEach((sess) => {
      const timePass = (Date.now() - sess?.time) / 1000;
      if (timePass > 300) sessions = sessions.filter((s) => s.id !== sess.id);
    });
  }, 5000);

  function randomInRange(from, to) {
    var r = Math.random();
    return Math.floor(r * (to - from) + from);
  }
  setInterval(() => {
    axios
      .get(site)
      .then((res) => res)
      .catch((e) => console.log(e));
  }, 399999 + randomInRange(-500, 500));
} catch (e) {
  console.log(e);
}

// ONLY ON PRODUCTION
