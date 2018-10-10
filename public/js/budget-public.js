$(document).ready(function() {
  var $newMoneyInput = $("input.amount");
  var $newSourceInput = $("input.description");
  var $newContainer = $(".income-container");
  $(document).on("click", ".byeBudget", deleteIncome);
  $(document).on("click", ".earn", insertIncome);

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
    $.get("/api/budget", function(data) {
      income = data;
      //console.log(budget);
      initializeRows();
    });
  }

  function deleteIncome(event) {
    event.stopPropagation();
    var id = $(this).data("id");
    $.ajax({
      method: "DELETE",
      url: "/api/budget/" + id
    }).then(getIncome);
  }

  function createNewRow(income) {
    //console.log(budget);
    var $newInputRow = $(
      [
        "<li class='list-group-item budget-item' style='width:400px''font:20px'>",
        "<span>",
        "Amount: ",
        income.money, 
        " ",
        " ",
        " ",
        "Source: ",
        income.source,
        "</span>",
        "<input type='text' class='edit' style='display: none;'>",
        "<button class='delete byeBudget'>Delete</button>",
        "</li>"
      ].join("")
    );

    $newInputRow.find("button.delete").data("id", income.id);
    $newInputRow.find("input.edit").css("display", "none");
    $newInputRow.data("budget", income);
    return $newInputRow;
  }

  function insertIncome(event) {
    event.preventDefault();
    var income = {
      money: $newMoneyInput.val().trim(),
      source: $newSourceInput.val().trim()
      
    };

    $.post("/api/budget", income, getIncome);
    $newMoneyInput.val("");
    $newSourceInput.val("");
  }
  
});