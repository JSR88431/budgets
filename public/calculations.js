$(document).ready(function () {
    var income = 0;//variable to hold income
    var expense= 0; //variable to hold expense
    $(".txtA,.txt").blur(function () { //attach event to multiple elements
        $(this).each(function () {//loop through each of them
            if (!isNaN(this.value) && this.value.length != 0) {
                if($(this).hasClass('txt')) //if it is expense
                    expense += parseFloat(this.value); //add it to expense
                else
                    income+=parseFloat(this.value); //add it to income
            }
        });
        if($(this).hasClass('txt'))
            $("#sum").html(expense.toFixed(2)); //display based on income or expense
        else
            $("#sumA").html(income.toFixed(2));
        calculateSubstraction();//this remains same
        
        function calculateSubstraction() {
            var subs=parseFloat($("#sumA").text()) - parseFloat($("#sum").text())
            $("#su").html(subs);
        
        }
    });
})