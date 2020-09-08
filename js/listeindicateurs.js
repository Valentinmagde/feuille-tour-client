/*
* Projet : FEUILLE DE ROUTE MINESUP
* Code JAVASCRIPT : listeindicateurs.js
************************************************
* Auteur : Valentin Magde,Demasso James,Nebo Djomche Joress
* E-mails : <valentinmagde@gmail.com>
*/

//-----Affiche la liste de tous les indicateurs-----
function pageListeIndicateurs(){
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
                            '<li><a href="#" data-toggle="modal" data-target="#myModalUpdate_'+arr[i].id_indicateur+'"><i class="fa fa-check text-success"></i> Modifier</a></li>'+
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
                    '<div class="modal fade" id="myModalUpdate_'+arr[i].id_indicateur+'" role="dialog">'+
                        '<div class="modal-dialog">'+
                          '<div class="modal-content">'+
                            '<div class="modal-header">'+
                              '<button type="button" class="close" data-dismiss="modal">&times;</button>'+
                              '<h4 class="modal-title">Modification</h4>'+
                            '</div>'+
                            '<div class="modal-body">'+
                              '<form>'+
                              '<div class="form-group col-md-12">'+
                                '<label for="recipient-name" class="col-form-label">Code :</label>'+
                                '<input type="text" class="form-control" id="code'+arr[i].id_indicateur+'" value='+arr[i].code_indicateur+'>'+
                              '</div>'+
                              '<div class="form-group col-md-12">'+
                                '<label for="message-text" class="col-form-label">Denomination :</label>'+
                                '<input type="text" class="form-control" id="intitule'+arr[i].id_indicateur+'" value='+arr[i].denomination_indicateur+'>'+
                              '</div>'+
                              '<div class="form-group col-md-12">'+
                                '<label for="message-text" class="col-form-label">Description :</label>'+
                                '<input type="text" class="form-control" id="description'+arr[i].id_indicateur+'" value='+arr[i].descriptif_indicateur+'>'+
                              '</div>'+
                              '<div class="form-group col-md-12">'+
                                '<label for="message-text" class="col-form-label">valeur :</label>'+
                                '<input type="text" class="form-control" id="valeur'+arr[i].id_indicateur+'" value='+arr[i].valeur_indicateur+'>'+
                              '</div>'+
                            '</form>'+
                            '</div>'+
                            '<div class="modal-footer">'+
                              '<button type="button" class="btn btn-primary" onclick="modifierIndicateur('+arr[i].id_indicateur+')" data-dismiss="modal">Valider</button>'+
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


//-------Supprimer un indicateur------------
function supprimerIndicateur(k){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        //return this.responseText;
        //alert(this.responseText);
      if (this.responseText==3) { $('#indicateur_'+k).hide(1000); listeIndicateurs();}
      }
    };
    var parameters="method=suppr&id="+k;
    //var parameters="limit=5";
    xhttp.open("POST", "http://"+localStorage.getItem("cam")+"/asa/indicateurs.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parameters);
}

//-------------------
function modifierIndicateur(k){
          var xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
              //return this.responseText;
              //alert(this.responseText);
            if (this.responseText==1) { 
                swal("Bon travail!", "Indicateur modifié avec succès!", "success");
              }
              else{
                swal("Mauvais travail!", "Modification échouée, recommencez!", "error");
              }
            }
          };
          
          var x = document.getElementById('code'+k+'').value;
          var y = document.getElementById('intitule'+k+'').value;
          var z = document.getElementById('description'+k+'').value;
          var t = document.getElementById('valeur'+k+'').value;

          var parameters="method=modif&code="+x+"&intitule="+y+"&description="+z+"&valeur="+t+"&id="+k;
          //var parameters="limit=5";
          xhttp.open("POST", "http://"+localStorage.getItem("cam")+"/asa/indicateurs.php", true);
          xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
          xhttp.send(parameters);
}