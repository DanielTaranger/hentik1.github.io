var body = document.getElementById("body");
var frame = document.getElementById("frame");
var clearAll = document.getElementById("clearAll");
var clear = document.getElementById("clear");
var back = document.getElementById("back");
var div = document.getElementsByTagName("div");
var input1 = document.getElementById("input1");
var input2 = document.getElementById("input2");
var d0 = document.getElementById("d0");
var d1 = document.getElementById("d1");
var d2 = document.getElementById("d2");
var d3 = document.getElementById("d3");
var d4 = document.getElementById("d4");
var d5 = document.getElementById("d5");
var d6 = document.getElementById("d6");
var d7 = document.getElementById("d7");
var d8 = document.getElementById("d8");
var d9 = document.getElementById("d9");
var multi = document.getElementById("multi");
var plus = document.getElementById("plus");
var minus = document.getElementById("minus");
var sum = document.getElementById("sum");
var divide = document.getElementById("divide");
var sqrt = document.getElementById("sqrt");
var comma = document.getElementById("comma");
var reset = document.getElementById("reset");
var scriptManager = document.getElementById("scriptManager");
var recordStart = document.getElementById("recordStart");
var recordStartSymbol= document.getElementById("recordStartSymbol");
var script1 = document.getElementById("script1");
var scriptStart = document.getElementById("scriptStart");
var alertBox = document.getElementById("alertBox");
var middle = document.getElementById("middle");
var right = document.getElementById("right");
var showHideUpgrades = document.getElementById("showHideUpgrades");
var showHideScriptManager = document.getElementById("showHideScriptManager");
var recordSvg = document.getElementById("recordSvg");

const components = [d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, plus, minus, multi, divide, sqrt, comma, sum, clearAll, back];
const operators = "+-*/";
const numbers = "0123456789";
var maxInputLength = localStorage.getItem("maxInputLength");
var maxAmountNumbers = localStorage.getItem("maxAmountNumbers");

function displayOnLoad() {
    let total = localStorage.getItem("Total");
    
    if (total != null) {
        input2.innerHTML = total;
    }
    else {
        input2.innerHTML = 0;
        localStorage.setItem("Total",0);
    }
}
displayOnLoad();

function hasOperator(e) {
    for (let i = 0; i < operators.length; i++) {
        if (e.includes(operators[i]) && e.length < 20) {
            return true;
        }

    }
    return false;
}

function backDel() {
    // if last char in input1 is a operator
    if(operators.includes(input1.innerHTML.charAt(input1.innerHTML.length-1))&&
    input1.innerHTML != "") {
        maxInputLength += 1;
    }
    
    else if (input1.innerHTML != "") {
        maxInputLength += 1;
        maxAmountNumbers += 1;
    }

    input1.innerHTML = input1.innerHTML.slice(0, -1);
}

function sumF() {

    // Evaluating string using js math library
    total = math.evaluate(input1.innerHTML) + math.evaluate(localStorage.getItem("Total"))

    if (hasOperator(input1.innerHTML)) {
        input2.innerHTML = total;
        input1.innerHTML = "";
        localStorage.setItem("Total", total);

        maxInputLength = localStorage.getItem("maxInputLength");
        maxAmountNumbers = localStorage.getItem("maxAmountNumbers");
    }
}

back.onclick = () => backDel();
sum.onclick = () => sumF();

frame.onclick = function (e) {

    if (maxInputLength > 0) {
        
        if (!isNaN(e.target.innerHTML) && maxAmountNumbers != 0) {
            input1.innerHTML += e.target.innerHTML;
            maxAmountNumbers -= 1;
            maxInputLength -= 1;
        }

        if (hasOperator(e.target.innerHTML)) {
            console.log(e.target.innerHTML);
            input1.innerHTML += e.target.innerHTML;
            maxInputLength -= 1;
        }
    }
}


right.style.visibility = "hidden";
scriptManager.style.visibility = "hidden";
showHideUpgrades.onclick = function() {
    if (right.style.visibility == "visible") {
        right.style.visibility = "hidden";
        showHideUpgrades.style.left = "-1px";
    
    }
    else {
        right.style.visibility = "visible";
        showHideUpgrades.style.left = "249px";

    }

}
showHideScriptManager.onclick = function() {
    if (scriptManager.style.visibility == "visible") {
        scriptManager.style.visibility = "hidden";
        script1.style.visibility = "hidden";
        showHideScriptManager.style.left = "1px";
    
    }
    else {
        scriptManager.style.visibility = "visible";
        script1.style.visibility = "visible";
        showHideScriptManager.style.left = "-249px";

    }
}

function hideButtons() {
    for (var e of components) {
        e.style.pointerEvents = "None";
        e.style.backgroundColor = "Black";
        e.style.color = "Black";
    }
}
hideButtons();

function visibleButtons() {
    for (var e of components) {
        if (localStorage.getItem(e.id) == "1") { //e.getAttribute("data-value") == "1"
            e.style.pointerEvents = "Visible";
            e.setAttribute("data-value", "1");
            e.style.backgroundColor = "Grey";
            e.style.color = "White";
            e.style.boxShadow = "0px 2px 4px black";
        }
    }
}
visibleButtons();

// Hover effect only on visible buttons
addEventListener("mouseover", function (e) {
    if (e.target.getAttribute("data-value") == "1") {
        e.target.style.backgroundColor = "rgb(70, 73, 73)";
    }

    addEventListener("mouseout", function (e) {
        if (e.target.getAttribute("data-value") == "1") {
            e.target.style.backgroundColor = "Grey";
        }

    })

})


reset.onclick = function () {
    localStorage.clear();
    window.location.reload();
}