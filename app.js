const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var cors = require("cors");
const NoteService = require("./services/NoteService");
const app = express();

app.use(cors());
app.use(express.json());

app.post("/node-api/user/add", async (req, res) => {
  var user = req.body.user;

  const salt = await bcrypt.genSalt(10);
  // hashed password
  user.password = await bcrypt.hash(user.password, salt);
  NoteService.createUser(user).then((bootResponse) => {
    res.json({ message: bootResponse.data });
  });
});
app.post("/node-api/user/login", async (req, res) => {
  var user = req.body;

  NoteService.findByUsername(user.username).then(async (bootResponse) => {
    const matchedUser = bootResponse.data;

    if (matchedUser.id === null) {
      res.json({ user: { id: 0 }, message: "invalid credentials" });
    } else {
      const validPassword = await bcrypt.compare(
        user.password,
        matchedUser.password
      );
      if (validPassword) {
        jwt.sign(
          { user },
          "secretkey",
          { expiresIn: "3000s" },
          (err, token) => {
            res.json({
              user: bootResponse.data,
              token,
            });
          }
        );
      } else {
        res.json({ user: { id: 0 }, message: "invalid credentials" });
      }
    }
  });
});
app.post("/node-api/note", (req, res) => {
  var newNote = req.body;
  NoteService.addNote(newNote).then((bootResponse) => {
    res.json(bootResponse.data);
  });
});
app.put("/node-api/note/:id", (req, res) => {
  var updatedNote = req.body;
  var id = req.params.id;

  NoteService.updateNote(id, updatedNote).then((bootResponse) => {
    res.json(bootResponse.data);
  });
});
app.post("/node-api/notes-by-user", (req, res) => {
  NoteService.findNotesByUser(req.body).then((bootResponse) => {
    res.json({ notesData: bootResponse.data });
  });
});
app.delete("/node-api/note/:id", (req, res) => {
  NoteService.deleteNoteById(req.params.id).then((bootResponse) => {
    res.json(bootResponse.data);
  });
});

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers["authorization"];
  // Check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    // Split at the space
    const bearer = bearerHeader.split(" ");
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}

app.listen(5000, () => console.log("NODE SERVER STARTED"));
