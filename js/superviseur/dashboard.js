/* Filtre des lavages selon deux dates */
/*   


*/
function afficherLesOptionsDesStations() {
    chargerTb(5)
        .then((res) => {
            var arr = JSON.parse(res);
            var i;
            for (i = 0; i < arr.length; i++) {
                document.getElementById("listestations").innerHTML += '<option value="' + arr[i].id + '">'+ arr[i].nom + '</option>';
            }
        })

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

/* Afficher la liste des carburant vendu pour la date d'aujourd'hui */
function afficheCarburantParStation(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            /* alert(this.responseText) */
            regroupeSuperparStation(this.responseText)
            regroupeGasoilparStation(this.responseText)
        }
    };
    var date = new Date()
    var anneecourante = date.getFullYear();
    var parameters = parameters = "method=getupdatepompesuperviseur";
    
    xhttp.open("POST", "http://" + localStorage.getItem("cam") + "/asa/superviseur/dashboard.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parameters);
}

/* Regrouper la quantité du super vendu par station pour la journée en cours */
function regroupeSuperparStation(data){
    let arr = JSON.parse(data);
    let stations_triees = []
    let labels = []
    let stations = []

    //Compter les stations en double
    //les stokés dans le tableau stations_triees_tries avec leurs occurrences
    for (var i = 0; i < arr.length; i++) {
        let index_debut = arr[i].index_debut
        let index_fin = arr[i].index_fin

        for (let index = i + 1; index < arr.length; index++) {
            if (arr[i].id == arr[index].id && arr[i].produit == arr[index].produit) {
                index_debut = parseInt(index_debut) + parseInt(arr[index].index_debut)
                index_fin = parseInt(index_fin) + parseInt(arr[index].index_fin)
            }
        }

        if (!(stations_triees.some(element => element.id === arr[i].id && element.produit === arr[i].produit))) {
            arr[i].index_debut = index_debut
            arr[i].index_fin = index_fin

            stations_triees.push(
                arr[i]
            );
        }
    }

    let $index = 1
    /* window.console.log(membres[membres.length-1].nom) */
    for (let j = 0; j < arr.length - 1; j++) {
        if (arr[arr.length - 1].id == arr[j].id && arr[arr.length - 1].produit == arr[j].produit) {
            $index++
        }
    }
    if ($index == 1) {
        stations_triees.push(
            arr[arr.length - 1]
        );
    }


    /* Composer les les labels et et les quantité */
    let cpt = 0
    for (let i = 0; i < stations_triees.length; i++) {
        if(stations_triees[i].produit == 'Super'){
            labels[cpt] = stations_triees[i].nom
            stations[cpt] = parseInt(stations_triees[i].index_fin) - parseInt(stations_triees[i].index_debut)
            
            cpt ++
        }
    }

    localStorage.setItem('label-super-station', JSON.stringify(labels))
    localStorage.setItem('qte-super-station', JSON.stringify(stations))
}

/* Regrouper la quantité du gasoil vendu par station pour la journée en cours */
function regroupeGasoilparStation(data){
    
    let arr = JSON.parse(data);
    let stations_triees = []
    let labels = []
    let stations = []

    //Compter les stations en double
    //les stokés dans le tableau stations_triees_tries avec leurs occurrences
    for (var i = 0; i < arr.length; i++) {
        let index_debut = arr[i].index_debut
        let index_fin = arr[i].index_fin

        for (let index = i + 1; index < arr.length; index++) {
            if (arr[i].id == arr[index].id && arr[i].produit == arr[index].produit) {
                index_debut = parseInt(index_debut) + parseInt(arr[index].index_debut)
                index_fin = parseInt(index_fin) + parseInt(arr[index].index_fin)
            }
        }

        if (!(stations_triees.some(element => element.id === arr[i].id && element.produit == arr[i].produit))) {
            arr[i].index_debut = index_debut
            arr[i].index_fin = index_fin

            stations_triees.push(
                arr[i]
            );
        }
    }

    let $index = 1
    /* window.console.log(membres[membres.length-1].nom) */
    for (let j = 0; j < arr.length - 1; j++) {
        if (arr[arr.length - 1].id == arr[j].id && arr[arr.length - 1].produit == arr[j].produit) {
            $index++
        }
    }
    if ($index == 1) {
        stations_triees.push(
            arr[arr.length - 1]
        );
    }


    /* Composer les les labels et et les quantité */
    let cpt = 0
    for (let i = 0; i < stations_triees.length; i++) {
        if(stations_triees[i].produit == 'Gasoil'){
            labels[cpt] = stations_triees[i].nom
            stations[cpt] = parseInt(stations_triees[i].index_fin) - parseInt(stations_triees[i].index_debut)

            cpt ++
        }
    }
    
    localStorage.setItem('label-gasoil-station', JSON.stringify(labels))
    localStorage.setItem('qte-gasoil-station', JSON.stringify(stations))
}

