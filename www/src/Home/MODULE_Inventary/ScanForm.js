import React,{Component} from "react";
import { connect } from 'react-redux';

//import * as actionTypes from '../../store/actions';
import TopBar from "./../../components/TopBar"
import TableCenter from "./Table/TableCenter"




class ScanForm extends Component {
  
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
        
        
        
        <div id ="newScan" className="mb-5">

            <TopBar/>

            <TableCenter/>

          </div>                                         
   );

    }
  }
  




  const mapStateToProps = state => {
    return {
      sms:        state.dataState.sms,
      name:        state.dataState.name  ,
      lang:state.globalState.lang
    };
  };
  const mapDispatchToProps = dispatch => {
    return {

    };
};
  export default connect(mapStateToProps,mapDispatchToProps)(ScanForm);