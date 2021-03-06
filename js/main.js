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
    document.getElementById("totalValue").innerHTML = formatvalue(total);
    
}

function setlist(list){
    var table = '<thead><tr><td>Description</td><td>Amount</td><td>Value</td><td>action</td></tr></thead><tbody> ';  
     for (var key in list){
        table += '<tr><td>'+ 
        formatdesc(list[key].desc) +
        '</td><td>'+formatAmount(list[key].amount) +'</td><td>'+ formatvalue(list[key].value )+
        '</td><td><button class="btn btn-default" onclick="setUpdate('+key+');">edit</button>  <button class="btn btn-default" onclick="deleteData('+key+');">delete</button></td></tr><tr>';
     }
     table += '</tbody';
     document.getElementById("listTable").innerHTML = table;
     getTotal(list);
     saveListStorege(list);
}

function formatdesc(desc){
    var str = desc.toLowerCase();
    str = str.charAt(0).toUpperCase() + str.slice(1);
    return str;
}
    function  formatAmount(amount){
        return parseInt (amount);
    }

function  formatvalue(value){
    var str = parseFloat(value).toFixed(2) + "";
    str = str.replace(".",",");
    str = "$" + str;
    return str;
}

function addData(){
    if(!validation()){
        return;
    }
    var desc = document.getElementById("desc").value;
    var amount = document.getElementById("amount").value;
    var value = document.getElementById("value").value;
    list.unshift({"desc":desc,"amount":amount,"value":value});
    setlist(list);
}
function setUpdate (id){
    var obj = list[id];
    document.getElementById("desc").value = obj.desc;
    document.getElementById("amount").value = obj.amount;
    document.getElementById("value").value = obj.value;
    document.getElementById("btnUpdate").style.display = "inline-block";
    document.getElementById("btnAdd").style.display = "none";
   
    document.getElementById("inputIDUpdate").innerHTML = ' <input id="idupdate" type="hidden" value="'+id+'">';
}

function resetForm(){
    document.getElementById("errors").style.display = "none";
    document.getElementById("desc").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("value").value = "";
    document.getElementById("btnUpdate").style.display = "none";
    document.getElementById("btnAdd").style.display = "inline-block";

    document.getElementById("inputIDUpdate").innerHTML = "";
    document.getElementById("errors").style.display = "none";
}
 
function updateData(){
    if(!validation()){
        return;
    }
    var id = document.getElementById("idupdate").value;
    var desc = document.getElementById("desc").value;
    var amount = document.getElementById("amount").value;
    var value = document.getElementById("value").value;

    list[id] = {"desc":desc,"amount":amount,"value":value};
    resetForm();
    setlist(list);

}

      function deleteData(id){
        if(confirm("delete this item?")){
            if(id === list.length-1){
                list.pop();
            }else if(id === 0){
                list.shift();
            }else{
                var arrAuxIni = list.slice(0,id);
                var arrAuxEnd = list.slice(id+1);
                list = arrAuxIni.concat(arrAuxEnd);
            }   
            setlist(list);
        }
    }

function validation (){

    var desc = document.getElementById("desc").value;
    var amount = document.getElementById("amount").value;
    var value = document.getElementById("value").value;
    var errors = "";
    console.log(desc, amount, value)
    document.getElementById("errors").style.display = "none";
    if(desc === ""){
        errors += '<p>fill out description</p>';}
    if(amount === ""){
        errors += '<p>fill out a quantity</p>';
    }else if(amount != parseInt(amount)){
        errors += '<p>fill out a valid amount</p>';
    }
    if(value === ""){
        errors += '<p>fill out a value</p>';
    }else if(value != parseFloat(value)){
        errors += '<p>fill out a valid value</p>';
    }

    console.log(errors)
    if(errors !== ""){
       document.getElementById("errors").style.display = "block";
       document.getElementById("errors").style.backgroundColor = "rgba(85, 85, 85, 0.3)";
       document.getElementById("errors").style.color = "black";
       document.getElementById("errors").style.margin = "10px";
       document.getElementById("errors").style.padding = "10px";
       document.getElementById("errors").style.borderRadius = "13px";
       
       document.getElementById("errors").innerHTML = "<h3>error:</h3>" + errors;
        return 0;
    }else{
        return 1;
    }


    
}
function deleteList(){
    if(confirm("delete the list?")){
        list = [];
        setlist(list);
    }
}
function saveListStorege(list){
    var jsonStr = JSON.stringify(list);
    localStorage.setItem("list",jsonStr);
}

function initListStorege(){
    var testList = localStorage.getItem("list");
    if(testList){
      list = JSON.parse(testList);
    }
    setlist(list);
}

initListStorege();