import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import currencyList from "./CurrencyList";
import Button from "@material-ui/core/Button";
import Hidden from '@material-ui/core/Hidden';
import calculate from './Calculate'


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
    const [msg1,setMsg1]=React.useState('');
    const [msg2,setMsg2]=React.useState('');
    const [val1, setVal1] = React.useState('');
    const [val2, setVal2] = React.useState('');
    const [cur1, setCur1] = React.useState(0);
    const [cur2, setCur2] = React.useState(0);
    const handleValueChange = (event) => {
        switch(event.target.id){
            case "tf1":
                setVal1(event.target.value);
                break;
            case "tf2":
                setVal2(event.target.value);
        }
    };
    const handleCurrencyChange1 = (event) => {
        setCur1(event.target.value);
    };
    const handleCurrencyChange2 = (event) => {
        setCur2(event.target.value);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        var error=null
        switch(event.target.id){
            case "f1":
                errorClear();
                error=calculate(cur1,cur2,val1,setVal1,setVal2,setString,rates);
                if(error!==null) {
                    setError1(true)
                    setMsg1(error)
                }
                break;
            case "f2":
                errorClear();
                error=calculate(cur2,cur1,val2,setVal2,setVal1,setString,rates);
                if(error!==null) {
                    setError2(true)
                    setMsg2(error)
                }
        }
    }
    function errorClear(){
        setError1(false);
        setError2(false);
        setMsg1('');
        setMsg2('');
    }


    var list=[];
    for(var i=0;i<currencyList.length;i++)
        list.push(<MenuItem id="cl1" value={i}>{currencyList[i]}</MenuItem>);
    return (
        <div className={classes.root}>
            <form id="f1" onSubmit={handleSubmit}>
                <TextField error={error1} helperText={msg1} id="tf1" value={val1} onChange={handleValueChange} size='large' label="You send" variant="outlined"/>
                <Select id="cl1" value={cur1} onChange={handleCurrencyChange1} variant="outlined">
                    {list}
                </Select>
                <Button color='primary' variant="contained" type="submit" >Calculate</Button>
            </form>
            <br/>
            <form id="f2" onSubmit={handleSubmit}>
                <TextField error={error2} helperText={msg2} id="tf2" value={val2} onChange={handleValueChange} onSubmit={handleSubmit} size='large' label="They receive" variant="outlined"/>
                <Select id="cl2" value={cur2} onChange={handleCurrencyChange2} onSubmit={handleSubmit} variant="outlined">
                    {list}
                </Select>
                    <Button color='primary' variant="contained" type="submit">Calculate</Button>
            </form>
            {string}

            {/*<FormControl style={{minWidth: 120}} size='small' className={classes.formControl}>*/}
            {/*    <InputLabel>You send</InputLabel>*/}
            {/*    <Input/>*/}
            {/*</FormControl>*/}
            {/*<FormControl style={{minWidth: 120}} size='small'  className={classes.formControl}>*/}
            {/*    <InputLabel>Currency</InputLabel>*/}
            {/*    <Select label="Currency">*/}
            {/*        {list}*/}
            {/*    </Select>*/}
            {/*</FormControl>*/}
            {/*<br/>*/}
            {/*<FormControl size='small' className={classes.formControl}>*/}
            {/*    <InputLabel>They receive</InputLabel>*/}
            {/*    <Input/>*/}
            {/*</FormControl>*/}
            {/*<FormControl style={{minWidth: 120}} size='small' className={classes.formControl}>*/}
            {/*    <InputLabel htmlFor="input-c">Currency</InputLabel>*/}
            {/*    <Select*/}
            {/*        id="input-c"*/}
            {/*        label="Currency"*/}
            {/*    >*/}
            {/*        {list}*/}
            {/*    </Select>*/}
            {/*</FormControl>*/}
        </div>
    );
}