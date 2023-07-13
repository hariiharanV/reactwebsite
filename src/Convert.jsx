import {useState} from 'react'


function Convert(props)
{

    const currencies = props.getCurr;

    const currency_value = props.setCurrency;


    return <>

        <input className="number" value={props.getResult} onChange={props.getCurrency1} type="number"></input>
        <select onChange={props.changeCurrency} value={currency_value}> 
         {currencies.map(curr =>{         
          return <option key={curr} > {curr}</option>
        })
        }
        </select>

    </>
}


export default Convert