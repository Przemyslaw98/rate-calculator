import getRate from "./getRate";

function checkIfAble(c1,c2,v1,rates=new Map()){
    var error=[null,null,null]
    if(v1.length===0)
        error[0]= "No input value!"
    if(isNaN (v1)||v1<0)
        error[0]= "Incorrect input value!"
    if(!rates.has(c1)){
        const r1=getRate(c1);
        if(isNaN(r1))
            error[1]= r1;
        else rates.set(c1,r1)
    }
    if(!rates.has(c2)){
        const r2=getRate(c2);
        if(isNaN(r2))
            error[2]=r2;
        else rates.set(c2,r2)
    }
    if(error[0]===null&&error[1]===null&&error[2]===null)
        return null
    return error
}
export default checkIfAble