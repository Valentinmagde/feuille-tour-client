/*
* Projet : FEUILLE DE ROUTE MINESUP
* Code JAVASCRIPT : utilisateurs.js
************************************************
* Auteur : Valentin Magde,Demasso James,Nebo Djomche Joress
* E-mails : <valentinmagde@gmail.com>
*/

function uneadministration(k){ 
  //alert(k);
    var arr = JSON.parse(localStorage.getItem("BDadministration"));
    var i; 
    for(i = 0; i < arr.length; i++) { 
          if (arr[i].id_administration == k) {
            return arr[i].denomination_administration;
          }
     }
}

function unestructure(k){ 
  //alert(k);
    var arr = JSON.parse(localStorage.getItem("BDstructure"));
    var i; 
    for(i = 0; i < arr.length; i++) { 
          if (arr[i].id_structure == k) {
            return arr[i].intitule_structure;
          }
     }
}

function unposte(k){ 
  //alert(k);
    var arr = JSON.parse(localStorage.getItem("BDrole"));
    //alert(localStorage.getItem("BDposte"));
    var i; 
    for(i = 0; i < arr.length; i++) { 
          if (arr[i].id_poste == k) {
            return arr[i].intitule_poste;
          }
     }
}

function unsexe(k){ 
  //alert(k);
    var arr = JSON.parse(localStorage.getItem("BDsexe"));
    //alert(localStorage.getItem("BDsexe"));
    var i; 
    for(i = 0; i < arr.length; i++) { 
          if (arr[i].id_sexe == k) {
            return arr[i].nom_sexe;
          }
     }
}

function afficherLesOptionsDeSexes(){
  var arr = JSON.parse(localStorage.getItem("BDsexe"));                
    var out = "";
    var i; 
    for(i = 0; i < arr.length; i++) { 
      document.getElementById("listsexes").innerHTML += '<option value="'+arr[i].id_sexe+'">'+arr[i].nom_sexe+'</option>'; 
    }
}

function afficherLesOptionsDeStructure(){
  var arr = JSON.parse(localStorage.getItem("BDstructure"));                
    var out = "";
    var i; 
    for(i = 0; i < arr.length; i++) { 
      document.getElementById("liststructures").innerHTML += '<option value="'+arr[i].id_structure+'">'+arr[i].intitule_structure+'</option>'; 
    }
}

function afficherLesOptionsDePostes(){
  var arr = JSON.parse(localStorage.getItem("BDrole"));                
    var out = "";
    var i; 
    for(i = 0; i < arr.length; i++) { 
      document.getElementById("listpostes").innerHTML += '<option value="'+arr[i].id_poste+'">'+arr[i].intitule_poste+'</option>'; 
    }
}

function selectedSexe(k){
  document.getElementById("enregistrerleresponsable").disabled = true; 
  localStorage.setItem('radiosexe',k);
  localStorage.setItem('selectedsexe',document.getElementById('listsexes').value);
  verificationVide();
}

function selectedPoste(k){
  document.getElementById("enregistrerleresponsable").disabled = true; 
  localStorage.setItem('radioposte',k);
  localStorage.setItem('selectedposte',document.getElementById('listpostes').value);
  verificationVide();
}

function selectedAdministration(k){
  document.getElementById("enregistrerleresponsable").disabled = true; 
  localStorage.setItem('radioadministration',k);
  localStorage.setItem('selectedadministration',document.getElementById('listadministrations').value);
  verificationVide();
}

function selectedStructure(k){
  document.getElementById("enregistrerleresponsable").disabled = true; 
  localStorage.setItem('radiostructure',k);
  localStorage.setItem('selectedstructure',document.getElementById('liststructures').value);
  verificationVide();
}

//-------Supprimer un responsables------------
function supprimerResponsable(k){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      //return this.responseText;
      //alert(this.responseText);
    if (this.responseText==3) { $('#responsable_'+k).hide(1000); listeResponsables();}
    }
  };
  var parameters="method=suppr&id="+k;
  //var parameters="limit=5";
  xhttp.open("POST", "http://"+localStorage.getItem("cam")+"/asa/responsables.php", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(parameters);
}

