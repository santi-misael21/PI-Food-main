//Para continuar con la política de los estados semi-globales
//vamos a clasificar
//cuáles son inputs
import '../App.css'
import '../estilos/4-Form/form.css';
import '../estilos/2-Recetas/recetas.css';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { create, createdisplay, getRecipes } from '../redux/actions';
import Diets from './5-Diets';
// import { useState } from 'react';
import { Back } from './--1-BajoSubsuelo';
import { useEffect } from 'react';
import { longitud } from './-1-AreaSearching';
import Ventana from './10-Aftercreate';
import { API_URL } from '../config/enviroment';
const axios = require('axios').default;

export function validate(input) {
  let errors = {};

  if (!input.Nombre) { 
    errors.nombre = 'Campo requerido';
  }                                         
  if(input.Nombre.replaceAll(/[:;~`´_°|{}¬!#$%&=()?¡¿*¨+-]/g, '') !== input.Nombre){
    errors.nombre = 'No puede contener símbolos'
  }

  if (!input.Resumen) {
    errors.resumen ='Campo requerido';
  }
  if(input.Resumen.length> 940){
    errors.resumen = 'Máximo 940 caracteres'
  }
  
  if (!input.HealthScore) {
    errors.health = 'Campo requerido';
  }
  if(parseInt(input.HealthScore) != input.HealthScore || input.HealthScore< 0 || input.HealthScore> 100){
    errors.health = 'Debe tener un valor de entre 0 y 100'
  }
  
  return errors;
};


export default function  Form() {
    let campo= 'Campo requerido'
    //manager de inputs texto
    const [input, setInput] = React.useState({ 
        Nombre:'',
        Resumen: '',
        HealthScore: '',
        Imagen: '',
        Dietas: []        
    });
    
    const [errors, setErrors] = React.useState({
        nombre: campo,
        resumen: campo,
        health: campo,
        // imagen: 'Debe colocar una imagen'
    });


    const handleInputChange =function(e) {
        setInput({
        ...input,
        [e.target.name]: e.target.value
        });
        setErrors(validate({
        ...input,
        [e.target.name]: e.target.value
        }));
    }
    const dispatch= useDispatch();

    function deshabilitar(){
        if(Object.keys(errors).length> 0)return true
        else return false
    }
    //PARA EL INPUT STEPS
    const modeloPaso = { Nombre: '' };

    const [Pass, setPaso] = React.useState([
        { ...modeloPaso },
    ]);

    const agregarPaso = () => {
        setPaso([...Pass, { ...modeloPaso }]); //añadiendo objetos [{}, {}, {}]
    };

    const handlePasoChange = (e) => {
        const pasos = [...Pass];
        pasos[e.target.id][e.target.dataset.name] = e.target.value;
        setPaso(pasos);
    };
    // let [dietas, setDietas] = useState([])

    function handtick(e) {
        e.preventDefault()
        let newDiet= e.target.innerText
        console.log(newDiet)

        let add= true
        if(input.Dietas.length){
            for(let d= 0; d< input.Dietas.length; d++){
                if(input.Dietas[d] === newDiet){
                    add= false
                }
            }
        }
        
        if(add){
            setInput({
                ...input,
                Dietas: [...input.Dietas, newDiet]
            })
            
            console.log({
                ...input,
                Dietas: [...input.Dietas, newDiet]
            })
        }
        
    }

    const [ventana, setVentana] = React.useState(false)
    const long= useSelector(state=> state.recipes.length)

    function a(){
        if(!long){
            dispatch(getRecipes())
        }
    }

    useEffect(()=>a())
    console.log(long)

    const hist=useHistory()
    const handleSubmit= function(e){
        e.preventDefault()
        let Pasos= []
        for(let p= 0; p< Pass.length; p++){
            Pasos.push(Pass[p].Nombre)
        }
        let objetoNuevo= {...input, Pasos}
        console.log("desde Form",JSON.stringify(input))
        console.log({
            ...objetoNuevo
        })
        // dispatch(create(objetoNuevo))//COMENTADA PARA EXPERIMENTO REDUX --->
        dispatch(createdisplay(objetoNuevo)) //ESTO ES
        
        axios.post(`${API_URL}/recipes`,{//COMENTADA PARA EXPERIMENTO REDUX <---
            ...input, Pasos
        }).then(()=>setVentana("ventana"))

        // hist.push(`/recipes/`)
        // ).then(()=> hist.push(`/recipes/${long+1}`))
       
        alert("Receta creada")
    }

    return( 
        <div className='generalform'>
            <Back/>
            {ventana && <Ventana long={long}/>}
            { <form onSubmit= {(e)=>handleSubmit(e)} method="post" action=''>
                {/*method y action en proceso, aunque no sé si deben ir */}
                <div>
                    <label>Nombre de la receta:</label>
                    <input className={ errors.nombre && 'danger' }   // Fijar errores 
                    type='number'                                     // Tipo texto 
                    name="Nombre"                       //clave
                    value= {input.Nombre}               //clave
                    onChange={(e) =>{ handleInputChange(e)} }/>
                    {errors.nombre && (<span className="danger"> {errors.nombre} </span> )}
                    <br>
                    </br>
                </div>

                <div>
                    <label>Resumen del plato:</label>
                    <input className={ errors.resumen && 'danger' }
                    type="text"
                    name="Resumen"
                    placeholder='Máximo 940 caracteres '
                    value= {input.Resumen}
                    onChange={(e) =>{ handleInputChange(e)} } />
                    {errors.resumen && (<span className="danger">{errors.resumen}</span> )}
                    <br/>

                    <label>Nivel de comida saludable:</label>
                    <input 
                    className={ errors.health && 'danger'}
                    type="text"
                    name="HealthScore"
                    placeholder='Entre 0 y 100'
                    value= {input.HealthScore}
                    onChange={(e) =>{ handleInputChange(e)} } />
                    {errors.health && (<span className="danger">{errors.health}</span>)}
                    <br/>

                    <label>Paso a paso:</label>
                    <input type="button"
                    value="Agregue un nuevo paso"
                    onClick={agregarPaso}/>
                    {
                    Pass.map((el, i) => (
                        <div key={`paso-${i}`}>
                            <label htmlFor={`nombre-${i}`}>{`Paso #${i + 1}`}</label>
                            <input
                                type="text"
                                name={`nombre-${i}`}
                                id={i}
                                data-name="Nombre"
                                value={el.Nombre}
                                onChange={handlePasoChange}
                            />
                        </div>
                    ))
                    }
                    <label>Coloque URL de una imagen</label>
                    <input type="text"
                    name="Imagen"
                    value= {input.Imagen}
                    onChange={(e) =>{ handleInputChange(e)} } />
                    <br/>
                    {/* <input type="checkbox" onClick={(e)=>algo(e)} value /> */}

                    {<div className='botonesdieta'>
                     <Diets noEstilos={true} Dontback={true} noMensaje={true} tickable={true} tick={(e)=> handtick(e)}/>   
                     </div>}
                    {
                        input.Dietas.length> 0? input.Dietas.map((d, i)=> <span key={i}> {d} </span>): ""
                    }
                    <input id='subm' type="submit" disabled={deshabilitar()}/>
                </div>
            </form>}
        </div>
    )
}