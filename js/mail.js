/*
 * Projet : FEUILLE DE ROUTE MINESUP
 * Code JAVASCRIPT : mail.js
 ************************************************
 * Auteur : Valentin Magde,Demasso James,Nebo Djomche Joress
 * E-mails : <valentinmagde@gmail.com>
 */

function verificationChampEstVide() {
    var recepteur = document.getElementById("mail_compose").value;
    var subject = document.getElementById("subject").value;
    var contenu = $("#summernote").code().replace(/<\/?[^>]+(>|$)/g, " ").trim();

    if (recepteur.length == 0 || subject.length == 0 || contenu.length == 0) {
        document.getElementById("envoi").disabled = true;
    } else {
        document.getElementById("envoi").disabled = false;
    }
}

//---pour afficher le d'un Utilisateur----
function unUtilisateur(k) {
    //alert(k);
    var arr = JSON.parse(localStorage.getItem("BDresponsable"));
    var i;
    for (i = 0; i < arr.length; i++) {
        if (arr[i].id_utilisateur == k) {
            return arr[i].nom_utilisateur;
        }
    }
}

//---pour afficher l'avatar d'un Utilisateur----
function avatarUtilisateur(k) {
    //alert(k);
    var arr = JSON.parse(localStorage.getItem("BDresponsable"));
    var i;
    for (i = 0; i < arr.length; i++) {
        if (arr[i].id_utilisateur == k) {
            return arr[i].avatar;
        }
    }
}

//---pour afficher le sexe d'un Utilisateur----
function avatarSexe(k) {
    var arr = JSON.parse(localStorage.getItem("BDresponsable"));
    var arr1 = JSON.parse(localStorage.getItem("BDsexe"));
    var i;
    var sexe;
    for (i = 0; i < arr.length; i++) {
        if (arr[i].id_utilisateur == k) {
            sexe = arr[i].sexe;
        }
    }

    for (i = 0; i < arr1.length; i++) {
        if (arr1[i].id_sexe == sexe) {
            return arr1[i].nom_sexe;
        }
    }
}
//---pour afficher l'adresse mail d'un utilisateur----
function unMail(k) {
    //alert(k);
    var arr = JSON.parse(localStorage.getItem("BDresponsable"));
    var i;
    for (i = 0; i < arr.length; i++) {
        if (arr[i].id_utilisateur == k) {
            return arr[i].mail_utilisateur;
        }
    }
}

function reset() {
    $("#SummernoteText").destroy();
    document.getElementById("mail_compose").value = '';
    document.getElementById("subject").value = '';
}
//Liste des mails des Responsables
function afficherLesOptionsDeMails() {
    var arr = JSON.parse(localStorage.getItem("BDresponsable"));
    var out = "";
    var i;
    for (i = 0; i < arr.length; i++) {
        document.getElementById("mail_compose").innerHTML += '<option value="' + arr[i].id_utilisateur + '">' + arr[i].mail_utilisateur + '</option>';
    }
}


//Liste des mails des Responsables
/*function afficherLesNotfications(){
  var arr = JSON.parse(localStorage.getItem("BDnotifications"));                
  var k = 0;

    for(var i = 0; i < arr.length; i++) { 
      if(arr[i].id_recepteur == localStorage.getItem('id') && arr[i].lecture_notif == 0 && arr[i].status_notif != 0){
        
        }
        k++;
      }
    document.getElementById("voir-plus").innerHTML = '';
    if (k > 0) {
      document.getElementById("voir-plus").innerHTML += '<a href="#lobimail" >Voir Plus</a>';
    }else{
      
    }
}*/

//Charger les notificationations
function chargerTable(k, l) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //return this.responseText;
            localStorage.setItem(l, this.responseText);
        }
    };
    var parameters = "k=" + k;
    //var parameters="limit=5";
    xhttp.open("POST", "http://" + localStorage.getItem("cam") + "/asa/chargerbd.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parameters);
}

