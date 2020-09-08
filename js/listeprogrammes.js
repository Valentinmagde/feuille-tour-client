/*
* Projet : FEUILLE DE ROUTE MINESUP
* Code JAVASCRIPT : listeprogrammes.js
************************************************
* Auteur : Valentin Magde,Demasso James,Nebo Djomche Joress
* E-mails : <valentinmagde@gmail.com>
*/

//-------Supprimer un programme------------
  function supprimerProgramme(k){
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          //return this.responseText;
          //alert(this.responseText);
        if (this.responseText==3) { $('#programme_'+k).hide(1000); listeProgrammes();}
        }
      };
      var parameters="method=suppr&id="+k;
      //var parameters="limit=5";
      xhttp.open("POST", "http://"+localStorage.getItem("cam")+"/asa/programmes.php", true);
      xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhttp.send(parameters);
  }
  
  //-----Affiche la liste de tous les programmes-----
  function pageListeProgrammes(){
    setTimeout(function () { 
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          //alert(this.responseText);
            var arr = JSON.parse(this.responseText);                
            var out = "";
            var i;
          for(i = 0; i < arr.length; i++) {   
            if (localStorage.getItem("post") == 2) {
              out = '<tr id="programme_'+arr[i].id_programme+'">'+
                '<th scope="row">'+arr[i].id_programme+'</th>'+
                '<td>'+arr[i].code_programme+'</td>'+
                '<td>'+arr[i].denomination_programme+'</td>'+
                '<td>'+arr[i].descriptif_programme+'</td>'+
                '<td>'+
                    '<div class="btn-group btn-group-xs dropup">'+
                        '<button type="button" class="btn btn-info btn-pretty dropdown-toggle" data-toggle="dropdown">'+
                            '<i class="fa fa-cog"></i> <span class="caret"></span>'+
                        '</button>'+
                        '<ul class="dropdown-menu dropdown-menu-right" role="menu">'+
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
                '</td>'+
            '</tr>';
             $('#listeprogrammes').prepend(out);
           }else{
              out = '<tr id="programme_'+arr[i].id_programme+'">'+
              '<th scope="row">'+arr[i].id_programme+'</th>'+
              '<td>'+arr[i].code_programme+'</td>'+
              '<td>'+arr[i].denomination_programme+'</td>'+
              '<td>'+arr[i].descriptif_programme+'</td>'+
              '</tr>';
               $('#listeprogrammes').prepend(out);
           }               
            
          }
          initPage();
          setTimeout(function () { }, 1000);}
      };
      var parameters="method=listeProgrammeValider";
      //var parameters="limit=5";
      xhttp.open("POST", "http://"+localStorage.getItem("cam")+"/asa/programmes.php", true);
      xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhttp.send(parameters);
}, 1000);
}