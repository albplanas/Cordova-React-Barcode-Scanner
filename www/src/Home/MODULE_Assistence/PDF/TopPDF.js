import React,{Component} from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft} from '@fortawesome/free-solid-svg-icons'


class TopPDF extends Component {
    constructor(props) {
        super(props);
          this.state={
            ShowReport:[]
          }
        
          this.cancel=this.cancel.bind(this)
     }
   




     //Back
     cancel(e){

        e.preventDefault();
        this.props.onSelectDoor("start")
        
       }

     componentWillMount() {
      }
    
      //Update the list
     componentWillReceiveProps(nextProps) {
        

        }

    render() {


      return(     
                    <nav class="navbar navbar-default bg-dark">
                                <div class="container-fluid">
                                    <a class="navbar-brand text-warning" onClick={(e)=>{e.preventDefault(); this.props.cancel("start")}} >
                                          <FontAwesomeIcon icon={ faArrowAltCircleLeft} size={"2x"}/>
                                            
                                        
                                      </a>
                                       
                                    
                                </div>

                               

                    </nav>
        )
    }
  }
  
 
  export default TopPDF;