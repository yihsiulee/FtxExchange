import React, { useState, useEffect } from 'react'
import './App.css'
import { REACT_APP_USER1_APIKEY, REACT_APP_USER1_SECRET } from './config'
import { getMarkets, getTicker } from './api'
import { useSelectStyles, useSlideStyles } from './styles'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import moment from 'moment';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

function App() {
  console.log('user1:', REACT_APP_USER1_APIKEY, REACT_APP_USER1_SECRET)
  const [markets, setMarkets] = useState({}) //市場上所有的幣別
  const [symbol, setSymbol] = useState('') // symbol代表幣別 e.g. ETH/BTC, LTC/BTC
  const [ticker, setTicker] = useState({})
  const [selectedValue, setSelectedValue] = useState('long')
  const [slideValue, setSlideValue] = useState('10')
  const leverageMarks = [
    {
      value: 0,
      label: '0x',
    },
    {
      value: 50,
      label: '50x',
    },
    {
      value: 100,
      label: '100x',
    },
  ];
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

  //選幣別時,把選項存起來,底線是他會傳兩個參數,可是只用的到第二個,第一格就可以放底線
  const handleChangeSymbol = (_, value) => {
    setSymbol(value?.id)
  }
  
  const handleChangeSelect = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleChangeSlide = (event, newValue) => {
    setSlideValue(newValue);
  }

  

  return (
    <div className="h-screen w-screen flex  bg-darkblue">
      <div className="w-1/2 h-2/3 justify-items-center rounded-xl p-4 space-y-2 m-auto bg-lightblue">
        
        <div className="flex items-center">
          <span className="text-white text-lg mr-5 font-bold">獲取時間:</span>
          {console.log(ticker)}
          <span className="text-white">{moment(parseInt(ticker?.timestamp)).format("YYYY-MM-DD HH:mm:ss")}</span>
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
          <span className="text-red-600 text-lg mr-5 font-bold">開倉參數:</span>
        </div>

        <div className="flex items-center">
          <span className="text-white text-lg mr-5 font-bold">
            多空倉切換:{selectedValue}

          <div>
            <FormControl component="fieldset">
            <FormLabel component="legend"></FormLabel>
            <RadioGroup row defaultValue="long" aria-label="多空" name="longOrShort" value={selectedValue} onChange={handleChangeSelect}>
              <FormControlLabel value="long" control={<Radio />} label="long" />
              <FormControlLabel value="short" control={<Radio />} label="short" />
              
            </RadioGroup>
            </FormControl>
            </div>
        </span>

      </div>

        <div className="flex items-center">
          <span className="text-white text-lg mr-5 font-bold">開倉時間: 
            <TextField label="time" variant="outlined" color="primary" size="small"/>
          </span>
        </div>

        <div className="flex items-center">
          <span className="text-white text-lg mr-5 font-bold">開倉數量:
          
          {/* TODO:可填入的格子 */}
            <TextField label="Outlined" variant="outlined" size="small"/>
            %
          </span>
        </div>

        <div className="flex items-center">
          <span className="text-white text-lg mr-5 font-bold">槓桿倍數:
          
            <div>
              <Typography id="discrete-slider-custom" gutterBottom>
                  leverage:{slideValue}x
              </Typography>
              <Slider
                style={{ width: 300 }}
                // className={useSlideStyles()}
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

        

        <div className="flex items-center">
          {/* TODO: 發送交易request給ftx */}
          <Button onClick={() => { alert('clicked') }} size="small" variant="contained" color="primary">
              confirm
          </Button>
        </div>
      </div>
    </div>
  )
}

export default App
