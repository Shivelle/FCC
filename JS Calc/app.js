
$( document ).ready(function() {
	// variables
    var result = "0"; 
    var prevEntry = "0"; 
    var currEntry = "0"; 
    var operation = null;
    var btnPressed = "";

    // update input field
    updateInput(result);
    // event listeners
    	// click
   	    $(".btn").on("click", function (e) {
        	window.btnPressed = e.key || String.fromCharCode(e.keyCode);
        	console.log(window.btnPressed);
        	return window.btnPressed;
		})
    	// keypress
   	    $("#calculator").on("keypress", function () {
    	    window.btnPressed = $(this).html();
    	    console.log(window.btnPressed);
    	    return window.btnPressed;
		});

		// run calculation
	    if (btnPressed === "C") {
	    	result = 0; 
	    	currEntry = "0";
	    } else if (btnPressed === ".") {
	    	currEntry += ".";
	    } else if (isNum(btnPressed)) {
	    	if(currEntry === "0") currEntry = btnPressed;
	    	else currEntry = currEntry + btnPressed;
	    } else if (isOp(btnPressed)) {
	    	prevEntry = parseFloat(currEntry);
	    	operation = btnPressed;
	    	currEntry = ''; 
	    } else if (btnPressed === "=" || "Enter") {
	    	currEntry = operate(prevEntry, currEntry, operation); 
	    	operation = null; 
	    } else {
	    	console.log("error!");
	    }
	    updateInput(currEntry);
});


// functions
updateInput = function(inputValue){
	var inputValue = inputValue.toString();
	$('#input').html(inputValue.substring(0, 10));
};

isNum = function(value) {
	return !isNaN(value);
};

isOp = function(value) {
	return value === '/' || value === '*' || value === '+' || value === '-';
};

operate = function(a, b, operation) {
	a = parseFloat(a);
	b = parseFloat(b);
	console.log(a, b, operation);
	if (operation === '+') return a + b;
	if (operation === '-') return a - b;
	if (operation === '*') return a * b;
	if (operation === '/') return a / b;
};

