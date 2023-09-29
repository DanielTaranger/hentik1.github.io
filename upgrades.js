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


    if (localStorage.getItem("scriptDelay") == null) {

        localStorage.setItem("scriptDelay",1000); 
        localStorage.setItem("scriptDelayPrice",50); //50
        localStorage.setItem("maxDigitsPrice",100); //1000
        localStorage.setItem("maxInputLengthPrice",200); //200  
        localStorage.setItem("unlockNewButtonPrice",100); //100
        localStorage.setItem("maxInputLength",2);
        localStorage.setItem("maxAmountNumbers",1);

        localStorage.setItem("d0",0);
        localStorage.setItem("d1",1);
        localStorage.setItem("d2",0);
        localStorage.setItem("d3",0);
        localStorage.setItem("d4",0);
        localStorage.setItem("d5",0);
        localStorage.setItem("d6",0);
        localStorage.setItem("d7",0);
        localStorage.setItem("d8",0);
        localStorage.setItem("d9",0);
        localStorage.setItem("plus",1);
        localStorage.setItem("sum",1);
        localStorage.setItem("back",1);
    }

    let scriptDelay = localStorage.getItem("scriptDelay");
    let scriptDelayPrice = localStorage.getItem("scriptDelayPrice");
    let maxDigitsPrice = localStorage.getItem("maxDigitsPrice");
    let maxInputLengthPrice = localStorage.getItem("maxInputLengthPrice");
    let unlockNewButtonPrice = localStorage.getItem("unlockNewButtonPrice");
    let maxInputLength = localStorage.getItem("maxInputLength");
    let maxAmountNumbers = localStorage.getItem("maxAmountNumbers");

    scriptDelayUpgradePrice.innerHTML = "Cost: " +scriptDelayPrice;
    scriptDelayUpgradeShowDelay.innerHTML = "Delay: " + Number(scriptDelay).toFixed(0) + "->" + (scriptDelay*0.8).toFixed(0);

    maxDigitsUpgradePrice.innerHTML = "Cost: " + maxDigitsPrice;
    maxDigitsUpgradeShowNext.innerHTML = maxAmountNumbers + "->" + (Number(maxAmountNumbers)+1);

    maxInputUpgradePrice.innerHTML = "Cost: " + maxInputLengthPrice;    
    maxInputUpgradeShowNext.innerHTML = maxInputLength + "->" + (Number(maxInputLength)+1);

    newButtonUpgradePrice.innerHTML = "Cost: " + unlockNewButtonPrice;



}
upgradesOnLoad();



function upgradeScriptDelay() {
    let upgradeValue = 0.8;
    let scriptDelayPrice = localStorage.getItem("scriptDelayPrice");
    let scriptDelay = localStorage.getItem("scriptDelay");


    if (Number(localStorage.getItem("Total")) >= Number(scriptDelayPrice)) {

        // subtract cost from total
        let old = localStorage.getItem("Total");
        localStorage.setItem("Total",old-scriptDelayPrice);


        scriptDelay = scriptDelay*upgradeValue;

        localStorage.setItem("scriptDelayPrice",scriptDelayPrice*2);

        localStorage.setItem("scriptDelay",scriptDelay);
       
        scriptDelayUpgradePrice.innerHTML = "Cost: " + localStorage.getItem("scriptDelayPrice");
        scriptDelayUpgradeShowDelay.innerHTML = "Delay: " + Number(scriptDelay).toFixed(0) + "->" + (scriptDelay*0.8).toFixed(0);

        input2.innerHTML = localStorage.getItem("Total");

        scriptStart.click();
        scriptStart.click();
    }
}
scriptDelayUpgrade.onclick = () => upgradeScriptDelay();

function upgradeMaxDigits() {

    let maxDigitsPrice = localStorage.getItem("maxDigitsPrice");
    let maxAmountNumbers = localStorage.getItem("maxAmountNumbers");

    if (Number(localStorage.getItem("Total")) >= Number(maxDigitsPrice)) {
        let old = localStorage.getItem("Total");
        localStorage.setItem("Total",old-maxDigitsPrice);

        localStorage.setItem("maxDigitsPrice",maxDigitsPrice*10);

        let newMaxAmountNumbers = Number(maxAmountNumbers)+1;
        localStorage.setItem("maxAmountNumbers",newMaxAmountNumbers);
        

        input2.innerHTML = localStorage.getItem("Total");

        maxDigitsUpgradePrice.innerHTML = "Cost:" + localStorage.getItem("maxDigitsPrice");  
        maxDigitsUpgradeShowNext.innerHTML = localStorage.getItem("maxAmountNumbers") + "->" + (Number(localStorage.getItem("maxAmountNumbers"))+1);

    }
}
maxDigitsUpgrade.onclick = () =>  upgradeMaxDigits();

function upgradeMaxInputLength() {

    let maxInputLengthPrice = localStorage.getItem("maxInputLengthPrice");
    let maxInputLength = localStorage.getItem("maxInputLength");

    if (Number(localStorage.getItem("Total")) >= Number(maxInputLengthPrice)) {
        let old = localStorage.getItem("Total");

        localStorage.setItem("Total",old-maxInputLengthPrice);

        let newMaxInputLength = Number(maxInputLength)+1;

        localStorage.setItem("maxInputLength",newMaxInputLength);

        localStorage.setItem("maxInputLengthPrice",maxInputLengthPrice*10);
        
        input2.innerHTML = localStorage.getItem("Total");

        maxInputUpgradePrice.innerHTML = "Cost:" + localStorage.getItem("maxInputLengthPrice");
        maxInputUpgradeShowNext.innerHTML = localStorage.getItem("maxInputLength") + "->" + (Number(localStorage.getItem("maxInputLength"))+1);

    }
}
maxInputUpgrade.onclick = () => upgradeMaxInputLength()

function unlockNewButton() {

    let newButtonArray = [d2,d3,d0,d4,d5,d6,d7,d8,d9];
    let upgraded = false;

    let unlockNewButtonPrice = localStorage.getItem("unlockNewButtonPrice");

    if (Number(localStorage.getItem("Total")) >= Number(unlockNewButtonPrice)) {

        let old = localStorage.getItem("Total");

        localStorage.setItem("Total",old-unlockNewButtonPrice);
        input2.innerHTML = localStorage.getItem("Total");

        localStorage.setItem("unlockNewButtonPrice",unlockNewButtonPrice*2);
        newButtonUpgradePrice.innerHTML = "Cost: " + localStorage.getItem("unlockNewButtonPrice");

        for (let i = 0; i < newButtonArray.length; i++) {
            if (localStorage.getItem(newButtonArray[i].id) == "0"  && upgraded == false) {
                localStorage.setItem(newButtonArray[i].id,1);
                console.log(newButtonArray[i].id);
                upgraded = true;
                visibleButtons();
            }
        }
    }
}
newButtonUpgrade.onclick = () => unlockNewButton();