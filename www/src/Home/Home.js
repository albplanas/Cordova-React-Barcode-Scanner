import React,{Component} from "react";
import { connect } from 'react-redux';
import axios from "axios"
import Start from "./Start/Start";
import ProductsReportCenter from  "./MODULE_Inventary/ProductsReportCenter";
import FetchData from "./Send/FetchData"


import * as actionTypes from "../store/actions" 





class Home extends Component {

    constructor(props) {
        super(props);
        
     
        this.GetStared=this.GetStared.bind(this);
      }
  

    GetStared(query){
        if(window.localStorage.getItem(query)===null){ 

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

              }
            else{
                            axios.get("http://jva-sql:8080/Assistance/GetJson.php?table="+query)
                            .then((response)=> {
                                
                                    var  newId =response.data.map(elem=>{return [elem.Code,elem.Name] })
                                    
                                    window.localStorage.setItem(query,JSON.stringify(newId));
                                    this.props.onUpdateDataBase(newId)
                                    console.log("NULL Entrance")
                                    
                            })
                            .catch(error => {
                                    console.log("this is the error",error)
                                    messenger.push("error")
                            })
            }
           
            
    
        }
        else{
            console.log("Defined Entrance")
            this.props.onUpdateDataBase(JSON.parse(window.localStorage.getItem(query)))
        }
      }
    componentWillMount(){
        
       //First Time

      window.localStorage.clear();
           
            
      this.GetStared("Inventory");
      
      this.GetStared("OldReportsList"); 

        console.log(window.localStorage)
      }
 

    render() { 
   
      return (
          <div>
             
                {   
                    this.props.door === "start"  ?         <Start/> :
                    this.props.door === "productsReport"?  <ProductsReportCenter/>:
                                                           <div/>
                 }

            </div>
      )}
  }
  
  const mapStateToProps = state => {
      
    return {
        door      :state.globalState.door
    };
  };
 const mapDispatchToProps = dispatch => {
    return {
        onSelectDoor: (value) => dispatch({type: actionTypes.DOOR , value:value}),
        onUpdateDataBase : (value) => dispatch({type: actionTypes.UPDATEDATABASE ,value:value}),
    };
};
  export default connect(mapStateToProps,mapDispatchToProps )(Home);


 