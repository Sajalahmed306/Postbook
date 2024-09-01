const handleLogin = async () =>{
    const userIdInput = document.getElementById ('login-user-id');
    const passwordInput = document.getElementById('login-password');
    
    const userId = userIdInput.value;
    const password = passwordInput.value;
    const user = {
        userId: userId,
        password: password,

    };
     const userInfo = await fetchUserInfo(user);
     console.log (userInfo);
     const errorElement =document.getElementById("user-login-error");
    
     //  user data did not match 
     if(userInfo.length === 0){
        errorElement.classList.remove("hidden");
   }

   else {
    errorElement.classList.add("hidden");


    // save user information before jumping to the another page 
    localStorage.setItem("loggedInUser", JSON.stringify(userInfo[0]))
    
    // jump into the new page 
    window.location.href = "post.html";
}

};

const fetchUserInfo = async (user) => {
    let data;
   try{
    const res = await fetch("http://localhost:5000/getUserInfo",{
        method: "POST",
        headers:{
            "content-type":"application/json",
        },
        body: JSON.stringify(user),

    });
    data = await res.json();
   }
   catch (err){
    console.log("ERROR connecting to the server:", err);
   }
   finally{
    return data;
   }


};
