import React,{Component} from "react";

import ScanPDF from './PDF/ScanPDF';
import ScanForm from './ScanForm';


import { connect } from 'react-redux';
import * as actionTypes from "../../store/actions" 





class ScanState extends Component {
      
  constructor(props) {
    super(props);
    

  }
      
  render(){
    
       
          var daySelect=this.props.date.split(" ")[2]

          var ShowScan=JSON.parse(window.localStorage.getItem("OldScannerList")).filter(elem=>elem[0].date.split("-")[2]===daySelect)[0]
         
          this.props.onUpdateLocalSCAN(ShowScan,this.props.date)

          var pass=ShowScan===undefined?false:ShowScan.length===0?false:ShowScan[0].send===false?false:true
        
          
          return pass? <ScanPDF/>: <ScanForm/>
        }
            

    }
    const mapStateToProps = state => {
      
      return {
          date      :state.globalState.dateSelect
      };
    };
   const mapDispatchToProps = dispatch => {
      return {
          onUpdateLocalSCAN: (value,date) => dispatch({type: actionTypes.UPDATELOCALSCAN , value:value,date:date}),
      };
  };
    export default connect(mapStateToProps,mapDispatchToProps )(ScanState);