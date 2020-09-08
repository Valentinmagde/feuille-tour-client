/*
* Projet : FEUILLE DE ROUTE MINESUP
* Code JAVASCRIPT : programmes.js
************************************************
* Auteur : Valentin Magde,Demasso James,Nebo Djomche Joress
* E-mails : <valentinmagde@gmail.com>
*/

function verificationVide(){
  //alert("verif");
    var noProgramme = document.getElementById("noProgramme").value;
    var intituleProgramme = document.getElementById("intituleProgramme").value;
    var descriptionProgramme = document.getElementById("descriptionProgramme").value;
    var anneeProgramme = document.getElementById("anneeProgramme").value;

    if (noProgramme.length == 0 || intituleProgramme.length == 0|| anneeProgramme.length == 0) {
        document.getElementById("envoyerProgramme").disabled = true;
    }else{
        document.getElementById("envoyerProgramme").disabled = false;
    }
}
//Liste des Responsables
function afficherLesOptionsDeResponsable(){
  var arr = JSON.parse(localStorage.getItem("BDresponsable"));                
    var out = "";
    var i; 
    for(i = 0; i < arr.length; i++) { 
      if(arr[i].id_role == 1){
        document.getElementById("listresponsables").innerHTML += '<option value="'+arr[i].id_utilisateur+'">'+arr[i].nom_utilisateur+'</option>'; 
      }
    }
}

function afficherLesOptionsDeResponsableModal(k){
  var arr = JSON.parse(localStorage.getItem("BDresponsable"));                
    var out = "";
    var i; 
    for(i = 0; i < arr.length; i++) { 
      if(arr[i].id_role == 1){
        document.getElementById('responsable'+k+'').innerHTML += '<option value="'+arr[i].id_utilisateur+'">'+arr[i].nom_utilisateur+'</option>'; 
      }
    }
}

function modalProgramme(k){
  afficherLesOptionsDeResponsableModal(k);
}

//-------Supprimer un programme------------
function supprimerProgramme(k){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        //return this.responseText;
        //alert(this.responseText);
      if (this.responseText==3) { $('#programme_'+k).hide(1000); listeProgrammes(); reset();}
      }
    };
    var parameters="method=suppr&id="+k;
    //var parameters="limit=5";
    xhttp.open("POST", "http://"+localStorage.getItem("cam")+"/asa/programmes.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parameters);
}

