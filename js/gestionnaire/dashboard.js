/* Filtre des lavages selon deux dates */
/*   


*/
// =================== STATISTIQUE CARBURANT =================================//
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
            revenu = parseInt(revenu) + (parseInt(arr[i].index_fin) - parseInt(arr[i].index_debut)) * parseInt(arr[i].prix)
        }
    }
    document.getElementById('revenu-gasoil-genere-par-jour').innerHTML = revenu +'FCFA'
}

function afficheCuveSuperStation(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            quantiteSuperJaugeParJour(this.responseText)
            ecartSuperParJour(this.responseText)
        }
    };

    var parameters

    if(localStorage.getItem('id_station') != null)
    {
        parameters = parameters = "method=getcuvesuperstationgestionnaire&idstation=" + localStorage.getItem('id_station');
    }
    else{
        logout()
    }
    
    xhttp.open("POST", "http://" + localStorage.getItem("cam") + "/asa/gestionnaire/dashboard.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parameters);
}

function quantiteSuperJaugeParJour(data){
    let arr = JSON.parse(data)
    let qte = 0

    for(let i = 0 ; i < arr.length; i++){
        qte = arr[i].stocke_jauge
    }

    document.getElementById("qte-super-jauge-par-jour").innerHTML = `${qte} L`;
}

function ecartSuperParJour(data){
    let arr = JSON.parse(data)
    let ecart = 0

    for(let i = 0 ; i < arr.length; i++){
        ecart = parseInt(arr[i].quantite_stocke) - parseInt(arr[i].stocke_jauge)
    }

    document.getElementById("ecart-super-par-jour").innerHTML = `${ecart} L`;
}

function afficheCuveGasoilStation(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            quantiteGasoilJaugeParJour(this.responseText)
            ecartGasoilParJour(this.responseText)
        }
    };

    var parameters

    if(localStorage.getItem('id_station') != null)
    {
        parameters = parameters = "method=getcuvegasoilstationgestionnaire&idstation=" + localStorage.getItem('id_station');
    }
    else{
        logout()
    }
    
    xhttp.open("POST", "http://" + localStorage.getItem("cam") + "/asa/gestionnaire/dashboard.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parameters);
}

function quantiteGasoilJaugeParJour(data){
    let arr = JSON.parse(data)
    let qte = 0

    for(let i = 0 ; i < arr.length; i++){
        qte = arr[i].stocke_jauge
    }

    document.getElementById("qte-gasoil-jauge-par-jour").innerHTML = `${qte} L`;
}

function ecartGasoilParJour(data){
    let arr = JSON.parse(data)
    let ecart = 0

    for(let i = 0 ; i < arr.length; i++){
        ecart = parseInt(arr[i].quantite_stocke) - parseInt(arr[i].stocke_jauge)
    }

    document.getElementById("ecart-gasoil-par-jour").innerHTML = `${ecart} L`;
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

function affichePopmesStatistiqueParSemaine(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            regroupeQteCarburantParJour(this.responseText)
        }
    };

    var date = new Date();
    var semainecourante = date.getWeekNumber();
    var parameters;

    if(localStorage.getItem('id_station') != null)
    {
        parameters = parameters = "method=getpompesemainecourantegestionnaire&semainecourante=" + semainecourante+"&idstation="+localStorage.getItem('id_station');
    }
    else{
        logout()
    }
    
    xhttp.open("POST", "http://" + localStorage.getItem("cam") + "/asa/gestionnaire/dashboard.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parameters);
}

/* Regroupe quantite carburant par jour */
function regroupeQteCarburantParJour(data){
    let arr = JSON.parse(data);
    let supere = [0,0,0,0,0,0,0];
    let gasoil = [0,0,0,0,0,0,0];
    let i;
    for (i = 0; i < arr.length; i++) {
        let day = new Date(arr[i].date_mise_a_jour).getDay();
        if(arr[i].produit == 'Super')
            supere[day] += parseInt(arr[i].index_fin) - parseInt(arr[i].index_debut)
        else
            gasoil[day] += parseInt(arr[i].index_fin) - parseInt(arr[i].index_debut)
    }
    localStorage.setItem('super-semaine-courante', JSON.stringify(supere));
    localStorage.setItem('gasoil-semaine-courante', JSON.stringify(gasoil));
}


