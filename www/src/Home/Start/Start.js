import React,{Component} from "react";
import { connect } from 'react-redux';
  
import * as actionTypes from "../../store/actions" 
import send from "../Send/Send" 
  

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane,faClipboardList, faBarcode} from '@fortawesome/free-solid-svg-icons'


import CardReport from "../InformationCards/Status"

import SendAlert from"../InformationCards/SendAlert"

  class Start extends Component {
  
  
    constructor(props) {
      super(props);
      this.state={
        lang:"es",
        card:false,
        smsOpen:false,
        sms:"Something"
      }
      this.Send         = this.Send.bind(this);
      this.closeCard    =this.closeCard.bind(this);
      this.Lang         =this.Lang.bind(this);
      this.CkeckStatus  =this.CkeckStatus.bind(this);
      this.Select=this.Select.bind(this);
      this.closeAlert=this.closeAlert.bind(this)
    }


    closeAlert(){
      this.setState({
          sms:"",
          smsOpen:false
      })
    }

    Select(){
         
      var value={
         supervisor:        document.getElementById("inlineFormCustomSelectSuperv").value,
         date      :       document.getElementById("date").value
      }


    
         this.props.onSetDay(value)
        
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
   Lang(){
    var value= document.getElementById("language").value;
   
    this.props.onSelectLanguage(value);
 }




 //Send
   Send(){

     var sms=send();
          this.setState({
            sms:sms,
            smsOpen:true
        })
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

            if(nextProps.sms!==this.state.sms || nextProps.name!==this.state.name || nextProps.lang!==this.state.lang) {
                    this.setState({ 
                    sms:nextProps.sms,
                    name:nextProps.name,
                    lang:nextProps.lang
                    })
            }           
    
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

       var style ={    backgroundSize: "contain",
                      backgroundImage:this.state.lang==="es"?"url('https://countryflags.io/ES/shiny/64.png')":
                                                             "url('https://countryflags.io/GB/shiny/64.png')"
                 }
        return (

          <div id="Log" >
                 
          <section>
      
              <div class="layer"></div>
              <button  class="btn btn-dark shadow btn-block text-warning m-3" onClick={this.CkeckStatus} id="statusBtn"  > <h5 className="pt-2">{this.state.lang==="es"?"Revisar el estado de los reportes":"Check Status Report "} </h5></button> 
              
              <div class="login-form">
             
      
                      <div class="form-group  ">
                          <label class=" text-dark text-center" for="inlineFormCustomSelectSuperv"><center><p class="text-dark" style={{fontSize:"1.8rem"}}>{this.state.lang==="es"?"Seleccione el supervisor y la fecha ":"Select Supervisor and Date"}</p> </center></label>
                          <select class="custom-select custom-select-lg  mb-3" id="inlineFormCustomSelectSuperv">
                              {arraySupervisor}
                          </select>
                          
                          <select class="custom-select custom-select-lg  mb-3"  id="date" value={this.state.date} >
                              {optionDate}
                      </select>
                      
                     
      
                         </div>
                     
                     <div className="container m-auto d-flex justify-content-center" style ={{maxWidth: "300px"}} >
                              
                               <select style={style} class="custom-select mt-2 mb-3 "  id="language"  onChange={this.Lang}>
                                        <option className="text-dark" value="es">Español</option>
                                        <option className="text-dark" value="en">English</option>
                                        
                                </select>
                     </div>
              
                   
                         <div className="container mt-5 ">
                             
                             <div className="row d-flex justify-content-center">
                                       <div className="col-md-7  mb-3 d-flex justify-content-center">
                                               <button  class="btn btn-lg btn-primary mainBtns" onClick={()=>{this.props.onSelectDoor("assistence");this.Select();}}>
                                               <FontAwesomeIcon icon={faClipboardList} size={"lg"}/> <span className="ml-3">{this.state.lang==="es"?"ASISTENCIA":" ASSISTENCE "}</span>
                                             </button>
                                       </div>
                                       <div className="col-md-7 mb-3 d-flex justify-content-center">
                                               <button className="btn btn-lg btn-primary mainBtns"  onClick={()=>{this.props.onSelectDoor("inventary");this.Select();}}>
                                                           <FontAwesomeIcon icon={ faBarcode} size={"lg"}/> <span className="ml-3">{this.state.lang==="es"?"INVENTARIO":" INVENTARY "}</span>      
                                                   </button>
                                       </div>
                                       <div className="col-md-7 mb-3 d-flex justify-content-center">
                                                 <button className="btn btn-lg btn-info mainBtns"  onClick={this.Send}>
                                                 <FontAwesomeIcon icon={ faPaperPlane} size={"lg"}/> <span className="ml-3">{this.state.lang==="es"?"ENVIAR":" SEND"}</span>  
                                                 </button>
                                       </div>
                
                             </div>
         
         
                        </div>
              </div>
          </section>
          
         
                        { this.state.card?<CardReport close={this.closeCard} date={arrayDate} lang={this.state.lang}/>:<div/>}
                        {this.state.smsOpen    ?     <SendAlert open={this.state.smsOpen} lang={this.state.lang} close={this.closeAlert}sms={this.state.sms}/>:<div/>}
      </div>

            
        )}
    }
    
    const mapStateToProps = state => {
        
      return {
          door      :state.globalState.door,
          lang      :state.globalState.lang,
          listSupervisor:state.dataBase.Supervisor
      };
    };
   const mapDispatchToProps = dispatch => {
      return {
          onSelectDoor: (value) => dispatch({type: actionTypes.DOOR , value:value}),
          onSelectLanguage: (value) => dispatch({type: actionTypes.LANGUAGE , value:value}),
          onSetDay:     (value) => dispatch({type: actionTypes.SETDAY , value:value}),
         
      };
  };
    export default connect(mapStateToProps,mapDispatchToProps )(Start);




