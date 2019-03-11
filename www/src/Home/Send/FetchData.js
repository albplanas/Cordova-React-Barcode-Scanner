
import axios from "axios"


export default function FetchData(query) {
            
        var online = navigator.onLine;
        var messenger=[];


//Fetch Data
        if(online){
                axios.get("http://jva-sql:8080/Assistance/GetJson.php?table="+query)
                                                    .then((response)=> {
                                                        
                                                            var  newId =response.data.map(elem=>{return [elem.Code,elem.Name] })
                                                         
                                                            var StringnewId= JSON.stringify(newId);
                                                            window.localStorage.setItem("Id"+query,StringnewId);
                                                            messenger.push("Back up finished")

                                                    })
                                                    .catch(error => {
                                                             console.log("this is the error",error)
                                                             messenger.push("error")
                                                    })
        }
        else{
            messenger.push("offline")
        }
                                
        return messenger
  }