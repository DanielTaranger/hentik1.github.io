var upgradesTitle = document.getElementById("upgradesTitle");

var scriptDelayUpgrade = document.getElementById("scriptDelayUpgrade");
var scriptDelayUpgradeTitle = document.getElementById("scriptDelayUpgradeTitle");
var scriptDelayUpgradePrice = document.getElementById("scriptDelayUpgradePrice");
var scriptDelayUpgradeShowDelay = document.getElementById("scriptDelayUpgradeShowDelay");

var maxDigitsUpgrade = document.getElementById("maxDigitsUpgrade");
var maxDigitsUpgradeTitle = document.getElementById("maxDigitsUpgradeTitle");
var maxDigitsUpgradePrice = document.getElementById("maxDigitsUpgradePrice");
var maxDigitsUpgradeShowNext = document.getElementById("maxDigitsUpgradeShowNext");


var maxInputUpgrade = document.getElementById("maxInputUpgrade");
var maxInputUpgradeTitle = document.getElementById("maxInputUpgradeTitle");
var maxInputUpgradePrice = document.getElementById("maxInputUpgradePrice");
var maxInputUpgradeShowNext = document.getElementById("maxInputUpgradeShowNext");

var newButtonUpgrade = document.getElementById("newButtonUpgrade");
var newButtonUpgradeTitle = document.getElementById("newButtonUpgradeTitle");
var newButtonUpgradePrice = document.getElementById("newButtonUpgradePrice");


function upgradesOnLoad() {
    if (
        localStorage.getItem("scriptDelayPrice") == null &&
        localStorage.getItem("maxDigitsPrice") == null &&
        localStorage.getItem("maxInputLengthPrice") == null &&
        localStorage.getItem("unlockNewButtonPrice") == null
    ) {
        localStorage.setItem("scriptDelayPrice",50);
        localStorage.setItem("maxDigitsPrice",1000);
        localStorage.setItem("maxInputLengthPrice",200);
        localStorage.setItem("unlockNewButtonPrice",100);
    }




    let scriptDelayPrice = localStorage.getItem("scriptDelayPrice");
    let maxDigitsPrice = localStorage.getItem("maxDigitsPrice");
    let maxInputLengthPrice = localStorage.getItem("maxInputLengthPrice");
    let unlockNewButtonPrice = localStorage.getItem("unlockNewButtonPrice");

    scriptDelayUpgradePrice.innerHTML = "Cost: " +scriptDelayPrice;
    scriptDelayUpgradeShowDelay.innerHTML = "Delay: " + scriptDelay + "->" + scriptDelay*0.8;

    maxDigitsUpgradePrice.innerHTML = "Cost: " + maxDigitsPrice;
    maxDigitsUpgradeShowNext.innerHTML = maxAmountNumbersC + "->" + (maxAmountNumbersC+1);

    maxInputUpgradePrice.innerHTML = "Cost: " + maxInputLengthPrice;
    maxInputUpgradeShowNext.innerHTML = maxInputLenC + "->" + (maxInputLenC+1);

    newButtonUpgradePrice.innerHTML = "Cost: " + unlockNewButtonPrice;



}
upgradesOnLoad();



function upgradeScriptDelay() {
    let upgradeValue = 0.8;
    let scriptDelayPrice = localStorage.getItem("scriptDelayPrice");


    if (Number(localStorage.getItem("Total")) >= Number(scriptDelayPrice)) {

        console.log(123);

        let old = localStorage.getItem("Total");
        localStorage.setItem("Total",old-scriptDelayPrice);
        scriptDelay = scriptDelay*upgradeValue;

        localStorage.setItem("scriptDelayPrice",scriptDelayPrice*2);
       
        scriptDelayUpgradePrice.innerHTML = "Cost: " + localStorage.getItem("scriptDelayPrice");
        scriptDelayUpgradeShowDelay.innerHTML = "Delay: " + scriptDelay.toFixed(0) + "->" + (scriptDelay*0.8).toFixed(0);

        input2.innerHTML = localStorage.getItem("Total");

        scriptStart.click();
        scriptStart.click();


    }
}
scriptDelayUpgrade.onclick = () => upgradeScriptDelay();

function upgradeMaxDigits() {

    let maxDigitsPrice = localStorage.getItem("maxDigitsPrice");

    if (Number(localStorage.getItem("Total")) >= Number(maxDigitsPrice)) {
        let old = localStorage.getItem("Total");
        localStorage.setItem("Total",old-maxDigitsPrice);
        maxAmountNumbersC = (maxAmountNumbersC+1);
        maxAmountNumbers = maxAmountNumbersC;

        localStorage.setItem("maxDigitsPrice",maxDigitsPrice*10);
        

        input2.innerHTML = localStorage.getItem("Total");

        maxDigitsUpgradePrice.innerHTML = "Cost:" + localStorage.getItem("maxDigitsPrice");  
        maxDigitsUpgradeShowNext.innerHTML = maxAmountNumbersC + "->" + (maxAmountNumbersC+1);

    }
}
maxDigitsUpgrade.onclick = () =>  upgradeMaxDigits();

function upgradeMaxInputLength() {

    let maxInputLengthPrice = localStorage.getItem("maxInputLengthPrice");

    if (Number(localStorage.getItem("Total")) >= Number(maxInputLengthPrice)) {
        let old = localStorage.getItem("Total");
        localStorage.setItem("Total",old-maxInputLengthPrice);
        maxInputLenC = (maxInputLenC+1);
        maxInputLen = maxInputLenC;

        localStorage.setItem("maxInputLengthPrice",maxInputLengthPrice*10);
        

        input2.innerHTML = localStorage.getItem("Total");

        maxInputUpgradePrice.innerHTML = "Cost:" + localStorage.getItem("maxInputLengthPrice");
        maxInputUpgradeShowNext.innerHTML = maxInputLenC + "->" + (maxInputLenC+1);

    }
}
maxInputUpgrade.onclick = () => upgradeMaxInputLength()

function unlockNewButton() {

    let newButtonArray = [d2,d3,d4];
    let upgraded = false;



    let unlockNewButtonPrice = localStorage.getItem("unlockNewButtonPrice");

    if (Number(localStorage.getItem("Total")) >= Number(unlockNewButtonPrice)) {

        let old = localStorage.getItem("Total");

        localStorage.setItem("Total",old-unlockNewButtonPrice);
        input2.innerHTML = localStorage.getItem("Total");

        console.log(newButtonArray[0].getAttribute("data-value") == 0);

        for (let i = 0; i < newButtonArray.length; i++) {
            if (newButtonArray[i].getAttribute("data-value") == 0 && upgraded == false) {
                newButtonArray[i].setAttribute("data-value",1);
                upgraded = true;
                visibleButtons();
            }
        }
        

    }
}
newButtonUpgrade.onclick = () => unlockNewButton();






upgradesTitle.onclick = function() {
    d2.setAttribute("data-value",1);
    visibleButtons();
}