//------Concernant les programmes-------------
function enregistrerUnProgramme(){
  if (localStorage.getItem('programmeamodifier') == "" || localStorage.getItem('programmeamodifier') == null) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
              //return this.responseText;
              //alert(this.responseText);
        if (this.responseText==2) { 
          dernierEnregistrementProgramme();listeProgrammes();
          document.getElementById("noProgramme").value="";
          document.getElementById("intituleProgramme").value="";
          document.getElementById("descriptionProgramme").value="";
          document.getElementById("anneeProgramme").value="";
      
          swal("Bon travail!", "Programme ajouté avec succès!", "success");

        }else{
          swal("Mauvais travail!", "Ajout échoué, recommencez!", "error");
        }
      }
    };

    var noProgramme = document.getElementById("noProgramme").value;
    var intituleProgramme = document.getElementById("intituleProgramme").value;
    var descriptionProgramme = document.getElementById("descriptionProgramme").value;
    var anneeProgramme = document.getElementById("anneeProgramme").value;
    var responsable = document.getElementById("listresponsables").value;
    var parameters="method=creer&noProgramme="+noProgramme+"&intituleProgramme="+intituleProgramme+"&descriptionProgramme="+descriptionProgramme+"&anneeProgramme="+anneeProgramme+"&responsable="+responsable;
    //var parameters="limit=5";
    xhttp.open("POST", "http://"+localStorage.getItem("cam")+"/asa/programmes.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parameters);

  }else{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        //return this.responseText;
        //alert(this.responseText);
      if (this.responseText==1) { 
        var noProgramme = document.getElementById("noProgramme").value;
        var intituleProgramme = document.getElementById("intituleProgramme").value;
        var descriptionProgramme = document.getElementById("descriptionProgramme").value;
        var anneeProgramme = document.getElementById("anneeProgramme").value;
        var responsable = document.getElementById("listresponsables").value;
        var id = localStorage.getItem("programmeamodifier");
        setTimeout(function () { 
          document.getElementById("programme_"+id).innerHTML = '<th scope="row">'+id+'</th>'+
                                                      '<td>'+noProgramme+'</td>'+
                                                      '<td>'+intituleProgramme+'</td>'+
                                                      '<td>'+descriptionProgramme+'</td>'+
                                                      '<td>'+anneeProgramme+'</td>'+
                                                      '<td>'+
                                                      '<div class="btn-group btn-group-xs dropup">'+
                                                              '<button type="button" class="btn btn-info btn-pretty dropdown-toggle" data-toggle="dropdown">'+
                                                                  '<i class="fa fa-cog"></i> <span class="caret"></span>'+
                                                              '</button>'+
                                                              '<ul class="dropdown-menu dropdown-menu-right" role="menu">'+
                                                                  '<li><a href="#" onclick="afficheModifProgramme('+id+')"><i class="fa fa-check text-success"></i> Modifier</a></li>'+
                                                                  '<li><a href="#" onclick="confirmSupProgramme('+id+');" data-toggle="modal" data-target="#myModal_'+id+'"><i class="fa fa-trash text-danger"></i> Supprimer</a></li>'+
                                                              '</ul>'+
                                                              '<div class="modal fade" id="myModal_'+id+'" role="dialog">'+
                                                                '<div class="modal-dialog">'+
                                                                  '<div class="modal-content">'+
                                                                    '<div class="modal-header">'+
                                                                      '<button type="button" class="close" data-dismiss="modal">&times;</button>'+
                                                                      '<h4 class="modal-title">Supprimer '+intituleProgramme+'?</h4>'+
                                                                    '</div>'+
                                                                    '<div class="modal-body">'+
                                                                      '<p><button type="button" class="btn btn-warning btn-lg" onclick="supprimerProgramme('+id+')">Supprimer</button>'+
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
      listeProgrammes();
      document.getElementById("noProgramme").value="";
      document.getElementById("intituleProgramme").value="";
      document.getElementById("descriptionProgramme").value="";
      document.getElementById("anneeProgramme").value="";
      localStorage.setItem("programmeamodifier","");
      document.getElementById("envoyerProgramme").disabled=true;  
      //reset();
    }, 1000);
  }
}
  };
    var noProgramme = document.getElementById("noProgramme").value;
    var intituleProgramme = document.getElementById("intituleProgramme").value;
    var descriptionProgramme = document.getElementById("descriptionProgramme").value;
    var anneeProgramme = document.getElementById("anneeProgramme").value;
    var responsable = document.getElementById("listresponsables").value;
    var k = localStorage.getItem("programmeamodifier");

    var parameters="id="+k+"&method=modif&noProgramme="+noProgramme+"&intituleProgramme="+intituleProgramme+"&descriptionProgramme="+descriptionProgramme+"&anneeProgramme="+anneeProgramme+"&responsable="+responsable;
    //var parameters="limit=5";
    xhttp.open("POST", "http://"+localStorage.getItem("cam")+"/asa/programmes.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parameters); 
  }
}

function validerProgrammes(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      //return this.responseText;
      //alert(this.responseText);
      if (this.responseText==5) { 
        setTimeout(function () {
          alert('Programme bien validé');
          document.getElementById("listeprogrammes").innerHTML="";
          localStorage.setItem("BDprogramme", "[]");
        }, 1000);
      }
    }
  } 
  var anneeProgramme = document.getElementById("anneeProgramme").value;
  var parameters="method=validerProgramme&anneeProgramme="+anneeProgramme;
  //var parameters="limit=5";
  xhttp.open("POST", "http://"+localStorage.getItem("cam")+"/asa/programmes.php", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(parameters); 
}

//----Modifier un programme--------
function afficheModifProgramme(k){
  //alert('ici modification Programme');
    localStorage.setItem('programmeamodifier',k);
    var arr = JSON.parse(localStorage.getItem("BDprogramme"));                
    var out = "";
    var i; 
    for(i = 0; i < arr.length; i++){ 
        if (arr[i].id_programme == k){
            document.getElementById("noProgramme").value = arr[i].code_programme;
            document.getElementById("intituleProgramme").value = arr[i].denomination_programme;
            document.getElementById("descriptionProgramme").value = arr[i].descriptif_programme; 
            document.getElementById("anneeProgramme").value = arr[i].anneeProgramme; 
            document.getElementById("envoyerProgramme").disabled = false;     
        }
    }
}

