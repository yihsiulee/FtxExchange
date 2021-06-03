import React, { useEffect, useState } from 'react'
import { InputTextField } from '../styles'
import Button from '@material-ui/core/Button'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import { marketOrder, getAccount} from '../api'
import _ from 'lodash'


const Open = () => {
  const [selectedValue, setSelectedValue] = useState('buy')
  const [inputValue, setInpuValue] = useState('')
  const [symbol, setSymbol] = useState('')
  const [account, setAccount] = useState({})
  const [freeCollateral, setFreeCollateral] =useState(0)
  const [slideValue, setSlideValue] = useState(1)
  const [amout, setAmount] = useState(0)
  
  
  useEffect(() => {
    const getAccountData = async () => {
      const accountData = await getAccount()
      setAccount(accountData)
    }
    getAccountData()
  }, [])

  //取得可用資金
  useEffect(() => {
    let collateral = _.get(account, 'result.freeCollateral', 0)
    setFreeCollateral(parseInt(collateral))
  }, [account])

  //取得槓桿
  useEffect(() => {
    let leverage = _.get(account, 'result.leverage', 1)
    setSlideValue(parseInt(leverage))
    console.log(slideValue)
  }, [account])

  const handleChangeSelect = (event) => {
    setSelectedValue(event.target.value)
  }
  const handleChangeInput = (event) => {
    setInpuValue(event.target.value)
  }

  //(可用保證金*槓桿 )/ 現在的幣價  = 最大可開的數量，最大可開數量 乘上 你要的開倉輸入的%數 就是開倉數量(amount)
  const countAmount =() =>{
    let num = ((freeCollateral*slideValue)/"現在的幣價") * (inputValue/100)
    setAmount(num)
  }

  const handleButtonClick = () => {
    console.log("多空:",selectedValue,"幾趴:",inputValue/100)
    console.log(account)
    // marketOrder(symbol, selectedValue, amount)
    // marketOrder("BTC-PERP", selectedValue, 0.001)
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center">
        <span className="text-red-600 text-lg mr-5 font-bold">開倉參數:</span>
      </div>
      <div className="flex items-center">
        <span className="text-white text-lg mr-5 font-bold">
          <span className="mr-5">多空倉切換:</span>
          <span>{selectedValue}</span>
          <div>
            <FormControl component="fieldset">
              <FormLabel component="legend"></FormLabel>
              <RadioGroup
                row
                defaultValue="buy"
                aria-label="多空"
                name="longOrShort"
                value={selectedValue}
                onChange={handleChangeSelect}
              >
                <FormControlLabel value="buy" control={<Radio />} label="buy" />
                <FormControlLabel value="sell" control={<Radio />} label="sell" />
              </RadioGroup>
            </FormControl>
          </div>
        </span>
      </div>
      {/* <div className="flex items-center">
        <span className="text-white text-lg mr-5 font-bold">開倉時間:</span>
        <InputTextField label="time" variant="outlined" color="primary" size="small" />
      </div> */}
      <div className="flex items-center">
        <span className="text-white text-lg mr-5 font-bold">開倉數量:</span>
        {/* TODO:設定filter 1-100% */}
        <InputTextField 
          label="開倉%數" 
          variant="outlined" 
          size="small" 
          // value={inputValue}
          onChange={handleChangeInput}
          InputProps={{
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
          }}
          
        />
        {/* {console.log(inputValue)} */}
      </div>
      
      <div className="flex items-center">
        {/* TODO: 發送交易request給ftx */}
        <Button
          onClick ={handleButtonClick}
          size="small"
          variant="contained"
          color="primary"
        >
          confirm
        </Button>
      </div>
    </div>
  )
}
export default Open
