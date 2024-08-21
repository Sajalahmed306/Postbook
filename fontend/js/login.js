const handleLogin =() =>{
    const userIdInput = document.getElementById ('login-user-id');
    const passwordInput = document.getElementById('login-password');
    
    const userId = userIdInput.value;
    const password = passwordInput.value;
    const user = {
        userId: userId,
        password: password,

    };
        fetchUserInfo(user);

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
    console.log( "user info from server:", data);
   }
};
