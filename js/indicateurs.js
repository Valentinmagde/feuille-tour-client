/*
* Projet : FEUILLE DE ROUTE MINESUP
* Code JAVASCRIPT : indicateurs.js
************************************************
* Auteur : Valentin Magde,Demasso James,Nebo Djomche Joress
* E-mails : <valentinmagde@gmail.com>
*/

function verificationEstVide(){
    var codeIndic = document.getElementById("codeIndic").value;
    var denominationIndic = document.getElementById("denominationIndic").value;
    var descriptifIndic = document.getElementById("descriptifIndic").value;
    var valeurIndic = document.getElementById("valeurIndic").value;

    if (codeIndic.length == 0 || denominationIndic.length == 0 || descriptifIndic.length == 0 || valeurIndic.length == 0) {
         document.getElementById("enregistrerindicateur").disabled = true;
    }else{
        document.getElementById("enregistrerindicateur").disabled = false;
    }
}

//-------Supprimer un indicateur------------
function supprimerIndicateur(k){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        //return this.responseText;
        //alert(this.responseText);
      if (this.responseText==3) { 
        $('#indicateur_'+k).hide(1000); listeIndicateurs();

        swal("Bon travail!", "indicateur Supprimé avec succès!", "success");
      }
      else{
        swal("Mauvais travail!", "Suppression échoué, recommencez!", "error");
      }
      }
    };
    var parameters="method=suppr&id="+k;
    //var parameters="limit=5";
    xhttp.open("POST", "http://"+localStorage.getItem("cam")+"/asa/indicateurs.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parameters);
}

//----Modifier un indicateur--------
function afficheModifIndicateur(k){
    //alert('ici modification indicateur');
      localStorage.setItem('indicateuramodifier',k);
      var arr = JSON.parse(localStorage.getItem("BDindicateur"));                
      var out = "";
      var i; 
      for(i = 0; i < arr.length; i++){ 
          if (arr[i].id_indicateur == k){
            //alert(arr[i].code_indicateur);
              document.getElementById("codeIndic").value = arr[i].code_indicateur;
              document.getElementById("denominationIndic").value = arr[i].denomination_indicateur;
              document.getElementById("descriptifIndic").value = arr[i].descriptif_indicateur; 
              document.getElementById("valeurIndic").value = arr[i].valeur_indicateur; 
              document.getElementById("enregistrerindicateur").disabled = false;     
          }
      }
  }

//-----Affiche la liste de tous les indicateurs-----
function afficheListeIndicateurs(){
    setTimeout(function () {  
      var arr = JSON.parse(localStorage.getItem("BDindicateur"));               
      var out = "";
      var i;
    for(i = 0; i < arr.length; i++) { 
          out = '<tr id="indicateur_'+arr[i].id_indicateur+'">'+
                '<th scope="row">'+arr[i].id_indicateur+'</th>'+
                '<td>'+arr[i].code_indicateur+'</td>'+
                '<td>'+arr[i].denomination_indicateur+'</td>'+
                '<td>'+arr[i].descriptif_indicateur+'</td>'+
                '<td>'+arr[i].valeur_indicateur+'</td>'+
                '<td>'+
                    '<div class="btn-group btn-group-xs dropup">'+
                        '<button type="button" class="btn btn-info btn-pretty dropdown-toggle" data-toggle="dropdown">'+
                            '<i class="fa fa-cog"></i> <span class="caret"></span>'+
                        '</button>'+
                        '<ul class="dropdown-menu dropdown-menu-right" role="menu">'+
                            '<li><a href="#" onclick="afficheModifIndicateur('+arr[i].id_indicateur+')"><i class="fa fa-check text-success"></i> Modifier</a></li>'+
                            '<li><a href="#" onclick="confirmSupIndicateur('+arr[i].id_indicateur+');" data-toggle="modal" data-target="#myModal_'+arr[i].id_indicateur+'"><i class="fa fa-trash text-danger"></i> Supprimer</a></li>'+
                        '</ul>'+
                        '<div class="modal fade" id="myModal_'+arr[i].id_indicateur+'" role="dialog">'+
                          '<div class="modal-dialog">'+
                            '<div class="modal-content">'+
                              '<div class="modal-header">'+
                                '<button type="button" class="close" data-dismiss="modal">&times;</button>'+
                                '<h4 class="modal-title">Supprimer '+arr[i].denomination_indicateur+'?</h4>'+
                              '</div>'+
                              '<div class="modal-body">'+
                                '<p><button type="button" class="btn btn-warning btn-lg" onclick="supprimerIndicateur('+arr[i].id_indicateur+')">Supprimer</button>'+
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
      $('#listesdesindicateurs').append(out);
    }
    initPage();
    //setTimeout(function () { app.dialog.close(); }, 1000);
    }, 1000);
  }

