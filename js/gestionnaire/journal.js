/*
 * Projet : FEUILLE DE ROUTE MINESUP
 * Code JAVASCRIPT : actions.js
 ************************************************
 * Auteur : Valentin Magde,Demasso James,Nebo Djomche Joress
 * E-mails : <valentinmagde@gmail.com>
 */

//Vérification du formulaire
function verificationJournalEstVide() {
    var datejournal = document.getElementById("date").value;
    var indexdebut = document.getElementById("indexdebut").value;
    var indexfin = document.getElementById("indexfin").value;
    var retourcuve = document.getElementById("retourcuve").value;
    var listespompes= document.getElementById("listespompes").value;

    if (datejournal.length == 0 || indexdebut.length == 0 || indexfin.length == 0 || retourcuve.length == 0 ) {
        document.getElementById("enregistrerJournalPompe").disabled = true;
    } else {
        document.getElementById("enregistrerJournalPompe").disabled = false;
    }
}

function resetJournal() {
    document.getElementById("date").value = "";
    document.getElementById("retourcuve").value = "";
    document.getElementById("indexdebut").value = "";
    document.getElementById("indexfin").value = "";
}

//---pour afficher une pompe----
function unePompe(k) {
    var arr = JSON.parse(pompes);
    var i;
    for (i = 0; i < arr.length; i++) {
        if (arr[i].id == k) {
            return arr[i].nom;
        }
    }

}

function afficherLesOptionsDesJournalPompes() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var arr = JSON.parse(this.responseText);
            var i;
            for (i = 0; i < arr.length; i++) {
                document.getElementById("listespompes").innerHTML += '<option value="' + arr[i].id + '">' + arr[i].nom + '</option>';
            }
        }
    };

    var parameters = ''

    if(localStorage.getItem('id_station') != null)
    {
        parameters = "method=pompes&id=" + localStorage.getItem('id_station');
    }
    else{
        logout()
    }
    //var parameters="limit=5";
    xhttp.open("POST", "http://" + localStorage.getItem("cam") + "/asa/gestionnaire/journal.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parameters);
}

//-------Supprimer une pompe------------
function supprimerJournalPompe(k) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //return this.responseText;
            //alert(this.responseText);
            if (this.responseText == 3) {
                $('#journal_' + k).hide(1000);
            }
        }
    };
    var parameters = "method=suppr&id=" + k;
    //var parameters="limit=5";
    xhttp.open("POST", "http://" + localStorage.getItem("cam") + "/asa/gestionnaire/journal.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parameters);
}

//-------Valider un lavage------------
function validerJournal(k) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //return this.responseText;
            //alert(this.responseText);
            if (this.responseText == 3) {
                var journal = document.getElementById('journal_' + k)

                journal.cells[6].innerHTML = '<span class="label label-success">Validé</span>'
                swal("Bon travail!", "Lavage validé avec succès!", "success");
            } else {
                swal("Mauvais travail!", "validation échouée, recommencez!", "error");
            }
        }
    };
    var parameters = "method=valide&id=" + k;
    //var parameters="limit=5";
    xhttp.open("POST", "http://" + localStorage.getItem("cam") + "/asa/gestionnaire/journal.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parameters);
}

//-------Rejeter un lavage-----------
function rejeterJournal(k) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //return this.responseText;
            //alert(this.responseText);
            if (this.responseText == 3) {
                var journal = document.getElementById('journal_' + k)

                journal.cells[6].innerHTML = '<span class="label label-danger">Rejeté</span>'
                swal("Bon travail!", "Lavage rejeté avec succès!", "success");
            } else {
                swal("Mauvais travail!", "validation échouée, recommencez!", "error");
            }
        }
    };
    var parameters = "method=rejete&id=" + k;
    //var parameters="limit=5";
    xhttp.open("POST", "http://" + localStorage.getItem("cam") + "/asa/gestionnaire/journal.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parameters);
}

//-------------------
function modifierJournalPompe(k) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //return this.responseText;
            //alert(this.responseText);
            if (this.responseText == 1) {
                var journal = document.getElementById('journal_' + k)

                journal.cells[1].innerText = x
                journal.cells[2].innerText = y
                journal.cells[3].innerText = z
                journal.cells[4].innerText = t
                journal.cells[5].innerText = unePompe(r)
                swal("Bon travail!", "Journal pompe modifié avec succès!", "success");
            } else {
                swal("Mauvais travail!", "Modification échouée, recommencez!", "error");
            }
        }
    };

    var x = document.getElementById('date' + k + '').value;
    var y = document.getElementById('indexdebut' + k + '').value;
    var z = document.getElementById('indexfin' + k + '').value;
    var t = document.getElementById('retourcuve' + k + '').value;
    var r = document.getElementById('pompe' + k + '').value;

    var parameters = "method=modif&date=" + x + "&indexdebut=" + y +"&indexfin=" + z + "&retourcuve=" + t + 
    "&pompe=" + r +"&id=" + k;
    //var parameters="limit=5";
    xhttp.open("POST", "http://" + localStorage.getItem("cam") + "/asa/gestionnaire/journal.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parameters);
}

