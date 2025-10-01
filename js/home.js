var age = 20;
console.log("Age 1 = " , age);
var age = 30;
console.log("Age 2 = " , age);
let price = 100;
console.log("Price 1 = " , price);
price = 200;
console.log("Price 2 = " , price);
const tax = 0.1;
console.log("Tax 1 = " , tax);
/*------------------------------*/ 
var isNew = false;
var marks = [60 , 70 , 80 , 90 , 95];
console.log("Marks = " , marks);
var student = {
name : "Ayman" , age: 23 , isNew : true
}
console.log("Student Information: " , student);
if(age < 18){
    console.log("You are not allowed to enter");
} else {
    console.log("You are allowed to enter");
}
if (age >=10 ){
 console.log("Age is greater than 10");
}
function helloworld(){
    alert("Hello World");
}
// DOM
function jsBgColorChange(){
    var jsPart = document.getElementById("jspart")
     console.log('This is the JS part',jsPart)
     jsPart.style.backgroundColor = "black"; 
        jsPart.style.color = "white";
    }
function calculate(){
    var num1 = document.getElementById("Num1").value;
    var num2 = document.getElementById("Num2").value;
    var op = document.getElementById("Op").value;
    var result=0;
    // switch case
    switch(op){
        case "+":
            result = parseFloat(num1) + parseFloat(num2);
            break;
        case "-":
            result = parseFloat(num1) - parseFloat(num2);
            break;
        case "*":
            result = parseFloat(num1) * parseFloat(num2);
            break;
        case "/":
            result = parseFloat(num1) / parseFloat(num2);
            break;
        default:
            result = "Invalid Operator";
    }   
    document.getElementById("Result").innerHTML = result;
        console.log(num1 , op , num2 ,  result);

}