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
    var produit = document.getElementById("produit").value;
    var listeciternes = document.getElementById("listeciternes").value;

    if (nom.length == 0 || typevolucompteur.length == 0 || indexdebut.length == 0 || indexfin.length == 0 ||produit == 0 || listeciternes == 0) {
        document.getElementById("enregistrerPompe").disabled = true;
    } else {
        document.getElementById("enregistrerPompe").disabled = false;
    }
}

function resetPompe() {
    document.getElementById("nom").value = "";
    document.getElementById("prix").value = "";
    document.getElementById("typevolucompteur").value = "";
    document.getElementById("indexdebut").value = "";
    document.getElementById("indexfin").value = "";
}

//---pour afficher une station----
function uneStation(k) {
    var arr = [];
    var i;

    if(localStorage.getItem('stations') != null)
        arr = JSON.parse(localStorage.getItem('stations'))
        
    for (i = 0; i < arr.length; i++) {
        if (arr[i].id == k) {
            return arr[i].nom;
        }
    }

}

//---pour afficher une citerne---
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

function afficherLesOptionsDesCiternes() {
    chargerTb(14)
        .then((res) => {
            var arr = JSON.parse(res);
            var i;
            for (i = 0; i < arr.length; i++) {
                document.getElementById("listeciternes").innerHTML += '<option value="' + arr[i].id + '">'+ arr[i].nom + '</option>';
            }
        })
}

function optionsDesCiternes(k) {
    chargerTb(14)
        .then((res) => {
            var arr = JSON.parse(res);
            var i;
            for (i = 0; i < arr.length; i++) {
                document.getElementById('citerne'+ k).innerHTML += '<option value="' + arr[i].id + '">'+ arr[i].nom + '</option>';
            }
        })
}

//-------Supprimer une pompe------------
function supprimerPompe(k) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //return this.responseText;
            //alert(this.responseText);
            if (this.responseText == 3) {
                $('#pompe_' + k).hide(1000);
            }
        }
    };
    var parameters = "method=suppr&id=" + k;
    //var parameters="limit=5";
    xhttp.open("POST", "http://" + localStorage.getItem("cam") + "/asa/admin/pompes.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parameters);
}


//-------------------
function modifierPompe(k) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //return this.responseText;
            //alert(this.responseText);
            if (this.responseText == 1) {
                var pompe = document.getElementById('pompe_' + k)

                pompe.cells[1].innerText = a
                pompe.cells[2].innerText = b
                pompe.cells[3].innerText = x
                pompe.cells[4].innerText = y
                pompe.cells[5].innerText = z
                pompe.cells[6].innerText = uneStation(t)
                swal("Bon travail!", "Pompe modifié avec succès!", "success");
            } else {
                swal("Oops!", "Modification échouée, recommencez!", "error");
            }
        }
    };

    var a = document.getElementById('nom' + k + '').value;
    var b = document.getElementById('prix' + k + '').value;
    var x = document.getElementById('typevolucompteur' + k + '').value;
    var y = document.getElementById('idexdebut' + k + '').value;
    var z = document.getElementById('idexfin' + k + '').value;
    var t = document.getElementById('citerne'+ k + '').value;

    var parameters = "method=modif&nom=" + a + "&prix=" + b +"&typevolucompteur=" + x + "&indexdebut=" + y + 
    "&indexfin=" + z + "&citerne=" + t + "&id=" + k;
    //var parameters="limit=5";
    xhttp.open("POST", "http://" + localStorage.getItem("cam") + "/asa/admin/pompes.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parameters);
}

