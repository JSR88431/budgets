$(document).ready(function () {
  
    $("#submitUser").on("click", function (event) {
     
      event.preventDefault();
      
      var newUser = {
        email:$("#email").val().trim(),
        username: $("#username").val().trim(),
        password: $("#password").val().trim(),
      };
      //console.log(newUser);
    
        $.post("/api/user", newUser)
        .then(function(data){
          console.log(data)
        })
        redirect();
      });
    
      function redirect(){
        alert("New User Added");
        window.location.href = "/expenses";
      }
    });