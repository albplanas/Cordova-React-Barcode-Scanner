import * as actionTypes from '../actions';
import {formatDate} from './../../Helper/Conversor'
const initialState = {

        //AssistenceReport
        ShowReport:[],
  
        

        //Scan Report
        data:[{
              send:false,
              idproject:[8,9],
              date:"2019-03-03",
              Supervisor:"Adrian Batista"
            },{
            id: 652,
            idproject:8,
            product:"9780444505156",
            name:"P6",
            amount:3
        },{
            id: 474,
            idproject:9,
            product:"062118600305",
            name:"Table",
            amount:7
      }],

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
                   
 
        case actionTypes.UPDATELOCALREPORT:
             

                         console.log("Actions",action)
                            if(Array.isArray(action.value) ){
                                if(action.value.length===0){
                                    var newReport=[{
                                        send:false,
                                        idproject:[8],
                                        date:formatDate(action.date),
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
                                    var newReport=action.value.map((elem)=>{return Object.assign({},elem)})
                                }
                            }
                            else{
                              
                                {
                                    var newReport=[{
                                                            send:false,
                                                            idproject:[8],
                                                            date:formatDate(action.date),
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