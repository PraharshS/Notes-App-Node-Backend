const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var cors = require("cors");
const NoteService = require("./services/NoteService");
const app = express();

app.use(cors());
app.use(express.json());
app.get("/node-api", (req, res) => {
  NoteService.getHello().then((bootResponse) => {
    console.log(bootResponse.data);
    res.json({ message: bootResponse.data });
  });
});
app.post("/node-api/user/add", async (req, res) => {
  var user = req.body.user;
  console.log("user by react", user);
  // const salt = await bcrypt.genSalt(10);
  // hashed password
  // user.password = await bcrypt.hash(user.password, salt);
  NoteService.createUser(user).then((bootResponse) => {
    console.log("user by boot", bootResponse.data);
    res.json({ message: bootResponse.data });
  });
});
app.post("/node-api/user/login", async (req, res) => {
  var user = req.body;
  console.log("login user by react", user);
  NoteService.findByUsername(user.username).then(async (bootResponse) => {
    const matchedUser = bootResponse.data;
    console.log("matchedUser", matchedUser);
    if (matchedUser.id === 0) {
      res.json({ message: "invalid credentials" });
    } else {
      // const validPassword = await bcrypt.compare(
      //   matchedUser.password,
      //   user.password
      // );
      const validPassword = matchedUser.password === user.password;
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
        res.json({ message: "invalid credentials2" });
      }
    }
  });
});
app.post("/node-api/note", (req, res) => {
  var newNote = req.body;
  NoteService.addNote(newNote).then((bootResponse) => {
    console.log("boot response", bootResponse.data);
    res.json(bootResponse.data);
  });
});
app.post("/node-api/notes-by-user", (req, res) => {
  console.log(req.body);
  NoteService.findNotesByUser(req.body).then((bootResponse) => {
    console.log(bootResponse.data);
    res.json({ notesData: bootResponse.data });
  });
});
app.delete("/node-api/note/:id", (req, res) => {
  NoteService.deleteNoteById(req.params.id).then((bootResponse) => {
    res.json(bootResponse.data);
  });
});

app.post("/api/login", (req, res) => {
  // Mock user
  const user = {
    id: 1,
    username: "brad",
    email: "brad@gmail.com",
  };

  jwt.sign({ user }, "secretkey", { expiresIn: "3000s" }, (err, token) => {
    res.json({
      token,
    });
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

app.listen(5000, () => console.log("Server started on port 5000"));
