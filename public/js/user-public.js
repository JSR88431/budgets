console.log("working");
$(document).ready(function () {
  
    $("#submitUser").on("click", function (event) {
      console.log("clocked");
     
      event.preventDefault();
      
      var newUser = {
        email:$("#email").val().trim(),
        username: $("#username").val().trim(),
        password: $("#password").val().trim(),
      };
      console.log(newUser);
    
        $.post("/signup", newUser)
        .then(function(data){
          console.log(data);
        })
        
      });
      
      function redirect(data){
        console.log(data)
        alert("New User Added");
        window.location.href = "/expenses";
      }
    });