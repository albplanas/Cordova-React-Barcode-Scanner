import * as actionTypes from '../actions';
import {InventaryName } from '../../Helper/Conversor';    

const initialState = {
    Inventory:[],
    listSupervisor:[
        "Mandy",
        "Ramon",
        "Jose Perez",
        "Pablo Orta",
        "HectorParedes",
        "Juan Carlos Rodriguez"
    ]
}
const reducer = (state = initialState, action) => {


    switch(action.type){
       
      
        case actionTypes.UPDATEDATABASE:
       
                        return {
                            ...state,
                            Inventory:action.value

                        }                  
 
    }
    return state;
};

export default reducer;