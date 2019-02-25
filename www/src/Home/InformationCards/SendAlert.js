import React,{Component} from "react";



  function SendAlert(props){

      console.log("SendAlert")
    var sms=props.info.sms===undefined?"":props.info.sms;
    var name =props.info.name===undefined?"":props.info.name


    var style = {
                    display:sms.length>0?"block":"none"
                };



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

    function Color(name,sms){

      switch(sms){

        case "FullProjects":
              return "alert-warning"
              break;
        case "done": 
              return "alert-success";
              break;
        case "Complete":    
              return "alert-dark";
              break;
        case "Validation Sing":
              return "alert-warning"
       
        case "Empty": 
              return "alert-secondary" ;
              break;
        case "Offline": 
              return "alert-danger" ;
              break;
        case "TooMuchHours": 
              return "alert-info" ;
              break;
      case "SignLess":
              return "alert-info" 
              break;    
        default:"alert-warning"    
      }

    }
    return ( 
              <div class={"alert fade show "+Color(name,sms)} role="alert" style={style}>
              <p style={{marginRight:"100px"}}><strong >{Text(name,sms,props.lang)}</strong></p>
                <button type="button" class="close" aria-label="Close" onClick={()=>{props.clear()}} style={{width:"50px",position:"absolute",top: "10px",right:"50px"}}>
                  <span aria-hidden="true"style={{fontSize:"40px"}}>&times;</span>
                </button>
              </div>
    )

  }


  export default SendAlert;