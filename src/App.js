import './App.css'
import {
  REACT_APP_USER1_APIKEY,
  REACT_APP_USER1_SECRET,
  REACT_APP_USER2_APIKEY,
  REACT_APP_USER3_APIKEY,
  REACT_APP_USER2_SECRET,
  REACT_APP_USER3_SECRET,
} from './config'
import { getExchageId, getExchangeName, getExchangeTime } from './api'

function App() {
  console.log('user1:', REACT_APP_USER1_APIKEY, REACT_APP_USER1_SECRET)
  console.log('user2:', REACT_APP_USER2_APIKEY, REACT_APP_USER2_SECRET)
  console.log('user3:', REACT_APP_USER3_APIKEY, REACT_APP_USER3_SECRET)

  return (
    <div className="container h-screen flex">
      <div className="w-1/2 h-2/3 border-2 justify-items-center rounded-xl p-4 space-y-2 m-auto bg-gray-100">
        <div className="text-base font-bold text-3xl">FtxExChange</div>
        <div className="flex items-center">
          交易所ID:
          <div>
            <div className="bg-green-300 rounded-md p-1">{getExchageId()}</div>
          </div>
        </div>
        <div className="flex items-center ">
          交易所名稱:
          <div>
            <div className="bg-red-100 rounded p-1">{getExchangeName()}</div>
          </div>
        </div>
        <div className="flex items-center">
          交易所時間:
          <div>
            <div className="bg-yellow-50 rounded p-1">{getExchangeTime()}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
