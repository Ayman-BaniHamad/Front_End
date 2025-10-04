function isPrime() {
    var number = parseFloat(document.getElementById("PrimeNumInput").value);
    var prime = true;
    if (number < 2) {
        prime = false;
    } else {
        var squareroot = Math.floor(Math.sqrt(number));
        for (var i = 2; i <= squareroot; i++) {
            if (number % i === 0) {
                prime = false;
                break;
            }
        }
    }
    var message;
    if (prime) {
        message = number + " is a PRIME number";
    }
    else{
        message = number + " is NOT a prime number";
    }
    console.log(number, prime);
    document.getElementById("PrimeNumResult").innerHTML = message;
}

