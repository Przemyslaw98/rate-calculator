function generateString(c1,c2,rates){
    const r1=rates.get(c1)
    const r2=rates.get(c2)
    if(isNaN(r1)||isNaN(r2))
        return ""
    return '1 '+c1+' = '+(r1/r2).toFixed(2).toString()+' '+c2
}
export default generateString