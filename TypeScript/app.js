var button = document.querySelector("button");
var num1 = document.getElementById("num1");
var num2 = document.getElementById("num2");
function add(n1, n2) {
    return n1 + n2;
}
button.addEventListener("click", function () {
    console.log(add(+num1.value, +num2.value));
});
