import ccxt from 'ccxt'

const ftx_exchange = new ccxt.ftx({
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


