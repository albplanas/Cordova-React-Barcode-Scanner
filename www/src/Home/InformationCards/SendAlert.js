import React,{Component} from "react";
import { Alert,Button,Container } from 'react-bootstrap';
import { connect } from 'react-redux';

import * as actionTypes from "../../store/actions" 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner} from '@fortawesome/free-solid-svg-icons'

function Text(sms,lang){
     
      switch(sms){

        case "FullProjects":
              return lang==="es"?"Todos los Reportes disponibles han sido ya escojidos, busque es reporte que desea entre los proyectos abiertos y modifique este":"All of projects have already been opened, please find it and make the changes there";
              break;
        case "Done": 
              return lang==="es"?"Su reporte fue enviado exitosamente":"Your Report was sent successfully!!!";
              break;
        case "Validation Sing":
              return lang==="es"?"Usted debe llenar todos los campos vacios antes de firmar,recuerde que una vez firmada no se puede realizar cambios en el reporte del empleado":"There are one or more fields empty, please make sure of fill out all of them before you sign";
              break;       
        case "Complete": 
              return lang==="es"?"Antes de agregar un nuevo empleado asegurese que todos los anteriores fueron completados":"Please, you have to fill out all of empty fields before you open a new fields";
              break;
       
        case "Empty": 
              return lang==="es"?"No hay reportes listos para enviar, revise el estatus para mas detalles":"Your Report is empty, check the status report for more details!!!" ;
              break;
        case "Offline": 
              return lang==="es"?"No se pudo enviar el reporte porque no hay acceso a internet ":"You don't have internet conection!!! SAVE AND SEND LATER" ;
              break;
        case "TooMuchHours": 
              return lang==="es"?" excede el limite permisible de horas reportadas en un dia, por favor complete este reporte en el departamento de Recursos Humanos": " has too much hours reported, the limit is 12hr" ;
              break;
        case "SignLess":
                return lang==="es"? "Hay un empleado que no a firmado aun":"There are a miss signature" 
                break;
        case "Error":          
                  return lang==="es"?"Hubo un error, revisa su conexion a Internet":"Something was wrong ,check your network conection"
                  break;    
        default:lang==="es"?"Hubo un error":"Something was wrong"    
      }

    }

    function Color(sms){

      switch(sms){

        case "FullProjects":
              return "warning"
              break;
        case "Done": 
              return "success";
              break;
        case "Complete":    
              return "dark";
              break;
        case "Validation Sing":
              return "warning"
       
        case "Empty": 
              return "secondary" ;
              break;
        case "Offline": 
              return "danger" ;
              break;
        case "TooMuchHours": 
              return "info" ;
              break;
      case "SignLess":
              return "info" 
              break; 
      case "Error":
              return "warning" 
              break;    
        default:"warning"    
      }

    }


class SendAlert extends Component {
      constructor(props) {
        super(props);
    
        this.state = { 
                        show: true,
                        variant:"info",
                        lang:"es"
                  };
                  this.onClose=this.onClose.bind(this)
      }
    
      onClose(){
            this.props.OnSETSMS("")
            this.setState({
                  show:false,
                  sms:"",
                  variant:Color(""),
                  lang:this.props.lang
            })
      }

      componentWillMount(){
            this.setState({
                  show:this.props.sms.length>0?true:false,
                  sms:this.props.sms,
                  variant:Color(this.props.sms),
                  lang:this.props.lang
            })
      }
      componentWillReceiveProps(nextProps){
            if(nextProps.sms!==this.state.sms){
                  this.setState({
                        show:nextProps.sms.length>0?true:false,
                        sms:nextProps.sms,
                        variant:Color(nextProps.sms),
                        lang: nextProps.lang
                  })
            }
           
      }
      render() {
        


        return this.state.sms==="Spinner"?
                        <Spinner/>: 
                        (
     
                              <Alert show={this.state.show} style={{marginLeft:"5vw" ,width:"90vw"}} variant={this.state.variant}>
                              <Alert.Heading><strong>{this.state.sms+" !!!"}</strong></Alert.Heading>
                              <hr />
                              <p>
                                                {Text(this.state.sms,this.state.lang)}
                              </p>
                              <hr />
                              <div className="d-flex justify-content-end">
                                          <Button onClick={this.onClose} variant="outline-danger">
                                          Close
                                          </Button>
                                    </div>
                              </Alert>
    
        );
      }
    }






    const mapStateToProps = state => {
      
      return {
         sms:        state.localState.sms,
         lang:       state.globalState.lang,

      };
    };
   const mapDispatchToProps = dispatch => {
      return {
          
                  OnSETSMS:         (value) => dispatch({type: actionTypes.SETSMS, sms:value})
      };
  };
    export default connect(mapStateToProps,mapDispatchToProps )(SendAlert);
  




    
    
    function Spinner (){
    
     
        return (
          <div style={{position:"fixed",zIndex:"1300",width:"100vw",height:"100vh",top:"0",left:"0",background:"#868e96" ,opacity:"0.9" }}>
                     <div style={{marginLeft:"45vw",marginTop:"45vh"}}><FontAwesomeIcon icon={ faSpinner} size={"5x"} spin/></div>
    
            </div>
        );
      
    }





