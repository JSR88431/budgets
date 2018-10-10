$(document).ready(function() {
    var $newAmountInput = $("input.amount");
    var $newDescriptionInput = $("input.description");
    var $newContainer = $(".expenses-container");
    $(document).on("click", ".byeExpense", deleteExpenses);
    $(document).on("submit", "#expenses-form", insertExpenses);
  
    var expenses = [];
  
    getExpenses();
  
    function initializeRows() {
      $newContainer.empty();
      var rowsToAdd = [];
      for (var i = 0; i < expenses.length; i++) {
        rowsToAdd.push(createNewRow(expenses[i]));
      }
      $newContainer.prepend(rowsToAdd);
    }
  
    function getExpenses() {
      $.get("/api/expenses", function(data) {
        expenses = data;
        //console.log(expenses);
        initializeRows();
      });
    }
  
    function deleteExpenses(event) {
      event.stopPropagation();
      var id = $(this).data("id");
      $.ajax({
        method: "DELETE",
        url: "/api/expenses/" + id
      }).then(getExpenses);
    }
  
    function createNewRow(expenses) {
      //console.log(expenses);
      var $newInputRow = $(
        [
          "<li class='list-group-item expenses-item' style='width:400px''font:20px'>",
          "<span>",
          "Amount: ",
          expenses.amount, 
          " ",
          " ",
          " ",
          "Spent On: ",
          expenses.description,
          "</span>",
<<<<<<< HEAD
          "<input type='text' class='edit' style='display: none;' /n>",
          "<button class='delete'>Delete</button>",
=======
          "<input type='text' class='edit' style='display: none;'>",
          "<button class='delete byeExpense'>Delete</button>",
>>>>>>> idk
          "</li>"
        ].join("")
      );
  
      $newInputRow.find("button.delete").data("id", expenses.id);
      $newInputRow.find("input.edit").css("display", "none");
      $newInputRow.data("expenses", expenses);
      return $newInputRow;
    }
  
    function insertExpenses(event) {
      event.preventDefault();
      var expenses = {
        amount: $newAmountInput.val().trim(),
        description: $newDescriptionInput.val().trim()
        
      };
  
      $.post("/api/expenses", expenses, getExpenses);
      $newAmountInput.val("");
      $newDescriptionInput.val("");
    }
    
  });