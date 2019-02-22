function SetLocalStorage(IdInventary){//IdEmployee,Projects,Supervisor,OldReportsList,newIdLabor,IdInventary) {

                

              /*  var StringnewIdLabor= JSON.stringify(newIdLabor);
                window.localStorage.setItem('IdLabor',StringnewIdLabor);
               
                var StringOldReportsList= JSON.stringify(OldReportsList);
                window.localStorage.setItem('OldReportsList',StringOldReportsList); 

                var StringSupervisor= JSON.stringify(Supervisor);
                window.localStorage.setItem('IdSupervisor',StringSupervisor);

                var StringProjects= JSON.stringify(Projects);
                window.localStorage.setItem('IdProject',StringProjects);


                var StringIdEmployee= JSON.stringify(IdEmployee);
                window.localStorage.setItem('IdEmployee',StringIdEmployee);
              */
                var StringIdInventary= JSON.stringify(IdInventary);
                window.localStorage.setItem('IdInventary',StringIdInventary);
  }

  function SetLocalReport(DR){
    
    if(DR.length>0 && Array.isArray(DR[0].idproject)){
      console.log("SeTLocal",DR)
          var Store = JSON.parse( window.localStorage.getItem('OldReportsList'))
          var dateDR=Date.parse(DR[0].date);
          
          var NewStore=Store.map((elem,index) => {

                  var dateSt=Date.parse(elem[0].date);
                  
                  return dateSt===dateDR ? DR : elem;
          });


          
          if(NewStore.filter(elem =>Date.parse(elem[0].date)===dateDR ).length===0){
                          var index=NewStore.length;
                            for(var i in NewStore) {
                               if(Date.parse(NewStore[i][1].date)>dateDR){
                                 index=i;
                                 break;
                               }
                           }
                         

                          if(index===NewStore.length){

                            var newF=NewStore;
                            newF=newF.concat([DR])
                            
                          }
                          else if(index===0){
                         
                            var newF=DR;
                            newF=newF.concat(NewStore)  
                          }
                          else{
                           
                            var newF=NewStore.slice(0,index)
                                newF=newF.concat([DR]);
                                newF=newF.concat(NewStore.slice(index))
                          }
                            
                            
                             window.localStorage.setItem('OldReportsList',JSON.stringify(newF.length>8?newF.slice(1):newF));
          }
          else{
          
            window.localStorage.setItem('OldReportsList',JSON.stringify(NewStore));
          }
          
    }
   

  }

  export {
      SetLocalStorage as SetLocalStorage,
      SetLocalReport as SetLocalReport
  }