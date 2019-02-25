import React,{Component} from "react";




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
        this.props.onSelectDoor("home")
        
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
                                    <div class="navbar-header">
                                        <a class="navbar-brand" href="#" onClick={(e)=>{e.preventDefault(); this.props.cancel("home")}}>
                                                <i class="fas fa-arrow-left text-danger fa-lg" ></i>
                                        </a>
                                    </div>
                                </div>

                               

                    </nav>
        )
    }
  }
  
 
  export default TopPDF;