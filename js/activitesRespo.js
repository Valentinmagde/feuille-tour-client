/*
* Projet : FEUILLE DE ROUTE MINESUP
* Code JAVASCRIPT : activitesRespo.js
************************************************
* Auteur : Valentin Magde,Demasso James,Nebo Djomche Joress
* E-mails : <valentinmagde@gmail.com>
*/


//Liste des Responsables
function afficherLesOptionsDeResponsables(){
  var arr = JSON.parse(localStorage.getItem("BDresponsable"));                
    var out = "";
    var i; 
    for(i = 0; i < arr.length; i++) { 
      if(arr[i].id_role == 1){
        document.getElementById("denomination_responsable").innerHTML += '<option value="'+arr[i].id_utilisateur+'">'+arr[i].nom_utilisateur+'</option>'; 
      }
    }
}

//Liste des activites
function afficherLesOptionsDeActivites(){
    var arr2 = JSON.parse(localStorage.getItem("BDaction"));
    var arr1 = JSON.parse(localStorage.getItem("BDprogramme"));     
    var arr = JSON.parse(localStorage.getItem("BDactivite"));               
    var out = "";
    var id_programme;
    var id_action = [];              
    var out = ""; 

    for (var i = arr1.length - 1; i >= 0; i--) {
          if (localStorage.getItem("id") == arr1[i].id_responsable) {
            id_programme = arr1[i].id_programme;
          }
        }
        
    var k = 0;
    for(var j = 0; j < arr2.length; j++) {
        if (arr2[j].id_programme == id_programme) {
          id_action[k] = arr2[j].id_action;
          k += 1;
        }
    }

    for(i = 0; i < arr.length; i++) { 
        for (var k = id_action.length - 1; k >= 0; k--) {
          if (id_action[k] == arr[i].id_action) {
            document.getElementById("denomination_activite").innerHTML += '<option value="'+arr[i].id_activite+'">'+arr[i].code_activite+'</option>'; 
          }
        }
    }

}
//---pour afficher la liste des actions----
function unResponsable(k){ 
    //alert(k);
      var arr = JSON.parse(localStorage.getItem("BDresponsable"));
      var i; 
      for(i = 0; i < arr.length; i++) { 
            if (arr[i].id_utilisateur == k) {
              return arr[i].nom_utilisateur;
            }
       }
  }

function checkedActivite(k,m){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      //return this.responseText;
      //alert(this.responseText);
    if (this.responseText==1) { 
        swal("Bon travail!", "status modifié avec succès!", "success");
      }
      else{
        swal("Mauvais travail!", "Modification échouée, recommencez!", "error");
      }
    }
  };
  
  var x = 1;
  var parameters="method=check&valeur="+x+"&id="+k+"&mois="+m;
  //var parameters="limit=5";
  xhttp.open("POST", "http://"+localStorage.getItem("cam")+"/asa/statut_activite.php", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(parameters);
}

function NotYetActivite(k,m){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      //return this.responseText;
      //alert(this.responseText);
    if (this.responseText==2) { 
        swal("Bon travail!", "status modifié avec succès!", "success");
      }
      else{
        swal("Mauvais travail!", "Modification échouée, recommencez!", "error");
      }
    }
  };
  
  var x = 2;
  var p1 = document.getElementById('pourcentage'+k+'').value;
  var p2 = document.getElementById('pourcentage1'+k+'').value;
  var parameters="method=warning&valeur="+x+"&pourcentage1="+p1+"&pourcentage2="+p2+"&id="+k+"&mois="+m;
  //var parameters="limit=5";
  xhttp.open("POST", "http://"+localStorage.getItem("cam")+"/asa/statut_activite.php", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(parameters);
}

function NoActivite(k, m){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      //return this.responseText;
      //alert(this.responseText);
    if (this.responseText==2) { 
        swal("Bon travail!", "status modifié avec succès!", "success");
      }
      else{
        swal("Mauvais travail!", "Modification échouée, recommencez!", "error");
      }
    }
  };
  
  var x = 0;
  var parameters="method=danger&valeur="+x+"&id="+k+"&mois="+m;
  //var parameters="limit=5";
  xhttp.open("POST", "http://"+localStorage.getItem("cam")+"/asa/statut_activite.php", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(parameters);
}

