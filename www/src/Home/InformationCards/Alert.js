import React,{Component} from "react";
import Modal from 'react-bootstrap4-modal';
 
class Alert extends React.Component {
  constructor(props) {
    super(props);

   this.onClose=this.onClose.bind(this);
   this.onPass=this.onPass.bind(this);
 }
 onClose(){

  this.props.Close();
 }
 onPass(){
  this.props.Pass();

 }
 

  render() {
   
    return (
      <Modal visible={this.props.open}   onClickBackdrop={this.modalBackdropClicked} >
                 {
                   this.props.text==="listProjects"?
                                                    (
                                                        <div>
                                                    
                                                            <div class="modal-header">
                                                              <h5 class="w-100" id="exampleModalCCompleteLongTitle">Select Project !!!</h5>
                                                            </div>
                                                            <div class="modal-body">
                                                                <ul class="list-group">
                                                                {
                                                                  this.props.list.map((elem,index)=>{

                                                                            var projectName=this.props.Projects.filter(project=>elem+''===project[1]+"");
                                                                            var Name=projectName[0][0]+"/"+projectName[0][2]

                                                                            return <li  onClick={this.props.Select} 
                                                                                        id={"PictProj_"+elem}
                                                                                        style={{fontSize:"20px"}}
                                                                                        class={ index % 2===0 ? "list-group-item text-center list-group-item-primary": 
                                                                                                                "list-group-item text-center list-group-item-info"}
                                                                                    >{Name}</li>  
                                                                          })
                                                                  }    
                                                                      
                                                                </ul>
                                                                  
                                                            </div>
                                                            <div class="modal-footer">
                                                                <button className="btn btn-danger"id="cancel"  onClick={this.onClose}>Cancel</button>
                                                              </div>
                                                        </div>
                                                    )
                                                    
                                                    :
                                                    (
                                                      <div>

                                                              <div class="modal-header">
                                                                <h5 class="w-100" id="exampleModalCCompleteLongTitle">Make sure !!!</h5>
                                                              </div>
                                                              <div class="modal-body">
                                                                {
                                                                this.props.text==="full"?"Do you really want to delete this Project?":
                                                                this.props.text==="employee"?" Do you really want to delete this Employee ?":
                                                                this.props.text==="picture"? "Do you really want to delete this Picture":
                                                                                        " Do you really want to delete that?"
                                                                } 
                                                              </div>
                                                              <div class="modal-footer">
                                                                <button className="btn btn-primary"id="cancel"  onClick={this.onClose}>Cancel</button>
                                                                <button className="btn btn-danger" id="passButton" onClick={this.onPass}>Delete</button>
                                                              </div>
                                                      </div>
                                                      
                                                      )
                 } 
                
                 
      </Modal>
    );
  }
}

  export {
    Alert as Alert,

  }