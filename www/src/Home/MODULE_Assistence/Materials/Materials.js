import React,{Component} from "react";
import { connect } from 'react-redux';


import * as actionTypes from '../../../store/actions';
import {CompareObjects} from "./../../../Helper/Conversor"
import {SetLocalReport} from "./../../../Helper/setLocalStorage"

class Materials extends Component {
    constructor(props) {
        super(props);
          this.state={
          
         

          }
        
          this.onChange=this.onChange.bind(this);

     }
   
     onChange(e){

        e.preventDefault();
        var id=e.target.id;
        var newShowReport = this.state.ShowReport;
        newShowReport[0]=Object.assign({},this.state.ShowReport[0]);
        newShowReport[0][id]=document.getElementById(id).value;
      
        this.setState({ 
                ShowReport:newShowReport
              })

              this.props.onUpdateLocal(newShowReport);
              SetLocalReport(newShowReport)

     }

     componentWillMount(){
       
        this.setState({ 
                ShowReport:this.props.ShowReport,
                lang:this.props.lang
              })
     }

     componentWillReceiveProps(nextProps){
           
        if( !CompareObjects(nextProps.ShowReport,this.state.ShowReport) || this.state.lang!== nextProps.lang ) {
                
                this.setState({   ShowReport:nextProps.ShowReport ,lang:nextProps.lang })
              } 
    
     }

    render() {
        console.log("Materials")

        return (
            <div class="container mt-5 mb-5">

                <div class="form-group mb-3">
                    <label for="materials">{this.state.lang==="es"?"Materiales Utilizados":"Materials"}</label>
                    <textarea class="form-control" id="materials" rows="5" value={this.state.ShowReport[0].materials} onChange={this.onChange} placeholder="Place the materials used today ... "></textarea>
                </div>
                <div class="form-group mb-3">
                    <label for="equipments">{this.state.lang==="es"?"Equipamiento Utilizados":"Equipments"} </label>
                    <textarea class="form-control" id="equipments" rows="5" value={this.state.ShowReport[0].equipments}  onChange={this.onChange} placeholder="Declare the equipment used today ... "></textarea>
                </div>
                <div class="form-group mb-3">
                    <label for="production">{this.state.lang==="es"?"Produccion":"Production"}</label>
                    <textarea class="form-control" id="production" rows="5" value={this.state.ShowReport[0].production} onChange={this.onChange} placeholder="Describe our production today ... "></textarea>
                </div>
                <div class="form-group mb-3">
                    <label for="comments">{this.state.lang==="es"?"Comentarios y utiles dañados":"Comments and Utility Damage"}</label>
                    <textarea class="form-control" id="comments" rows="5" value={this.state.ShowReport[0].comments} onChange={this.onChange} placeholder="Comment something else there ... "></textarea>
                </div>
            </div>
        )


            
    }
}

  
const mapStateToProps = state => {
        return {
            ShowReport: state.dataState.ShowReport,
            lang:state.globalState.lang
        };
      };
     const mapDispatchToProps = dispatch => {
        return {
          onUpdateLocal: (value) => dispatch({type: actionTypes.UPDATELOCALREPORT, value:value}),

        };
    };
      export default connect(mapStateToProps,mapDispatchToProps)(Materials);
  