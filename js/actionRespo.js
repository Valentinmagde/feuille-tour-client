/*
* Projet : FEUILLE DE ROUTE MINESUP
* Code JAVASCRIPT : actionRespo.js
************************************************
* Auteur : Valentin Magde,Demasso James,Nebo Djomche Joress
* E-mails : <valentinmagde@gmail.com>
*/
	
// Afficher la liste des action d'un responsable
function afficheListeActionsRespo(){
    setTimeout(function () {  
        var arr = JSON.parse(localStorage.getItem("BDaction"));
        var arr1 = JSON.parse(localStorage.getItem("BDprogramme"));               
        var out = "";
        var i, id_programme;
        for (var i = arr1.length - 1; i >= 0; i--) {
          if (localStorage.getItem("id") == arr1[i].id_responsable) {
            id_programme = arr1[i].id_programme;
          }
        }
        for(var j = 0; j < arr.length; j++) { 
            if (arr[j].id_programme == id_programme) {
              out = '<tr id="action_'+arr[j].id_action+'">'+
                    '<th scope="row">'+arr[j].id_action+'</th>'+
                    '<td>'+arr[j].code_action+'</td>'+
                    '<td>'+arr[j].denomination_action+'</td>'+
                    '<td>'+arr[j].indicateur_action+'</td>'+
                    '<td>'+arr[j].date_action+'</td>'+
                '</tr>';
                    //alert(out);
              $('#listesdesactions').append(out);
            }
      }
      initPage();
      //setTimeout(function () { app.dialog.close(); }, 1000);
      }, 1000);
}