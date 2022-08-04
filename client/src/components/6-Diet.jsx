import '../App.css'
import '../estilos/3-Dietas/dietas.css';
import React from 'react';

export default function Diet ({name}){
    // let mayús= name[0].toUpperCase()+name.slice(1)
    return(
        <div className='eachdiet'>
            <p style={{"color":"black", "backgroundColor":"rgb(100,100,100,0.5)", "width": "(max-content)", "padding": "0rem 3rem", "margin":"auto"}}>
                {name}
            </p>
        </div>
    )
}