 function OrderIds(original){
    for(let i= 1; i< original.length; i++){
        for (let o= i; o>= 1; o--){
            if (original[o].id< original[o -1].id){
                var box= original[o]
                original[o]=  original[o -1]
                original[o -1]= box
            }
        }
    }
    return original
}

module.exports.OrderIds= OrderIds