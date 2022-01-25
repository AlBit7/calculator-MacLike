const schermo = document.getElementById("output");
const click = new Audio("http://soundjax.com/reddo/19496%5Eclick1.mp3");

const SOVRASCRIVI = 1;
const AGGIUNGI = 2;

var numeri = new Array(2);
var operatore = "";
var aspettoSecondoNumero = false;

function input(elemento) {

    click.play();

    let tasto = elemento.innerText;

    if (tasto === "AC") {

        output("0", SOVRASCRIVI);
        numeri = [null, null];
        operatore = "";

    } else if (isOperatore(tasto)) { // operatori: / * - + %

        numeri[0] = parseFloat(schermo.innerText.replace(",", "."));    

        operatore = tasto;
        aspettoSecondoNumero = true;

    } else if (tasto === "=") {

        numeri[1] = parseFloat(schermo.innerText.replace(",", "."));
        output(eseguiOperazione(operatore, numeri), SOVRASCRIVI);
        numeri = [null, null];
        operatore = "";

    } else if (tasto === "bin") {
        output(parseFloat(schermo.innerText).toString(2), SOVRASCRIVI);
    } else {

        if (aspettoSecondoNumero || schermo.innerText == 0) {
            output(elemento.innerText, SOVRASCRIVI);
            aspettoSecondoNumero = false;
        } else {
            output(elemento.innerText, AGGIUNGI);
        }

    }

}

function eseguiOperazione(operatore, numeri) {

    switch (operatore) {

        case "÷":
            return (numeri[0] / numeri[1]).toString();

        case "⨉":
            return (numeri[0] * numeri[1]).toString();

        case "-":
            return (numeri[0] - numeri[1]).toString();

        case "+":
            return (numeri[0] + numeri[1]).toString();

        case "%":
            return (numeri[0] % numeri[1]).toString();

        default:
            return;

    }

}

function isOperatore(stringa) {
    return (stringa === "÷" || stringa === "⨉" || stringa === "-" || stringa === "+" || stringa === "%") ? true : false;
}

function output(stringa, mod) {

    if (mod == 1) {
        schermo.innerText = stringa.replace(".", ",");
    } else if (mod == 2) {
        schermo.innerText += stringa.replace(".", ",");
    } else {
        return -1;
    }

    return 1;

}
