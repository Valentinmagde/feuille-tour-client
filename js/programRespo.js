/*
* Projet : FEUILLE DE ROUTE MINESUP
* Code JAVASCRIPT : programRespo.js
************************************************
* Auteur : Valentin Magde,Demasso James,Nebo Djomche Joress
* E-mails : <valentinmagde@gmail.com>
*/

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

//-----Affiche la liste de tous les programmes-----
function afficheListeProgrammesRespo(){
    setTimeout(function () { 
      var arr = JSON.parse(localStorage.getItem("BDprogramme"));                
      var out = "";
      var i;
    for(i = 0; i < arr.length; i++) { 
      if (localStorage.getItem("id") == arr[i].id_responsable) {
          out = '<tr id="programme_'+arr[i].id_programme+'">'+
            '<th scope="row">'+arr[i].id_programme+'</th>'+
            '<td>'+arr[i].code_programme+'</td>'+
            '<td>'+arr[i].denomination_programme+'</td>'+
            '<td>'+arr[i].descriptif_programme+'</td>'+
            '<td>'+unUtilisateur(arr[i].id_responsable)+'</td>'+
        '</tr>';
                  //alert(out);
         $('#listeprogrammes').append(out);
      }
    }
    initPage();
    //setTimeout(function () { app.dialog.close(); }, 1000);
    }, 1000);
  }