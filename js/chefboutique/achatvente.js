/*
 * Projet : FEUILLE DE ROUTE MINESUP
 * Code JAVASCRIPT : actions.js
 ************************************************
 * Auteur : Valentin Magde,Demasso James,Nebo Djomche Joress
 * E-mails : <valentinmagde@gmail.com>
 */

//Vérification du formulaire
function verificationPannierEstVide() {
    var quantite = document.getElementById("quantite").value;
    var prix = document.getElementById("prix").value;
    var listesproduit = document.getElementById("listeproduit").value;

    if ( quantite.length == 0 || listesproduit == 0 || prix.length == 0) {
        document.getElementById("ajoutPannier").disabled = true;
    } else {
        document.getElementById("ajoutPannier").disabled = false;
    }
}

/* Reinitialiser le formulaire d'ajout des produits */
function resetProduit() {
    document.getElementById("qte").value = "";
    document.getElementById("prix").value = "";
  
}

/* Afficher les options des produits */
function afficherLesOptionsDesProduits() {
    chargerTb(8)
        .then((res) => {
            var arr = JSON.parse(res);
            var i;
            for (i = 0; i < arr.length; i++) {
                document.getElementById("listeproduit").innerHTML += "<option value='" + JSON.stringify(arr[i]) + "'>" + arr[i].designation+ "</option>";
            }
        })

}

/* Afficher le prix unitaire d'un produit */
function fetchPrice(){
    var produit = document.getElementById("listeproduit").value;
    if(JSON.parse(produit).prix !== undefined)
        document.getElementById("prix").value = JSON.parse(produit).prix;
    else
        document.getElementById("prix").value = 'Prix unitaire en FCFA?'
}

var panniers = new Array()
/* Ajouter un produit dans le pannier */
function ajoutProduit(){
    var quantite = document.getElementById("quantite").value;
    var prix = document.getElementById("prix").value;
    var produit = document.getElementById("listeproduit").value;
    var designation = JSON.parse(produit).designation;
    var id_produit = JSON.parse(produit).id;
    var qte_produit = JSON.parse(produit).quantite
    var total = quantite * prix
    var qte_reste = 0

    if(localStorage.getItem('panniers')){
        panniers = JSON.parse(localStorage.getItem('panniers'))

        panniers.forEach(element=>{
            if(element.id == id_produit){
                qte_reste = parseInt(qte_reste) + parseInt(element.quantite)
            }
        })
    }

    if((qte_produit-qte_reste) >= quantite){
        panniers.push(
            {
                id: id_produit,
                designation: designation,
                prix: prix,
                quantite: quantite,
                total: total
            }
        )

        localStorage.setItem('panniers', JSON.stringify(panniers))

        affichePannier()
    }
    else if((qte_produit-qte_reste) == 0){
        swal("Oops!", "Quantité stocke terminée, Renouvellez le stocke", "error");
    }
    else{
        swal("Oops!", "Quantité stocke insuffisante, Entrez une quantité inferieur ou égal à ("+(qte_produit-qte_reste)+")", "error");
    }
    
}

/* Supprimer un produit dans le pannier */
function suppressionProduit(index){
    if(localStorage.getItem('panniers'))
        panniers = JSON.parse(localStorage.getItem('panniers'))

    panniers.splice(index, 1)

    localStorage.setItem('panniers', JSON.stringify(panniers))
    $('#pannier_' + index).hide(1000)
    affichePannier()
}

/* Annuler une vente */
function annulerVente(){
    if(localStorage.getItem('panniers')){
        panniers = JSON.parse(localStorage.getItem('panniers'))

        let i = 0

        panniers.forEach(()=>{
            $('#pannier_' + i).hide(100)

            i++
        })

        localStorage.removeItem('panniers')
        localStorage.setItem('panniers', JSON.stringify([]))
    }
}

/* Valider une vente */
function validerUneVente(){
    var client = document.getElementById('client').value

    if(client.length != 0){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                if (this.responseText == 2) {
                    swal("Bravoo!", "Vente validée avec succès!", "success");
                    annulerVente();
                    afficheListeStockes();
                } else {
                    swal("Oops!", "Validation échouée, recommencez!", "error");
                }
            }
        };

        var vente = localStorage.getItem('panniers')
        var client = document.getElementById("client").value;
        var total = document.getElementById("total").value;
        var typecmd = 'Vente'

        var parameters = "method=enregistrervente&vente="+ vente +"&client="+ client +"&total="+ total +"&typecmd="+ typecmd;
        //var parameters="limit=5";
        xhttp.open("POST", "http://" + localStorage.getItem("cam") + "/asa/chefboutique/achatventes.php", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(parameters);
    }
    
}

