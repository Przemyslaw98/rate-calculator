function getRate(currency,table="a"){
    if(currency==="PLN")
         return 1;
    var req=new XMLHttpRequest();
    const url="http://api.nbp.pl/api/exchangerates/rates/"+table+"/"+currency+"/?format=json";
    req.open('GET', url, false);
    try{
        req.send(null);
    }
    catch(error){
        return ("HTTP request failed!")
    }
    if(req.status === 200||req.status===304) {
        const res = JSON.parse(req.responseText);
        return parseFloat(res.rates[0].mid);
    }
    else if(req.status === 404)
        if(table==="a")
            return getRate(currency,"b")
        else
            return ("Currency not found!")
    else return("Unknown error!")
}
export default getRate