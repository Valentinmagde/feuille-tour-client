/*
 * Projet : FEUILLE DE ROUTE MINESUP
 * Code JAVASCRIPT : actions.js
 ************************************************
 * Auteur : Valentin Magde,Demasso James,Nebo Djomche Joress
 * E-mails : <valentinmagde@gmail.com>
 */

//Vérification du formulaire
function verificationLavageEstVide() {
    var immatricule = document.getElementById("immatricule").value;
    var prix = document.getElementById("prixlavage").value;
    var datelavage = document.getElementById("datelavage").value;
    if (immatricule.length == 0 || prix.length == 0) {
        document.getElementById("enregistrerLavage").disabled = true;
    } else {
        document.getElementById("enregistrerLavage").disabled = false;
    }
}

function resetLavage() {
    document.getElementById("immatricule").value = "";
    document.getElementById("prixlavage").value = "";
    document.getElementById("datelavage").value = "";
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
function supprimerLavage(k) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //return this.responseText;
            //alert(this.responseText);
            if (this.responseText == 3) {
                $('#lavage_' + k).hide(1000);
            }
        }
    };
    var parameters = "method=suppr&id=" + k;
    //var parameters="limit=5";
    xhttp.open("POST", "http://" + localStorage.getItem("cam") + "/asa/gestionnaire/lavages.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parameters);
}

//-------Valider un lavage------------
function validerLavage(k) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //return this.responseText;
            //alert(this.responseText);
            if (this.responseText == 3) {
                var lavage = document.getElementById('lavage_' + k)

                lavage.cells[6].innerHTML = '<span class="label label-success">Validé</span>'
                swal("Bon travail!", "Lavage validé avec succès!", "success");
            } else {
                swal("Mauvais travail!", "validation échouée, recommencez!", "error");
            }
        }
    };
    var parameters = "method=valide&id=" + k;
    //var parameters="limit=5";
    xhttp.open("POST", "http://" + localStorage.getItem("cam") + "/asa/gestionnaire/lavages.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parameters);
}

//-------Rejeter un lavage-----------
function rejeterLavage(k) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //return this.responseText;
            //alert(this.responseText);
            if (this.responseText == 3) {
                var lavage = document.getElementById('lavage_' + k)

                lavage.cells[6].innerHTML = '<span class="label label-danger">Rejeté</span>'
                swal("Bon travail!", "Lavage rejeté avec succès!", "success");
            } else {
                swal("Mauvais travail!", "validation échouée, recommencez!", "error");
            }
        }
    };
    var parameters = "method=rejete&id=" + k;
    //var parameters="limit=5";
    xhttp.open("POST", "http://" + localStorage.getItem("cam") + "/asa/gestionnaire/lavages.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parameters);
}

//-------------------
function modifierLavage(k) {
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
    var b = document.getElementById('prix' + k + '').value;
    var x = document.getElementById('typeengin' + k + '').value;
    var y = document.getElementById('datelavage' + k + '').value;
    var z = document.getElementById('station' + k + '').value;

    var parameters = "method=modif&immatricule=" + a + "&prix=" + b +"&typeengin=" + x + "&datelavage=" + y + "&station=" + z + "&id=" + k;
    //var parameters="limit=5";
    xhttp.open("POST", "http://" + localStorage.getItem("cam") + "/asa/gestionnaire/lavages.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parameters);
}

//-------Afficher la liste des actions--------
function afficheListeLavages() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var arr = JSON.parse(this.responseText);
            var out = "";
            var i;
            for (i = 0; i < arr.length; i++) {
                var etat = ""
                if(arr[i].etat == 1)
                    etat = '<span class="label label-success">Validée</span>'
                if(arr[i].etat == 0)
                    etat ='<span class="label label-warning">En attente</span>'
                if(arr[i].etat == 2)
                    etat ='<span class="label label-danger">Rejetée</span>'

                out = '<tr id="lavage_' + arr[i].id + '">' +
                    '<th scope="row">' + (i+1)+ '</th>' +
                    '<td>' + arr[i].imatricule_engin + '</td>' +
                    '<td>' + arr[i].prix + '</td>' +
                    '<td>' + arr[i].type_engin + '</td>' +
                    '<td>' + arr[i].date_lavage + '</td>' +
                    '<td id="' + arr[i].id_station + '">' + uneStation(arr[i].id_station) + '</td>' +
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
                    '<p><button type="button" data-dismiss="modal" class="btn btn-success btn-lg" onclick="validerLavage(' + arr[i].id + ')">Valider</button>' +
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
                    '<p><button type="button" data-dismiss="modal" class="btn btn-danger btn-lg" onclick="rejeterLavage(' + arr[i].id + ')">Rejeter</button>' +
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
                $('#listesdeslavages').append(out);
            }
            initPage();
        }
    };

    var parameters = ''

    if(localStorage.getItem('id_station') != null)
    {
        parameters = "method=getlavagegestionnaire&idstation=" + localStorage.getItem('id_station');
    }
    else{
        logout()
    }
    //var parameters="limit=5";
    xhttp.open("POST", "http://" + localStorage.getItem("cam") + "/asa/gestionnaire/lavages.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parameters);
}


function enregistrerUnLavage() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //return this.responseText;
            //alert(this.responseText);
            if (this.responseText == 2) {
                /* dernierEnregistrementActions();
                listeActions(); */
                resetLavage()

                swal("Bravoo!", "Lavage ajouté avec succès!", "success");
            } else {
                swal("Oops!", "Ajout échoué, recommencez!", "error");
            }
        }
    };

    var immatricule = document.getElementById("immatricule").value;
    var prix = document.getElementById("prixlavage").value;
    var typeengin = document.getElementById("typeengin").value;
    var datelavage = document.getElementById("datelavage").value;
    var listestations = document.getElementById("listestations").value;

    var parameters = "method=creer&immatricule=" + immatricule +"&prix=" + prix + "&typeengin=" + typeengin + "&datelavage=" + datelavage + "&listestations=" + listestations;
    //var parameters="limit=5";
    xhttp.open("POST", "http://" + localStorage.getItem("cam") + "/asa/gestionnaire/lavages.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parameters);

}