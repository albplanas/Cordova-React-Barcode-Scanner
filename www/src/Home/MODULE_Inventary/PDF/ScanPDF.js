import React,{Component} from "react";
import { connect } from 'react-redux';

import * as actionTypes from '../../../store/actions';

/*import {FindIdEmployee,FindIdLabor,CompareObjects} from "../../../Helper/Conversor"
import logo from "../../../../img/jva.png"
import TopPDF from "./TopPDF"
import Payroll from "./Payroll"
*/

class ReportPDF extends Component {
    constructor(props) {
        super(props);
          this.state={
          
            date:''

          }
    //    this.cancel=this.cancel.bind(this);
      //  this.Download=this.Download.bind(this)
     //   this.Print=this.Print.bind(this)
     }
  /*   Print(doc){
      doc.autoPrint({variant: 'non-conform'});
      doc.save('autoprint.pdf');
     }

     Download(doc){
       doc.save('table.pdf');
     }

     componentWillMount() {
 
      this.setState({ 
        ShowReport:this.props.ShowReport
      })
    }
  
    //Update the list
   componentWillReceiveProps(nextProps) {
  
            if( !CompareObjects(nextProps.ShowReport,this.state.ShowReport) ) {
             
              this.setState({   ShowReport:nextProps.ShowReport  })
            } 
                  
                 
      }
      cancel(e){

        e.preventDefault();
       

        this.props.onSelectDoor("home")
      
       }

*/
    render() {


/*
    function PDFgenerator(list,ProjectPack,LLabor,NList,logo){

              var ProjectName=ProjectPack.filter(e=>e.id+''===list[0].idproject+'')[0].name
              var Supervisor="" ;
              var date=list[0].date;

              

              var img = new Image();
              img.src=logo;

              // Only pt supported (not mm or in)
              var doc = new jsPDF('p', 'pt');

              doc.addImage(img, 'png', 40, 20,100,50 );

              doc.setFontSize(10);
              doc.text("Project : "+ProjectName, 160, 30)
              doc.text("Weather : Sunny", 430, 30);

              //Second Row
              doc.setFontSize(13);
              doc.setFontStyle("bold");
              
              doc.text("DAILY REPORT", 40, 90)
              doc.setFontSize(10);
              doc.setFontStyle("normal");
              doc.text("Supervisor : "+Supervisor, 160, 60);

              var imgCheck = new Image();
              imgCheck.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAATlBMVEX///8AAAB/f38RERHNzc3Kysp0dHTf398fHx/X19eFhYX7+/vT09MsLCzo6OgYGBifn58kJCQzMzOWlpZXV1cpKSk3NzcaGhpcXFyOjo7nJrIjAAADxUlEQVR4nO3d63LaQAwFYLaQBAK5kPSW93/RzrRTgo203tXq5vacnzT16msGvMaSu9kgCIIgCIIgCIIgCIIg/3Z2r4+Pr6foKkZz/NiX3zm/H6NrGcnpW7nk6RBdjTx323KV7S66HmmmjlJ+PEdXJMvcUcrP6JJEuXWUssa3CeUo99FV9Yd0lO/RZXWHdpRtdF29YRylRBfWGdaxst8I61jZe4R3rOtTq+JY1Xmk5ljTmb3mWNNeq+bYrujqqupY0S4ejlyBI1fgyBU4cgWOXIEjV+DIlf/X8SUo2o4N/xdso+1ICRG9P/xKn0bbkRAi/LzyK30abUc6iPj84Vf6NNqOZJCB87lf6dNoO1JBhvZXfqVPo+2YQKz3V3XI4H534V9JNdW1RvftWSDD1x9JIOPXUTkgCteDKSAa17UZICrX5wkgOt8zBEH2n68qfV8SA9k/XF7U+t4nBGLgCIFYOCIgJo4AiI3DH2LkcIdYObwhZg5niJ3DF2LocIVYOlwhlg5XyCUW99UiICb3BwMgNvc5/SFG92urkJPBpJ/VfWcecnw//3n5/KE46Wd2/5yFHJ4+/0Bv0s+uD4CD7KaTfndj9f+NYT8DA3l+ma2iIrHsy2AgX2/WUZCY9pfQkAOx0rDEtk+GhtxTaw1KjPt9aMgbudqQxLpviYYww34DEvP+KxrCrSiW2PeR9fxG5BKHfjgaQr5H5BKPvj4aQn1qySUu/Yk05FRZuVvi02dJQ27P7HKJU78oA5nvteQSr75XBjLb/colbv27HKReQbPErw+ZhahIHPupeYiCxLMvvAIZlrj2t9cggxLfPv0qZEjiPG9QhwxIvOcmFiBiifv8xxJEKPGfY1mEiCQB8zjLEIEkYq6oAdItCZmPaoF0SmLmvJogXZKgebU2SIckau6uEdIsCZsfbIU0SuLmIJshTZLAec52SIMkci61A7Io6XDoPw+rB7Ig6XHo3wrvgtQlPY5oSFXS4wiHiCSEIx4ikFCOBJBuCenIAOmU0I4UkC4J48gB6ZBwjiSQZgnryAJplPCONJAmyXyfKF2rKeKDL0tu9rs5IYuS2317UsiChLj+yArpvo5KC6lIyOvBvBBWQl/XJoYwkobnFI1VbXBwStLynKKRmm0Ofitpek6RvGKzg88lbc8pktbLRuHgU0njc4qEa/HROPh19/nbA/9z6SFX8wDV//knP2TTNqGxCkj4WoBkWwuQbGsBkm2t64PHPl9LEeIZQAABBBBAAAEEkEqs91dc1CEIgiAIgiAIgiAIgiBIQ34BgUIzcMIwXHEAAAAASUVORK5CYII=";
              doc.addImage(imgCheck, 'png', 415, 50,10,10 );
              doc.setFontSize(8);
              doc.setFontStyle("italic");
              doc.text('I  have checked the jobsite ', 430, 60);
              doc.text('for safety and pollution', 430, 75);
              
              doc.setFontSize(10);
              doc.setFontStyle("normal");
              doc.text("Payroll : "+date, 160, 90);

                  //Labor Table rows
                                    var idLaborList =[];
                                   
                                    list.forEach((elem) => {
                                              idLaborList.indexOf(elem.idlabor)===-1 ? idLaborList.push(elem.idlabor):null; 
                                    });
                                    var LaborList=[].concat(idLaborList);
                                    var Remainer = LLabor.map(e=> {return LaborList.indexOf(e[0])===-1 ? e[0]:null  } ).filter(e=> e!==null);
                                    LaborList=LaborList.length>14?LaborList:LaborList.concat(Remainer.slice(0,15-LaborList.length))
                                    var nameLaborList=LaborList.map(e=>FindIdLabor(e,LLabor))
                                    
                                   

                   //By name
                                        var idNameList =[];
                                        list.forEach((elem ,index) => {
                                               index>0? idNameList.indexOf(elem.idemployee)===-1 ? idNameList.push(elem.idemployee):null:null; 
                                        });
                                       

              function keyGenerator(i){return "l"+i+''}

              var columns = [{title: "Name", dataKey: "id"}]
              for(var i in nameLaborList){
                var j=(i-0+1);
                columns.push({title: nameLaborList[i].slice(0,2), dataKey: keyGenerator(j.toString())})
              }

                   columns.push({title: "Tot", dataKey: "ttl"}) ;
                   columns.push({title: "Signature", dataKey: "sign"}) ;
                     
                   var rows=  idNameList.map (idName=>{
                         var rep= list.filter(e=> e.idemployee===idName)
                        
                         var Hrs=LaborList.map(elem=>{
                                  return rep.map(e=>e.idlabor).indexOf(elem) ===-1 ? "" : rep.filter(e=>e.idlabor+""===elem+"")[0].hrs+""
                         })
                         var sum=0;
                         Hrs.forEach(e=>{
                            sum+=e===""?0:e-0;
                         })
                         
                         return  {    
                                      "id": FindIdEmployee(idName,NList),
                                      "l1": Hrs[0],
                                      "l2": Hrs[1],
                                      "l3": Hrs[2],
                                      "l4": Hrs[3],
                                      "l5": Hrs[4],
                                      "l6": Hrs[5],
                                      "l7": Hrs[6],
                                      "l8": Hrs[7],
                                      "l9": Hrs[8],
                                      "l10":Hrs[9],
                                      "l11":Hrs[10],
                                      "l12":Hrs[11],
                                      "l13":Hrs[12],
                                      "l14":Hrs[13],
                                      "l15":Hrs[14],
                                      "ttl":sum,
                                      "sign": ""
                                    
                                    }
                   })      
                
                   
                 var   ValidList=list.slice(1)

                doc.autoTable(columns, rows, {
                    styles: {fontSize: 7,
                              halign:"center"},
                    columnStyles: {
                      id: {columnWidth: 80,halign:"left"},
                      ttl: {columnWidth: 25},
                      sign:{columnWidth: 80}
                    },
                    margin: {top: 120,left:10,rigth:10,bottom:40},
                    tableWidth:580
                });

                idNameList.forEach((elem,index)=>{
                      var h=140+17*index;
                      var singIMG=ValidList.filter(e=>e.idemployee+""===elem+"")[0].Signature;
                     
                          singIMG =singIMG!==""?singIMG:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAATlBMVEX///8AAAB/f38RERHNzc3Kysp0dHTf398fHx/X19eFhYX7+/vT09MsLCzo6OgYGBifn58kJCQzMzOWlpZXV1cpKSk3NzcaGhpcXFyOjo7nJrIjAAADxUlEQVR4nO3d63LaQAwFYLaQBAK5kPSW93/RzrRTgo203tXq5vacnzT16msGvMaSu9kgCIIgCIIgCIIgCIIg/3Z2r4+Pr6foKkZz/NiX3zm/H6NrGcnpW7nk6RBdjTx323KV7S66HmmmjlJ+PEdXJMvcUcrP6JJEuXWUssa3CeUo99FV9Yd0lO/RZXWHdpRtdF29YRylRBfWGdaxst8I61jZe4R3rOtTq+JY1Xmk5ljTmb3mWNNeq+bYrujqqupY0S4ejlyBI1fgyBU4cgWOXIEjV+DIlf/X8SUo2o4N/xdso+1ICRG9P/xKn0bbkRAi/LzyK30abUc6iPj84Vf6NNqOZJCB87lf6dNoO1JBhvZXfqVPo+2YQKz3V3XI4H534V9JNdW1RvftWSDD1x9JIOPXUTkgCteDKSAa17UZICrX5wkgOt8zBEH2n68qfV8SA9k/XF7U+t4nBGLgCIFYOCIgJo4AiI3DH2LkcIdYObwhZg5niJ3DF2LocIVYOlwhlg5XyCUW99UiICb3BwMgNvc5/SFG92urkJPBpJ/VfWcecnw//3n5/KE46Wd2/5yFHJ4+/0Bv0s+uD4CD7KaTfndj9f+NYT8DA3l+ma2iIrHsy2AgX2/WUZCY9pfQkAOx0rDEtk+GhtxTaw1KjPt9aMgbudqQxLpviYYww34DEvP+KxrCrSiW2PeR9fxG5BKHfjgaQr5H5BKPvj4aQn1qySUu/Yk05FRZuVvi02dJQ27P7HKJU78oA5nvteQSr75XBjLb/colbv27HKReQbPErw+ZhahIHPupeYiCxLMvvAIZlrj2t9cggxLfPv0qZEjiPG9QhwxIvOcmFiBiifv8xxJEKPGfY1mEiCQB8zjLEIEkYq6oAdItCZmPaoF0SmLmvJogXZKgebU2SIckau6uEdIsCZsfbIU0SuLmIJshTZLAec52SIMkci61A7Io6XDoPw+rB7Ig6XHo3wrvgtQlPY5oSFXS4wiHiCSEIx4ikFCOBJBuCenIAOmU0I4UkC4J48gB6ZBwjiSQZgnryAJplPCONJAmyXyfKF2rKeKDL0tu9rs5IYuS2317UsiChLj+yArpvo5KC6lIyOvBvBBWQl/XJoYwkobnFI1VbXBwStLynKKRmm0Ofitpek6RvGKzg88lbc8pktbLRuHgU0njc4qEa/HROPh19/nbA/9z6SFX8wDV//knP2TTNqGxCkj4WoBkWwuQbGsBkm2t64PHPl9LEeIZQAABBBBAAAEEkEqs91dc1CEIgiAIgiAIgiAIgiBIQ34BgUIzcMIwXHEAAAAASUVORK5CYII=";
                      doc.addImage(singIMG, 'png', 520,h,80,15 );

                })
                

               



              return doc;
    }  
  
  // var doc =PDFgenerator(this.props.ShowReport,this.props.Project,this.props.idLaborList,this.props.idEmloyeeList,logo);
  

 //doc={PDFgenerator(this.props.ShowReport,this.props.Project,this.props.idLaborList,this.props.idEmloyeeList,logo)} Download={this.Download} Print={this.Print}
var style={
            width:"auto", 
            overflowX:"scroll"
          }

var ProjectsName=this.props.ShowReport[0].idproject.map(idpoyect=>{
  return  <li>{this.props.Project.filter(e=>e[1]+""===idpoyect+"")[0][2]}</li>
})

      
     var Alex=( <div >
       <TopPDF cancel={this.props.onSelectDoor} />
        <div id="pdfReport" className="border border-dark m-3 p-3" style={style}>
                <div className="row">
                  <div className="col-3">
                    <img src={logo} style={{width:"100px"}}/>
                  </div>
                  <div className="col-6 "style={{paddingTop:"12px"}}>
                      <strong>Project :</strong>
                      <u>
                          {ProjectsName}
                      </u>
                      
                      
                  </div>
                  <div className="col-3 " style={{paddingTop:"12px"}}>
                      <strong >Wheter :</strong><u>Sunny</u>
                  </div>
                </div>
                    <div className="row mt-3">
                      <div className="col-3 font-weight-bold">
                        DAILY REPORT
                      </div>
                      <div className="col-6 "style={{paddingTop:"12px"}}>
                          <strong>Supervisor :</strong><u></u>
                      </div>
                      <div className="col-3 " style={{paddingTop:"12px"}}>
                            <div class="input-group mb-3">
                                  <div class="custom-control custom-checkbox">
                                      <input type="checkbox" class="custom-control-input" checked id="customCheckDisabled" disabled/>
                                      <label class="custom-control-label" for="customCheckDisabled">I have checked the jobsite for safety and pullition</label>
                                </div>
                                      
                            </div>
                            </div>
                    </div>
                    <div className="row m-3">
                      Payroll : {this.props.ShowReport[0].date}
                    </div>
                 <Payroll  report={this.props.ShowReport.filter((e,i)=>i>0)} LList={this.props.idLaborList} NList={this.props.idEmloyeeList}/> 
                
                 <h6 className="mt-5 mb-3 text-center">Materials</h6>
                <hr/>
                <p>{this.props.ShowReport[0].materials}</p>   
                <h6 className="mt-5 mb-3 text-center">Equipments</h6>
                <hr/>
                <p>{this.props.ShowReport[0].equipments}</p>  
                <h6 className="mt-5 mb-3 text-center">Production</h6>
                <hr/>
                <p>{this.props.ShowReport[0].production}</p>   
                <hr/>
                <h6 className="mt-3 mb-3 text-center">Comments</h6>
                <p>{this.props.ShowReport[0].comments}</p>  
        </div>
      </div>)

*/

      //return Alex
return <p className="m-5">ScanPdf</p>

    }
  }
  
  const mapStateToProps = state => {
    return {
      ShowReport: state.dataState.ShowReport,
      idLaborList:state.dataBase.Labor,
      idEmloyeeList:state.dataBase.Employee,
      Project:state.dataBase.Project,
      lang:state.globalState.lang
    };
  };
 const mapDispatchToProps = dispatch => {
    return {
      onSelectDoor: (value) => dispatch({type: actionTypes.DOOR ,value:value}),
      
    };
};
  export default connect(mapStateToProps,mapDispatchToProps)(ReportPDF);