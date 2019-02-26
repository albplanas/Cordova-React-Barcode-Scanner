import React,{Component} from "react";
import { connect } from 'react-redux';
import axios from "axios"
import Start from "./Start/Start";
import ProductsReportCenter from  "./MODULE_Inventary/ProductsReportCenter";
import ReportState from           "./MODULE_Assistence/ReportState"

import * as actionTypes from "../store/actions" 





class Home extends Component {

    constructor(props) {
        super(props);
        
     
        this.GetStared=this.GetStared.bind(this);
      }
  

    GetStared(query){
        if(window.localStorage.getItem(query)===null){ 
            console.log("isNull");
            if(query==="OldReportsList"){
                var OldReportsList=[
                                        [{
                                                    send:false,
                                                    idproject:[8,9],
                                                    date:"2019-02-21",
                                                    materials:"Some materials",
                                                    equipments:"Some equipments",
                                                    production:"Something else",
                                                    comments: "Some comments"
                                                    },{
                                                    id: 998,
                                                    idemployee :98,
                                                    Signature:'',   
                                                    idlabor:58,
                                                    hrs: 2,
                                                    idproject:8
                                                },{
                                                id:9912,
                                                idemployee :98,
                                                Signature:'',
                                                idlabor:69,
                                                hrs: 5,
                                                idproject:9
                                                
                                            }],[
                                                {
                                                send:false,
                                                idproject:[8],
                                                date:"2019-02-20",
                                                materials:"Some materials",
                                                equipments:"Some equipments",
                                                production:"Something else",
                                                comments: "Some comments"
                                                },{
                                                id:666,
                                                idemployee :98,
                                                Signature:'',
                                                idlabor:58,
                                                hrs: 2,
                                                idproject:8
                                                
                                            }]

                                        ];
                 window.localStorage.setItem(query,JSON.stringify(OldReportsList));
                 this.props.onUpdateDataBase(query,OldReportsList)
             
              }
            else{
                            axios.get("http://jva-sql:8080/Assistance/GetJson.php?table="+query)
                            .then((response)=> {
                                
                                  if(query==="Supervisor"){
                                    var  newId  =  [
                                      "Mandy",
                                      "Ramon",
                                      "Jose Perez",
                                      "Pablo Orta",
                                      "HectorParedes",
                                      "Juan Carlos Rodriguez"
                                  ];
                                  }
                                  else if(query==="Inventory"){
                                    var  newId =response.data.map(elem=>{return [elem.Code,elem.Name] })
                                  }
                                  else if(query==="Labor"){
                                    var  newId =response.data.map(elem=>{return [elem.idLabor,elem.labor] })
                                  }
                                  else if(query==="Project"){
                                    var newId =response.data.map(elem=>{return [elem.projectcode,elem.idProject,elem.projectname,elem.projectlocation]});

                                  }
                                  else if(query==="Employee"){
                                    var newId =response.data.map(elem=>{return [elem.Employee,elem.IdEmployee]})
                                  }
                                 
                                    
                                    window.localStorage.setItem(query,JSON.stringify(newId));
                                    this.props.onUpdateDataBase(query,newId)
                                    
                                    
                            })
                            .catch(error => {
                                    console.log("this is the error",error)
                                    messenger.push("error")
                            })
            }
           
            
    
        }
        else{
            
            this.props.onUpdateDataBase(query,JSON.parse(window.localStorage.getItem(query)))
        }
      }
    componentWillMount(){
      console.log("S1",window.localStorage) 
      window.localStorage.clear();    
        console.log("S2",window.localStorage)
      this.GetStared("Inventory");
      this.GetStared("Supervisor");
      this.GetStared("Employee");
      this.GetStared("Project");
      this.GetStared("Labor");
      this.GetStared("OldReportsList"); 

      }
 
   

    render() { 
     
      return (
          <div>
             
                {   
                    this.props.door === "start"  ?    <Start/> :
                    this.props.door === "inventary"?  <ProductsReportCenter />:
                    this.props.door === "assistence"? <ReportState />:
                                                           <div/>
                 }

            </div>
      )}
  }
  
  const mapStateToProps = state => {
      
    return {
        door      :state.globalState.door,
        date      :state.globalState.date
    };
  };
 const mapDispatchToProps = dispatch => {
    return {
        onSelectDoor: (value) => dispatch({type: actionTypes.DOOR , value:value}),
        onUpdateDataBase : (property,value) => dispatch({type: actionTypes.UPDATEDATABASE ,property:property,value:value}),
    };
};
  export default connect(mapStateToProps,mapDispatchToProps )(Home);


 