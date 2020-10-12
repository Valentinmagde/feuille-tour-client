/*
 * Projet : FEUILLE DE ROUTE MINESUP
 * Code JAVASCRIPT : responsables.js
 ************************************************
 * Auteur : Valentin Magde,Demasso James,Nebo Djomche Joress
 * E-mails : <valentinmagde@gmail.com>
 */

function verificationVide() {
    var nomPrenom = document.getElementById("nomPrenom").value;
    var email = document.getElementById("email").value;
    var telephone = document.getElementById("telephone").value;
    var sexe = document.getElementById("listsexes").value;
    var poste = document.getElementById("listpostes").value;
    var password = document.getElementById("password").value;
    var confirm_password = document.getElementById("confirm_password").value;

    if (nomPrenom.length == 0 || email.length == 0 || telephone.length == 0 || password.length == 0 || confirm_password.length == 0 || poste == null || sexe == null) {
        document.getElementById("enregistrerleresponsable").disabled = true;
    } else {
        document.getElementById("enregistrerleresponsable").disabled = false;
    }
}

function unposte(k) {
    var arr = JSON.parse(roles);
    /*alert(localStorage.getItem("BDrole"));*/
    var i;
    for (i = 0; i < arr.length; i++) {
        if (arr[i].id == k) {
            return arr[i].libele;
        }
    }
}

function unsexe(k) {
    /* alert(sexes); */
    var arr = new Array();

    if(sexes.length > 0)
        arr = JSON.parse(sexes);
    else 
        unsexe(k)

    var i;
    for (i = 0; i < arr.length; i++) {
        if (arr[i].id_sexe == k) {
            return arr[i].nom_sexe;
        }
    }

}

function afficherLesOptionsDeSexes() {
    chargerTb(1)
        .then((res) => {
            var arr = JSON.parse(res);
            var out = "";
            var i;

            for (i = 0; i < arr.length; i++) {
                document.getElementById("listsexes").innerHTML += '<option value="' + arr[i].id_sexe + '">' + arr[i].nom_sexe + '</option>';
            }
        })
        .catch((error) => {
            console.error(error)
        })
}

function afficherLesOptionsDePostes() {
    chargerTb(11)
        .then((res) => {
            var arr = JSON.parse(res);
            var out = "";
            var i;
            for (i = 0; i < arr.length; i++) {
                document.getElementById("listpostes").innerHTML += '<option value="' + arr[i].id + '">' + arr[i].libele + '</option>';
            }
        })
        .catch((error) => {
            console.log(error)
        })

}

function afficherLesOptionsDePostesModal(k) {
    chargerTb(11)
        .then((res) => {
            var arr = JSON.parse(res);
            var i;
            document.getElementById('role' + k + '').innerHTML = ''
            for (i = 0; i < arr.length; i++) {
                document.getElementById('role' + k + '').innerHTML += '<option value="' + arr[i].id + '">' + arr[i].libele + '</option>';
            }
        })
        .catch((error) => {
            console.log(error)
        })
}

function selectedSexe(k) {
    document.getElementById("enregistrerleresponsable").disabled = true;
    localStorage.setItem('radiosexe', k);
    localStorage.setItem('selectedsexe', document.getElementById('listsexes').value);
    verificationVide();
}

function selectedPoste(k) {
    document.getElementById("enregistrerleresponsable").disabled = true;
    localStorage.setItem('radioposte', k);
    localStorage.setItem('selectedposte', document.getElementById('listpostes').value);
    verificationVide();
}

//-------Supprimer un responsables------------
function supprimerResponsable(k){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //return this.responseText;
            //alert(this.responseText);
            if (this.responseText == 3) {
                $('#responsable_' + k).hide(1000);
                afficherLaListeDesResponsables();
            }
        }
    };
    var parameters = "method=suppr&id_utilisateur=" + k;
    //var parameters="limit=5";
    xhttp.open("POST", "http://" + localStorage.getItem("cam") + "/asa/admin/responsables.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parameters);
}

