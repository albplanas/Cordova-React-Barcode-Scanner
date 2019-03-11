import React,{Component} from "react";
import SignatureCanvas from 'react-signature-canvas'





class Sign_Print extends Component {
    constructor(props) {
        super(props);
        this.state={
            
            data:[],
            name:"",
            pass:true,
            pngImg:""
        }
     
        this.PNG=this.PNG.bind(this)
       
    }
PNG(){
    return document.querySelector("canvas").toDataURL("image/png");
   
}
componentWillMount(){
    
   this.setState({
       name:this.props.name
   })
}

componentWillReceiveProps(nextProps){
    if(nextProps.name!==this.state.name){
        this.setState({
            name:nextProps.name
        })
    }
    
}

     render(){
    
       
       var name= this.props.name;

        return     (
            
            <div class="Signpad" >
              
                                  
                                    <h3 className=" mt-2 ml-3 text-warning">{this.props.lang==="es"?"Por favor, firme a debajo":"Please, Sign below."} </h3>
                                    <p className=" mt-2 ml-5 text-light">{this.props.lang==="es"?"Firmando este Reporte Diario yo estoy de acuerdo con que las horas reportadas son correctas y no sufri o fui testigo de de algun accidente."
                                                                                                 :" By signing this Daily Report I am in Agreement that this hours reported are correct and that i did not suffer any injury/Accident or did not witness anny injury/Accident from any other employee."}</p>
                                    <SignatureCanvas penColor='green' canvasProps={{width: 750, height: 300, className: 'sigCanvas' ,id:name }} ref={(ref) => { this.sigCanvas = ref }} />
                                    <div class="btn-group btn-block  " style={{marginLeft:"25%",height:"40px",width:"200px"}} role="group" aria-label="Basic example">
                                        <button id="clear" style={{height:"40px"}} type="button" class="btn btn-light text-danger" onClick={(e)=>{e.preventDefault()  ;this.sigCanvas.clear()}}>Clear</button>
                                        <button id="done"  style={{height:"40px"}} type="button" class="btn btn-dark  text-success" onClick={(e)=>{e.preventDefault()  ;
                                                                                                                                      
                                                                                                                                    this.props.done(this.sigCanvas.toData(),this.state.name,this.PNG())}}>
                                                                                                                                    Done</button>
                                    </div>
                                
                                   

            </div>
            
        )
     }
 
}

export default Sign_Print;