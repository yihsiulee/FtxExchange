import './App.css'
import ccxt from "ccxt";

// const ftx = new ccxt.ftx({
//   'apiKey':'Bw_DclDInenaG7Yu1mGnCFjpVgI9ojAukH4FuRvA',
//   'secret':'Y9l6LK3hM_GwGUan9vxRy50pfB-ol3Z4dYHSGnSQ'}
// )
const exchange_list = ccxt.exchanges
// 初始化交易所 現在用binance 改成 ftx會抓不到資料 可以測試去看log寫啥
const ftx_exchange = new ccxt.binance({
    'timeout': 15000,
    // 'enableRateLimit': True,
})

console.log('交易所id：', ftx_exchange.id)
console.log('交易所名稱：', ftx_exchange.name)

// 載入市場數據
const ftx_markets = ftx_exchange.loadMarkets()
// 支持的交易對
const ttt = ftx_markets['ADA/ETH']
console.log(ftx_markets)
console.log("a",ttt)

function App() {
  return (
    <div className="App">
      {exchange_list}
      <h1>交易所id：{ftx_exchange.id}</h1>
      <h1>交易所名稱：{ftx_exchange.name}</h1>
      <h1>交易所當前時間：{ftx_exchange.iso8601(ftx_exchange.milliseconds())}</h1>
      <h1>hello world</h1>
      
    </div>
  )
}

export default App
