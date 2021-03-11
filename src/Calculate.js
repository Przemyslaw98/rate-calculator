import currencyList from "./CurrencyList";
import getRate from "./getRate"

function calculate(c1,c2,v1,setv1,setv2,setString,rates){
    v1=parseFloat(v1)
    if(isNaN (v1)||v1<0)
        return "incorrect value"
    setv1(v1)
    let r1=0;
    let r2=0;
    if(rates.has(c1))
        r1=rates.get(c1)
    else {
        r1=getRate(currencyList[c1]);
        if(isNaN(r1))
            return r1
        rates.set(c1,r1)
    }
    if(rates.has(c2))
        r2=rates.get(c2)
    else{
        r2=getRate(currencyList[c2]);
        if(isNaN(r2))
            return r2
        rates.set(c2,r2)
    }
    setv2(v1 / r2 * r1);
    setString('1 '+currencyList[c1]+' = '+(r1/r2).toString()+' '+currencyList[c2]);
}

export default calculate;