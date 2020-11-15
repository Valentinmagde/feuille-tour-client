/*
 * Projet : FEUILLE DE ROUTE MINESUP
 * Code JAVASCRIPT : actions.js
 ************************************************
 * Auteur : Valentin Magde,Demasso James,Nebo Djomche Joress
 * E-mails : <valentinmagde@gmail.com>
 */

//Vérification du formulaire
function verificationNiveauStockeEstVide() {
    var initial = document.getElementById("initial").value;
    var datecreation = document.getElementById("date").value;
    var citerne = document.getElementById("citerne").value;

    if (initial.length == 0 ||datecreation.length == 0 || citerne == 0) {
        document.getElementById("enregistrerNiveauStocke").disabled = true;
    } else {
        document.getElementById("enregistrerNiveauStocke").disabled = false;
    }
}

function resetNiveauStocke() {
    document.getElementById("initial").value = "";
    document.getElementById("date").value = "";
    document.getElementById("enregistrerNiveauStocke").disabled = true;
}

//---pour afficher une station----
function uneCiterne(k) {
    var arr = [];
    var i;

    if(localStorage.getItem('citernes') != null)
        arr = JSON.parse(localStorage.getItem('citernes'))
        
    for (i = 0; i < arr.length; i++) {
        if (arr[i].id == k) {
            return arr[i].nom;
        }
    }

}

//-------Supprimer une pome------------
function supprimerNiveauStocke(k) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //return this.responseText;
            //alert(this.responseText);
            if (this.responseText == 3) {
                afficheListeNiveauStockes()
            }
        }
    };
    var parameters = "method=suppr&id=" + k;
    //var parameters="limit=5";
    xhttp.open("POST", "http://" + localStorage.getItem("cam") + "/asa/chefpiste/niveaustockes.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parameters);
}


//-------------------
function modifierNiveauStocke(k) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //return this.responseText;
            //alert(this.responseText);
            if (this.responseText == 1) {
                afficheListeNiveauStockes()
                swal("Bon travail!", "Stocke modifié avec succès!", "success");
            } else {
                swal("Oops!", "Modification échouée, recommencez!", "error");
            }
        }
    };

    var x = document.getElementById('quantite' + k + '').value;
    var y = document.getElementById('citerne' + k + '').value;

    var parameters = "method=modif&quantite=" + x + "&citerne=" + y + "&id=" + k;
    //var parameters="limit=5";
    xhttp.open("POST", "http://" + localStorage.getItem("cam") + "/asa/chefpiste/niveaustockes.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parameters);
}

//-------Afficher la liste des actions--------
function afficheListeNiveauStockes() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById('listedesniveaustocke').innerHTML = ''
            var arr = JSON.parse(this.responseText);
            var out = "";
            var i;
            for (i = 0; i < arr.length; i++) {

                out = '<tr id="niveaustocke_' + arr[i].id + '">' +
                    '<th scope="row">' + (i + 1) + '</th>' +
                    '<td>' + arr[i].nom + '</td>' +
                    '<td>' + arr[i].stocke_jauge + '</td>' +
                    '<td>' + arr[i].date_mise_a_jour + '</td>' +
                    '</tr>';
                //alert(out);
                $('#listedesniveaustocke').append(out);
            }
        }
    };

    var parameters = ''

    if (localStorage.getItem('id_station') != null) {
        parameters = "method=getciternes&idstation=" + localStorage.getItem('id_station');
    } else {
        logout()
    }
    //var parameters="limit=5";
    xhttp.open("POST", "http://" + localStorage.getItem("cam") + "/asa/chefpiste/niveaustockes.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parameters);
}


function enregistrerUnNiveauStocke() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //return this.responseText;
            //alert(this.responseText);
            if (this.responseText == 2) {
                resetNiveauStocke()
                afficheListeNiveauStockes()
                swal("Bravoo!", "Niveau stocke ajouté avec succès!", "success");
            } else {
                swal("Oops!", "Ajout échoué, recommencez!", "error");
            }
        }
    };

    var initial = document.getElementById("initial").value;
    var datecreation = document.getElementById("date").value;
    var citerne = document.getElementById("citerne").value;

    var parameters = "method=creer&initial=" + initial + "&datecreation=" + datecreation + "&citerne=" + citerne;
    //var parameters="limit=5";
    xhttp.open("POST", "http://" + localStorage.getItem("cam") + "/asa/chefpiste/niveaustockes.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parameters);

}


function afficherLesOptionsDesCiterne() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var arr = JSON.parse(this.responseText);
            var i;
            for (i = 0; i < arr.length; i++) {
                document.getElementById("citerne").innerHTML += '<option value="' + arr[i].id + '">' + arr[i].nom + '</option>';
            }
        }
    };

    var parameters = ''

    if (localStorage.getItem('id_station') != null) {
        parameters = "method=getciternes&idstation=" + localStorage.getItem('id_station');
    } else {
        logout()
    }

    //var parameters="limit=5";
    xhttp.open("POST", "http://" + localStorage.getItem("cam") + "/asa/chefpiste/niveaustockes.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parameters);
}



function optionsDesCiterne(k) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var arr = JSON.parse(this.responseText);
            var i;
            document.getElementById('citerne'+k).innerHTML = ''
            for (i = 0; i < arr.length; i++) {
                document.getElementById('citerne'+k).innerHTML += '<option value="' + arr[i].id + '">' + arr[i].nom + '</option>';
            }
        }
    };

    var parameters = ''

    if (localStorage.getItem('id_station') != null) {
        parameters = "method=getciternes&idstation=" + localStorage.getItem('id_station');
    } else {
        logout()
    }

    //var parameters="limit=5";
    xhttp.open("POST", "http://" + localStorage.getItem("cam") + "/asa/chefpiste/niveaustockes.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parameters);
}