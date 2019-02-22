import React,{Component} from "react";
import { connect } from 'react-redux';

import * as actionTypes from "../../store/actions" 
import TopBar from "./../../components/TopBar"
import TableGroup from "./TableGroup"


class ProductsReportCenter extends Component {

 

    render() { 
   
      return (
                <div>
                     <TopBar/>
                        <div style={{width:"100vw",marginTop:"120px"}}>
                           
                            <TableGroup/>
                          
                        </div>
                
                 </div>

      )}
  }
  
  const mapStateToProps = state => {
      
    return {
        door      :state.globalState.door,
        
    };
  };
 const mapDispatchToProps = dispatch => {
    return {
        onSelectDoor: (value) => dispatch({type: actionTypes.DOOR , value:value}),
    };
};
  export default connect(mapStateToProps,mapDispatchToProps )(ProductsReportCenter);