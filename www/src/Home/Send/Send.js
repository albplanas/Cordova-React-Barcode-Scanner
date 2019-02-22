
//import {readyToSend} from "../Helper/Validation";
import FetchData from "./FetchData"


export default function send() {
            
        var online = navigator.onLine;
        var messenger=[];
console.log("send")

//Fetch Data
messenger= FetchData("Inventory");
        /*
                           

                                //Valid Report
                                //var mergedReport = OldReport.filter(elem => readyToSend(elem)===true);

                               


                                

                               
                                

                                if(false){//mergedReport.length===0){

                                        messenger.push({sms:"Empty", name:""})
                                        return messenger
                                }
                                else{


                                    if(!online){
                                        
                                        messenger.push({sms:"Offline", name:""})
                                        return messenger
                                     
                                    }
                                    else{
                                              
                                                    /************************************************* 
                                                    * Update the basic information
                                                    * 
                                                    * ***********************************************/


                                               
                                                   
                                               
                                                    
                                                    

                                        /************************************************* 
                                        *Sent last  Report Information
                                        * 
                                        * ***********************************************/
                                 
                                              
              //                      }

            //                     }  
                                
        return messenger
  }

 