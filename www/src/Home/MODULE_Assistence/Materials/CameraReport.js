import React,{Component} from "react";

import {CompareObjects} from "../../../Helper/Conversor"
import {SetLocalReport} from "../../../Helper/setLocalStorage"

import {Alert} from   "../../InformationCards/Alert";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera} from '@fortawesome/free-solid-svg-icons'

import ControlledCarousel from "./Carousel";



class CameraReport extends Component {
    constructor(props) {
        super(props);
          this.state={
          
            PhotosList:[],
            openAlert:false,
            deleteId:"",
            openTakePicAlert:false
          }
          this.TakePic=this.TakePic.bind(this);
          this.delete_Pic=this.delete_Pic.bind(this);
          this.PassDelete=this.PassDelete.bind(this);
          this.closeAlert=this.closeAlert.bind(this);
          this.OpenCamera=this.OpenCamera.bind(this);
          this.SelectProjectPicture=this.SelectProjectPicture.bind(this)
     }

     closeAlert(){
        this.setState({openAlert:false,deleteId:"",openTakePicAlert:false})
    }
     delete_Pic(e){

        var id =e.target.id.split("_")[1];

        console.log("ID",id)


        this.setState({
            openAlert:true,
            deleteId:id
        })

       
        
     }

     PassDelete(){
        var id=this.state.deleteId;

        console.log("IDSS",id)
        var newOne= this.state.PhotosList.filter((elem,index)=> index+""!==id+"")

        this.setState({
            PhotosList:newOne,
            openAlert:false,
            deleteId:""
        })

        SavePict(newOne,this.props.date,this.props.supervisor)
     }

     OpenCamera(){

        this.props.projectsList.length>1?
        this.setState({
            openTakePicAlert:true
        }):

        this.TakePic(this.props.projectsList[0]);

     }
     SelectProjectPicture(e){

        var id=e.target.id.split("_")[1];

        this.setState({
            openTakePicAlert:false
        })

        this.TakePic(id);

     }
     
     TakePic(idproject){

        var options = {
            // Some common settings are 20, 50, and 100
            quality: 20,
            destinationType: Camera.DestinationType.FILE_URI,
            // In this app, dynamically set the picture source, Camera or photo gallery
            encodingType: Camera.EncodingType.JPEG,
            mediaType: Camera.MediaType.PICTURE,
            targetHeight:300
        }
        
    
        navigator.camera.getPicture( (imageUri) =>{
         
                var Newlist=this.state.PhotosList;
                Newlist.push(imageUri);
                this.setState({
                    PhotosList:Newlist
                })
                SavePict(Newlist,this.props.date,this.props.supervisor,idproject)

        }, function cameraError(error) {
            console.debug("Unable to obtain picture: " + error, "app");
    
        }, options);
  
           
     }

componentWillMount(){

    var PictureList=JSON.parse(window.localStorage.getItem("PictureRep"));
    this.setState({

     // PhotosList:PictureList===null?[]: PictureList.filter(elem=> elem.date===this.props.date && elem.supervisor===this.props.supervisor).map(elem=>elem.picture)
     PhotosList:["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrUo9CvNu5dIdtnlU1cypysABGSA7IbS3d3LTsSdr6wC6spmFbVA","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrUo9CvNu5dIdtnlU1cypysABGSA7IbS3d3LTsSdr6wC6spmFbVA"]
    
    })
}




    render() {
        
        return (
          
            <div>
           
                    
                    <div class="container bg-secondary rounded shadow">   
                            <ControlledCarousel list={this.state.PhotosList} delete_Pic={this.delete_Pic}/>

                    </div>

                    <div style={{width:"100%",marginTop:"25px",marginBottom:"25px"}}>
                        <button className="btn btn-warning float-right m-3" onClick={this.OpenCamera}>
                                <FontAwesomeIcon  icon={ faCamera} size={"lg"}/>
                                <span className="ml-3">Add Picture</span>
                        </button>
                    </div>

                    {this.state.openAlert? <Alert 
                                                                                                                    Pass={this.PassDelete} 
                                                                                                                    open={this.state.openAlert}   
                                                                                                                    Close={this.closeAlert} 
                                                                                                                    text="picture"  />:<div/>}
                    {this.state.openTakePicAlert? <Alert 

                                                                                                                    list={this.props.projectsList}
                                                                                                                    Select={this.SelectProjectPicture} 
                                                                                                                    open={this.state.openTakePicAlert} 
                                                                                                                    text="listProjects"  
                                                                                                                    Projects={this.props.Projects}
                                                                                                                    Close={this.closeAlert} />:<div/>}
          </div>           
           
        )


            
    }
}


      export default CameraReport;

 
function SavePict(list,date,supervisor,idproject){

        var ObjectPict=list.map(elem=>{
            return {
                date:date,
                picture:elem,
                supervisor:supervisor,
                idproject:idproject
            }
        })
       console.log(JSON.parse(window.localStorage.getItem("PictureRep")))
     var OldList =   window.localStorage.getItem("PictureRep")===null?[]:JSON.parse(window.localStorage.getItem("PictureRep"));
     
     var recentList=OldList.filter(elem=> elem.date!==date)
       
        
     window.localStorage.setItem("PictureRep",JSON.stringify(recentList.concat(ObjectPict)) );   
}

