/*
 * Projet : FEUILLE DE ROUTE MINESUP
 * Code JAVASCRIPT : programmes.js
 ************************************************
 * Auteur : Valentin Magde,Demasso James,Nebo Djomche Joress
 * E-mails : <valentinmagde@gmail.com>
 */

function verificationVide() {
    //alert("verif");
    var name = document.getElementById("name").value;
    var address = document.getElementById("adresse").value;
    var latitude = document.getElementById("latitude").value;
    var longitude = document.getElementById("longitude").value;
    var modegestion = document.getElementById("modegestion").value;
    var horaireouverture = document.getElementById("horaireouverture").value;
    var nbemployes = document.getElementById("nbemployes").value;
    var installation = document.getElementById("installation").value;
    var baielavage = document.getElementById("baielavage").value;
    var baieservice = document.getElementById("baieservice").value;
    var typevolucompteur = document.getElementById("typevolucompteur").value;
    var typecuve = document.getElementById("typecuve").value;
    var email = document.getElementById("email").value;
    var positionnement = document.getElementById("positionnement").value;
    var dateouverture = document.getElementById("dateouverture").value;
    var listresponsables = document.getElementById("listresponsables").value;
    var listechefboutique = document.getElementById("listechefboutique").value;
    var listechefpiste = document.getElementById("listechefpiste").value;
    var listevilles = document.getElementById("listevilles").value;

    if (name.length == 0 || 
        address.length == 0 || 
        latitude.length == 0 ||
        longitude.length == 0 ||
        modegestion.length == 0 ||
        nbemployes.length == 0 ||
        installation.length == 0 ||
        baielavage.length == 0 ||
        baieservice.length == 0 ||
        typevolucompteur.length == 0 ||
        typecuve.length == 0 ||
        email.length == 0 ||
        positionnement.length == 0) {
        document.getElementById("envoyerStation").disabled = true;
    } else {
        document.getElementById("envoyerStation").disabled = false;
    }
}

function resetStationForm() {
    document.getElementById("name").value = "";
    document.getElementById("adresse").value = "";
    document.getElementById("latitude").value = "";
    document.getElementById("longitude").value = "";
    document.getElementById("modegestion").value = "";
    document.getElementById("horaireouverture").value = "";
    document.getElementById("nbemployes").value = "";
    document.getElementById("installation").value = "";
    document.getElementById("baielavage").value = "";
    document.getElementById("baieservice").value = "";
    document.getElementById("typevolucompteur").value = "";
    document.getElementById("typecuve").value = "";
    document.getElementById("email").value = "";
    document.getElementById("positionnement").value = "";
    document.getElementById("dateouverture").value = "";
}
//Liste des Responsables
function afficherLesOptionsDeVilles() {
    chargerTb(3)
        .then((res) => {
            var arr = JSON.parse(res);
            var i;
            for (i = 0; i < arr.length; i++) {
                document.getElementById("listevilles").innerHTML += '<option value="' + arr[i].id + '">' + arr[i].nom + '</option>';
            }
        })
        .catch((error) => {
            console.error(error)
        })

}

//Liste des Responsables
function afficherLesOptionsDeResponsable() {
    chargerTb(10)
        .then((res) => {
            var arr = JSON.parse(res);
            var i;
            for (i = 0; i < arr.length; i++) {
                if (arr[i].id_role == 3) 
                    document.getElementById("listresponsables").innerHTML += '<option value="' + arr[i].id_utilisateur + '">' + arr[i].nom_utilisateur + '</option>';
                
                if (arr[i].id_role == 4)
                    document.getElementById("listechefboutique").innerHTML += '<option value="' + arr[i].id_utilisateur + '">' + arr[i].nom_utilisateur + '</option>';

                if (arr[i].id_role == 5)
                    document.getElementById("listechefpiste").innerHTML += '<option value="' + arr[i].id_utilisateur + '">' + arr[i].nom_utilisateur + '</option>';
            }
        })
        .catch((error) => {
            console.error(error)
        })

}

function afficherLesOptionsDeResponsableModal(k) {
    chargerTb(10)
        .then((res) => {
            var arr = JSON.parse(res);
            var i;
            for (i = 0; i < arr.length; i++) {
                if (arr[i].id_role == 1) {
                    document.getElementById('responsable' + k + '').innerHTML += '<option value="' + arr[i].id_utilisateur + '">' + arr[i].nom_utilisateur + '</option>';
                }
            }
        })
        .catch((error) => {
            console.error(error)
        })

}

function modalProgramme(k) {
    afficherLesOptionsDeResponsableModal(k);
}

//-------Supprimer un programme------------
function supprimerProgramme(k) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //return this.responseText;
            //alert(this.responseText);
            if (this.responseText == 3) {
                $('#programme_' + k).hide(1000);
                listeProgrammes();
                reset();
            }
        }
    };
    var parameters = "method=suppr&id=" + k;
    //var parameters="limit=5";
    xhttp.open("POST", "http://" + localStorage.getItem("cam") + "/asa/programmes.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parameters);
}

