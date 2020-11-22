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
            /* afficherLesOptionsDesCiterne(JSON.parse(this.responseText)) */
            document.getElementById('listesdesstockes').innerHTML = ''
            var arr = JSON.parse(this.responseText);
            var out = "";
            var stockes = []
            var i;
            for (i = 0; i < arr.length; i++) {
                if(arr[i].quantite_stocke <= 500){
                    stockes.push(uneCiterne(arr[i].id_citerne))
                }
                out = '<tr id="stocke_' + arr[i].id + '">' +
                    '<th scope="row">' + (i + 1) + '</th>' +
                    '<td>' + arr[i].quantite_stocke + '</td>' +
                    '<td>' + arr[i].date_creation + '</td>' +
                    '<td id="' + arr[i].id_citerne + '">' + uneCiterne(arr[i].id_citerne) + '</td>' +
                    '</tr>';
                //alert(out);
                $('#listesdesstockes').append(out);
            }
            
            if(stockes.length > 0){
                if(stockes.length == 1)
                    document.getElementById('stockealert').innerHTML += `<strong>Stocke d\'alert!</strong> Votre stocke ${stockes} a atteint un niveau critique.
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>`
                else
                    document.getElementById('stockealert').innerHTML = `<strong>Stocke d\'alert!</strong> Votre stockes ${stockes} ont atteint un niveau critique.
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>`
                
                document.getElementById('stockealert').style.display = 'block'
                playSound('../../mp3/stock_alert.mp3')
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


function afficherLesOptionsDesCiterne() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var arr = JSON.parse(this.responseText);
            var i;
            for (i = 0; i < arr.length; i++) {
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

function playSound(url) {
    const audio = new Audio(url);
    audio.play();
}