import React,{Component} from "react";
import {FindIdEmployee,FindIdLabor} from "./../../../Helper/Conversor"

function Payroll(props){

    

    //Labor Table rows
    var idLaborList =[];
    props.report.forEach((elem) => {
               idLaborList.indexOf(elem.idlabor)===-1 ? idLaborList.push(elem.idlabor):null; 
    });
    var LaborList=[].concat(idLaborList);
    var Remainer = props.LList.map(e=> {return LaborList.indexOf(e[0])===-1 ? e[0]:null  } ).filter(e=> e!==null);
    LaborList=LaborList.length>14?LaborList: LaborList.concat(Remainer.slice(0,14-LaborList.length))
  
    var Header = LaborList.map(e=>{
        var namL=FindIdLabor(e,props.LList).split(" ").map(e=>e.slice(0,4))

       
        return (<th scope="col" className="verticalTableHeader"><p className="thLabor text-lowercase font-weight-light" style={{fontSize:"10px"}}>{namL.join(" ").slice(0,11)}</p></th>)
    })

//By name
        var idNameList =[];
        props.report.forEach((elem) => {
                idNameList.indexOf(elem.idemployee)===-1 ? idNameList.push(elem.idemployee):null; 
        });
        var Body=idNameList.map(elem=>{
          
            var listByLabor=props.report.filter(e=>e.idemployee===elem).map(e=>e.idlabor)
            var Signature=props.report.filter(e=>e.idemployee===elem)[0].Signature;
           
            var Total = 0;
            props.report.filter(e=>e.idemployee===elem).forEach(el=>{
                    Total+=el.hrs
            })
            var listRow=LaborList.map(e=>{
                
                return listByLabor.indexOf(e)!==-1?(<td className="text-center pdfTable"><p style={{fontSize:"12px"}}>{props.report.filter(el=>el.idemployee===elem && el.idlabor===e)[0].hrs}</p></td>):(<td></td>)
                
            })
            return (
                <tr>
                    <th scope="row"><p className="text-lowercase font-weight-light" style={{fontSize:"12px"}}>{FindIdEmployee(elem,props.NList)}</p></th>
                    {listRow}
                    <td className="text-center">{Total}</td>
                    <td style={{width:"110px",height:"40px"}}><img className="border border-dark" src={Signature} style={{width:"100%",height:"40px"}}/></td>
                </tr>
            )
        })
       
    return ( 
    <table class="table table-bordered">
            <col width="130"/>
            <col width="45"/><col width="45"/><col width="45"/><col width="45"/><col width="45"/><col width="45"/><col width="45"/><col width="45"/><col width="45"/><col width="45"/><col width="45"/><col width="45"/><col width="45"/><col width="45"/><col width="45"/>
            <col width="100"/>
        <thead>
            <tr>
            <th scope="col">Name</th>
            {Header}
            <th scope="col" className="verticalTableHeader">Total</th>
            <th scope="col">Sign</th>
            </tr>
        </thead>
        <tbody>
            {Body}
        </tbody>
        <td colspan="17" className="p-2">
                            <div class="input-group mb-3">
                                  <div class="custom-control custom-checkbox">
                                      <input type="checkbox" class="custom-control-input" checked id="customCheckDisabled" disabled/>
                                      <label class="custom-control-label" style ={{fontSize:"14px"}} for="customCheckDisabled">By signing the daily report Iam in Agreement that the hours reported are correct and that i did no suffer any Injury /Accident or did not witness any injury?Accident from other employee</label>
                                </div>
                                      
                            </div>
        </td>
    </table>
    )
   
}

export default Payroll;