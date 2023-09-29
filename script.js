var maxAmountNumbers = localStorage.getItem("maxAmountNumbers");
var maxInputLength = localStorage.getItem("maxInputLength");

function isValidScript(e) {
    try {
        math.compile(e);
    }

    catch(err) {
        return false;
    }
    return true;
}

function amountOfNumbers(e) {
    let amount = 0;
    for (let i = 0; i < e.length; i++) {
        if (numbers.includes(e[i])) {
            amount += 1;
        }
    }
    return amount;
}

recordStart.onclick = function(e) {
    
    script1.innerHTML = "";

    scriptAnimationInput.play();
    recordingAnimation.play();

    recordStart.style.pointerEvents = "None";
    scriptStart.style.pointerEvents = "None";

    let maxAmountNumbers = localStorage.getItem("maxAmountNumbers");
    let maxInputLength = localStorage.getItem("maxInputLength");
    

    
    var mousedownListener = function(e) {

        let clickedInner = e.target.innerHTML;
        let clickedId = e.target.id;

        scriptStart.style.pointerEvents = "Visible";
        
        if (clickedId === "sum") {

            recordingAnimation.cancel();
            scriptAnimationInput.cancel();

            if (isValidScript(script1.innerHTML) && script1.innerHTML != "" && hasOperator(script1.innerHTML)) {
                recordStart.style.pointerEvents = "Visible";
                window.removeEventListener("mousedown", mousedownListener);
            }
            else {
                scriptSeq = "";
                script1.innerHTML = scriptSeq;
                recordStart.style.pointerEvents = "Visible";
                window.removeEventListener("mousedown", mousedownListener);
                displayAlert(invalidScript);
                console.log(clickedId);
            }

        }
        if ((operators+numbers).includes(clickedInner) && script1.innerHTML.length < maxInputLength && amountOfNumbers(script1.innerHTML) < maxAmountNumbers) {
            console.log(amountOfNumbers(script1.innerHTML));
            script1.innerHTML += clickedInner;
        }
        }

        window.addEventListener("mousedown", mousedownListener);

    }


var interval;
var sumAllScript = "";
function sumScript() {
    
    // Evaluating string using js math library
    total = math.evaluate(sumAllScript) + math.evaluate(localStorage.getItem("Total"));


    input2.innerHTML = total;
    sumAllScript = "";
    localStorage.setItem("Total",total);
}



var running = false;
scriptStart.addEventListener("click", (e) => {

    if (script1.innerHTML != "") {
        console.log(scriptStart.innerHTML);

        if (e.target.innerHTML === "⏵") {
            e.target.innerHTML = "⏸";
        }
        else {
            e.target.innerHTML = "⏵";
        }
        
        if (running) {
            recordStart.style.pointerEvents = "Visible";
            console.log(running);
            clearInterval(interval);
            running = false;
            scriptAnimationOutput.cancel();

        }
        else {
            running = true;
            recordStart.style.pointerEvents = "None";
            scriptAnimationOutput.play();


            interval = setInterval(function() {

                
                sumAllScript += script1.innerHTML;
                
                sumScript();
    
            },localStorage.getItem("scriptDelay"));

        }
    }
    
})

var scriptAnimationOutput = input2.animate(
        [
          // keyframes
          { color: "White" },
          { color: "Green" },
          { color: "White" },
        ],
        {
          // timing options
          duration: 3000,
          iterations: Infinity,
        },
      );

var scriptAnimationInput = script1.animate(
    [
      // keyframes
      { border: "2px solid White" },
      { border: "2px solid Green" },
      { border: "2px solid White" },
    ],
    {
      // timing options
      duration: 2000,
      iterations: Infinity,
    },
  );


var recordingAnimation = recordSvg.animate(
    [
      // keyframes
      { fill: "#fff" },
      { fill: "#b00" },
      { fill: "#fff" },
    ],
    {
      // timing options
      duration: 2000,
      iterations: Infinity,
    },
  );

recordingAnimation.cancel();
scriptAnimationOutput.cancel();
scriptAnimationInput.cancel();




var noScript = "You have no scripts to start";
var invalidScript = "The script is invalid, try again";

function displayAlert(e) {
    alertBox.innerHTML = e;
    setTimeout( () => {
        alertBox.innerHTML = "";
    },3000)
}