//-------Afficher la liste des actions--------
function afficheListeJournalPompes() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var arr = JSON.parse(this.responseText);
            var out = "";
            var i;
            for (i = 0; i < arr.length; i++) {
                var etat = ""
                if(arr[i].etat == 1)
                    etat = '<span class="label label-success">Validé</span>'
                if(arr[i].etat == 0)
                    etat ='<span class="label label-warning">En attente</span>'
                if(arr[i].etat == 2)
                    etat ='<span class="label label-danger">Rejeté</span>'

                out = '<tr id="journal_' + arr[i].id + '">' +
                    '<th scope="row">' + (i+1) + '</th>' +
                    '<td>' + arr[i].date + '</td>' +
                    '<td>' + arr[i].index_initial + '</td>' +
                    '<td>' + arr[i].index_final + '</td>' +
                    '<td>' + arr[i].retour_cuve + '</td>' +
                    '<td id="' + arr[i].id_pompe + '">' + unePompe(arr[i].id_pompe) + '</td>' +
                    '<td>' + etat + '</td>' +
                    '<td>' +
                    '<div class="btn-group btn-group-xs dropup">' +
                    '<button type="button" class="btn btn-info btn-pretty dropdown-toggle" data-toggle="dropdown">' +
                    '<i class="fa fa-cog"></i> <span class="caret"></span>' +
                    '</button>' +

                    '<ul class="dropdown-menu dropdown-menu-right" role="menu">' +
                    '<li><a href="#" data-toggle="modal" data-target="#myModalValidate_' + arr[i].id + '"><i class="fa fa-check text-success"></i> Valider</a></li>' +
                    '<li><a href="#" data-toggle="modal" data-target="#myModalReject_' + arr[i].id + '"><i class="fa fa-trash text-danger"></i> Rejeter</a></li>' +
                    '</ul>' +

                    '<div class="modal fade" id="myModalValidate_' + arr[i].id + '" role="dialog">' +
                    '<div class="modal-dialog">' +
                    '<div class="modal-content">' +
                    '<div class="modal-header">' +
                    '<button type="button" class="close" data-dismiss="modal">&times;</button>' +
                    '<h4 class="modal-title">Valider ' + arr[i].imatricule_engin + '?</h4>' +
                    '</div>' +
                    '<div class="modal-body">' +
                    '<p><button type="button" data-dismiss="modal" class="btn btn-success btn-lg" onclick="validerJournal(' + arr[i].id + ')">Valider</button>' +
                    '<button type="button" class="btn btn-warning btn-lg" style="margin-left:10px;">Annuller</button></p>' +
                    '</div>' +
                    '<div class="modal-footer">' +
                    '<button type="button" class="btn btn-default" data-dismiss="modal">Fermer</button>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +

                    '<div class="modal fade" id="myModalReject_' + arr[i].id + '" role="dialog">' +
                    '<div class="modal-dialog">' +
                    '<div class="modal-content">' +
                    '<div class="modal-header">' +
                    '<button type="button" class="close" data-dismiss="modal">&times;</button>' +
                    '<h4 class="modal-title">Rejeter ' + arr[i].imatricule_engin + '?</h4>' +
                    '</div>' +
                    '<div class="modal-body">' +
                    '<p><button type="button" data-dismiss="modal" class="btn btn-danger btn-lg" onclick="rejeterJournal(' + arr[i].id + ')">Rejeter</button>' +
                    '<button type="button" class="btn btn-warning btn-lg" style="margin-left:10px;">Annuller</button></p>' +
                    '</div>' +
                    '<div class="modal-footer">' +
                    '<button type="button" class="btn btn-default" data-dismiss="modal">Fermer</button>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</td>' +
                    '</td>' +
                    '</tr>';
                //alert(out);
                $('#listesdesjournaux').append(out);
            }
            initPage();
        }
    };

    var parameters = ''

    if(localStorage.getItem('id_station') != null)
    {
        parameters = "method=getjournalgestionnaire&idstation=" + localStorage.getItem('id_station');
    }
    else{
        logout()
    }
    //var parameters="limit=5";
    xhttp.open("POST", "http://" + localStorage.getItem("cam") + "/asa/gestionnaire/journal.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parameters);
}


function enregistrerUnJournalPompe() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //return this.responseText;
            //alert(this.responseText);
            if (this.responseText == 2) {
                /* dernierEnregistrementActions();
                listeActions(); */
                resetJournal()

                swal("Bravoo!", "Journal pompe ajouté avec succès!", "success");
            } else {
                swal("Oops!", "Ajout échoué, recommencez!", "error");
            }
        }
    };

    var date = document.getElementById("date").value;
    var retourcuve = document.getElementById("retourcuve").value;
    var indexdebut = document.getElementById("indexdebut").value;
    var indexfin = document.getElementById("indexfin").value;
    var listespompes = document.getElementById("listespompes").value;

    var parameters = "method=creer&date=" + date +"&retourcuve=" + retourcuve + "&indexdebut=" + indexdebut + "&indexfin=" + indexfin + "&listespompes=" + listespompes;
    //var parameters="limit=5";
    xhttp.open("POST", "http://" + localStorage.getItem("cam") + "/asa/gestionnaire/journal.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parameters);

}