//---------Affiche le dernier enregistrement----------
function dernierEnregistrementProgramme(){
  setTimeout(function () { 
          var xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
              //alert(this.responseText);
                var arr = JSON.parse(this.responseText);                
                var out = "";
                var i;
              for(i = 0; i < arr.length; i++) {                  
              out = '<tr id="programme_'+arr[i].id_programme+'">'+
                    '<th scope="row">'+arr[i].id_programme+'</th>'+
                    '<td>'+arr[i].code_programme+'</td>'+
                    '<td>'+arr[i].denomination_programme+'</td>'+
                    '<td>'+arr[i].descriptif_programme+'</td>'+
                    '<td>'+arr[i].annee_programme+'</td>'+
                    '<td>'+
                        '<div class="btn-group btn-group-xs dropup">'+
                            '<button type="button" class="btn btn-info btn-pretty dropdown-toggle" data-toggle="dropdown">'+
                                '<i class="fa fa-cog"></i> <span class="caret"></span>'+
                            '</button>'+
                            '<ul class="dropdown-menu dropdown-menu-right" role="menu">'+
                                '<li><a href="#" onclick="afficheModifProgramme('+arr[i].id_programme+')"><i class="fa fa-check text-success"></i> Modifier</a></li>'+
                                '<li><a href="#" onclick="confirmSupProgramme('+arr[i].id_programme+');" data-toggle="modal" data-target="#myModal_'+arr[i].id_structure+'"><i class="fa fa-trash text-danger"></i> Supprimer</a></li>'+
                            '</ul>'+
                            '<div class="modal fade" id="myModal_'+arr[i].id_programme+'" role="dialog">'+
                              '<div class="modal-dialog">'+
                                '<div class="modal-content">'+
                                  '<div class="modal-header">'+
                                    '<button type="button" class="close" data-dismiss="modal">&times;</button>'+
                                    '<h4 class="modal-title">Supprimer '+arr[i].denomination_programme
                                    +'?</h4>'+
                                  '</div>'+
                                  '<div class="modal-body">'+
                                    '<p><button type="button" class="btn btn-warning btn-lg" onclick="supprimerProgramme('+arr[i].id_programme+')">Supprimer</button>'+
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
                 $('#listeprogrammes').prepend(out);
              }
              setTimeout(function () { }, 1000);}
          };
          var parameters="method=dernier";
          //var parameters="limit=5";
          xhttp.open("POST", "http://"+localStorage.getItem("cam")+"/asa/programmes.php", true);
          xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
          xhttp.send(parameters);
  }, 1000);
}

function unUtilisateur(k){ 
  //alert(k);
    var arr = JSON.parse(localStorage.getItem("BDutilisateur"));
    /*alert(localStorage.getItem("BDrole"));*/
    var i; 
    for(i = 0; i < arr.length; i++) { 
          if (arr[i].id_utilisateur == k) {
            return arr[i].nom_utilisateur;
          }
     }
}

