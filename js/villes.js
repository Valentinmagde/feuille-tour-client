/*
 * Projet : FEUILLE DE ROUTE MINESUP
 * Code JAVASCRIPT : structures.js
 ************************************************
 * Auteur : Valentin Magde,Demasso James,Nebo Djomche Joress
 * E-mails : <valentinmagde@gmail.com>
 */

// Vérification des champs du formulaire
function verificationVide() {
    var code = document.getElementById("code").value;
    var nom = document.getElementById("nom").value;
    var descriptif = document.getElementById("descriptif").value;

    if (code.length == 0 || nom.length == 0) {
        document.getElementById("envoyerville").disabled = true;
    } else {
        document.getElementById("envoyerville").disabled = false;
    }
}
//-------------------
function changerType() {
    if (document.getElementById('listetypestructure').value == "" || document.getElementById('listetypestructure').value == 0) {
        localStorage.setItem('selectedtypestructure', "");
        document.getElementById("envoyerstructure").disabled = true;
        verificationVide();
    } else {
        document.getElementById("envoyerstructure").disabled = false;
        verificationVide();
    }
    localStorage.setItem('selectedtypestructure', document.getElementById('listetypestructure').value);
}

//-------------------
function modifierVille(k) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //return this.responseText;
            //alert(this.responseText);
            if (this.responseText == 1) {
                swal("Bravoo!", "ville modifiée avec succès!", "success");
            } else {
                swal("Oops!", "Modification échouée, recommencez!", "error");
            }
        }
    };

    var x = document.getElementById('code1' + k + '').value;
    var y = document.getElementById('intitule1' + k + '').value;
    var z = document.getElementById('descriptif1' + k + '').value;

    var parameters = "method=modif&code=" + x + "&nom=" + y + "&descriptif=" + z + "&id=" + k;
    //var parameters="limit=5";
    xhttp.open("POST", "http://" + localStorage.getItem("cam") + "/asa/villes.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parameters);
}
//-------------------
function supprimerVille(k) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //return this.responseText;
            //alert(this.responseText);
            if (this.responseText == 3) {
                $('#ville_' + k).hide(1000);
                listeVilles();
                reset();
            }
        }
    };
    var parameters = "method=suppr&id=" + k;
    //var parameters="limit=5";
    xhttp.open("POST", "http://" + localStorage.getItem("cam") + "/asa/villes.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parameters);
}
//-------------------
function dernierEnregistrement() {
    setTimeout(function() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                //alert(this.responseText);
                var arr = JSON.parse(this.responseText);
                var out = "";
                var i;
                for (i = 0; i < arr.length; i++) {
                    out = '<tr id="ville_' + arr[i].id + '">' +
                        '<th scope="row">' + arr[i].id + '</th>' +
                        '<td>' + arr[i].code + '</td>' +
                        '<td>' + arr[i].nom + '</td>' +
                        '<td>' + unTypeStructure(arr[i].id_type_structure) + '</td>' +
                        '<td>' +
                        '<div class="btn-group btn-group-xs dropup">' +
                        '<button type="button" class="btn btn-info btn-pretty dropdown-toggle" data-toggle="dropdown">' +
                        '<i class="fa fa-cog"></i> <span class="caret"></span>' +
                        '</button>' +
                        '<ul class="dropdown-menu dropdown-menu-right" role="menu">' +
                        '<li><a href="#" onclick="afficheModifStructure(' + arr[i].id + ')"><i class="fa fa-check text-success"></i> Modifier</a></li>' +
                        '<li><a href="#" onclick="confirmSupVille(' + arr[i].id + ');" data-toggle="modal" data-target="#myModal_' + arr[i].id + '"><i class="fa fa-trash text-danger"></i> Supprimer</a></li>' +
                        '</ul>' +
                        '<div class="modal fade" id="myModal_' + arr[i].id + '" role="dialog">' +
                        '<div class="modal-dialog">' +
                        '<div class="modal-content">' +
                        '<div class="modal-header">' +
                        '<button type="button" class="close" data-dismiss="modal">&times;</button>' +
                        '<h4 class="modal-title">Supprimer ' + arr[i].nom + '?</h4>' +
                        '</div>' +
                        '<div class="modal-body">' +
                        '<p><button type="button" class="btn btn-warning btn-lg" onclick="supprimerVille(' + arr[i].id + ')">Supprimer</button>' +
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
                    $('#listeVilles').prepend(out);
                }
                setTimeout(function() {}, 1000);
            }
        };
        var parameters = "method=dernier";
        //var parameters="limit=5";
        xhttp.open("POST", "http://" + localStorage.getItem("cam") + "/asa/structures.php", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(parameters);
    }, 1000);
}
//-------------------
function validerCreerVille() {
    if (localStorage.getItem('villeamodifier') == "" || localStorage.getItem('villeamodifier') == null) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                //return this.responseText;
                if (this.responseText == 2) {
                    document.getElementById("code").value = "";
                    document.getElementById("nom").value = "";
                    document.getElementById("descriptif").value = "";
                    //reset();
                    swal("Bravoo!", "Ville ajoutée avec succès!", "success");
                } else {
                    swal("Oops!", "Ajout echoué, recommencez!", "error");
                }
            }
        };

        var code = document.getElementById("code").value;
        var nom = document.getElementById("nom").value;
        var descriptif = document.getElementById("descriptif").value;

        var parameters = "method=creer&code=" + code + "&nom=" + nom + "&descriptif=" + descriptif;
        //var parameters="limit=5";
        xhttp.open("POST", "http://" + localStorage.getItem("cam") + "/asa/villes.php", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(parameters);

    } else {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                //return this.responseText;
                //alert(this.responseText);
                if (this.responseText == 1) {
                    var code = document.getElementById("code").value;
                    var nom = document.getElementById("nom").value;
                    var descriptif = document.getElementById("descriptif").value;
                    var id = localStorage.getItem("villeamodifier");
                    setTimeout(function() {
                        document.getElementById("ville_" + id).innerHTML = '<th scope="row">' + id + '</th>' +
                            '<td>' + code + '</td>' +
                            '<td>' + nom + '</td>' +
                            '<td>' +
                            '<div class="btn-group btn-group-xs dropup">' +
                            '<button type="button" class="btn btn-info btn-pretty dropdown-toggle" data-toggle="dropdown">' +
                            '<i class="fa fa-cog"></i> <span class="caret"></span>' +
                            '</button>' +
                            '<ul class="dropdown-menu dropdown-menu-right" role="menu">' +
                            '<li><a href="#" onclick="afficheModifStructure(' + arr[i].id + ')"><i class="fa fa-check text-success"></i> Modifier</a></li>' +
                            '<li><a href="#" onclick="confirmSupVille(' + id + ');" data-toggle="modal" data-target="#myModal_' + id + '"><i class="fa fa-trash text-danger"></i> Supprimer</a></li>' +
                            '</ul>' +
                            '<div class="modal fade" id="myModal_' + id + '" role="dialog">' +
                            '<div class="modal-dialog">' +
                            '<div class="modal-content">' +
                            '<div class="modal-header">' +
                            '<button type="button" class="close" data-dismiss="modal">&times;</button>' +
                            '<h4 class="modal-title">Supprimer ' + nom + '?</h4>' +
                            '</div>' +
                            '<div class="modal-body">' +
                            '<p><button type="button" class="btn btn-warning btn-lg" onclick="supprimerVille(' + id + ')">Supprimer</button>' +
                            '<button type="button" class="btn btn-info btn-lg" style="margin-left:10px;">Annuller</button></p>' +
                            '</div>' +
                            '<div class="modal-footer">' +
                            '<button type="button" class="btn btn-default" data-dismiss="modal">Fermer</button>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +

                            '</td>';
                        listeVilles();
                        document.getElementById("code").value = "";
                        document.getElementById("intitule").value = "";
                        document.getElementById("descriptif").value = "";
                        localStorage.setItem("villeamodifier", "");
                        reset();
                    }, 1000);
                }
            }
        };
        var code = document.getElementById("code").value;
        var nom = document.getElementById("nom").value;
        var descriptif = document.getElementById("descriptif").value;
        var k = localStorage.getItem("villeamodifier");
        var parameters = "id=" + k + "&method=modif&code=" + code + "&nom=" + nom + "&descriptif=" + descriptif;
        //var parameters="limit=5";
        xhttp.open("POST", "http://" + localStorage.getItem("cam") + "/asa/villes.php", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(parameters);
    }
}