//------Concernant les programmes-------------
function enregistrerStation() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //return this.responseText;
            //alert(this.responseText);
            if (this.responseText == 2) {
                /* dernierEnregistrementStation(); */
                /* listeProgrammes(); */
                resetStationForm()

                swal("Bon travail!", "Stations ajoutée avec succès!", "success");

            } else {
                swal("Mauvais travail!", "Ajout échoué, recommencez!", "error");
            }
        }
    };

    var name = document.getElementById("name").value;
    var address = document.getElementById("adresse").value;
    var latitude = document.getElementById("latitude").value;
    var longitude = document.getElementById("longitude").value;
    var modegestion = document.getElementById("modegestion").value;
    var horaireouverture = document.getElementById("horaireouverture").value;
    var nbemployes = document.getElementById("nbemployes").value;
    var installation = document.getElementById("installation").value;
    var baielavage = document.getElementById("baielavage").value;
    var baieservice = document.getElementById("baieservice").value;
    var typevolucompteur = document.getElementById("typevolucompteur").value;
    var typecuve = document.getElementById("typecuve").value;
    var email = document.getElementById("email").value;
    var positionnement = document.getElementById("positionnement").value;
    var dateouverture = document.getElementById("dateouverture").value;
    var listresponsables = document.getElementById("listresponsables").value;
    var listechefboutique = document.getElementById("listechefboutique").value;
    var listechefpiste = document.getElementById("listechefpiste").value;
    var listevilles = document.getElementById("listevilles").value;

    var parameters = "method=creer&nom=" + name + "&adresse=" + address + "&latitude=" + latitude + "&longitude=" + longitude +
        "&modegestion=" + modegestion + "&horaireouverture=" + horaireouverture + "&nbemployes=" + nbemployes + "&installation=" + installation + "&baielavage=" + baielavage +
        "&baieservice=" + baieservice + "&typevolucompteur=" + typevolucompteur + "&typecuve=" + typecuve + "&email=" + email + "&positionnement=" + positionnement + "&dateouverture=" + dateouverture +
        "&listresponsables=" + listresponsables+ "&listechefboutique=" + listechefboutique + "&listechefpiste=" + listechefpiste + "&listevilles=" + listevilles;

    //var parameters="limit=5";
    xhttp.open("POST", "http://" + localStorage.getItem("cam") + "/asa/stations.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parameters);

}

function validerProgrammes() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //return this.responseText;
            //alert(this.responseText);
            if (this.responseText == 5) {
                setTimeout(function() {
                    alert('Programme bien validé');
                    document.getElementById("listeprogrammes").innerHTML = "";
                    localStorage.setItem("BDprogramme", "[]");
                }, 1000);
            }
        }
    }
    var anneeProgramme = document.getElementById("anneeProgramme").value;
    var parameters = "method=validerProgramme&anneeProgramme=" + anneeProgramme;
    //var parameters="limit=5";
    xhttp.open("POST", "http://" + localStorage.getItem("cam") + "/asa/programmes.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parameters);
}

//----Modifier un programme--------
function afficheModifProgramme(k) {
    //alert('ici modification Programme');
    localStorage.setItem('stationamodifier', k);
    var arr = JSON.parse(localStorage.getItem("BDprogramme"));
    var out = "";
    var i;
    for (i = 0; i < arr.length; i++) {
        if (arr[i].id_programme == k) {
            document.getElementById("noProgramme").value = arr[i].code_programme;
            document.getElementById("intituleProgramme").value = arr[i].denomination_programme;
            document.getElementById("anneeProgramme").value = arr[i].anneeProgramme;
            document.getElementById("envoyerStation").disabled = false;
        }
    }
}

let utilisateurs = []
chargerTb(10).then((res) => { utilisateurs.push(res)});

function unUtilisateur(k) {
    var arr = JSON.parse(utilisateurs);
    /*alert(localStorage.getItem("BDrole"));*/
    var i;
    for (i = 0; i < arr.length; i++) {
        if (arr[i].id_utilisateur == k) {
            return arr[i].nom_utilisateur;
        }
    }

}

