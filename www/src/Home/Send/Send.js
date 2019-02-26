import React,{Component} from "react";
import {readyToSend} from "../../Helper/Validation";
import axios from "axios"


export default function send() {
                     
                                var messenger=""
                                var OldReport=JSON.parse(window.localStorage.getItem("OldReportsList"));
console.log(OldReport)
                                //Valid Report
                                var mergedReport = OldReport.filter(elem => readyToSend(elem)===true);

                               


                                var online = navigator.onLine;

                                

                                if(mergedReport.length===0){

                                        messenger="Empty"
                                        return messenger
                                }
                                else{


                                    if(!online){
                                        
                                        messenger="Offline"
                                        return messenger
                                     
                                    }
                                    else{
                                              
                                                    /************************************************* 
                                                    * Update the basic information
                                                    * 
                                                    * ***********************************************/


                                                FetchingData("Inventory")
                                                FetchingData("Supervisor")
                                                FetchingData("Employee")
                                                FetchingData("Project")
                                                FetchingData("Labor")

                                                
                                                        
                                                    var list = [];
                                                    
                                                    mergedReport.forEach(arrayReports=>{
                                                        
                                                       
                                                        arrayReports.forEach((ele,index)=>{

                                                                if( index>0 ){

                                                                        var img = ele.Signature.slice(22)

                                                                        
                                                                        list.push({
                                                                                idemployee :ele.idemployee,
                                                                                idproject:ele.idproject,
                                                                                idlabor:ele.idlabor,
                                                                                hrs:ele.hrs,
                                                                                date:arrayReports[0].date,
                                                                                signature:img,
                                                                                materials:arrayReports[0].materials,
                                                                                equipments:arrayReports[0].equipments,
                                                                                production:arrayReports[0].production,
                                                                                comments: arrayReports[0].comments
                                                                        }) 
                                                                }

                                                        })
                                                        
                                                    });
                                            
                                                    
                                      
                                     
                                        

                                        var JSONarray= JSON.stringify(list)
                                        
                                    

                                        /************************************************* 
                                        *Sent last  Report Information
                                        * 
                                        * ***********************************************/
  
                                    axios.post('http://jva-sql:8080/Assistance/FlushJson.php',JSONarray)
                                        .then((response)=> {
                                            
                                            //right now i will store the table in the redux state but in the real aplication i need to create a file outside app 
                                                
                                                messenger="done"
                                                
                                  
                                                var Test=OldReport.map(elem => {
                                                       
                                                        var resulted = elem;
                                                        resulted[0]=Object.assign({},elem[0]);
                                                        resulted[0].send= mergedReport.filter(e=> e[0].date===elem[0].date).length>0?true:resulted[0].send
                                                        return resulted

                                                        
                                                });
                                           
                                                window.localStorage.setItem('OldReportsList',JSON.stringify(Test))


                                                
                                        })
                                        .catch(error => {
                                                console.log("this is the error",error)
                                                messenger="ERROR"
                                        })   
                                              
                                    }

                                 } 
                                
        return messenger
  }




 function FetchingData(query){
        axios.get("http://jva-sql:8080/Assistance/GetJson.php?table="+query)
        .then((response)=> {
                if(query==="Supervisor"){
                        var  newId  =  [
                          "Armando Yorca",
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
                        
        })
        .catch(error => {
            console.log("Error",error)
        })
 }

 