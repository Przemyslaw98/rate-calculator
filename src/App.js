import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import currencyList from "./CurrencyList";
import calculate from './Calculate';
import checkIfAble from "./checkIfAble";
import generateString from "./generateString";



const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

let rates=new Map();
export const App = () => {
    const classes = useStyles();
    const [string, setString]=React.useState('');
    const [error1,setError1]=React.useState(false);
    const [error2,setError2]=React.useState(false);
    const [error3,setError3]=React.useState(false);
    const [error4,setError4]=React.useState(false);
    const [msg1,setMsg1]=React.useState('');
    const [msg2,setMsg2]=React.useState('');
    const [msg3,setMsg3]=React.useState('');
    const [msg4,setMsg4]=React.useState('');
    const [val1, setVal1] = React.useState('0.00');
    const [val2, setVal2] = React.useState('0.00');
    const [cur1, setCur1] = React.useState(0);
    const [cur2, setCur2] = React.useState(0);
    const handleValueChange = (event) => {
        var error=null
        errorClear()
        switch(event.target.id){
            case "tf1":
                setVal1(event.target.value);
                error=checkIfAble(currencyList[cur1],currencyList[cur2],event.target.value,rates)
                if(error===null){
                    console.log(rates)
                    setVal2(calculate(rates.get(currencyList[cur1]),rates.get(currencyList[cur2]),event.target.value))
                }
                else{
                    if(error[0]!==null) {
                        setError1(true)
                        setMsg1(error[0])
                    }
                    if(error[1]!==null) {
                        setError3(true)
                        setMsg3(error[1])
                    }
                    if(error[2]!==null) {
                        setError4(true)
                        setMsg4(error[2])
                    }
                    setVal2("")
                }
                break;
            case "tf2":
                setVal2(event.target.value);
                error=checkIfAble(currencyList[cur2],currencyList[cur1],event.target.value,rates)
                if(error===null){
                    console.log(rates)
                    setVal1(calculate(rates.get(currencyList[cur2]),rates.get(currencyList[cur1]),event.target.value))
                }
                else{
                    if(error[0]!==null) {
                        setError2(true)
                        setMsg2(error[0])
                    }
                    if(error[1]!==null) {
                        setError4(true)
                        setMsg4(error[1])
                    }
                    if(error[2]!==null) {
                        setError3(true)
                        setMsg4(error[2])
                    }
                    setVal1("")
                }
        }

    };
    const handleCurrencyChange1 = (event) => {
        errorClear()
        setCur1(event.target.value);
        const error=checkIfAble(currencyList[event.target.value],currencyList[cur2],val1,rates)
        if(error===null){
            setVal2(calculate(rates.get(currencyList[event.target.value]),rates.get(currencyList[cur2]),val1))
        }
        else{
            if(error[0]!==null) {
                setError1(true)
                setMsg1(error[0])
            }
            if(error[1]!==null) {
                setError3(true)
                setMsg3(error[1])
            }
            if(error[2]!==null) {
                setError4(true)
                setMsg4(error[2])
            }
            setVal2("")

        }
        setString(generateString(currencyList[event.target.value],currencyList[cur2],rates))
    };
    const handleCurrencyChange2 = (event) => {
        errorClear()
        setCur2(event.target.value);
        const error=checkIfAble(currencyList[event.target.value],currencyList[cur1],val2,rates)
        if(error===null){
            setVal1(calculate(rates.get(currencyList[event.target.value]),rates.get(currencyList[cur1]),val2))
        }
        else{
            if(error[0]!==null) {
                setError2(true)
                setMsg2(error[0])
            }
            if(error[1]!==null) {
                setError4(true)
                setMsg4(error[1])

            }
            if(error[2]!==null) {
                setError3(true)
                setMsg3(error[2])
            }
            setVal1("")
        }
        setString(generateString(currencyList[cur1],currencyList[event.target.value],rates))
    };
    function errorClear(){
        setError1(false);
        setError2(false);
        setError3(false);
        setError4(false);
        setMsg1('');
        setMsg2('');
        setMsg3('');
        setMsg4('');
    }


    var list=[];
    for(var i=0;i<currencyList.length;i++)
        list.push(<MenuItem id="cl1" value={i}>{currencyList[i]}</MenuItem>);
    return (
        <div className={classes.root}>
            <TextField error={error1} helperText={msg1} id="tf1" value={val1} onChange={handleValueChange} size='large' label="You send" variant="outlined"/>
            <FormControl error={error3}>
                <Select id="cl1" value={cur1} onChange={handleCurrencyChange1} variant="outlined">
                    {list}
                </Select>
                <FormHelperText>{msg3}</FormHelperText>
            </FormControl>
            <br/>
            <TextField error={error2} helperText={msg2} id="tf2" value={val2} onChange={handleValueChange} size='large' label="They receive" variant="outlined"/>
            <FormControl error={error4}>
                <Select id="cl2" value={cur2} onChange={handleCurrencyChange2} variant="outlined">
                    {list}
                </Select>
                <FormHelperText>{msg4}</FormHelperText>
            </FormControl>
            <br/>
            {string}
        </div>
    );
}