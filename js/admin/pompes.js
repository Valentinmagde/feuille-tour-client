/*
 * Projet : FEUILLE DE ROUTE MINESUP
 * Code JAVASCRIPT : actions.js
 ************************************************
 * Auteur : Valentin Magde,Demasso James,Nebo Djomche Joress
 * E-mails : <valentinmagde@gmail.com>
 */

//Vérification du formulaire
function verificationEstVide() {
    var nom = document.getElementById("nom").value;
    var typevolucompteur = document.getElementById("typevolucompteur").value;
    var indexdebut = document.getElementById("indexdebut").value;
    var indexfin = document.getElementById("indexfin").value;
    var listestations = document.getElementById("listestations").value;

    if (nom.length == 0 || typevolucompteur.length == 0 || listestations.length == 0) {
        document.getElementById("enregistrerPompe").disabled = true;
    } else {
        document.getElementById("enregistrerPompe").disabled = false;
    }
}

function resetPompe() {
    document.getElementById("nom").value = "";
    document.getElementById("typevolucompteur").value = "";
    document.getElementById("indexdebut").value = "";
    document.getElementById("indexfin").value = "";
    document.getElementById("listestations").value = "";
}

let stations = []
chargerTb(5).then((res) => {stations.push(res)};

//---pour afficher la liste des indicateurs----
function uneStation(k) {
    var arr = JSON.parse(stations);
    var i;
    for (i = 0; i < arr.length; i++) {
        if (arr[i].id == k) {
            return arr[i].nom;
        }
    }

}

function afficherLesOptionsDesStations() {
    chargerTb(5)
        .then((res) => {
            var arr = JSON.parse(res);
            var i;
            for (i = 0; i < arr.length; i++) {
                document.getElementById("listestations").innerHTML += '<option value="' + arr[i].id + '">' + arr[i].nom + '</option>';
            }
        })

}

//-------Supprimer une pome------------
function supprimerPome(k) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //return this.responseText;
            //alert(this.responseText);
            if (this.responseText == 3) {
                $('#action_' + k).hide(1000);
                listeActions();
            }
        }
    };
    var parameters = "method=suppr&id=" + k;
    //var parameters="limit=5";
    xhttp.open("POST", "http://" + localStorage.getItem("cam") + "/asa/actions.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parameters);
}

//----Modifier une activité--------
function afficheModifActions(k) {
    //alert('ici modification activité');
    localStorage.setItem('pompeamodifier', k);
    var arr = JSON.parse(localStorage.getItem("BDaction"));
    var out = "";
    var i;
    for (i = 0; i < arr.length; i++) {
        if (arr[i].id_action == k) {
            //alert(arr[i].code_action);
            document.getElementById("code_action").value = arr[i].code_action;
            document.getElementById("denomination_action").value = arr[i].denomination_action;
            document.getElementById("denomination_indicateur").value = arr[i].id_indicateur;
            document.getElementById("nom_responsable").value = arr[i].id_responsable;
            document.getElementById("indicateur_action").value = arr[i].indicateur_action;
            document.getElementById("enregistreraction").disabled = false;
        }
    }
}

//-------Afficher la liste des actions--------
function afficheListePompes() {
    chargerTb(4)
        .then((res) => {
            var arr = JSON.parse(res);
            var out = "";
            var i;
            for (i = 0; i < arr.length; i++) {
                out = '<tr id="action_' + arr[i].id + '">' +
                    '<th scope="row">' + arr[i].id + '</th>' +
                    '<td>' + arr[i].nom + '</td>' +
                    '<td>' + arr[i].prix + '</td>' +
                    '<td>' + arr[i].type_volucompteur + '</td>' +
                    '<td>' + arr[i].index_debut + '</td>' +
                    '<td>' + arr[i].index_fin + '</td>' +
                    '<td id="' + arr[i].id_station + '">' + uneStation(arr[i].id_station) + '</td>' +
                    '<td>' +
                    '<div class="btn-group btn-group-xs dropup">' +
                    '<button type="button" class="btn btn-info btn-pretty dropdown-toggle" data-toggle="dropdown">' +
                    '<i class="fa fa-cog"></i> <span class="caret"></span>' +
                    '</button>' +
                    '<ul class="dropdown-menu dropdown-menu-right" role="menu">' +
                    '<li><a href="#" onclick="afficheModifActions(' + arr[i].id_action + ')"><i class="fa fa-check text-success"></i> Modifier</a></li>' +
                    '<li><a href="#" onclick="confirmSupActions(' + arr[i].id_action + ');" data-toggle="modal" data-target="#myModal_' + arr[i].id_action + '"><i class="fa fa-trash text-danger"></i> Supprimer</a></li>' +
                    '</ul>' +
                    '<div class="modal fade" id="myModal_' + arr[i].id_action + '" role="dialog">' +
                    '<div class="modal-dialog">' +
                    '<div class="modal-content">' +
                    '<div class="modal-header">' +
                    '<button type="button" class="close" data-dismiss="modal">&times;</button>' +
                    '<h4 class="modal-title">Supprimer ' + arr[i].denomination_action + '?</h4>' +
                    '</div>' +
                    '<div class="modal-body">' +
                    '<p><button type="button" class="btn btn-warning btn-lg" onclick="supprimerActions(' + arr[i].id_action + ')">Supprimer</button>' +
                    '<button type="button" class="btn btn-info btn-lg" style="margin-left:10px;">Annuller</button></p>' +
                    '</div>' +
                    '<div class="modal-footer">' +
                    '<button type="button" class="btn btn-default" data-dismiss="modal">Fermer</button>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</td>' +
                    '</tr>';
                //alert(out);
                $('#listesdespompes').append(out);
            }
            initPage();
        })
        .catch((error) => {
            console.error(error)
        })

}


function enregistrerUnePompe() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //return this.responseText;
            //alert(this.responseText);
            if (this.responseText == 2) {
                /* dernierEnregistrementActions();
                listeActions(); */
                resetPompe()

                swal("Bravoo!", "Pompe ajoutée avec succès!", "success");
            } else {
                swal("Oops!", "Ajout échoué, recommencez!", "error");
            }
        }
    };

    var nom = document.getElementById("nom").value;
    var prix = document.getElementById("prix").value;
    var typevolucompteur = document.getElementById("typevolucompteur").value;
    var indexdebut = document.getElementById("indexdebut").value;
    var indexfin = document.getElementById("indexfin").value;
    var listestations = document.getElementById("listestations").value;

    var parameters = "method=creer&nom=" + nom +"&prix=" + prix + "&typevolucompteur=" + typevolucompteur + "&indexdebut=" + indexdebut + "&indexfin=" + indexfin + "&listestations=" + listestations;
    //var parameters="limit=5";
    xhttp.open("POST", "http://" + localStorage.getItem("cam") + "/asa/pompes.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parameters);

}