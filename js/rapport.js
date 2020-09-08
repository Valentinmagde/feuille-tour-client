/*
* Projet : FEUILLE DE ROUTE MINESUP
* Code JAVASCRIPT : rapport.js
************************************************
* Auteur : Valentin Magde,Demasso James,Nebo Djomche Joress
* E-mails : <valentinmagde@gmail.com>
*/
 
 //-----Affiche le rapport par programme -----
  function afficheListeProgrammesRap(indice){
    setTimeout(function () { 
      var arr2 = JSON.parse(localStorage.getItem("BDaction"));    
      var arr1 = JSON.parse(localStorage.getItem("BDactivite"));      
      var arr = JSON.parse(localStorage.getItem("BDprogramme"));                
      var out = "";
      var id_action = [];
      var denomination_action = [];
      var indicateur_action = [];
      var id_activite = [];
      var pourcentage_action = [];
      var taille_activite_action = [];
      var htmlBuffer = [];

      document.getElementById('rap-p'+indice).innerHTML = 'Programme '+(parseInt(indice)+parseInt(1))+': '+arr[indice].denomination_programme;

      var activite = {
        id_activite: [],
        denomination: [],
        resultatj: [],
        statutj: [],
        commentairej: [],
        resultatd: [],
        statutd: [],
        commentaired: []
      }

      // Nombres des actions du programme
      var k = 0;
      for(var j = 0; j < arr2.length; j++) { 
          if (arr2[j].id_programme == arr[indice].id_programme) {
            id_action[k] = arr2[j].id_action;
            indicateur_action[k] = arr2[j].indicateur_action;
            denomination_action[k] = arr2[j].denomination_action;
            k = k + 1;
          }
      }

      //Nombre des activités par action
      var taille_activite_programme = 0;
      for (var i = 0; i < id_action.length; i++) {
        var k = 0;
        id_activite[i] = new Array();
        var a,b,resultat = 0;
        for (var j = 0; j < arr1.length; j++) {

          if(arr1[j].id_action == id_action[i]){
            activite.id_activite.push(arr1[j].id_activite)
            activite.denomination.push(arr1[j].denomination_activite)
            activite.resultatj.push(arr1[j].resultatj_activite)
            activite.statutj.push(arr1[j].statutj_activite)
            activite.commentairej.push(arr1[j].commentairej_activite)
            activite.resultatd.push(arr1[j].resultatd_activite)
            activite.statutd.push(arr1[j].statutd_activite)
            activite.commentaired.push(arr1[j].commentaired_activite)

            id_activite[i][k] = arr1[j].id_activite;
            taille_activite_programme += 1
            //Pourcentage de realisation
            if (arr1[j].statutj_activite == 2) {
              a = arr1[j].evolutionj_activite;
            }else if (arr1[j].statutj_activite == 1){
              a = 50;
            }else{
              a = arr1[j].statutj_activite;
            }
            if (arr1[j].statutd_activite == 2) {
              b = arr1[j].evolutiond_activite;
            }else if (arr1[j].statutd_activite == 1){
              b = 50;
            }else{
              b = arr1[j].statutd_activite
            }
            resultat += parseInt(a)+parseInt(b);
            k += 1;
          }
        }
        taille_activite_action[i] = id_activite[i].length;
        pourcentage_action[i] = resultat;
        if (id_activite[i].length != 0) {
          pourcentage_action[i] = resultat/id_activite[i].length;
        }
      }


     var r = 0;
     for (var z = 0; z < id_action.length; z++) {
          htmlBuffer.push('<tr id="programme_'+arr1[0].id_activite+'">');
          /*Si l'action ne possede aucune activité*/
          if (z < 1 ) {
            if (id_action.length > 0) {
              /*if (taille_activite_programme > 0) {
                htmlBuffer.push('<th scope="row" rowspan='+taille_activite_programme+'>'+arr[indice].denomination_programme+'</th>'); 
              }else{
                htmlBuffer.push('<th scope="row" rowspan='+id_action.length+'>'+arr[indice].denomination_programme+'</th>'); 
              }*/
            }else{
              htmlBuffer.push('<td>-/-/-</td>'+
                              '<td>-/-/-</td>'+
                              '<td>-/-/-</td>'+
                              '<td>-/-/-</td>'+
                              '<td>-/-/-</td>'+
                              '<td>-/-/-</td>'+
                              '<td>-/-/-</td>'+
                              '<td>-/-/-</td>'+
                              '<td>-/-/-</td>'+
                              '<td>-/-/-</td></tr>'
                              );
            }
          }
          if(z < id_action.length) { 
            if (taille_activite_action[z] == 0) {
              htmlBuffer.push( '<td>'+denomination_action[z]+'</td>'+
                     '<td>'+pourcentage_action[z]+'</td>'+
                     '<td>'+indicateur_action[z]+'</td>'+
                     '<td>-/-/-</td>'+
                     '<td>-/-/-</td>'+
                     '<td>-/-/-</td>'+
                     '<td>-/-/-</td>'+
                     '<td>-/-/-</td>'+
                     '<td>-/-/-</td>'+
                     '<td>-/-/-</td></tr>');
            }else{
              htmlBuffer.push('<td rowspan='+taille_activite_action[z]+'>'+denomination_action[z]+'</td>'+
                     '<td rowspan='+taille_activite_action[z]+'>'+pourcentage_action[z].toFixed(1)+'%</td>'+
                     '<td rowspan='+taille_activite_action[z]+'>'+indicateur_action[z]+'</td>');
            }
          }

          if (taille_activite_action[z] != 0) {
            for (var i = 0; i < taille_activite_action[z]; i++) {
                var validation1 = '';
                var validation2 = '';
                var commentaire1 = '';
                var commentaire2 = '';
                if (activite.statutj[r] == 0 && activite.statutd[r] == 0) {
                  validation1 = '<button class="btn btn-danger btn-circle btn-circle-sm m-1">NO</button>';
                  validation2 = '<button class="btn btn-danger btn-circle btn-circle-sm m-1">NO</button>';
                }else if (activite.statutj[r] == 1 && activite.statutd[r] == 1) {
                  validation1 = '<button class="btn btn-success btn-circle btn-circle-sm m-1">OK</button>';
                  validation2 = '<button class="btn btn-success btn-circle btn-circle-sm m-1">OK</button>';
                }else if (activite.statutj[r] == 2 && activite.statutd[r] == 2) {
                  validation1 = '<button class="btn btn-warning btn-circle btn-circle-sm m-1">EC</button>';
                  validation2 = '<button class="btn btn-warning btn-circle btn-circle-sm m-1">EC</button>';
                }else if (activite.statutj[r] == 0 && activite.statutd[r] == 1) {
                  validation1 = '<button class="btn btn-danger btn-circle btn-circle-sm m-1">NO</button>';
                  validation2 = '<button class="btn btn-success btn-circle btn-circle-sm m-1">OK</button>';
                }else if (activite.statutj[r] == 0 && activite.statutd[r] == 2) {
                  validation1 = '<button class="btn btn-danger btn-circle btn-circle-sm m-1">NO</button>';
                  validation2 = '<button class="btn btn-warning btn-circle btn-circle-sm m-1">EC</button>';
                }else if (activite.statutj[r] == 1 && activite.statutd[r] == 0) {
                  validation1 = '<button class="btn btn-success btn-circle btn-circle-sm m-1">OK</button>';
                  validation2 = '<button class="btn btn-danger btn-circle btn-circle-sm m-1">NO</button>';
                }else if (activite.statutj[r] == 1 && activite.statutd[r] == 2) {
                  validation1 = '<button class="btn btn-success btn-circle btn-circle-sm m-1">OK</button>';
                  validation2 = '<button class="btn btn-warning btn-circle btn-circle-sm m-1">EC</button>';
                }else if (activite.statutj[r] == 2 && activite.statutd[r] == 0) {
                  validation1 = '<button class="btn btn-warning btn-circle btn-circle-sm m-1">EC</button>';
                  validation2 = '<button class="btn btn-danger btn-circle btn-circle-sm m-1">NO</button>';
                }else if (activite.statutj[r] == 2 && activite.statutd[r] == 1) {
                  validation1 = '<button class="btn btn-warning btn-circle btn-circle-sm m-1">EC</button>';
                  validation2 = '<button class="btn btn-success btn-circle btn-circle-sm m-1">OK</button>';
                }
                if (activite.commentairej[r] != null) {
                  commentaire1 = activite.commentairej[r];
                }
                if (activite.commentaired[r] != null) {
                  commentaire2 = activite.commentaired[r];
                }
                htmlBuffer.push(  
                         '<td>'+activite.denomination[r]+'</td>'+
                         '<td>'+activite.resultatj[r]+'</td>'+
                         '<td>'+validation1+'</td>'+
                         '<td>'+commentaire1+'</td>'+
                         '<td>'+activite.resultatd[r]+'</td>'+
                         '<td>'+validation2+'</td>'+
                         '<td>'+commentaire2+'</td></tr></tr>');
                r += 1;
            } 
          }  
          
     }
    out = htmlBuffer.join('\n')
    $('#listeprogrammes').append(out);
    initPage();
    //setTimeout(function () { app.dialog.close(); }, 1000);
    }, 1000);
}

 //-----Affiche le rapport général-----
  function afficheListeProgrammesRapportgeneral(){
    setTimeout(function () { 
      var arr2 = JSON.parse(localStorage.getItem("BDaction"));    
      var arr1 = JSON.parse(localStorage.getItem("BDactivite"));      
      var arr = JSON.parse(localStorage.getItem("BDprogramme"));                
      var out = "";
      var id_action = [];
      var denomination_action = [];
      var indicateur_action = [];
      var id_activite = [];
      var pourcentage_action = [];
      var taille_activite_action = [];
      var taille_activite_programme = [];
      var htmlBuffer = [];

      var activite = {
        id_activite: [],
        denomination: [],
        resultatj: [],
        statutj: [],
        commentairej: [],
        resultatd: [],
        statutd: [],
        commentaired: []
      }

      // Nombres des actions par programme
      for (var i = 0; i < arr.length; i++) {
        var k = 0;
        id_action[i] = new Array();
        indicateur_action[i] = new Array();
        denomination_action[i] = new Array();
        for(var j = 0; j < arr2.length; j++) { 
            if (arr2[j].id_programme == arr[i].id_programme) {
              id_action[i][k] = arr2[j].id_action;
              indicateur_action[i][k] = arr2[j].indicateur_action;
              denomination_action[i][k] = arr2[j].denomination_action;
              k = k + 1;
            }
        }
      }
      
      //Nombre des activités par action d'un programme
      for (var t = 0; t < arr.length; t++) {
        id_activite[t] = new Array()
        pourcentage_action[t] = new Array()
        taille_activite_action[t] = new Array()

        var y = 0;
        for (var i = 0; i < id_action[t].length; i++) {
          var k = 0;
          id_activite[t][i] = new Array();
          var a,b,resultat = 0;
          for (var j = 0; j < arr1.length; j++) {

            if(arr1[j].id_action == id_action[t][i]){
              activite.id_activite.push(arr1[j].id_activite)
              activite.denomination.push(arr1[j].denomination_activite)
              activite.resultatj.push(arr1[j].resultatj_activite)
              activite.statutj.push(arr1[j].statutj_activite)
              activite.commentairej.push(arr1[j].commentairej_activite)
              activite.resultatd.push(arr1[j].resultatd_activite)
              activite.statutd.push(arr1[j].statutd_activite)
              activite.commentaired.push(arr1[j].commentaired_activite)

              id_activite[t][i][k] = arr1[j].id_activite;
              y += 1;

              //Pourcentage de realisation
              if (arr1[j].statutj_activite == 2) {
                a = arr1[j].evolutionj_activite;
              }else if (arr1[j].statutj_activite == 1){
                a = 50;
              }else{
                a = arr1[j].statutj_activite;
              }
              if (arr1[j].statutd_activite == 2) {
                b = arr1[j].evolutiond_activite;
              }else if (arr1[j].statutd_activite == 1){
                b = 50;
              }else{
                b = arr1[j].statutd_activite
              }
              resultat += parseInt(a)+parseInt(b);
              k += 1;
            }
            pourcentage_action[t][i] = resultat/id_activite[t][i].length;
          }
          taille_activite_action[t][i] = id_activite[t][i].length;
          pourcentage_action[t][i] = resultat;
          if (id_activite[t][i].length != 0) {
            pourcentage_action[t][i] = resultat/id_activite[t][i].length;
          }
        }
        taille_activite_programme[t] = y;
      }
      
      var tailleactiviteprogramme = [];
      for (var i = 0; i < arr.length; i++) {
         if (taille_activite_programme[i] == 0) {
            tailleactiviteprogramme[i] = 1
         }else{
          tailleactiviteprogramme[i] = taille_activite_programme[i]
         }
      }

    for (var i = 0; i < arr.length; i++) {
        var r = 0;
        for (var z = 0; z < id_action[i].length; z++) {
            var tailleactiviteaction;

            if(id_activite[i][z] != null){
                tailleactiviteaction = id_activite[i][z].length;
            }else{
              tailleactiviteaction = -1;
            }
            htmlBuffer.push('<tr id="programme_'+arr1[0].id_activite+'">');
            /*
             *Affichage du programme juste à la premiere iteration
             *Affichage du programme sans doublon
            */
            if (z < 1 ) {
                if (id_action[i].length > 0) {
                  if(taille_activite_programme[i] > 0) {
                    htmlBuffer.push('<th scope="row" rowspan='+taille_activite_programme[i]+'>'+arr[i].denomination_programme+'</th>');
                  }else{
                    htmlBuffer.push('<th scope="row" rowspan='+id_action[i].length+'>'+arr[i].denomination_programme+'</th>'); 
                  }
                }
                else{
                  htmlBuffer.push('<th scope="row" rowspan='+taille_activite_programme[i]+1+'>'+arr[i].denomination_programme+'</th>'+
                        '<td>-/-/-</td>'+
                        '<td>-/-/-</td>'+
                        '<td>-/-/-</td>'+
                        '<td>-/-/-</td>'+
                        '<td>-/-/-</td>'+
                        '<td>-/-/-</td>'+
                        '<td>-/-/-</td>'+
                        '<td>-/-/-</td>'+
                        '<td>-/-/-</td>'+
                        '<td>-/-/-</td></tr>');
                }
            }
            if(z < id_action[i].length) { 
              if (tailleactiviteaction == 0) {
                htmlBuffer.push( '<td>'+denomination_action[i][z]+'</td>'+
                       '<td>'+pourcentage_action[i][z]+'</td>'+
                       '<td>'+indicateur_action[i][z]+'</td>'+
                       '<td>-/-/-</td>'+
                       '<td>-/-/-</td>'+
                       '<td>-/-/-</td>'+
                       '<td>-/-/-</td>'+
                       '<td>-/-/-</td>'+
                       '<td>-/-/-</td>'+
                       '<td>-/-/-</td></tr>');
              }
              else{
                  htmlBuffer.push('<td rowspan='+tailleactiviteaction+'>'+denomination_action[i][z]+'</td>'+
                         '<td rowspan='+tailleactiviteaction+'>'+pourcentage_action[i][z].toFixed(1)+'%</td>'+
                         '<td rowspan='+tailleactiviteaction+'>'+indicateur_action[i][z]+'</td>');
              }
            }
            if (tailleactiviteaction > 0 ) {
              for (var t = 0; t < tailleactiviteaction; t++) {
                  var validation1 = '';
                  var validation2 = '';
                  var commentaire1 = '';
                  var commentaire2 = '';
                  if (activite.statutj[r] == 0 && activite.statutd[r] == 0) {
                    validation1 = '<button class="btn btn-danger btn-circle btn-circle-sm m-1">NO</button>';
                    validation2 = '<button class="btn btn-danger btn-circle btn-circle-sm m-1">NO</button>';
                  }else if (activite.statutj[r] == 1 && activite.statutd[r] == 1) {
                    validation1 = '<button class="btn btn-success btn-circle btn-circle-sm m-1">OK</button>';
                    validation2 = '<button class="btn btn-success btn-circle btn-circle-sm m-1">OK</button>';
                  }else if (activite.statutj[r] == 2 && activite.statutd[r] == 2) {
                    validation1 = '<button class="btn btn-warning btn-circle btn-circle-sm m-1">EC</button>';
                    validation2 = '<button class="btn btn-warning btn-circle btn-circle-sm m-1">EC</button>';
                  }else if (activite.statutj[r] == 0 && activite.statutd[r] == 1) {
                    validation1 = '<button class="btn btn-danger btn-circle btn-circle-sm m-1">NO</button>';
                    validation2 = '<button class="btn btn-success btn-circle btn-circle-sm m-1">OK</button>';
                  }else if (activite.statutj[r] == 0 && activite.statutd[r] == 2) {
                    validation1 = '<button class="btn btn-danger btn-circle btn-circle-sm m-1">NO</button>';
                    validation2 = '<button class="btn btn-warning btn-circle btn-circle-sm m-1">EC</button>';
                  }else if (activite.statutj[r] == 1 && activite.statutd[r] == 0) {
                    validation1 = '<button class="btn btn-success btn-circle btn-circle-sm m-1">OK</button>';
                    validation2 = '<button class="btn btn-danger btn-circle btn-circle-sm m-1">NO</button>';
                  }else if (activite.statutj[r] == 1 && activite.statutd[r] == 2) {
                    validation1 = '<button class="btn btn-success btn-circle btn-circle-sm m-1">OK</button>';
                    validation2 = '<button class="btn btn-warning btn-circle btn-circle-sm m-1">EC</button>';
                  }else if (activite.statutj[r] == 2 && activite.statutd[r] == 0) {
                    validation1 = '<button class="btn btn-warning btn-circle btn-circle-sm m-1">EC</button>';
                    validation2 = '<button class="btn btn-danger btn-circle btn-circle-sm m-1">NO</button>';
                  }else if (activite.statutj[r] == 2 && activite.statutd[r] == 1) {
                    validation1 = '<button class="btn btn-warning btn-circle btn-circle-sm m-1">EC</button>';
                    validation2 = '<button class="btn btn-success btn-circle btn-circle-sm m-1">OK</button>';
                  }
                  if (activite.commentairej[r] != null) {
                    commentaire1 = activite.commentairej[r];
                  }
                  if (activite.commentaired[r] != null) {
                    commentaire2 = activite.commentaired[r];
                  }

                  htmlBuffer.push(  
                           '<td>'+activite.denomination[r]+'</td>'+
                           '<td>'+activite.resultatj[r]+'</td>'+
                           '<td>'+validation1+'</td>'+
                           '<td>'+commentaire1+'</td>'+
                           '<td>'+activite.resultatd[r]+'</td>'+
                           '<td>'+validation2+'</td>'+
                           '<td>'+commentaire2+'</td></tr></tr>');
                  r += 1;
              } 
            }            
        }
    }
  out = htmlBuffer.join('\n')
  $('#listeprogrammes').append(out);
  initPage();
  //setTimeout(function () { app.dialog.close(); }, 1000);
  }, 1000);
}

 //-----Affiche le rapport général-----
  function afficheListeProgrammesRapportactivite(){
    setTimeout(function () {     
      var arr = JSON.parse(localStorage.getItem("BDactivite"));                      
      var out = "";
      var htmlBuffer = [];


    for (var i = 0; i < arr.length; i++) {
        var validation1 = '';
        var validation2 = '';
        var commentaire1 = '';
        var commentaire2 = '';
        if (arr[i].statutj_activite == 0 && arr[i].statutd_activite == 0) {
          validation1 = '<button class="btn btn-danger btn-circle btn-circle-sm m-1">NO</button>';
          validation2 = '<button class="btn btn-danger btn-circle btn-circle-sm m-1">NO</button>';
        }else if (arr[i].statutj_activite == 1 && arr[i].statutd_activite == 1) {
          validation1 = '<button class="btn btn-success btn-circle btn-circle-sm m-1">OK</button>';
          validation2 = '<button class="btn btn-success btn-circle btn-circle-sm m-1">OK</button>';
        }else if (arr[i].statutj_activite == 2 && arr[i].statutd_activite == 2) {
          validation1 = '<button class="btn btn-warning btn-circle btn-circle-sm m-1">EC</button>';
          validation2 = '<button class="btn btn-warning btn-circle btn-circle-sm m-1">EC</button>';
        }else if (arr[i].statutj_activite == 0 && arr[i].statutd_activite == 1) {
          validation1 = '<button class="btn btn-danger btn-circle btn-circle-sm m-1">NO</button>';
          validation2 = '<button class="btn btn-success btn-circle btn-circle-sm m-1">OK</button>';
        }else if (arr[i].statutj_activite == 0 && arr[i].statutd_activite == 2) {
          validation1 = '<button class="btn btn-danger btn-circle btn-circle-sm m-1">NO</button>';
          validation2 = '<button class="btn btn-warning btn-circle btn-circle-sm m-1">EC</button>';
        }else if (arr[i].statutj_activite == 1 && arr[i].statutd_activite == 0) {
          validation1 = '<button class="btn btn-success btn-circle btn-circle-sm m-1">OK</button>';
          validation2 = '<button class="btn btn-danger btn-circle btn-circle-sm m-1">NO</button>';
        }else if (arr[i].statutj_activite == 1 && arr[i].statutd_activite == 2) {
          validation1 = '<button class="btn btn-success btn-circle btn-circle-sm m-1">OK</button>';
          validation2 = '<button class="btn btn-warning btn-circle btn-circle-sm m-1">EC</button>';
        }else if (arr[i].statutj_activite == 2 && arr[i].statutd_activite == 0) {
          validation1 = '<button class="btn btn-warning btn-circle btn-circle-sm m-1">EC</button>';
          validation2 = '<button class="btn btn-danger btn-circle btn-circle-sm m-1">NO</button>';
        }else if (arr[i].statutj_activite == 2 && arr[i].statutd_activite == 1) {
          validation1 = '<button class="btn btn-warning btn-circle btn-circle-sm m-1">EC</button>';
          validation2 = '<button class="btn btn-success btn-circle btn-circle-sm m-1">OK</button>';
        }
        if (arr[i].commentairej_activite != null) {
          commentaire1 = arr[i].commentairej_activite;
        }
        if (arr[i].commentaired_activite != null) {
          commentaire2 = arr[i].commentaired_activite;
        }

        htmlBuffer.push('<tr id="activite_'+arr[i].id_activite+'">'+
                 '<td>'+arr[i].denomination_activite+'</td>'+
                 '<td>'+arr[i].resultatj_activite+'</td>'+
                 '<td>'+validation1+'</td>'+
                 '<td>'+commentaire1+'</td>'+
                 '<td>'+arr[i].resultatd_activite+'</td>'+
                 '<td>'+validation2+'</td>'+
                 '<td>'+commentaire2+'</td></tr>');
        
    }
  out = htmlBuffer.join('\n')
  $('#listeprogrammes').append(out);
  initPage();
  //setTimeout(function () { app.dialog.close(); }, 1000);
  }, 1000);
}

