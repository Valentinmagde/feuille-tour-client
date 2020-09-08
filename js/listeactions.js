/*
* Projet : FEUILLE DE ROUTE MINESUP
* Code JAVASCRIPT : listeactions.js
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
    document.getElementById("enregistreraction").disabled = true; 
    localStorage.setItem('radioindicateur',k);
    localStorage.setItem('selectedindicateur',document.getElementById('denomination_indicateur').value);
    //verificationVide();
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

//---pour afficher la liste des responsables----
function unProgramme(k){ 
    //alert(k);
    var arr = JSON.parse(localStorage.getItem("BDprogramme"));
    var i; 
    for(i = 0; i < arr.length; i++) { 
        if (arr[i].id_programme == k) {
            return arr[i].denomination_programme;
        }
    }
}

function afficherLesOptionsDesResponsables(){
    var arr = JSON.parse(localStorage.getItem("BDresponsable"));  
    var i; 
    for(i = 0; i < arr.length; i++) { 
        document.getElementById("nom_responsable").innerHTML += '<option value="'+arr[i].id_responsable+'">'+arr[i].nom_responsable+'</option>'; 
    }
}

function afficherLesOptionsDesProgrammesModal(k){
    var arr = JSON.parse(localStorage.getItem("BDprogramme")); 
    var i; 
    for(i = 0; i < arr.length; i++) { 
        document.getElementById('programme'+k+'').innerHTML += '<option value="'+arr[i].id_programme+'">'+arr[i].denomination_programme+'</option>'; 
    }
}

function modalAction(k) {
  afficherLesOptionsDesProgrammesModal(k);
}

function selectedResponsables(k){
    document.getElementById("enregistreraction").disabled = true; 
    localStorage.setItem('radioresponsable',k);
    localStorage.setItem('selectedresponsable',document.getElementById('nom_responsable').value);
    //verificationVide();
}

//-------Supprimer une activté------------
function supprimerActions(k){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        //return this.responseText;
        //alert(this.responseText);
      if (this.responseText==3) { $('#action_'+k).hide(1000); listeActions();}
      }
    };
    var parameters="method=suppr&id="+k;
    //var parameters="limit=5";
    xhttp.open("POST", "http://"+localStorage.getItem("cam")+"/asa/actions.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parameters);
}

//-------Afficher la liste des actions--------
function pageListeActions(){
    setTimeout(function () {  
        var arr = JSON.parse(localStorage.getItem("BDaction"));               
        var out = "";
        var i;
      for(i = 0; i < arr.length; i++) { 
            out = '<tr id="action_'+arr[i].id_action+'">'+
                  '<th scope="row">'+arr[i].id_action+'</th>'+
                  '<td>'+arr[i].code_action+'</td>'+
                  '<td>'+arr[i].denomination_action+'</td>'+
                  '<td>'+arr[i].indicateur_action+'</td>'+
                  '<td>'+unProgramme(arr[i].id_programme)+'</td>'+
                  '<td>'+
                      '<div class="btn-group btn-group-xs dropup">'+
                          '<button type="button" class="btn btn-info btn-pretty dropdown-toggle" data-toggle="dropdown">'+
                              '<i class="fa fa-cog"></i> <span class="caret"></span>'+
                          '</button>'+
                          '<ul class="dropdown-menu dropdown-menu-right" role="menu">'+
                              '<li><a href="#" onclick="modalAction('+arr[i].id_action+')" data-toggle="modal" data-target="#myModalUpdate_'+arr[i].id_action+'"><i class="fa fa-check text-success"></i> Modifier</a></li>'+
                              '<li><a href="#" onclick="confirmSupActions('+arr[i].id_action+');" data-toggle="modal" data-target="#myModal_'+arr[i].id_action+'"><i class="fa fa-trash text-danger"></i> Supprimer</a></li>'+
                          '</ul>'+
                          '<div class="modal fade" id="myModal_'+arr[i].id_action+'" role="dialog">'+
                            '<div class="modal-dialog">'+
                              '<div class="modal-content">'+
                                '<div class="modal-header">'+
                                  '<button type="button" class="close" data-dismiss="modal">&times;</button>'+
                                  '<h4 class="modal-title">Supprimer '+arr[i].denomination_action+'?</h4>'+
                                '</div>'+
                                '<div class="modal-body">'+
                                  '<p><button type="button" class="btn btn-warning btn-lg" onclick="supprimerActions('+arr[i].id_action+')">Supprimer</button>'+
                                  '<button type="button" class="btn btn-info btn-lg" style="margin-left:10px;">Annuller</button></p>'+
                                '</div>'+
                                '<div class="modal-footer">'+
                                  '<button type="button" class="btn btn-default" data-dismiss="modal">Fermer</button>'+
                                '</div>'+
                              '</div>'+      
                            '</div>'+
                          '</div>'+
                      '</div>'+
                      '<div class="modal fade" id="myModalUpdate_'+arr[i].id_action+'" role="dialog" aria-labelledby="gridSystemModalLabel" aria-hidden="true">'+
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
                                      '<label for="recipient-name" class="col-sm-3 control-label">Code :</label>'+
                                      '<div class="col-sm-9">'+
                                          '<input type="text" class="form-control" id="code'+arr[i].id_action+'" value='+arr[i].code_action+' style="width: 100%;">'+
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
                                          '<textarea type="text" class="form-control" id="denomination'+arr[i].id_action+'" style="width: 100%;">'+arr[i].denomination_action+'</textarea>'+
                                      '</div>'+
                                    '</div>'+
                                  '</div>'+
                                  '<br>'+
                                  '<div class="row">'+
                                    '<div class="form-group col-md-12">'+
                                      '<div class="col-md-3">'+
                                        '<label for="message-text" class="col-form-label">Indicateur de performance :</label>'+
                                      '</div>'+
                                      '<div class="col-md-9">'+
                                          '<textarea type="text" class="form-control" id="indicateur'+arr[i].id_action+'" style="width: 100%;">'+arr[i].indicateur_action+'</textarea>'+
                                      '</div>'+
                                    '</div>'+
                                  '</div>'+
                                  '<br>'+
                                  '<div class="row">'+
                                    '<div class="form-group col-md-12">'+
                                      '<div class="col-md-3">'+
                                        '<label for="message-text" class="col-form-label">Programme :</label>'+
                                      '</div>'+
                                      '<div class="col-md-9">'+
                                          '<select onkeyup="verificationVide()" class="form-control" id="programme'+arr[i].id_action+'" style="width: 100%;">'+
                                              '<option value='+arr[i].id_programme+'>'+unProgramme(arr[i].id_programme)+'</option>'+                                   
                                          '</select>'+
                                      '</div>'+
                                    '</div>'+
                                  '</div>'+
                                  '<br>'+
                                '</form>'+
                              '</div>'+
                            '</div>'+
                            '<div class="modal-footer">'+
                              '<button type="button" class="btn btn-primary" onclick="modifierAction('+arr[i].id_action+')" data-dismiss="modal">Valider</button>'+
                            '</div>'+
                            '</div>'+      
                          '</div>'+
                        '</div>'+
                    '</div>'+
                  '</td>'+
              '</tr>';
                  //alert(out);
        $('#listesdesactions').append(out);
      }
      initPage();
      //setTimeout(function () { app.dialog.close(); }, 1000);
      }, 1000);
}
//-------------------
function modifierAction(k){
          var xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
              //return this.responseText;
              //alert(this.responseText);
            if (this.responseText==1) { 
                swal("Bon travail!", "Action modifié avec succès!", "success");
              }
              else{
                swal("Mauvais travail!", "Modification échouée, recommencez!", "error");
              }
            }
          };
          
          var x = document.getElementById('code'+k+'').value;
          var y = document.getElementById('denomination'+k+'').value;
          var z = document.getElementById('indicateur'+k+'').value;
          var t = document.getElementById('programme'+k+'').value;

          var parameters="method=modif&code="+x+"&intitule="+y+"&indicateur="+z+"&programme="+t+"&id="+k;
          //var parameters="limit=5";
          xhttp.open("POST", "http://"+localStorage.getItem("cam")+"/asa/actions.php", true);
          xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
          xhttp.send(parameters);
}