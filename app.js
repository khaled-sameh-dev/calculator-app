const inputElement = document.querySelector("#input");
const btn = document.querySelectorAll(".btn");

var input = "";
btn.forEach((ele) => {
  ele.addEventListener("click", (e) => {
    if(e.target.innerText == 'C'){
        inputElement.setAttribute("value", '');
        return
    }
    if(e.target.innerText == 'DEL'){
        input = input.slice(0,input.length - 1)
        inputElement.setAttribute("value", input);
        return
    }
    if (e.target.innerText == "=") {
      let output = calc(inputElement.getAttribute("value"));
      inputElement.setAttribute("value", output);
      input = ''
      return;
    }
    input += e.target.innerText;
    inputElement.setAttribute("value", input);
  });
});

function calc(inputText) {
  let [operator, leftSide, rightSide] = parseInput(inputText);
  try{
    switch(operator){
        case '+' : return leftSide + rightSide
        case '-' : return leftSide - rightSide
        case '*' : return leftSide * rightSide
        case '/' :
            if(rightSide == 0)
                throw 'divisor must not 0'
            else
                return leftSide / rightSide
    }
  }catch(e){
    alert("error : " + e)
    inputElement.setAttribute("value" , '')
  }

  return '';
}

function parseInput(inputText) {
  let opratorIndex = inputText.search(/[+|-|/|*]/);
  let operator = inputText.charAt(opratorIndex);
  let leftSide = "";
  let rightSide = "";

  try {

    leftSide = inputText.slice(0, opratorIndex);
    rightSide = inputText.slice(opratorIndex + 1);

    if (leftSide == "") {
      throw "left side is empty";
    } else if (isNaN(leftSide)) {
      throw "left side must be number";
    } 
    leftSide = Number(inputText.slice(0, opratorIndex));
    rightSide = Number(inputText.slice(opratorIndex + 1));
    if (rightSide == "") {
        throw "right side is empty";
    } else if (isNaN(rightSide)) {
        throw "right side must be number";
    } 
  } catch (e) {
    alert("error : "+ e)
    inputElement.setAttribute("value" , '')
  }

  return [operator, leftSide, rightSide];
}
