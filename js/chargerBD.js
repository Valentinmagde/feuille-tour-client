/*
 * Projet : FEUILLE DE ROUTE MINESUP
 * Code JAVASCRIPT : chargerBd.js
 ************************************************
 * Auteur : Valentin Magde,Demasso James,Nebo Djomche Joress
 * E-mails : <valentinmagde@gmail.com>
 */

function chargerBd() {
    for (var k = 1; k < 14; k++) {

        if (k == 1) {
            bd(k, "BDsexe");
        } else
        if (k == 2) {
            bd(k, "BDadministration");
        } else
        if (k == 3) {
            bd(k, "BDvilles");
        } else
        if (k == 4) {
            bd(k, "BDposte");
        } else
        if (k == 5) {
            bd(k, "BDtypestructure");
        } else
        if (k == 6) {
            bd(k, "BDprogramme");
        } else
        if (k == 7) {
            bd(k, "BDactivite");
        } else
        if (k == 8) {
            bd(k, "BDaction");
        } else
        if (k == 9) {
            bd(k, "BDindicateur");
        } else
        if (k == 10) {
            bd(k, "BDutilisateur");
        } else
        if (k == 11) {
            bd(k, "BDrole");
        }
        if (k == 12) {
            bd(k, "BDresponsable");
        }
        if (k == 13) {
            bd(k, "BDnotification");
        }
    }
}

function bd(k, l) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //return this.responseText;
            localStorage.setItem(l, this.responseText);
        }
    };
    var parameters = "k=" + k;
    //var parameters="limit=5";
    xhttp.open("POST", "http://" + localStorage.getItem("cam") + "/asa/chargerbd.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parameters);
}