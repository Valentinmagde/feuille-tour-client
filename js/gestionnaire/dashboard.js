/* Filtre des lavages selon deux dates */
/*   


*/
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