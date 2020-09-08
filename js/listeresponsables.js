/*
* Projet : FEUILLE DE ROUTE MINESUP
* Code JAVASCRIPT : listeresponsables.js
************************************************
* Auteur : Valentin Magde,Demasso James,Nebo Djomche Joress
* E-mails : <valentinmagde@gmail.com>
*/

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

  function pageListeDesResponsables(){
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