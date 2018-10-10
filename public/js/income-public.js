$(document).ready(function() {
    var $newAmountInput = $("input.amount");
    var $newDescriptionInput = $("input.description");
    var $newContainer = $(".income-container");
    $(document).on("click", "button.delete", deleteIncome);
    $(document).on("enter", "#income-form", insertIncome);
  
    var income = [];
  
    getIncome();
  
    function initializeRows() {
      $newContainer.empty();
      var rowsToAdd = [];
      for (var i = 0; i < income.length; i++) {
        rowsToAdd.push(createNewRow(income[i]));
      }
      $newContainer.prepend(rowsToAdd);
    }
  
    function getIncome() {
      $.get("/api/expenses", function(data) {
        income = data;
        //console.log(expenses);
        initializeRows();
      });
    }
  
    function deleteIncome(event) {
      event.stopPropagation();
      var id = $(this).data("id");
      $.ajax({
        method: "DELETE",
        url: "/api/expenses/" + id
      }).then(getIncome);
    }
  
    function createNewRow(income) {
      //console.log(expenses);
      var $newInputRow = $(
        [
          "<li class='list-group-item income-item' style='width:400px''font:20px'>",
          "<span>",
          "Amount: ",
          income.amount, 
          " ", 
          " ",
          " ", 
          "Earned from: ",
          income.description,
          "</span>",
          "<input type='text' class='edit' style='display: none;'>",
          "<button class='delete btn btn-danger'>x</button>",
          "</li>"
        ].join("")
      );
  
      $newInputRow.find("button.delete").data("id", income.id);
      $newInputRow.find("input.edit").css("display", "none");
      $newInputRow.data("income", income);
      return $newInputRow;
    }
  
    function insertIncome(event) {
      event.preventDefault();
      var income = {
        amount: $newAmountInput.val().trim(),
        description: $newDescriptionInput.val().trim()
        
      };
  
      $.post("/api/expenses", income, getIncome);
      $newAmountInput.val("");
      $newDescriptionInput.val("");
    }
    
  });