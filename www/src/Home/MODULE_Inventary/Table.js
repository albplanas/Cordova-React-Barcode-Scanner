import React,{Component} from "react";
import { CompareObjects,InventaryName} from "../../Helper/Conversor";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrashAlt, faBarcode} from '@fortawesome/free-solid-svg-icons'


function Table (props){

    return   (
 
                <div class="table-responsive-lg mt-5 mb-5">
                     <table class="table table-striped text-center">
                          <thead>                                      
                                        <tr>
                                        <th scope="col d-flex justify-content-center"> 
                                                    <div className="  mr-1 text-primary " onClick={(e)=>{e.preventDefault();   props.AddRow(props.data[0].idproject)}} ><FontAwesomeIcon icon={ faPlus} size={"2x"}/></div>
                                                   
                                        </th>
                                        <th scope="col">Product's Name</th>
                                        <th scope="col">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                       
                                       <ListProducts  
                                                      table={props.data} 
                                                      DeleteRow={(id)=>props.DeleteRow(id)}
                                                      ChangeRow={(e)=>props.ChangeRow(e)}
                                                      />
                                    </tbody>
                        </table>
                        </div>


                )
  }
  



  function  ListProducts(props){
  
        var List=props.table.map(elems=>{

                          return (
                                                  <Row 
                                                          delete  = {()=>{props.DeleteRow(elems.id)}}
                                                          change  = {(e)=>{props.ChangeRow(e)}}
                                                          barcode = {elems.name} 
                                                          amount  = {elems.amount}
                                                          id      = {elems.id}
                                                  />
                          )
      })

      return List
  }  

  function Row(props){

    return (
        <tr>
                <th scope="row">
                            <div className="  mr-1 text-danger " onClick={props.delete} >
                                        <FontAwesomeIcon icon={ faTrashAlt} size={"lg"}/>
                            </div>
                </th>
                <td>{props.barcode}</td>
                <td><input type="number" min="0" id={"amount_"+props.id} class="form-control" value={props.amount} onChange={(e)=>{e.preventDefault();props.change(e)}}/></td>
        </tr>
    )
  }


  export default Table;