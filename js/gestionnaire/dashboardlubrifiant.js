/* Afficher la liste des produits vendus par categorie pour la date d'aujourd'hui */
function afficheProduitParCategorieJour(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            /* alert(this.responseText) */
            grapheVenteJour(this.responseText)
            grapheStockeRestantJour(this.responseText)
            qtePoduitVenduParJour(this.responseText)
            revenuLubrifiantParJour(this.responseText)
            qteStockeProduitParJour(this.responseText)
        }
    };

    var parameters;
    if(localStorage.getItem('id_station') != null)
    {
        parameters = parameters = "method=getproductbycategorybyday&idstation="+localStorage.getItem('id_station');
    }
    else{
        logout()
    }
    
    xhttp.open("POST", "http://" + localStorage.getItem("cam") + "/asa/gestionnaire/dashboardlubrifiant.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parameters);
}

/* Graphe vente jour */
function grapheVenteJour(data){
    let arr = JSON.parse(data);
    let donnees = []
    let labels = []

    for(let i = 0; i < arr.length; i++){
        labels.push(arr[i].designation)
        donnees.push(arr[i].quantite_vente)
    }

    localStorage.setItem('qte-lubrifiant-vente-par-jour-labels',JSON.stringify(labels))
    localStorage.setItem('qte-lubrifiant-vente-par-jour-data',JSON.stringify(donnees))
}

/* Graphe stocke restant jour */
function grapheStockeRestantJour(data){
    let arr = JSON.parse(data);
    let donnees = []
    let labels = []

    for(let i = 0; i < arr.length; i++){
        labels.push(arr[i].designation)
        donnees.push(arr[i].quantite_stocke)
    }

    localStorage.setItem('qte-lubrifiant-stocke-par-jour-labels',JSON.stringify(labels))
    localStorage.setItem('qte-lubrifiant-stocke-par-jour-data',JSON.stringify(donnees))
}
/* Quantité lubrifiant vendus par jour  */
function qtePoduitVenduParJour(data){
    let arr = JSON.parse(data);
    let qte = 0
    for(let i = 0; i < arr.length; i++){
        qte = parseInt(qte) + parseInt(arr[i].quantite_vente)
    }
    document.getElementById('qte-lubrifiant-vendu-par-jour').innerHTML = qte
}

/* Revenu des lubrifiants par jour */
function revenuLubrifiantParJour(data){
    let arr = JSON.parse(data);
    let revenu = 0

    for(let i=0; i<arr.length; i++){
        revenu = parseInt(revenu) + parseInt(arr[i].total_vente)
    }

    document.getElementById('revenu-lubrifiant-par-jour').innerHTML = `${revenu} FCFA`
}

/* Quantite restant en stocke */
function qteStockeProduitParJour(data){
    let arr = JSON.parse(data);
    let qte = 0
    for(let i = 0; i < arr.length; i++){
        qte = parseInt(qte) + parseInt(arr[i].quantite_stocke)
    }
    document.getElementById('qte-lubrifiant-stocke-par-jour').innerHTML = qte
}

/* Afficher la liste des produits vendus par categorie pour le mois en cours */
function afficheProduitParCategorieMois(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            /* alert(this.responseText) */
            grapheVenteMois(this.responseText)
            qtePoduitVenduParMois(this.responseText)
            revenuLubrifiantParMois(this.responseText)
            qteStockeProduitParMois(this.responseText)
        }
    };
    var parameters;
    if(localStorage.getItem('id_station') != null)
    {
        parameters = parameters = "method=getproductbycategorybymonth&idstation="+localStorage.getItem('id_station');
    }
    else{
        logout()
    }
    
    xhttp.open("POST", "http://" + localStorage.getItem("cam") + "/asa/gestionnaire/dashboardlubrifiant.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parameters);
    
    xhttp.open("POST", "http://" + localStorage.getItem("cam") + "/asa/gestionnaire/dashboardlubrifiant.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parameters);
}

/* Graphe vente Mois */
function grapheVenteMois(data){
    let arr = JSON.parse(data);
    let donnees = []
    let labels = []

    for(let i = 0; i < arr.length; i++){
        labels.push(arr[i].designation)
        donnees.push(arr[i].quantite_vente)
    }

    localStorage.setItem('qte-lubrifiant-par-mois-labels',JSON.stringify(labels))
    localStorage.setItem('qte-lubrifiant-par-mois-data',JSON.stringify(donnees))
}
/* Quantité lubrifiant vendus par jour  */
function qtePoduitVenduParMois(data){
    let arr = JSON.parse(data);
    let qte = 0
    for(let i = 0; i < arr.length; i++){
        qte = parseInt(qte) + parseInt(arr[i].quantite_vente)
    }
    document.getElementById('qte-lubrifiant-vendu-par-mois').innerHTML = qte
}

/* Revenu des lubrifiants par jour */
function revenuLubrifiantParMois(data){
    let arr = JSON.parse(data);
    let revenu = 0

    for(let i=0; i<arr.length; i++){
        revenu = parseInt(revenu) + parseInt(arr[i].total_vente)
    }

    document.getElementById('revenu-lubrifiant-par-mois').innerHTML = `${revenu} FCFA`
}

/* Quantite restant en stocke */
function qteStockeProduitParMois(data){
    let arr = JSON.parse(data);
    let qte = 0
    for(let i = 0; i < arr.length; i++){
        qte = parseInt(qte) + parseInt(arr[i].quantite_stocke)
    }
    document.getElementById('qte-lubrifiant-stocke-par-mois').innerHTML = qte
}
