import React,{Component} from "react";
import { connect } from 'react-redux';


import * as actionTypes from '../../../store/actions';
import {SetLocalReport} from "./../../../Helper/setLocalStorage"
import {rowChecker} from     "./../../../Helper/Validation"
import {CompareObjects} from "./../../../Helper/Conversor"
import Table from "./Table";
import {Alert} from "../../InformationCards/Alert"




class TableCenter extends Component {
    constructor(props) {
        super(props);
       this.state={
        deleteId:"_",
        openAlert:false
       }
        this.onUpdate= this.onUpdate.bind(this);
        this.deleteWholeProject=this.deleteWholeProject.bind(this);
        this.AddProject= this.AddProject.bind(this);
        this.closeAlert               =this.closeAlert.bind(this)
     }


     closeAlert(){
        this.setState({openAlert:false,deleteId:"_",deleteIdP:"_"})
    }


     onUpdate(report,id,ProjChange){


      

        var newShowReport=this.state.ShowReport.filter(elem=> elem.idproject!==ProjChange)
        newShowReport=newShowReport.concat(report.slice(1,report.length))


        if(ProjChange!==id){

            newShowReport[0]= Object.assign({},this.state.ShowReport[0]) 
            newShowReport[0].idproject=this.state.ShowReport[0].idproject.map(e=>{
                                                        return e===ProjChange?id:e;
            })
        }



        this.props.onUpdateLocal(newShowReport,this.state.date,this.state.Supervisor,);
        console.log("onUpdate",newShowReport)
        SetLocalReport(newShowReport)
        this.setState({
            ShowReport:newShowReport
        })


     }




     AddProject(e){
                
           

            if(rowChecker(this.state.ShowReport)===true){


                var ProjetsAvailable=this.props.Project.filter(elem => this.state.ShowReport[0].idproject.indexOf(elem[1])===-1);

                if(ProjetsAvailable.length>0){

                            var newShowReport=this.state.ShowReport;
                            console.log(this.state.ShowReport)
                            newShowReport[0].idproject.push(ProjetsAvailable[0][1])
            
                            newShowReport.push({
                                Signature: "",
                                id:Math.random()*1000000,
                                hrs: "",
                                idemployee: "",
                                idlabor: "",
                                idproject:ProjetsAvailable[0][1]
                            })
            
                            //Update
                            this.props.onUpdateLocal(newShowReport,this.state.date,this.state.Supervisor);
                            SetLocalReport(newShowReport)
                            this.setState({
                                ShowReport:newShowReport
                            })


                }

                else{
                  
                    this.props.OnSETSMS("FullProjects") 
                }
              
            }

            else{
                this.props.OnSETSMS("Complete") 
            }

            
     }


     AskDelete(id){
      
       this.setState({openAlert:true ,deleteId:id})
       
    }



     deleteWholeProject(){
         var id=this.state.deleteId-0;
        var newShowReport=this.state.ShowReport.filter(elem=> elem.idproject!==id);

        newShowReport[0].idproject=newShowReport[0].idproject.filter(el=> el!==id);

        if(newShowReport.length===1){
            newShowReport[0].idproject=[8]
            newShowReport.push({
                Signature: "",
                id:Math.random()*1000000,
                hrs: "",
                idemployee: "",
                idlabor: "",
                idproject:8,
            })
        }

   
        
        
        this.props.onUpdateLocal(newShowReport,this.state.date,this.state.Supervisor);


        SetLocalReport( newShowReport)
        this.setState({
            deleteId:"_",
            ShowReport:newShowReport,
            openAlert:false
        })

     }
     componentWillMount() {
        this.setState({ 
            ShowReport:this.props.ShowReport,
            date:this.props.date,
            Supervisor:this.props.Supervisor,
            lang:this.props.lang
          })

      }
    
      //Update the list
     componentWillReceiveProps(nextProps) {
        if( !CompareObjects(
                            nextProps.ShowReport,
                            this.state.ShowReport) || this.state.lang!== nextProps.lang) {
                
            this.setState({   
                                ShowReport:nextProps.ShowReport,
                                date:this.props.date,
                                lang:nextProps.lang,
                                Supervisor:nextProps.Supervisor,  
                            })
        } 

        }

    render() {





        var byProjects=this.state.ShowReport[0].idproject.map((idP)=>{
            
                     var pack = this.state.ShowReport.filter((e,index)=>index>0 && e.idproject===idP);
                     var FullPack=[Object.assign({},this.state.ShowReport[0])].concat(pack);
                     FullPack[0].idproject=idP;
                     return FullPack;


        });

        var TablesbyProjects=[];

        byProjects.forEach((projectsReport) => {
           
            TablesbyProjects.push(<Table 
                                            lang={this.props.lang} 
                                            date={this.props.date} 
                                            Supervisor={this.props.Supervisor} 
                                            Project={this.props.Project} 
                                            report={projectsReport} 
                                            Update={(report,newID,ProjChange)=>{this.onUpdate(report,newID,ProjChange)}}  
                                            OnSETSMS={(sms)=>this.props.OnSETSMS(sms)}
                                            OldReports={this.props.OldReports}
                                            WholeList = {this.props.WholeList}
                                            idEmloyeeList={this.props.idEmloyeeList}
                                            idLaborList={this.props.idLaborList}
                                            usedProj={this.state.ShowReport[0].idproject}
                                            deleteProj={(id)=>{this.AskDelete(id)}} 
                                            />)
        });
        



      return(
          <div>     
                    {TablesbyProjects}
                    <hr/>
                    <div class="d-flex justify-content-center" >
                            <button className="btn btn-primary btn-lg" style={{width:"200px", borderRadius:"50px"}} onClick={this.AddProject}>Add Project</button>
                  
                    </div>
                  <hr/>
                  {this.state.openAlert? <Alert 
                                                    Pass={this.deleteWholeProject} 
                                                    open={this.state.openAlert}  
                                                    Close={this.closeAlert} 
                                                    text="full" />:<div/>}
                    </div>
        )
    }
  }
  
  const mapStateToProps = state => {
  
    return {

        ShowReport: state.dataState.ShowReport,
        date:state.globalState.dateSelect,
        Supervisor:state.globalState.supervisorSelect,
        lang:state.globalState.lang,
        

        OldReports:state.dataBase.OldReportsList,

        WholeList : state.dataBase.Employee.map(e=>e[0]).sort(),

        idEmloyeeList:state.dataBase.Employee,

        Project   : state.dataBase.Project ,

        idLaborList:state.dataBase.Labor,
        
        
    };
  };
 const mapDispatchToProps = dispatch => {
    return {
      onUpdateLocal:    (value,date,supervisor) => dispatch({type: actionTypes.UPDATELOCALREPORT, value:value, date:date ,supervisor:supervisor}),
      OnSETSMS:         (value) => dispatch({type: actionTypes.SETSMS, sms:value})
    };
};
  export default connect(mapStateToProps,mapDispatchToProps)(TableCenter);