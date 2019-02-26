import React,{Component} from "react";
import { Alert,Button,Container } from 'react-bootstrap';


function Text(name,sms,lang){
     
      switch(sms){

        case "FullProjects":
              return lang==="es"?"Todos los Reportes disponibles han sido ya escojidos, busque es reporte que desea entre los proyectos abiertos y modifique este":"All of projects have already been opened, please find it and make the changes there";
              break;
        case "done": 
              return lang==="es"?"Su reporte fue enviado exitosamente":"Your Report was sent successfully!!!";
              break;
        case "Validation Sing":
              return lang==="es"?"Usted debe llenar todos los campos vacios antes de firmar,recuerde que una vez firmada no se puede realizar cambios en el reporte del empleado":"There are one or more fields empty, please make sure of fill out all of them before you sign";
              break;       
        case "Complete": 
              return lang==="es"?"Antes de agregar un nuevo empleado asegurese que todos los anteriores fueron completados":"Please, you have to fill out all of empty fields before you open a new fields";
              break;
       
        case "Empty": 
              return lang==="es"?"Nada para enviar, revise el estatus para mas detalles":"Your Report is empty, check the status report for more details!!!" ;
              break;
        case "Offline": 
              return lang==="es"?"No se pudo enviar el reporte porque no hay acceso a internet ":"You don't have internet conection!!! SAVE AND SEND LATER" ;
              break;
        case "TooMuchHours": 
              return lang==="es"?name + " excede el limite permisible de horas reportadas en un dia, por favor complete este reporte en el departamento de Recursos Humanos": name +" has too much hours reported, the limit is 12hr" ;
              break;
        case "SignLess":
                return lang==="es"? "Hay un empleado que no a firmado aun":"There are a miss signature" 
                break;   
        default:lang==="es"?"Hubo un error":"Something was wrong"    
      }

    }

    function Color(sms){

      switch(sms){

        case "FullProjects":
              return "warning"
              break;
        case "done": 
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
      }
    
      componentWillMount(){
            console.log("ALERTTTTTTSSSSSSSS",this.props)
            this.setState({
                  show:this.props.open,
                  sms:this.props.sms,
                  variant:Color(this.props.sms),
                  lang:this.props.lang
            })
      }
      componentWillReceiveProps(nextProps){
            if(nextProps.open===true)
            this.setState({
                  show:nextProps.open,
                  sms:nextProps.sms,
                  variant:Color(nextProps.sms),
                  lang: nextProps.lang
            })
      }
      render() {
        const handleHide = () =>{
            this.props.close();
            this.setState({ show: false });
        } 
        return (
     
                              <Alert show={this.state.show} style={{marginLeft:"5vw" ,width:"90vw"}} variant={this.state.variant}>
                              <Alert.Heading><strong>{this.state.sms+" !!!"}</strong></Alert.Heading>
                              <hr />
                              <p>
                                                {Text(this.state.lang,this.state.sms)}
                              </p>
                              <hr />
                              <div className="d-flex justify-content-end">
                                          <Button onClick={handleHide} variant="outline-danger">
                                          Close
                                          </Button>
                                    </div>
                              </Alert>
    
        );
      }
    }
   /* 
  function SendAlert(props){

      console.log("SendAlert")
    var sms=props.info.sms===undefined?"":props.info.sms;
    var name =props.info.name===undefined?"":props.info.name


    var style = {
                    display:sms.length>0?"block":"none"
                };





    return (
          <div className="container">
                              <Alert dismissible variant="dark">
                                                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                                                <p>
                                                      Change this and that and try again. Duis mollis, est non commodo luctus,
                                                      nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras mattis
                                                      consectetur purus sit amet fermentum.
                                                </p>
                              </Alert>
               </div>               
  )
/* return ( 
              <div class={"alert fade show "+Color(name,sms)} role="alert" style={style}>
              <p style={{marginRight:"100px"}}><strong >{Text(name,sms,props.lang)}</strong></p>
                <button type="button" 
                        class="close" 
                        aria-label="Close" 
                        onClick={()=>{props.clear()}} 
                        style={{width:"50px",position:"absolute",top: "10px",right:"50px"}}>
                  <span aria-hidden="true"style={{fontSize:"40px"}}>&times;</span>
                </button>
              </div>
    )

  }

*/
  export default SendAlert;










