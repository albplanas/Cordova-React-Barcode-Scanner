
import Carousel from 'react-bootstrap/Carousel'
import React,{Component} from "react";

class ControlledCarousel extends Component {
    constructor(props, context) {
      super(props, context);
  
      this.handleSelect = this.handleSelect.bind(this);
  
      this.state = {
        index: 0,
        direction: null,
        List:[]
      };
    }
  

    componentWillMount(){
        this.setState({
            List:this.props.list
        })
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.list.length!==this.state.List){
            this.setState({
                List:nextProps.list
            })
        }
    }

    handleSelect(selectedIndex, e) {
      this.setState({
        index: selectedIndex,
        direction: e.direction,
      });
    }
  
    render() {
      const { index, direction } = this.state;
  
      var CarouselIMG=this.state.List.map((elem,index)=>{
          var len=this.state.List.length;
          var indexpluss=index+1;
          var Index=index;
          return len===1?
          <Carousel.Item>
                            <div className="">
   
                                        <div class="row d-flex justify-content-center">
                                                  <img
                                                        className="m-auto"
                                                        style={{height:"450px"}}
                                                        src={elem}
                                                        
                                                    />
                                            </div>
                                            <div class="row d-flex justify-content-center">
                                                    <button onClick={(e)=>this.props.delete_Pic(e)}
                                                            id={"pictures_"+Index} className="btn btn-danger m-3">Delete</button>
                                            </div>
                                      
                                    
                                </div>
                                
                </Carousel.Item>
          
          
          
                :<Carousel.Item>
                            <div className="row d-flex justify-content-center ">
                           
  
                                  <div className=" col-md-6 ">  
                                        <div class="row">
                                                  <img
                                                        className="m-auto"
                                                        style={{height:"300px"}}
                                                        src={elem}
                                                        
                                                    />
                                            </div>
                                            <div class="row d-flex justify-content-center">
                                                    <button 
                                                            id={"pictures_"+Index} onClick={(e)=>this.props.delete_Pic(e)} className="btn btn-danger m-3">Delete</button>
                                            </div>
                                              
                                      </div>
                                      <div className="col-md-6 "> 
                                            <div class="row">
                                                <img
                                                    className="m-auto"
                                                    style={{height:"300px"}}
                                                    src={this.state.List[(index+1)%len]}
                                                />
                                            </div>
                                            <div class="row d-flex justify-content-center">
                                                    <button id={"pictursss_"+indexpluss} onClick={(e)=>this.props.delete_Pic(e)} className="btn btn-danger m-3">Delete</button>
                                            </div>
                                            
                                      </div>
                                </div>
                                
                </Carousel.Item>
      })
      
      return (
        <Carousel
          activeIndex={index}
          direction={direction}
          onSelect={this.handleSelect}
          indicators={false}
         
        >
          
          {CarouselIMG}
        </Carousel>
      );
    }
  }
  
  


  export default ControlledCarousel;