function count() {
    chargerTable(13, "BDnotifications");
    var arr = JSON.parse(localStorage.getItem("BDnotifications"));
    var k = 0;
    document.getElementById("notif-content").innerHTML = '';
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].id_recepteur == localStorage.getItem('id') && arr[i].lecture_notif == 0 && arr[i].status_notif != 0) {
            document.getElementById("notif-content").innerHTML +=
                '<li onclick="lireNotif(' + arr[i].id_notif + ',' + 1 + ')" id="li_' + arr[i].id_notif + '">' +
                '<a href="#lobimail" data-action="open-email" data-key="1" class="notification">' +
                '<img class="notification-image" src="" alt="" id="user-avatar' + i + '">' +
                '<div class="notification-msg">' +
                '<h4 class="notification-heading">' + unUtilisateur(arr[i].id_emetteur) + '</h4>' +
                '<h5 class="notification-sub-heading">' + arr[i].sujet_notif + '</h5>' +
                '<p class="body-text">' + arr[i].contenu_notif + '</p>' +
                '</div>' +
                '<span class="notification-time">5 min. ago</span>' +
                '</a>' +
                '</li>';
            var x = document.getElementById('user-avatar' + i);

            if (avatarUtilisateur(arr[i].id_emetteur) == null) {
                if (avatarSexe(arr[i].id_emetteur) == "Masculin") {
                    x.setAttribute("src", "img/users/8.png");
                } else if (avatarSexe(arr[i].id_emetteur) == "Feminin") {
                    x.setAttribute("src", "img/users/9.jpg");
                }
            } else {
                x.setAttribute("src", "http://" + localStorage.getItem("cam") + "/asa/" + avatarUtilisateur(arr[i].id_emetteur))
            }
            k++;
        }
    }
    document.getElementById("voir-plus").innerHTML = '';
    if (k > 0) {
        document.getElementById("notif-count").innerHTML +=
            '<span class="badge badge-danger badge-xs">' + k + '</span>';
        document.getElementById("inbox-count").innerHTML +=
            '<span class="badge-wrapper"><span class="badge badge-xs badge-danger">' + k + '</span></span>';
        document.getElementById("voir-plus").innerHTML += '<a href="#lobimail" >Voir Plus</a>';
    } else {
        document.getElementById("voir-plus").innerHTML += '<a href="#lobimail" >Aucune notification</a>';
    }
}
setInterval(count, 10000);

function inbox() {
    var arr2 = JSON.parse(localStorage.getItem("BDnotifications"));
    var split = [];

    for (var i = 0; i < arr2.length; i++) {
        if (arr2[i].id_recepteur == localStorage.getItem('id')) {
            if (arr2[i].status_notif == 0) {
                split = arr2[i].date_notif.split(' ');
                document.getElementById("inbox").innerHTML +=
                    '<tr class="unread" data-key="' + arr2[i].id_notif + '" onclick="lireNotif(' + arr2[i].id_notif + ',' + 1 + ')" id="tr_' + arr2[i].id_notif + '">' +
                    '<td class="td-checkbox">' +
                    '<label class="checkbox-inline lobicheck">' +
                    '<input type="checkbox" name="">' +
                    '<i></i>' +
                    '</label>' +
                    '</td>' +
                    '<td class="td-star"><i class="fa fa-star-o"></i></td>' +
                    '<td class="td-sender">' + unUtilisateur(arr2[i].id_emetteur) + '</td>' +
                    '<td class="td-message">' + arr2[i].sujet_notif + ' - <small>' + arr2[i].contenu_notif + '</small></td>' +
                    /*'<td class="td-attachment"><i class="fa fa-paperclip"></i></td>'+*/
                    '<td class="td-time">' + split[0] + '</td>' +
                    '<td style="display: none;">' + arr2[i].id_notif + '</td>' +
                    '</tr>';
            }
        }
    }
}

