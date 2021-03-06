import ccxt from 'ccxt'
import CryptoJS from 'crypto-js'
import { REACT_APP_USER1_APIKEY, REACT_APP_USER1_SECRET } from '../config'

const ftx_exchange = new ccxt.ftx({
  apiKey: REACT_APP_USER1_APIKEY,
  secret: REACT_APP_USER1_SECRET,
  timeout: 15000,
  enableRateLimit: true,
})




// log出來的function可以直接call 如底下getPosition
export const getAllImplicitApiMethods = () => {
  return //console.log (ftx_exchange)
}

export const getExchageId = () => {
  return ftx_exchange.id
}

export const getExchangeName = () => {
  return ftx_exchange.name
}

export const getExchangeTime = () => {
  return ftx_exchange.iso8601(ftx_exchange.milliseconds())
}

export const getMarkets = () => {
  return ftx_exchange.loadMarkets()
}

//獲取交易對數據
export const getTicker = (symbol) => {
  if (!symbol) return
  return ftx_exchange.fetchTicker(symbol)
}

//查詢餘額
export const getBalance = () => {
  return ftx_exchange.fetchBalance()
}

//查詢現在合約倉位資訊
export const getPosition = () => {
  return ftx_exchange.fetch_positions()
}

//取得帳戶資訊,裡面有很多資料
export const getAccount = () => {
  return ftx_exchange.private_get_account()
}

//改變槓桿值
export const changeLeverage = (userLeverage) => {
  ftx_exchange.private_post_account_leverage({
    leverage: userLeverage,
  })
}

//市價買賣單
//amount 開的數量
//(保證金*槓桿 )/ 現在的幣價  = 最大可開的數量，最大可開數量 乘上 你要的開倉輸入的%數 就是開倉數量(amount)
export const marketOrder = (symbol, side, amount) => {
  ftx_exchange.createOrder(symbol, 'market', side, amount)
}

//取交易
export const getMyTrades = () => {
  return ftx_exchange.fetch_my_trades()
}
export const getMyProfitData = async (method, endPoint) => {
  const HOST_NAME = "https://ftx.com"
  const FTX_TS = new Date().getTime()
  // example 1622872674069 + 'GET' + '/api/pnl/historical_changes'
  var payload = FTX_TS + method.toUpperCase() + endPoint
  const FTX_SIGN = CryptoJS.HmacSHA256(payload, REACT_APP_USER1_SECRET).toString(CryptoJS.enc['Hex'])
  const FTX_KEY = REACT_APP_USER1_APIKEY
  var url = HOST_NAME + endPoint
  const result = await fetch(url, {
    headers: {
      "FTX-TS": FTX_TS,
      "FTX-SIGN": FTX_SIGN,
      "FTX-KEY": FTX_KEY
    },
    method: method
  }).then(response => response.json())
    .catch(function (error) {
      console.log(error)
    })
  return result
}