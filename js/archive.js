/*
* Projet : FEUILLE DE ROUTE MINESUP
* Code JAVASCRIPT : archive.js
************************************************
* Auteur : Valentin Magde,Demasso James,Nebo Djomche Joress
* E-mails : <valentinmagde@gmail.com>
*/


function archiveProgramme(id, valeur){
  var arr = JSON.parse(localStorage.getItem("BDprogramme"));
  var id_programme = arr[id].id_programme;
  if (id_programme != null) {
    archiveAction(id_programme,valeur);
    archiveActivite(id_programme,id,valeur);
  }else{
    swal("Oops!", "Programmes non chargés, recommencez!", "error");
  }
  //Traitement
    /*setTimeOut(desactiverActiver, 1000);*/ //On attend 1 secondes avant d'exécuter la fonction
}

// Archiver les actions d'un programme
function archiveAction(id,valeur){
      var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            //return this.responseText;
            //alert(this.responseText);
            if (this.responseText == 1) { 
              var percentage = 0;
              var timer = setInterval(function(){
                percentage = percentage + 10;
                progress_bar_process(percentage, timer);
              }, 1000)
            }
          }
        }

        var k = id;
        var valeur = valeur;
    
        var parameters="method=action&id="+k+"&valeur="+valeur;
        //var parameters="limit=5";
        xhttp.open("POST", "http://"+localStorage.getItem("cam")+"/asa/archive.php", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(parameters);
        if (valeur == 0) {
          $('#process1').css('display','block');
        }else{
          $('#process').css('display','block');
        }
}

// Archiver les activtés d'un programme
function archiveActivite(id,btn,valeur){
      var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            //return this.responseText;
            //alert(this.responseText);
            if (this.responseText==2) { 
              if(valeur == 1){
                  document.getElementById(btn).disabled = true;
                  document.getElementById(btn+4).disabled = false;
              }else{
                document.getElementById(btn).disabled = false;
                document.getElementById(btn+4).disabled = true;
              }
            }
            else{
              swal("Oops!", "activites non chargés, recommencez!", "error");
            }
          }
        }
        var k = id;
        var valeur = valeur;
    
        var parameters="method=activite&id="+k+"&valeur="+valeur;
        //var parameters="limit=5";
        xhttp.open("POST", "http://"+localStorage.getItem("cam")+"/asa/archive.php", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(parameters); 
}

//Barre de progression d'arcivage
function progress_bar_process(percentage, timer){
  $('.progress-bar').css('width',percentage + '%').text(percentage + '%');
  if (percentage > 100) {
    clearInterval(timer);
    $('#process').css('display','none');
    $('#process1').css('display','none');
    $('.progress_bar').css('width','0%');

    swal("Bravoo!", "Processus terminé!", "success");
  }
}

//Charger les notificationations
function chargerTable(k,l){
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          //return this.responseText;
          localStorage.setItem(l,this.responseText); 
        }
      };
      var parameters="k="+k;
      //var parameters="limit=5";
      xhttp.open("POST", "http://"+localStorage.getItem("cam")+"/asa/chargerbd.php", true);
      xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhttp.send(parameters);
}