//-------Afficher la liste des produits dans le pannier--------
function affichePannier() {
    let arr = []
    var out = "";
    if(localStorage.getItem('panniers'))
        arr = JSON.parse(localStorage.getItem('panniers'))

    if(arr.length){
        let i=0
        let total = 0
        document.getElementById('listevente').innerHTML = ''
        arr.forEach(pannier=>{
            out = '<tr id="pannier_' + i + '">' +
                '<th scope="row">' + (parseInt(i)+1) + '</th>' +
                '<td>' + pannier.designation + '</td>' +
                '<td>' + pannier.prix + ' FCFA</td>' +
                '<td>' + pannier.quantite +'</td>' +
                '<td>' + (pannier.quantite *  pannier.prix)+ ' FCFA</td>' +
                '<td>'+
                    '<button onclick="suppressionProduit('+i+')" class="btn btn-danger btn-pretty btn-xs"><i class="fa fa-trash"></i> Supprimer</button>'+
                '</td>' +
                '</tr>';
                total += (pannier.quantite *  pannier.prix)
            $('#listevente').append(out);
            i++
        })
        document.getElementById('totalvente').innerHTML =  `${total} FCFA`;
        document.getElementById('total').value =  total;
        document.getElementById('validerVente').disabled = false;
        document.getElementById('genererFacture').disabled = false;
    }
    else{
        $('#listevente').append("");
        document.getElementById('totalvente').innerHTML =  `${0} FCFA`;
        document.getElementById('total').value =  0;
        document.getElementById('validerVente').disabled = true;
        document.getElementById('genererFacture').disabled = true;
    }
    
}

//---Afficher une categorie----
function uneCategorie(k) {
    var arr = [];
    var i;

    if(localStorage.getItem('categories') != null)
        arr = JSON.parse(localStorage.getItem('categories'))

    for (i = 0; i < arr.length; i++) {
        if (arr[i].id == k) {
            return arr[i].designation;
        }
    }

}

function afficheListeStockes() {
    
    chargerTb(8)
    .then((res) => {
        var arr = JSON.parse(res);
        var i;
        document.getElementById('listesdesstockes').innerHTML = ''
        for (i = 0; i < arr.length; i++) {

            out = '<tr id="stocke_' + arr[i].id + '">' +
                '<th scope="row">' + (i + 1) + '</th>' +
                '<td>' + arr[i].designation + '</td>' +
                '<td>' + arr[i].prix + ' FCFA</td>' +
                '<td>' + arr[i].quantite + '</td>' +
                '<td>' + arr[i].quantite_alert + '</td>' +
                '<td id="' + arr[i].id_categorie + '">' + uneCategorie(arr[i].id_categorie) + '</td>' +
                '<td>' + 
                    '<button class="btn btn-info btn-pretty btn-xs"><i class="fa fa-plus"></i> Ajouter</button>'+
                '</td>' +
                '</tr>';
            //alert(out);
            $('#listesdesstockes').append(out);
        }
    })
}

