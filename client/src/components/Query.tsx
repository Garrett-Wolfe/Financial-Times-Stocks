import { useState, useEffect } from 'react'
import { Input } from "./ui/input"
import { Search, Briefcase, User } from "lucide-react"
import { Line, LineChart, ResponsiveContainer } from 'recharts'
import { Button } from "./ui/button"
import ftLogo from '../assets/ft_logo.jpg';


const dummyData = [
  { ticker: "AAPL", price: 182.52, change: 1.87, percentChange: 1.04 },
  { ticker: "MSFT", price: 338.11, change: -0.89, percentChange: -0.26 },
  { ticker: "GOOGL", price: 131.86, change: 2.34, percentChange: 1.81 },
  { ticker: "AMZN", price: 129.33, change: -1.67, percentChange: -1.28 },
  { ticker: "NVDA", price: 410.17, change: 8.23, percentChange: 2.05 },
  { ticker: "META", price: 298.12, change: -3.88, percentChange: -1.29 },
  { ticker: "TSLA", price: 257.71, change: 5.21, percentChange: 2.06 },
  { ticker: "JPM", price: 147.19, change: -0.81, percentChange: -0.55 },
]

const generateChartData = () => {
  return Array.from({ length: 20 }, (_, i) => ({
    time: i,
    value: Math.random() * 100
  }))
}

export default function QueryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [stockData, setStockData] = useState(dummyData.map(stock => ({ ...stock, chartData: generateChartData() })))

  useEffect(() => {
    const interval = setInterval(() => {
      setStockData(prevData => prevData.map(stock => ({
        ...stock,
        chartData: generateChartData()
      })))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const filteredData = stockData.filter(stock => 
    stock.ticker.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen p-8" style={{
      fontFamily: 'Escrow, serif',
      backgroundColor: 'rgb(235, 206, 196)',
      backgroundSize: 'cover',
      backgroundRepeat: 'repeat',
    }}>
      <div className="max-w-3xl mx-auto bg-white bg-opacity-90 shadow-lg rounded-lg overflow-hidden border border-pink-300">
        <div className="p-6 bg-gradient-to-r from-pink-200 to-pink-100 border-b border-pink-300">
          <div className="flex justify-between items-center mb-4">
            <Briefcase className="text-pink-800 cursor-pointer hover:text-pink-600 transition-colors" size={24} />
            <img src={ftLogo} alt="FT Logo" className="h-14 w-auto" />
            <User className="text-pink-800 cursor-pointer hover:text-pink-600 transition-colors" size={24} />
          </div>
          <div className="relative">
            <Input
              type="text"
              placeholder="Search for a stock ticker..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white bg-opacity-75"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-400" size={20} />
          </div>
        </div>
        <div className="bg-pink-50 bg-opacity-75 p-6 space-y-4">
          {filteredData.map((stock) => (
            <div 
              key={stock.ticker} 
              className="flex items-center justify-between p-4 bg-white bg-opacity-90 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 ease-in-out cursor-pointer group hover:py-6"
            >
              <div className="flex items-center space-x-4 flex-grow mr-4">
                <span className="text-xl font-bold text-pink-800 w-20">{stock.ticker}</span>
                <div className="flex-grow h-12" >
                  <ResponsiveContainer width="94%" height="100%">
                    <LineChart data={stock.chartData}>
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke={stock.percentChange >= 0 ? "#10B981" : "#EF4444"}
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="text-right w-24">
                <p className="text-lg font-bold text-pink-800">${stock.price.toFixed(2)}</p>
                <p className={`text-sm font-medium ${stock.percentChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {stock.change > 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.percentChange > 0 ? '+' : ''}{stock.percentChange.toFixed(2)}%)
                </p>
              </div>
              <div className="w-0 group-hover:w-20 overflow-hidden transition-all duration-300 ease-in-out">
                <Button className="ml-4 bg-pink-500 hover:bg-pink-600 text-white rounded-full px-4 py-2 text-sm font-medium">
                  Buy
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
