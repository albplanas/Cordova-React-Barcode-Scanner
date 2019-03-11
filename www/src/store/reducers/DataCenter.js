import * as actionTypes from '../actions';
import {formatDate} from './../../Helper/Conversor'
const initialState = {

        //AssistenceReport
        ShowReport:[],
        ShowScan:[],

      date:"",
      sms:"",
      name:""

}
const reducer = (state = initialState, action) => {


    switch(action.type){
       
        case actionTypes.UPDATETABLE:
                        return {
                            ...state,
                            data:action.value

                        }  
                   
        case actionTypes.UPDATELOCALSCAN:
             

                        

                        if(Array.isArray(action.value) ){
                            if(action.value.length===0){
                                var newScanner= [{
                                    send:false,
                                    idproject:[8],
                                    date:formatDate(action.date),
                                    },{
                                      id:Math.random()*1000000,
                                      idproject:8,
                                      product:"",
                                      name:"No Scanned",
                                      amount:0
                                }]
                            }
                            else{
                                var newScanner=action.value.map((elem)=>{return Object.assign({},elem)})
                            }
                        }
                        else{
                          
                            {
                                var newScanner= [{
                                    send:false,
                                    idproject:[8],
                                    date:formatDate(action.date),
                                    },{
                                      id:Math.random()*1000000,
                                      idproject:8,
                                      product:"",
                                      name:"NO Scanned",
                                      amount:0
                                }]
                            }
                        }
                   
    
                  
                            return {
                                ...state,
                                ShowScan:newScanner
                            }



        case actionTypes.UPDATELOCALREPORT:
             

                        console.log("updatering ",action)

                            if(Array.isArray(action.value) ){
                                if(action.value.length===0){
                                    var newReport=[{
                                        send:false,
                                        idproject:[8],
                                        date:formatDate(action.date),
                                        Supervisor:action.supervisor,
                                        materials:"",
                                        equipments:"",
                                        production:"",
                                        comments: ""
                                    },{
                                    id:Math.random()*1000000,
                                    idemployee:"",
                                    idlabor:"",
                                    hrs:"",
                                    Signature:"",
                                    idproject:8
                                }]
                                }
                                else{
                                    var newReport=action.value.map((elem,index)=>{
                                        return index===0? Object.assign({},{
                                                                                send:elem.send,
                                                                                idproject:elem.idproject,
                                                                                date:formatDate(action.date),
                                                                                Supervisor:action.supervisor,
                                                                                materials:elem.materials,
                                                                                equipments:elem.equipments,
                                                                                production:elem.production,
                                                                                comments:elem.comments
                                                                            }):Object.assign({},elem)})
                                }
                            }
                            else{
                              
                                {
                                    var newReport=[{
                                                            send:false,
                                                            idproject:[8],
                                                            date:formatDate(action.date),
                                                            Supervisor:action.supervisor,
                                                            materials:"",
                                                            equipments:"",
                                                            production:"",
                                                            comments: ""
                                                        },{
                                                        id:Math.random()*1000000,
                                                        idemployee:"",
                                                        idlabor:"",
                                                        hrs:"",
                                                        Signature:"",
                                                        idproject:8
                                                    }]
                                }
                            }
                       
        
                       
                                return {
                                    ...state,
                                    ShowReport:newReport
                                }  
    }

    return state;
};

export default reducer;