import React, { useState, useEffect } from 'react'
import './App.css'
import { REACT_APP_USER1_APIKEY, REACT_APP_USER1_SECRET } from './config'
import { getMarkets, getTicker } from './api'
import { useSelectStyles } from './styles'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'

function App() {
  console.log('user1:', REACT_APP_USER1_APIKEY, REACT_APP_USER1_SECRET)
  const [markets, setMarkets] = useState({})
  const [symbol, setSymbol] = useState('') // symbol代表幣別 e.g. ETH/BTC, LTC/BTC
  const [ticker, setTicker] = useState({})

  // 初始化拿到市場資料
  useEffect(() => {
    const init = async () => {
      const marketsData = await getMarkets()
      setMarkets(marketsData)
    }
    init()
  }, [])

  // 當幣別改變時,拿幣的ticker
  useEffect(() => {
    const getTickerData = async () => {
      const tickerData = await getTicker(symbol)
      setTicker(tickerData)
    }
    getTickerData()
  }, [symbol])

  //選幣別時,把選項存起來
  const handleChangeSymbol = (_, value) => {
    setSymbol(value?.id)
  }
  return (
    <div className="h-screen w-screen flex  bg-darkblue">
      <div className="w-1/2 h-2/3 justify-items-center rounded-xl p-4 space-y-2 m-auto bg-lightblue">
        <div className="flex items-center">
          <span className="text-white text-lg mr-5 font-bold">幣別:</span>
          <Autocomplete
            options={Object.keys(markets).map((key) => {
              return { id: key, ...markets[key] }
            })}
            classes={useSelectStyles()}
            getOptionLabel={(option) => option.id}
            getOptionSelected={(option, value) => option.id === value.id}
            style={{ width: 300 }}
            renderInput={(params) => <TextField {...params} variant="outlined" size="small" />}
            onChange={handleChangeSymbol}
          />
        </div>

        <div className="flex items-center">
          <span className="text-white text-lg mr-5 font-bold">幣價:</span>
          <span className="text-white">{ticker?.last}</span>
        </div>
      </div>
    </div>
  )
}

export default App
