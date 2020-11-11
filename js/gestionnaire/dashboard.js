/* Filtre des lavages selon deux dates */
/*   


*/
/* Affiche les pompes mise à jour de la journée */
function affichePopmesStatistique(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            quantiteSuperVenduParJour(this.responseText)
            revenuSupergenereParJour(this.responseText)
            quantiteGasoilVenduParJour(this.responseText)
            revenuGasoilgenereParJour(this.responseText)
        }
    };

    var parameters

    if(localStorage.getItem('id_station') != null)
    {
        parameters = parameters = "method=getupdatepompegestionnaire&idstation=" + localStorage.getItem('id_station');
    }
    else{
        logout()
    }
    
    xhttp.open("POST", "http://" + localStorage.getItem("cam") + "/asa/gestionnaire/dashboard.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parameters);
}

/* Affiche la quantité du super vendu pour la journée en cours */
function quantiteSuperVenduParJour(data){
    let arr = JSON.parse(data);
    let quantite = 0

    for (let i = 0; i < arr.length; i++) {
        if(arr[i].produit == 'Super'){
            quantite = parseInt(quantite) + (parseInt(arr[i].index_fin) - parseInt(arr[i].index_debut))
        }
    }
    document.getElementById('qte-super-vendu-par-jour').innerHTML = quantite
}

/* Affiche la revenu du super généré pour la journée en cours */
function revenuSupergenereParJour(data){
    let arr = JSON.parse(data);
    let revenu = 0

    for (let i = 0; i < arr.length; i++) {
        if(arr[i].produit == 'Super'){
            revenu = parseInt(revenu) + (parseInt(arr[i].index_fin) - parseInt(arr[i].index_debut)) * parseInt(arr[i].prix)
        }
    }
    document.getElementById('revenu-super-genere-par-jour').innerHTML = revenu +'FCFA'
}

/* Affiche la quantité de gasoil vendu pour la journée en cours */
function quantiteGasoilVenduParJour(data){
    let arr = JSON.parse(data);
    let quantite = 0

    for (let i = 0; i < arr.length; i++) {
        if(arr[i].produit == 'Gasoil'){
            quantite = parseInt(quantite) + (parseInt(arr[i].index_fin) - parseInt(arr[i].index_debut))
        }
    }
    document.getElementById('qte-gasoil-vendu-par-jour').innerHTML = quantite
}

/* Affiche la revenu du super généré pour la journée en cours */
function revenuGasoilgenereParJour(data){
    let arr = JSON.parse(data);
    let revenu = 0

    for (let i = 0; i < arr.length; i++) {
        if(arr[i].produit == 'Gasoil'){
            revenu = parseInt(quantite) + (parseInt(arr[i].index_fin) - parseInt(arr[i].index_debut)) * parseInt(arr[i].prix)
        }
    }
    document.getElementById('revenu-gasoil-genere-par-jour').innerHTML = revenu +'FCFA'
}

function rechercheLavages(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            afficheNombreLavages(this.responseText)
            afficheRevenuLavages(this.responseText)
        }
    };

    var datedebut = document.getElementById('datedebut').value;
    var datefin = document.getElementById('datefin').value;
    var parameters

    if(localStorage.getItem('id_station') != null)
    {
        parameters = parameters = "method=filtrelavages&datedebut=" + datedebut + "&datefin=" + datefin + "&idstation=" + localStorage.getItem('id_station');
    }
    else{
        logout()
    }
    
    xhttp.open("POST", "http://" + localStorage.getItem("cam") + "/asa/gestionnaire/dashboard.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parameters);
}


function afficheNombreLavages(data){
    var arr = JSON.parse(data);
    var i;
    var $incv = 0
    var $incr = 0
    var $ince = 0

    for (i = 0; i < arr.length; i++) {
        if (arr[i].etat == 1)
            $incv++
        else if(arr[i].etat == 2)
            $incr++
        else
            $ince++
    }

    document.getElementById("lavages-valides").innerHTML = $incv;
    document.getElementById("lavages-rejetes").innerHTML = $incr;
    document.getElementById("lavages-en-attentes").innerHTML = $ince;
}

function afficheRevenuLavages(data){
    var arr = JSON.parse(data);
    var i;
    var som = 0
    for (i = 0; i < arr.length; i++) {
        if (arr[i].etat == 1) {
            som = parseInt(arr[i].prix) + parseInt(som)
        }
    }

    document.getElementById("revenu-lavage").innerHTML = `${som} FCFA`;
}



function rechercheVidanges(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            afficheNombreVidanges(this.responseText)
        }
    };

    var datedebut = document.getElementById('datedebut').value;
    var datefin = document.getElementById('datefin').value;
    var parameters

    if(localStorage.getItem('id_station') != null)
    {
        parameters = parameters = "method=filtrevidanges&datedebut=" + datedebut + "&datefin=" + datefin + "&idstation=" + localStorage.getItem('id_station');
    }
    else{
        logout()
    }
    
    xhttp.open("POST", "http://" + localStorage.getItem("cam") + "/asa/gestionnaire/dashboard.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parameters);
}

