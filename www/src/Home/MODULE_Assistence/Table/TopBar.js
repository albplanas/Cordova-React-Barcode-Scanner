import React,{Component} from "react";
import { connect } from 'react-redux';


import * as actionTypes from '../../../store/actions';
import {CompareObjects} from "../../../Helper/Conversor"
import {SetLocalReport} from "../../../Helper/setLocalStorage"


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowCircleLeft} from '@fortawesome/free-solid-svg-icons'


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

        <nav id="newNav"  class="navbar  fixed-top navbar-expand-lg  navbar-dark bg-dark"  >
                <div className="text-warning ml-3" onClick={this.cancel}> 
                     <FontAwesomeIcon icon={faArrowCircleLeft} size={"2x"}/> 
                </div>

                <div class="navbar-item m-auto text-white">
                            <h5 >Assistence Report</h5>
                </div>
                <div class="text-white float-right">
                            <h5 >{this.props.date}</h5>
                </div>
      </nav>
        )
    }
  }
  
  const mapStateToProps = state => {
    return {
        ShowReport: state.dataState.ShowReport,
        date      : state.globalState.dateSelect,
        Supervisor: state.globalState.supervisorSelect,
        lang:state.globalState.lang
    };
  };
 const mapDispatchToProps = dispatch => {
    return {
      onSelectDoor: (value) => dispatch({type: actionTypes.DOOR ,value:value})
    };
};
  export default connect(mapStateToProps,mapDispatchToProps)(TopBar);