//-------------------
function modifierProgramme(k) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //return this.responseText;
            //alert(this.responseText);
            if (this.responseText == 1) {
                swal("Bon travail!", "Programme modifié avec succès!", "success");
            } else {
                swal("Mauvais travail!", "Modification échouée, recommencez!", "error");
            }
        }
    };

    var x = document.getElementById('code' + k + '').value;
    var y = document.getElementById('intitule' + k + '').value;
    var t = document.getElementById('responsable' + k + '').value;

    var parameters = "method=modif&code=" + x + "&intitule=" + y +"&responsable=" + t + "&id=" + k;
    //var parameters="limit=5";
    xhttp.open("POST", "http://" + localStorage.getItem("cam") + "/asa/programmes.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parameters);
}
//-----Affiche la liste de tous les programmes-----
function afficheListeStations() {
    chargerTb(5)
        .then((res) => {
            var arr = JSON.parse(res);
            var out = "";
            var i;
            for (i = 0; i < arr.length; i++) {
                out = '<tr id="station_' + arr[i].id + '">' +
                    '<th scope="row">' + arr[i].id + '</th>' +
                    '<td>' + arr[i].nom + '</td>' +
                    '<td>' + arr[i].adresse + '</td>' +
                    '<td>' + arr[i].latitude + '</td>' +
                    '<td>' + arr[i].longitude + '</td>' +
                    '<td id="' + arr[i].id + '">' + unUtilisateur(arr[i].id_gerant) + '</td>' +
                    '<td id="' + arr[i].id + '">' + unUtilisateur(arr[i].id_chef_piste) + '</td>' +
                    '<td id="' + arr[i].id + '">' + unUtilisateur(arr[i].id_chef_boutique) + '</td>' +
                    '<td>' +
                    '<div class="btn-group btn-group-xs dropup">' +
                    '<button type="button" class="btn btn-info btn-pretty dropdown-toggle" data-toggle="dropdown">' +
                    '<i class="fa fa-cog"></i> <span class="caret"></span>' +
                    '</button>' +
                    '<ul class="dropdown-menu dropdown-menu-right" role="menu">' +
                    '<li><a href="#" onclick="modalProgramme(' + arr[i].id_programme + ')" data-toggle="modal" data-target="#myModalUpdate_' + arr[i].id_programme + '"><i class="fa fa-check text-success"></i> Modifier</a></li>' +
                    '<li><a href="#" onclick="confirmSupProgramme(' + arr[i].id_programme + ');" data-toggle="modal" data-target="#myModal_' + arr[i].id_programme + '"><i class="fa fa-trash text-danger"></i> Supprimer</a></li>' +
                    '</ul>' +
                    '<div class="modal fade" id="myModal_' + arr[i].id_programme + '" role="dialog">' +
                    '<div class="modal-dialog">' +
                    '<div class="modal-content">' +
                    '<div class="modal-header">' +
                    '<button type="button" class="close" data-dismiss="modal">&times;</button>' +
                    '<h4 class="modal-title">Supprimer ' + arr[i].denomination_programme + '?</h4>' +
                    '</div>' +
                    '<div class="modal-body">' +
                    '<p><button type="button" class="btn btn-warning btn-lg" onclick="supprimerProgramme(' + arr[i].id_programme + ')">Supprimer</button>' +
                    '<button type="button" class="btn btn-info btn-lg" style="margin-left:10px;">Annuller</button></p>' +
                    '</div>' +
                    '<div class="modal-footer">' +
                    '<button type="button" class="btn btn-default" data-dismiss="modal">Fermer</button>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="modal fade" id="myModalUpdate_' + arr[i].id_programme + '" role="dialog">' +
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
                    '<label for="recipient-name" class="col-form-label">Code :</label>' +
                    '</div>' +
                    '<div class="col-sm-9">' +
                    '<input type="text" class="form-control" id="code' + arr[i].id_programme + '" value=' + arr[i].code_programme + ' style="width: 100%">' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<br>' +

                    '<div class="row">' +
                    '<div class="form-group col-md-12">' +
                    '<div class="col-md-3">' +
                    '<label for="message-text" class="col-form-label">Description :</label>' +
                    '</div>' +
                    '<div class="col-md-9">' +
                    '<textarea type="text" class="form-control" id="description' + arr[i].id_programme + '" style="width: 100%">' + arr[i].descriptif_programme + '</textarea>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<br>' +

                    '<div class="row">' +
                    '<div class="form-group col-md-12">' +
                    '<div class="col-md-3">' +
                    '<label for="message-text" class="col-form-label">Indicateur de performance :</label>' +
                    '</div>' +
                    '<div class="col-md-9">' +
                    '<textarea type="text" class="form-control" id="intitule' + arr[i].id_programme + '" style="width: 100%">' + arr[i].denomination_programme + '</textarea>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<br>' +

                    '<div class="row">' +
                    '<div class="form-group col-md-12">' +
                    '<div class="col-md-3">' +
                    '<label for="message-text" class="col-form-label">Responsable :</label>' +
                    '</div>' +
                    '<div class="col-md-9">' +
                    '<select onkeyup="verificationVide()" class="form-control" id="responsable' + arr[i].id_programme + '" style="width: 100%">' +
                    '<option id="' + arr[i].id + '" value=' + arr[i].id_id_utilisateur + '>' + unUtilisateur(arr[i].id_utilisateur) + '</option>' +
                    '</select>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<br>' +
                    '</form>' +
                    '</div>' +
                    '</div>' +
                    '<div class="modal-footer">' +
                    '<button type="button" class="btn btn-primary" onclick="modifierProgramme(' + arr[i].id_programme + ')" data-dismiss="modal">Valider</button>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</td>' +
                    '</tr>';
                //alert(out);
                $('#listeprogrammes').append(out);
            }
            initPage();
        })
        .catch((error) => {
            console.error(error)
        })
}