function afficheNombreVidanges(data){
    var arr = JSON.parse(data);
    var i;
    var $incv = 0
    var $incr = 0
    var $ince = 0
    for (i = 0; i < arr.length; i++) {
        if (arr[i].etat == 1)
            $incv++
        else if(arr[i].etat == 2)
            $incr++
        else
            $ince++
    }

    document.getElementById("vidanges-validees").innerHTML = $incv;
    document.getElementById("vidanges-rejetees").innerHTML = $incr;
    document.getElementById("vidanges-en-attentes").innerHTML = $ince;
}


function afficheVidangesAnneeCourante(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            /* alert(this.responseText) */
            regroupeVidangeParMois(this.responseText)
        }
    };
    var date = new Date()
    var anneecourante = date.getFullYear();
    var parameters

    if(localStorage.getItem('id_station') != null)
    {
        parameters = parameters = "method=filtrevidangesanneecourante&anneecourante=" + anneecourante+"&idstation="+localStorage.getItem('id_station');
    }
    else{
        logout()
    }
    
    xhttp.open("POST", "http://" + localStorage.getItem("cam") + "/asa/gestionnaire/dashboard.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parameters);
}

function regroupeVidangeParMois(data){
    let arr = JSON.parse(data);
    let mois = [0,0,0,0,0,0,0,0,0,0,0,0]
    let i;
    for (i = 0; i < arr.length; i++) {
        let month = new Date(arr[i].date_vidange).getMonth()
        mois[month] += 1
    }
    localStorage.setItem('vidange-annee-courante', JSON.stringify(mois))
}

function afficheLavagesAnneeCourante(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            /* alert(this.responseText) */
            regroupeLavageParMois(this.responseText)
        }
    };
    var date = new Date()
    var anneecourante = date.getFullYear();
    var parameters

    if(localStorage.getItem('id_station') != null)
    {
        parameters = parameters = "method=filtrelavagesanneecourante&anneecourante=" + anneecourante+"&idstation="+localStorage.getItem('id_station');
    }
    else{
        logout()
    }
    
    xhttp.open("POST", "http://" + localStorage.getItem("cam") + "/asa/gestionnaire/dashboard.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parameters);
}


Date.prototype.getWeekNumber = function(){
    var d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
    var dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    return Math.ceil((((d - yearStart) / 86400000) + 1)/7)
  };

function afficheLavagesSemaineCourante(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            regroupeLavageParJour(this.responseText);

        }
    };
    var date = new Date();
    var semainecourante = date.getWeekNumber();
    var parameters;

    if(localStorage.getItem('id_station') != null)
    {
        parameters = parameters = "method=filtrelavagessemainecourante&semainecourante=" + semainecourante+"&idstation="+localStorage.getItem('id_station');
    }
    else{
        logout()
    }
    
    xhttp.open("POST", "http://" + localStorage.getItem("cam") + "/asa/gestionnaire/dashboard.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parameters);
}
function afficheVidangesSemaineCourante(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            regroupeVidangeParJour(this.responseText);
        }
    };
    var date = new Date();
    var semainecourante = date.getWeekNumber();
    var parameters

    if(localStorage.getItem('id_station') != null)
    {
        parameters = parameters = "method=filtrevidangessemainecourante&semainecourante=" + semainecourante+"&idstation="+localStorage.getItem('id_station');
    }
    else{
        logout()
    }
    
    xhttp.open("POST", "http://" + localStorage.getItem("cam") + "/asa/gestionnaire/dashboard.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parameters);
}

function regroupeLavageParMois(data){
    let arr = JSON.parse(data);
    let mois = [0,0,0,0,0,0,0,0,0,0,0,0];
    let i;
    for (i = 0; i < arr.length; i++) {
        let month = new Date(arr[i].date_lavage).getDay();
        mois[month] += 1
    }
    localStorage.setItem('lavage-annee-courante', JSON.stringify(mois));
}

function regroupeLavageParJour(data){
    let arr = JSON.parse(data);
    let week = [0,0,0,0,0,0,0];
    let i;
    for (i = 0; i < arr.length; i++) {
        let day = new Date(arr[i].date_lavage).getDay();
        week[day] += 1
    }
    localStorage.setItem('lavage-semaine-courante', JSON.stringify(week));
}
function regroupeVidangeParJour(data){
    let arr = JSON.parse(data);
    let week1 = [0,0,0,0,0,0,0];
    let week2 = [0,0,0,0,0,0,0];

    let i;
    for (i = 0; i < arr.length; i++) {
        let day = new Date(arr[i].date_vidange).getDay();
        if(arr[i].filtre=="Oui")
            week1[day] += 1
        else week2[day] += 1
        
    }
   
    localStorage.setItem('vidange-semaine-courante-flitre', JSON.stringify(week1));
    localStorage.setItem('vidange-semaine-courante', JSON.stringify(week2));

}