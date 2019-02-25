import React,{Component} from "react";


import {FindIdEmployee,FindIdLabor, FindNameEmployee, FindNameLabor,CompareObjects} from "./../../../Helper/Conversor"
import {rowChecker,hrsChecker} from "./../../../Helper/Validation"

import WholeList from "./WholeList";
import Sign_Print from "./../Sign_Print";
import ListLabor from "./ListLabor";
import {Alert} from "../../InformationCards/Alert"


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt,faPlus,faCheckCircle, faFileSignature} from '@fortawesome/free-solid-svg-icons'

class EmployeeRow extends Component {
    constructor(props) {
        super(props);
          this.state={
            deleteId:"_",
            deleteIdP:"_",
            signOpen:false,
            ShowReport:[],
            openAlert:false
          }


          this.onChangeSelectName       =this.onChangeSelectName.bind(this)
          this.onChangeSelectLabor      =this.onChangeSelectLabor.bind(this);
          this.onChangeSelectHour       =this.onChangeSelectHour.bind(this);

          this.AddCtg                   =this.AddCtg.bind(this);
          this.deleteCtg                =this.deleteCtg.bind(this);

          this.DeleteRow                =this.DeleteRow.bind(this);
          this.PassDelete               =this.PassDelete.bind(this);

          this.SwitchSign=this.SwitchSign.bind(this)
          this.ChngSign=this.ChngSign.bind(this)
     }

     DeleteRow(e){
        e.preventDefault();
       var index= e.target.id===""? e.target.parentNode.id===""? e.target.parentNode.parentNode.id:e.target.parentNode.id   :e.target.id;
      
       var i=FindNameEmployee(index.split("_")[1],this.props.idEmloyeeList)
       console.log("DELECTEEEE", index,i)
       this.setState({openAlert:true ,deleteId:i,deleteIdP:index.split("_")[2]-0})
       console.log("beforeDeleet",this.state.ShowReport)
    }


    PassDelete(){

        console.log("PAssDelete")

        var i= this.state.deleteId;
        var j=this.state.deleteIdP;
        var Newest=this.state.ShowReport.filter(e=> e.idemployee!==i )

        Newest=Newest.length>1?Newest:[{
                                                send:false,
                                                idproject:this.state.ShowReport[0].idproject,
                                                date:this.state.ShowReport[0].date,
                                                materials:"Some materials",
                                                equipments:"Some equipments",
                                                production:"Something else",
                                                comments: "Some comments"
                                            },{
                                                id:Math.random()*1000000,
                                                idemployee:"",
                                                Signature:"",
                                                idlabor:"",
                                                hrs:"",
                                                idproject:this.state.ShowReport[0].idproject,
                                            }]
                                            
            this.props.Update(Newest,Newest[0].idproject,Newest[0].idproject);
          
            
            this.setState({openAlert:false,deleteId:"_",deleteIdP:"_"})

       
      }



     AddCtg(e){
     
                    e.preventDefault();
                    var index= e.target.id===""? e.target.parentNode.id===""? e.target.parentNode.parentNode.id:e.target.parentNode.id   :e.target.id;
                           
                   if( rowChecker(this.state.ShowReport)  ){
                    console.log("AddCtg")
                            var idName=FindNameEmployee(index.split("_")[1],this.props.idEmloyeeList)
                            
                            if(hrsChecker(this.state.ShowReport,idName)){

                                var Same =this.state.ShowReport.filter(e=>e.idemployee===idName)
                        


                                var Newest =this.state.ShowReport.map(e=>e);
                                    Newest.push({
                                        id:Math.random()*1000000,
                                        idemployee:Same[0].idemployee,
                                        Signature:Same[0].Signature,
                                        idlabor:"",
                                        hrs:"",
                                        idproject:Same[0].idproject
                                    }) 
    
                                    
    
                                    this.props.Update(Newest,Newest[0].idproject,Newest[0].idproject);
                                
                            }
                            else{
                                this.props.onSMS("TooMuchHours",index.split("_")[1])
                            }
                            
                            
                   } 
                   else{
                       this.props.onSMS("Complete",index.split("_")[1])
                   }


                   
          
      }

