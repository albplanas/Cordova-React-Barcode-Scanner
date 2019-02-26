import React,{Component} from "react";
import { connect } from 'react-redux';

import * as actionTypes from '../../store/actions';
import TopBar from "./Table/TopBar"
import TableCenter from "./Table/TablesCenter"

import Materials from "./Materials/Materials"




class reportForm extends Component {
  
    constructor(props) {
        super(props);

        this.state={
          name:'',
          sms:""
        }


     }




  componentWillMount() {
    
    this.setState({ 
      sms:this.props.sms,
      name:this.props.name,
      lang:this.props.lang
    })

  }

  //Update the list
 componentWillReceiveProps(nextProps) {

    if(nextProps.sms!==this.state.sms || nextProps.name!==this.state.name || this.state.lang!== nextProps.lang ) {
            this.setState({ 
              sms:nextProps.sms,
              name:nextProps.name,
              lang:nextProps.lang 
            })
    }           
    
    }

 
    render() {
     
     
     return  (
        
        
        
        <div id ="newReport" className="mb-5">

            <TopBar/>

            <TableCenter/>

            <h3 className="text-center mt-5 " style={{fontFamily:"Cookie"}}>{this.state.lang==="es"?"Comentarios":"General description"} </h3>
           
            <Materials/>

           
          </div>                                         
   );

    }
  }
  




  const mapStateToProps = state => {
    return {

      ShowReport: state.dataState.ShowReport  ,
      sms:        state.dataState.sms,
      name:        state.dataState.name  ,
      lang:state.globalState.lang
    };
  };
  const mapDispatchToProps = dispatch => {
    return {

    };
};
  export default connect(mapStateToProps,mapDispatchToProps)(reportForm);