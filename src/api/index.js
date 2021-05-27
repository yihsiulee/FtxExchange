import ccxt from 'ccxt'

const ftx_exchange = new ccxt.binance({
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
