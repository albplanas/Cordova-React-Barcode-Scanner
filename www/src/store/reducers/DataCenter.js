import * as actionTypes from '../actions';
import {InventaryName } from '../../Helper/Conversor';    

const initialState = {
    
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
      }]
}
const reducer = (state = initialState, action) => {


    switch(action.type){
       
        case actionTypes.UPDATETABLE:
                        return {
                            ...state,
                            data:action.value

                        }  
                   
 
    }
    return state;
};

export default reducer;