import React,{Component} from "react";
import Modal from 'react-bootstrap4-modal';
 
class AlertDeleteFull extends React.Component {
  constructor(props) {
    super(props);
   this.state={
    visible:true
   }

 }
 
 componentDidMount(){
          document.getElementById("cancel").addEventListener('click', ()=>{
                  this.setState({
                    visible:false
                  })
          });
           document.getElementById("passButton").addEventListener('click', ()=>{
             this.props.Pass();
            this.setState({
              visible:false
            })
          });
          document.getElementById("CancelMOdalParent").addEventListener('click', ()=>{
            this.setState({
              visible:true
            })
    });
 }
  render() {
    console.log("Final")
    return (
      <Modal visible={this.state.visible}   onClickBackdrop={this.modalBackdropClicked} >
                  <div class="modal-header">
                    <h5 class="w-100" id="exampleModalCCompleteLongTitle">Make sure !!!</h5>
                  </div>
                  <div class="modal-body">
                    Do you really want to delete this project ?
                  </div>
                  <div class="modal-footer">
                    <button className="btn btn-primary"id="cancel">Cancel</button>
                    <button className="btn btn-danger" id="passButton" >Delete</button>
                  </div>

      </Modal>
    );
  }
}


class Alert extends React.Component {
  constructor(props) {
    super(props);
   this.state={
    visible:true
   }
      this.onClose=this.onClose.bind(this);
      this.onPass=this.onPass.bind(this);
 }


 componentWillMount(){

    this.setState({
      visible:this.props.open
    })

 }

 componentWillReceiveProps(nextProps){
   if(this.state.visible!==nextProps.open){
          this.setState({
            visible:nextProps.open
          })
   }
 }

 onClose(){
  console.log("Click")
  this.setState({
    visible:false
  })
 }
 onPass(){
  this.props.Pass();
  this.setState({
    visible:false
  })
 }
 

  render() {
  
    return (
      <Modal visible={this.state.visible}   onClickBackdrop={this.modalBackdropClicked} >
                  <div class="modal-header">
                    <h5 class="w-100" id="exampleModalCCompleteLongTitle">Make sure !!!</h5>
                  </div>
                  <div class="modal-body">
                    Do you really want to delete this Employee ?
                  </div>
                  <div class="modal-footer">
                    <button className="btn btn-primary"id="cancelAlert"onClick={this.onClose}>Cancel</button>
                    <button className="btn btn-danger" id="passButtonAlert"onClick={this.onPass} >Delete</button>
                  </div>

      </Modal>
    );
  }
}



  

  export {
    Alert as Alert,
    AlertDeleteFull as AlertDeleteFull
  }