function CompareObjects(a,b){
    return JSON.stringify(a)===JSON.stringify(b) ? true : false
}

function InventaryName(id , table){
    console.log(id,table)
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
       CompareObjects as CompareObjects,
       InventaryName as InventaryName,
       formatDate as formatDate
    };