function sent() {
    var arr3 = JSON.parse(localStorage.getItem("BDnotifications"));
    var split = [];

    for (var i = 0; i < arr3.length; i++) {
        if (arr3[i].id_emetteur == localStorage.getItem('id') && arr3[i].status_notif == 0) {
            split = arr3[i].date_notif.split(' ');
            document.getElementById("sent").innerHTML +=
                '<tr class="unread" href="#lobimail" data-action="open-email" data-key="' + arr3[i].id_notif + '" onclick="lireNotif(' + arr3[i].id_notif + ',' + 1 + ')" id="tr_' + arr3[i].id_notif + '">' +
                '<td class="td-checkbox">' +
                '<label class="checkbox-inline lobicheck">' +
                '<input type="checkbox" name="">' +
                '<i></i>' +
                '</label>' +
                '</td>' +
                '<td class="td-star"><i class="fa fa-star-o"></i></td>' +
                '<td class="td-sender">' + unUtilisateur(arr3[i].id_emetteur) + '</td>' +
                '<td class="td-message">' + arr3[i].sujet_notif + ' - <small>' + arr3[i].contenu_notif + '</small></td>' +
                /*'<td class="td-attachment"><i class="fa fa-paperclip"></i></td>'+*/
                '<td class="td-time">' + split[0] + '</td>' +
                '<td style="display: none;">' + arr3[i].id_notif + '</td>' +
                '</tr>';
        }
    }
}

function draft() {
    var arr4 = JSON.parse(localStorage.getItem("BDnotifications"));
    var split = [];
    for (var i = 0; i < arr4.length; i++) {
        if (arr4[i].id_emetteur == localStorage.getItem('id')) {
            if (arr4[i].status_notif == 2) {
                split = arr4[i].date_notif.split(' ');
                document.getElementById("draft").innerHTML +=
                    '<tr class="unread" href="#lobimail" data-action="open-email" data-key="' + arr4[i].id_notif + '" onclick="lireNotif(' + arr4[i].id_notif + ',' + 1 + ')" id="tr_' + arr4[i].id_notif + '">' +
                    '<td class="td-checkbox">' +
                    '<label class="checkbox-inline lobicheck">' +
                    '<input type="checkbox" name="">' +
                    '<i></i>' +
                    '</label>' +
                    '</td>' +
                    '<td class="td-star"><i class="fa fa-star-o"></i></td>' +
                    '<td class="td-sender">' + unUtilisateur(arr4[i].id_emetteur) + '</td>' +
                    '<td class="td-message">' + arr4[i].sujet_notif + ' - <small>' + arr4[i].contenu_notif + '</small></td>' +
                    /*'<td class="td-attachment"><i class="fa fa-paperclip"></i></td>'+*/
                    '<td class="td-time">' + split[0] + '</td>' +
                    '<td style="display: none;">' + arr4[i].id_notif + '</td>' +
                    '</tr>';
            }
        }
    }
}

function spam() {
    var arr5 = JSON.parse(localStorage.getItem("BDnotifications"));
    var split = [];
    for (var i = 0; i < arr5.length; i++) {
        if (arr5[i].id_emetteur == localStorage.getItem('id')) {
            if (arr5[i].status_notif == 3) {
                split = arr5[i].date_notif.split(' ');
                document.getElementById("spam").innerHTML +=
                    '<tr class="unread" href="#lobimail" data-action="open-email" data-key="' + arr5[i].id_notif + '" onclick="lireNotif(' + arr5[i].id_notif + ',' + 1 + ')" id="tr_' + arr5[i].id_notif + '">' +
                    '<td class="td-checkbox">' +
                    '<label class="checkbox-inline lobicheck">' +
                    '<input type="checkbox" name="">' +
                    '<i></i>' +
                    '</label>' +
                    '</td>' +
                    '<td class="td-star"><i class="fa fa-star-o"></i></td>' +
                    '<td class="td-sender">' + unUtilisateur(arr5[i].id_emetteur) + '</td>' +
                    '<td class="td-message">' + arr5[i].sujet_notif + ' - <small>' + arr5[i].contenu_notif + '</small></td>' +
                    /*'<td class="td-attachment"><i class="fa fa-paperclip"></i></td>'+*/
                    '<td class="td-time">' + split[0] + '</td>' +
                    '<td style="display: none;">' + arr5[i].id_notif + '</td>' +
                    '</tr>';
            }
        }
    }
}