function getMois(id){
  if (id == 1) {return 'Janvier';}
  else if (id == 2) {return 'Fevrier';}
  else if (id == 3) {return 'Mars';}
  else if (id == 4) {return 'Avril';}
  else if (id == 5) {return 'Mai';}
  else if (id == 6) {return 'Juin';}
  else if (id == 7) {return 'Juillet';}
  else if (id == 8) {return 'Aôut';}
  else if (id == 9) {return 'Septembre';}
  else if (id == 10) {return 'Octobre';}
  else if (id == 11) {return 'Novembre';}
  else if (id == 12) {return 'Decembre';}
}
/*Fonction permettant d'imprimer un rapport en pdf*/
function createPDF(id) {
    var arr = JSON.parse(localStorage.getItem("BDprogramme"));
    var titre = '';
    var d = new Date();
    var sTable = document.getElementById('table-responsive').innerHTML;
    var image = '<img src="img/entete.png" class="logo">';
    var style = "<style>";

    if (id == 0 || id == 1 || id == 2 || id == 3) {
      titre = arr[id].denomination_programme;
    }else if (id == 5) {
      titre = "RAPPORT GENERAL DE LA FEUILLE DE ROUTE";
    }else if (id == 6) {
      titre = "RAPPORT PAR ACTIVITE DE LA FEUILLE DE ROUTE";
    }else{
      titre = "MINISTERE DE L’ENSEIGNEMENT SUPERIEUR";
    }

    style = style + "@media print";
    style = style + "{";
      style = style + "@page { size: auto;margin-top: 0mm;margin-bottom: 0mm; }";
      style = style + "table { page-break-after:auto}";
      style = style + "tr    { page-break-inside:avoid; page-break-after:auto;}";
      style = style + "td    { page-break-inside:avoid; page-break-after:auto;}";
      style = style + "thead { display:table-header-group }";
      style = style + "tfoot { display:table-footer-group }";
      style = style + "tr:nth-child(even) td {background: #D0E4F5 !important; -webkit-print-color-adjust: exact !important;}";
      style = style + "body{-webkit-print-color-adjust:exact !important;}";
      style = style + "table {border-collapse: separate;border :  1px solid #000000;border-spacing: 0;font-size: 11pt;width: 100%;border-color:  #000000 ;border-right: 1px solid}";
      style = style + "table td, table th {padding: 3px 2px;vertical-align: middle;}";
      style = style + "table td {border-color:  #000000 ;border-left: 1px solid;border-bottom:1px solid;border-top:1px solid }";
      style = style + "table th {border-color:  #000000 ;border-left: 1px solid;border-top:1px solid ;border-bottom:1px solid ;}";
      style = style + "table tr {border-color:  #000000 ;border-width: 1px ; border-top: 1px solid}";
      style = style + "table tbody td {font-size: 11px;}";
      style = style + "table thead{background: #1C6EA4 !important; -webkit-print-color-adjust: exact !important; ";
      style = style + "background: -moz-linear-gradient(top, #5592bb 0%, #327cad 66%, #1C6EA4 100%) !important;";
      style = style + "background: -webkit-linear-gradient(top, #5592bb 0%, #327cad 66%, #1C6EA4 100%) !important;";
      style = style + "background: linear-gradient(to bottom, #5592bb 0%, #327cad 66%, #1C6EA4 100%) !important;";
      style = style + "border-bottom: 2px solid #444444;}";
      style = style + "table thead th {font-size: 11px;font-weight: bold;color: #FFFFFF;border: 1px solid #000;text-align: center;}";
      style = style + "table thead th:first-child {border-left: none;}";
      style = style + "img {width: 100%;}";
      style = style + ".btn-circle {width: 45px;height: 45px;line-height: 45px;text-align: center;padding: 0;border-radius: 50%;}";
      style = style + ".btn-circle i {position: relative;top: -1px;}";
      style = style + ".btn-circle-sm {width: 35px;height: 35px;line-height: 35px;font-size: 0.9rem;}";
      style = style + ".btn-circle-lg {width: 55px;height: 55px;line-height: 55px;font-size: 1.1rem;}";
      style = style + ".btn-circle-xl {width: 70px;height: 70px;line-height: 70px;font-size: 1.3rem;}";
      style = style + ".btn-success {background: green;}";
      style = style + ".btn-danger {background: red;}";
      style = style + ".btn-warning {background: orange;}";
      style = style + "h2{margin-top: 70px; font-size: 15px; border: 5px outset #205867; padding: 20px 0 20px 0;}";
      style = style + "h2 span{text-align: center}";
      style = style + "h2,h3,h5 {text-align: center;}";
      style = style + ".titre-programme {font-size: 12px;}";
      style = style + ".dataTables_length, .dataTables_filter,.dataTables_info, .dataTables_paginate {display: none;}";

    style = style + "}";
    style = style + "</style>";

    // CREATE A WINDOW OBJECT.
    var win = window.open('', '', 'height=900,width=700');

    win.document.write('<html><head>');
    win.document.write('<title></title>');   // <title> FOR PDF HEADER.
    win.document.write(style);
    win.document.write('<link rel="stylesheet" href="css/lobiadmin-with-plugins.css"/>');          // ADD STYLE INSIDE THE HEAD TAG.
    win.document.write('<link rel="stylesheet" href="css/bootstrap.min.css">');
    win.document.write('<link rel="stylesheet" href="css/font-awesome.min.css"/>');
    win.document.write('<link rel="stylesheet" href="css/demo.css"/>');
    win.document.write('</head>');
    win.document.write('<body>');
    win.document.write(image);
    win.document.write('<h2>MATRICE DE PRESENTATION DE LA FEUILLE DE ROUTE : EXERCICE '+new Date().getFullYear()+'<br><span>***************</span></h2>');
    win.document.write('<br><h3>'+titre+'</h3>');
    win.document.write('<h5>'+getMois(d.getMonth()+1)+' '+new Date().getFullYear()+'</h5>');
    win.document.write('<p>Légende :&nbsp;&nbsp;');
    win.document.write('<button class="btn btn-success btn-circle btn-circle-sm m-1">OK</button> : Fait &nbsp;&nbsp;&nbsp;');
    win.document.write('<button class="btn btn-danger btn-circle btn-circle-sm m-1">NO</button>: Non fait &nbsp;&nbsp;&nbsp;');
    win.document.write('<button class="btn btn-warning btn-circle btn-circle-sm m-1">EC</button>: En cours');
    win.document.write('</p>');
    win.document.write(sTable);         // THE TABLE CONTENTS INSIDE THE BODY TAG.
    win.document.write('</body></html>');
    win.print();    // PRINT THE CONTENTS.
    win.document.close();   // CLOSE THE CURRENT WINDOW.

    
    return false;
}

/*
*
* ==========================================
* CUSTOM UTIL CLASSES
* ==========================================
*
*/