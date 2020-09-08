/*
* Projet : FEUILLE DE ROUTE MINESUP
* Code JAVASCRIPT : login.js
************************************************
* Auteur : Valentin Magde,Demasso James,Nebo Djomche Joress
* E-mails : <valentinmagde@gmail.com>
*/

function verificationVide(){
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  
  if (username.length == 0 || password.length == 0 ) {
       document.getElementById("login").disabled = true;
  }else{
      document.getElementById("login").disabled = false;
  }
}
