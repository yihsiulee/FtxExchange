import React, { useState, useEffect } from 'react'
import { getBalance, getAccount } from '../api'

const User = () => {
  const [balance, setBalance] = useState()
  const [account, setAccount] = useState()

  

  useEffect(()=>{
    const getBalanceData = async() => {
      const balanceData = await getBalance()
      setBalance(balanceData)
    }
    getBalanceData()
  },[])

  useEffect(()=>{
    const getAccountData = async() => {
      const accountData = await getAccount()
      setAccount(accountData)
    }
    getAccountData()
  },[])

  return (
    <div className="space-y-2">
      <div className="flex items-center">
        <span className="text-red-600 text-lg mr-5 font-bold">使用者帳號資訊:</span>
      </div>
      
      <div className="flex items-center">
        <span className="text-white text-lg mr-5 font-bold">測試用餘額:{balance.USD.free}</span>
        {console.log(balance)}
        
      </div>

      <div className="flex items-center">
        <span className="text-white text-lg mr-5 font-bold">帳號名稱:</span>
      </div>
      
      <div className="flex items-center">
        <span className="text-white text-lg mr-5 font-bold">盈虧%數:</span>
        
      </div>

      <div className="flex items-center">
        <span className="text-white text-lg mr-5 font-bold">盈虧金額:</span>
        
      </div>

      <div className="flex items-center">
        <span className="text-white text-lg mr-5 font-bold">已開倉%數:</span>
        
      </div>
      
      <div className="flex items-center">
        <span className="text-white text-lg mr-5 font-bold">本週獲利:</span>
        
      </div>
      
      
    </div>
  )
}
export default User