//-------------------
function afficheModifResponsable(k) {
    localStorage.setItem('responsableamodifier', k);
    var arr = JSON.parse(localStorage.getItem("BDutilisateur"));
    var out = "";
    var i;
    for (i = 0; i < arr.length; i++) {
        if (arr[i].id_responsable == k) {
            document.getElementById("nomPrenom").value = arr[i].nom_utilisateur;
            document.getElementById("email").value = arr[i].mail_utilisateur;
            document.getElementById("telephone").value = arr[i].tel_utilisateur;
            document.getElementById("listpostes").value = arr[i].id_role;
            document.getElementById("listsexes").value = arr[i].sexe;
            document.getElementById("liststructures").value = arr[i].id_structure;
            document.getElementById("enregistrerleresponsable").disabled = false;
        }
    }
}

//Création d'un Utilisateur
function enregistrerLeResponsable() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            if (this.responseText == 2) {
                document.getElementById("nomPrenom").value = "";
                document.getElementById("email").value = "";
                document.getElementById("telephone").value = "";
                document.getElementById("password").value = "";
                document.getElementById("confirm_password").value = "";

                $('.spinner-horizontals').css('display', 'none');
                swal("Bravoo!", "Utilisateur ajouté avec succès!", "success");

            } else {
                $('.spinner-horizontals').css('display', 'none');

                var res = JSON.parse(this.responseText);

                var arr = [];
                for (var i = res.length - 1; i >= 0; i--) {
                    arr[i] = res[i];
                }

                swal("Oops!", "" + arr, "error");
            }
        }
    };
    $('.spinner-horizontals').css('display', 'block');
    var nomPrenom = document.getElementById("nomPrenom").value;
    var email = document.getElementById("email").value;
    var telephone = document.getElementById("telephone").value;
    var sexe = document.getElementById("listsexes").value;
    var poste = document.getElementById("listpostes").value;
    var password = document.getElementById("password").value;
    var confirm = document.getElementById("confirm_password").value;
    //alert('poste'+ poste);
    //alert('structure'+ structure);

    var parameters = "method=creer&nomPrenom=" + nomPrenom + "&email=" + email + "&telephone=" + telephone + "&sexe=" + sexe + "&poste=" + poste + "&password=" + password + "&confirm=" + confirm;
    //var parameters="limit=5";
    xhttp.open("POST", "http://" + localStorage.getItem("cam") + "/asa/admin/responsables.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parameters);
}


