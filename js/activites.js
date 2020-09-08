/*
* Projet : FEUILLE DE ROUTE MINESUP
* Code JAVASCRIPT : activites.js
************************************************
* Auteur : Valentin Magde,Demasso James,Nebo Djomche Joress
* E-mails : <valentinmagde@gmail.com>
*/

//Vérification du formulaire
function verificationEstVide(){
    var code_activite = document.getElementById("code_activite").value;
    var denomination_activite = document.getElementById("denomination_activite").value;
    var resultatj_activite = document.getElementById("resultatj_activite").value;
    var resultatd_activite = document.getElementById("resultatd_activite").value;
    var denomination_action = document.getElementById("denomination_action").value;

    if (code_activite.length == 0 || denomination_activite.length == 0 || resultatj_activite.length == 0|| resultatd_activite.length == 0) {
         document.getElementById("enregistreractivite").disabled = true;
    }else{
        document.getElementById("enregistreractivite").disabled = false;
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

//---pour afficher la liste des indicateurs----
function afficherLesOptionsDesIndicateurs(){
var arr = JSON.parse(localStorage.getItem("BDindicateur"));                
    var out = "";
    var i; 
    for(i = 0; i < arr.length; i++) { 
    document.getElementById("denomination_indicateur").innerHTML += '<option value="'+arr[i].id_indicateur+'">'+arr[i].denomination_indicateur+'</option>'; 
    }
}

//---pour afficher la liste des actions----
function afficherLesOptionsDesActions(){
var arr = JSON.parse(localStorage.getItem("BDaction"));                
    var out = "";
    var i; 
    for(i = 0; i < arr.length; i++) { 
    document.getElementById("denomination_action").innerHTML += '<option value="'+arr[i].id_action+'">'+arr[i].denomination_action+'</option>'; 
    }
}

//---pour afficher la liste des indicateurs----
function selectedIndicateurs(k){
    document.getElementById("enregistreractivite").disabled = true; 
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

/*function afficherLesOptionsDesResponsables(){
    var arr = JSON.parse(localStorage.getItem("BDresponsable"));  
    var i; 
    for(i = 0; i < arr.length; i++) { 
        document.getElementById("nom_responsable").innerHTML += '<option value="'+arr[i].id_responsable+'">'+arr[i].nom_responsable+'</option>'; 
    }
}*/

//---pour afficher la liste des responsables----
function selectedResponsables(k){
    document.getElementById("enregistreractivite").disabled = true; 
    localStorage.setItem('radioresponsable',k);
    localStorage.setItem('selectedresponsable',document.getElementById('nom_responsable').value);
    //verificationVide();
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

//----Modifier une activité--------
function afficheModifActivite(k){
    //alert('ici modification activité');
      localStorage.setItem('activiteamodifier',k);
      var arr = JSON.parse(localStorage.getItem("BDactivite"));                
      var out = "";
      var i; 
      for(i = 0; i < arr.length; i++){ 
          if (arr[i].id_activite == k){
            //alert(arr[i].code_activite);
              document.getElementById("code_activite").value = arr[i].code_activite;
              document.getElementById("denomination_activite").value = arr[i].denomination_activite;
              document.getElementById("denomination_indicateur").value = arr[i].id_indicateur; 
              document.getElementById("nom_responsable").value = arr[i].id_responsable; 
              document.getElementById("enregistreractivite").disabled = false;     
          }
      }
  }

//-------Afficher la liste des activites--------
function afficheListeActivites(){
    setTimeout(function () {  
        var arr = JSON.parse(localStorage.getItem("BDactivite"));               
        var out = "";
        var i;
      for(i = 0; i < arr.length; i++) { 
            out = '<tr id="activite_'+arr[i].id_activite+'">'+
                  '<th scope="row">'+arr[i].id_activite+'</th>'+
                  '<td>'+arr[i].code_activite+'</td>'+
                  '<td>'+arr[i].denomination_activite+'</td>'+
                  '<td>'+unindicateur(arr[i].id_indicateur)+'</td>'+
                  '<td>'+unresponsable(arr[i].id_responsable)+'</td>'+
                  '<td>'+
                      '<div class="btn-group btn-group-xs dropup">'+
                          '<button type="button" class="btn btn-info btn-pretty dropdown-toggle" data-toggle="dropdown">'+
                              '<i class="fa fa-cog"></i> <span class="caret"></span>'+
                          '</button>'+
                          '<ul class="dropdown-menu dropdown-menu-right" role="menu">'+
                              '<li><a href="#" onclick="afficheModifActivite('+arr[i].id_activite+')"><i class="fa fa-check text-success"></i> Modifier</a></li>'+
                              '<li><a href="#" onclick="confirmSupActivite('+arr[i].id_activite+');" data-toggle="modal" data-target="#myModal_'+arr[i].id_activite+'"><i class="fa fa-trash text-danger"></i> Supprimer</a></li>'+
                          '</ul>'+
                          '<div class="modal fade" id="myModal_'+arr[i].id_activite+'" role="dialog">'+
                            '<div class="modal-dialog">'+
                              '<div class="modal-content">'+
                                '<div class="modal-header">'+
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
                  '</td>'+
              '</tr>';
                  //alert(out);
        $('#listedesactivites').append(out);
      }
      initPage();
      //setTimeout(function () { app.dialog.close(); }, 1000);
      }, 1000);
}

//---------Affiche le dernier enregistrement----------
function dernierEnregistrementActivite(){
    setTimeout(function () { 
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
              if (this.readyState == 4 && this.status == 200) {
                //alert(this.responseText);
                  var arr = JSON.parse(this.responseText);                
                  var out = "";
                  var i;
                for(i = 0; i < arr.length; i++) {                  
                out = '<tr id="activite_'+arr[i].id_activite+'">'+
                      '<th scope="row">'+arr[i].id_activite+'</th>'+
                      '<td>'+arr[i].code_activite+'</td>'+
                      '<td>'+arr[i].denomination_activite+'</td>'+
                      '<td>'+unindicateur(arr[i].id_indicateur)+'</td>'+
                      '<td>'+unresponsable(arr[i].id_responsable)+'</td>'+
                      '<td>'+
                          '<div class="btn-group btn-group-xs dropup">'+
                              '<button type="button" class="btn btn-info btn-pretty dropdown-toggle" data-toggle="dropdown">'+
                                  '<i class="fa fa-cog"></i> <span class="caret"></span>'+
                              '</button>'+
                              '<ul class="dropdown-menu dropdown-menu-right" role="menu">'+
                                  '<li><a href="#" onclick="afficheModifActivite('+arr[i].id_activite+')"><i class="fa fa-check text-success"></i> Modifier</a></li>'+
                                  '<li><a href="#" onclick="confirmSupActivite('+arr[i].id_activite+');" data-toggle="modal" data-target="#myModal_'+arr[i].id_activite+'"><i class="fa fa-trash text-danger"></i> Supprimer</a></li>'+
                              '</ul>'+
                              '<div class="modal fade" id="myModal_'+arr[i].id_activite+'" role="dialog">'+
                                '<div class="modal-dialog">'+
                                  '<div class="modal-content">'+
                                    '<div class="modal-header">'+
                                      '<button type="button" class="close" data-dismiss="modal">&times;</button>'+
                                      '<h4 class="modal-title">Supprimer '+arr[i].denomination_activite
                                      +'?</h4>'+
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
                      '</td>'+
                  '</tr>';
                   $('#listedesactivites').prepend(out);
                }
                setTimeout(function () { }, 1000);}
            };
            var parameters="method=dernier";
            //var parameters="limit=5";
            xhttp.open("POST", "http://"+localStorage.getItem("cam")+"/asa/activites.php", true);
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhttp.send(parameters);
    }, 1000);
}

//Enregistrement d'une activité
function enregistrerActivites(){
    if (localStorage.getItem('activiteamodifier') == "" || localStorage.getItem('activiteamodifier') == null) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
                  //return this.responseText;
                  //alert(this.responseText);
            if (this.responseText==2) { 
              dernierEnregistrementActivite();listeActivites();localStorage.setItem('selectedindicateur',"");localStorage.setItem('selectedresponsable',"");
              document.getElementById("code_activite").value="";
              document.getElementById("denomination_activite").value="";
              document.getElementById("resultatj_activite").value="";
              document.getElementById("resultatd_activite").value="";
              document.getElementById("denomination_action").value="Faites un choix";
              localStorage.setItem("selectedindicateur","");
              localStorage.setItem("selectedresponsable","");
              swal("Bon travail!", "activité ajoutée avec succès!", "success");
            }
            else{
              swal("Mauvais travail!", "Ajout échoué, recommencez!", "error");
            }
          }
        };
    
        var code_activite = document.getElementById("code_activite").value;
        var denomination_activite = document.getElementById("denomination_activite").value;
        var resultatj_activite = document.getElementById("resultatj_activite").value;
        var resultatd_activite = document.getElementById("resultatd_activite").value;
        var denomination_action = document.getElementById("denomination_action").value;
    
        var parameters="method=creer&code_activite="+code_activite+"&denomination="+denomination_activite+"&resultatj_activite="+resultatj_activite+"&resultatd_activite="+resultatd_activite+"&denomination_action="+denomination_action;
        //var parameters="limit=5";
        xhttp.open("POST", "http://"+localStorage.getItem("cam")+"/asa/activites.php", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(parameters);
    
      }else{
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            //return this.responseText;
            //alert(this.responseText);
          if (this.responseText==1) { 
            var code_activite = document.getElementById("code_activite").value;
            var denomination_activite = document.getElementById("denomination_activite").value;
            var resultatj_activite = document.getElementById("resultatj_activite").value;
            var resultatd_activite = document.getElementById("resultatd_activite").value;
            var denomination_action = document.getElementById("denomination_action").value;
    
            var id = localStorage.getItem("activiteamodifier");
            setTimeout(function () { 
              document.getElementById("activite_"+id).innerHTML = '<th scope="row">'+id+'</th>'+
                                                          '<td>'+code_activite+'</td>'+
                                                          '<td>'+denomination_activite+'</td>'+
                                                          '<td>'+unindicateur(denomination_indicateur)+'</td>'+
                                                          '<td>'+
                                                          '<div class="btn-group btn-group-xs dropup">'+
                                                                  '<button type="button" class="btn btn-info btn-pretty dropdown-toggle" data-toggle="dropdown">'+
                                                                      '<i class="fa fa-cog"></i> <span class="caret"></span>'+
                                                                  '</button>'+
                                                                  '<ul class="dropdown-menu dropdown-menu-right" role="menu">'+
                                                                      '<li><a href="#" onclick="afficheModifActivite('+id+')"><i class="fa fa-check text-success"></i> Modifier</a></li>'+
                                                                      '<li><a href="#" onclick="confirmSupActivite('+id+');" data-toggle="modal" data-target="#myModal_'+id+'"><i class="fa fa-trash text-danger"></i> Supprimer</a></li>'+
                                                                  '</ul>'+
                                                                  '<div class="modal fade" id="myModal_'+id+'" role="dialog">'+
                                                                    '<div class="modal-dialog">'+
                                                                      '<div class="modal-content">'+
                                                                        '<div class="modal-header">'+
                                                                          '<button type="button" class="close" data-dismiss="modal">&times;</button>'+
                                                                          '<h4 class="modal-title">Supprimer '+denomination_activite+'?</h4>'+
                                                                        '</div>'+
                                                                        '<div class="modal-body">'+
                                                                          '<p><button type="button" class="btn btn-warning btn-lg" onclick="supprimerActivite('+id+')">Supprimer</button>'+
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
          listeActivites();
          document.getElementById("code_activite").value="";
          document.getElementById("denomination_activite").value="";
          document.getElementById("resultatj_activite").value="";
          document.getElementById("resultatd_activite").value="";
          document.getElementById("denomination_indicateur").value="";
          localStorage.setItem("activiteamodifier","");
          document.getElementById("enregistreractivite").disabled=true;
        }, 1000);
      }
    }
      };
        var code_activite = document.getElementById("code_activite").value;
        var denomination_activite = document.getElementById("denomination_activite").value;
        var resultatj_activite = document.getElementById("resultatj_activite").value;
        var resultatd_activite = document.getElementById("resultatd_activite").value;
        var denomination_action = document.getElementById("denomination_action").value;
        var k = localStorage.getItem("activiteamodifier");
    
        var parameters="method=creer&code_activite="+code_activite+"&denomination="+denomination_activite+"&resultatj_activite="+resultatj_activite+"&resultatd_activite="+resultatd_activite+"&denomination_action="+denomination_action;
        //var parameters="limit=5";
        xhttp.open("POST", "http://"+localStorage.getItem("cam")+"/asa/activites.php", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(parameters); 
      }
}