      deleteCtg(e){
    
    
        e.preventDefault();
        var index= e.target.id===""? e.target.parentNode.id===""? e.target.parentNode.parentNode.id:e.target.parentNode.id   :e.target.id;
        var id= index.split("_")[1]-0
        console.log("CtgDelete")

       var Newest=this.state.ShowReport.filter(e=> e.id!==id);
       if(Newest.length>1){this.props.Update(Newest,Newest[0].idproject,Newest[0].idproject)}
      
    }

     onChangeSelectName(e){
                
                e.preventDefault();
                var nameBefore=FindNameEmployee(e.target.id.split('_')[1]?e.target.id.split('_')[1]:"",this.props.idEmloyeeList);
                var nameAfter=FindNameEmployee(document.getElementById(e.target.id).value,this.props.idEmloyeeList)
                if((nameAfter+'').length>0){
                            var Newest=this.state.ShowReport;
                            Newest.forEach((elem,index)=>{
                                    
                                if(elem.idemployee===nameBefore){elem.idemployee=nameAfter}
                    
                            })
                            console.log("ChangeName")
           this.props.Update(Newest,Newest[0].idproject,Newest[0].idproject);
           
        }
             

      }
   
      onChangeSelectLabor(e){

                e.preventDefault();
               
                var id=e.target.id.split('_')[1]-0;
                var ctg=  FindNameLabor(document.getElementById(e.target.id).value,this.props.idLaborList)
                

                if((ctg+"").length>0){

                    var Newest=this.state.ShowReport;

                    Newest.forEach(elem=>{
                        if(id===elem.id){
                            elem.idlabor=ctg;
                        }
                        
                    })
                    console.log("ChangeLabor")
                    this.props.Update(Newest,Newest[0].idproject,Newest[0].idproject);
                  
                }

      }

      onChangeSelectHour(e){

        e.preventDefault();
        var id=e.target.id.split('_')[1]-0;

        var hr=  document.getElementById(e.target.id).value-0
        
        if(hr){
            var Newest=this.state.ShowReport;
            
            Newest.forEach(elem=>{
                if(id===elem.id){
                    elem.hrs=hr;
                }
            })
            console.log("ChangeHrs")
            this.props.Update(Newest,Newest[0].idproject,Newest[0].idproject);
         
        }
       

    }
    
    ChngSign(e){
        e.preventDefault();

        function Valid(ele,idN){
                return ele.idemployee===idN? (ele.idlabor==="" || ele.hrs==="")? true :false :false
        }
        //validation

      
        var target=e.target.id.length >0 ? e.target.id : e.target.parentNode.id.length>0 ? e.target.parentNode.id : e.target.parentNode.parentNode.id 

        var idName= FindNameEmployee(target.split("_")[1],this.props.idEmloyeeList);

        var Filter=this.state.ShowReport.filter(elem => Valid(elem,idName)===true )



        if(idName==="" || Filter.length>0){
            this.props.onSMS("Validation Sing",idName) 
        }
        else{
            this.setState({ 
                signOpen:!this.state.signOpen,
                 signName:   idName  
            })
        }
      

       
    }
    SwitchSign(data,name,png){


            
            var Newest=this.state.ShowReport.map((elem,index)=>{
                    var newElem= Object.assign({},elem);
                    if(index>0){newElem.Signature = newElem.idemployee+''===this.state.signName+"" ? data.length>0? png :newElem.Signature:newElem.Signature }
                    return newElem
            });

            
            this.setState({ 
                signOpen:!this.state.signOpen,
                signName:   10000000000          
            })
            console.log("ChangeSign")
            this.props.Update(Newest,Newest[0].idproject,Newest[0].idproject);
            
    }
      
     componentWillMount() {
        
        this.setState({ 
          ShowReport:this.props.ShowReport,
          lang:this.props.lang
        })
      }
    
      //Update the list
     componentWillReceiveProps(nextProps) {
    
              if( !CompareObjects(nextProps.ShowReport,this.state.ShowReport) || this.state.lang!== nextProps.lang ) {
                
                this.setState({   ShowReport:nextProps.ShowReport ,lang:nextProps.lang })
              } 
                    
                   
        }


     /*  componentWillUnmount(){
        console.log("Unmount")
        this.props.Update(this.state.ShowReport,this.state.ShowReport[0].idproject,this.state.ShowReport[0].idproject);
        SetLocalReport(this.state.ShowReport)
        

          
       } */

