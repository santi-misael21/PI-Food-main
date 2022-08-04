import '../App.css'
import '../estilos/2-Recetas/recetas.css';
import '../estilos/3-Dietas/dietas.css';
import React from 'react';
import Recipe from './3-Recipe.jsx';
import { Link } from 'react-router-dom';
import Selectors from './8-Selectors.jsx';

import { useDispatch, useSelector} from 'react-redux';
import { savepage } from '../redux/actions/index.js';

export default function AllRecipes ({recipes, call, callrecipes}){

    console.log(recipes)
    
    let longitud=(recipes.length)
    let array= []//1 elemento por página. Crea tantos elementos como páginas 
    for(let v= 1; v<= longitud; v++){
        array.push(v)
    }

    const dispatch= useDispatch()

    let creadas= useSelector(state=> state.creadas)
    console.log(creadas)

    // const [índice, setÍndice] = useState(0)
    let índice= useSelector(state=> state.page)
    
    let redirecc
    if(índice>= longitud) redirecc= longitud-1
    if(índice< longitud) redirecc= índice
    let destructRecipes= recipes[redirecc] //un solo sub-array por vez

    function setting(e){
        let val= e.target.innerText// es el numero del boton
        dispatch(savepage(val -1))
        // setÍndice(val -1)
    }

    function anterior(){
        if(índice=== 0) {
            dispatch(savepage(índice))
            // setÍndice(índice)
        }
        else {
            dispatch(savepage(índice -1))
            // setÍndice(índice -1)
        }
    }
    function siguiente(){
        if (índice=== longitud -1){
            dispatch(savepage(índice))
            // setÍndice(índice)
        }
        else {
            dispatch(savepage(índice +1))
            // setÍndice(índice +1)
        }
    }
    
//COMENTADO HASTA ACÁ
    // const [pages, setPages] = useState([])
    // function paginas(){
        // if(recipes.length> 0){
        //     let rl= recipes.length
        //     let pages= Math.ceil(rl/ 5)
        //    let  paging= new Array(pages)
        //     let y= 0
        //     for(let e= 0; e< pages; e++){
        //       paging[e]= []
        //       for(let f= 0; f< 5; f++){
        //         paging[e].push(recipes[y])
        //         y++
        //       }
        //     }
    
        //     console.log("paging", paging)
        //     // setPages([...paging]);
        //     console.log("recipes", recipes)
        //     // console.log(paging)
        //     setPages([...paging])
        // }
    // }
    //cambiar nombre de componente
    return(
        <div className='allrecipes'>
            <Link to='/'>{/*para probar, va "/recipes" */} 
                <button
                className="boton_exit"> 
                Salir
                </button>
            </Link>
			<Link to='/diets' >{/*para probar, va "/recipes" */} 
				<button onClick={call}
				className="boton_inicial"> 
				Ver dietas 
				</button>
			</Link>
			<Link to='/create'>
				<button 
				className="boton_create"> 
				Crear nueva receta 
				</button>
			</Link>
            <Selectors nums= {array} click={setting} pre= {anterior} next= {siguiente} i={redirecc }/>
            <div className='recetas'>
            { destructRecipes.map((r, i)=> <Recipe
                Health= {r.HealthScore}
                Nombre= {r.Nombre}
                Dietas= {r.Dietas}
                Image= {r.Imagen}
                id= {r.id}
                key= {i}
    
            /> )}
            </div>
            <br/>{/*COMENTADA: */}
            <Selectors nums= {array} click={setting} pre= {anterior} next= {siguiente} i={redirecc }/>
            <div >
                <Link to='/creadas'>{/*para probar, va "/recipes" */} 
                    <button className='punta'> 
                    Beyond
                    </button>
                </Link>
            </div>
        </div>
    )
}

// componentDidMount() {
//     this.props.getAllProducts()
//   }

// export const mapStateToProps = (state) => {
//   return {
//     recipes: state.recipes
//   }
// }

// export const mapDispatchToProps = (dispatch) => {
//   return {
//     getRecipes: () => dispatch(getRecipes())
//   }
// }

// export const connect= connect(mapStateToProps,mapDispatchToProps)(AllRecipes)

//https://drive.google.com/file/d/1AN-0vw5z_lYEryTnea-Rv9irBik80hTD/view?usp=sharing