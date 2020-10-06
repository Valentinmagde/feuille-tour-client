/*
 * Projet : FEUILLE DE ROUTE MINESUP
 * Code JAVASCRIPT : fonctions.js
 ************************************************
 * Auteur : Valentin Magde,Demasso James,Nebo Djomche Joress
 * E-mails : <valentinmagde@gmail.com>
 */

function listeUtilisateurs() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //return this.responseText;
            //alert(this.responseText);
            localStorage.setItem("BDutilisateurs", this.responseText);

        }
    };
    var parameters = "method=get";
    //var parameters="limit=5";
    xhttp.open("POST", "http://" + localStorage.getItem("cam") + "/asa/responsables.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parameters);
}

function listeResponsables() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //return this.responseText;
            //alert(this.responseText);
            localStorage.setItem("BDresponsables", this.responseText);

        }
    };
    var parameters = "method=get";
    //var parameters="limit=5";
    xhttp.open("POST", "http://" + localStorage.getItem("cam") + "/asa/responsables.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parameters);
}

function listNoftif() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //return this.responseText;
            //alert(this.responseText);
            localStorage.setItem("BDnotifications", this.responseText);

        }
    };
    var parameters = "method=get";
    //var parameters="limit=5";
    xhttp.open("POST", "http://" + localStorage.getItem("cam") + "/asa/mail.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parameters);
}

function listeroles() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //return this.responseText;
            //alert(this.responseText);
            localStorage.setItem("BDroles", this.responseText);

        }
    };
    var parameters = "method=get";
    //var parameters="limit=5";
    xhttp.open("POST", "http://" + localStorage.getItem("cam") + "/asa/role.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parameters);
}

/*Pourcentage de réalisation des actions par programme*/
function nbreAction(id) {
    /*Déclaration des variables*/
    var arr2 = JSON.parse(localStorage.getItem("BDaction"));
    var arr1 = JSON.parse(localStorage.getItem("BDactivite"));
    var arr = JSON.parse(localStorage.getItem("BDprogramme"));
    var id_action = [];
    var denomination_action = [];
    var code_action = [];
    var id_activite = [];
    var pourcentage_action = [];
    var taille_activite_action = [];
    var donnees = [];


    // Nombres des actions par programme
    var k = 0;
    for (var j = 0; j < arr2.length; j++) {
        if (arr2[j].id_programme == arr[id].id_programme) {
            id_action[k] = arr2[j].id_action;
            code_action[k] = arr2[j].code_action;
            denomination_action[k] = arr2[j].denomination_action;
            k = k + 1;
        }
    }

    for (var i = 0; i < id_action.length; i++) {
        var k = 0;
        id_activite[i] = new Array();
        donnees[i] = new Array();
        var a, b, resultat = 0;

        for (var j = 0; j < arr1.length; j++) {

            if (arr1[j].id_action == id_action[i]) {
                id_activite[i][k] = arr1[j].id_activite;


                //Pourcentage de realisation
                if (arr1[j].statutj_activite == 2) {
                    a = arr1[j].evolutionj_activite;
                } else if (arr1[j].statutj_activite == 1) {
                    a = 50;
                } else {
                    a = arr1[j].statutj_activite;
                }
                if (arr1[j].statutd_activite == 2) {
                    b = arr1[j].evolutiond_activite;
                } else if (arr1[j].statutd_activite == 1) {
                    b = 50;
                } else {
                    b = arr1[j].statutd_activite
                }
                resultat += parseInt(a) + parseInt(b);
                k += 1;
            }
        }
        pourcentage_action[i] = resultat;
        if (id_activite[i].length != 0) {
            pourcentage_action[i] = resultat / id_activite[i].length;
        }

        if (pourcentage_action[i] == NaN) {
            donnees[i][0] = 0
        }

        donnees[i][0] = pourcentage_action[i];
        donnees[i][1] = 'COLOR4';
        donnees[i][2] = 'test';
        donnees[i][3] = code_action[i];
    }
    return donnees;
}

/*Mois de réalisation des activités par programme*/
function moisRealisation(id) {
    /*Déclaration des variables*/
    var arr2 = JSON.parse(localStorage.getItem("BDaction"));
    var arr1 = JSON.parse(localStorage.getItem("BDactivite"));
    var arr = JSON.parse(localStorage.getItem("BDprogramme"));
    var id_action = [];
    var denomination_action = [];
    var code_action = [];
    var donnees = [];


    // Nombres des actions par programme
    var k = 0;
    for (var j = 0; j < arr2.length; j++) {
        if (arr2[j].id_programme == arr[id].id_programme) {
            id_action[k] = arr2[j].id_action;
            code_action[k] = arr2[j].code_action;
            denomination_action[k] = arr2[j].denomination_action;
            k = k + 1;
        }
    }

    //Mois de réalisation des activités par action
    var k = 0;
    for (var i = 0; i < id_action.length; i++) {
        for (var j = 0; j < arr1.length; j++) {
            if (arr1[j].id_action == id_action[i] && arr1[j].mois_realisation != 0) {
                donnees[k] = arr1[j].mois_realisation;
                k += 1;
            }
        }
    }
    return donnees;
}

function activityWatcher() {

    //The number of seconds that have passed
    //since the user was active.
    var secondsSinceLastActivity = 0;

    //Five minutes. 60 x 5 = 300 seconds.
    var maxInactivity = (60 * 10);

    //Setup the setInterval method to run
    //every second. 1000 milliseconds = 1 second.
    setInterval(function() {
        secondsSinceLastActivity++;
        //if the user has been inactive or idle for longer
        //then the seconds specified in maxInactivity
        if (secondsSinceLastActivity > maxInactivity) {
            //Redirect them to your logout.php page.
            //Vider le cache
            location.href = 'pages/lock.html';
        }
    }, 1000);

    //The function that will be called whenever a user is active
    function activity() {
        //reset the secondsSinceLastActivity variable
        //back to 0
        secondsSinceLastActivity = 0;
    }

    //An array of DOM events that should be interpreted as
    //user activity.
    var activityEvents = [
        'mousedown', 'mousemove', 'keydown',
        'scroll', 'touchstart'
    ];

    //add these events to the document.
    //register the activity function as the listener parameter.
    activityEvents.forEach(function(eventName) {
        document.addEventListener(eventName, activity, true);
    });


}
activityWatcher();

//Actualiser les données en cache
function chargerTable(k, l) {
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

function logout() {
    //Vider la cache
    localStorage.clear();

    //Reactualiser le navigateur
    document.location.reload();

    //Rediriger vers la page de connexion
    window.location.href = "/supeval";
}

/* Inclure un document html */
function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /*loop through a collection of all HTML elements:*/
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /*make an HTTP request using the attribute value as the file name:*/
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {elmnt.innerHTML = this.responseText;}
          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
          /*remove the attribute, and call this function once more:*/
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      }      
      xhttp.open("GET", file, true);
      xhttp.send();
      /*exit the function:*/
      return;
    }
  }
};