import React,{Component} from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt} from '@fortawesome/free-solid-svg-icons'

function NoEditable(props){
            var ListLabor= props.elem.Hours.map((ctg)=>{

                          return (
                          <tr>
                                <th scope="row" ></th>
                                <td > <center><p>{ctg[0]}</p></center></td>
                                <td className="colN-3"><center><p>{ctg[1]+" hrs"}</p></center></td>
                          </tr>
            
            
          )})

          return ListLabor
}

function Editable(props){




   //Hours
   var hrs=[];
   for(var i=2;i<=16*2;i++){
       hrs.push(i/2 )  ;           
   }  



   
   var JobsList=props.elem.Hours.map((elem)=>{return elem[0]})

   var ListLabor= props.elem.Hours.map((ctg,index)=>{


                 var sumHr=0;
                 var id=ctg[2];
                 
                 for(var k in props.elem.Hours) {
                 
                   sumHr+= k-0===index-0 || props.elem.Hours[k][1]==="Choose"? 0 : props.elem.Hours[k][1]-0
               
                 }

                 var cant = (15-sumHr)*2+1;
               
                 var ArrayHrs= hrs.slice(0,cant).map((elem,index)=>{ 
                   return ( <option className="text-dark" id={"lar_"+id+"_hr"+"_"+props.IDproj} value={elem}>{elem}</option> )
                   })
                  
                  var newarrayCategories=props.idLaborList.filter(ELEM => ELEM[2]+""===props.IDproj+"").map(elem=>elem[1]).sort().map(eCTG=>{

                        return     JobsList.indexOf(eCTG)!==-1? 
                                                                  ( <option className="text-muted disabled"  
                                                                              id={"ctg_"+id+"_"+props.IDproj} 
                                                                              disabled value={eCTG}
                                                                              >{eCTG}
                                                                  </option> )
                                    :ctg[0]=== eCTG ? 
                                                                  ( <option className="text-dark"  
                                                                              id={"ctg_"+id+"_"+props.IDproj} 
                                                                              selected value={eCTG}
                                                                              >{eCTG}
                                                                  </option> )
                                    :                             ( <option className="text-primary"  
                                                                              id={"ctg_"+id+"_"+props.IDproj} 
                                                                              value={eCTG}
                                                                              >{eCTG}
                                                                  </option> )  

                  });
              
 


                     

                 
                
             

               return (
               <tr>
                     <th scope="row" id={"del_"+id+"_"+props.IDproj} className="text-danger" onClick={props.deleteCtg}>
                                    <FontAwesomeIcon  icon={ faTrashAlt} size={"lg"}/>
                                 
                     </th>
                     <td > 
                     <select class="w-100 custom-select " value={ctg[0]} id={"labor_"+id+"_"+props.IDproj} onChange={props.onChangeSelectLabor} >
                     <option className="text-dark" value="">{props.lang==="es"?"Labor desarrollada":"Select Labor"}</option>
                       {newarrayCategories}
                     </select>
                     </td>
                     <td className="colN-3">
                     <select class="custom-select " value={ctg[1]-0} id={"labor_"+id+"_hr"+"_"+props.IDproj}  onChange={props.onChangeSelectHour}>
                     <option id={"labr_"+id+"_hr"+"_"+props.IDproj} className="text-dark" value="">{props.lang==="es"?"Horas Trabajadas":"Select Hours "} </option>
                         {ArrayHrs}
                     </select>
                     </td>
               
               </tr>
               
               
   )})

   return ListLabor
}

function ListLabor(props){

      
      return props.elem.Signature.length>0?
                                                <NoEditable elem={props.elem}/>:
                                                <Editable 
                                                                  IDproj={props.IDproj}
                                                                  lang={props.lang} 
                                                                  elem={props.elem} 
                                                                  id={props.id} 
                                                                  idLaborList={props.idLaborList} 
                                                                  idEmloyeeList={props.idEmloyeeList} 
                                                                  Project={props.Project} 
                                                                  projSelect={props.projSelect}  
                                                                  onChangeSelectHour={props.onChangeSelectHour} 
                                                                  onChangeSelectLabor={props.onChangeSelectLabor} 
                                                                  deleteCtg={props.deleteCtg}
                                                />

}








export default ListLabor;