function commentActivite(k, m){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      //return this.responseText;
      //alert(this.responseText);
    if (this.responseText==2) { 
        swal("Bon travail!", "status modifié avec succès!", "success");
      }
      else{
        swal("Mauvais travail!", "Modification échouée, recommencez!", "error");
      }
    }
  };
  
  var x = document.getElementById('comment'+k+'').value;
  var y = document.getElementById('comment1'+k+'').value;
  var parameters="method=comment&valeur1="+x+"&valeur2="+y+"&id="+k+"&mois="+m;
  //var parameters="limit=5";
  xhttp.open("POST", "http://"+localStorage.getItem("cam")+"/asa/statut_activite.php", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(parameters);
}

//-------------------
function assignerActivite(){
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
          
          var x = document.getElementById('denomination_activite').value;
          var y = document.getElementById('denomination_responsable').value;

          var parameters="method=assigner&activite="+x+"&responsable="+y;
          //var parameters="limit=5";
          xhttp.open("POST", "http://"+localStorage.getItem("cam")+"/asa/activites.php", true);
          xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
          xhttp.send(parameters);
}
//-------Afficher la liste des activites--------
function afficheListeActivitesRespo(){
    setTimeout(function () {       
        var arr = JSON.parse(localStorage.getItem("BDactivite"));               
        var out = "";
        var i;

        for(i = 0; i < arr.length; i++) { 
          if (arr[i].id_responsable == localStorage.getItem('id')) {

            out = '<tr id="activite_'+arr[i].id_activite+'">'+
                    '<th scope="row">'+arr[i].code_activite+'</th>'+
                    '<td>'+arr[i].denomination_activite+'</td>'+
                    '<td>'+uneAction(arr[i].id_action)+'</td>'+
                    '<td>'+unResponsable(arr[i].id_responsable)+'</td>'+
                    '<td>'+arr[i].resultatj_activite+'</td>'+
                    /*'<td>'+unindicateur(arr[i].id_indicateur)+'</td>'+*/
                    '<td>'+arr[i].resultatd_activite+'</td>'+
                    '<td>'+
                        '<div class="btn-group btn-group-xs dropup">'+
                            '<button type="button" class="btn btn-info btn-pretty dropdown-toggle" data-toggle="dropdown">'+
                                '<i class="fa fa-cog"></i> <span class="caret"></span>'+
                            '</button>'+
                            '<ul class="dropdown-menu dropdown-menu-right" role="menu" style="min-width: 20px;">'+
                                '<li class="dropdown-submenu">'+
                                  '<a href="#">Resultat Juillet</a>'+
                                  '<ul class="dropdown-menu" style="min-width: 35px;">'+
                                    '<div class="row">'+
                                      '<div class="rounded shadow-sm">'+
                                        '<!-- sm circle button-->'+
                                        '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button id="success1'+arr[i].id_activite+'" class="btn btn-success btn-circle btn-circle-sm m-1" onclick="checkedActivite('+arr[i].id_activite+',1)"><i class="fa fa-check"></i></button>'+
                                        '&nbsp;&nbsp;&nbsp;<button id="warning1'+arr[i].id_activite+'" class="btn btn-warning btn-circle btn-circle-sm m-1" data-toggle="modal" data-target=".pourcentage_'+arr[i].id_activite+'"><i class="fa fa-warning"></i></button>'+
                                        '&nbsp;&nbsp;&nbsp;<button id="danger1'+arr[i].id_activite+'" class="btn btn-danger btn-circle btn-circle-sm m-1" onclick="NoActivite('+arr[i].id_activite+', 1)"><i class="fa fa-close"></i></button>'+
                                      '</div>'+
                                    '</div>'+
                                    '<li class="divider"></li>'+
                                    '<li><a href="#" data-toggle="modal" data-target="#myModalComment_'+arr[i].id_activite+'"><i class="fa fa-paper-plane text-success"></i> Commenter</a></li>'+
                                   '</ul>'+
                                '</li>'+
                                '<li class="dropdown-submenu">'+
                                  '<a href="#">Resultat Décembre</a>'+
                                  '<ul class="dropdown-menu" style="min-width: 35px;">'+
                                    '<div class="row">'+
                                      '<div class="rounded shadow-sm">'+
                                        '<!-- sm circle button-->'+
                                        '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button id="success2'+arr[i].id_activite+'" class="btn btn-success btn-circle btn-circle-sm m-1" onclick="checkedActivite('+arr[i].id_activite+', 2)"><i class="fa fa-check"></i></button>'+
                                        '&nbsp;&nbsp;&nbsp;<button id="warning2'+arr[i].id_activite+'" class="btn btn-warning btn-circle btn-circle-sm m-1" data-toggle="modal" data-target=".pourcentage1_'+arr[i].id_activite+'"><i class="fa fa-warning"></i></button>'+
                                        '&nbsp;&nbsp;&nbsp;<button id="danger2'+arr[i].id_activite+'" class="btn btn-danger btn-circle btn-circle-sm m-1" onclick="NoActivite('+arr[i].id_activite+', 2)"><i class="fa fa-close"></i></button>'+
                                      '</div>'+
                                    '</div>'+
                                    '<li class="divider"></li>'+
                                    '<li><a href="#" data-toggle="modal" data-target="#myModalComment1_'+arr[i].id_activite+'"><i class="fa fa-paper-plane text-success"></i> Commenter</a></li>'+
                                   '</ul>'+
                                '</li>'+
                          '</ul>'+
                        '<div class="modal fade" id="myModalComment_'+arr[i].id_activite+'" role="dialog">'+
                          '<div class="modal-dialog">'+
                            '<div class="modal-content">'+
                              '<div class="modal-header">'+
                                '<button type="button" class="close" data-dismiss="modal">&times;</button>'+
                                '<h4 class="modal-title">Commentaire</h4>'+
                              '</div>'+
                              '<div class="modal-body">'+

                                '<div class="container-fluid">'+
                                    '<form>'+
                                      '<div class="row">'+
                                        '<div class="form-group col-md-12">'+
                                          '<div class="col-sm-3">'+
                                              '<label for="recipient-name" class="col-form-label">Message :</label>'+
                                          '</div>'+
                                          '<div class="col-sm-9">'+
                                              '<textarea class="form-control" id="comment'+arr[i].id_activite+'" style="width:100%">Tapez votre commentaire</textarea>'+
                                          '</div>'+
                                        '</div>'+
                                      '</div>'+
                                      '<br>'+
                                    '</form>'+
                                '</div>'+
                              '</div>'+
                              '<div class="modal-footer">'+
                                '<button type="button" class="btn btn-primary" onclick="commentActivite('+arr[i].id_activite+', 1)" data-dismiss="modal">Valider</button>'+
                              '</div>'+
                              '</div>'+      
                            '</div>'+
                          '</div>'+
                      '</div>'+
                      '<div class="modal fade" id="myModalComment1_'+arr[i].id_activite+'" role="dialog">'+
                          '<div class="modal-dialog">'+
                            '<div class="modal-content">'+
                              '<div class="modal-header">'+
                                '<button type="button" class="close" data-dismiss="modal">&times;</button>'+
                                '<h4 class="modal-title">Commentaire</h4>'+
                              '</div>'+
                              '<div class="modal-body">'+
                                  '<div class="container-fluid">'+
                                    '<form>'+
                                      '<div class="row">'+
                                        '<div class="form-group col-md-12">'+
                                          '<div class="col-sm-3">'+
                                              '<label for="recipient-name" class="col-form-label">Message :</label>'+
                                          '</div>'+
                                          '<div class="col-sm-9">'+
                                              '<textarea class="form-control" id="comment1'+arr[i].id_activite+'" style="width:100%"></textarea>'+
                                          '</div>'+
                                        '</div>'+
                                      '</div>'+
                                      '<br>'+
                                    '</form>'+
                                '</div>'+
                              '</div>'+
                              '<div class="modal-footer">'+
                                '<button type="button" class="btn btn-primary" onclick="commentActivite('+arr[i].id_activite+', 2)" data-dismiss="modal">Valider</button>'+
                              '</div>'+
                              '</div>'+      
                            '</div>'+
                          '</div>'+
                      '</div>'+
                      '<div class="modal fade pourcentage_'+arr[i].id_activite+'" role="dialog">'+
                          '<div class="modal-dialog modal-sm">'+
                            '<div class="modal-content">'+
                              '<div class="modal-header">'+
                                '<button type="button" class="close" data-dismiss="modal">&times;</button>'+
                                '<h4 class="modal-title">Pourcentage d\'avancement </h4>'+
                              '</div>'+
                              '<div class="modal-body">'+
                                '<form>'+
                                '<div class="form-group col-md-12">'+
                                  '<label for="recipient-name" class="col-form-label">Valeur :</label>'+
                                  '<input type="number" class="form-control" id="pourcentage'+arr[i].id_activite+'">'+
                                '</div>'+
                              '</form>'+
                              '</div>'+
                              '<div class="modal-footer">'+
                                '<button type="button" class="btn btn-primary" onclick="NotYetActivite('+arr[i].id_activite+', 1)" data-dismiss="modal">Valider</button>'+
                              '</div>'+
                              '</div>'+      
                            '</div>'+
                          '</div>'+
                      '</div>'+
                      '<div class="modal fade pourcentage1_'+arr[i].id_activite+'" role="dialog">'+
                          '<div class="modal-dialog modal-sm">'+
                            '<div class="modal-content">'+
                              '<div class="modal-header">'+
                                '<button type="button" class="close" data-dismiss="modal">&times;</button>'+
                                '<h4 class="modal-title">Pourcentage d\'avancement </h4>'+
                              '</div>'+
                              '<div class="modal-body">'+
                                '<form>'+
                                '<div class="form-group col-md-12">'+
                                  '<label for="recipient-name" class="col-form-label">Valeur :</label>'+
                                  '<input type="number" class="form-control" id="pourcentage1'+arr[i].id_activite+'">'+
                                '</div>'+
                              '</form>'+
                              '</div>'+
                              '<div class="modal-footer">'+
                                '<button type="button" class="btn btn-primary" onclick="NotYetActivite('+arr[i].id_activite+', 2)" data-dismiss="modal">Valider</button>'+
                              '</div>'+
                              '</div>'+      
                            '</div>'+
                          '</div>'+
                      '</div>'+
                    '</td>'+
                '</tr>';
                    //alert(out);
            $('#listedesactivites').append(out);

            if (arr[i].statutj_activite == 0)
              document.getElementById('danger1'+arr[i].id_activite).disabled = true;

            if(arr[i].statutj_activite == 1)
              document.getElementById('success1'+arr[i].id_activite).disabled = true;

            if(arr[i].statutj_activite == 2)
              document.getElementById('warning1'+arr[i].id_activite).disabled = true;

            if(arr[i].statutd_activite == 0)
              document.getElementById('danger2'+arr[i].id_activite).disabled = true;

            if(arr[i].statutd_activite == 1)
              document.getElementById('success2'+arr[i].id_activite).disabled = true;

            if(arr[i].statutd_activite == 2)
              document.getElementById('warning2'+arr[i].id_activite).disabled = true;
          }
        }
        initPage();
        //setTimeout(function () { app.dialog.close(); }, 1000);
        }, 1000);
}

