$(document).ready(function() {
    var result = $("#input"); 
    var prevEntry = ""; 
    var currEntry = ""; 
    var operation = null;
    var key = "";

    // todo: chained calculations
    // Entf = C
    // Berechnung durch currEntry=key beim Op fehlerhaft. 
  	// [object] im input-Feld bei Pageload


    // update input field
    updateInput(result);
    // event listeners
    	// click
   	    $(".btn").on("click", function () {
        	// key = $(this).attr('data-key'); // data-key method with html data- declaration
        	key = $(this).html(); // html method 
        	inputMath();
		})
    	// keypress
   	    $(document).on("keypress", function (e) {
		    key = e.key || String.fromCharCode(e.keyCode);
    	    inputMath();
		});


// functions
	function inputMath () {
		// run calculation
	    if (key === "C") {
	    	result = 0; 
	    	currEntry = "0";
	    } else if (key === ".") {
	    	currEntry += ".";
	    } else if (isNum(key)) {
	    	if(currEntry === "0") currEntry = key;
	    	else currEntry = currEntry + key;
	    } else if (isOp(key)) {
	    	prevEntry = parseFloat(currEntry);
	    	operation = key;
	    	currEntry = ''; // war vorher currEntry = key; Berechnungen fehlerhaft, aber Anzeige des Op vorhanden. 
	    } else if (key === "=" || "Enter") {
	    	currEntry = operate(prevEntry, currEntry, operation); 
	    	operation = null; 
	    } else {
	    	console.log("error!");
	    }
	    updateInput(currEntry);
	};
		
	function updateInput (inputValue){
		var inputValue = inputValue.toString();
		$('#input').html(inputValue.substring(0, 10));
	};

	function isNum (value) {
		return !isNaN(value);
	};

	function isOp (value) {
		return value === '/' || value === '*' || value === '+' || value === '-';
	};

	function operate (a, b, operation) {
		a = parseFloat(a);
		b = parseFloat(b);
		console.log(a, operation, b);
		if (operation === '+') return a + b;
		if (operation === '-') return a - b;
		if (operation === '*') return a * b;
		if (operation === '/') return a / b;
	};

	}); /* document rdy */



