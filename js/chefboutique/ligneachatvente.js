/*
 * Projet : FEUILLE DE ROUTE MINESUP
 * Code JAVASCRIPT : actions.js
 ************************************************
 * Auteur : Valentin Magde,Demasso James,Nebo Djomche Joress
 * E-mails : <valentinmagde@gmail.com>
 */

//Vérification du formulaire
function verificationEstVide() {
    var qte = document.getElementById("qte").value;
    var total = document.getElementById("total").value;
    var listesproduit = document.getElementById("listesproduit").value;

    if ( qte.length == 0 || listesproduit.length == 0 || total.length == 0) {
        document.getElementById("enregistrerlignefacture").disabled = true;
    } else {
        document.getElementById("enregistrerlignefacture").disabled = false;
    }
}

function resetProduit() {
    document.getElementById("qte").value = "";
    document.getElementById("total").value = "";
    document.getElementById("listesachatvente").value = "";
  
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
                document.getElementById("listestation").innerHTML += '<option value="' + arr[i].id + '">' + arr[i].nom + '</option>';
            }
        })

}
function afficherLesOptionsDesCategories() {
    chargerTb(7)
        .then((res) => {
            var arr = JSON.parse(res);
            var i;
            for (i = 0; i < arr.length; i++) {
                document.getElementById("listescategorie").innerHTML += '<option value="' + arr[i].id + '">' + arr[i].designation + '</option>';
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
    xhttp.open("POST", "http://" + localStorage.getItem("cam") + "/asa/pompes.php", true);
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
                pompe.cells[4].innerText = z
                pompe.cells[6].innerText = uneStation(r)
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
    var t = document.getElementById('station' + k + '').value;

    var parameters = "method=modif&nom=" + a + "&prix=" + b +"&typevolucompteur=" + x + "&indexdebut=" + y + 
    "&indexfin=" + z + "&station=" + t + "&id=" + k;
    //var parameters="limit=5";
    xhttp.open("POST", "http://" + localStorage.getItem("cam") + "/asa/pompes.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parameters);
}

//-------Afficher la liste des actions--------
function afficheListeProduit() {
    chargerTb(8)
        .then((res) => {
            var arr = JSON.parse(res);
            var out = "";
            var i;
            for (i = 0; i < arr.length; i++) {
                out = '<tr id="pompe_' + arr[i].id + '">' +
                    '<th scope="row">' + arr[i].id + '</th>' +
                    '<td>' + arr[i].designation + '</td>' +
                    '<td>' + arr[i].prix + '</td>' +
                    '<td>' + arr[i].quantite + '</td>' +
                    '<td>' + arr[i].quantite_alert + '</td>' +
                    '<td>' + arr[i].code + '</td>' +
                    '<td>' + arr[i].poids + '</td>' +
                    '<td>' + arr[i].reference + '</td>' +
                    '<td>' + arr[i].id_categorie + '</td>' +
                    '<td>' +
                    '<div class="btn-group btn-group-xs dropup">' +
                    '<button type="button" class="btn btn-info btn-pretty dropdown-toggle" data-toggle="dropdown">' +
                    '<i class="fa fa-cog"></i> <span class="caret"></span>' +
                    '</button>' +
                    '<ul class="dropdown-menu dropdown-menu-right" role="menu">' +
                    '<li><a href="#" data-toggle="modal" data-target="#myModal_' + arr[i].id + '"><i class="fa fa-trash text-danger"></i> Supprimer</a></li>' +
                    '<li><a href="#" data-toggle="modal" data-target="#myModalUpdate_' + arr[i].id + '"><i class="fa fa-check text-success"></i> Modifier</a></li>' +
                    '<li><a href="#" data-toggle="modal" data-target="#myModalA_' + arr[i].id + '"><i class="fa fa-trash text-primary"></i> ajouter</a></li>' +
                    '</ul>' +
                    '<div class="modal fade" id="myModal_' + arr[i].id + '" role="dialog">' +
                    '<div class="modal-dialog">' +
                    '<div class="modal-content">' +
                    '<div class="modal-header">' +
                    '<button type="button" class="close" data-dismiss="modal">&times;</button>' +
                    '<h4 class="modal-title">Supprimer ' + arr[i].designation + '?</h4>' +
                    '</div>' +
                    '<div class="modal-body">' +
                    '<p><button type="button" class="btn btn-warning btn-lg" onclick="supprimerProduit(' + arr[i].id + ')">Supprimer</button>' +
                    '<button type="button" class="btn btn-info btn-lg" style="margin-left:10px;">Annuller</button></p>' +
                    '</div>' +
                    '<div class="modal-footer">' +
                    '<button type="button" class="btn btn-default" data-dismiss="modal">Fermer</button>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                
                    '<div class="modal fade" id="myModalA_' + arr[i].id + '" role="dialog">' +
                    '<div class="modal-dialog">' +
                    '<div class="modal-content">' +
                    '<div class="modal-header">' +
                    '<button type="button" class="close" data-dismiss="modal">&times;</button>' +
                    '<h4 class="modal-title">ravitaller le produit ' + arr[i].designation + '?</h4>' +
                    '</div>' +
                    '<div class="modal-body">' +
                    '<div class="container-fluid">' +
                    '<form>' +
                    '<div class="row">' +
                    '<div class="form-group col-md-12">' +
                    '<div class="col-sm-3">' +
                    '<label for="recipient-name" class="col-form-label">Quantité produit :</label>' +
                    '</div>' +
                    '<div class="col-sm-9">' +
                    '<input type="text" class="form-control" id="nom' + arr[i].id + '" value="saisisez la quantité a ravitailler" style="width: 100%">' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<br>' +
                    '</form>' +
                    '</div>' +
                    '<p><button type="button" class="btn btn-warning btn-lg" onclick="ravitallerProduit(' + arr[i].id + ')">Ajouter</button>' +
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
                    '<button type="button" class="btn btn-primary" onclick="modifierPompe(' + arr[i].id + ')" data-dismiss="modal">Valider</button>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</td>' +
                    '</td>' +
                    '</tr>';
                $('#listesdesproduits').append(out);
            }
            initPage();
        })
        .catch((error) => {
            console.error(error)
        })

}


function enregistrerlignefacture() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //return this.responseText;
            //alert(this.responseText);
            if (this.responseText == 2) {
                /* dernierEnregistrementActions();
                listeActions(); */
                swal("Bravoo!", "ligne facture ajoutée avec succès!", "success");
                resetProduit();

            } else {
                swal("Oops!", "ligne facture échouée, recommencez!", "error");
            }
        }
    };

  
    var qte= document.getElementById("qte").value;
    var total =document.getElementById("total").value;
    var listelignefacture=document.getElementById("listesachatvente").value;

    var parameters = "method=creer&qte="+ qte +"&total="+ total + "&id_ligneachat=" + listelignefacture ;
    //var parameters="limit=5";
    xhttp.open("POST", "http://" + localStorage.getItem("cam") + "/asa/lignefacture.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parameters);
}
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

    

   

