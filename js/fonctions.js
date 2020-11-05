/*
 * Projet : FEUILLE DE ROUTE MINESUP
 * Code JAVASCRIPT : fonctions.js
 ************************************************
 * Auteur : Valentin Magde,Demasso James,Nebo Djomche Joress
 * E-mails : <valentinmagde@gmail.com>
 */

function logout() {
    //Vider la cache
    localStorage.clear();

    //Reactualiser le navigateur
    document.location.reload();

    //Rediriger vers la page de connexion
    window.location.href = "/feuille-tour-client";
}

/* Inclure un document html */
function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /*loop through a collection of all HTML elements:*/
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /*make an HTTP request using the attribute value as the file name:*/
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {elmnt.innerHTML = this.responseText;}
          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
          /*remove the attribute, and call this function once more:*/
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      }      
      xhttp.open("GET", file, true);
      xhttp.send();
      /*exit the function:*/
      return;
    }
  }
}


/******* afficher l'avatar de l'utilisateur ********/
//Afficher l'avatar de l'utilisateur connecté
function afficheAvatar() {
    chargerTb(10)
        .then((res) => {
            var arr1 = JSON.parse(res);
            //Verification du local storage, si vide renvoies sur la page de login
            if (localStorage.getItem('id') == null || localStorage.getItem('cam') == null) {
                window.location.href = "/feuille-tour-client";
            } 
            else {
                for (var i = 0; i < arr1.length; i++) {
                    if (arr1[i].id_utilisateur == localStorage.getItem('id')) {
                        
                        $('img').attr('alt', arr1[i].nom_utilisateur);
                        var x = document.getElementById("user-avatar");

                        //avatar par defaut si avatar non attribué
                        if (arr1[i].avatar == null) {
                            if (unsexe(arr1[i].id_sexe) == "homme") {
                                x.setAttribute("src", "../../img/users/8.png");
                            } else if (unsexe(arr1[i].id_sexe) == "femme") {
                                x.setAttribute("src", "../../img/users/9.jpg");
                            }

                            // enregistrement de l'avatar en backend
                        } else {
                            x.setAttribute("src", "http://" + localStorage.getItem("cam") + "/asa/" + arr1[i].avatar)
                        }
                    }
                }
            }
        })

}
