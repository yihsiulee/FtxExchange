import React, { useState, useEffect, createContext } from 'react'
import { getBalance, getPosition, getAllImplicitApiMethods, getAccount, getMarkets, getOrderHistory, getMyTrades, getMyProfitData } from '../api'
import { StyledTableCell } from '../styles'
import _, { get } from 'lodash'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import moment from 'moment'


const useStyles = makeStyles({
    root: {
        // background: 'linear-gradient(55deg, #FE6B8B 20%, #FF8E53 90%)',
        background: '#888888',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
    },

});



const UserInfo = () => {
    const [balance, setBalance] = useState()
    const [position, setPosition] = useState()
    const [account, setAccount] = useState({})
    const [market, setMarket] = useState({})
    const [mytrades, setMyTrades] = useState({}) //本日交易明細
    const [recentProfit, setRecentProfit] = useState({})// 近期損益
    const [todayProfit, setTodayProfit] = useState({}) // 本日損益
    // const [weekProfit, setWeekProfit] = useState({}) // 近七日損益
    const [profitDetail, setProfitDetail] = useState({})// 近期損益明細

    useEffect(() => {
        const getBalanceData = async () => {
            const balanceData = await getBalance()
            setBalance(balanceData)
        }
        getBalanceData()
    }, [])

    useEffect(() => {
        const getPositionData = async () => {
            const positionData = await getPosition()
            setPosition(positionData)
        }
        getPositionData()
    }, [])

    useEffect(() => {
        const getAccountData = async () => {
            const accountData = await getAccount()
            setAccount(accountData)
        }
        getAccountData()
    }, [])

    useEffect(() => {
        const getMarketData = async () => {
            const marketData = await getMarkets()
            setMarket(marketData)
        }
        getMarketData()
    }, [])
    useEffect(() => {
        const getMytradesData = async () => {
            const myTradesData = await getMyTrades()
            // GMT+0
            var post = Object.values(myTradesData).filter((item) => { return item["datetime"].substr(0, 10) == '2021-06-04' })

            // GMT+8
            // var post = Object.values(myTradesData).filter((item) => {return moment(parseInt(item["timestamp"])).format('YYYY-MM-DD HH:mm:ss').substr(0,10) =='2021-06-04'})

            console.log(post)
            var total_sell = 0
            var total_buy = 0

            post.map((item) => {
                if (item["side"] === 'sell') {
                    // console.log("sell " +  item["cost"])
                    total_sell += item["cost"]
                } else {
                    // console.log("buy " +  item["cost"])
                    total_buy += item["cost"]
                    // total_buy += item["cost"] * 0.0007
                }
                //手續費
                // total_buy += item["cost"] * 0.0007
            })
            // post.map((item)=> console.log(moment(parseInt(item["timestamp"])).format('YYYY-MM-DD HH:mm:ss')))

            console.log("SELL: " + total_sell)
            console.log("BUY: " + total_buy)

            setMyTrades(myTradesData)
        }
        getMytradesData()
    }, [])

    // FTX API get recent profit
    useEffect(() => {
        const getmyProfit = async () => {
            const profitData = await getMyProfitData('GET', '/api/pnl/historical_changes')
            const todayDate = (new Date()).toISOString().substring(0, 10)

            var recentProfit = []
            var todayProfit
            var profitDetail = []

            Object.entries(profitData["result"]["pnlByDay"]).map((profit_object) => {
                const date = moment(parseInt(profit_object[0] * 1000)).format('YYYY-MM-DD')
                // 計算每日損益總額(以各幣別加總)
                var dayProfit = 0;
                Object.values(profit_object[1]).map((profit) => dayProfit += profit)
                recentProfit.push({ [date]: dayProfit })

                // 本日損益
                if (date === todayDate)
                    todayProfit = dayProfit

                // 損益明細
                profitDetail.push({ [date]: profit_object[1] })
            });

            console.log(recentProfit)
            console.log(todayProfit)
            console.log(profitDetail)

            setRecentProfit(recentProfit)
            setTodayProfit(todayProfit)
            setProfitDetail(profitDetail)
        }
        getmyProfit()
    }, [])

    const classes = useStyles();

    return (
        <TableContainer>
            <Table className={classes.root} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>帳號資訊</StyledTableCell>
                        <StyledTableCell>帳號總值</StyledTableCell>
                        <StyledTableCell>帳號餘額</StyledTableCell>
                        <StyledTableCell>已使用</StyledTableCell>
                        <StyledTableCell>已開倉%數</StyledTableCell>
                        <StyledTableCell>本日獲利</StyledTableCell>
                        <StyledTableCell>本週獲利</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow >
                        <StyledTableCell>{_.get(account, 'result.username', 0)}</StyledTableCell>
                        <StyledTableCell align="right">{_.get(account, 'result.totalAccountValue', 0)}</StyledTableCell>
                        <StyledTableCell align="right">{_.get(balance, 'USD.free', 0)}</StyledTableCell>
                        <StyledTableCell align="right">{_.get(balance, 'used.USD', 0)}</StyledTableCell>
                        <StyledTableCell align="right">{(_.get(balance, 'used.USD', 0) / _.get(account, 'result.totalAccountValue', 0) * 100).toFixed(2)}%</StyledTableCell>
                        <StyledTableCell align="right">{_.get(account, 'result.username',9)}</StyledTableCell>
                        <StyledTableCell align="right">{_.get(account, 'result.username', 0)}</StyledTableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
        // <div></div>
    );
}
export default UserInfo