function archive() {
    var arr6 = JSON.parse(localStorage.getItem("BDnotifications"));
    var split = [];
    for (var i = 0; i < arr6.length; i++) {
        if (arr6[i].id_emetteur == localStorage.getItem('id')) {
            if (arr6[i].status_notif == 4) {
                split = arr6[i].date_notif.split(' ');
                document.getElementById("archive").innerHTML +=
                    '<tr class="unread" href="#lobimail" data-action="open-email" data-key="' + arr6[i].id_notif + '" onclick="lireNotif(' + arr6[i].id_notif + ',' + 1 + ')" id="tr_' + arr6[i].id_notif + '" id="tr_' + arr6[i].id_notif + '">' +
                    '<td class="td-checkbox">' +
                    '<label class="checkbox-inline lobicheck">' +
                    '<input type="checkbox" name="">' +
                    '<i></i>' +
                    '</label>' +
                    '</td>' +
                    '<td class="td-star"><i class="fa fa-star-o"></i></td>' +
                    '<td class="td-sender">' + unUtilisateur(arr6[i].id_emetteur) + '</td>' +
                    '<td class="td-message">' + arr6[i].sujet_notif + ' - <small>' + arr6[i].contenu_notif + '</small></td>' +
                    /*'<td class="td-attachment"><i class="fa fa-paperclip"></i></td>'+*/
                    '<td class="td-time">' + split[0] + '</td>' +
                    '<td style="display: none;">' + arr6[i].id_notif + '</td>' +
                    '</tr>';
            }
        }
    }
}

function envoyerMessage() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //return this.responseText;
            //alert(this.responseText);
            if (this.responseText == 1) {
                swal("Bravoo!", "Message envoyé avec succès!", "success");
            } else {
                swal("Oops!", "envoi échoué, recommencez!", "error");
            }
        }
    };
    var x = document.getElementById('mail_compose').value;
    var y = document.getElementById('subject').value;
    var z = $("#summernote").code().replace(/<\/?[^>]+(>|$)/g, " ").trim();
    var t = localStorage.getItem('id');

    if (x.length == 0 || y.length == 0 || z.length == 0) {
        swal("Champ vide!", "veuillez remplir tous les champs!", "warning");
    } else {
        var parameters = "method=creer&id_recepteur=" + x + "&sujet=" + y + "&contenu=" + z + "&id_emetteur=" + t;
        //var parameters="limit=5";
        xhttp.open("POST", "http://" + localStorage.getItem("cam") + "/asa/mail.php", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(parameters);
    }
}

function lireNotif(k, l) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //return this.responseText;
            //alert(this.responseText);
            if (this.responseText == 1) {
                if (l == 1) {
                    $('#li_' + k).hide(1000);
                    /*localStorage.setItem('id_notif', k);*/
                    //window.location.replace("http://localhost:8080/supeval/pages/lobimail/message_view.html");
                }
            }
        }
    };

    localStorage.setItem('id_notif', k);
    var x = k;
    var y = l;

    var parameters = "method=modif&id=" + x + "&valeur=" + y;
    //var parameters="limit=5";
    xhttp.open("POST", "http://" + localStorage.getItem("cam") + "/asa/mail.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parameters);

}

function changerStatus(btn, k) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //return this.responseText;
            //alert(this.responseText);
            if (this.responseText == 1) {
                $('#tr_' + k).hide(1000);
            }
        }
    };

    var x = k;
    var y = btn;

    var parameters = "method=changer&id=" + x + "&valeur=" + y;
    //var parameters="limit=5";
    xhttp.open("POST", "http://" + localStorage.getItem("cam") + "/asa/mail.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parameters);

}

function checkedCells(id) {
    var index = [];
    var k = 0;

    //Loop through all checked Checkboxes in GridView
    $("#tableau input[type=checkbox]:checked").each(function() {
        var row = $(this).closest("tr")[0];
        /*index[k] = row.rowIndex;*/
        index[k] = row.cells[5].innerHTML;
        k++
    });
    for (var i = 0; i < index.length; i++) {
        changerStatus(id, index[i])
    }
}