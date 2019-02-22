import * as actionTypes from '../actions';
     

const initialState = {

   
    supervisorSelect:'',
    dateSelect:"2019-03-03",
    lang:"es",
    door:"start"


}
const reducer = (state = initialState, action) => {


    switch(action.type){

        case actionTypes.DOOR:
                        return {
                            ...state,
                            door:action.value

                        }  
 
                                                                           
    }
    return state;
};

export default reducer;