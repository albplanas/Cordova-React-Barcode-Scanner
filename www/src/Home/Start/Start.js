import React,{Component} from "react";
import { connect } from 'react-redux';
  
import * as actionTypes from "../../store/actions" 
import send from "../Send/Send" 
  

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane,faClipboardList, faBarcode} from '@fortawesome/free-solid-svg-icons'


import CardReport from "../InformationCards/Status"



  class Start extends Component {
  
  
    constructor(props) {
      super(props);
      this.state={
        lang:"es",
        card:false
      }
      this.Send         = this.Send.bind(this);
      this.closeCard=this.closeCard.bind(this);
      this.CkeckStatus=this.CkeckStatus.bind(this);
    }


    CkeckStatus(){
      this.setState({ 
          card:true
        })
   }
    closeCard(){
      
      this.setState({ 
          card:false
        })
   }

   Send(){
     var sms=send();
   }
  
      render() { 

        //Supervisors
        var arraySupervisor= this.props.listSupervisor.map(elem=>{ return ( <option className="text-dark" value={elem}>{elem}</option> )})

        //Date Select
        var time = new Date().getTime();
        

        var arrayDate=[];

        for(var i=0;i<8;i++){
            var Time = time-i*86400000;
            var date = new Date(Time);
            date=date.toDateString()
            arrayDate=arrayDate.concat(date )
        }
       
       var  optionDate=arrayDate.map(elem=>{ return ( <option className="text-dark" value={elem} >{elem}</option> )})

        return (

          <div id="Log" >
                 
          <section>
      
              <div class="layer"></div>
              <button  class="btn btn-dark shadow btn-block text-warning m-3" onClick={this.CkeckStatus} id="statusBtn"  > <h5 className="pt-2">{this.state.lang==="es"?"Revisar el estado de los reportes":"CheckStatus Report "} </h5></button> 
              
              <div class="login-form">
             
      
                      <div class="form-group  ">
                          <label class=" text-dark text-center" for="inlineFormCustomSelectSuperv"><center><p class="text-primary" style={{fontSize:"1.8rem"}}>{this.state.lang==="es"?"Seleccione el supervisor y la fecha ":"Select Supervisor and Date"}</p> </center></label>
                          <select class="custom-select custom-select-lg  mb-3" id="inlineFormCustomSelectSuperv">
                              {arraySupervisor}
                          </select>
                          
                          <select class="custom-select custom-select-lg  mb-3"  id="date" value={this.state.date} >
                              {optionDate}
                      </select>
      
                     
      
                         </div>
                     
                     
              
                   
                         <div className="container mt-5 ">
                             
                             <div className="row d-flex justify-content-center">
                                       <div className="col-md-7  mb-3 d-flex justify-content-center">
                                               <button  class="btn btn-lg btn-primary mainBtns">
                                               <FontAwesomeIcon icon={faClipboardList} size={"lg"}/> <span className="ml-3">ASSISTENCE</span>
                                             </button>
                                       </div>
                                       <div className="col-md-7 mb-3 d-flex justify-content-center">
                                               <button className="btn btn-lg btn-primary mainBtns"  onClick={()=>{this.props.onSelectDoor("productsReport");}}>
                                                           <FontAwesomeIcon icon={ faBarcode} size={"lg"}/> <span className="ml-3">INVENTARY</span>      
                                                   </button>
                                       </div>
                                       <div className="col-md-7 mb-3 d-flex justify-content-center">
                                                 <button className="btn btn-lg btn-info mainBtns"  onClick={this.Send}>
                                                 <FontAwesomeIcon icon={ faPaperPlane} size={"lg"}/> <span className="ml-3">SEND</span>  
                                                 </button>
                                       </div>
                
                             </div>
         
         
                        </div>
              </div>
          </section>
          
         
                        { this.state.card?<CardReport close={this.closeCard} date={arrayDate} lang={this.state.lang}/>:<div/>}
          
      </div>

            
        )}
    }
    
    const mapStateToProps = state => {
        
      return {
          door      :state.globalState.door,
          listSupervisor:state.dataBase.listSupervisor
      };
    };
   const mapDispatchToProps = dispatch => {
      return {
          onSelectDoor: (value) => dispatch({type: actionTypes.DOOR , value:value}),
      };
  };
    export default connect(mapStateToProps,mapDispatchToProps )(Start);




