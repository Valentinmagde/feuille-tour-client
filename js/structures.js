/*
* Projet : FEUILLE DE ROUTE MINESUP
* Code JAVASCRIPT : structures.js
************************************************
* Auteur : Valentin Magde,Demasso James,Nebo Djomche Joress
* E-mails : <valentinmagde@gmail.com>
*/

function verificationVide(){
            var code = document.getElementById("code").value;
            var intitule = document.getElementById("intitule").value;
            var descriptif = document.getElementById("descriptif").value;
            var type = localStorage.getItem('selectedtypestructure');

            if (code.length == 0 || intitule.length == 0) {
                 document.getElementById("envoyerstructure").disabled = true;
            }else{
                document.getElementById("envoyerstructure").disabled = false;
            }
}
//-------------------
function changerType(){
  if (document.getElementById('listetypestructure').value == "" || document.getElementById('listetypestructure').value == 0) { 
    localStorage.setItem('selectedtypestructure',"");
    document.getElementById("envoyerstructure").disabled = true;
  verificationVide();
  }else{
     document.getElementById("envoyerstructure").disabled = false;
  verificationVide();
  } 
  localStorage.setItem('selectedtypestructure',document.getElementById('listetypestructure').value);
}

//-------------------
function modifierStructure(k){
          var xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
              //return this.responseText;
              //alert(this.responseText);
            if (this.responseText==1) { 
                swal("Bravoo!", "Structure modifiée avec succès!", "success");
              }
              else{
                swal("Oops!", "Modification échouée, recommencez!", "error");
              }
            }
          };
          
          var x = document.getElementById('code1'+k+'').value;
          var y = document.getElementById('intitule1'+k+'').value;
          var z = document.getElementById('descriptif1'+k+'').value;

          var parameters="method=modif&code="+x+"&intitule="+y+"&descriptif="+z+"&id="+k;
          //var parameters="limit=5";
          xhttp.open("POST", "http://"+localStorage.getItem("cam")+"/asa/structures.php", true);
          xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
          xhttp.send(parameters);
}
//-------------------
function supprimerStructure(k){
          var xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
              //return this.responseText;
              //alert(this.responseText);
            if (this.responseText==3) { $('#structure_'+k).hide(1000); listeStructures(); reset();}
            }
          };
          var parameters="method=suppr&id="+k;
          //var parameters="limit=5";
          xhttp.open("POST", "http://"+localStorage.getItem("cam")+"/asa/structures.php", true);
          xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
          xhttp.send(parameters);
}
//-------------------
function dernierEnregistrement(){
  setTimeout(function () { 
          var xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
              //alert(this.responseText);
                var arr = JSON.parse(this.responseText);                
                var out = "";
                var i;
              for(i = 0; i < arr.length; i++) {                  
              out = '<tr id="structure_'+arr[i].id_structure+'">'+
                    '<th scope="row">'+arr[i].id_structure+'</th>'+
                    '<td>'+arr[i].code_structure+'</td>'+
                    '<td>'+arr[i].intitule_structure+'</td>'+
                    '<td>'+unTypeStructure(arr[i].id_type_structure)+'</td>'+
                    '<td>'+
                        '<div class="btn-group btn-group-xs dropup">'+
                            '<button type="button" class="btn btn-info btn-pretty dropdown-toggle" data-toggle="dropdown">'+
                                '<i class="fa fa-cog"></i> <span class="caret"></span>'+
                            '</button>'+
                            '<ul class="dropdown-menu dropdown-menu-right" role="menu">'+
                                '<li><a href="#" onclick="afficheModifStructure('+arr[i].id_structure+')"><i class="fa fa-check text-success"></i> Modifier</a></li>'+
                                '<li><a href="#" onclick="confirmSupStructure('+arr[i].id_structure+');" data-toggle="modal" data-target="#myModal_'+arr[i].id_structure+'"><i class="fa fa-trash text-danger"></i> Supprimer</a></li>'+
                            '</ul>'+
                            '<div class="modal fade" id="myModal_'+arr[i].id_structure+'" role="dialog">'+
                              '<div class="modal-dialog">'+
                                '<div class="modal-content">'+
                                  '<div class="modal-header">'+
                                    '<button type="button" class="close" data-dismiss="modal">&times;</button>'+
                                    '<h4 class="modal-title">Supprimer '+arr[i].intitule_structure+'?</h4>'+
                                  '</div>'+
                                  '<div class="modal-body">'+
                                    '<p><button type="button" class="btn btn-warning btn-lg" onclick="supprimerStructure('+arr[i].id_structure+')">Supprimer</button>'+
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
                 $('#listestructures').prepend(out);
              }
              setTimeout(function () { }, 1000);}
          };
          var parameters="method=dernier";
          //var parameters="limit=5";
          xhttp.open("POST", "http://"+localStorage.getItem("cam")+"/asa/structures.php", true);
          xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
          xhttp.send(parameters);
  }, 1000);
}
//-------------------
function validerCreerStructure(){
  if (localStorage.getItem('structureamodifier') == "" || localStorage.getItem('structureamodifier') == null) {
          var xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
              //return this.responseText;
            if (this.responseText==2) { 
              dernierEnregistrement();listeStructures();localStorage.setItem('selectedtypestructure',"");
              document.getElementById("code").value="";
              document.getElementById("intitule").value="";
              document.getElementById("descriptif").value="";
              localStorage.setItem("selectedtypestructure","");
              //reset();
              swal("Bravoo!", "Structure ajoutée avec succès!", "success");
            }else{
              swal("Oops!", "Ajout echoué, recommencez!", "error");
            }
            }
          };

            var code = document.getElementById("code").value;
            var intitule = document.getElementById("intitule").value;
            var descriptif = document.getElementById("descriptif").value;
            var type = localStorage.getItem("selectedtypestructure");

          var parameters="method=creer&code="+code+"&intitule="+intitule+"&descriptif="+descriptif;
          //var parameters="limit=5";
          xhttp.open("POST", "http://"+localStorage.getItem("cam")+"/asa/structures.php", true);
          xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
          xhttp.send(parameters);

  }else{
          var xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
              //return this.responseText;
              //alert(this.responseText);
            if (this.responseText==1) { 
              var code = document.getElementById("code").value;
              var intitule = document.getElementById("intitule").value;
              var descriptif = document.getElementById("descriptif").value;
              var id = localStorage.getItem("structureamodifier");
              var idtype = localStorage.getItem("selectedtypestructure");
              setTimeout(function () { 
              document.getElementById("structure_"+id).innerHTML = '<th scope="row">'+id+'</th>'+
                                                      '<td>'+code+'</td>'+
                                                      '<td>'+intitule+'</td>'+
                                                      '<td>'+unTypeStructure(idtype)+'</td>'+
                                                      '<td>'+
                                                          '<div class="btn-group btn-group-xs dropup">'+
                                                              '<button type="button" class="btn btn-info btn-pretty dropdown-toggle" data-toggle="dropdown">'+
                                                                  '<i class="fa fa-cog"></i> <span class="caret"></span>'+
                                                              '</button>'+
                                                              '<ul class="dropdown-menu dropdown-menu-right" role="menu">'+
                                                                  '<li><a href="#" onclick="afficheModifStructure('+arr[i].id_structure+')"><i class="fa fa-check text-success"></i> Modifier</a></li>'+
                                                                  '<li><a href="#" onclick="confirmSupStructure('+id+');" data-toggle="modal" data-target="#myModal_'+id+'"><i class="fa fa-trash text-danger"></i> Supprimer</a></li>'+
                                                              '</ul>'+
                                                              '<div class="modal fade" id="myModal_'+id+'" role="dialog">'+
                                                                '<div class="modal-dialog">'+
                                                                  '<div class="modal-content">'+
                                                                    '<div class="modal-header">'+
                                                                      '<button type="button" class="close" data-dismiss="modal">&times;</button>'+
                                                                      '<h4 class="modal-title">Supprimer '+intitule+'?</h4>'+
                                                                    '</div>'+
                                                                    '<div class="modal-body">'+
                                                                      '<p><button type="button" class="btn btn-warning btn-lg" onclick="supprimerStructure('+id+')">Supprimer</button>'+
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
              listeStructures();
              document.getElementById("code").value="";
              document.getElementById("intitule").value="";
              document.getElementById("descriptif").value="";
              localStorage.setItem("selectedtypestructure","");
              localStorage.setItem("structureamodifier","");
              reset();
            }, 1000);
              }
            }
          };
          var code = document.getElementById("code").value;
          var intitule = document.getElementById("intitule").value;
          var descriptif = document.getElementById("descriptif").value;
          var type = localStorage.getItem("selectedtypestructure");            
          var k = localStorage.getItem("structureamodifier");
          var parameters="id="+k+"&method=modif&code="+code+"&intitule="+intitule+"&descriptif="+descriptif+"&type="+type;
          //var parameters="limit=5";
          xhttp.open("POST", "http://"+localStorage.getItem("cam")+"/asa/structures.php", true);
          xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
          xhttp.send(parameters);         
  }
}