//-------------------
function afficheModifResponsable(k){
  localStorage.setItem('responsableamodifier',k);
  var arr = JSON.parse(localStorage.getItem("BDresponsable"));                
  var out = "";
  var i; 
  for(i = 0; i < arr.length; i++) { 
        if (arr[i].id_responsable == k) {
          document.getElementById("nomPrenom").value = arr[i].nom_responsable;
          //alert(arr[i].id_administration); 
          document.getElementById("listpostes").value = arr[i].id_poste; 
          document.getElementById("listsexes").value = arr[i].sexe_responsable; 
          document.getElementById("liststructures").value = arr[i].id_structure; 
          document.getElementById("enregistrerleresponsable").disabled = false;     
        }
   }
}

//-------------------
function enregistrerLeResponsable(){
  if (localStorage.getItem('responsableamodifier') == "" || localStorage.getItem('responsableamodifier') == null) {
          var xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
              //return this.responseText;
              //alert(this.responseText);
            if (this.responseText==2) { 
              dernierEnregistrementResponsable();listeResponsables();localStorage.setItem('selectedadministration',"");
              document.getElementById("nomPrenom").value="";
              document.getElementById("email").value="";
              document.getElementById("telephone").value="";
              document.getElementById("listpostes").value="";
              document.getElementById("listsexes").value="";
              document.getElementById("liststructures").value="";
              document.getElementById("password").value="";
              document.getElementById("confirm_password").value="";
              localStorage.setItem("selectedadministration","");
              //reset();
            }
            }
          };

            var nomPrenom = document.getElementById("nomPrenom").value;
            var email = document.getElementById("email").value;
            var telephone = document.getElementById("telephone").value;
            var sexe = document.getElementById("listsexes").value;
            var poste = document.getElementById("listpostes").value;
            var password = document.getElementById("password").value;
            var confirm = document.getElementById("confirm_password").value;
            var structure = document.getElementById("liststructures").value;
            //alert('poste'+ poste);
            //alert('structure'+ structure);

          var parameters="method=creer&nomPrenom="+nomPrenom+"&email="+email+"&telephone="+telephone+"&sexe="+sexe+"&poste="+poste+"&structure="+structure+"&password="+password+"&confirm="+confirm;
          //var parameters="limit=5";
          xhttp.open("POST", "http://"+localStorage.getItem("cam")+"/asa/responsables.php", true);
          xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
          xhttp.send(parameters);

  }else{
          var xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
              //return this.responseText;
              //alert(this.responseText);
            if (this.responseText==1) { 
              var nomPrenom = document.getElementById("nomPrenom").value;
              var email = document.getElementById("email").value;
              var telephone = document.getElementById("telephone").value;
              var sexe = document.getElementById("listsexes").value;
              var poste = document.getElementById("listpostes").value;
              var password = document.getElementById("password").value;
              var confirm = document.getElementById("confirm_password").value;
              var structure = document.getElementById("liststructures").value;
              var id = localStorage.getItem("responsableamodifier");
  setTimeout(function () { 
              document.getElementById("responsable__"+id).innerHTML = '<th scope="row">'+id+'</th>'+
                                                      '<td>'+nomPrenom+'</td>'+
                                                      '<td>'+uneadministration(administration)+'</td>'+
                                                      '<td>'+unposte(poste)+'</td>'+
                                                      '<td>'+unsexe(sexe)+'</td>'+
                                                      '<td>'+unestructure(structure)+'</td>'+
                                                      '<td>'+
                                                          '<div class="btn-group btn-group-xs dropup">'+
                                                              '<button type="button" class="btn btn-info btn-pretty dropdown-toggle" data-toggle="dropdown">'+
                                                                  '<i class="fa fa-cog"></i> <span class="caret"></span>'+
                                                              '</button>'+
                                                              '<ul class="dropdown-menu dropdown-menu-right" role="menu">'+
                                                                  '<li><a href="#" onclick="afficheModifResponsable('+id+')"><i class="fa fa-check text-success"></i> Modifier</a></li>'+
                                                                  '<li><a href="#" onclick="confirmSupResponsable('+id+');" data-toggle="modal" data-target="#myModal_'+id+'"><i class="fa fa-trash text-danger"></i> Supprimer</a></li>'+
                                                              '</ul>'+
                                                              '<div class="modal fade" id="myModal_'+id+'" role="dialog">'+
                                                                '<div class="modal-dialog">'+
                                                                  '<div class="modal-content">'+
                                                                    '<div class="modal-header">'+
                                                                      '<button type="button" class="close" data-dismiss="modal">&times;</button>'+
                                                                      '<h4 class="modal-title">Supprimer '+nomPrenom+'?</h4>'+
                                                                    '</div>'+
                                                                    '<div class="modal-body">'+
                                                                      '<p><button type="button" class="btn btn-warning btn-lg" onclick="supprimerResponsable('+id+')">Supprimer</button>'+
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
              listeResponsables();
              document.getElementById("nomPrenom").value="";
              document.getElementById("email").value="";
              document.getElementById("telephone").value="";
              document.getElementById("listpostes").value="";
              document.getElementById("listsexes").value="";
              document.getElementById("liststructures").value="";
              document.getElementById("password").value="";
              document.getElementById("confirm_password").value="";
              localStorage.setItem("responsableamodifier","");
              //reset();
            }, 1000);
              }
            }
          };
          var nomPrenom = document.getElementById("nomPrenom").value;
          var email = document.getElementById("email").value;
          var telephone = document.getElementById("telephone").value;
          var sexe = document.getElementById("listsexes").value;
          var poste = document.getElementById("listpostes").value;
          var password = document.getElementById("password").value;
          var confirm = document.getElementById("confirm_password").value;
          var structure = document.getElementById("liststructures").value;          
          var k = localStorage.getItem("responsableamodifier");

          var parameters="method=creer&nomPrenom="+nomPrenom+"&email="+email+"&telephone="+telephone+"&sexe="+sexe+"&poste="+poste+"&structure="+structure+"&password="+password+"&confirm="+confirm;
          //var parameters="limit=5";
          xhttp.open("POST", "http://"+localStorage.getItem("cam")+"/asa/responsables.php", true);
          xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
          xhttp.send(parameters);  
  }
}


