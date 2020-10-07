/*
 * Projet : FEUILLE DE ROUTE MINESUP
 * Code JAVASCRIPT : actions.js
 ************************************************
 * Auteur : Valentin Magde,Demasso James,Nebo Djomche Joress
 * E-mails : <valentinmagde@gmail.com>
 */

//Vérification du formulaire
function verificationVidangeEstVide() {
    var immatricule = document.getElementById("immatricule").value;
    var qualitehuile = document.getElementById("qualitehuile").value;

    if (immatricule.length == 0 || qualitehuile.length == 0) {
        document.getElementById("enregistrervidange").disabled = true;
    } else {
        document.getElementById("enregistrervidange").disabled = false;
    }
}

function resetVidange() {
    document.getElementById("immatricule").value = "";
    document.getElementById("qualitehuile").value = "";
}

//---pour afficher une station----
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
function supprimerVidange(k) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //return this.responseText;
            //alert(this.responseText);
            if (this.responseText == 3) {
                $('#vidange_' + k).hide(1000);
            }
        }
    };
    var parameters = "method=suppr&id=" + k;
    //var parameters="limit=5";
    xhttp.open("POST", "http://" + localStorage.getItem("cam") + "/asa/chefpiste/vidanges.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parameters);
}


//-------------------
function modifierVidange(k) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //return this.responseText;
            //alert(this.responseText);
            if (this.responseText == 1) {
                var lavage = document.getElementById('lavage_' + k)

                lavage.cells[1].innerText = a
                lavage.cells[2].innerText = b
                lavage.cells[3].innerText = x
                lavage.cells[4].innerText = y
                lavage.cells[5].innerText = uneStation(z)
                swal("Bon travail!", "Lavage modifié avec succès!", "success");
            } else {
                swal("Mauvais travail!", "Modification échouée, recommencez!", "error");
            }
        }
    };

    var a = document.getElementById('immatricule' + k + '').value;
    var b = document.getElementById('qualitehuile' + k + '').value;
    var x = document.getElementById('datevidange' + k + '').value;
    var y = document.getElementById('filtre' + k + '').value;
    var z = document.getElementById('station' + k + '').value;

    var parameters = "method=modif&immatricule=" + a + "&qualitehuile=" + b +"&datevidange=" + x + "&filtre=" + y + "&station=" + z + "&id=" + k;
    //var parameters="limit=5";
    xhttp.open("POST", "http://" + localStorage.getItem("cam") + "/asa/chefpiste/vidanges.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parameters);
}

