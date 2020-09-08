/*
* Projet : FEUILLE DE ROUTE MINESUP
* Code JAVASCRIPT : actions.js
************************************************
* Auteur : Valentin Magde,Demasso James,Nebo Djomche Joress
* E-mails : <valentinmagde@gmail.com>
*/

//Vérification du formulaire
function verificationEstVide(){
    var code_action = document.getElementById("code_action").value;
    var denomination_action = document.getElementById("denomination_action").value;
    var denomination_programme = document.getElementById("denomination_programme").value;
    var indicateur_action = document.getElementById("indicateur_action").value;

    if (code_action.length == 0 || denomination_action.length == 0 || denomination_programme.length == 0 || indicateur_action.length == 0) {
         document.getElementById("enregistreraction").disabled = true;
    }else{
        document.getElementById("enregistreraction").disabled = false;
    }
}

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
//---pour afficher la liste des indicateurs----
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

function afficherLesOptionsDesIndicateurs(){
var arr = JSON.parse(localStorage.getItem("BDindicateur"));                
    var out = "";
    var i; 
    for(i = 0; i < arr.length; i++) { 
    document.getElementById("denomination_indicateur").innerHTML += '<option value="'+arr[i].id_indicateur+'">'+arr[i].denomination_indicateur+'</option>'; 
    }
}
function afficherLesOptionsDesProgramme(){
var arr = JSON.parse(localStorage.getItem("BDprogramme"));                
    var out = "";
    var i; 
    for(i = 0; i < arr.length; i++) { 
    document.getElementById("denomination_programme").innerHTML += '<option value="'+arr[i].id_programme+'">'+arr[i].denomination_programme+'</option>'; 
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

function afficherLesOptionsDesResponsables(){
    var arr = JSON.parse(localStorage.getItem("BDresponsable"));  
    var i; 
    for(i = 0; i < arr.length; i++) { 
        document.getElementById("nom_responsable").innerHTML += '<option value="'+arr[i].id_responsable+'">'+arr[i].nom_responsable+'</option>'; 
    }
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

//----Modifier une activité--------
function afficheModifActions(k){
    //alert('ici modification activité');
      localStorage.setItem('actionamodifier',k);
      var arr = JSON.parse(localStorage.getItem("BDaction"));                
      var out = "";
      var i; 
      for(i = 0; i < arr.length; i++){ 
          if (arr[i].id_action == k){
            //alert(arr[i].code_action);
              document.getElementById("code_action").value = arr[i].code_action;
              document.getElementById("denomination_action").value = arr[i].denomination_action;
              document.getElementById("denomination_indicateur").value = arr[i].id_indicateur; 
              document.getElementById("nom_responsable").value = arr[i].id_responsable; 
              document.getElementById("indicateur_action").value = arr[i].indicateur_action; 
              document.getElementById("enregistreraction").disabled = false;     
          }
      }
  }

//-------Afficher la liste des actions--------
function afficheListeActions(){
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
                  '<td>'+unresponsable(arr[i].id_responsable)+'</td>'+
                  '<td>'+
                      '<div class="btn-group btn-group-xs dropup">'+
                          '<button type="button" class="btn btn-info btn-pretty dropdown-toggle" data-toggle="dropdown">'+
                              '<i class="fa fa-cog"></i> <span class="caret"></span>'+
                          '</button>'+
                          '<ul class="dropdown-menu dropdown-menu-right" role="menu">'+
                              '<li><a href="#" onclick="afficheModifActions('+arr[i].id_action+')"><i class="fa fa-check text-success"></i> Modifier</a></li>'+
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
                  '</td>'+
              '</tr>';
                  //alert(out);
        $('#listesdesactions').append(out);
      }
      initPage();
      //setTimeout(function () { app.dialog.close(); }, 1000);
      }, 1000);
}

//---------Affiche le dernier enregistrement----------
function dernierEnregistrementActions(){
    setTimeout(function () { 
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
              if (this.readyState == 4 && this.status == 200) {
                //alert(this.responseText);
                  var arr = JSON.parse(this.responseText);                
                  var out = "";
                  var i;
                for(i = 0; i < arr.length; i++) {                  
                out = '<tr id="action_'+arr[i].id_action+'">'+
                      '<th scope="row">'+arr[i].id_action+'</th>'+
                      '<td>'+arr[i].code_action+'</td>'+
                      '<td>'+arr[i].denomination_action+'</td>'+
                      '<td>'+arr[i].indicateur_action+'</td>'+
                      '<td>'+unindicateur(arr[i].id_indicateur)+'</td>'+
                      '<td>'+unresponsable(arr[i].id_responsable)+'</td>'+
                      '<td>'+
                          '<div class="btn-group btn-group-xs dropup">'+
                              '<button type="button" class="btn btn-info btn-pretty dropdown-toggle" data-toggle="dropdown">'+
                                  '<i class="fa fa-cog"></i> <span class="caret"></span>'+
                              '</button>'+
                              '<ul class="dropdown-menu dropdown-menu-right" role="menu">'+
                                  '<li><a href="#" onclick="afficheModifActions('+arr[i].id_action+')"><i class="fa fa-check text-success"></i> Modifier</a></li>'+
                                  '<li><a href="#" onclick="confirmSupActions('+arr[i].id_action+');" data-toggle="modal" data-target="#myModal_'+arr[i].id_action+'"><i class="fa fa-trash text-danger"></i> Supprimer</a></li>'+
                              '</ul>'+
                              '<div class="modal fade" id="myModal_'+arr[i].id_action+'" role="dialog">'+
                                '<div class="modal-dialog">'+
                                  '<div class="modal-content">'+
                                    '<div class="modal-header">'+
                                      '<button type="button" class="close" data-dismiss="modal">&times;</button>'+
                                      '<h4 class="modal-title">Supprimer '+arr[i].denomination_action
                                      +'?</h4>'+
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
                      '</td>'+
                  '</tr>';
                   $('#listesdesactions').prepend(out);
                }
                setTimeout(function () { }, 1000);}
            };
            var parameters="method=dernier";
            //var parameters="limit=5";
            xhttp.open("POST", "http://"+localStorage.getItem("cam")+"/asa/actions.php", true);
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhttp.send(parameters);
    }, 1000);
}

