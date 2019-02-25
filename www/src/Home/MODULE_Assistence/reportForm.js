import React,{Component} from "react";
import { connect } from 'react-redux';

import * as actionTypes from '../../store/actions';
import SendAlert from "../InformationCards/SendAlert";
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

        this.Recover=this.Recover.bind(this)
     }

Recover(){   this.props.onSMS("","") }


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
            < SendAlert clear ={this.Recover} info={this.state} lang={this.state.lang}/>
           
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
      onSMS:        (sms,name) => dispatch({type:  actionTypes.SETSMS , sms:sms,name:name})
    };
};
  export default connect(mapStateToProps,mapDispatchToProps)(reportForm);