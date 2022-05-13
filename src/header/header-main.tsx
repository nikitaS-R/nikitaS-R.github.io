import { useEffect, useState } from 'react';
import { InputLabel } from '@mui/material';
import axios from 'axios';
import './header.css';

const ConverterAppBar = () =>{
    const [eurValute,setEURValute] = useState<number>(0);
    const [usdValute,setUSDValute] = useState<number>(0);

    useEffect(()=>{
        getCurrencyValutes()
    },[])

    const getCurrencyValutes = () =>{
        axios.get('https://v6.exchangerate-api.com/v6/2079ba2df941d7835322905f/latest/USD').then(response=>{
           const usdValute:number = response.data.conversion_rates.UAH.toFixed(2)
           setUSDValute(usdValute)
        })
        axios.get('https://v6.exchangerate-api.com/v6/2079ba2df941d7835322905f/latest/EUR').then(response=>{
            const eurValute:number = response.data.conversion_rates.UAH.toFixed(2)
            setEURValute(eurValute)
        })
    }
    
    return(
        <header className={'appBar-header'}>
           <div className={'logo-image'}>
                <img src='app-logo.png' alt={'logo'} width={'50'} height={'50'}/>
                <label>Currency Converter</label>
           </div>
           <div className='valutes'>
               <div className='valutes-content'>
                    <img src='america-flaq.png' alt={'logo'} width={'20'} height={'20'}/>
                    <InputLabel style={{color:'white'}}>USD →&nbsp;</InputLabel>
                    <img src='ukraine-flaq.png' alt={'logo'} width={'20'} height={'20'}/>
                    <InputLabel style={{color:'white'}}>UAH : {usdValute}</InputLabel>
               </div>
               <div className='valutes-content'>
                    <img src='european-flaq.png' alt={'logo'} width={'20'} height={'20'}/>
                    <InputLabel style={{color:'white'}}>EUR →&nbsp;</InputLabel>
                    <img src='ukraine-flaq.png' alt={'logo'} width={'20'} height={'20'}/>
                    <InputLabel style={{color:'white'}}>UAH : {eurValute}</InputLabel>
               </div>
           </div>
        </header>
      )
}


export default ConverterAppBar