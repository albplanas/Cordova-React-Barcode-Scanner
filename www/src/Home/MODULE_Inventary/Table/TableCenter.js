import React,{Component} from "react";
import { connect } from 'react-redux';

import * as actionTypes from '../../../store/actions';
import {SetLocalScan} from "./../../../Helper/setLocalStorage"
import {rowChecker} from     "./../../../Helper/Validation"
import {CompareObjects} from "./../../../Helper/Conversor"

import Table from "./Table"

import {Alert} from "../../InformationCards/Alert"
import Sign_Print from "../../../Helper/Signature";



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
        this.GetSignature=this.GetSignature.bind(this)
        this.closeAlert=this.closeAlert.bind(this)
     }

     closeAlert(){
        this.setState({openAlert:false,deleteId:"_",deleteIdP:"_"})
    }

     GetSignature(data){

   
      }
     onUpdate(report,id,ProjChange){
  
  
       
  
        var newShowScan     = this.state.ShowScan.filter(elem=> elem.idproject!==ProjChange)
        newShowScan         = newShowScan.concat(report.slice(1,report.length))


        if(ProjChange!==id){

            newShowScan[0]= Object.assign({},this.state.ShowScan[0]) 
            newShowScan[0].idproject=this.state.ShowScan[0].idproject.map(e=>{
                                                        return e===ProjChange?id:e;
            })
        }



        this.props.onUpdateLocalScan(newShowScan);

        SetLocalScan(newShowScan)
        this.setState({
            ShowScan:newShowScan
        })


     }
     AddProject(e){
                  
             
  
        if(rowChecker(this.state.ShowScan)===true){


            var ProjetsAvailable=this.props.Project.filter(elem => this.state.ShowScan[0].idproject.indexOf(elem[1])===-1);

            if(ProjetsAvailable.length>0){

                        var newShowScan=this.state.ShowScan;
                        
                        newShowScan[0].idproject.push(ProjetsAvailable[0][1])
        
                        newShowScan.push({
                            id:Math.random()*1000000,
                            idproject:ProjetsAvailable[0][1],
                            product:"",
                            name:"NO Scanned",
                            amount:0
                      })
        
                        //Update
                        this.props.onUpdateLocalScan(newShowScan);
                        SetLocalScan(newShowScan)
                        this.setState({
                            ShowScan:newShowScan
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
       var newShowScan=this.state.ShowScan.filter(elem=> elem.idproject!==id);

       newShowScan[0].idproject=newShowScan[0].idproject.filter(el=> el!==id);

       if(newShowScan.length===1){
           newShowScan[0].idproject=[8]
           newShowScan.push({
            id:Math.random()*1000000,
            idproject:8,
            product:"",
            name:"No Scanned",
            amount:0
      })
       }

  
       
       
       this.props.onUpdateLocalScan(newShowScan);


       SetLocalScan( newShowScan);


       this.setState({
           deleteId:"_",
           ShowScan:newShowScan,
           openAlert:false
       })

    }



    componentWillMount() {
        this.setState({ 
            ShowScan:this.props.ShowScan,
            date:this.props.date,
            lang:this.props.lang
          })

      }
    
      //Update the list
     componentWillReceiveProps(nextProps) {
        if( !CompareObjects(nextProps.ShowScan,this.state.ShowScan) || this.state.lang!== nextProps.lang) {
                
            this.setState({   ShowScan:nextProps.ShowScan,date:this.props.date,lang:nextProps.lang  })
        } 

        }



    render() { 
      

                                                                      var byProjects=this.state.ShowScan[0].idproject.map((idP)=>{
              
                                                                                    var pack = this.state.ShowScan.filter((e,index)=>index>0 && e.idproject===idP);
                                                                                    var FullPack=[Object.assign({},this.state.ShowScan[0])].concat(pack);
                                                                                    FullPack[0].idproject=idP;
                                                                                    return FullPack;
                                                               
                                                               
                                                                       });
                                                                    
                                                                       var TablesbyProjects=[];
                                                               
                                                                       byProjects.forEach((projectsScanner) => {
                                                                          
                                                                           TablesbyProjects.push(<Table 
                                                                                                           lang={this.props.lang} 
                                                                                                           date={this.props.date} 
                                                                                                           Project={this.props.Project} 
                                                                                                           Scanner={projectsScanner} 
                                                                                                           Update={(report,newID,ProjChange)=>{this.onUpdate(report,newID,ProjChange)}}  
                                                                                                           OnSETSMS={(sms)=>this.props.OnSETSMS(sms)}
                                                                                                           OldScanner={this.props.OldScanner}
                                                                                                           onUpdateLocalScan={this.props.onUpdateLocalScan}
                                                                                                           Inventory={this.props.Inventory}
                                                                                                           usedProj={this.state.ShowScan[0].idproject}
                                                                                                           deleteProj={(id)=>{this.AskDelete(id)}} 
                                                                                                           />)
                                                                       });
                                                                       
                                                               
                                                                       
                                                               
                                                                     return(
                                                                         <div style={{marginTop:"100px"}}>     
                                                                                   {TablesbyProjects}
                                                                                   <hr/>
                                                                                   <div class="d-flex justify-content-center" >
                                                                                           <button className="btn btn-primary btn-lg" style={{width:"200px", borderRadius:"50px"}} onClick={this.AddProject}>Add Project</button>
                                                                                 
                                                                                   </div>
                                                                                 <hr/>
                                                                                 <Sign_Print name={"test1"} signData={this.GetSignature}/>
                                                                                 {this.state.openAlert? <Alert 
                                                                                                                    Pass={this.deleteWholeProject} 
                                                                                                                    open={this.state.openAlert}   
                                                                                                                    Close={this.closeAlert} 
                                                                                                                    text="full"  />:<div/>}
                                                                                   </div>
                                                                       )
    }
  }
  
  const mapStateToProps = state => {
    
    return {

        ShowScan: state.dataState.ShowScan,
        date:state.globalState.dateSelect,
        lang:state.globalState.lang,
        

        OldScanner:state.dataBase.OldScannerList,


        Inventory:state.dataBase.Inventory,

        Project   : state.dataBase.Project ,

        
        
        
    };
  };
 const mapDispatchToProps = dispatch => {
    return {
      onUpdateLocalScan:    (value) => dispatch({type: actionTypes.UPDATELOCALSCAN, value:value}),
      OnSETSMS:         (value) => dispatch({type: actionTypes.SETSMS, sms:value})
    };
};
  export default connect(mapStateToProps,mapDispatchToProps)(TableCenter);



  