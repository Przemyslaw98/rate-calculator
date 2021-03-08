import axios from 'axios';
import currencyList from "./CurrencyList";


async function calculate(c1,c2,v1,setv2,setString,setError,setMsg){
    var error="none";
    if(isNaN (v1)||v1<0) {
        error = "incorrect value"
        setMsg(error)
        setError(true)
        return
    }
    const r1=await getRate(currencyList[c1],error);
    const r2=await getRate(currencyList[c2],error);
    if(error==="none") {
        setv2(v1 / r2 * r1);
        setString('1 '+currencyList[c1]+' = '+(r1/r2).toString()+' '+currencyList[c2]);
    }
    else {
        setMsg(error);
        setError(true);
    }
}
async function getRate(currency,error){
    if(currency==="PLN")
        return 1;
    const url="http://api.nbp.pl/api/exchangerates/rates/a/"+currency+"/?format=json";
    const res=await axios.get(url)
    if(res['status']===200){
        return res['data']['rates'][0]['mid'];
    }
    else if(res['status']===200){
        error="currency not found"
    }
    else
        error="unknown error";
    return 0

    // }).catch(error=>{
    //     if(error.response.status===404)
    //         output="invalid currency";
    //     else
    //         output="unknown error";
    // })
}
export default calculate;