import React,{Component} from "react";


import {rowChecker} from "../../../Helper/Validation"
import EmployeeRow from "./EmployeeRow";
import {CompareObjects} from "../../../Helper/Conversor"
import {SetLocalReport} from "../../../Helper/setLocalStorage"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus,faTrashAlt} from '@fortawesome/free-solid-svg-icons'

import SendAlert from"../../InformationCards/SendAlert"

class Table extends Component {
    constructor(props) {
        super(props);
        this.state={
            smsOpen:false,
            sms:"Something"
           }
        
          this.AddRow          =this.AddRow.bind(this);
          this.closeAlert=this.closeAlert.bind(this)
          this.chooseProject        = this.chooseProject.bind(this)
     }
     chooseProject(e){

        e.preventDefault();
         var  doc= document.getElementById("Proj_"+this.state.ShowReport[1].idproject).value;
         var older =this.state.ShowReport[0].idproject
 
         var Newest =this.state.ShowReport.map((elem,index)=>{
             var NewElem= Object.assign({},elem);
             NewElem.idproject=doc-0
             return NewElem
         })
        
         this.props.Update(Newest,doc-0,older);
         
         this.setState({
            ShowReport:Newest
         })

      }


      closeAlert(){
        this.setState({
            sms:"",
            smsOpen:false
        })
      }
     AddRow(e){
            e.preventDefault();
        if( rowChecker(this.state.ShowReport) ){

                    var elem = {
                                    Signature: "",
                                    id:Math.random()*1000000,
                                    hrs: "",
                                    idemployee: "",
                                    idlabor: "",
                                    idproject:this.state.ShowReport[0].idproject
                                }
                    var Newest=this.state.ShowReport.length===0 ?  [{
                        send:false,
                        idproject:[8],
                        date:this.props.date,
                        materials:"Some materials",
                        equipments:"Some equipments",
                        production:"Something else",
                        comments: "Some comments"
                      }]: this.state.ShowReport
                        Newest.push(elem)
                        
                        this.props.Update(Newest,Newest[0].idproject,Newest[0].idproject);
                        SetLocalReport(Newest)
                        this.setState({
                            ShowReport:Newest
                         })

        }
        else{
            this.setState({
                sms:"Complete",
                smsOpen:true
            })
        }
    }
        
     componentWillMount() {

        this.setState({ 
          ShowReport:this.props.report,
          date:this.props.date,
          lang:this.props.lang
        })
      }
    
      //Update the list
     componentWillReceiveProps(nextProps) {
      
                if( !CompareObjects(nextProps.report,this.state.ShowReport) || this.state.lang!== nextProps.lang) {
                
                    this.setState({   ShowReport:nextProps.report,date:this.props.date,lang:nextProps.lang  })
                } 
                    
        }

    render() {

        var arrayProject =this.props.Project.map((elem)=>{
            
            return ( <option className={this.props.usedProj.indexOf(elem[1])===-1?"":"text-secondary disabled"} 
                             id={"proj_"+elem[1]}  
                             value={elem[1]} >
                             {elem[0]+"/"+elem[2]}
                    </option> )
        }) ;
        
        console.log("Table",this.state.ShowReport,this.props.Project)
        var id      =this.state.ShowReport.length>0?this.state.ShowReport[1].idproject:this.props.Project[0][1];

 
      return(     
      <div style={{margin:"20px",marginTop:"60px"}}>  
                <div className="container row mb-4">
                            <div 
                                className="col-md-4 text-danger my-2 "
                                style={{textAlign:"right"}}  
                                onClick={()=>{this.props.deleteProj(this.state.ShowReport[1].idproject);}}
                                id="CancelMOdalParent"
                            >
                           
                            <FontAwesomeIcon icon={ faTrashAlt} size={"4x"}/>
                            </div>
                            <div class="col-md-8  ">
                                    
                                    <label className="text-dark" for={"Proj_"+this.state.ShowReport[1].idproject}>{this.state.lang==="es"?"Proyecto":"Project"}</label>
                                    <select class=" custom-select " id={"Proj_"+this.state.ShowReport[1].idproject} value={id} onChange={this.chooseProject}>
                                            {arrayProject}
                                    </select>
                            
                                
                            
                            </div>
                          
                </div>  
                
                <hr className="d-flex justify-content-center w-75"/>

                <div class="table-responsive-md">
                
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                        <th className='colN-1 text-primary' onClick={this.AddRow} >
                                                
                                                <FontAwesomeIcon icon={ faUserPlus} size={"2x"}/>
                                        </th>
                                        <th className="colN-2 "> {this.state.lang==="es"?"Nombre":" Name"}</th>
                                        <th >{this.state.lang==="es"?"Reporte":"Report"}</th>
                                        <th className="colN-4">{this.state.lang==="es"?"Firma":" Sign"}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                <EmployeeRow
                                                 lang={this.props.lang} 
                                                 date={this.props.date} 
                                                 Project={this.props.Project} 
                                                 ShowReport={this.state.ShowReport} 
                                                 Update={(report,newID,ProjChange)=>{this.props.Update(report,newID,ProjChange)}}  
                                                
                                                 OldReports={this.props.OldReports}
                                                 WholeList = {this.props.WholeList}
                                                 idEmloyeeList={this.props.idEmloyeeList}
                                                 idLaborList={this.props.idLaborList}
                                />
                                    
                                    </tbody>
                                    </table>
            
                    </div>
                    {this.state.smsOpen    ?     <SendAlert open={this.state.smsOpen} lang={this.state.lang} close={this.closeAlert}sms={this.state.sms}/>:<div/>}
         </div>  
        )
    }
  }
  

  export default Table;