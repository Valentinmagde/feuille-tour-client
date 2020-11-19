/*
 * Projet : FEUILLE DE ROUTE MINESUP
 * Code JAVASCRIPT : actions.js
 ************************************************
 * Auteur : Valentin Magde,Demasso James,Nebo Djomche Joress
 * E-mails : <valentinmagde@gmail.com>
 */

//Vérification du formulaire
function verificationProduitEstVide() {
    var quantite = document.getElementById("quantite").value;
    var prix = document.getElementById("prix").value;
    var listesproduit = document.getElementById("listeproduit").value;

    if ( quantite.length == 0 || listesproduit == 0 || prix.length == 0) {
        document.getElementById("ajoutPannier").disabled = true;
    } else {
        document.getElementById("ajoutPannier").disabled = false;
    }
}

function resetProduit() {
    document.getElementById("qte").value = "";
    document.getElementById("prix").value = "";
  
}

function afficherLesOptionsDesProduits() {
    chargerTb(8)
        .then((res) => {
            var arr = JSON.parse(res);
            var i;
            for (i = 0; i < arr.length; i++) {
                document.getElementById("listeproduit").innerHTML += "<option value='" + JSON.stringify(arr[i]) + "'>" + arr[i].designation+ "</option>";
            }
        })

}

function fetchPrice(){
    var produit = document.getElementById("listeproduit").value;
    document.getElementById("prix").value = JSON.parse(produit).prix;
}

var panniers = new Array()

function ajoutProduit(){
    var quantite = document.getElementById("quantite").value;
    var prix = document.getElementById("prix").value;
    var produit = document.getElementById("listeproduit").value;
    var designation = JSON.parse(produit).designation;

    if(localStorage.getItem('panniers'))
        panniers = JSON.parse(localStorage.getItem('panniers'))


    panniers.push(
        {
            designation: designation,
            prix: prix,
            quantite: quantite
        }
    )

    localStorage.setItem('panniers', JSON.stringify(panniers))

    affichePannier()
}

function suppressionProduit(index){
    if(localStorage.getItem('panniers'))
        panniers = JSON.parse(localStorage.getItem('panniers'))

    panniers.splice(index, 1)

    localStorage.setItem('panniers', JSON.stringify(panniers))
    $('#pannier_' + index).hide(1000)
    affichePannier()
}

function validerVente(){
    alert('Fonctionnalité en cours...')
}
//-------Afficher la liste des actions--------
function affichePannier() {
    let arr = []
    var out = "";
    if(localStorage.getItem('panniers'))
        arr = JSON.parse(localStorage.getItem('panniers'))

    if(arr.length){
        let i=0
        let total = 0
        document.getElementById('listevente').innerHTML = ''
        arr.forEach(pannier=>{
            out = '<tr id="pannier_' + i + '">' +
                '<th scope="row">' + (parseInt(i)+1) + '</th>' +
                '<td>' + pannier.designation + '</td>' +
                '<td>' + pannier.prix + ' FCFA</td>' +
                '<td>' + pannier.quantite +'</td>' +
                '<td>' + (pannier.quantite *  pannier.prix)+ ' FCFA</td>' +
                '<td>'+
                    '<button onclick="suppressionProduit('+i+')" class="btn btn-danger btn-pretty btn-xs"><i class="fa fa-trash"></i> Supprimer</button>'+
                '</td>' +
                '</tr>';
                total += (pannier.quantite *  pannier.prix)
            $('#listevente').append(out);
            i++
        })
        document.getElementById('totalvente').innerHTML =  `${total} FCFA`;
        document.getElementById('validerVente').disabled = false;
    }
    else{
        $('#listevente').append("");
        document.getElementById('totalvente').innerHTML =  `${0} FCFA`;
        document.getElementById('validerVente').disabled = true;
    }
    
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

    

   

