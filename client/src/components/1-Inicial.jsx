import '../estilos/1-Inicio/inicio.css';
import '../App.css';
import React from 'react';
import { Link } from 'react-router-dom';

export default function Inicial(){
	// function logg(){
	// 	console.log("click") //de prueba
	// }
	return(
		<div className= "inicial">
			<div className='inicialcontenido'>
			{/*classname para colocar backbround y otros estilos*/}
				<div id='title'>Spoonacular recipes</div>
				<div id='subtitle'>Too much variety in one place</div>
				
				<br/>
				<Link to='/recipes'>{/*para probar, va "/recipes" */} 
					<button id='go'
					className="boton_inicial"> 
					Ver recetario
					</button>
				</Link>
				<br/>
			</div>
		</div>
	)
}