//-------Afficher la liste des actions--------
function afficheListePompes() {
    chargerTb(4)
        .then((res) => {
            var arr = JSON.parse(res);
            var out = "";
            var i;
            for (i = 0; i < arr.length; i++) {
                out = '<tr id="pompe_' + arr[i].id + '">' +
                    '<th scope="row">' + (i+1) + '</th>' +
                    '<td>' + arr[i].nom + '</td>' +
                    '<td>' + arr[i].prix + '</td>' +
                    '<td>' + arr[i].type_volucompteur + '</td>' +
                    '<td>' + arr[i].index_debut + '</td>' +
                    '<td>' + arr[i].index_fin + '</td>' +
                    '<td id="' + arr[i].id_citerne + '">' + uneCiterne(arr[i].id_citerne) + '</td>' +
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
                    '<h4 class="modal-title">Supprimer ' + arr[i].nom + '?</h4>' +
                    '</div>' +
                    '<div class="modal-body">' +
                    '<p><button type="button" class="btn btn-warning btn-lg" onclick="supprimerPompe(' + arr[i].id + ')">Supprimer</button>' +
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
                    '<label for="recipient-name" class="col-form-label">Nom :</label>' +
                    '</div>' +
                    '<div class="col-sm-9">' +
                    '<input type="text" class="form-control" id="nom' + arr[i].id + '" value=' + arr[i].nom + ' style="width: 100%">' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<br>' +

                    '<div class="row">' +
                    '<div class="form-group col-md-12">' +
                    '<div class="col-sm-3">' +
                    '<label for="recipient-name" class="col-form-label">Prix :</label>' +
                    '</div>' +
                    '<div class="col-sm-9">' +
                    '<input type="number" class="form-control" id="prix' + arr[i].id + '" value=' + arr[i].prix + ' style="width: 100%">' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<br>' +

                    '<div class="row">' +
                    '<div class="form-group col-md-12">' +
                    '<div class="col-sm-3">' +
                    '<label for="recipient-name" class="col-form-label">Type volucompteur :</label>' +
                    '</div>' +
                    '<div class="col-sm-9">' +
                    '<input type="text" class="form-control" id="typevolucompteur' + arr[i].id + '" value=' + arr[i].type_volucompteur + ' style="width: 100%">' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<br>' +

                    '<div class="row">' +
                    '<div class="form-group col-md-12">' +
                    '<div class="col-sm-3">' +
                    '<label for="recipient-name" class="col-form-label"> Index début:</label>' +
                    '</div>' +
                    '<div class="col-sm-9">' +
                    '<input type="number" class="form-control" id="idexdebut' + arr[i].id + '" value=' + arr[i].index_debut + ' style="width: 100%">' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<br>' +

                    '<div class="row">' +
                    '<div class="form-group col-md-12">' +
                    '<div class="col-sm-3">' +
                    '<label for="recipient-name" class="col-form-label"> Index fin:</label>' +
                    '</div>' +
                    '<div class="col-sm-9">' +
                    '<input type="number" class="form-control" id="idexfin' + arr[i].id + '" value=' + arr[i].index_fin + ' style="width: 100%">' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<br>' +

                    '<div class="row">' +
                    '<div class="form-group col-md-12">' +
                    '<div class="col-md-3">' +
                    '<label for="message-text" class="col-form-label">Citerne :</label>' +
                    '</div>' +
                    '<div class="col-md-9">' +
                    '<select onfocus="optionsDesCiternes(' + arr[i].id + ')" class="form-control" id="citerne' + arr[i].id + '" style="width: 100%">' +
                    '<option id="' + arr[i].id + '" value=' + arr[i].id_citerne + '>' + uneCiterne(arr[i].id_citerne) + '</option>' +
                    '</select>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</form>' +
                    '</div>' +
                    '</div>' +
                    '<div class="modal-footer">' +
                    '<button type="button" class="btn btn-primary" onclick="modifierPompe(' + arr[i].id + ')" data-dismiss="modal">Valider</button>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</td>' +
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
    var produit = document.getElementById("produit").value;
    var listeciternes = document.getElementById("listeciternes").value;

    var parameters = "method=creer&nom=" + nom +"&prix=" + prix + "&typevolucompteur=" + typevolucompteur + 
    "&indexdebut=" + indexdebut + "&indexfin=" + indexfin + "&produit="+produit+"&listeciternes=" + listeciternes;
    //var parameters="limit=5";
    xhttp.open("POST", "http://" + localStorage.getItem("cam") + "/asa/admin/pompes.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parameters);

}