//-------------------
function modifierProgramme(k){
          var xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
              //return this.responseText;
              //alert(this.responseText);
            if (this.responseText==1) { 
                swal("Bon travail!", "Programme modifié avec succès!", "success");
              }
              else{
                swal("Mauvais travail!", "Modification échouée, recommencez!", "error");
              }
            }
          };
          
          var x = document.getElementById('code'+k+'').value;
          var y = document.getElementById('intitule'+k+'').value;
          var z = document.getElementById('description'+k+'').value;
          var t = document.getElementById('responsable'+k+'').value;

          var parameters="method=modif&code="+x+"&intitule="+y+"&description="+z+"&responsable="+t+"&id="+k;
          //var parameters="limit=5";
          xhttp.open("POST", "http://"+localStorage.getItem("cam")+"/asa/programmes.php", true);
          xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
          xhttp.send(parameters);
}
//-----Affiche la liste de tous les programmes-----
function afficheListeProgrammes(){
    setTimeout(function () { 
      var arr = JSON.parse(localStorage.getItem("BDprogramme"));                
      var out = "";
      var i;
    for(i = 0; i < arr.length; i++) { 
        out = '<tr id="programme_'+arr[i].id_programme+'">'+
              '<th scope="row">'+arr[i].id_programme+'</th>'+
              '<td>'+arr[i].code_programme+'</td>'+
              '<td>'+arr[i].denomination_programme+'</td>'+
              '<td>'+arr[i].descriptif_programme+'</td>'+
              '<td>'+unUtilisateur(arr[i].id_responsable)+'</td>'+
              '<td>'+
                  '<div class="btn-group btn-group-xs dropup">'+
                      '<button type="button" class="btn btn-info btn-pretty dropdown-toggle" data-toggle="dropdown">'+
                          '<i class="fa fa-cog"></i> <span class="caret"></span>'+
                      '</button>'+
                      '<ul class="dropdown-menu dropdown-menu-right" role="menu">'+
                          '<li><a href="#" onclick="modalProgramme('+arr[i].id_programme+')" data-toggle="modal" data-target="#myModalUpdate_'+arr[i].id_programme+'"><i class="fa fa-check text-success"></i> Modifier</a></li>'+
                          '<li><a href="#" onclick="confirmSupProgramme('+arr[i].id_programme+');" data-toggle="modal" data-target="#myModal_'+arr[i].id_programme+'"><i class="fa fa-trash text-danger"></i> Supprimer</a></li>'+
                      '</ul>'+
                      '<div class="modal fade" id="myModal_'+arr[i].id_programme+'" role="dialog">'+
                        '<div class="modal-dialog">'+
                          '<div class="modal-content">'+
                            '<div class="modal-header">'+
                              '<button type="button" class="close" data-dismiss="modal">&times;</button>'+
                              '<h4 class="modal-title">Supprimer '+arr[i].denomination_programme+'?</h4>'+
                            '</div>'+
                            '<div class="modal-body">'+
                              '<p><button type="button" class="btn btn-warning btn-lg" onclick="supprimerProgramme('+arr[i].id_programme+')">Supprimer</button>'+
                              '<button type="button" class="btn btn-info btn-lg" style="margin-left:10px;">Annuller</button></p>'+
                            '</div>'+
                            '<div class="modal-footer">'+
                              '<button type="button" class="btn btn-default" data-dismiss="modal">Fermer</button>'+
                            '</div>'+
                          '</div>'+      
                        '</div>'+
                      '</div>'+
                  '</div>'+
                  '<div class="modal fade" id="myModalUpdate_'+arr[i].id_programme+'" role="dialog">'+
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
                                          '<input type="text" class="form-control" id="code'+arr[i].id_programme+'" value='+arr[i].code_programme+' style="width: 100%">'+
                                      '</div>'+
                                    '</div>'+
                                  '</div>'+
                                  '<br>'+

                                  '<div class="row">'+
                                    '<div class="form-group col-md-12">'+
                                      '<div class="col-md-3">'+
                                        '<label for="message-text" class="col-form-label">Description :</label>'+
                                      '</div>'+
                                      '<div class="col-md-9">'+
                                          '<textarea type="text" class="form-control" id="description'+arr[i].id_programme+'" style="width: 100%">'+arr[i].descriptif_programme+'</textarea>'+
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
                                          '<textarea type="text" class="form-control" id="intitule'+arr[i].id_programme+'" style="width: 100%">'+arr[i].denomination_programme+'</textarea>'+
                                      '</div>'+
                                    '</div>'+
                                  '</div>'+
                                  '<br>'+

                                  '<div class="row">'+
                                    '<div class="form-group col-md-12">'+
                                      '<div class="col-md-3">'+
                                        '<label for="message-text" class="col-form-label">Responsable :</label>'+
                                      '</div>'+
                                      '<div class="col-md-9">'+
                                          '<select onkeyup="verificationVide()" class="form-control" id="responsable'+arr[i].id_programme+'" style="width: 100%">'+
                                              '<option value='+arr[i].id_responsable+'>'+unUtilisateur(arr[i].id_responsable)+'</option>'+                                   
                                          '</select>'+
                                      '</div>'+
                                    '</div>'+
                                  '</div>'+
                                  '<br>'+
                                '</form>'+
                              '</div>'+
                          '</div>'+
                          '<div class="modal-footer">'+
                            '<button type="button" class="btn btn-primary" onclick="modifierProgramme('+arr[i].id_programme+')" data-dismiss="modal">Valider</button>'+
                          '</div>'+
                          '</div>'+      
                        '</div>'+
                      '</div>'+
                  '</div>'+
              '</td>'+
          '</tr>';
              //alert(out);
    $('#listeprogrammes').append(out);
    }
    initPage();
    //setTimeout(function () { app.dialog.close(); }, 1000);
    }, 1000);
  }