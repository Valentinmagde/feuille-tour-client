/*
 * Projet : FEUILLE DE ROUTE MINESUP
 * Code JAVASCRIPT : actions.js
 ************************************************
 * Auteur : Valentin Magde,Demasso James,Nebo Djomche Joress
 * E-mails : <valentinmagde@gmail.com>
 */

//Vérification du formulaire
function verificationStockEstVide() {
    var quantite = document.getElementById("quantite").value;
    var datestocke = document.getElementById("date").value;
    var citerne = document.getElementById("citerne").value;

    if (quantite.length == 0 || datestocke.length == 0 || citerne == 0) {
        document.getElementById("enregistrerStocke").disabled = true;
    } else {
        document.getElementById("enregistrerStocke").disabled = false;
    }
}

function resetStocke() {
    document.getElementById("quantite").value = "";
    document.getElementById("date").value = "";
    document.getElementById("enregistrerStocke").disabled = true;
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
function supprimerStocke(k) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //return this.responseText;
            //alert(this.responseText);
            if (this.responseText == 3) {
                document.getElementById("citerne").innerHTML = ' <option value="0">Faites un choix</option> '
                afficheListeStockes()
            }
        }
    };
    var parameters = "method=suppr&id=" + k;
    //var parameters="limit=5";
    xhttp.open("POST", "http://" + localStorage.getItem("cam") + "/asa/chefpiste/stockes.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parameters);
}


//-------------------
function modifierStocke(k) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //return this.responseText;
            //alert(this.responseText);
            if (this.responseText == 1) {
                document.getElementById("citerne").innerHTML = ' <option value="0">Faites un choix</option> '
                afficheListeStockes()
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
    xhttp.open("POST", "http://" + localStorage.getItem("cam") + "/asa/chefpiste/stockes.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parameters);
}

//-------Afficher la liste des actions--------
function afficheListeStockes() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            afficherLesOptionsDesCiterne(JSON.parse(this.responseText))
            document.getElementById('listesdesstockes').innerHTML = ''
            var arr = JSON.parse(this.responseText);
            var out = "";
            var i;
            for (i = 0; i < arr.length; i++) {

                out = '<tr id="stocke_' + arr[i].id + '">' +
                    '<th scope="row">' + (i + 1) + '</th>' +
                    '<td>' + arr[i].quantite_stocke + '</td>' +
                    '<td>' + arr[i].date_creation + '</td>' +
                    '<td id="' + arr[i].id_citerne + '">' + uneCiterne(arr[i].id_citerne) + '</td>' +
                    '<td>' +
                    '<button data-toggle="modal" data-target="#myModalUpdate_' + arr[i].id + '" class="btn btn-info btn-pretty btn-xs" style="margin-right: 10px"><i class="fa fa-edit"></i> Editer</button>'+
                    '<button data-toggle="modal" data-target="#myModal_' + arr[i].id + '" class="btn btn-danger btn-pretty btn-xs"><i class="fa fa-trash-o"></i> Supprimer</button>'+
                    '<div class="modal fade" id="myModal_' + arr[i].id + '" role="dialog">' +
                    '<div class="modal-dialog">' +
                    '<div class="modal-content">' +
                    '<div class="modal-header">' +
                    '<button type="button" class="close" data-dismiss="modal">&times;</button>' +
                    '<h4 class="modal-title">Supprimer ' + arr[i].id + '?</h4>' +
                    '</div>' +
                    '<div class="modal-body">' +
                    '<p><button type="button" class="btn btn-warning btn-lg" onclick="supprimerStocke(' + arr[i].id + ')">Supprimer</button>' +
                    '<button type="button" data-dismiss="modal" class="btn btn-info btn-lg" style="margin-left:10px;">Annuller</button></p>' +
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
                            '<div class="form-group col-md-12">'+
                                '<label for="quantite' + arr[i].id + '" class="col-sm-3 control-label">Quantité :</label>'+
                                '<div class="col-sm-9">'+
                                    '<div class="input-group">'+
                                        '<input type="number" class="form-control" id="quantite' + arr[i].id + '" value=' + arr[i].quantite_stocke+'>'+
                                        '<span class="input-group-addon">L</span>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</div>' +
                        '<br>' +

                        '<div class="row">' +
                            '<div class="form-group col-md-12">' +
                                '<div class="col-md-3">' +
                                    '<label for="message-text" class="col-form-label">Citerne :</label>' +
                                '</div>' +
                                '<div class="col-md-9">' +
                                    '<select onfocus="optionsDesCiterne('+arr[i].id+')" class="form-control" id="citerne' + arr[i].id + '">' +
                                        '<option id="' + arr[i].id_citerne + '" value="' + arr[i].id_citerne + '">' + uneCiterne(arr[i].id_citerne) + '</option>' +
                                    '</select>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</form>' +
                    '</div>' +
                    '</div>' +

                    '<div class="modal-footer">' +
                    '<button type="button" class="btn btn-primary" onclick="modifierStocke(' + arr[i].id + ')" data-dismiss="modal">Valider</button>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</td>' +
                    '</td>' +
                    '</tr>';
                //alert(out);
                $('#listesdesstockes').append(out);
            }
        }
    };

    var parameters = ''

    if (localStorage.getItem('id_station') != null) {
        parameters = "method=getstockes&idstation=" + localStorage.getItem('id_station');
    } else {
        logout()
    }
    //var parameters="limit=5";
    xhttp.open("POST", "http://" + localStorage.getItem("cam") + "/asa/chefpiste/stockes.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parameters);
}


function enregistrerUnStocke() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //return this.responseText;
            //alert(this.responseText);
            if (this.responseText == 2) {
                document.getElementById("citerne").innerHTML = ' <option value="0">Faites un choix</option> '
                resetStocke()
                afficheListeStockes()
                swal("Bravoo!", "Stocke ajouté avec succès!", "success");
            } else {
                swal("Oops!", "Ajout échoué, recommencez!", "error");
            }
        }
    };

    var quantite = document.getElementById("quantite").value;
    var datecreation = document.getElementById("date").value;
    var citerne = document.getElementById("citerne").value;

    var parameters = "method=creer&quantite=" + quantite + "&datecreation=" + datecreation + "&citerne=" + citerne;
    //var parameters="limit=5";
    xhttp.open("POST", "http://" + localStorage.getItem("cam") + "/asa/chefpiste/stockes.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parameters);

}


function afficherLesOptionsDesCiterne(stockes) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var arr = JSON.parse(this.responseText);
            var i;
            for (i = 0; i < arr.length; i++) {
                if(!stockes.some(stocke=>stocke.id_citerne ==arr[i].id))
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
    xhttp.open("POST", "http://" + localStorage.getItem("cam") + "/asa/chefpiste/stockes.php", true);
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
    xhttp.open("POST", "http://" + localStorage.getItem("cam") + "/asa/chefpiste/stockes.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parameters);
}