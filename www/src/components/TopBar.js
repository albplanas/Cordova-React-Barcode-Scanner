import React,{Component} from "react";
import { connect } from 'react-redux';

import * as actionTypes from "../store/actions" 

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee , faUndo  ,faArrowCircleLeft , faBarcode} from '@fortawesome/free-solid-svg-icons'

class TopBar extends Component {

    constructor(props) {
        super(props);
        this.GoBack = this.GoBack.bind(this);
        
      
      }

      GoBack(){
        this.props.onSelectDoor("start");
      }
 
      componentWillMount() {

        this.setState({ 
          date:this.props.date,
        })
    
      }
    
      //Update the list
     componentWillReceiveProps(nextProps) {
    
                if(nextProps.date!==this.state.date) {
                        this.setState({ 
                        date:nextProps.date
                        })
                }           
        
        }
    render() { 
   
      return (
        <nav class="navbar  fixed-top navbar-expand-lg  navbar-dark bg-dark">
                   <div className="text-warning ml-3" onClick={this.GoBack}> <FontAwesomeIcon icon={faArrowCircleLeft} size={"2x"}/> </div>
                  
                  
                  
 
                    <div class="navbar-item m-auto text-white">
                                <h5 >Inventory Report</h5>
                    </div>
                    <div class="text-white float-right">
                               <h5 >{this.state.date}</h5>
                    </div>
                </nav>

      )}
  }
  
  const mapStateToProps = state => {
      
    return {
        door      :state.globalState.door,
        date      :state.globalState.dateSelect
    };
  };
 const mapDispatchToProps = dispatch => {
    return {
        onSelectDoor: (value) => dispatch({type: actionTypes.DOOR , value:value}),
    };
};
  export default connect(mapStateToProps,mapDispatchToProps )(TopBar);