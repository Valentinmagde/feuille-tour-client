/*
 * Projet : FEUILLE DE ROUTE MINESUP
 * Code JAVASCRIPT : actions.js
 ************************************************
 * Auteur : Valentin Magde,Demasso James,Nebo Djomche Joress
 * E-mails : <valentinmagde@gmail.com>
 */

//Vérification du formulaire
function verificationCiterneEstVide() {
    var nom = document.getElementById("nom").value;
    var typeciterne = document.getElementById("typeciterne").value;
    var listestations = document.getElementById("listestations").value;

    if (nom.length == 0 || typeciterne == 0 || listestations== 0) {
        document.getElementById("enregistrerCiterne").disabled = true;
    } else {
        document.getElementById("enregistrerCiterne").disabled = false;
    }
}

function resetCiterne() {
    document.getElementById("nom").value = "";
    document.getElementById("date").value = "";
    document.getElementById("typeciterne").value = "";
    document.getElementById("listestations").value = "";
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

function afficherLesOptionsDesStations() {
    chargerTb(5)
        .then((res) => {
            var arr = JSON.parse(res);
            var i;
            for (i = 0; i < arr.length; i++) {
                document.getElementById("listestations").innerHTML += '<option value="' + arr[i].id + '">'+ arr[i].nom + '</option>';
            }
        })

}

function optionsDesStations(k) {
    chargerTb(5)
        .then((res) => {
            var arr = JSON.parse(res);
            var i;

            document.getElementById('station'+k).innerHTML = ''
            for (i = 0; i < arr.length; i++) {
                document.getElementById('station'+k).innerHTML += '<option value="' + arr[i].id + '">'+ arr[i].nom + '</option>';
            }
        })

}

//-------Supprimer une citerne------------
function supprimerCiterne(k) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //return this.responseText;
            //alert(this.responseText);
            if (this.responseText == 3) {
                $('#citerne_' + k).hide(1000);
            }
        }
    };
    var parameters = "method=suppr&id=" + k;
    //var parameters="limit=5";
    xhttp.open("POST", "http://" + localStorage.getItem("cam") + "/asa/admin/citernes.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parameters);
}


//-------------------
function modifierCiterne(k) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //return this.responseText;
            //alert(this.responseText);
            if (this.responseText == 1) {
                var citerne = document.getElementById('citerne_' + k)

                citerne.cells[1].innerText = x
                citerne.cells[2].innerText = y
                citerne.cells[3].innerText = z
                citerne.cells[4].innerText = uneStation(t)
                swal("Bon travail!", "Citerne modifié avec succès!", "success");
            } else {
                swal("Oops!", "Modification échouée, recommencez!", "error");
            }
        }
    };

    var x = document.getElementById('nom' + k + '').value;
    var y = document.getElementById('date' + k + '').value;
    var z = document.getElementById('typeciterne' + k + '').value;
    var t = document.getElementById('station' + k + '').value;

    var parameters = "method=modif&nom=" + x + "&datecreation=" + y +"&typeciterne=" + z + "&station=" + t + "&id=" + k;
    //var parameters="limit=5";
    xhttp.open("POST", "http://" + localStorage.getItem("cam") + "/asa/admin/citernes.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parameters);
}

//-------Afficher la liste des actions--------
function afficheListeCiternes() {
    chargerTb(14)
        .then((res) => {
            var arr = JSON.parse(res);
            var out = "";
            var i;
            for (i = 0; i < arr.length; i++) {
                out = '<tr id="citerne_' + arr[i].id + '">' +
                    '<th scope="row">' + (i+1) + '</th>' +
                    '<td>' + arr[i].nom + '</td>' +
                    '<td>' + arr[i].date_creation + '</td>' +
                    '<td>' + arr[i].type_citerne + '</td>' +
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
                    '<h4 class="modal-title">Supprimer ' + arr[i].nom + '?</h4>' +
                    '</div>' +
                    '<div class="modal-body">' +
                    '<p><button type="button" class="btn btn-warning btn-lg" onclick="supprimerCiterne(' + arr[i].id + ')">Supprimer</button>' +
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
                    '<label for="recipient-name" class="col-form-label">Date création :</label>' +
                    '</div>' +
                    '<div class="col-sm-9">' +
                    '<input type="date" class="form-control" id="date' + arr[i].id + '" value=' + arr[i].date_creation + ' style="width: 100%">' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<br>' +

                    '<div class="row">' +
                    '<div class="form-group col-md-12">' +
                    '<div class="col-sm-3">' +
                    '<label for="recipient-name" class="col-form-label">Type citerne :</label>' +
                    '</div>' +
                    '<div class="col-md-9">' +
                    '<select class="form-control" id="typeciterne' + arr[i].id + '" style="width: 100%">' +
                    '<option value="Super">Super</option>' +
                    '<option value="Gasoil">Gasoil</option>' +
                    '<option value="Petrole">Pétrole</option>' +
                    '</select>' +
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
                    '<select onfocus="optionsDesStations(' + arr[i].id + ')" class="form-control" id="station' + arr[i].id + '" style="width: 100%">' +
                    '<option id="' + arr[i].id + '" value=' + arr[i].id_station + '>' + uneStation(arr[i].id_station) + '</option>' +
                    '</select>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</form>' +
                    '</div>' +
                    '</div>' +
                    '<div class="modal-footer">' +
                    '<button type="button" class="btn btn-primary" onclick="modifierCiterne(' + arr[i].id + ')" data-dismiss="modal">Valider</button>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</td>' +
                    '</td>' +
                    '</tr>';
                //alert(out);
                $('#listesdesciternes').append(out);
            }
            initPage();
        })
        .catch((error) => {
            console.error(error)
        })

}


function enregistrerUneCiterne() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //return this.responseText;
            //alert(this.responseText);
            if (this.responseText == 2) {
                /* dernierEnregistrementActions();
                listeActions(); */
                resetCiterne()

                swal("Bravoo!", "Citerne ajoutée avec succès!", "success");
            } else {
                swal("Oops!", "Ajout échoué, recommencez!", "error");
            }
        }
    };

    var nom = document.getElementById("nom").value;
    var typeciterne = document.getElementById("typeciterne").value;
    var date = document.getElementById("date").value;
    var listestations = document.getElementById("listestations").value;

    var parameters = "method=creer&nom=" + nom +"&datecreation=" + date + "&typeciterne=" + typeciterne + "&listestations=" + listestations;
    //var parameters="limit=5";
    xhttp.open("POST", "http://" + localStorage.getItem("cam") + "/asa/admin/citernes.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parameters);

}