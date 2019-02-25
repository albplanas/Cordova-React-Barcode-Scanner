var  signChecker = array => array.filter(e=>e.Signature.length===0).length===0?true:false;



var rowChecker= array => array.filter(e=> e.idemployee==="" || e.idlabor==="" || e.hrs==="").length===0?true:false

var hrsChecker= (array,idName) => {
   
    var HR=  array.filter(e=> e.idemployee===idName)
    var sum =0;
   for(var i in HR){
  
    sum= i===0? sum : sum+HR[i].hrs
   } 

    return sum < 16 ? true:false
}

var readyToSend=(report)=>{
   console.log("Valuated",report)
    var value=true;
    if(report.length<2){
        value=false;
    }
    else{
        if(report[0].send===true || report[0].date==="" || report[0].idproject.length===0){
            value =false;
        }
        else{

            report.forEach((elem,index) => {
                if(index>0){
                    if(elem.Signature==="" ||  elem.idemployee==="" || elem.idlabor==="" || elem.hrs==="") {
                        value =false
                    }
                }
                                  
            });
            
            return value
        }
    }
} 
export { 
    
       signChecker as signChecker,
       rowChecker  as rowChecker,
       hrsChecker  as  hrsChecker,
       readyToSend as readyToSend
       
    };


