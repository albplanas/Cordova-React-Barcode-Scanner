import React,{Component} from "react";
import { connect } from 'react-redux';


import * as actionTypes from '../../../store/actions';
import {CompareObjects} from "../../../Helper/Conversor"
import {SetLocalReport} from "../../../Helper/setLocalStorage"


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft} from '@fortawesome/free-solid-svg-icons'


class TopBar extends Component {
    constructor(props) {
        super(props);
          this.state={
            ShowReport:[]
          }
        
          this.cancel               =this.cancel.bind(this)
     }




     //Back
     cancel(e){

        e.preventDefault();
       

        this.props.onSelectDoor("start");
   
        SetLocalReport(this.state.ShowReport);
       }

     componentWillMount() {

        this.setState({ 
          ShowReport:this.props.ShowReport,
          lang:this.props.lang
        })
      }
    
      //Update the list
     componentWillReceiveProps(nextProps) {
        
        if( !CompareObjects(nextProps.ShowReport,this.state.ShowReport) || this.state.lang!== nextProps.lang ) {
            
            this.setState({   ShowReport:nextProps.ShowReport,lang:nextProps.lang   })
          } 

        }

    render() {

       
      

        

      return(    

<nav class="navbar shadow navbar-dark bg-dark justify-content-between">
        <a class="navbar-brand text-warning" onClick={this.cancel}>
            <FontAwesomeIcon icon={ faArrowAltCircleLeft} size={"2x"}/>
              
           
        </a>


        <h3 className="my-2 text-light" style={{fontFamily:"Cookie"}}>{this.state.lang==="es"?"Asistencia":"Asistence Report"}</h3>
    <p class="my-2 my-sm-0  text-light">{this.props.date+''}</p>
</nav>
        )
    }
  }
  
  const mapStateToProps = state => {
    return {
        ShowReport: state.dataState.ShowReport,
        date      : state.globalState.dateSelect,
        lang:state.globalState.lang
    };
  };
 const mapDispatchToProps = dispatch => {
    return {
      onSelectDoor: (value) => dispatch({type: actionTypes.DOOR ,value:value}),
      onSetReport:  (value) => dispatch({type:  actionTypes.UPDATELOCALREPORT , value:value}),
      onSMS:        (sms,name) => dispatch({type:  actionTypes.SETSMS , sms:sms,name:name})
    };
};
  export default connect(mapStateToProps,mapDispatchToProps)(TopBar);