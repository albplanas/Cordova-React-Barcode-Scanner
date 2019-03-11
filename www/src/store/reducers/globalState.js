import * as actionTypes from '../actions';
     

const initialState = {

   
    supervisorSelect:'',
    dateSelect:"",
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
        case actionTypes.SETDAY:
                        return {
                            ...state,
                            supervisorSelect:   action.value.supervisor,
                            dateSelect:         action.value.date,
                        }   
        case actionTypes.LANGUAGE:
            var lan=action.value==="es"?"es":"en"
                        return {
                            ...state,
                            lang:   lan
                        } 
 
                                                                           
    }
    return state;
};

export default reducer;