//---------Affiche le dernier enregistrement----------
function dernierEnregistrementIndicateur(){
    setTimeout(function () { 
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
              if (this.readyState == 4 && this.status == 200) {
                //alert(this.responseText);
                  var arr = JSON.parse(this.responseText);                
                  var out = "";
                  var i;
                for(i = 0; i < arr.length; i++) {                  
                out = '<tr id="indicateur_'+arr[i].id_indicateur+'">'+
                      '<th scope="row">'+arr[i].id_indicateur+'</th>'+
                      '<td>'+arr[i].code_indicateur+'</td>'+
                      '<td>'+arr[i].denomination_indicateur+'</td>'+
                      '<td>'+arr[i].descriptif_indicateur+'</td>'+
                      '<td>'+arr[i].valeur_indicateur+'</td>'+
                      '<td>'+
                          '<div class="btn-group btn-group-xs dropup">'+
                              '<button type="button" class="btn btn-info btn-pretty dropdown-toggle" data-toggle="dropdown">'+
                                  '<i class="fa fa-cog"></i> <span class="caret"></span>'+
                              '</button>'+
                              '<ul class="dropdown-menu dropdown-menu-right" role="menu">'+
                                  '<li><a href="#" onclick="afficheModifIndicateur('+arr[i].id_indicateur+')"><i class="fa fa-check text-success"></i> Modifier</a></li>'+
                                  '<li><a href="#" onclick="confirmSupIndicateur('+arr[i].id_indicateur+');" data-toggle="modal" data-target="#myModal_'+arr[i].id_indicateur+'"><i class="fa fa-trash text-danger"></i> Supprimer</a></li>'+
                              '</ul>'+
                              '<div class="modal fade" id="myModal_'+arr[i].id_indicateur+'" role="dialog">'+
                                '<div class="modal-dialog">'+
                                  '<div class="modal-content">'+
                                    '<div class="modal-header">'+
                                      '<button type="button" class="close" data-dismiss="modal">&times;</button>'+
                                      '<h4 class="modal-title">Supprimer '+arr[i].denomination_indicateur
                                      +'?</h4>'+
                                    '</div>'+
                                    '<div class="modal-body">'+
                                      '<p><button type="button" class="btn btn-warning btn-lg" onclick="supprimerIndicateur('+arr[i].id_indicateur+')">Supprimer</button>'+
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
                   $('#listesdesindicateurs').prepend(out);
                }
                setTimeout(function () { }, 1000);}
            };
            var parameters="method=dernier";
            //var parameters="limit=5";
            xhttp.open("POST", "http://"+localStorage.getItem("cam")+"/asa/indicateurs.php", true);
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhttp.send(parameters);
    }, 1000);
}

  function enregistrerIndicateurs(){
    if (localStorage.getItem('indicateuramodifier') == "" || localStorage.getItem('indicateuramodifier') == null) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
                  //return this.responseText;
                  //alert(this.responseText);
            if (this.responseText==2) { 
              dernierEnregistrementIndicateur();listeIndicateurs();
              document.getElementById("codeIndic").value="";
              document.getElementById("denominationIndic").value="";
              document.getElementById("descriptifIndic").value="";
              document.getElementById("valeurIndic").value="";

              swal("Bon travail!", "indicateur ajouté avec succès!", "success");
            }
            else{
              swal("Mauvais travail!", "Ajout échoué, recommencez!", "error");
            }
          }
        };
    
        var codeIndic = document.getElementById("codeIndic").value;
        var denominationIndic = document.getElementById("denominationIndic").value;
        var descriptifIndic = document.getElementById("descriptifIndic").value;
        var valeurIndic = document.getElementById("valeurIndic").value;
    
        var parameters="method=creer&codeIndic="+codeIndic+"&denominationIndic="+denominationIndic+"&descriptifIndic="+descriptifIndic+"&valeurIndic="+valeurIndic;
        //var parameters="limit=5";
        xhttp.open("POST", "http://"+localStorage.getItem("cam")+"/asa/indicateurs.php", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(parameters);
    
      }else{
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            //return this.responseText;
            //alert(this.responseText);
          if (this.responseText==1) { 
            var codeIndic = document.getElementById("codeIndic").value;
            var denominationIndic = document.getElementById("denominationIndic").value;
            var descriptifIndic = document.getElementById("descriptifIndic").value;
            var valeurIndic = document.getElementById("valeurIndic").value;
            var id = localStorage.getItem("indicateuramodifier");
            setTimeout(function () { 
              document.getElementById("indicateur_"+id).innerHTML = '<th scope="row">'+id+'</th>'+
                                                          '<td>'+codeIndic+'</td>'+
                                                          '<td>'+denominationIndic+'</td>'+
                                                          '<td>'+descriptifIndic+'</td>'+
                                                          '<td>'+valeurIndic+'</td>'+
                                                          '<td>'+
                                                          '<div class="btn-group btn-group-xs dropup">'+
                                                                  '<button type="button" class="btn btn-info btn-pretty dropdown-toggle" data-toggle="dropdown">'+
                                                                      '<i class="fa fa-cog"></i> <span class="caret"></span>'+
                                                                  '</button>'+
                                                                  '<ul class="dropdown-menu dropdown-menu-right" role="menu">'+
                                                                      '<li><a href="#" onclick="afficheModifIndicateur('+id+')"><i class="fa fa-check text-success"></i> Modifier</a></li>'+
                                                                      '<li><a href="#" onclick="confirmSupIndicateur('+id+');" data-toggle="modal" data-target="#myModal_'+id+'"><i class="fa fa-trash text-danger"></i> Supprimer</a></li>'+
                                                                  '</ul>'+
                                                                  '<div class="modal fade" id="myModal_'+id+'" role="dialog">'+
                                                                    '<div class="modal-dialog">'+
                                                                      '<div class="modal-content">'+
                                                                        '<div class="modal-header">'+
                                                                          '<button type="button" class="close" data-dismiss="modal">&times;</button>'+
                                                                          '<h4 class="modal-title">Supprimer '+denominationIndic+'?</h4>'+
                                                                        '</div>'+
                                                                        '<div class="modal-body">'+
                                                                          '<p><button type="button" class="btn btn-warning btn-lg" onclick="supprimerIndicateur('+id+')">Supprimer</button>'+
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
          listeIndicateurs();
          document.getElementById("codeIndic").value="";
          document.getElementById("denominationIndic").value="";
          document.getElementById("descriptifIndic").value="";
          document.getElementById("valeurIndic").value="";
          localStorage.setItem("indicateuramodifier","");
          document.getElementById("enregistrerindicateur").disabled=true;
        }, 1000);
      }
    }
      };
        var codeIndic = document.getElementById("codeIndic").value;
        var denominationIndic = document.getElementById("denominationIndic").value;
        var descriptifIndic = document.getElementById("descriptifIndic").value;
        var valeurIndic = document.getElementById("valeurIndic").value;
        var k = localStorage.getItem("indicateuramodifier");
    
        var parameters="id="+k+"&method=modif&codeIndic="+codeIndic+"&denominationIndic="+denominationIndic+"&descriptifIndic="+descriptifIndic+"&valeurIndic="+valeurIndic;
        //var parameters="limit=5";
        xhttp.open("POST", "http://"+localStorage.getItem("cam")+"/asa/indicateurs.php", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(parameters); 
      }
}