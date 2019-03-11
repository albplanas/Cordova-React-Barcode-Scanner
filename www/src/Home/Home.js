import React,{Component} from "react";
import { connect } from 'react-redux';
import axios from "axios"
import Start from "./Start/Start";
import ScanState from  "./MODULE_Inventary/ScanState";
import ReportState from           "./MODULE_Assistence/ReportState"

import * as actionTypes from "../store/actions" 

import SendAlert from "./InformationCards/SendAlert"



class Home extends Component {

    constructor(props) {
        super(props);
        
     
        this.GetStared=this.GetStared.bind(this);
      }
  

    GetStared(query){
        if(window.localStorage.getItem(query)===null){ 
            if(query==="OldScannerList"){
              var OldScannerList=[
                [{
                            send:false,
                            idproject:[8,9],
                            date:"2019-02-21"
                            },{
                              id:Math.random()*1000000,
                              idproject:8,
                              product:"9780444505156",
                              name:"P6",
                              amount:3
                        },{
                          id:Math.random()*1000000,
                          idproject:9,
                          product:"9780444505156",
                          name:"P6",
                          amount:3
                        }],[
                        {
                        send:false,
                        idproject:[8],
                        date:"2019-02-20",
                        },{
                          id:Math.random()*1000000,
                          idproject:8,
                          product:"9780444505156",
                          name:"P6",
                          amount:3
                    }]

                ];
window.localStorage.setItem(query,JSON.stringify( OldScannerList));


this.props.onUpdateDataBase(query, OldScannerList)
            }
            else if(query==="OldReportsList"){
                var OldReportsList=[
                                        [{
                                                    send:false,
                                                    idproject:[8,9],
                                                    date:"2019-02-21",
                                                    Supervisor:"Armando Yorca",
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
                                                Supervisor:"Pablo Orta",
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
                                  
                                    var  newId  = [
                                      "Armando Llorca",
                                      "Ramon Crespo",
                                      "Jose Perez",
                                      "Jorge L. Perez",
                                      "Pablo Orta",
                                      "Hector Paredes",
                                      "Juan Carlos Rodriguez"
                                  ];
                                  }
                                  else if(query==="Inventory"){
                                    var  newId =response.data.map(elem=>{return [elem.Code,elem.Name] })
                                  }
                                  else if(query==="Labor"){
                                 
                                    var  newId =response.data.map(elem=>{return [elem.idLabor,elem.labor,elem.idProject] })
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
    //console.log(window.localStorage)

      //window.localStorage.clear();    
      
      this.GetStared("Inventory");
      this.GetStared("Supervisor");
      this.GetStared("Employee");
      this.GetStared("Project");
      this.GetStared("Labor");
      this.GetStared("OldReportsList"); 
      this.GetStared("OldScannerList");


      var time = new Date().getTime();

          
          var dates = new Date(time);
          dates=dates.toDateString();
         
   
      this.props.onSetDay({
                                supervisor:        window.localStorage.getItem("SupervisorEmployee")===null?"":window.localStorage.getItem("SupervisorEmployee"),
                                date      :         dates
                            })
    
      }
      
      
   

    render() { 
     
      return (
          <div>
             
                {   
                    this.props.door === "start"  ?    <Start/> :
                    this.props.door === "inventary"?  <ScanState/>:
                    this.props.door === "assistence"? <ReportState />:<div/>
                 }
              <SendAlert/>
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
        onSetDay:     (value) => dispatch({type: actionTypes.SETDAY , value:value}),
    };
};
  export default connect(mapStateToProps,mapDispatchToProps )(Home);


 