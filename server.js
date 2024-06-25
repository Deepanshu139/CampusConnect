const control = require("./controllers/control");
const express = require("express");
const app = express();

// adding middlewares
app.use(express.json());
app.use(express.urlencoded());
const cors = require("cors");
app.use(cors()); // for frontend-backend connectivity
app.use("/images" , express.static('images')); 

require("dotenv").config();
const cookieParser = require("cookie-parser");
const session = require("express-session");
app.use(cookieParser());
app.use(
  session({
    secret: "this is my secret",
    cookie: {
      maxAge: 60 * 60 * 1000,
    },
    resave: true,
    saveUninitialized: false,
  })
);

app.set("view engine", "hbs");
app.set("views", "./views");

// controllers
const {
  showAllStudents,
  showStudentByRoll,
  addStudent,
  updateStudent,
  deleteByRoll,
  login,
  signup,
  verifyOTP
} = require("./controllers/control");

// middlewares
function isLoggedIn(req, res, next) {
  if (req.session.loggedIn) {
    next();
  } else {
    console.log(req.session.loggedIn)
   
    res.redirect("/");
  }
}

app.get("/", (req, res) => res.render("Home"));
// login

app.get("/login", (req, res) => res.render("loginPage"));
app.post("/login", login);
app.post("/verify-otp", verifyOTP);

// signup
app.get("/signup", (req, res) => res.render("signupPage"));
app.post("/signup", signup);

// getting all students
app.get("/allStudents", (req, res) => res.render("allStudents"));
app.get("/students", showAllStudents);


// getting student with given rollno
app.get("/search", (req, res) => res.render("search"));
app.get("/students/:rollno", showStudentByRoll);


// adding new student
// adding new student
app.post("/addStudent", (req, res) => {
  const { name, rollno, email, extraField } = req.body;
  control.addStudent(req, res, { name, rollno, email, extraField }); // Pass extraField data to the controller function
});


// update student
app.put("/update/:rollno", updateStudent);

// delete Student
app.delete("/delete/:rollno", deleteByRoll);

// protected routes
app.get("/protected", isLoggedIn, (req, res) => {
  res.send(`Welcome ${req.session.loggedInUser.companyName}`);
});

app.get("/index", isLoggedIn, (req, res) => {
  let user = req.session.loggedInUser;
  res.render("index", { user });
});

app.get("/addStudentPage", (req, res) => res.render("addStudentPage"));
app.get("/deleteStudentPage", (req, res) => res.render("deleteStudentPage"));
app.get("/updateStudentPage", (req, res) => res.render("updateStudentPage"));

// database connection
require("./database/database").connect();

app.listen(process.env.PORT, () => {
  console.log(`server listening at ${process.env.PORT} `);
});