function affichePopmesStatistiqueParMois(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            regroupeRevenuCarburantParJourMois(this.responseText)
        }
    };
    var parameters;

    if(localStorage.getItem('id_station') != null)
    {
        parameters = parameters = "method=getpompemoiscourantgestionnaire&idstation="+localStorage.getItem('id_station');
    }
    else{
        logout()
    }
    
    xhttp.open("POST", "http://" + localStorage.getItem("cam") + "/asa/gestionnaire/dashboard.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parameters);
}

/* Regroupe revenu carburant par mois */
function regroupeRevenuCarburantParJourMois(data){
    let arr = JSON.parse(data);
    var now = new Date();
    var nbre_jour = new Date(now.getFullYear(), now.getMonth()+1, 0).getDate();

    var month1 = []
    var month2 = []

    for(let i=0; i < nbre_jour; i++){
        month1[i] = 0
        month2[i] = 0
    }

    let i;

    for (i = 0; i < arr.length; i++) {
        let day = new Date(arr[i].date_mise_a_jour).getDate()-1;
        if(arr[i].produit=="Super")
            month1[day] += parseInt(arr[i].prix)
        else month2[day] += parseInt(arr[i].prix)
        
    }
    localStorage.setItem('revenu-super-mois-courant', JSON.stringify(month1));
    localStorage.setItem('revenu-gasoil-mois-courant', JSON.stringify(month2));

}

// ========================= STATISTIQUE LAVAGE =============================//
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

/*===========================STATISTIQUE LAVAGE PAR JOUR ===================================*/
function afficheLavagesParJour(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            nbreLavageParJour(this.responseText);
            dureeLavageParJour(this.responseText);
            ratioLavageParJour(this.responseText);
            revenuLavageParJour(this.responseText);
        }
    };

    var parameters

    if(localStorage.getItem('id_station') != null)
    {
        parameters = parameters = "method=getLavageByDay&idstation="+localStorage.getItem('id_station');
    }
    else{
        logout()
    }
    
    xhttp.open("POST", "http://" + localStorage.getItem("cam") + "/asa/gestionnaire/dashboard.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parameters);
}

/* Nombre des lavages par jour */
function nbreLavageParJour(data){
    let arr = JSON.parse(data);

    document.getElementById('nbre-lavage-par-jour').innerHTML = arr.length
}

/* Durée des lavages par jour */
function dureeLavageParJour(data){
    let arr = JSON.parse(data);
    let duree = 0
    let minutes = 0

    for(let i=0; i<arr.length; i++){
        if(arr[i].heure_debut){
            let heure_debut = arr[i].heure_debut.split(':')
            let heure_fin = arr[i].heure_fin.split(':')

            if(parseInt(heure_debut[0]) == 0)
                heure_debut[0] = 24

            if(parseInt(heure_fin[0]) == 0)
                heure_fin[0] = 24

            let min_debut = parseInt(heure_debut[0])*60 + parseInt(heure_debut[1])
            let min_fin = parseInt(heure_fin[0])*60 + parseInt(heure_fin[1])

            minutes += min_fin - min_debut
        }

    }
    let hours = (minutes / 60);
    let rhours = Math.floor(hours);
    let aminutes = (hours - rhours) * 60;
    let rminutes = Math.round(aminutes);

    if(rhours > 0)
        duree = rhours + "h " + rminutes + "min";
    else
        duree = rminutes + "min";

    document.getElementById('duree-lavage-par-jour').innerHTML = duree
}

/* Ratio des lavages par jour */
function ratioLavageParJour(data){
    let arr = JSON.parse(data);
    let duree = 0
    let minutes = 0

    for(let i=0; i<arr.length; i++){
        if(arr[i].heure_debut){
            let heure_debut = arr[i].heure_debut.split(':')
            let heure_fin = arr[i].heure_fin.split(':')

            if(parseInt(heure_debut[0]) == 0)
                heure_debut[0] = 24

            if(parseInt(heure_fin[0]) == 0)
                heure_fin[0] = 24

            let min_debut = parseInt(heure_debut[0])*60 + parseInt(heure_debut[1])
            let min_fin = parseInt(heure_fin[0])*60 + parseInt(heure_fin[1])

            minutes += min_fin - min_debut
        }

    }
    minutes = parseInt(minutes) / arr.length
    if(isNaN(minutes))
        minutes = 0
    
    let hours = (minutes / 60);
    let rhours = Math.floor(hours);
    let aminutes = (hours - rhours) * 60;
    let rminutes = Math.round(aminutes);

    if(rhours > 0)
        duree = rhours + "h " + rminutes + "min";
    else
        duree = rminutes + "min";

    document.getElementById('ratio-lavage-par-jour').innerHTML = duree
}

