import '../App.css'
import '../estilos/3-Dietas/dietas.css';
import React from 'react';
import Diet from './6-Diet.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getDiets } from '../redux/actions';
import { Back } from './--1-BajoSubsuelo';

export default function Diets ({noEstilos, Dontback, noMensaje, tickable, tick, sinbotones}){

    let estilos
    if(!noEstilos){
        estilos= "yes"
    }
    let dietas= useSelector(state=> state.diets)
    const dispatch= useDispatch()
    
    // let [d, setD] = useState([])
    function a(){
        // if (dietas) console.log("hay", dietas.length)
        if(dietas.length=== 0){
            dispatch(getDiets())
        }
    }

    React.useEffect(
        ()=> {
            a()
        }
    )
    let cargando= "...Cargando Dietas desde la base de datos..."
    let msg= `Estas son todas las dietas existentes en el recetario: 
    (${dietas.length})`
    if(tickable) sinbotones = false
    if(!tickable) sinbotones= true
    console.log(dietas)

    return(
        <>
            <div className={estilos && 'diets'}>
                {!Dontback && <Back/>}
                <br/>
                {!noMensaje && msg}
                {sinbotones && dietas && dietas.map((d, i)=> <Diet name={d} key={i}/>)}
                {!dietas.length && <h3> {cargando} </h3>}
                { tickable && dietas && dietas.map((d, i)=><div className='elementosdieta' key={i}><button id={i} className='botondietasform' onClick={tick}> <Diet name={d} key={i}/> </button></div>)}
            </div>
        </>
    )
}