function afficherLaListeDesResponsables(){
  //alert(localStorage.getItem("BDresponsable"));
    setTimeout(function () { 
    var arr = JSON.parse(localStorage.getItem("BDresponsable"));                
    var out = "";
    var i; 
    for(i = 0; i < arr.length; i++) { 
      out = '<tr id="responsable_'+arr[i].id_responsable+'">'+
              '<th scope="row">'+arr[i].id_responsable+'</th>'+
              '<td>'+arr[i].nom_responsable+'</td>'+
              '<td>'+uneadministration(arr[i].id_administration)+'</td>'+
              '<td>'+unestructure(arr[i].id_structure)+'</td>'+
              '<td>'+unposte(arr[i].id_poste)+'</td>'+
              '<td>'+
                  '<div class="btn-group btn-group-xs dropup">'+
                      '<button type="button" class="btn btn-info btn-pretty dropdown-toggle" data-toggle="dropdown">'+
                          '<i class="fa fa-cog"></i> <span class="caret"></span>'+
                      '</button>'+
                      '<ul class="dropdown-menu dropdown-menu-right" role="menu">'+
                          '<li><a href="#" onclick="afficheModifResponsable('+arr[i].id_responsable+')"><i class="fa fa-check text-success"></i> Modifier</a></li>'+
                          '<li><a href="#" onclick="confirmSupResponsable('+arr[i].id_responsable+');" data-toggle="modal" data-target="#myModal_'+arr[i].id_responsable+'"><i class="fa fa-trash text-danger"></i> Supprimer</a></li>'+
                      '</ul>'+
                      '<div class="modal fade" id="myModal_'+arr[i].id_responsable+'" role="dialog">'+
                        '<div class="modal-dialog">'+
                          '<div class="modal-content">'+
                            '<div class="modal-header">'+
                              '<button type="button" class="close" data-dismiss="modal">&times;</button>'+
                              '<h4 class="modal-tselectedtypestructureitle">Supprimer '+arr[i].nom_responsable+'?</h4>'+
                            '</div>'+
                            '<div class="modal-body">'+
                              '<p><button type="button" class="btn btn-warning btn-lg" onclick="supprimerResponsable('+arr[i].id_responsable+')">Supprimer</button>'+
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
    $('#listesdesresponsables').append(out);
  }
  initPage();
  //setTimeout(function () { app.dialog.close(); }, 1000);
  }, 1000);
}