//-------------------
function reset(){
  //alert();
    localStorage.setItem('structureamodifier','');  
    document.getElementById("envoyerstructure").disabled = true; 
    document.getElementById("listetypestructure").value = 0;
    listeStructures();
    document.getElementById("code").value="";
    document.getElementById("intitule").value="";
    document.getElementById("descriptif").value="";
    localStorage.setItem("selectedtypestructure","");
}
//-------------------
function afficheModifStructure(k){
    localStorage.setItem('structureamodifier',k);
    var arr = JSON.parse(localStorage.getItem("BDstructure"));                
    var out = "";
    var i; 
    for(i = 0; i < arr.length; i++) { 
          if (arr[i].id_structure == k) {
            document.getElementById("code").value = arr[i].code_structure;
            document.getElementById("intitule").value = arr[i].intitule_structure;
            document.getElementById("descriptif").value = arr[i].descriptif_structure; 
            document.getElementById("listetypestructure").value = arr[i].id_type_structure;
            localStorage.setItem('selectedtypestructure',arr[i].id_type_structure);
            document.getElementById("envoyerstructure").disabled = false;     
          }
     }
}
//-------------------
function selectedTypeStructure(k){
  document.getElementById("envoyerstructure").disabled = true; 
  localStorage.setItem('radiotypestructure',k);
  localStorage.setItem('selectedtypestructure',document.getElementById('listetypestructure').value);
  verificationVide();
}
//-------------------
function unTypeStructure(k){
    var arr = JSON.parse(localStorage.getItem("BDtypestructure"));  
    var i; 
    for(i = 0; i < arr.length; i++) { 
          if (arr[i].id_type_structure == k) {
            return arr[i].intitule_type_structure; 
          }
     }
}
//-------------------
function afficheTypeStructure(k){
    var arr = JSON.parse(localStorage.getItem("BDtypestructure"));                
    var out = "";
    var i; 
    for(i = 0; i < arr.length; i++) { 
      out = '<option value="'+arr[i].id_type_structure+'">'+arr[i].intitule_type_structure+'</option>';       
     $('#listetypestructure').append(out);
    }
}
//-------------------
function afficheListeStructure(){
  //alert("structure");
  setTimeout(function () { 
    chargerTable(3,"BDstructure");
    var arr = JSON.parse(localStorage.getItem("BDstructure"));                
    var out = "";
    var i;
  for(i = 0; i < arr.length; i++) { 
        out = '<tr id="structure_'+arr[i].id_structure+'">'+
              '<th scope="row">'+arr[i].id_structure+'</th>'+
              '<td>'+arr[i].code_structure+'</td>'+
              '<td>'+arr[i].intitule_structure+'</td>'+
              '<td>'+arr[i].descriptif_structure+'</td>'+
              '<td>'+
                  '<div class="btn-group btn-group-xs dropup">'+
                      '<button type="button" class="btn btn-info btn-pretty dropdown-toggle" data-toggle="dropdown">'+
                          '<i class="fa fa-cog"></i> <span class="caret"></span>'+
                      '</button>'+
                      '<ul class="dropdown-menu dropdown-menu-right" role="menu">'+
                          '<li><a href="#" data-toggle="modal" data-target="#myModalUpdate_'+arr[i].id_structure+'"><i class="fa fa-check text-success"></i> Modifier</a></li>'+
                          '<li><a href="#" onclick="confirmSupStructure('+arr[i].id_structure+');" data-toggle="modal" data-target="#myModal_'+arr[i].id_structure+'"><i class="fa fa-trash text-danger"></i> Supprimer</a></li>'+
                      '</ul>'+
              
                      '<div class="modal fade" id="myModal_'+arr[i].id_structure+'" role="dialog">'+
                        '<div class="modal-dialog">'+
                          '<div class="modal-content">'+
                            '<div class="modal-header">'+
                              '<button type="button" class="close" data-dismiss="modal">&times;</button>'+
                              '<h4 class="modal-title">Supprimer '+arr[i].intitule_structure+'?</h4>'+
                            '</div>'+
                            '<div class="modal-body">'+
                              '<p><button type="button" class="btn btn-warning btn-lg" onclick="supprimerStructure('+arr[i].id_structure+')">Supprimer</button>'+
                              '<button type="button" class="btn btn-info btn-lg" style="margin-left:10px;">Annuller</button></p>'+
                            '</div>'+
                            '<div class="modal-footer">'+
                              '<button type="button" class="btn btn-default" data-dismiss="modal">Fermer</button>'+
                            '</div>'+
                          '</div>'+      
                        '</div>'+
                      '</div>'+
                  '</div>'+
                  '<div class="modal fade" id="myModalUpdate_'+arr[i].id_structure+'" role="dialog">'+
                        '<div class="modal-dialog">'+
                          '<div class="modal-content">'+
                            '<div class="modal-header">'+
                              '<button type="button" class="close" data-dismiss="modal">&times;</button>'+
                              '<h4 class="modal-title">Modification</h4>'+
                            '</div>'+
                            '<div class="modal-body">'+

                              '<div class="container-fluid">'+
                                '<form>'+
                                  '<div class="row">'+
                                    '<div class="form-group col-md-12">'+
                                      '<label for="recipient-name" class=" col-sm-3 control-label">Code:</label>'+
                                      '<div class="col-sm-9">'+
                                          '<input type="text" class="form-control" id="code1'+arr[i].id_structure+'" value='+arr[i].code_structure+' style="width: 100%">'+
                                      '</div>'+
                                    '</div>'+
                                  '</div>'+
                                  '<br>'+

                                  '<div class="row">'+
                                    '<div class="form-group col-md-12">'+
                                      '<div class="col-md-3">'+
                                        '<label for="message-text" class="col-form-label">Intitule:</label>'+
                                      '</div>'+
                                      '<div class="col-md-9">'+
                                          '<textarea type="text" class="form-control" id="intitule1'+arr[i].id_structure+'" style="width: 100%">'+arr[i].intitule_structure+'</textarea>'+
                                      '</div>'+
                                    '</div>'+
                                  '</div>'+
                                  '<br>'+

                                  '<div class="row">'+
                                    '<div class="form-group col-md-12">'+
                                      '<div class="col-md-3">'+
                                        '<label for="message-text" class="col-form-label">Descriptif:</label>'+
                                      '</div>'+
                                      '<div class="col-md-9">'+
                                          '<textarea type="text" class="form-control" id="descriptif1'+arr[i].id_structure+'" style="width: 100%">'+arr[i].descriptif_structure+'</textarea>'+
                                      '</div>'+
                                    '</div>'+
                                  '</div>'+
                                  '<br>'+
                                '</form>'+
                              '</div>'+
                            '</div>'+
                            '<div class="modal-footer">'+
                              '<button type="button" class="btn btn-primary" onclick="modifierStructure('+arr[i].id_structure+')" data-dismiss="modal">Valider</button>'+
                            '</div>'+
                          '</div>'+      
                        '</div>'+
                      '</div>'+
                  '</div>'+
                
              '</td>'+
          '</tr>';
              //alert(out);
    $('#listestructures').append(out);
  }
  initPage();
  //setTimeout(function () { app.dialog.close(); }, 1000);
  }, 1000);
}