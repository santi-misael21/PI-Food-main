import React, {Component} from "react";
import Search from "./-1-Search";
import { getRecipes } from "../redux/actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

export function Back(){
  return(
    <span>
      <Link to="/">
        <button>
          Volver al Inicio
        </button>
      </Link>
      <Link to="/recipes">
        <button>
          Volver al recetario
        </button>
      </Link>  
    </span>
  )
}

// export default function ReduxState(){

//     let recetaslocal= useSelector(state=> state.recipes)
    
//     const dispatch= useDispatch();
    
//     function a(){
//         if (recetaslocal.length==0){
//             dispatch(getRecipes())
//         }
//     }
    
//     useEffect(()=>a())

//     return(
//         <div>
//             <Search recetaslocal={recetaslocal && recetaslocal}/>
//         </div>
//     )

// }


export class ReduxState extends Component {
  
    componentDidMount(){ 
        this.props.getRecipes()
        // console.log(this.props.recipes)
    }
  
    render() {
      return (
        <div>
          {this.props.recipes && <Search recetaslocal={this.props.recipes } long={this.props.recipes.length}/>}
          
        </div>
        )
    }
  }
  
  export const mapStateToProps = (state) => {
    return {
      recipes: state.recipes
    }
  }
  
  export const mapDispatchToProps = (dispatch) => {
    return {
      getRecipes: () => dispatch(getRecipes())
    }
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(ReduxState)