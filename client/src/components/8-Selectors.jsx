import '../App.css'
import React from "react";
// import { Link } from 'react-router-dom';

export default function Selectors ({nums, click, pre, next, i}){ //en i le mandan el numero de boton 
    return(
        <div className="buttondiv">
            <button onClick={pre}>
                Anterior
            </button>
            {nums.map((n, index)=> <Selector key={n} num= {n} click= {click} pre= {pre} next= {next} i={i === index? "true": ""}/>)}
            <button onClick={next} >
                Siguiente
            </button>
        </div>
    )
}

function Selector({num, click, i}){
    return(
        <span>
            <button className={!i? 'selector':'selectorstyle'} onClick={click}>
                {num}
            </button>
        </span>
    )
}