function dernierEnregistrementResponsable(){
  setTimeout(function () { 
          var xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
              //alert(this.responseText);
                var arr = JSON.parse(this.responseText);                
                var out = "";
                var i;
              for(i = 0; i < arr.length; i++) {                  
              out = '<tr id="responsable_'+arr[i].id_responsable+'">'+
                    '<th scope="row">'+arr[i].id_responsable+'</th>'+
                    '<td>'+arr[i].nom_responsable+'</td>'+
                    '<td>'+uneadministration(arr[i].id_administration)+'</td>'+
                    '<td>'+unestructure(arr[i].id_structure)+'</td>'+
                    '<td>'+unposte(arr[i].id_poste)+'</td>'+
                    '<td>'+
                        '<div class="btn-group btn-group-xs dropup">'+
                            '<button type="button" class="btn btn-info btn-pretty dropdown-toggle" data-toggle="dropdown">'+
                                '<i class="fa fa-cog"></i> <span class="caret"></span>'+
                            '</button>'+
                            '<ul class="dropdown-menu dropdown-menu-right" role="menu">'+
                                '<li><a href="#" onclick="afficheModifResponsable('+arr[i].id_responsable+')"><i class="fa fa-check text-success"></i> Modifier</a></li>'+
                                '<li><a href="#" onclick="confirmSupResponsable('+arr[i].id_responsable+');" data-toggle="modal" data-target="#myModal_'+arr[i].id_responsable+'"><i class="fa fa-trash text-danger"></i> Supprimer</a></li>'+
                            '</ul>'+
                            '<div class="modal fade" id="myModal_'+arr[i].id_responsable+'" role="dialog">'+
                              '<div class="modal-dialog">'+
                                '<div class="modal-content">'+
                                  '<div class="modal-header">'+
                                    '<button type="button" class="close" data-dismiss="modal">&times;</button>'+
                                    '<h4 class="modal-title">Supprimer '+arr[i].nom_responsable+'?</h4>'+
                                  '</div>'+
                                  '<div class="modal-body">'+
                                    '<p><button type="button" class="btn btn-warning btn-lg" onclick="supprimerResponsable('+arr[i].id_responsable+')">Supprimer</button>'+
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
                 $('#listesdesresponsables').prepend(out);
              }
              setTimeout(function () { }, 1000);}
          };
          var parameters="method=dernier";
          //var parameters="limit=5";
          xhttp.open("POST", "http://"+localStorage.getItem("cam")+"/asa/responsables.php", true);
          xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
          xhttp.send(parameters);
  }, 1000);
}

//-------------------
function modifierProfil(){
          var xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
              //return this.responseText;
              //alert(this.responseText);
            if (this.responseText==1) { 
                swal("Bravoo!!!", "Utilisateur modifié avec succès!", "success");
              }
              else{
                swal("Oops!!!", "Modification échouée, recommencez!", "error");
              }
            }
          };
          
          var x = document.getElementById('name').value;
          var y = document.getElementById('email').value;
          var z = document.getElementById('tel').value;
          var t = document.getElementById('sex').value;
          var r = document.getElementById('bio').value;
          var k = document.getElementById('password').value;


          var parameters="method=modif&nom="+x+"&email="+y+"&telephone="+z+"&structure="+t+"&role="+r+"&id="+k;
          //var parameters="limit=5";
          xhttp.open("POST", "http://"+localStorage.getItem("cam")+"/asa/responsables.php", true);
          xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
          xhttp.send(parameters);
}