// // const fetchAllPosts = async() => {
// //     let data;
// //     try{
// //         const res =await fetch("http://localhost:5000/getAllPosts");
// //         data = await res.json();
// //         // console.log(data);
// //         showAllPosts(data)
// //     }
// //     catch(err){
// //         console.log("error fetching data from server",)
// //     }
    
// // };
// const fetchAllPosts = async () => {
//     let data;
//     try {
//         const res = await fetch("http://localhost:5000/getAllPosts");
//         data = await res.json();
//         console.log("Posts Data: ", data); // Debugging statement
//         showAllPosts(data);
//     } catch (err) {
//         console.log("Error fetching data from server", err);
//     };
// };

// const showAllPosts = (allPosts) =>{
//     console.log("inside showallposts:", allPosts);
//     const postContainer = document.getElementById("post-container");
//     postContainer.innerHTML="";
    
//     allPosts.forEach( async (post) =>{
//         const postDiv = document.createElement("div");
//         postDiv.classList.add("post");
  

//         postDiv.innerHTML = `
//                 <div class="post-header">
//                 <div class="post-user-image">
//                     <img  src=${post.postedUserImage}/>

//                 </div>
//                 <div class="post-username-time">
//                     <p class="post-username">${post.postedUserName}</p>
//                     <div class="post-time">
//                         <span>${post.postedTime
//                         }</span>
//                         <span>hours ago</span>
//                     </div>

//                 </div>
                
//             </div>
//             <div class="post-text">
//                 <p class="post-text-content">
//                 ${post.postText}</p>

//             </div>
//             <div class="post-image">
//                 <img src=${post.postImageUrl}/>

//             </div>
        
//         `;
//         postContainer.appendChild(postDiv);




//         // comment under a post

//          console.log( post.postId);
//         let postComments =
//         await fetchAllCommentsOfAPost(post.postId);
//         console.log("postComments:", postComments);

//         postComments.forEach(Comment =>{
//             const commentsHolderDiv =document.createElement('div');
//             commentsHolderDiv.classList.add('comment-holder');
//             commentsHolderDiv.innerHTML =`
//             <div class="comment">
//                     <div class="comment-user-image">
//                         <img src= ${Comment.commentedUserImage}/>
//                     </div>
//                     <div class="comment-text-container">
//                         <h4 >${Comment.commentedUserName}</h4>
//                         <p class="comment-text">${Comment.commentText}</p>
//                     </div>
//                 </div>
//                 `;

//              postDiv.appendChild(commentsHolderDiv);
//         });



//         // adding a new comment to the post
//         const addNewCommentDiv = document.createElement('div');
//         addNewCommentDiv.classList.add("post-comment-holder");

//         addNewCommentDiv.innerHTML=`
//         <div class="post-comment-input-field-holder">
//                     <input type="text" placeholder="Post your comment" class="postComment-input-field" id="postComment-input-for-postId-${post.postId}">

//                 </div>
//                 <div class="comment-button-holder">
//                     <button onClick=handlePostComment(${post.postId}) id="comment-btn" class="postComment-btn">comment</button>

//                 </div>

        
        
//         `;

//         postDiv.appendChild(addNewCommentDiv);
        
//     });
// };
//  const handlePostComment = (postId) =>{

//     let user = localStorage.getItem('loggedInUser');
//     if( user){
//         user = JSON.parse(user);
//     }

//     // console.log(" adding comment to on: ", postId)
//     // collectig logged id in User 
//    const commentedUserId = user.userId; 

// //    getting comment text from inout
//     const commentTextElement = document.getElementById(`postComment-input-for-postId-${postId}`);
//     const commentText = commentTextElement.value;
    
    
//     // current time of the comment 
//     let now = new Date();
//     now.setMinutes(now.getMinutes() - now.getTimezoneOffset())
//     let timeOfComment = now.toDateString();
//     const commentObject = {
//         commentsOfPost : postId,
//         commentedUserId : commentedUserId,
//         commentText : commentText,
//         commentTime : timeOfComment, 
//     }
// };
// try {
//     const res = await fetch("http://localhost:5000/postComment", {
//       method: "POST",
//       headers: {
//         "content-type": "application/json",
//       },
//       body: JSON.stringify(commentObject),
//     });
  
//     const data = await res.json();
//   } catch (err) {
//     console.log("Error while sending data to the server: ", err);
//   }
// const fetchAllCommentsOfAPost = async (postId) => {
//     let commentsOfPost = [];
//     try {
//         const res = await fetch(`http://localhost:5000/getAllComments/${postId}`);
//         if (!res.ok) {
//             throw new Error(`HTTP error! status: ${res.status}`);
//         }
//         commentsOfPost = await res.json();
//     } catch (err) {
//         console.log("Error fetching comments from the server:", err);
//     } finally {
//         return commentsOfPost;
//     }
// };


