import ccxt from 'ccxt'
import { REACT_APP_USER1_APIKEY, REACT_APP_USER1_SECRET } from '../config'

const ftx_exchange = new ccxt.ftx({
  apiKey:REACT_APP_USER1_APIKEY,
  secret:REACT_APP_USER1_SECRET,
  timeout: 15000,
})

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

export const getAccount = () => {
  return ftx_exchange.account()
}




