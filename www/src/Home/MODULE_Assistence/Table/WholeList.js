import React,{Component} from "react";

function WholeList(props){
        
  

    var arrayWholeList= props.WholeList.map(elemName=>{ 
                                
      if(props.NameList.indexOf(elemName)!==-1){
        return ( <option className="text-muted dropdown-item" disabled  value={elemName}>{elemName}</option> )
      }
      else{
        return props.elem.name === elemName ? ( <option className="text-dark dropdown-item" selected value={elemName}>{elemName}</option> ):( <option className="text-primary dropdown-item"  value={elemName}>{elemName}</option> )

      }
  })

  var PabloTeam=[];
  PabloTeam.push(<option className="text-muted dropdown-item text-center" disabled  value="---">Pablo's Team</option>)
  PabloTeam.push(<option className="text-muted dropdown-item text-center" disabled  value="---">-----------------------------------</option>)
  var PabloTeamNames=["Francisco Olivera","Julio C Santiesteban","Celestino C. Diaz","Wilfredo Galindo","Samuel Mojica","Darian Sierra","Mikel Perez Mayo","Savanes Joseph","Pedro Saldana","Calixto Zelaya"]
  for(var i in PabloTeamNames){
            props.NameList.indexOf(PabloTeamNames[i])!==-1?
                      ( <option className="text-muted dropdown-item" disabled  value={PabloTeamNames[i]}>{PabloTeamNames[i]}</option> ):
            PabloTeam.push(props.elem.name === PabloTeamNames[i]? 
                      (<option className="text-dark dropdown-item" selected value={PabloTeamNames[i]}>{PabloTeamNames[i]}</option> ):

                      ( <option className="text-primary dropdown-item"  value={PabloTeamNames[i]}>{PabloTeamNames[i]}</option>))

            
         }


  PabloTeam.push(<option className="text-muted dropdown-item text-center" disabled  value="---">-----------------------------------</option>)
  return props.Supervisor==="Pablo Orta"?PabloTeam.concat(arrayWholeList):arrayWholeList;
     
}


export default WholeList;