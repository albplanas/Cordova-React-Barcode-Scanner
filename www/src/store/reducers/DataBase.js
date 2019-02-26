import * as actionTypes from '../actions'; 

const initialState = {
    Inventory:[],
    Supervisor:[
        "Mandy",
        "Ramon",
        "Jose Perez",
        "Pablo Orta",
        "HectorParedes",
        "Juan Carlos Rodriguez"
    ],
    Labor:[]

}
const reducer = (state = initialState, action) => {


    switch(action.type){
       
      
        case actionTypes.UPDATEDATABASE:


                      
                        return {
                            ...state,
                            [action.property]:action.value
                        }                  
 
    }
    return state;
};

export default reducer;