/* Afficher la liste des lavages enregistrés pour la date d'aujourd'hui */
function afficheLavageStation(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            /* alert(this.responseText) */
            /* regroupeSuperparStation(this.responseText)*/
            regroupeLavageParstation(this.responseText) 
        }
    };
    var date = new Date()
    var anneecourante = date.getFullYear();
    var parameters = parameters = "method=getcurrentlavagesuperviseur";
    
    xhttp.open("POST", "http://" + localStorage.getItem("cam") + "/asa/superviseur/dashboard.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parameters);
}

/* Regrouper les lavages par station */
function regroupeLavageParstation(data){
    let arr = JSON.parse(data);
    let labels = []
    let stations = []

    for (let i = 0; i < arr.length; i++) {
        labels[i] = arr[i].nom
        stations[i] = arr[i].nb
    }
    localStorage.setItem('label-lavage-station', JSON.stringify(labels))
    localStorage.setItem('qte-lavage-station', JSON.stringify(stations))
}

/* Afficher la liste des lavages enregistrés pour la date d'aujourd'hui */
function afficheVidangeStation(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            /* alert(this.responseText) */
            /* regroupeSuperparStation(this.responseText)*/
            regroupeVidangeParstation(this.responseText)
        }
    };
    var date = new Date()
    var anneecourante = date.getFullYear();
    var parameters = parameters = "method=getcurrentvidangesuperviseur";
    
    xhttp.open("POST", "http://" + localStorage.getItem("cam") + "/asa/superviseur/dashboard.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parameters);
}

/* Regrouper les vidanges par station */
function regroupeVidangeParstation(data){
    let arr = JSON.parse(data);
    let labels = []
    let stations_avec_filtre = []
    let stations_sans_filtre = []

    for (let i = 0; i < arr.length; i++) {
        labels[i] = arr[i].nom
        if(arr[i].filtre == 'Oui'){
            stations_avec_filtre[i] = arr[i].nb
        }
        else{
            stations_avec_filtre[i] = 0
        }

        if(arr[i].filtre == 'Non'){
            stations_sans_filtre[i] = arr[i].nb
        }
        else{
            stations_sans_filtre[i] = 0
        }
    }
    localStorage.setItem('label-vidange-station', JSON.stringify(labels))
    localStorage.setItem('qte-vidange-avec-filtre-station', JSON.stringify(stations_avec_filtre))
    localStorage.setItem('qte-vidange-sans-filtre-station', JSON.stringify(stations_sans_filtre))
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



function afficheLavagesSemaineCourante(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            /* alert(this.responseText) */
            regroupeLavagesParWeek(this.responseText);

        }
    };
    var date = new Date();
    var semainecourante = date.getWeek();
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
            /* alert(this.responseText) */
            regroupeVidangeParWeek(this.responseText);
        }
    };
    var date = new Date();
    var semainecourante = date.getWeek();
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
    let mois = [0,0,0,0,0,0,0]
    let i;
    for (i = 0; i < arr.length; i++) {
        let month = new Date(arr[i].date_lavage).getDay();
        mois[month] += 1
    }
    localStorage.setItem('lavage-annee-courante', JSON.stringify(mois));
}

function regroupeLavageParWeek(data){
    let arr = JSON.parse(data);
    let week = [0,0,0,0,0,0,0];
    let i;
    for (i = 0; i < arr.length; i++) {
        let day = new Date(arr[i].date_lavage).getDay();
        week[day] += 1
    }
    localStorage.setItem('lavage-semaine-courante', JSON.stringify(week));
}
function regroupeVidangeParWeek(data){
    let arr = JSON.parse(data);
    let week = [0,0,0,0,0,0,0];
    let i;
    for (i = 0; i < arr.length; i++) {
        let day = new Date(arr[i].date_lavage).getDay();
        week[day] += 1
    }
    localStorage.setItem('lavage-semaine-courante', JSON.stringify(week));
}