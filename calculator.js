let val1='';
let val2=''
let fn=null;
let ClearDisplay = false; //toggles to clear the display after clicking to operator

const display = document.querySelector('.display');
const numbers = document.querySelectorAll('.operand');
const operators = document.querySelectorAll('.operator');
const equals = document.querySelector(".equals");
const AC = document.querySelector('.clear')
const delButton = document.querySelector(".del");
const cent = document.querySelector('.percent');

//operator functions
function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  if (b === 0) {
    alert("Cannot divide by zero!");
    return null;
  }
  return a / b;
}
function percent(a, b) {
    return a * (b / 100);
}

//function to display on screen and store val1
numbers.forEach(number=>{
    number.addEventListener("click", ()=>{
        if(ClearDisplay){
            display.textContent='';
            ClearDisplay=false;
        }
        if(display.textContent==='0'){
            display.textContent=number.textContent;
            val1=number.textContent
        }
        else{
            display.textContent+=number.textContent;
            val1+=number.textContent;
        }
        console.log(val1);
    })
});
//operator input and store val2
operators.forEach(operator=>{
    operator.addEventListener("click",()=>{
        if(operator.textContent==='+'){
            fn=add;
        }
        else if(operator.textContent==='-'){
            fn=subtract;
        }
        else if (operator.textContent === 'x') {
            fn = multiply;
        } else if (operator.textContent === "/") {
            fn = divide;
        }
        console.log(fn)
        val2=val1; //val1 will be updated to val2 and display is cleared and second input is val1
        val1='';
        ClearDisplay=true;      
    });
});
//perform math
function operate(val1,val2,fn){
     return fn(Number(val2),Number(val1));
};
//calculate percentage
cent.addEventListener("click",()=>{
    if(val1 !== '' && val2 !== '' && fn===multiply){
        const result = percent(val1, val2);
        display.textContent = parseFloat(result).toFixed(2);
        val1 = display.textContent; 
    }
})
//calculate result
equals.addEventListener("click", () => {
    const result = operate(val1, val2, fn);
    display.textContent = result; 
    val1 = display.textContent; 
});
//clear
AC.addEventListener("click",()=>{
    display.textContent='';
    val1='';
    val2='';
    fn=null;
})
//backspace
delButton.addEventListener("click", () => {
  if (ClearDisplay) {
    display.textContent = "0";
    ClearDisplay = false;
  } else if (display.textContent.length > 1) {
    display.textContent = display.textContent.slice(0, -1);
  } else {
    display.textContent = "0";
  }

  // Synchronize val1 or val2 with the current display
  if (fn === null) {
    val1 = display.textContent; 
  } else {
    val2 = display.textContent; 
  }
});