/* Revenu des lavages par jour */
function revenuLavageParJour(data){
    let arr = JSON.parse(data);
    let revenu = 0

    for(let i=0; i<arr.length; i++){
        revenu = parseInt(revenu) + parseInt(arr[i].prix)
    }

    document.getElementById('revenu-lavage-par-jour').innerHTML = `${revenu} FCFA`
}

function afficheLavagesSemaineCourante(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            regroupeNbreLavageParJour(this.responseText);
            regroupeRevenuLavageParJour(this.responseText);
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

/* Regroupe nombre lavage par jour */
function regroupeNbreLavageParJour(data){
    let arr = JSON.parse(data);
    let week = [0,0,0,0,0,0,0];
    let i;
    for (i = 0; i < arr.length; i++) {
        let day = new Date(arr[i].date_lavage).getDay();
        week[day] += 1
    }
    localStorage.setItem('lavage-semaine-courante', JSON.stringify(week));
}

/* Regroupe revenu lavage par jour */
function regroupeRevenuLavageParJour(data){
    let arr = JSON.parse(data);
    let week = [0,0,0,0,0,0,0];
    let i;
    for (i = 0; i < arr.length; i++) {
        let day = new Date(arr[i].date_lavage).getDay();
        week[day] += parseInt(arr[i].prix)
    }
    localStorage.setItem('revenu-lavage-semaine-courante', JSON.stringify(week));
}

/*===========================STATISTIQUE LAVAGE PAR Mois ===================================*/
function afficheLavagesMoisCourant(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            nbreLavageParMois(this.responseText);
            dureeLavageParMois(this.responseText);
            ratioLavageParMois(this.responseText);
            revenuLavageParMois(this.responseText);
        }
    };

    var parameters

    if(localStorage.getItem('id_station') != null)
    {
        parameters = parameters = "method=getLavageByCurrentMonth&idstation="+localStorage.getItem('id_station');
    }
    else{
        logout()
    }
    
    xhttp.open("POST", "http://" + localStorage.getItem("cam") + "/asa/gestionnaire/dashboard.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parameters);
}

/* Nombre des lavages par mois */
function nbreLavageParMois(data){
    let arr = JSON.parse(data);

    document.getElementById('nbre-lavage-par-mois').innerHTML = arr.length
}

/* Durée des lavages par mois */
function dureeLavageParMois(data){
    let arr = JSON.parse(data);
    let duree = 0
    let minutes = 0

    for(let i=0; i<arr.length; i++){
        if(arr[i].heure_debut){
            let heure_debut = arr[i].heure_debut.split(':')
            let heure_fin = arr[i].heure_fin.split(':')

            if(parseInt(heure_debut[0]) == 0)
                heure_debut[0] = 24

            if(parseInt(heure_fin[0]) == 0)
                heure_fin[0] = 24

            let min_debut = parseInt(heure_debut[0])*60 + parseInt(heure_debut[1])
            let min_fin = parseInt(heure_fin[0])*60 + parseInt(heure_fin[1])

            minutes += min_fin - min_debut
        }

    }
    let hours = (minutes / 60);
    let rhours = Math.floor(hours);
    let aminutes = (hours - rhours) * 60;
    let rminutes = Math.round(aminutes);

    if(rhours > 0)
        duree = rhours + "h " + rminutes + "min";
    else
        duree = rminutes + "min";

    document.getElementById('duree-lavage-par-mois').innerHTML = duree
}

/* Ratio des lavages par mois */
function ratioLavageParMois(data){
    let arr = JSON.parse(data);
    let duree = 0
    let minutes = 0

    for(let i=0; i<arr.length; i++){
        if(arr[i].heure_debut){
            let heure_debut = arr[i].heure_debut.split(':')
            let heure_fin = arr[i].heure_fin.split(':')

            if(parseInt(heure_debut[0]) == 0)
                heure_debut[0] = 24

            if(parseInt(heure_fin[0]) == 0)
                heure_fin[0] = 24

            let min_debut = parseInt(heure_debut[0])*60 + parseInt(heure_debut[1])
            let min_fin = parseInt(heure_fin[0])*60 + parseInt(heure_fin[1])

            minutes += min_fin - min_debut
        }

    }

    minutes = minutes / arr.length
    if(isNaN(minutes))
        minutes = 0
        
    let hours = (minutes / 60);
    let rhours = Math.floor(hours);
    let aminutes = (hours - rhours) * 60;
    let rminutes = Math.round(aminutes);

    if(rhours > 0)
        duree = rhours + "h " + rminutes + "min";
    else
        duree = rminutes + "min";

    document.getElementById('ratio-lavage-par-mois').innerHTML = duree
}

