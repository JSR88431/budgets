$(document).ready(function() {
    var $newQuantityInput = $("input.amount");
    var $newSourceInput = $("input.description");
    var $newContainer = $(".budget-container");
    $(document).on("click", "button.delete", deleteBudget);
    $(document).on("submit", "#budget-form", insertExpenses);
  
    var budget = [];
  
    getBudget();
  
    function initializeRows() {
      $newContainer.empty();
      var rowsToAdd = [];
      for (var i = 0; i < budget.length; i++) {
        rowsToAdd.push(createNewRow(budget[i]));
      }
      $newContainer.prepend(rowsToAdd);
    }
  
    function getBudget() {
      $.get("/api/budget", function(data) {
        budget = data;
        //console.log(Budget);
        initializeRows();
      });
    }
  
    function deleteBudget(event) {
      event.stopPropagation();
      var id = $(this).data("id");
      $.ajax({
        method: "DELETE",
        url: "/api/budget/" + id
      }).then(getBudget);
    }
  
    function createNewRow(budget) {
      //console.log(Budget);
      var $newInputRow = $(
        [
          "<li class='list-group-item Budget-item' style='width:400px''font:20px'>",
          "<span>",
          budget.quantity, 
          " ",
          budget.source,
          "</span>",
          "<input type='text' class='edit' style='display: none;'>",
          "<button class='delete btn btn-danger'>x</button>",
          "</li>"
        ].join("")
      );
  
      $newInputRow.find("button.delete").data("id", budget.id);
      $newInputRow.find("input.edit").css("display", "none");
      $newInputRow.data("Budget", budget);
      return $newInputRow;
    }
  
    function insertBudget(event) {
      event.preventDefault();
      var budget = {
        quantity: $newQuantityInput.val().trim(),
        source: $newSourceInput.val().trim()
        
      };
  
      $.post("/api/Budget", budget, getBudget);
      $newQuantityInput.val("");
      $newSourceInput.val("");
    }
    
  });