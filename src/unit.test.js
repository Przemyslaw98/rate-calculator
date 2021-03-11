import getRate from './getRate'
import currencyList from "./CurrencyList";
import calculate from "./Calculate"

describe("Load currency list",()=>{
    test("check for type",()=>{
        expect(currencyList).toBeInstanceOf(Array);
    })
    test("check if all codes have correct length",()=>{
        var flag=true
        for(var i=0;i<currencyList.length;i++)
            if(currencyList[i].length!==3)
                flag=false
        expect(flag).toBe(true)
    })
})

describe("REST request",()=>{

    test("correctly invoked",()=>{
        const rate=getRate("USD")
        expect(rate).not.toBeNaN();
    })
    test("correctly invoked for table B",()=>{
        const rate=getRate("AFN")
        expect(rate).not.toBeNaN();
    })
    test("return for PLN",()=>{
        const rate=getRate("PLN")
        expect(rate).toBe(1);
    })
    test("IncorrectCurrency",()=>{
        const rate=getRate("AAA")
        expect(rate).toBe("Currency not found!");
    })
    test("IncorrectArgumentLength",()=>{
        const rate=getRate("AA")
        expect(rate).toBe("HTTP request failed!");
    })
})

//PseudoHook
// var string=""
// function setString(newValue){
//     string=newValue
// }
//
// describe("calculation procedure",()=>{
//     test("IncorrectArgumentLength",()=>{
//         calculate(c1,c2,v1,setv1,setv2,setString,rates)
//     })
//
// })