function genererUneFacture(){
    var client = document.getElementById('client').value
    var totalvente = document.getElementById('totalvente').innerHTML
    var logo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASEAAABGCAYAAACDmyJNAAAOoUlEQVR42u2dD0xV1x3HCTHEy6gzjhFzQwm15JYhOmcdGkbp9ZYaZ609Ekqos60jzP4JsbbrrEVL0xrLnGMM9XJKua2l1hnmDDHOubZxxlprGNcRQohxzpAXw7zEMsIs8xpC7nLYIbt5fffdc/+9f/y+yS/xD++c886598M5v/M7v5OWBgKBQCAQCAQCgUAgEAgEAsVBHFJKOKQ0ckg5zSHlKoeUUQ4pBrVxDik3OaRc5JDSziFlC4cUHnoNBAJ5BU8Gh5R6DilDJuA4sYsUSBnQmyAQyCmAFnJI2c0hpY5DygoOKfNN/8dzSKngkLKfzoDsYDTMIaUWehUEAgU1W9rGIWWCAUbnOKTkQ6+BQCAmabw4T+PFIo0XV2m8KFET6d8LyP+bYFTIIeU6A4iIL0mE3gWBQOHAIVDZqvFiu8aLvRovjmu8aDDYGP35w733rW8oeXTf6LdQhx2IJjmkrIdeB4EAPCUaLx7UeHGIEThMdjVvjfFB8bPGUw/tMr77OLYC0R0OKatgFECg2QeeTI0X6zVevOoneKxsKLfCwEtrjdXSXiMzssM6G0YFBJo98GnUeHE0FvCJZF/c/4RR/dBuI2y51gWjAwKlPoCQxovD8YJPuPXc97ix4eE3zSACRzUIlKLwmavxYkeiwCfcflf0E+O+dQcIhHpgtECg1ANQjsaLlxIVQDP293vXGOh/s6ISGDUQKHUAlKvx4vVEB5DZ3l3y0z4YORAoNQCUnWwAmrF/8quParyYDqMIAiUvgDI0XuxJRgCZ7CiMJAiUvBDqTHIAzVizx36Yo/Hi/AS1OfCkglIVQNUWL/RljRexxosv0rNfRdRpPZ/OnNLpn4kfqZD+zGaNFxso1MjM6nYcQLTJQ1+ICQxYBE8rKBUBlBMWhHiGvMQaLy7wsQ6BwknWeHEgBi8rAV8+QAgESg4IvU8f8G4y04lRnQsplLo0XpwI6IX9DCAEAiU+gIrpiffKOLaBLOvWa7x4TOPFu/F+aQFCIFDsZ0HLov2MjoV0HQuCjoVKHQuv6lho1bFwVMfCSR0Ln+hYOE//fELHQruOhT06Fup0LEg6FniH7SFLw53X7330lk8v7SBACARKXADlabxYbgGePB0L23QsnNaxMK5jwfBgtyisGnQslOlYsN3hyXqio5lEQv+lYKMfL64EEAKBEhNCORHgs17HwlmP0IkGI1J2s46FqMcsOKScIodTSfqOJ7zD6KTDfsnXePEtF8banh6X5RMrhCcXlJLSsbBMx0KPz9C5rGOhScfCBqfLsvBUrwRGJMlZf/6P3UBoioQRxADqrO1pDdC3RlLn1mq82ESX2ic1Xjyr8eJ5jRfP0b+T0In9NBNmOUnT4rK+rHjGTPnQXyQb6Bay/Nd48XmSpC/g52Mp3XWup1ZDdo2BPmlpadewWK9jYdIH6JBl2xEdC5t0LLhONsYhZYFVatfsx7Hxqx88Z9x0DqKaVIQQ9aFto5Bx69SfooeVycuY56Du/nguTT30GYlt22dR7hlz7nOfxoiEpwxG+S4XyW7xrAXQ222t9WN46ZQH8BB4ddPZji/3g3FI2WCX8F58ZK/xt/zHnDy0R1IJQnTJeFjjxUmfX+4pGqpRnIoQorPFEzZlXyHBtz4+F90M36dlVgJIktXCj9te6XMJnxs6FnZ6mfFEgVAzy+WIC9e3TecUYnxor6QChOhv8VcDCGWIBCOyZMtIFQhRAJ1iLP+6XyCis1S7+jpnK4ROD+NVdx3C54qOhc0sO1weINTDeksr8RXtWf4C60s1N5khRFPsnozxy06WCtnJDiGHADKDiAcIBQcgQZJVJ/AZ1rHwDIkZCrJdHFKyOKRMOb0y+hclL7E8VEXJCiF6qPaTOL3w5EqmrCSH0BGX9Qx4dYIDhKwhtINA6F/4+3bwIf6ifToW5saiXSz+ICs7UfiU3Vq/PIkhtM/FC3SXOkQvmHbIBlweKD4aoU3EiRtiNNblI2t5IQd91+rDbDATIOQ/hM4QCJ1vq7keBUDk/5bHsl0cUjrcQohDikCdtXEJ9AsKQvRojeHgJW6kn0mPUmYB9S1dcVB2RcAvohHAmGz3aebVDRDyH0JDBELb2z7qtQDQGR0L82MMoHQOKTddAmjEtPYfTDEIHWcsd180R3IUR/c2xl22S8kEIY0X11BfoF29TYw3Bu8BCPkLoUkCoUfk3tsjeEW4c/qYX9vtDiFU5mEW1GUa9OUWD1/SQYim22UBRIPHtlcztr0oGSBEc1uxgGV72v9vE2bJ5lANEPIPQsaM7WzruGwC0Lkgd75sINTsAUL1YQPf6edyIo4QqmEor8+P3NqMM65XEh1CNJKb5YbgvWGfW8swc7pDIp8BQj5DSJLVqS/aqkM6FkaDiPtxsBQb9gChAnN5X60sLYkw0AVJCKEWhvK2+dT+dQx1HUsCCHW5/R70+IbdZ69F2i0ECDmH0JgZRBXyX0e/bKt61fwzOhYydSzMixGE1noA0EBYu+fpWLgwsqj8WthAZyQhhLpjFXpAL7u03a5PZAjRc3MsM8e5Ucro8DMCHyBkDaGrYbMhg/5bdtgLTc6B1QftIyI+HQ8Q2m1qL8l7NEiWlqMVK803hwwE3acBQYjlAfYzDa9dHqdriQohjRcXMfh1xsjP2ZSTQXOr++IfAghZQ6g7AoSI9UmyOi8CiMgxjd0BHdPI5pBy1wOECmniNQLLiRn/1r+3LjPvkrWnMIQyffwON23qGkpgCF1gqKOKsawCBqCNWkWTA4TYIPSWBYSI9UiyOj8MRKU6FkZ0LNylu2dr/Iqe5pCy0wOAiFN9nY6F/vAwg68bim+YBrkySSF0mqG8Ap/an87gmO1LRAgx+nKOOCxzqx8+MoCQNYSkKBAiNiDJ6sIwEOXRHEHmoxwHabbEdJcAIg7pkFsIHXi9JmQVbDnxxuKZ3+oTQZ8bCxBCMkN5W3xqf2lQQXtBQoiGMYzH8QhJhU37WM77nZqNEJoryepdGxCFJFktDgNRho6FFousiUfo4dYcBxCqcQsg/slDxrhcZHnk5OvXloToAB+ORZ8GBKG6oG4ViVAXZqirMQEh1B7nlLuD0S6ltIni9+RrSwUQHbeBELEJSVa/EeRHl0A3ohz5uKpj4X0dC7U0a2OGBYT63UJo58s/i3rubfzp5X10gAuTGEJ5sUjaRmdBLNHFqxIJQvQyzqk4Q4jY1ihtbGAso2Q2QmgtA4RmrFWS1YwwEJGtcMx4Cn+KgokkvO8gN3b8ZuemE24BNG/je8Y/WlZErfPWgz+6HItkZqaHbTygYxtnGcokUdXPuGx3Bd01CiwnU4AQ6koAABG7YRUC4uDihD4WR3eqQSjdYqveiLJztjTCrGgFictxkpfoP20PGCuebnLrjDZefumFqOXfaSmc1HKnH4ycGEJoMCAIObn94zyNss60KXPmrjcn+Yk2JxKE6A5WIt2EUhulr0cZyxijZ9nKYpEXPVFAVOUAQgY9c9ZEfEoRYIR0LDBlavzwjY2uATS/8l0j9NvlUcsfrVhJcuCsi2VfMga5uU3lcdRFZsRBU2L7VuqbOEHzADnNzHjOy9GQgCB0kKHME/T7+2F2W/YDUdra7CHD5bgbSzYQXXIIohmndUQ/BM03bTkzGju02CioaXENoR3bt0YF0Nc7loRG7i9/Mdb9SC6RDBBCWXFMIhbymojdbwjR2cV4LJ29puvSo1mpxWcXOJgNxfUigHhBqECS1TsuQDQTU7TWAkbFOhZkHQtjZki89vJW1wC6t/qAoR1YagmgicbFQ1+tKq2OV18ynvVym941mzGS10+77kccUgAQqmQob4fPY8sSwiBH+fyaAC4mSA0IURDVuYTQjPVKsrpJktU5EWA0R8fCWrJb1rPvoZGsjR2uIfTeriorAN2+c/CB5rGNK/h49iMN+OsMMNF9poNln1c77teRkAAgxJKuNTeA8R2yqXPY5vPrYhXTlKz+oRaPICI2LMnqHklWF0XYjs/gkNLnFkCP1jYad75548dhHQs15LBtIvUljbYdDfDKnzLqpwniAe7z25/GcM3O9DEIB+UN25TVH9C4ssQkFTKEXbQHfWNKMu+WHfMBRDN2QZLVeklWcymEWt0C6NuV7ZOf7a0gQZJ1OhbKnQRExhFEmfQ4wcWwWBY/Lz9cRpeAIY8P7Qh9McoC6otF9IJFq/pJdPtaB2XZfZ/9AX2PKoa66xjLmkfLw7RvxmY9hEwg6vQRRNNW3toTKtzxJ4Ov+71xT9VhNyDaYtPu3AQHEnngJAqldQHVkU+35/eQM000vqif+nVCdCnRT5dGx+lW8DOxvIqYZjwkVyG/Qnw2NCK8LFrEcYQyyK2zyMbyAmp/FkPdRR5/ceXTXy4lNDxjA0Od37BU2Lpv8htEZivdf9FY9uZZQ/j5H43c5/5gfGfzx8Y9T35oBaDOsLbxkqyKdJbVJclqvySrq9JAIFBqSZLVSklWbwcJo3BbfajXKGu+ZKz85QWj5J3PjZKmz2+vPtR7gYJmiB4jMX9mUJLVfBgtECiFxCFlgQlEeZKsfhZLEDkwsmzMhBEDgVIPQnkcUlDYrGiLJKs3EwQ+t0ikN4wUCJTaIOrkkLIpDESZkqzuDs9PHUObkmS1PTwFLQgESk0I8RxSbtPcz7lhMMqSZHXbzAWKMYIPSTtSCCMDAs0uEK2nu1OTHFK6OaRsJlctc0iZ9sNkVX2QXdzwad0P3znf83Brz2QA8CHLv/3ELwWjAQLNXhA9zyFlyi6OJ3Pj+0bOs8emt9wffPsciQtyC55+GrldRmKWYARAIBABURVdmjlLufHUR8bC2i4jv757Gk7fe+2MUbzrU2PJrk+Nxa//efrvi1//5FLpr798nsT5kGUe9DYIBLICUT6HlDMebsUwG1neHSVLO+hZEAjkFEYih5RTFCRO4XOFQ0ojh5SF0JMgEMgrjHKoo7qDQ0ovh5RbJtgQH9JNcicYh5TDHFJehFkPCAQCgUAgEAgEAoFAIFBM9V/uM1Q5gvs3SwAAAABJRU5ErkJggg=="

    if(client.length != 0){
        let arrData = JSON.parse(localStorage.getItem('panniers'))
        var donnees = []
        var columns = []

        Object.keys(arrData).forEach(function(key){
                donnees.push(
                    {
                    "Quantité": arrData[key].quantite,
                    "Désignation": arrData[key].designation,
                    "P. Unitaire" : `${arrData[key].prix} FCFA`,
                    "P. Total": `${arrData[key].total} FCFA`
                    }
                )
        })
        
        var doc =  new jsPDF('p', 'pt', 'a4');
        let date=new Date();
        let datelocal=date.toLocaleString('fr-Fr',{
            weekday:'long',
            year:'numeric',
            month:'long',
            day:'numeric'

        });

        doc.setFontSize(10);
        let width = doc.internal.pageSize.width;
        let dateFacture = "Date: "+datelocal
        let txtWidth = doc.getTextWidth(dateFacture) > 70 ? doc.getTextWidth(dateFacture) - 70: 0;

        doc.text(width - 100 - Math.ceil(txtWidth), 40, dateFacture);
        doc.text(width - 100 - Math.ceil(txtWidth), 55, "Tel: 83473487348347834734843");
        doc.text(width - 100 - Math.ceil(txtWidth), 70,"N° FACTURE: #5678009");
        doc.text(width - 100 - Math.ceil(txtWidth), 85,"CLIENT: "+client.toUpperCase());
        doc.text('TOTAL TCHAD', 40, 40);
        doc.text('Commerce générale', 40, 55);
        doc.addImage(logo, 'PNG', width - 280 - Math.ceil(txtWidth), 50, 80, 30);
        columns = [
                {title: "Quantité", dataKey: "Quantité"},
                {title: "Désignation", dataKey: "Désignation"},
                {title: "P. Unitaire", dataKey: "P. Unitaire"},
                {title: "P. Total", dataKey: "P. Total"}
            ];
        
        doc.autoTable(columns, donnees, {
            margin: {top: 100},
        });

        doc.text("Arrêté la présente facture à la somme de: "+ totalvente,40, doc.autoTable.previous.finalY+30)
        doc.text("Signature Client ",60, doc.autoTable.previous.finalY+45)
        doc.text("Signature Vendeur ",width - 80 - Math.ceil(txtWidth), doc.autoTable.previous.finalY+45)
        doc.save('facture.pdf');
    }
  }