//-------------------
function reset() {
    //alert();
    localStorage.setItem('villeamodifier', '');
    document.getElementById("envoyerstructure").disabled = true;
    document.getElementById("listetypestructure").value = 0;
    listeVilles();
    document.getElementById("code").value = "";
    document.getElementById("intitule").value = "";
    document.getElementById("descriptif").value = "";
    localStorage.setItem("selectedtypestructure", "");
}
//-------------------
function afficheModifStructure(k) {
    localStorage.setItem('villeamodifier', k);
    var arr = JSON.parse(localStorage.getItem("BDstructure"));
    var out = "";
    var i;
    for (i = 0; i < arr.length; i++) {
        if (arr[i].id == k) {
            document.getElementById("code").value = arr[i].code;
            document.getElementById("intitule").value = arr[i].nom;
            document.getElementById("descriptif").value = arr[i].descriptif_structure;
            document.getElementById("listetypestructure").value = arr[i].id_type_structure;
            localStorage.setItem('selectedtypestructure', arr[i].id_type_structure);
            document.getElementById("envoyerstructure").disabled = false;
        }
    }
}
//-------------------
function selectedTypeStructure(k) {
    document.getElementById("envoyerstructure").disabled = true;
    localStorage.setItem('radiotypestructure', k);
    localStorage.setItem('selectedtypestructure', document.getElementById('listetypestructure').value);
    verificationVide();
}
//-------------------
function unTypeStructure(k) {
    var arr = JSON.parse(localStorage.getItem("BDtypestructure"));
    var i;
    for (i = 0; i < arr.length; i++) {
        if (arr[i].id_type_structure == k) {
            return arr[i].intitule_type_structure;
        }
    }
}
//-------------------
function afficheTypeStructure(k) {
    var arr = JSON.parse(localStorage.getItem("BDtypestructure"));
    var out = "";
    var i;
    for (i = 0; i < arr.length; i++) {
        out = '<option value="' + arr[i].id_type_structure + '">' + arr[i].intitule_type_structure + '</option>';
        $('#listetypestructure').append(out);
    }
}
//-------------------
function afficheListeVilles() {
    //alert("structure");
    setTimeout(function() {
        chargerTable(3, "BDvilles");
        var arr = JSON.parse(localStorage.getItem("BDvilles"));
        var out = "";
        var i;
        for (i = 0; i < arr.length; i++) {
            out = '<tr id="ville_' + arr[i].id + '">' +
                '<th scope="row">' + arr[i].id + '</th>' +
                '<td>' + arr[i].code + '</td>' +
                '<td>' + arr[i].nom + '</td>' +
                '<td>' + arr[i].descriptif + '</td>' +
                '<td>' +
                '<div class="btn-group btn-group-xs dropup">' +
                '<button type="button" class="btn btn-info btn-pretty dropdown-toggle" data-toggle="dropdown">' +
                '<i class="fa fa-cog"></i> <span class="caret"></span>' +
                '</button>' +
                '<ul class="dropdown-menu dropdown-menu-right" role="menu">' +
                '<li><a href="#" data-toggle="modal" data-target="#myModalUpdate_' + arr[i].id + '"><i class="fa fa-check text-success"></i> Modifier</a></li>' +
                '<li><a href="#" onclick="confirmSupVille(' + arr[i].id + ');" data-toggle="modal" data-target="#myModal_' + arr[i].id + '"><i class="fa fa-trash text-danger"></i> Supprimer</a></li>' +
                '</ul>' +

                '<div class="modal fade" id="myModal_' + arr[i].id + '" role="dialog">' +
                '<div class="modal-dialog">' +
                '<div class="modal-content">' +
                '<div class="modal-header">' +
                '<button type="button" class="close" data-dismiss="modal">&times;</button>' +
                '<h4 class="modal-title">Supprimer ' + arr[i].nom + '?</h4>' +
                '</div>' +
                '<div class="modal-body">' +
                '<p><button type="button" class="btn btn-warning btn-lg" onclick="supprimerVille(' + arr[i].id + ')">Supprimer</button>' +
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
                '<label for="recipient-name" class=" col-sm-3 control-label">Code:</label>' +
                '<div class="col-sm-9">' +
                '<input type="text" class="form-control" id="code1' + arr[i].id + '" value=' + arr[i].code + ' style="width: 100%">' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<br>' +

                '<div class="row">' +
                '<div class="form-group col-md-12">' +
                '<div class="col-md-3">' +
                '<label for="message-text" class="col-form-label">Nom:</label>' +
                '</div>' +
                '<div class="col-md-9">' +
                '<textarea type="text" class="form-control" id="intitule1' + arr[i].id + '" style="width: 100%">' + arr[i].nom + '</textarea>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<br>' +

                '<div class="row">' +
                '<div class="form-group col-md-12">' +
                '<div class="col-md-3">' +
                '<label for="message-text" class="col-form-label">Descriptif:</label>' +
                '</div>' +
                '<div class="col-md-9">' +
                '<textarea type="text" class="form-control" id="descriptif1' + arr[i].id + '" style="width: 100%">' + arr[i].descriptif + '</textarea>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<br>' +
                '</form>' +
                '</div>' +
                '</div>' +
                '<div class="modal-footer">' +
                '<button type="button" class="btn btn-primary" onclick="modifierVille(' + arr[i].id + ')" data-dismiss="modal">Valider</button>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +

                '</td>' +
                '</tr>';
            //alert(out);
            $('#listeVilles').append(out);
        }
        initPage();
        //setTimeout(function () { app.dialog.close(); }, 1000);
    }, 1000);
}