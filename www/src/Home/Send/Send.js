import React,{Component} from "react";
import {readyToSend} from "../../Helper/Validation";
import axios from "axios";


 
/*function toDataURL(url ){ fetch(url)
.then(response => response.blob())
.then(blob => new Promise((resolve, reject) => {
  const reader = new FileReader()
  reader.onloadend = () => resolve(reader.result)
  reader.onerror = reject
  reader.readAsDataURL(blob)
}))
}*/
export default function send(OnSMS) {

                                var OldReport=JSON.parse(window.localStorage.getItem("OldReportsList"));
                                               
                              

                                //Valid Report
                                var mergedReport = OldReport.filter(elem => readyToSend(elem)===true);

                               
                                console.log(mergedReport)

                             

                                

                                if(mergedReport.length===0){

                                        OnSMS("Empty")
                                }
                                else{

                                    if(!navigator.onLine){
                                        
                                        OnSMS("Offline") 
                                       
                                     
                                    }
                                    else{
                                              
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


                                        console.log("JSONarray",JSONarray)
                                        /************************************************* 
                                        *Sent last  Report Information
                                        * 
                                        * ***********************************************/
                                      OnSMS("Spinner")

                                        axios.post('http://jva-sql:8080/Assistance/FlushJson.php',JSONarray)
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



                                            /*    //Send Somepictures*/

                                                var PicturesArray = JSON.parse(window.localStorage.getItem("PictureRep"));
                                                PicturesArray=PicturesArray===null?[]:PicturesArray;
                                                
                                                
                                                var SendPict=[];
                                                PicturesArray.forEach((elem,index) => {

                                                                
                                                                


                                                                toDataURL(
                                                                        elem.picture,
                                                                        function(dataUrl) {
                                                                          
                                                                                        SendPict  =SendPict.concat({
                                                                                                date:elem.date,
                                                                                                picture: dataUrl.slice(22),
                                                                                                supervisor:elem.supervisor,
                                                                                                idproject:elem.idproject=== null || undefined? "":elem.idproject
                                                                                                
                                                                                        })
                                                                                        
                                                                                   
                                                                                        if(index===PicturesArray.length-1){
                                                                                                
                                                                                                axios.post('http://jva-sql:8080/Assistance/PicturesDailyReport.php',JSON.stringify(SendPict))
                                                                                                .then((response)=> {
                                                                                                        
                                                                                                        window.localStorage.setItem("PictureRep",JSON.stringify([]) ); 
                                                                                                                 
                                                                                                })
                                                                                        .catch(error => {
                                                                                                        console.log("this is the error Pictures",error)
                                                                                                        alert(error)
                                                                                                        OnSMS("Error")
                                                                                                })
                                                                                        }
                                                                        }
                                                                      )
                                                              
                                                       
                                                         
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

  function toDataURL(src, callback, outputFormat) {
        var img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = function() {
          var canvas = document.createElement('CANVAS');
          var ctx = canvas.getContext('2d');
          var dataURL;
          canvas.height = this.naturalHeight;
          canvas.width = this.naturalWidth;
          ctx.drawImage(this, 0, 0);
          dataURL = canvas.toDataURL(outputFormat);
          callback(dataURL);
        };
        img.src = src;
        if (img.complete || img.complete === undefined) {
          img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
          img.src = src;
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






      
    