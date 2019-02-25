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



function Alert(props){
    return (
          <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="w-100" id="exampleModalLongTitle">Make sure</h5>
                    </div>
                    <div class="modal-body">
                      Do you really want to delete this employee ?
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-primary" data-dismiss="modal">Back</button>
                      <button type="button" class="btn btn-danger" data-dismiss="modal" onClick={props.Pass}>Delete</button>
                    </div>
                  </div>
                </div>
          </div>
    )
}


  

  export {
    Alert as Alert,
    AlertDeleteFull as AlertDeleteFull
  }