import React,{Component} from "react";
import {CompareObjects} from "../../../Helper/Conversor"





import {rowChecker} from "../../../Helper/Validation"
import ProductRow from "./ProductRow";
import {SetLocalScan} from "./../../../Helper/setLocalStorage"


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus,faTrashAlt} from '@fortawesome/free-solid-svg-icons'





class Table extends Component {
    constructor(props) {
        super(props);
        
          this.AddRow                =this.AddRow.bind(this);
          this.chooseProject        = this.chooseProject.bind(this)
     }
    
     chooseProject(e){

        e.preventDefault();
      
         var  doc= document.getElementById("ProjScan_"+this.state.ShowScan[1].idproject).value;
         var older =this.state.ShowScan[0].idproject;

         var Newest =this.state.ShowScan.map((elem,index)=>{
             var NewElem= Object.assign({},elem);
             NewElem.idproject=doc-0
             return NewElem
         })
        
         
         this.props.Update(Newest,doc-0,older);
         
         this.setState({
            ShowScan:Newest
         })

      }


      AddRow(e){
        e.preventDefault();
        var idproject=this.state.ShowScan[1].idproject
                var elem = {
                        id:Math.random()*1000000,
                        idproject:idproject,
                        product:"",
                        name:"NO Scanned",
                        amount:0
                    }
                var Newest=this.state.ShowScan;
                         Newest.push(elem)
                 
                    this.props.Update(Newest,idproject,idproject);

                    SetLocalScan(Newest)
                    this.setState({
                        ShowScan:Newest
                     })

   
}

componentWillMount() {

    this.setState({ 
      ShowScan:this.props.Scanner,
      date:this.props.date,
      lang:this.props.lang
    })
  }

  //Update the list
 componentWillReceiveProps(nextProps) {
  
            if( !CompareObjects(nextProps.Scanner,this.state.ShowScan) || this.state.lang!== nextProps.lang) {
            
                this.setState({   ShowScan:nextProps.Scanner,date:this.props.date,lang:nextProps.lang  })
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
        

        var id      =this.state.ShowScan.length>0?this.state.ShowScan[1].idproject:this.props.Project[0][1];

 
      return(     
      <div style={{margin:"20px",marginTop:"60px"}}>  
                <div className="container row mb-4">
                            <div 
                                className="col-md-4 text-danger my-2 "
                                style={{textAlign:"right"}}  
                                onClick={()=>{this.props.deleteProj(this.state.ShowScan[1].idproject);}}
                                id="CancelMOdalParent"
                            >
                           
                            <FontAwesomeIcon icon={ faTrashAlt} size={"4x"}/>
                            </div>
                            <div class="col-md-8  ">
                                    
                                    <label className="text-dark" for={"ProjScan_"+this.state.ShowScan[1].idproject}>{this.state.lang==="es"?"Proyecto":"Project"}</label>
                                    <select class=" custom-select " id={"ProjScan_"+this.state.ShowScan[1].idproject} value={id} onChange={this.chooseProject}>
                                            {arrayProject}
                                    </select>
                            
                                
                            
                            </div>
                          
                </div>  
                
                <hr className="d-flex justify-content-center w-75"/>

                <div class="table-responsive-md">
                
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                        <th className='colN-1 text-primary p-2' onClick={(e)=>{this.AddRow(e)}} >
                                                
                                                <FontAwesomeIcon icon={ faPlus} size={"2x"}/>
                                        </th>
                                        <th className="colN-2 "> {this.state.lang==="es"?"Barcode":"Codigo"}</th>
                                        <th >{this.state.lang==="es"?"Nombre":"Name"}</th>
                                        <th className="colN-4 p-2">{this.state.lang==="es"?"Cantidad":"Amount"}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                               
                                    <ProductRow
                                                 lang={this.props.lang} 
                                                 date={this.props.date} 
                                                 ShowScan={this.state.ShowScan} 
                                                 Update={(report,newID,ProjChange)=>{this.props.Update(report,newID,ProjChange)}}  
                                                 OnSETSMS={(sms)=>this.props.OnSETSMS(sms)}
                                                 OldScanner={this.props.OldScanner}
                                                 onUpdateLocalScan={this.props.onUpdateLocalScan}
                                                 Inventory={this.props.Inventory}
                                />
                                    </tbody>
                                    </table>
            
                                </div>
                    </div>  
        )
    }
   
  }
  
export default Table;





