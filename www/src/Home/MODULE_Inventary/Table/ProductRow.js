import React,{Component} from "react";


import {CompareObjects} from "./../../../Helper/Conversor"


import {SetLocalScan} from "./../../../Helper/setLocalStorage"

import {Alert} from "../../InformationCards/Alert"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt,faPlus,faCheckCircle, faFileSignature, faBarcode} from '@fortawesome/free-solid-svg-icons'

class ProductRow extends Component {
    constructor(props) {
        super(props);
          this.state={
            deleteId:"_",
            deleteIdP:"_",
            signOpen:false,
            openAlert:false,
          }


          this.ChangeAmount             =this.ChangeAmount.bind(this)
          this.DeleteRow                =this.DeleteRow.bind(this);
          this.PassDelete               =this.PassDelete.bind(this);
          this.ScanButton               =this.ScanButton.bind(this);
          this.closeAlert               =this.closeAlert.bind(this)
     }


     
     closeAlert(){
        this.setState({openAlert:false,deleteId:"_",deleteIdP:"_"})
    }



     DeleteRow(e){
        e.preventDefault();
       var index= e.target.id===""? e.target.parentNode.id===""? e.target.parentNode.parentNode.id:e.target.parentNode.id   :e.target.id;
      

       
       
       this.setState({openAlert:true ,deleteIdP:index.split("_")[1]})
       
    }


    PassDelete(){

        var deleteIdP=this.state.deleteIdP;
 
        var Newest=this.state.ShowScan.filter((e,index)=>""+e.id!==deleteIdP+"" )
    
        Newest=Newest.length>1?Newest:[{
                                                send:false,
                                                idproject:this.state.ShowScan[0].idproject,
                                                date:this.state.ShowScan[0].date
                                            },{
                                                id:Math.random()*1000000,
                                                idproject:this.state.ShowScan[0].idproject,
                                                product:"",
                                                name:"NO Scanned",
                                                amount:0
                                          }]
                                            
            this.props.Update(Newest,Newest[0].idproject,Newest[0].idproject);
          
            
            this.setState({openAlert:false,deleteId:"_",deleteIdP:"_"})

       
      }



   ChangeAmount(e){

    var id=e.target.id.split("_")[1];
    const value= document.getElementById(e.target.id).value+"";

    

    var newOne = this.state.ShowScan.map(elem=>{
        
        return elem.id+""===id+"" ? Object.assign({},{
                                                    id:elem.id,
                                                    idproject:elem.idproject,
                                                    product:elem.product,
                                                    name:elem.name,
                                                    amount:value
                                                }):Object.assign({},elem)
    })
 
   

    this.props.Update(newOne,newOne[1].idproject,newOne[1].idproject)

    this.setState({
        ShowScan:newOne
    })
   }
   
   
  ScanButton (idScan){
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
    
    if(window.plugins!==undefined){
        window.plugins.zxingPlugin.scan(params,
            (s)=>{

                  var El= this.props.Inventory.filter(elem=>elem[0]+""=== s+"")
    

                   
    
                     var newOne = this.state.ShowScan.map(elem=>{
                            
                            return elem.id+""===idScan+"" ? Object.assign({},{
                                                                    id:elem.id,
                                                                    idproject:elem.idproject,
                                                                    product:s,
                                                                    name:El.length===0?"Unknown":El[0][1],
                                                                    amount:elem.amount                                                                                          
                                    }):Object.assign({},elem)
                     })
                                           
                    this.props.Update(newOne,newOne[1].idproject,newOne[1].idproject)
                                            
                     this.setState({
                         ShowScan:newOne
                   })                                                                

                        
            }
            , onFailure)
    }
    else{

        var newOne = this.state.ShowScan.map(elem=>{

            return elem.id+""===idScan+"" ? Object.assign({},{
                    id:elem.id,
                    idproject:elem.idproject,
                    product:"123",
                    name:"Test",
                    amount:0                                                                                           
            }):Object.assign({},elem)
            })

    
            this.props.Update(newOne,newOne[1].idproject,newOne[1].idproject)
                    
            this.setState({
            ShowScan:newOne
            }) 


    }
                                                   
                                                   
        
    
    
            function  onFailure(s){
                console.log(s)
            }
    
    
    }
  

 
      
     componentWillMount() {
        
        this.setState({ 
          ShowScan:this.props.ShowScan,
          lang:this.props.lang
        })
      }
    
      //Update the list
     componentWillReceiveProps(nextProps) {
    
              if( !CompareObjects(nextProps.ShowScan,this.state.ShowScan) || this.state.lang!== nextProps.lang ) {
                
                this.setState({   ShowScan:nextProps.ShowScan ,lang:nextProps.lang })
              } 
                    
                   
        }




    render() {    

 
 var IDproj=this.state.ShowScan[0].idproject;

         var arrayProducts=this.state.ShowScan.filter((e,ind)=>ind>0).map(e=>{

 var list=[];
 for(var i=1;i<50;i++){
        list.push(i);
 }        
                    
 var Listed=list.map(i=>{
     return <option value={i+""}>{i}</option>
 })
                  return (

                    <tr>
                       
                          <th scope="row"  
                                            class="text-danger p-2" 
                                            onClick={this.DeleteRow} 
                                            id={'elem_'+e.id+"_"+IDproj}   >
                                        <FontAwesomeIcon  icon={ faTrashAlt} size={"2x"}/>
                                      
                            </th>
                        
                            <td className="colN-2 ">
                                {
                                    e.product===""?<button className="btn btn-info " style={{width:"80%" ,padding: "0rem 0rem"}}  onClick={()=>this.ScanButton(e.id)} >
                                                        <FontAwesomeIcon  icon={ faBarcode} size={"2x"}/>
                                                        <span  style={{fontSize:"30px",marginLeft:"5px"}} >SCAN</span>
                                                    </button>   :
                                                    <p className="align-middle text-primary text-center " style={{width:"100%",height:"100%",marginBottom:"0px"}}>{e.product}</p>
                                }    
                                  
                            </td>
                           
                                            <td className="pl-2 pr-2" >
                                                    <input type="text "  className="form-control font-weight-bolder  text-center " value={e.name} />
                                            </td>
                                            <td className="colN-2 pl-2 pr-2">
                                                    <select class="custom-select font-weight-bolder  text-center" id={"amount_"+e.id} onChange={this.ChangeAmount} value={e.amount}>
                                                                <option selected value="">Select amount</option>
                                                                {Listed}
                                                    </select>
                                            </td>
     
                                {   this.state.openAlert    ?    <Alert Pass={this.PassDelete} 
                                                                        open={this.state.openAlert} 
                                                                        text={"product"}
                                                                        Close={this.closeAlert} />:<div/>}
                                   </tr>


                  )})

              return arrayProducts  
    }
  }
  

  export default ProductRow;