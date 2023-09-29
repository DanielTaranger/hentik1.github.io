

var scriptSeq = "";

var scriptDelay = 1000;



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
    for (let i = 0; i < scriptSeq.length; i++) {
        if (numbers.includes(e.charAt(i))) {
            amount++;
        }
    }
    return amount;
}

recordStart.onclick = function(e) {
    scriptSeq = "";
    scriptAnimationInput.play();

    let recording = e.target.innerHTML;
    console.log(recording);
    recordingAnimation.play();

    recordStart.style.pointerEvents = "None";
    scriptStart.style.pointerEvents = "None";
    

    
    var mousedownListener = function(e) {

        let clickedInner = e.target.innerHTML;
        let clickedId = e.target.id;

        scriptStart.style.pointerEvents = "Visible";
        


        if (clickedId === "sum") {

            recordingAnimation.cancel();
            scriptAnimationInput.cancel();

            if (isValidScript(scriptSeq) && scriptSeq != "" && hasOperator(scriptSeq)) {
                recordStart.style.pointerEvents = "Visible";
                localStorage.setItem("Script",scriptSeq);

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
        if ((operators+numbers).includes(clickedInner) && scriptSeq.length < maxInputLenC && amountOfNumbers(scriptSeq) < maxAmountNumbersC) {
            console.log(amountOfNumbers(scriptSeq));
            scriptSeq += clickedInner;
            script1.innerHTML = scriptSeq;
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
    
            },scriptDelay);
    
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


var recordingAnimation = recordStart.animate(
    [
      // keyframes
      { color: "Red" },
      { color: "White" },
      { color: "Red" },
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

