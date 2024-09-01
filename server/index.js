const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const port = 5000;

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Making connection with MySQL
let db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "data 1" ,// Ensure this is the correct name without spaces
});

db.connect((err) => {
  if (err) {
    console.error("Something went wrong while connecting to the database:", err.message);
    return;
  }
  console.log("MySQL is connected..");
});


// getting user data from server
app.post('/getUserInfo', (req, res) =>{
 const {userId, password} = req.body; 

  const getUserInfosql = `SELECT userId, userName, userImage FROM users WHERE users.userId = ? AND users.userPassword = ?
`
  let query = db.query(getUserInfosql, [userId, password], (err, result) =>{
   if (err){
    console.log("Error getting user info from server:",err);
    throw err;
   }
   else{
    res.send(result);
   }

  } );
});

app.get('/getAllPosts', (req, res)=>{
  const sqlForAllPosts= `SELECT users.userName AS postedUserName, users.userImage AS postedUserImage, posta.postedTime, posta.postText, posta.postImageUrl FROM posta INNER JOIN users ON posta.postedUserId = users.userId ORDER BY posta.postedTime DESC`;
  let  query = db.query(sqlForAllPosts, (err, result) =>{
    if(err){
      console.log("error loading all post from database", err);
    throw err;
    }
    
    else{
      console.log(result);
      res.send(result);
    }
  })
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
