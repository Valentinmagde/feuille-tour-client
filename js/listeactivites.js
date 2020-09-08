/*
* Projet : FEUILLE DE ROUTE MINESUP
* Code JAVASCRIPT : listeactivites.js
************************************************
* Auteur : Valentin Magde,Demasso James,Nebo Djomche Joress
* E-mails : <valentinmagde@gmail.com>
*/

//---pour afficher la liste des indicateurs----
function unindicateur(k){ 
    //alert(k);
      var arr = JSON.parse(localStorage.getItem("BDindicateur"));
      var i; 
      for(i = 0; i < arr.length; i++) { 
            if (arr[i].id_indicateur == k) {
              return arr[i].denomination_indicateur;
            }
       }
  }

function afficherLesOptionsDesIndicateurs(){
var arr = JSON.parse(localStorage.getItem("BDindicateur"));                
    var out = "";
    var i; 
    for(i = 0; i < arr.length; i++) { 
    document.getElementById("denomination_indicateur").innerHTML += '<option value="'+arr[i].id_indicateur+'">'+arr[i].denomination_indicateur+'</option>'; 
    }
}

function selectedIndicateurs(k){
    document.getElementById("enregistreractivite").disabled = true; 
    localStorage.setItem('radioindicateur',k);
    localStorage.setItem('selectedindicateur',document.getElementById('denomination_indicateur').value);
    //verificationVide();
}

//---pour afficher la liste des actions----
function uneAction(k){ 
    //alert(k);
      var arr = JSON.parse(localStorage.getItem("BDaction"));
      var i; 
      for(i = 0; i < arr.length; i++) { 
            if (arr[i].id_action == k) {
              return arr[i].denomination_action;
            }
       }
  }

//---pour afficher la liste des responsables----
function unresponsable(k){ 
    //alert(k);
    var arr = JSON.parse(localStorage.getItem("BDresponsable"));
    var i; 
    for(i = 0; i < arr.length; i++) { 
        if (arr[i].id_responsable == k) {
            return arr[i].nom_responsable;
        }
    }
}

function afficherLesOptionsDesActionsModal(k){
  var arr = JSON.parse(localStorage.getItem("BDaction"));                
    var out = "";
    var i; 
    for(i = 0; i < arr.length; i++) { 
      document.getElementById('action'+k+'').innerHTML += '<option value="'+arr[i].id_action+'">'+arr[i].denomination_action+'</option>'; 
    }
}
function afficherLesOptionsDesIndicateursModal(k){
  var arr = JSON.parse(localStorage.getItem("BDindicateur"));                
    var out = "";
    var i; 
    for(i = 0; i < arr.length; i++) { 
      document.getElementById('indicateur'+k+'').innerHTML += '<option value="'+arr[i].id_indicateur+'">'+arr[i].denomination_indicateur+'</option>'; 
    }
}

function modal(k){
  afficherLesOptionsDesActionsModal(k);
  afficherLesOptionsDesIndicateursModal(k);
}

function selectedResponsables(k){
    document.getElementById("enregistreractivite").disabled = true; 
    localStorage.setItem('radioresponsable',k);
    localStorage.setItem('selectedresponsable',document.getElementById('nom_responsable').value);
    //verificationVide();
}

