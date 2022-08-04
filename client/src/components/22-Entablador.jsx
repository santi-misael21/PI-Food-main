import React from "react";

export default function Entablador({row}){
    
    return (
        <tr>
            {row && row.map((r, i)=> <td key={i}>{r}</td>)}
        </tr>
    )
}