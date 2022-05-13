import {MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material"

type CurrencyInputProps={
    currencies:string[],
    value:string,
    currency:string,
    onValueChange:(firstValue:string)=>void,
    onCurrencyChange:(firstCurrency:string)=>void
}

const CurrencyInput = (props:CurrencyInputProps) =>{
    
    const valueHandleChange = (event:React.ChangeEvent<HTMLInputElement>) =>{
        //Checks for validity of entered values
        props.onValueChange(event.target.value.replace(/[^.\d]+/g,"").replace( /^([^.]*\.)|\./g, '$1' ))
    }
    const currencyHandleChange = (event:SelectChangeEvent<string>) =>{
        props.onCurrencyChange(event.target.value)
    }

    return (<div className="group">
            <Select sx={{mb:2}} value={props.currency} onChange={currencyHandleChange}>
                {props.currencies.map((currency:string,i)=>{
                    return <MenuItem key={i} value={currency}>{currency}</MenuItem>
                })}
            </Select>
            <TextField color='secondary' variant={'filled'} value={props.value} onChange={valueHandleChange}/>
    </div>)
}

export default CurrencyInput