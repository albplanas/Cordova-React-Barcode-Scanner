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
        this.change=this.change.bind(this)
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

change(){
    var dataPNG=this.PNG()

 this.props.signData(dataPNG)
}


     render(){
    
       
       var name= this.props.name;

        return     (
            
            <div class="SignpadInventory" id ={name}>
              
                                  
                            
                        <div className="row">
                            
                                        <SignatureCanvas  penColor='black' canvasProps={{width: 500, height: 200, className: 'signCanvas' }} ref={(ref) => { this.sigCanvas = ref }} />
                         </div>
                         <div className="row">
                                        <button className="btn btn-warning shadow mb-3" onClick={()=>{this.sigCanvas.clear()}}>
                                                    Eraser
                                        </button>
                         </div>
                         <div className="row">           
                                        <button className="btn btn-success  shadow mb-3" data-toggle="tooltip" data-placement="top" title="Clear SignPad" onClick={()=>{this.sigCanvas.clear()}}>
                                                   Done
                                        </button>
                       
                        </div>
                      

            </div>
            
        )
     }
 
}

export default Sign_Print;