// fetchAllPosts()

const showLoggedUsername = () => {
    const userNameElement = document.getElementById("logged-username");

    // find username from local storage
    let user = localStorage.getItem("loggedInUser");
    if(user){
        user = JSON.parse(user);
    }

    // show username in the webpage
    userNameElement.innerText=user.userName;
};

const checkLoggedInUser =()=>{
    let user = localStorage.getItem('loggedInUser');
    if(user){
        user = JSON. parse(user);

    }else{
        window.location.href="/index.html";
    }
}

const logOut =() =>{ 
    // clearing the localStorage
    localStorage.clear();
    checkLoggedInUser();
  
};


const fetchAllPosts = async () => {
    let data;
    try {
        const res = await fetch("http://localhost:5000/getAllPosts");
        data = await res.json();
        console.log("Posts Data: ", data); // Debugging statement
        showAllPosts(data);
    } catch (err) {
        console.log("Error fetching data from server", err);
    };
};

const handlePostComment = async (postId) => {
    let user = localStorage.getItem('loggedInUser');
    if (user) {
        user = JSON.parse(user);
    }

    const commentedUserId = user.userId;
    const commentTextElement = document.getElementById(`postComment-input-for-postId-${postId}`);
    const commentText = commentTextElement.value;

    let now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    let timeOfComment = now.toDateString();

    const commentObject = {
        commentsOfPost: postId,
        commentedUserId: commentedUserId,
        commentText: commentText,
        commentTime: timeOfComment,
    };

    try {
        const res = await fetch("http://localhost:5000/postComment", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(commentObject),
        });

        const data = await res.json();
        console.log('Comment posted successfully:', data);

        // Optionally, refresh comments for this post
        fetchAllPosts(); // Refresh the posts and comments after posting a comment
    } catch (err) {
        console.log("Error while sending data to the server: ", err);
    }
};

const showAllPosts = async (allPosts) => {
    console.log("inside showallposts:", allPosts);
    const postContainer = document.getElementById("post-container");
    postContainer.innerHTML = "";

    for (const post of allPosts) { // Use for...of loop here
        const postDiv = document.createElement("div");
        postDiv.classList.add("post");

        postDiv.innerHTML = `
                <div class="post-header">
                <div class="post-user-image">
                    <img  src=${post.postedUserImage}/>
                </div>
                <div class="post-username-time">
                    <p class="post-username">${post.postedUserName}</p>
                    <div class="post-time">
                        <span>${post.postedTime}</span>
                        <span>hours ago</span>
                    </div>
                </div>
            </div>
            <div class="post-text">
                <p class="post-text-content">${post.postText}</p>
            </div>
            <div class="post-image">
                <img src=${post.postImageUrl}/>
            </div>
        `;

        postContainer.appendChild(postDiv);

        // Fetch comments under a post
        console.log(post.postId);
        let postComments = await fetchAllCommentsOfAPost(post.postId); // Now await works here
        console.log("postComments:", postComments);

        postComments.forEach(Comment => {
            const commentsHolderDiv = document.createElement('div');
            commentsHolderDiv.classList.add('comment-holder');
            commentsHolderDiv.innerHTML = `
            <div class="comment">
                <div class="comment-user-image">
                    <img src= ${Comment.commentedUserImage}/>
                </div>
                <div class="comment-text-container">
                    <h4>${Comment.commentedUserName}</h4>
                    <p class="comment-text">${Comment.commentText}</p>
                </div>
            </div>
            `;

            postDiv.appendChild(commentsHolderDiv);
        });

        // Adding a new comment to the post
        const addNewCommentDiv = document.createElement('div');
        addNewCommentDiv.classList.add("post-comment-holder");

        addNewCommentDiv.innerHTML = `
        <div class="post-comment-input-field-holder">
            <input type="text" placeholder="Post your comment" class="postComment-input-field" id="postComment-input-for-postId-${post.postId}">
        </div>
        <div class="comment-button-holder">
            <button onClick= "handlePostComment(${post.postId})" id="comment-btn" class="postComment-btn">comment</button>
        </div>
        `;

        postDiv.appendChild(addNewCommentDiv);
    }
};

const fetchAllCommentsOfAPost = async (postId) => {
    let commentsOfPost = [];
    try {
        const res = await fetch(`http://localhost:5000/getAllComments/${postId}`);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        commentsOfPost = await res.json();
    } catch (err) {
        console.log("Error fetching comments from the server:", err);
    } finally {
        return commentsOfPost;
    }
};

fetchAllPosts();
showLoggedUsername();
checkLoggedInUser();