//-------Afficher la liste des activites--------
function pageListeActivites(){
    setTimeout(function () {  
        var arr = JSON.parse(localStorage.getItem("BDactivite"));               
        var out = "";
        var i;
      for(i = 0; i < arr.length; i++) { 
            out = '<tr id="activite_'+arr[i].id_activite+'">'+
                  '<th scope="row">'+arr[i].id_activite+'</th>'+
                  '<td>'+arr[i].code_activite+'</td>'+
                  '<td>'+arr[i].denomination_activite+'</td>'+
                  '<td>'+arr[i].resultatj_activite+'</td>'+
                  '<td>'+arr[i].resultatd_activite+'</td>'+
                  '<td>'+uneAction(arr[i].id_action)+'</td>'+
                  '<td>'+
                      '<div class="btn-group btn-group-xs dropup">'+
                          '<button type="button" class="btn btn-info btn-pretty dropdown-toggle" data-toggle="dropdown">'+
                              '<i class="fa fa-cog"></i> <span class="caret"></span>'+
                          '</button>'+
                          '<ul class="dropdown-menu dropdown-menu-right" role="menu">'+
                              '<li><a href="#" onclick="modal('+arr[i].id_activite+')" data-toggle="modal" data-target="#myModalUpdate_'+arr[i].id_activite+'"><i class="fa fa-check text-success"></i> Modifier</a></li>'+
                              '<li><a href="#" onclick="confirmSupActivite('+arr[i].id_activite+');" data-toggle="modal" data-target="#myModal_'+arr[i].id_activite+'"><i class="fa fa-trash text-danger"></i> Supprimer</a></li>'+
                          '</ul>'+
                          '<div class="modal fade" id="myModal_'+arr[i].id_activite+'" role="dialog">'+
                            '<div class="modal-dialog">'+
                              '<div class="modal-content">'+
                                '<div class="modal-header bg-primary">'+
                                  '<button type="button" class="close" data-dismiss="modal">&times;</button>'+
                                  '<h4 class="modal-title">Supprimer '+arr[i].denomination_activite+'?</h4>'+
                                '</div>'+
                                '<div class="modal-body">'+
                                  '<p><button type="button" class="btn btn-warning btn-lg" onclick="supprimerActivite('+arr[i].id_activite+')">Supprimer</button>'+
                                  '<button type="button" class="btn btn-info btn-lg" style="margin-left:10px;">Annuller</button></p>'+
                                '</div>'+
                                '<div class="modal-footer">'+
                                  '<button type="button" class="btn btn-default" data-dismiss="modal">Fermer</button>'+
                                '</div>'+
                              '</div>'+      
                            '</div>'+
                          '</div>'+
                      '</div>'+
                      '<div class="modal fade" id="myModalUpdate_'+arr[i].id_activite+'" role="dialog">'+
                        '<div class="modal-dialog">'+
                          '<div class="modal-content">'+
                            '<div class="modal-header">'+
                              '<button type="button" class="close" data-dismiss="modal">&times;</button>'+
                              '<h4 class="modal-title">Modification</h4>'+
                            '</div>'+
                            '<div class="modal-body">'+

                              '<div class="container-fluid">'+
                                '<form>'+
                                  '<div class="row">'+
                                    '<div class="form-group col-md-12">'+
                                      '<div class="col-sm-3">'+
                                          '<label for="recipient-name" class="col-form-label">Code :</label>'+
                                      '</div>'+
                                      '<div class="col-sm-9">'+
                                          '<input type="text" class="form-control" id="code'+arr[i].id_activite+'" value='+arr[i].code_activite+' style="width: 100%">'+
                                      '</div>'+
                                    '</div>'+
                                  '</div>'+
                                  '<br>'+

                                  '<div class="row">'+
                                    '<div class="form-group col-md-12">'+
                                      '<div class="col-md-3">'+
                                        '<label for="message-text" class="col-form-label">Denomination :</label>'+
                                      '</div>'+
                                      '<div class="col-md-9">'+
                                          '<textarea type="text" class="form-control" id="intitule'+arr[i].id_activite+'" style="width: 100%">'+arr[i].denomination_activite+'</textarea>'+
                                      '</div>'+
                                    '</div>'+
                                  '</div>'+
                                  '<br>'+

                                  '<div class="row">'+
                                    '<div class="form-group col-md-12">'+
                                      '<div class="col-md-3">'+
                                        '<label for="message-text" class="col-form-label">Résultats 31 juillet :</label>'+
                                      '</div>'+
                                      '<div class="col-md-9">'+
                                          '<textarea class="form-control" id="resultatj'+arr[i].id_activite+'" style="width: 100%">'+arr[i].resultatj_activite+'</textarea>'+
                                      '</div>'+
                                    '</div>'+
                                  '</div>'+
                                  '<br>'+

                                  '<div class="row">'+
                                    '<div class="form-group col-md-12">'+
                                      '<div class="col-md-3">'+
                                        '<label for="message-text" class="col-form-label">Résultats 31 décembre :</label>'+
                                      '</div>'+
                                      '<div class="col-md-9">'+
                                          '<textarea class="form-control" id="resultatd'+arr[i].id_activite+'" style="width: 100%">'+arr[i].resultatd_activite+'</textarea>'+
                                      '</div>'+
                                    '</div>'+
                                  '</div>'+
                                  '<br>'+

                                  '<div class="row">'+
                                    '<div class="form-group col-md-12">'+
                                      '<div class="col-md-3">'+
                                        '<label for="message-text" class="col-form-label">Action :</label>'+
                                      '</div>'+
                                      '<div class="col-md-9">'+
                                          '<select class="form-control" id="action'+arr[i].id_activite+'" style="width: 100%">'+
                                              '<option value='+arr[i].id_action+'>'+uneAction(arr[i].id_action)+'</option>'+                                   
                                          '</select>'+
                                      '</div>'+
                                    '</div>'+
                                  '</div>'+
                                  '<br>'+
                                '</form>'+
                              '</div>'+
                          
                            '</div>'+
                            '<div class="modal-footer">'+
                              '<button type="button" class="btn btn-primary" onclick="modifierActivite('+arr[i].id_activite+')" data-dismiss="modal">Valider</button>'+
                            '</div>'+
                            '</div>'+      
                          '</div>'+
                        '</div>'+
                    '</div>'+
                  '</td>'+
              '</tr>';
                  //alert(out);
        $('#listedesactivites').append(out);
      }
      initPage();
      //setTimeout(function () { app.dialog.close(); }, 1000);
      }, 1000);
}

//-------Supprimer une activté------------
function supprimerActivite(k){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        //return this.responseText;
        //alert(this.responseText);
      if (this.responseText==3) { $('#activite_'+k).hide(1000); listeActivites();}
      }
    };
    var parameters="method=suppr&id="+k;
    //var parameters="limit=5";
    xhttp.open("POST", "http://"+localStorage.getItem("cam")+"/asa/activites.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parameters);
}

//-------------------
function modifierActivite(k){
          var xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
              //return this.responseText;
              //alert(this.responseText);
            if (this.responseText==1) { 
                swal("Bon travail!", "Activité modifié avec succès!", "success");
              }
              else{
                swal("Mauvais travail!", "Modification échouée, recommencez!", "error");
              }
            }
          };
          
          var x = document.getElementById('code'+k+'').value;
          var y = document.getElementById('intitule'+k+'').value;
          var z = document.getElementById('resultatj'+k+'').value;
          var t = document.getElementById('resultatd'+k+'').value;
          var r = document.getElementById('action'+k+'').value;

          var parameters="method=modif&code="+x+"&intitule="+y+"&description="+z+"&indicateur="+t+"&action="+r+"&id="+k;
          //var parameters="limit=5";
          xhttp.open("POST", "http://"+localStorage.getItem("cam")+"/asa/activites.php", true);
          xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
          xhttp.send(parameters);
}