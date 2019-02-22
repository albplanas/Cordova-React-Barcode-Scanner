import React,{Component} from "react";
import { connect } from 'react-redux';

import * as actionTypes from "../../store/actions" 
import { CompareObjects,InventaryName} from "../../Helper/Conversor";

import Table from "./Table"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrashAlt, faBarcode} from '@fortawesome/free-solid-svg-icons'

class TableGroup extends Component {

    constructor(props) {
        super(props);
        
        this.state={
                dataTarget: [],         
                dateSelect:""
        }
        this.AddRow         = this.AddRow.bind(this);
        this.DeleteRow      = this.DeleteRow.bind(this);
        this.ChangeRow      = this.ChangeRow.bind(this);
      }

        AddRow (idproj){
            var  pars={
                sms:'Scan a barcode', // Change the info message. A blank message ('') will show a default message
                orientation:true, // Lock the orientation screen
                camera:0, // Choose the camera source
                beep:true, // Enables a beep after the scan
                scan_type:'normal', // Types of scan mode: normal = default black with white background / inverted = white bars on dark background / mixed = normal and inverted modes
                barcode:[], // Put a list of formats that the scanner will find. A blank list ([]) will enable scan of all barcode types
                extras:{} // Additional extra parameters. See [ZXing Journey Apps][1] IntentIntegrator and Intents for more details
        }
        var  params={
            'prompt_message':pars.sms, // Change the info message. A blank message ('') will show a default message
            'orientation_locked':pars.orientation, // Lock the orientation screen
            'camera_id':pars.camera, // Choose the camera source
            'beep_enabled':pars.beep, // Enables a beep after the scan
            'scan_type':pars.scan, // Types of scan mode: normal = default black with white background / inverted = white bars on dark background / mixed = normal and inverted modes
            'barcode_formats':pars.barcode, // Put a list of formats that the scanner will find. A blank list ([]) will enable scan of all barcode types
            'extras':pars.extras // Additional extra parameters. See [ZXing Journey Apps][1] IntentIntegrator and Intents for more details
        }
        
        window.plugins!==undefined?window.plugins.zxingPlugin.scan(params,
            (s)=>{
               
    
                
                   var El= this.props.InventaryList.filter(elem=>elem[0]+""=== s+"")
                   
                    
                var newRow=idproj===""?[{
                    send:false,
                    idproject:[""],
                    date:"2019-03-03",
                    Supervisor:"Adrian Batista"
                  },{
                    id: Math.random()*1000000,
                    idproject:idproj,
                    product:s,
                    name:El.length===0?"Unknown":El[0][1],
                    amount:0
                }]:
                
                {
                    id: Math.random()*1000000,
                    idproject:idproj,
                    product:s,
                    name:El.length===0?"Unknown":El[0][1],
                    amount:0
                }
                var newTable = this.state.dataTarget.concat(newRow)
               

                 //UPDATE
                    this.props.onUpdateTable(newTable)
                    this.setState({
                        dataTarget : newTable
                    })
            }
            , onFailure):console.log("device dont support cammera features")


                function  onFailure(s){
                    console.log(s)
                }


        }

        DeleteRow(id){
            var newTable = this.state.dataTarget.filter(elem=> elem.id!==id)
         
            var ElemIP   = this.state.dataTarget.filter(elem=> elem.id===id)[0].idproject;
          
            var idProjectChecker = newTable.filter((elem ,index)=> elem.idproject===ElemIP && index>0).length;
          
            newTable[0].idproject=idProjectChecker===0?this.state.dataTarget[0].idproject.filter(e=>e!==ElemIP):this.state.dataTarget[0].idproject
            
            
            //UPDATE
            this.props.onUpdateTable(newTable)
            this.setState({
                dataTarget : newTable
              })
        }

        ChangeRow(e){
            
            var id= e.target.id
            var value=document.getElementById(id).value;
            var idNumb=id.split("_")[1]-0;
            var newTable=this.state.dataTarget.map((el)=> {
                     return  el.id===idNumb ?
                                {
                                    id: el.id,
                                    idproject:el.idproject,
                                    product:el.product,
                                    amount: value
                                }:el
            });
            
            //UPDATE
            this.props.onUpdateTable(newTable)
            this.setState({
                dataTarget : newTable
            })
        }
      componentWillMount(){
          this.setState({
            dateSelect : this.props.date,
            dataTarget : this.props.DATA,
            InventaryList:this.props.InventaryList
          })
      }

      componentWillReceiveProps(nextProps){
           
            if(nextProps.date!==this.state.dateSelect || CompareObjects(nextProps.DATA==this.state.dataTarget)===false){
                
            console.log("next")

                this.setState({
                    dateSelect : nextProps.date,
                    dataTarget : nextProps.DATA
                  })  
            }
      }

    render() { 
      
      var Board=this.state.dataTarget[0].idproject.length ===0 ? <button class=" shadow btn btn-primary text-center"onClick={(e)=>{e.preventDefault();this.AddRow("");}} style={{marginLeft:"40vw",marginTop:"20vw",width:"20vw",minWidth:"120px"}}>
                                                                    <div class="text-center"><FontAwesomeIcon icon={ faBarcode} size={"5x"}/>  <span className="ml-3">SCAN ITEM</span></div></button>
                                                                            : this.state.dataTarget[0].idproject.map(idP=>{
                                                                                var dataTable = this.state.dataTarget.filter(elem=> elem.idproject===idP);
                                                

                                                                                            return <Table 
                                                                                                        
                                                                                                            data={dataTable} 
                                                                                                            AddRow={(idproj)=>this.AddRow(idproj)} 
                                                                                                            DeleteRow={(id)=>this.DeleteRow(id)}
                                                                                                            ChangeRow={(e)=>{this.ChangeRow(e)}}
                                                                                                    />
                                                                                })
      
   
      return (
 
           <div>

               {Board}

           </div>


      )}
  }
  
  const mapStateToProps = state => {
      
    return {
    date                :state.globalState.dateSelect,
    DATA                :state.dataState.data,
    InventaryList       :state.dataBase.Inventory 
    };
  };
 const mapDispatchToProps = dispatch => {
    return {
        onUpdateTable: (value) => dispatch({type: actionTypes.UPDATETABLE , value:value}),
    };
};
  export default connect(mapStateToProps,mapDispatchToProps )(TableGroup);


