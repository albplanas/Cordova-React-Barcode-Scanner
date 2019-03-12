

  function SetLocalScan(INV){
    
    if(INV.length>0 && Array.isArray(INV[0].idproject)){
      
          var Store = JSON.parse( window.localStorage.getItem('OldScannerList'))
          var dateINV=Date.parse(INV[0].date);
          
          var NewStore=Store.map((elem,index) => {

                  var dateSt=Date.parse(elem[0].date);
                  
                  return dateSt===dateINV ? INV : elem;
          });


          
          if(NewStore.filter(elem =>Date.parse(elem[0].date)===dateINV ).length===0){
                          var index=NewStore.length;
                            for(var i in NewStore) {
                               if(Date.parse(NewStore[i][1].date)>dateINV){
                                 index=i;
                                 break;
                               }
                           }
                         

                          if(index===NewStore.length){

                            var newF=NewStore;
                            newF=newF.concat([INV])
                            
                          }
                          else if(index===0){
                         
                            var newF=INV;
                            newF=newF.concat(NewStore)  
                          }
                          else{
                           
                            var newF=NewStore.slice(0,index)
                                newF=newF.concat([INV]);
                                newF=newF.concat(NewStore.slice(index))
                          }
                            
                            
                             window.localStorage.setItem('OldScannerList',JSON.stringify(newF.length>8?newF.slice(1):newF));
          }
          else{
          
            window.localStorage.setItem('OldScannerList',JSON.stringify(NewStore));
          }
          
    }
   

  }



  function SetLocalReport(DR){
    
    if(DR.length>0 && Array.isArray(DR[0].idproject)){
      
          var Store = JSON.parse( window.localStorage.getItem('OldReportsList'))
          var dateDR=Date.parse(DR[0].date);
        

          var NewStore=Store.filter(elem => Date.parse(elem[0].date) !==dateDR).concat([DR]) ;
          
          var SortNewStore=NewStore.sort((a, b) => (Date.parse(a[0].date) > Date.parse(b[0].date)) ? 1 : -1)
          SortNewStore = SortNewStore.length>8?SortNewStore.slice(1,9):SortNewStore
          
          window.localStorage.setItem('OldReportsList',JSON.stringify(SortNewStore));
          
    }
   

  }

  export {
      SetLocalReport as SetLocalReport,
      SetLocalScan   as  SetLocalScan
  }