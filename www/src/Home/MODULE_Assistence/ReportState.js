import React,{Component} from "react";

import ReportPDF from './PDF/pdfReport';
import ReportForm from './reportForm';


import { connect } from 'react-redux';
import * as actionTypes from "../../store/actions" 





class ReportState extends Component {
      
  constructor(props) {
    super(props);
    

  }
      
  render(){
    
       
          var daySelect=this.props.date.split(" ")[2]

          var ShowReport=JSON.parse(window.localStorage.getItem("OldReportsList")).filter(elem=>elem[0].date.split("-")[2]===daySelect)[0]
         
          this.props.onUpdateLocalReport(ShowReport,this.props.date,this.props.supervisor)

          var pass=ShowReport===undefined?false:ShowReport.length===0?false:ShowReport[0].send===false?false:true
          return pass? <ReportPDF/>: <ReportForm/>
        }
            

    }
    const mapStateToProps = state => {
      
      return {
          date      :state.globalState.dateSelect,
          supervisor:state.globalState.supervisorSelect
      };
    };
   const mapDispatchToProps = dispatch => {
      return {
          onUpdateLocalReport : (value,date,supervisor) => dispatch({type: actionTypes.UPDATELOCALREPORT, value:value, date:date ,supervisor:supervisor}),
    
      };
  };
    export default connect(mapStateToProps,mapDispatchToProps )(ReportState);
  