import React,{Component} from "react";
import GetLocalStorage from './../../Helper/getLocalStorage'
import {formatDate} from "./../../Helper/Conversor"

  function CardReport(props){

    var style={
        zIndex: '100',
        position:"absolute",
        top:"140px",
        left:"10%",
        width:"80%",
        minWidth:"250px"
    }

    var AllOfThem=GetLocalStorage("OldReportsList")
 
    var list= props.date.map(date=>{

                var Filter=AllOfThem.filter(e=>e[0].date===formatDate(date));
                
                var status = Filter.length===0 ? "Missing":Filter[0][0].send?"Sent":"Draft"
                var estatus= Filter.length===0 ? "No Existente":Filter[0][0].send?"Enviado":"Borrador"
                var classes = Filter.length===0 ? "text-warning border-warning":Filter[0][0].send?"text-success border-success":"text-danger border-danger"
                return (
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                        {date}
                        <span class={"badge  badge-light  border  badge-pill "+classes}>{props.lang==="en"?status:estatus}</span>
                        </li>
                )
    })
        return (
            <ul class="list-group shadow" style={style}>
            <li class="list-group-item bg-light  text-danger text-center" onClick={props.close} >
                    {props.lang==="en"?"CLOSE":"CERRAR"}
            </li>
                {list}
            </ul>
        )
    

  }


  export default CardReport;