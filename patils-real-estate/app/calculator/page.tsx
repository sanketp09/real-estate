'use client'

import { useState } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

export default function CalculatorPage() {
  const [principal, setPrincipal] = useState(5000000)
  const [rate, setRate] = useState(8.5)
  const [years, setYears] = useState(20)
  const [showAllYears, setShowAllYears] = useState(false)

  const formatCurrency = (val: number) => `₹${val.toLocaleString('en-IN')}`

  // Calculations
  const r = rate / 12 / 100
  const n = years * 12
  const emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
  const totalPayment = emi * n
  const totalInterest = totalPayment - principal

  const data = [
    { name: 'Principal', value: principal },
    { name: 'Interest', value: totalInterest },
  ]
  const COLORS = ['#2F4156', '#567C8D']

  // Amortization Schedule
  const schedule = []
  let balance = principal
  for (let year = 1; year <= years; year++) {
    let interestForYear = 0
    let principalForYear = 0
    for (let month = 1; month <= 12; month++) {
      const interest = balance * r
      const principalPaid = emi - interest
      interestForYear += interest
      principalForYear += principalPaid
      balance -= principalPaid
    }
    schedule.push({
      year,
      principal: principalForYear,
      interest: interestForYear,
      balance: balance > 0 ? balance : 0,
    })
  }

  return (
    <main className="pt-24 min-h-screen bg-[var(--beige)]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="font-cormorant font-semibold text-5xl md:text-6xl text-[var(--navy)] mb-4 text-center">EMI Calculator</h1>
        <p className="font-dm text-[var(--navy)]/70 font-medium mb-16 text-center max-w-2xl mx-auto">
          Plan your property investment with our precise EMI calculator. Adjust the sliders below to see your estimated monthly payments and amortization schedule.
        </p>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Controls */}
          <div className="w-full lg:w-1/2 space-y-12 bg-[var(--white)] border border-[var(--rule)] p-10 shadow-sm">
            <div>
              <div className="flex justify-between mb-4">
                <label className="font-dm font-bold text-[var(--navy)] uppercase tracking-widest text-sm">Loan Amount</label>
                <span className="font-cormorant font-bold text-2xl text-[var(--teal)]">{formatCurrency(principal)}</span>
              </div>
              <input 
                type="range" 
                min="1000000" 
                max="200000000" 
                step="100000" 
                value={principal}
                onChange={(e) => setPrincipal(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between mt-2 font-dm text-xs font-bold text-[var(--navy)]/50">
                <span>₹10 L</span>
                <span>₹20 Cr</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-4">
                <label className="font-dm font-bold text-[var(--navy)] uppercase tracking-widest text-sm">Interest Rate (p.a.)</label>
                <span className="font-cormorant font-bold text-2xl text-[var(--teal)]">{rate}%</span>
              </div>
              <input 
                type="range" 
                min="6.5" 
                max="14" 
                step="0.1" 
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between mt-2 font-dm text-xs font-bold text-[var(--navy)]/50">
                <span>6.5%</span>
                <span>14%</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-4">
                <label className="font-dm font-bold text-[var(--navy)] uppercase tracking-widest text-sm">Loan Tenure</label>
                <span className="font-cormorant font-bold text-2xl text-[var(--teal)]">{years} Years</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="30" 
                step="1" 
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between mt-2 font-dm text-xs font-bold text-[var(--navy)]/50">
                <span>1 Yr</span>
                <span>30 Yrs</span>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <div className="text-center mb-12">
              <p className="font-dm font-bold text-[var(--navy)]/70 uppercase tracking-widest text-sm mb-4">Monthly EMI</p>
              <h2 className="font-cormorant font-semibold text-6xl text-[var(--teal)]">{formatCurrency(Math.round(emi))}</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-8 mb-12">
              <div className="text-center p-6 border border-[var(--rule)] bg-[var(--white)] shadow-sm">
                <p className="font-dm text-xs font-bold text-[var(--navy)]/60 uppercase tracking-widest mb-2">Total Interest</p>
                <p className="font-cormorant font-semibold text-3xl text-[var(--navy)]">{formatCurrency(Math.round(totalInterest))}</p>
              </div>
              <div className="text-center p-6 border border-[var(--rule)] bg-[var(--white)] shadow-sm">
                <p className="font-dm text-xs font-bold text-[var(--navy)]/60 uppercase tracking-widest mb-2">Total Payment</p>
                <p className="font-cormorant font-semibold text-3xl text-[var(--navy)]">{formatCurrency(Math.round(totalPayment))}</p>
              </div>
            </div>

            <div className="h-64 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: any) => formatCurrency(Math.round(Number(value)))}
                    contentStyle={{ backgroundColor: 'var(--white)', border: '1px solid var(--rule)', color: 'var(--navy)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="font-dm text-xs font-bold text-[var(--navy)]">Principal</span>
                <span className="font-dm text-xs font-bold text-[var(--teal)]">vs Interest</span>
              </div>
            </div>
          </div>
        </div>

        {/* Amortization Table */}
        <div className="mt-24 bg-[var(--white)] border border-[var(--rule)] p-8 shadow-sm">
          <h2 className="font-cormorant font-semibold text-3xl text-[var(--navy)] mb-8">Amortization Schedule</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[var(--rule-heavy)] text-[var(--navy)] font-dm font-bold text-sm uppercase tracking-widest">
                  <th className="py-4 pr-6">Year</th>
                  <th className="py-4 pr-6">Principal Paid</th>
                  <th className="py-4 pr-6">Interest Paid</th>
                  <th className="py-4">Closing Balance</th>
                </tr>
              </thead>
              <tbody className="font-dm font-medium text-[var(--navy)]">
                {(showAllYears ? schedule : schedule.slice(0, 5)).map((row) => (
                  <tr key={row.year} className="border-b border-[var(--rule)] hover:bg-[var(--beige)] transition-colors">
                    <td className="py-4 pr-6">{row.year}</td>
                    <td className="py-4 pr-6">{formatCurrency(Math.round(row.principal))}</td>
                    <td className="py-4 pr-6 text-[var(--teal)] font-semibold">{formatCurrency(Math.round(row.interest))}</td>
                    <td className="py-4">{formatCurrency(Math.round(row.balance))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {schedule.length > 5 && (
            <button 
              onClick={() => setShowAllYears(!showAllYears)}
              className="mt-8 border border-[var(--navy)] text-[var(--navy)] px-8 py-3 font-dm font-bold text-sm tracking-widest uppercase hover:bg-[var(--navy)] hover:text-[var(--white)] transition-colors"
            >
              {showAllYears ? 'Show Less' : 'View All Years'}
            </button>
          )}
        </div>
      </div>
    </main>
  )
}
