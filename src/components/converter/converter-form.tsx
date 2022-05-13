import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import CurrencyInput from "./converter-input";
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import axios from "axios";

type RateType={
    [currency:string]:number
}

const ConverterForm = () =>{
    const [firstValue,setFirstValue] = useState<string>('')
    const [secondValue,setSecondValue] = useState<string>('')
    const [firstCurrency,setFirstCurrency] = useState<string>('USD')
    const [secondCurrency,setSecondCurrency] = useState<string>('UAH')
    const [rates,setRates] = useState<RateType>({})
    
    useEffect(()=>{
        axios.get('https://v6.exchangerate-api.com/v6/2079ba2df941d7835322905f/latest/EUR')
        .then((response) => {
            setRates(response.data.conversion_rates)
      })
    },[])
    //rounding value to 4 digits
    const format = (number:number) => {
        return (number.toFixed(4)).toString();
    }
    
    const handleFirstValueChange = (value:string) =>{
        if(value !== '' && value !== '.')
            setSecondValue(format(parseFloat(value) * rates[secondCurrency] / rates[firstCurrency]))
        else setSecondValue('')
        setFirstValue(value)
    }
    const handleFirstCurrencyChange = (currency:string) =>{
        if(firstValue !== '' && firstValue !== '.')
            setSecondValue(format(parseFloat(firstValue) * rates[secondCurrency] / rates[currency]))
        setFirstCurrency(currency)
    }
    const handleSecondValueChange = (value:string) =>{
        if(value !== '' && value !== '.')
            setFirstValue(format(parseFloat(value) * rates[firstCurrency] / rates[secondCurrency]))
        else setFirstValue('')
        setSecondValue(value)
    }
    const handleSecondCurrencyChange = (currency:string) =>{
        if(secondValue !== '' && secondValue !== '.')
            setFirstValue(format(parseFloat(secondValue) * rates[firstCurrency] / rates[currency]))
        setSecondCurrency(currency)
    }
    const onFlipCurrenciesClick =()=>{
        handleFirstValueChange(secondValue)
        handleSecondValueChange(firstValue)
        setFirstCurrency(secondCurrency)
        setSecondCurrency(firstCurrency)
    }
    return(
        <div>
            <div className="converter-form-title">
                <label>Currency Converter</label>
                <img src="handshake.png" width={50} height={50} alt="exchange"/>
            </div>
            <div className="converter-form-inputs">
                <CurrencyInput 
                    currencies={Object.keys(rates)} 
                    onValueChange={handleFirstValueChange} 
                    onCurrencyChange={handleFirstCurrencyChange} 
                    value={firstValue} 
                    currency={firstCurrency}
                />
                <IconButton size="large" onClick={onFlipCurrenciesClick}>
                    <SwapHorizIcon fontSize="large"/>
                </IconButton>
                <CurrencyInput 
                    currencies={Object.keys(rates)} 
                    onValueChange={handleSecondValueChange}  
                    onCurrencyChange={handleSecondCurrencyChange} 
                    value={secondValue}
                    currency={secondCurrency}
                />
            </div>
        </div>
    )
}

export default ConverterForm;