// import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getfuels } from "../redux/actions";
import { Back } from "./--1-BajoSubsuelo";
// import exportTableToExcel from "./19-ModuloHTML";
import Entablador from "./22-Entablador";
const axios= require("axios").default;

export default function Tabla(){
    
    let result= useSelector(state=> state.dataFuels)
    let dispatch= useDispatch()
    
    function execute(){
        dispatch(getfuels())
    }

    function mostrar(){
        var temp = document.createElement('div');
        temp.innerHTML = result.data;
        var htmlObject = temp.firstChild;
        
        document.getElementsByClassName("Tablas")[0].appendChild(htmlObject)
    }

    const[tabla, setTabla]= useState([])
    
    function render(){
        let colarray= []
        let rowsarray= []
        const col= 13

        for(let a= 0; a< document.getElementsByTagName("td").length; a++){
            rowsarray.push(document.getElementsByTagName("td")[a].innerText)
            if(rowsarray.length== col){
                colarray.push(rowsarray)
                rowsarray= []
            }
        }
        setTabla([...colarray])
    }

    // function save(){
    //     if(tabla.length> 0){
    //         exportTableToExcel("tablita")
    //     }
    // }
    function submit(){
        axios.post("http://localhost:3001/recipes/table",{
            tabla
        }).then(r=>console.log(r))
    }

    return (
        <div className="Tablas">
            <Back/>
            { result &&
            <button onClick={mostrar}>
                Mostrar
            </button>
            }
            { !result && 
            <button onClick={execute}>
                Llamar
            </button>
            }
            { result && 
            <button onClick={render}>
                Render
            </button>
            }
            <table id="tablita">
                <tbody>
                    {tabla.length>0 && tabla.map((e, i)=> <Entablador key={i} row={e}/> ) }
                </tbody>
            </table>
            <button onClick={submit}>
                Submit to Backend
            </button>
        </div>
    )
}
