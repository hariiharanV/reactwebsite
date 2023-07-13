import './App.css'
import Convert from './Convert'
import {useEffect, useState} from 'react'

const base_url = "https://v6.exchangerate-api.com/v6/9f22f7f4041d085a91f3df7e/latest/USD"

const conversion_url = "https://v6.exchangerate-api.com/v6/9f22f7f4041d085a91f3df7e/pair"

function App() {

  const [currencies,setCurrencies] = useState([])
  const [fromCurrency, setFromCurrency] = useState()
  const[toCurrency,setToCurrency] = useState()
  const [currValue, setCurrValue] = useState()

  const [result, setResult] = useState()

 // console.log(currencies)

  useEffect(()=>{
    console.log('calling API')
    fetch(base_url)
    .then(res => res.json())
    .then(data => {setCurrencies([...Object.keys(data.conversion_rates)])
                  setFromCurrency(Object.keys(data.conversion_rates)[0])
                  setToCurrency(Object.keys(data.conversion_rates)[1]) 
                })
  },[])

  useEffect(()=>{
   
    try{
      if(currValue !=null)
      {
      const get_rates = `${conversion_url}/${fromCurrency}/${toCurrency}/${currValue}`
      console.log(get_rates)
      fetch(get_rates)
      .then(res=>res.json())
      .then(data => setResult(data.conversion_result))
      }
    }catch(err){
      console.log(err)
    }

  },[currValue,fromCurrency,toCurrency])


  const currency1Handler = (e) =>{

    setCurrValue(e.target.value)
  }


  return (
    <>
      <h2> Currency<span> Converter</span></h2> 
      <div className="card my-2">
      <div className="card-body my-4">
      <Convert getCurr ={currencies} setCurrency={fromCurrency} getCurrency1={currency1Handler} changeCurrency={e=>{setFromCurrency(e.target.value)}}/>
      <h3 className="equals">=</h3>
      <Convert getCurr ={currencies} setCurrency={toCurrency} changeCurrency={e=>{setToCurrency(e.target.value)}} getResult={result}/>
      </div>
      </div>
    </>
  )
}

export default App
