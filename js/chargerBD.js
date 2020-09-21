/*
 * Projet : FEUILLE DE ROUTE MINESUP
 * Code JAVASCRIPT : chargerBd.js
 ************************************************
 * Auteur : Valentin Magde,Demasso James,Nebo Djomche Joress
 * E-mails : <valentinmagde@gmail.com>
 */

function chargerTb(k) {
    return new Promise(function(resolve, reject) {
        var xhttp = new XMLHttpRequest();

        var parameters = "k=" + k;
        //var parameters="limit=5";
        xhttp.open("POST", "http://" + localStorage.getItem("cam") + "/asa/chargerbd.php", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(parameters);

        xhttp.onload = function() {
            resolve(this.responseText)
        }

        xhttp.onerror = reject
    });

}