//-------Afficher la liste des actions--------
function afficheListeVidanges() {
    chargerTb(6)
        .then((res) => {
            var arr = JSON.parse(res);
            var out = "";
            var i;
            for (i = 0; i < arr.length; i++) {
                out = '<tr id="vidange_' + arr[i].id + '">' +
                    '<th scope="row">' + (i+1)+ '</th>' +
                    '<td>' + arr[i].imatricule_engin + '</td>' +
                    '<td>' + arr[i].qualite_huile + '</td>' +
                    '<td>' + arr[i].date_vidange + '</td>' +
                    '<td>' + arr[i].filtre + '</td>' +
                    '<td id="' + arr[i].id_station + '">' + uneStation(arr[i].id_station) + '</td>' +
                    '<td>' +
                    '<div class="btn-group btn-group-xs dropup">' +
                    '<button type="button" class="btn btn-info btn-pretty dropdown-toggle" data-toggle="dropdown">' +
                    '<i class="fa fa-cog"></i> <span class="caret"></span>' +
                    '</button>' +
                    '<ul class="dropdown-menu dropdown-menu-right" role="menu">' +
                    '<li><a href="#" data-toggle="modal" data-target="#myModalUpdate_' + arr[i].id + '"><i class="fa fa-check text-success"></i> Modifier</a></li>' +
                    '<li><a href="#" data-toggle="modal" data-target="#myModal_' + arr[i].id + '"><i class="fa fa-trash text-danger"></i> Supprimer</a></li>' +
                    '</ul>' +
                    '<div class="modal fade" id="myModal_' + arr[i].id + '" role="dialog">' +
                    '<div class="modal-dialog">' +
                    '<div class="modal-content">' +
                    '<div class="modal-header">' +
                    '<button type="button" class="close" data-dismiss="modal">&times;</button>' +
                    '<h4 class="modal-title">Supprimer ' + arr[i].imatricule_engin + '?</h4>' +
                    '</div>' +
                    '<div class="modal-body">' +
                    '<p><button type="button" class="btn btn-warning btn-lg" onclick="supprimerVidange(' + arr[i].id + ')">Supprimer</button>' +
                    '<button type="button" class="btn btn-info btn-lg" style="margin-left:10px;">Annuller</button></p>' +
                    '</div>' +
                    '<div class="modal-footer">' +
                    '<button type="button" class="btn btn-default" data-dismiss="modal">Fermer</button>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +

                    '<div class="modal fade" id="myModalUpdate_' + arr[i].id + '" role="dialog">' +
                    '<div class="modal-dialog">' +
                    '<div class="modal-content">' +
                    '<div class="modal-header">' +
                    '<button type="button" class="close" data-dismiss="modal">&times;</button>' +
                    '<h4 class="modal-title">Modification</h4>' +
                    '</div>' +
                    '<div class="modal-body">' +

                    '<div class="container-fluid">' +
                    '<form>' +
                    '<div class="row">' +
                    '<div class="form-group col-md-12">' +
                    '<div class="col-sm-3">' +
                    '<label for="immatricule" class="col-form-label">Immatriculation engin :</label>' +
                    '</div>' +
                    '<div class="col-sm-9">' +
                    '<input type="text" class="form-control" id="immatricule' + arr[i].id + '" value=' + arr[i].imatricule_engin + ' style="width: 100%">' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<br>' +

                    '<div class="row">' +
                    '<div class="form-group col-md-12">' +
                    '<div class="col-sm-3">' +
                    '<label for="recipient-name" class="col-form-label">Qualite huile :</label>' +
                    '</div>' +
                    '<div class="col-sm-9">' +
                    '<input type="text" class="form-control" id="qualitehuile' + arr[i].id + '" value=' + arr[i].qualite_huile + ' style="width: 100%">' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<br>' +

                    '<div class="row">' +
                    '<div class="form-group col-md-12">' +
                    '<div class="col-md-3">' +
                    '<label for="message-text" class="col-form-label">Filtre :</label>' +
                    '</div>' +
                    '<div class="col-md-9">' +
                    '<select onkeyup="verificationVide()" class="form-control" id="filtre' + arr[i].id + '" style="width: 100%">' +
                    '<option id="' + arr[i].id + '" value="Oil">Oil</option>' +
                    '<option id="' + arr[i].id + '" value="Gazoil">Gazoil</option>' +
                    '</select>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<br>' +

                    '<div class="row">' +
                    '<div class="form-group col-md-12">' +
                    '<div class="col-sm-3">' +
                    '<label for="datevidange '+ arr[i].id + '" class="col-form-label">date Vidange :</label>' +
                    '</div>' +
                    '<div class="col-sm-9">' +
                    '<input type="date" class="form-control" id="datevidange' + arr[i].id + '" value=' + arr[i].date_lavage + ' style="width: 100%">' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<br>' +

                    '<div class="row">' +
                    '<div class="form-group col-md-12">' +
                    '<div class="col-md-3">' +
                    '<label for="message-text" class="col-form-label">Station :</label>' +
                    '</div>' +
                    '<div class="col-md-9">' +
                    '<select onkeyup="verificationVide()" class="form-control" id="station' + arr[i].id + '" style="width: 100%">' +
                    '<option id="' + arr[i].id + '" value=' + arr[i].id_station + '>' + uneStation(arr[i].id_station) + '</option>' +
                    '</select>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</form>' +
                    '</div>' +
                    '</div>' +

                    '<div class="modal-footer">' +
                    '<button type="button" class="btn btn-primary" onclick="modifierVidange(' + arr[i].id + ')" data-dismiss="modal">Valider</button>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</td>' +
                    '</td>' +
                    '</tr>';
                //alert(out);
                $('#listesdesvidanges').append(out);
            }
            initPage();
        })
        .catch((error) => {
            console.error(error)
        })

}


function enregistrerUneVidange() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //return this.responseText;
            //alert(this.responseText);
            if (this.responseText == 2) {
                /* dernierEnregistrementActions();
                listeActions(); */
                resetVidange()

                swal("Bravoo!", "Vidange ajoutée avec succès!", "success");
            } else {
                swal("Oops!", "Ajout échoué, recommencez!", "error");
            }
        }
    };

    var immatricule = document.getElementById("immatricule").value;
    var qualitehuile = document.getElementById("qualitehuile").value;
    var filtre = document.getElementById("filtre").value;
    var datevidange = document.getElementById("datevidange").value;
    var listestations = document.getElementById("listestations").value;

    var parameters = "method=creer&immatricule=" + immatricule +"&qualitehuile=" + qualitehuile + "&filtre=" + filtre + "&datevidange=" + datevidange + "&listestations=" + listestations;
    //var parameters="limit=5";
    xhttp.open("POST", "http://" + localStorage.getItem("cam") + "/asa/chefpiste/vidanges.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parameters);

}