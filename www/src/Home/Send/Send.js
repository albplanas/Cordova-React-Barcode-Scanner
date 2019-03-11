import React,{Component} from "react";
import {readyToSend} from "../../Helper/Validation";
import axios from "axios";


 


export default function send(OnSMS) {

                                var OldReport=JSON.parse(window.localStorage.getItem("OldReportsList"));
                                               
                              

                                //Valid Report
                                var mergedReport = OldReport.filter(elem => readyToSend(elem)===true);

                               


                              

                                

                                if(mergedReport.length===0){

                                        OnSMS("Empty")
                                }
                                else{

                                    if(!navigator.onLine){
                                        
                                        OnSMS("Offline") 
                                       
                                     
                                    }
                                    else{
                                              

                                                //Send Somepictures

                                                var PicturesArray = JSON.parse(window.localStorage.getItem("PictureRep"));
                                                var SendPict=[];
                                                PicturesArray.forEach((elem,index) => {
                                                        toDataURL('http://tjpavement.com/pictures/portfolio/projectTest_1/projTest1-01.jpeg')
                                                                .then(dataUrl => {
                                                                                        console.log('RESULT:', dataUrl)
                                                                                        SendPict  =SendPict.concat({
                                                                                                                                date:elem.date,
                                                                                                                                picture: dataUrl,
                                                                                                                                supervisor:elem.supervisor
                                                                                                                        }) 
                                                                                        if(index===PicturesArray.length-1){
                                                                                                alert(dataUrl)
                                                                                                axios.post('http://jva-sql:8080/Assistance/FlushJsonPictures.php',JSON.stringify(SendPict))
                                                                                                .then((response)=> {
                                                                                                                console.log("PictResponse",response)    
                                                                                                })
                                                                                                .catch(error => {
                                                                                                        console.log("this is the error",error)
                                                                                                        OnSMS("Error")
                                                                                                })
                                                                                        }
                                                                })
                                                       
                                                         
                                                })

                                                // Usage
                                             
                                                        
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
                                                                                comments: arrayReports[0].comments,
                                                                                supervisor:arrayReports[0].Supervisor,
                                                                        }) 
                                                                }

                                                        })
                                                        
                                                    });
                                            
                                                    
                                      
                                     
                                      

                                        var JSONarray= JSON.stringify(list)
                                        
                                    

                                        /************************************************* 
                                        *Sent last  Report Information
                                        * 
                                        * ***********************************************/
                                      // OnSMS("Spinner")
                                       console.log(JSONarray)
                                  /* axios.post('http://jva-sql:8080/Assistance/FlushJson.php',JSONarray)
                                        .then((response)=> {
                                            
                                            //right now i will store the table in the redux state but in the real aplication i need to create a file outside app 
                                                
                                              
                                                
                                  
                                                var Test=OldReport.map(elem => {
                                                       
                                                        var resulted = elem;
                                                        resulted[0]=Object.assign({},elem[0]);
                                                        resulted[0].send= mergedReport.filter(e=> e[0].date===elem[0].date).length>0?true:resulted[0].send
                                                        return resulted

                                                        
                                                });
                                           
                                                window.localStorage.setItem('OldReportsList',JSON.stringify(Test))
                                                OnSMS("Done")
                                             
                                               
                                        })
                                        .catch(error => {
                                                console.log("this is the error",error)
                                                OnSMS("Error")
                                        })
                                        
                                        

                                                    /************************************************* 
                                                    * Update the basic information
                                                    * 
                                                    * ***********************************************/


                                                   FetchingData("Inventory")
                                                   FetchingData("Supervisor")
                                                   FetchingData("Employee")
                                                   FetchingData("Project")
                                                   FetchingData("Labor")
                                              
                                    }

                                 } 
                                
        
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
                        var  newId =response.data.map(elem=>{return [elem.idLabor,elem.labor,elem.idProject] })
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


 const toDataURL = url => fetch(url)
 .then(response => response.blob())
 .then(blob => new Promise((resolve, reject) => {
   const reader = new FileReader()
   reader.onloadend = () => resolve(reader.result)
   reader.onerror = reject
   reader.readAsDataURL(blob)
 }))



      
    