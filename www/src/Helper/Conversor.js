
function FindIdLabor(id,array) {

    var name=""
     array.forEach(   elem=> {    
           if(elem[0]+''===id+''){
                 name = elem[1];
    }})
    return name
}

function FindNameLabor(name,array) {

      
    
    var id=""
     array.forEach(   elem=> {    
           if(elem[1]+''===name+''){
                 id = elem[0];
    }})
   
    return id
}

function FindNameEmployee(name,array) {

      
    var id=""
     array.forEach(   elem=> {    
           if(elem[0]+''===name+''){
                 id = elem[1];
    }})
    return id;
}

function FindIdEmployee(id,array) {

      
    var name=""
     array.forEach(   elem=> {    
           if(elem[1]+''===id+''){
                 name = elem[0];
    }})
    return name;
}

function FindById(id,array) {

      

    return array.filter(elem=> elem[1]+''===id+'')

}

function CompareObjects(a,b){
    return JSON.stringify(a)===JSON.stringify(b) ? true : false
}

function InventaryName(id , table){
 
     var name=table.filter(ele=>ele[0]+""===id+"")
     return name.length===0? "Unknown":name
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}


export {

        FindIdEmployee as FindIdEmployee,
        FindNameEmployee as FindNameEmployee, 
        FindById as FindById, 
        FindIdLabor as FindIdLabor,
        FindNameLabor as FindNameLabor,
        CompareObjects as CompareObjects,
        InventaryName as InventaryName,
        formatDate as formatDate
    };