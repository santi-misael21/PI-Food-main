import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Back } from "./--1-BajoSubsuelo";
import '../estilos/4-Form/form.css';
import Form from "./7-Form";
import axios from "axios";
import { API_URL } from "../config/enviroment";

export default function Ventana({long}) {

    const hist= useHistory()

    function created(){
         hist.push(`/recipes/${long+1}`)
    }

    // function newone(){
        
    // }
    function mostrar () {
        axios.get(`${API_URL}/recipes`
        ).then(()=>hist.push("/recipes")
        ).then(()=>hist.push("/create")
        ).catch(e=>console.log(e))
    }

    return (
        <div className="ventanacolor">
        <h2>Receta creada<br/> satisfactoriamente</h2>

            <div className="ventana">
                <button className="botoncitos" onClick={created}>
                    Ver la receta creada
                </button>
                <button className="botoncitos" onClick={mostrar}>
                    Crear nueva receta
                </button>
            </div>
        </div>
    )
}