/* Revenu des lavages par mois */
function revenuLavageParMois(data){
    let arr = JSON.parse(data);
    let revenu = 0

    for(let i=0; i<arr.length; i++){
        revenu = parseInt(revenu) + parseInt(arr[i].prix)
    }

    document.getElementById('revenu-lavage-par-mois').innerHTML = `${revenu} FCFA`
}


/*===========================STATISTIQUE VIDANGE PAR JOUR ===================================*/
function afficheVidangesParJour(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            nbreVidangeParJour(this.responseText);
            dureeVidangeParJour(this.responseText);
            ratioVidangeParJour(this.responseText);
        }
    };

    var parameters

    if(localStorage.getItem('id_station') != null)
    {
        parameters = parameters = "method=getVidangeByDay&idstation="+localStorage.getItem('id_station');
    }
    else{
        logout()
    }
    
    xhttp.open("POST", "http://" + localStorage.getItem("cam") + "/asa/gestionnaire/dashboard.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parameters);
}

/* Nombre des vidanges par jour */
function nbreVidangeParJour(data){
    let arr = JSON.parse(data);

    document.getElementById('nbre-vidange-par-jour').innerHTML = arr.length
}

/* Durée des vidanges par jour */
function dureeVidangeParJour(data){
    let arr = JSON.parse(data);
    let duree = 0
    let minutes = 0

    for(let i=0; i<arr.length; i++){
        if(arr[i].heure_debut){
            let heure_debut = arr[i].heure_debut.split(':')
            let heure_fin = arr[i].heure_fin.split(':')

            if(parseInt(heure_debut[0]) == 0)
                heure_debut[0] = 24

            if(parseInt(heure_fin[0]) == 0)
                heure_fin[0] = 24

            let min_debut = parseInt(heure_debut[0])*60 + parseInt(heure_debut[1])
            let min_fin = parseInt(heure_fin[0])*60 + parseInt(heure_fin[1])

            minutes += min_fin - min_debut
        }

    }
    let hours = (minutes / 60);
    let rhours = Math.floor(hours);
    let aminutes = (hours - rhours) * 60;
    let rminutes = Math.round(aminutes);

    if(rhours > 0)
        duree = rhours + "h " + rminutes + "min";
    else
        duree = rminutes + "min";

    document.getElementById('duree-vidange-par-jour').innerHTML = duree
}

/* Ratio des vidanges par jour */
function ratioVidangeParJour(data){
    let arr = JSON.parse(data);
    let duree = 0
    let minutes = 0

    for(let i=0; i<arr.length; i++){
        if(arr[i].heure_debut){
            let heure_debut = arr[i].heure_debut.split(':')
            let heure_fin = arr[i].heure_fin.split(':')

            if(parseInt(heure_debut[0]) == 0)
                heure_debut[0] = 24

            if(parseInt(heure_fin[0]) == 0)
                heure_fin[0] = 24

            let min_debut = parseInt(heure_debut[0])*60 + parseInt(heure_debut[1])
            let min_fin = parseInt(heure_fin[0])*60 + parseInt(heure_fin[1])

            minutes += min_fin - min_debut
        }

    }

    minutes = minutes/arr.length

    if(isNaN(minutes))
        minutes = 0

    let hours = (minutes / 60);
    let rhours = Math.floor(hours);
    let aminutes = (hours - rhours) * 60;
    let rminutes = Math.round(aminutes);

    if(rhours > 0)
        duree = rhours + "h " + rminutes + "min";
    else
        duree = rminutes + "min";

    document.getElementById('ratio-vidange-par-jour').innerHTML = duree
}

/* Revenu des vidanges par jour */
function revenuVidangeParJour(data){
    let arr = JSON.parse(data);
    let revenu = 0

    for(let i=0; i<arr.length; i++){
        revenu = parseInt(revenu) + parseInt(arr[i].prix)
    }

    document.getElementById('revenu-vidange-par-jour').innerHTML = `${revenu} FCFA`
}