function afficheListeActivitesCoordo(){
    setTimeout(function () {  
        var arr2 = JSON.parse(localStorage.getItem("BDaction"));
        var arr1 = JSON.parse(localStorage.getItem("BDprogramme"));     
        var arr = JSON.parse(localStorage.getItem("BDactivite"));               
        var out = "";
        var id_programme;
        var id_action = [];
        var i;

        for (var i = arr1.length - 1; i >= 0; i--) {
          if (localStorage.getItem("id") == arr1[i].id_responsable) {
            id_programme = arr1[i].id_programme;
          }
        }
        
        var k = 0;
        for(var j = 0; j < arr2.length; j++) {
            if (arr2[j].id_programme == id_programme) {
              id_action[k] = arr2[j].id_action;
              k += 1;
            }
        }

        for(i = 0; i < arr.length; i++) { 
          for (var k = id_action.length - 1; k >= 0; k--) {
            if (id_action[k] == arr[i].id_action) {

              out = '<tr id="activite_'+arr[i].id_activite+'">'+
                      '<th scope="row">'+arr[i].code_activite+'</th>'+
                      '<td>'+arr[i].denomination_activite+'</td>'+
                      '<td>'+uneAction(arr[i].id_action)+'</td>'+
                      '<td>'+unResponsable(arr[i].id_responsable)+'</td>'+
                      '<td>'+arr[i].resultatj_activite+'</td>'+
                      /*'<td>'+unindicateur(arr[i].id_indicateur)+'</td>'+*/
                      '<td>'+arr[i].resultatd_activite+'</td>'+
                      '<td>'+
                          '<div class="btn-group btn-group-xs dropup">'+
                              '<button type="button" class="btn btn-info btn-pretty dropdown-toggle" data-toggle="dropdown">'+
                                  '<i class="fa fa-cog"></i> <span class="caret"></span>'+
                              '</button>'+
                              '<ul class="dropdown-menu dropdown-menu-right" role="menu" style="min-width: 20px;">'+
                                  '<li class="dropdown-submenu">'+
                                    '<a href="#">Resultat Juillet</a>'+
                                    '<ul class="dropdown-menu" style="min-width: 35px;">'+
                                      '<div class="row">'+
                                        '<div class="rounded shadow-sm">'+
                                          '<!-- sm circle button-->'+
                                          '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button id="success1'+arr[i].id_activite+'" class="btn btn-success btn-circle btn-circle-sm m-1" onclick="checkedActivite('+arr[i].id_activite+',1)"><i class="fa fa-check"></i></button>'+
                                          '&nbsp;&nbsp;&nbsp;<button id="warning1'+arr[i].id_activite+'" class="btn btn-warning btn-circle btn-circle-sm m-1" data-toggle="modal" data-target=".pourcentage_'+arr[i].id_activite+'"><i class="fa fa-warning"></i></button>'+
                                          '&nbsp;&nbsp;&nbsp;<button id="danger1'+arr[i].id_activite+'" class="btn btn-danger btn-circle btn-circle-sm m-1" onclick="NoActivite('+arr[i].id_activite+', 1)"><i class="fa fa-close"></i></button>'+
                                        '</div>'+
                                      '</div>'+
                                      '<li class="divider"></li>'+
                                      '<li><a href="#" data-toggle="modal" data-target="#myModalComment_'+arr[i].id_activite+'"><i class="fa fa-paper-plane text-success"></i> Commenter</a></li>'+
                                     '</ul>'+
                                  '</li>'+
                                  '<li class="dropdown-submenu">'+
                                    '<a href="#">Resultat Décembre</a>'+
                                    '<ul class="dropdown-menu" style="min-width: 35px;">'+
                                      '<div class="row">'+
                                        '<div class="rounded shadow-sm">'+
                                          '<!-- sm circle button-->'+
                                          '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button id="success2'+arr[i].id_activite+'" class="btn btn-success btn-circle btn-circle-sm m-1" onclick="checkedActivite('+arr[i].id_activite+', 2)"><i class="fa fa-check"></i></button>'+
                                          '&nbsp;&nbsp;&nbsp;<button id="warning2'+arr[i].id_activite+'" class="btn btn-warning btn-circle btn-circle-sm m-1" data-toggle="modal" data-target=".pourcentage1_'+arr[i].id_activite+'"><i class="fa fa-warning"></i></button>'+
                                          '&nbsp;&nbsp;&nbsp;<button id="danger2'+arr[i].id_activite+'" class="btn btn-danger btn-circle btn-circle-sm m-1" onclick="NoActivite('+arr[i].id_activite+', 2)"><i class="fa fa-close"></i></button>'+
                                        '</div>'+
                                      '</div>'+
                                      '<li class="divider"></li>'+
                                      '<li><a href="#" data-toggle="modal" data-target="#myModalComment1_'+arr[i].id_activite+'"><i class="fa fa-paper-plane text-success"></i> Commenter</a></li>'+
                                     '</ul>'+
                                  '</li>'+
                            '</ul>'+
                          '<div class="modal fade" id="myModalComment_'+arr[i].id_activite+'" role="dialog">'+
                            '<div class="modal-dialog">'+
                              '<div class="modal-content">'+
                                '<div class="modal-header">'+
                                  '<button type="button" class="close" data-dismiss="modal">&times;</button>'+
                                  '<h4 class="modal-title">Commentaire</h4>'+
                                '</div>'+
                                '<div class="modal-body">'+

                                  '<div class="container-fluid">'+
                                      '<form>'+
                                        '<div class="row">'+
                                          '<div class="form-group col-md-12">'+
                                            '<div class="col-sm-3">'+
                                                '<label for="recipient-name" class="col-form-label">Message :</label>'+
                                            '</div>'+
                                            '<div class="col-sm-9">'+
                                                '<textarea class="form-control" id="comment'+arr[i].id_activite+'" style="width:100%">Tapez votre commentaire</textarea>'+
                                            '</div>'+
                                          '</div>'+
                                        '</div>'+
                                        '<br>'+
                                      '</form>'+
                                  '</div>'+
                                '</div>'+
                                '<div class="modal-footer">'+
                                  '<button type="button" class="btn btn-primary" onclick="commentActivite('+arr[i].id_activite+', 1)" data-dismiss="modal">Valider</button>'+
                                '</div>'+
                                '</div>'+      
                              '</div>'+
                            '</div>'+
                        '</div>'+
                        '<div class="modal fade" id="myModalComment1_'+arr[i].id_activite+'" role="dialog">'+
                            '<div class="modal-dialog">'+
                              '<div class="modal-content">'+
                                '<div class="modal-header">'+
                                  '<button type="button" class="close" data-dismiss="modal">&times;</button>'+
                                  '<h4 class="modal-title">Commentaire</h4>'+
                                '</div>'+
                                '<div class="modal-body">'+
                                    '<div class="container-fluid">'+
                                      '<form>'+
                                        '<div class="row">'+
                                          '<div class="form-group col-md-12">'+
                                            '<div class="col-sm-3">'+
                                                '<label for="recipient-name" class="col-form-label">Message :</label>'+
                                            '</div>'+
                                            '<div class="col-sm-9">'+
                                                '<textarea class="form-control" id="comment1'+arr[i].id_activite+'" style="width:100%"></textarea>'+
                                            '</div>'+
                                          '</div>'+
                                        '</div>'+
                                        '<br>'+
                                      '</form>'+
                                  '</div>'+
                                '</div>'+
                                '<div class="modal-footer">'+
                                  '<button type="button" class="btn btn-primary" onclick="commentActivite('+arr[i].id_activite+', 2)" data-dismiss="modal">Valider</button>'+
                                '</div>'+
                                '</div>'+      
                              '</div>'+
                            '</div>'+
                        '</div>'+
                        '<div class="modal fade pourcentage_'+arr[i].id_activite+'" role="dialog">'+
                            '<div class="modal-dialog modal-sm">'+
                              '<div class="modal-content">'+
                                '<div class="modal-header">'+
                                  '<button type="button" class="close" data-dismiss="modal">&times;</button>'+
                                  '<h4 class="modal-title">Pourcentage d\'avancement </h4>'+
                                '</div>'+
                                '<div class="modal-body">'+
                                  '<form>'+
                                  '<div class="form-group col-md-12">'+
                                    '<label for="recipient-name" class="col-form-label">Valeur :</label>'+
                                    '<input type="number" class="form-control" id="pourcentage'+arr[i].id_activite+'">'+
                                  '</div>'+
                                '</form>'+
                                '</div>'+
                                '<div class="modal-footer">'+
                                  '<button type="button" class="btn btn-primary" onclick="NotYetActivite('+arr[i].id_activite+', 1)" data-dismiss="modal">Valider</button>'+
                                '</div>'+
                                '</div>'+      
                              '</div>'+
                            '</div>'+
                        '</div>'+
                        '<div class="modal fade pourcentage1_'+arr[i].id_activite+'" role="dialog">'+
                            '<div class="modal-dialog modal-sm">'+
                              '<div class="modal-content">'+
                                '<div class="modal-header">'+
                                  '<button type="button" class="close" data-dismiss="modal">&times;</button>'+
                                  '<h4 class="modal-title">Pourcentage d\'avancement </h4>'+
                                '</div>'+
                                '<div class="modal-body">'+
                                  '<form>'+
                                  '<div class="form-group col-md-12">'+
                                    '<label for="recipient-name" class="col-form-label">Valeur :</label>'+
                                    '<input type="number" class="form-control" id="pourcentage1'+arr[i].id_activite+'">'+
                                  '</div>'+
                                '</form>'+
                                '</div>'+
                                '<div class="modal-footer">'+
                                  '<button type="button" class="btn btn-primary" onclick="NotYetActivite('+arr[i].id_activite+', 2)" data-dismiss="modal">Valider</button>'+
                                '</div>'+
                                '</div>'+      
                              '</div>'+
                            '</div>'+
                        '</div>'+
                      '</td>'+
                  '</tr>';
                      //alert(out);
            $('#listedesactivites').append(out);

              if (arr[i].statutj_activite == 0)
                document.getElementById('danger1'+arr[i].id_activite).disabled = true;

              if(arr[i].statutj_activite == 1)
                document.getElementById('success1'+arr[i].id_activite).disabled = true;

              if(arr[i].statutj_activite == 2)
                document.getElementById('warning1'+arr[i].id_activite).disabled = true;

              if(arr[i].statutd_activite == 0)
                document.getElementById('danger2'+arr[i].id_activite).disabled = true;

              if(arr[i].statutd_activite == 1)
                document.getElementById('success2'+arr[i].id_activite).disabled = true;

              if(arr[i].statutd_activite == 2)
                document.getElementById('warning2'+arr[i].id_activite).disabled = true;
          }
          }
        }
        initPage();
        //setTimeout(function () { app.dialog.close(); }, 1000);
        }, 1000);
}