function afficherLaListeDesResponsables() {
    chargerTb(10)
        .then((res) => {
            var arr = JSON.parse(res);
            var out = "";
            var i;
            for (i = 0; i < arr.length; i++) {
                out = '<tr id="responsable_' + arr[i].id_utilisateur + '">' +
                    '<th scope="row">' + (i+1) + '</th>' +
                    '<td>' + arr[i].nom_utilisateur + '</td>' +
                    '<td>' + arr[i].mail_utilisateur + '</td>' +
                    '<td>' + arr[i].tel_utilisateur + '</td>' +
                    '<td>' + unposte(arr[i].id_role) + '</td>' +
                    '<td>' +
                    '<div class="btn-group btn-group-xs dropup">' +
                    '<button type="button" class="btn btn-info btn-pretty dropdown-toggle" data-toggle="dropdown">' +
                    '<i class="fa fa-cog"></i> <span class="caret"></span>' +
                    '</button>' +
                    '<ul class="dropdown-menu dropdown-menu-right" role="menu">' +
                    '<li><a href="#" data-toggle="modal" data-target="#myModalUpdate_' + arr[i].id_utilisateur + '"><i class="fa fa-check text-success"></i> Modifier</a></li>' +
                    '<li><a href="#" data-toggle="modal" data-target="#myModal_' + arr[i].id_utilisateur + '"><i class="fa fa-trash text-danger"></i> Supprimer</a></li>' +
                    '</ul>' +
                    '<div class="modal fade" id="myModal_' + arr[i].id_utilisateur + '" role="dialog">' +
                    '<div class="modal-dialog">' +
                    '<div class="modal-content">' +
                    '<div class="modal-header">' +
                    '<button type="button" class="close" data-dismiss="modal">&times;</button>' +
                    '<h4 class="modal-tselectedtypestructureitle">Supprimer ' + arr[i].nom_utilisateur + '?</h4>' +
                    '</div>' +
                    '<div class="modal-body">' +
                    '<p><button type="button" class="btn btn-warning btn-lg" onclick="supprimerResponsable(' + arr[i].id_utilisateur + ')">Supprimer</button>' +
                    '<button type="button" class="btn btn-info btn-lg" style="margin-left:10px;">Annuller</button></p>' +
                    '</div>' +
                    '<div class="modal-footer">' +
                    '<button type="button" class="btn btn-default" data-dismiss="modal">Fermer</button>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="modal fade" id="myModalUpdate_' + arr[i].id_utilisateur + '" role="dialog">' +
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
                    '<input type="text" class="form-control" id="nom' + arr[i].id_utilisateur + '" value=' + arr[i].nom_utilisateur + ' style="width:100%">'+ 
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<br>' +

                    '<div class="row">' +
                    '<div class="form-group col-md-12">' +
                    '<div class="col-md-3">' +
                    '<label for="message-text" class="col-form-label">Adresse mail :</label>' +
                    '</div>' +
                    '<div class="col-md-9">' +
                    '<input type="text" class="form-control" id="email' + arr[i].id_utilisateur + '" value=' + arr[i].mail_utilisateur + ' style="width: 100%">' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<br>' +

                    '<div class="row">' +
                    '<div class="form-group col-md-12">' +
                    '<div class="col-md-3">' +
                    '<label for="message-text" class="col-form-label">Téléphone :</label>' +
                    '</div>' +
                    '<div class="col-md-9">' +
                    '<input type="text" class="form-control" id="telephone' + arr[i].id_utilisateur + '" value=' + arr[i].tel_utilisateur + ' style="width:100%">' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<br>' +

                    '<div class="row">' +
                    '<div class="form-group col-md-12">' +
                    '<div class="col-md-3">' +
                    '<label for="message-text" class="col-form-label">Role :</label>' +
                    '</div>' +
                    '<div class="col-md-9">' +
                    '<select onkeyup="verificationVide()" class="form-control" id="role' + arr[i].id_utilisateur + '" style="width: 100%">' +
                    '<option value=' + arr[i].id_role + '>' + unposte(arr[i].id_role) + '</option>' +
                    '</select>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<br>' +
                    '</form>' +
                    '</div>' +
                    '</div>' +
                    '<div class="modal-footer">' +
                    '<button type="button" class="btn btn-primary" onclick="modifierUtilisateur(' + arr[i].id_utilisateur + ')" data-dismiss="modal">Valider</button>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</td>' +
                    '</tr>';
                //alert(out);
                $('#listesdesresponsables').append(out);
            }
            initPage();
        })
        .catch((error) => {
            console.error(error)
        });
}

//-------------------
function modifierUtilisateur(k) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //return this.responseText;
            //alert(this.responseText);
            if (this.responseText == 1) {
                var Utilisateur = document.getElementById('responsable_' + k)

                Utilisateur.cells[1].innerText = x
                Utilisateur.cells[2].innerText = y
                Utilisateur.cells[3].innerText = z
                Utilisateur.cells[4].innerText = unposte(r)

                swal("Bravoo!", "Utilisateur modifié avec succès!", "success");
            } else {
                swal("Oops!", "Modification échouée, recommencez!", "error");
            }
        }
    };

    var x = document.getElementById('nom' + k + '').value;
    var y = document.getElementById('email' + k + '').value;
    var z = document.getElementById('telephone' + k + '').value;
    var r = document.getElementById('role' + k + '').value;

    var parameters = "method=modif&nom=" + x + "&email=" + y + "&telephone=" + z + "&role=" + r + "&id=" + k;
    //var parameters="limit=5";
    xhttp.open("POST", "http://" + localStorage.getItem("cam") + "/asa/admin/responsables.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parameters);
}