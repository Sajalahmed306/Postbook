// const fetchAllPosts = async() => {
//     let data;
//     try{
//         const res =await fetch("http://localhost:5000/getAllPosts");
//         data = await res.json();
//         // console.log(data);
//         showAllPosts(data)
//     }
//     catch(err){
//         console.log("error fetching data from server",)
//     }
    
// };
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

const showAllPosts = (allPosts) =>{
    console.log("inside showallposts:", allPosts);
    const postContainer = document.getElementById("post-container");
    postContainer.innerHTML="";
    
    allPosts.forEach( async (post) =>{
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
                        <span>${post.postedTime
                        }</span>
                        <span>hours ago</span>
                    </div>

                </div>
                
            </div>
            <div class="post-text">
                <p class="post-text-content">
                ${post.postText}</p>

            </div>
            <div class="post-image">
                <img src=${post.postImageUrl}/>

            </div>
        
        `;
        postContainer.appendChild(postDiv);




        // comment under a post

         console.log( post.postId);
        let postComments =
        await fetchAllCommentsOfAPost(post.postId);
        console.log("postComments:", postComments);

        postComments.forEach(Comment =>{
            const commentsHolderDiv =document.createElement('div');
            commentsHolderDiv.classList.add('comment-holder');
            commentsHolderDiv.innerHTML =`
            <div class="comment">
                    <div class="comment-user-image">
                        <img src= ${Comment.commentedUserImage}/>
                    </div>
                    <div class="comment-text-container">
                        <h4 >${Comment.commentedUserName}</h4>
                        <p class="comment-text">${Comment.commentText}</p>
                    </div>
                </div>
                `;

             postDiv.appendChild(commentsHolderDiv);
        });

    });
};

// const fetchAllCommentsOfAPost = async (postId) =>{
//     let commentsOfPost=[];
//     try{
//         const res = await fetch(`http://localhost:5000/getAllComments/${postId}`);
//         commentsOfPost = await res.json();

//     }catch(err){
//         console.log("error fetching comments from the server:", err);

//     }
//     finally{
//         return commentsOfPost;
//     }

 
// };
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


fetchAllPosts()