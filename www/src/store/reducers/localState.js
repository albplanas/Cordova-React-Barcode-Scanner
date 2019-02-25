import * as actionTypes from '../actions';

import {formatDate} from "./../../js/components/container/Profile/Helper/Conversor"


const initialState = {
    ShowReport:[],
    date:"",
    sms:"",
    name:""
}
const reducer = (state = initialState, action) => {


    switch(action.type){

        case actionTypes.SETDAY:
                return {
                    ...state,
                    date:   action.value.date
                }   


        case actionTypes.UPDATELOCALREPORT:
             
                var newReport=action.value.map((elem)=>{return Object.assign({},elem)})

                    newReport=newReport.length===0?[{
                                                                        send:false,
                                                                        idproject:[8],
                                                                        date:formatDate(state.date),
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
                                                                }]: newReport
                        return {
                            ...state,
                            ShowReport:newReport
                        }  

                    
       case actionTypes.SETSMS:
                        return {
                            ...state,
                            sms:action.sms,
                            name:action.name
                        }                                                        
    }
    return state;
};

export default reducer;