function enregistrerActions(){
    if (localStorage.getItem('actionamodifier') == "" || localStorage.getItem('actionamodifier') == null) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
                  //return this.responseText;
                  //alert(this.responseText);
            if (this.responseText==2) { 
              dernierEnregistrementActions();listeActions();localStorage.setItem('selectedindicateur',"");localStorage.setItem('selectedresponsable',"");
              document.getElementById("code_action").value="";
              document.getElementById("denomination_action").value="";
              document.getElementById("indicateur_action").value="";
              document.getElementById("denomination_programme").value="";
              localStorage.setItem("selectedindicateur","");
              localStorage.setItem("selectedresponsable","");

              swal("Bravoo!", "Action ajoutée avec succès!", "success");
            }
            else{
              swal("Oops!", "Ajout échoué, recommencez!", "error");
            }
          }
        };
    
        var code_action = document.getElementById("code_action").value;
        var denomination_action = document.getElementById("denomination_action").value;
        var indicateur_action = document.getElementById("indicateur_action").value;
        var denomination_programme = document.getElementById("denomination_programme").value;
    
        var parameters="method=creer&code_action="+code_action+"&denomination_action="+denomination_action+"&indicateur_action="+indicateur_action+"&denomination_programme="+denomination_programme;
        //var parameters="limit=5";
        xhttp.open("POST", "http://"+localStorage.getItem("cam")+"/asa/actions.php", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(parameters);
    
      }else{
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            //return this.responseText;
            //alert(this.responseText);
          if (this.responseText==1) { 
            var code_action = document.getElementById("code_action").value;
            var denomination_action = document.getElementById("denomination_action").value;
            var indicateur_action = document.getElementById("indicateur_action").value;
            var denomination_indicateur = document.getElementById("denomination_programme").value;
            var id = localStorage.getItem("actionamodifier");
            setTimeout(function () { 
            document.getElementById("action_"+id).innerHTML = '<th scope="row">'+id+'</th>'+
                                                          '<td>'+code_action+'</td>'+
                                                          '<td>'+denomination_action+'</td>'+
                                                          '<td>'+indicateur_action+'</td>'+
                                                          '<td>'+unindicateur(denomination_indicateur)+'</td>'+
                                                          '<td>'+unresponsable(nom_responsable)+'</td>'+
                                                          '<td>'+
                                                          '<div class="btn-group btn-group-xs dropup">'+
                                                                  '<button type="button" class="btn btn-info btn-pretty dropdown-toggle" data-toggle="dropdown">'+
                                                                      '<i class="fa fa-cog"></i> <span class="caret"></span>'+
                                                                  '</button>'+
                                                                  '<ul class="dropdown-menu dropdown-menu-right" role="menu">'+
                                                                      '<li><a href="#" onclick="afficheModifActions('+id+')"><i class="fa fa-check text-success"></i> Modifier</a></li>'+
                                                                      '<li><a href="#" onclick="confirmSupActions('+id+');" data-toggle="modal" data-target="#myModal_'+id+'"><i class="fa fa-trash text-danger"></i> Supprimer</a></li>'+
                                                                  '</ul>'+
                                                                  '<div class="modal fade" id="myModal_'+id+'" role="dialog">'+
                                                                    '<div class="modal-dialog">'+
                                                                      '<div class="modal-content">'+
                                                                        '<div class="modal-header">'+
                                                                          '<button type="button" class="close" data-dismiss="modal">&times;</button>'+
                                                                          '<h4 class="modal-title">Supprimer '+denomination_action+'?</h4>'+
                                                                        '</div>'+
                                                                        '<div class="modal-body">'+
                                                                          '<p><button type="button" class="btn btn-warning btn-lg" onclick="supprimerActions('+id+')">Supprimer</button>'+
                                                                          '<button type="button" class="btn btn-info btn-lg" style="margin-left:10px;">Annuller</button></p>'+
                                                                        '</div>'+
                                                                        '<div class="modal-footer">'+
                                                                          '<button type="button" class="btn btn-default" data-dismiss="modal">Fermer</button>'+
                                                                        '</div>'+
                                                                      '</div>'+      
                                                                    '</div>'+
                                                                  '</div>'+
                                                              '</div>'+
                                                          '</td>';
          listeActions();
          document.getElementById("code_action").value="";
          document.getElementById("denomination_action").value="";
          document.getElementById("indicateur_action").value="";
          document.getElementById("denomination_programme").value="";
          localStorage.setItem("actionamodifier","");
          document.getElementById("enregistreraction").disabled=true;
        }, 1000);
      }
    }
      };
        var code_action = document.getElementById("code_action").value;
        var denomination_action = document.getElementById("denomination_action").value;
        var indicateur_action = document.getElementById("indicateur_action").value;
        var denomination_indicateur = document.getElementById("denomination_programme").value;
        var k = localStorage.getItem("actionamodifier");
    
        var parameters="id="+k+"&method=modif&code_action="+code_action+"&denomination_action="+denomination_action+"&indicateur_action="+indicateur_action+"&denomination_programme="+denomination_programme;
        //var parameters="limit=5";
        xhttp.open("POST", "http://"+localStorage.getItem("cam")+"/asa/actions.php", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(parameters); 
      }
}