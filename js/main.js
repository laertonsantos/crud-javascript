var list = [
    {"desc":"rice","amount":"1","value":"5.40"},
    {"desc":"beer","amount":"12","value":"1.99"},
    {"desc":"meat","amount":"1","value":"15.00"},
];

function getTotal(list){
    var total= 0;
    for(var key in list){
        total += list [key].value* list[key].amount;
    }
    return total;
}

function setlist(list){
    var table = '<thead><tr><td>Description</td><td>Amount</td><td>Value</td><td>action</td></tr></thead><tbody> ';  
     for (var key in list){
        table += '<tr><td>'+ formatdesc(list[key].desc) +'</td><td>'+ list[key].amount+'</td><td>'+ formatvalue(list[key].value )+'</td><td>edit | delete </td></tr><tr>';
     }
     table += '</tbody';
     document.getElementById("listTable").innerHTML = table
}

function formatdesc(desc){
    var str = desc.toLowerCase();
    str = str.charAt(0).toUpperCase() + str.slice(1);
    return str;
}

function  formatvalue(value){
    var str = parseFloat(value).toFixed(2) + "";
    str = str.replace(".",",");
    str = "$" + str;
    return str;
}

function addData(){
    var desc = document.getElementById("desc").value;
    var amount = document.getElementById("amount").value;
    var value = document.getElementById("value").value;

    list.unshift({"desc":desc,"amount":amount,"value":value});
    setlist(list);
}
 
setlist(list);
console.log(getTotal(list));