    render() {
        console.log("StateReportRow",this.state.ShowReport)
        var IDproj=this.state.ShowReport[0].idproject;
        
        //Conversion 
        var Employee=[];
        var NameList=[];

        var elem=this.state.ShowReport;

        for(var i=1;i<elem.length;i++){
            NameList = NameList.indexOf(elem[i].idemployee) ===-1 ? NameList.concat(elem[i].idemployee) : NameList   
        }
        
       var ByName=NameList.map(x=>FindIdEmployee(x,this.props.idEmloyeeList))

       var projSelect=elem.length===0 ? this.props.Project[0][1]: elem[0].idproject
       console.log(this.props.Project[0])
       Employee=NameList.map(idEmp=>{
           var Categ= elem.filter(x=>x.idemployee===idEmp)

           var Hours= Categ.map(x=>{return [FindIdLabor(x.idlabor,this.props.idLaborList),x.hrs,x.id]})
          
           return {name:FindIdEmployee(idEmp,this.props.idEmloyeeList), Hours:Hours,Signature:Categ[0].Signature,}
           
       })
       console.log("wholeList")
         var arrayEmployee=Employee.map((e)=>{

         
                    
                  return (

                    <tr>
                       
                          <th scope="row"  
                                            class="text-danger" 
                                            onClick={this.DeleteRow} 
                                            id={'elem_'+e.name+"_"+IDproj}   >
                                        <FontAwesomeIcon  icon={ faTrashAlt} size={"2x"}/>
                                      
                            </th>
                        
                            <td className="colN-2">
                                {
                                    
                                    e.Signature.length>0 ? <center><p>{e.name}</p></center>:
                                    <select class=" custom-select " id={'Name_'+e.name+"_"+IDproj} value={e.name} onChange={this.onChangeSelectName}>
                                                <option className="text-dark" value="Choose">
                                                                {this.state.lang==="es"?"Selecciona un empleado":"Select Employee"}
                                                </option>
                                                {<WholeList 
                                                                    IDproj={IDproj} 
                                                                    WholeList={this.props.WholeList} 
                                                                    NameList={ByName} 
                                                                    elem={e}/> }
                                    </select>
                                }
                                  
                            </td>
                            <td>
                            <table class="table ">
                                    <tbody>
                                    <td >
                                            <table class={e.Signature.length>0 ? "table":"table table-striped"}>
                                            <tbody>
                                               { <ListLabor IDproj={IDproj} lang={this.state.lang}  elem={e} id={e.Hours[2]} idLaborList={this.props.idLaborList} idEmloyeeList={this.props.idEmloyeeList} Project={this.props.Project} projSelect={projSelect}  onChangeSelectHour={this.onChangeSelectHour} onChangeSelectLabor={this.onChangeSelectLabor} deleteCtg={this.deleteCtg} /> } 
                                            </tbody>
                                        </table> 
                                    </td>
                                   {
                                       e.Signature.length>0?<div/>:
                                        (<td id={IDproj+'ctg_'+e.name} class="text-primary" style={{    verticalAlign: "center"}}  onClick={this.AddCtg}>
                                            <FontAwesomeIcon id={IDproj+'cth_'+e.name} icon={ faPlus} size={"lg"}/>
                                                   </td>)
                                    
                                    
                                   } 
                                    </tbody>
                            </table> 
                            
                
                            </td>
                          
                                {
                                      
                                        e.Signature.length> 0   ? 
                                                                 <td id={IDproj+"sig_"+e.name} class="text-success" style={{    verticalAlign: "center"}} >
                                                                         <FontAwesomeIcon id={IDproj+'cth_'+e.name} icon={faCheckCircle} size={"lg"}/>
                                                                        
                                                                 </td> 
                                                                :    ! this.state.signOpen ?
                                                                 <td id={IDproj+"esig_"+e.name} class="text-warning" onClick={this.ChngSign} style={{    verticalAlign: "center"}} >
                                                                 
                                                                 <FontAwesomeIcon icon={ faFileSignature} size={"lg"}/>
                                                                 </td> 
                                                                 :<Sign_Print done={this.SwitchSign} lang={this.state.lang} name={e.name}/>
                 
                                                                    
                                                
                                      
                                }
                                
                {this.state.openAlert? <Alert Pass={this.PassDelete}  />:<div/>}
                   </tr>


                  )})

              return arrayEmployee   
    }
  }
  

  export default EmployeeRow;