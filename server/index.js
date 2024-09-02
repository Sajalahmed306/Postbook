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
  const sqlForAllPosts= `SELECT users.userName AS postedUserName, users.userImage AS postedUserImage, posta.postedTime, posta.postText, posta.postImageUrl, posta.postId FROM posta INNER JOIN users ON posta.postedUserId = users.userId ORDER BY posta.postedTime DESC`;
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

// getting comments of  SINGLE post 
app.get('/getAllComments/:postId', (req, res) => {
  let id= req.params.postId;
  console.log (id);

  let sqlForAllComments =`
  SELECT users.userName AS commentedUserName, users.userImage AS commentedUserImage, comments.commentId, comments.commentOfPostId,
comments.commentText, comments.commentedTime
FROM comments
INNER JOIN users ON comments.commentedUserId = users.userId WHERE comments.commentOfPostId = ${id}`;

  let query = db.query(sqlForAllComments, (err, result) =>{
    if(err){
      console.log("Error fetching comments from database:", err);
      // throw err;
    }else{
      res.send(result);
    }
  });
});

// adding new comments to a post
app.post("/postComment", (req, res) => {
  const { commentOfPostId, commentedUserId, commentText, commentTime } = req.body;

  let sqlForAddingNewComments = "INSERT INTO comments (commentId, commentOfPostId, commentedUserId, commentText, commentTime) VALUES (NULL, ?, ?, ?, ?);";

  let query = db.query(
    sqlForAddingNewComments,
    [commentOfPostId, commentedUserId, commentText, commentTime],
    (err, result) => {
      if (err) {
        console.log("Error adding comment to the database: ", err);
      } else {
        res.send(result);
      }
    }
  );
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
