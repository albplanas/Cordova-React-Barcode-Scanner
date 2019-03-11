import * as actionTypes from '../actions';



const initialState = {
    sms:""
}
const reducer = (state = initialState, action) => {


    switch(action.type){
                    
       case actionTypes.SETSMS:
     
                        return {
                            ...state,
                            sms:action.sms
                        }                                                        
    }
    return state;
};

export default reducer;