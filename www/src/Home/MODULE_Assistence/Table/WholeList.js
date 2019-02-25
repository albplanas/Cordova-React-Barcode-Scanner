import React,{Component} from "react";

function WholeList(props){
        
console.log(props)
    var arrayWholeList= props.WholeList.map(elemName=>{ 
                                
      if(props.NameList.indexOf(elemName)!==-1){
        return ( <option className="text-muted dropdown-item" disabled  value={elemName}>{elemName}</option> )
      }
      else{
        return props.elem.name === elemName ? ( <option className="text-dark dropdown-item" selected value={elemName}>{elemName}</option> ):( <option className="text-primary dropdown-item"  value={elemName}>{elemName}</option> )

      }
  })
console.log(
"before return "
)
    return arrayWholeList;
}


export default WholeList;