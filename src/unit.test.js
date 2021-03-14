import getRate from './getRate'
import currencyList from "./CurrencyList";
import calculate from "./Calculate"
import checkIfAble from "./checkIfAble";
import generateString from "./generateString";
import React from "react";


describe("checking arguments",()=>{
    test("all good",()=>{
        const output=checkIfAble("EUR","VES",1)
        expect(output).toBe(null)
    })
    test("no input value",()=>{
        const output=checkIfAble("EUR","VES","")
        expect(output[0]).toBe("No input value!")
        expect(output[1]).toBe(null)
        expect(output[2]).toBe(null)
    })
    test("wrong input value (NaN)",()=>{
        const output=checkIfAble("EUR","VES","ShouldBeANumber")
        expect(output[0]).toBe("Incorrect input value!")
        expect(output[1]).toBe(null)
        expect(output[2]).toBe(null)
    })
    test("wrong input value (Negative)",()=>{
        const output=checkIfAble("EUR","VES",-1)
        expect(output[0]).toBe("Incorrect input value!")
        expect(output[1]).toBe(null)
        expect(output[2]).toBe(null)
    })
    test("Incorrect currencies",()=>{
        const output1=checkIfAble("AAA","PLN",1)
        const output2=checkIfAble("PLN","AAA",1)
        expect(output1[0]).toBe(null)
        expect(output1[1]).toBe("Currency not found!")
        expect(output1[2]).toBe(null)
        expect(output2[0]).toBe(null)
        expect(output2[1]).toBe(null)
        expect(output2[2]).toBe("Currency not found!")
    })
    test("Multiple errors",()=>{
        const output=checkIfAble("AAA","AAAA","")
        expect(output[0]).toBe("No input value!")
        expect(output[1]).toBe("Currency not found!")
        expect(output[2]).toBe("HTTP request failed!")
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

    //The following test may take a long time to be completed
    //It's advised to keep it commented out most of the time

    // test("check if all currencies on the list are valid",()=>{
    //     for(var i=0;i<currencyList.length;i++){
    //         const rate=getRate(currencyList[i])
    //         expect(rate).not.toBeNaN();
    //     }
    // })
})

describe("check string generator",()=>{
    test("correct example",()=>{
        var rates=new Map()
        rates.set("EUR",4)
        rates.set("PLN",1)
        const string=generateString("EUR","PLN",rates)
        expect(string).toBe("1 EUR = 4.00 PLN")
    })
    test("missing currency",()=>{
        var rates=new Map()
        rates.set("EUR",4)
        const string=generateString("EUR","PLN",rates)
        expect(string).toBe("")
    })
})

describe("calculation procedure",()=> {
    test("check math", () => {
        const v1 = 2
        const r1 = getRate("EUR")
        expect(r1).not.toBeNaN();
        const r2 = getRate("VES")
        expect(r2).not.toBeNaN();
        const output = calculate(r1,r2, v1)
        expect(output).toBe((v1 * r1 / r2).toFixed(2))
    })
})