/*===========================STATISTIQUE VIDANGE PAR Mois ===================================*/
function afficheVidangesMoisCourant(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            nbreVidangeParMois(this.responseText);
            dureeVidangeParMois(this.responseText);
            ratioVidangeParMois(this.responseText);
            regroupeVidangeParJourMois(this.responseText);
        }
    };

    var parameters

    if(localStorage.getItem('id_station') != null)
    {
        parameters = parameters = "method=getVidangeByCurrentMonth&idstation="+localStorage.getItem('id_station');
    }
    else{
        logout()
    }
    
    xhttp.open("POST", "http://" + localStorage.getItem("cam") + "/asa/gestionnaire/dashboard.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parameters);
}

/* Nombre des lavages par mois */
function nbreVidangeParMois(data){
    let arr = JSON.parse(data);

    document.getElementById('nbre-vidange-par-mois').innerHTML = arr.length
}

/* Durée des lavages par mois */
function dureeVidangeParMois(data){
    let arr = JSON.parse(data);
    let duree = 0
    let minutes = 0

    for(let i=0; i<arr.length; i++){
        if(arr[i].heure_debut){
            let heure_debut = arr[i].heure_debut.split(':')
            let heure_fin = arr[i].heure_fin.split(':')

            if(parseInt(heure_debut[0]) == 0)
                heure_debut[0] = 24

            if(parseInt(heure_fin[0]) == 0)
                heure_fin[0] = 24

            let min_debut = parseInt(heure_debut[0])*60 + parseInt(heure_debut[1])
            let min_fin = parseInt(heure_fin[0])*60 + parseInt(heure_fin[1])

            minutes += min_fin - min_debut
        }

    }
    let hours = (minutes / 60);
    let rhours = Math.floor(hours);
    let aminutes = (hours - rhours) * 60;
    let rminutes = Math.round(aminutes);

    if(rhours > 0)
        duree = rhours + "h " + rminutes + "min";
    else
        duree = rminutes + "min";

    document.getElementById('duree-vidange-par-mois').innerHTML = duree
}

/* Ratio des vidanges par mois */
function ratioVidangeParMois(data){
    let arr = JSON.parse(data);
    let duree = 0
    let minutes = 0

    for(let i=0; i<arr.length; i++){
        if(arr[i].heure_debut){
            let heure_debut = arr[i].heure_debut.split(':')
            let heure_fin = arr[i].heure_fin.split(':')

            if(parseInt(heure_debut[0]) == 0)
                heure_debut[0] = 24

            if(parseInt(heure_fin[0]) == 0)
                heure_fin[0] = 24

            let min_debut = parseInt(heure_debut[0])*60 + parseInt(heure_debut[1])
            let min_fin = parseInt(heure_fin[0])*60 + parseInt(heure_fin[1])

            minutes += min_fin - min_debut
        }

    }
    minutes = minutes/arr.length
    if(isNaN(minutes))
        minutes = 0

    let hours = (minutes / 60);
    let rhours = Math.floor(hours);
    let aminutes = (hours - rhours) * 60;
    let rminutes = Math.round(aminutes);

    if(rhours > 0)
        duree = rhours + "h " + rminutes + "min";
    else
        duree = rminutes + "min";

    document.getElementById('ratio-vidange-par-mois').innerHTML = duree
}

function regroupeVidangeParJourMois(data){
    let arr = JSON.parse(data);
    var now = new Date();
    var nbre_jour = new Date(now.getFullYear(), now.getMonth()+1, 0).getDate();

    var month1 = []
    var month2 = []

    for(let i=0; i < nbre_jour; i++){
        month1[i] = 0
        month2[i] = 0
    }

    let i;

    for (i = 0; i < arr.length; i++) {
        let day = new Date(arr[i].date_vidange).getDate()-1;
        if(arr[i].filtre=="Oui")
            month1[day] += 1
        else month2[day] += 1
        
    }
    localStorage.setItem('vidange-mois-courant-avec-flitre', JSON.stringify(month1));
    localStorage.setItem('vidange-mois-courant-sans-flitre', JSON.stringify(month2));

}

function afficheVidangesSemaineCourante(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            regroupeVidangeParJourSemaine(this.responseText);
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

function regroupeVidangeParJourSemaine(data){
    let arr = JSON.parse(data);
    let week1 = [0,0,0,0,0,0,0];
    let week2 = [0,0,0,0,0,0,0];

    for (let i = 0; i < arr.length; i++) {
        let day = new Date(arr[i].date_vidange).getDay();
        if(arr[i].filtre=="Oui")
            week1[day] += 1
        else week2[day] += 1
        
    }
    localStorage.setItem('vidange-semaine-courante-flitre', JSON.stringify(week1));
    localStorage.setItem('vidange-semaine-courante', JSON.stringify(week2));

}