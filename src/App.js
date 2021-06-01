import React, { useState, useEffect } from 'react'
import './App.css'
import { REACT_APP_USER1_APIKEY, REACT_APP_USER1_SECRET } from './config'
import { getMarkets, getTicker, changeLeverage, getAccount} from './api'
import { useSelectStyles } from './styles'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import moment from 'moment'
import Open from './components/open'
import Close from './components/close'
import User from './components/user'
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider'
import _ from 'lodash'
function App() {
  console.log('user1:', REACT_APP_USER1_APIKEY, REACT_APP_USER1_SECRET)
  const [markets, setMarkets] = useState({}) //市場上所有的幣別
  const [symbol, setSymbol] = useState('') // symbol代表幣別 e.g. ETH/BTC, LTC/BTC
  const [ticker, setTicker] = useState({})
  const [slideValue, setSlideValue] = useState('10')
  const [account, setAccount] = useState({})
  const leverageMarks = [
    {
      value: 1,
      label: '1x',
    },
    {
      value: 50,
      label: '50x',
    },
    {
      value: 101,
      label: '101x',
    },
  ]
  // 初始化拿到市場資料
  useEffect(() => {
    const init = async () => {
      const marketsData = await getMarkets()
      setMarkets(marketsData)
      const accountData = await getAccount()
      setAccount(accountData)
    }
    init()
    // setSlideValue(_.get(account,'result.leverage',3))
  }, [])

  // 當幣別改變時,拿幣的ticker
  useEffect(() => {
    const getTickerData = async () => {
      const tickerData = await getTicker(symbol)
      setTicker(tickerData)
    }
    getTickerData()
  }, [symbol])

    
    
 

  //調整槓桿倍率
  const handleChangeSlide = (event, newValue) => {
    setSlideValue(newValue)
    // changeLeverage(slideValue)
  }
  
  //選幣別時,把選項存起來,底線是他會傳兩個參數,可是只用的到第二個,第一格就可以放底線
  const handleChangeSymbol = (_, value) => {
    setSymbol(value?.id)
  }

  return (
    
    <div className="h-screen w-screen flex  bg-darkblue">
      <div className="w-1/2  justify-items-center rounded-xl p-4 space-y-2 m-auto bg-lightblue">
        <div className="flex items-center">
          <span className="text-white text-lg mr-5 font-bold">獲取時間:</span>
          <span className="text-white">{moment(parseInt(ticker?.timestamp)).format('YYYY-MM-DD HH:mm:ss')}</span>
          {console.log(account)}

        
        </div>

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
            onChange={handleChangeSymbol} //改變時call
          />
        </div>

        <div className="flex items-center">
          <span className="text-white text-lg mr-5 font-bold">幣價:</span>
          <span className="text-white">{ticker?.last}</span>
        </div>

        <div className="flex items-center">
        <span className="text-white text-lg mr-5 font-bold">
          <div className="flex items-center">
            <span className="mr-5">槓桿倍數:</span>
            <Typography id="discrete-slider-custom">{`leverage: ${slideValue}x`}</Typography>
          </div>
          <div>
            {console.log("L:",_.get(account,'result.leverage',3),"X;",slideValue)}
            <Slider
              style={{ width: 300 }}
              defaultValue={10}
              onChange={handleChangeSlide}
              aria-labelledby="discrete-slider-custom"
              step={1}
              valueLabelDisplay="auto"
              marks={leverageMarks}
            />
          </div>
        </span>
      </div>

        {/* 開倉參數 */}
        <Open />

        {/* 平倉參數 */}
        <Close />

        {/* user顯示 */}
        <User />
      </div>
    </div>
  )
}

export default App
