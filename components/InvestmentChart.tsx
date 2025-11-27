'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Label } from 'recharts';
import { InvestmentResult } from './InvestmentForm';

interface InvestmentChartProps {
  data: InvestmentResult[];
}
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN',
    maximumFractionDigits: 0,
  }).format(value);
};

export const InvestmentChart = ({ data }: InvestmentChartProps) => {
  if (!data || data.length === 0) return null;

  const customTicks = data
    .filter((item, index) => index === 0 || item.year !== data[index - 1].year)
    .map((item) => item.label);

  return (
    <div className="h-full min-h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ec4899" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
          
          <XAxis 
            dataKey="label" 
            ticks={customTicks}
            minTickGap={30} 
            tick={{ fontSize: 12 }}
            tickMargin={10}
            height={50}
            
            tickFormatter={(value) => {
              const match = value.toString().match(/Rok inwestowania: (\d+)/);
              return match ? match[1] : value;
            }}
          >
            <Label value="Rok inwestowania" offset={0} position="insideBottom" style={{ fill: 'var(--muted-foreground)', fontSize: '12px' }} />
          </XAxis>
          
          <YAxis 
            tickFormatter={formatCurrency} 
            tick={{ fontSize: 12 }}
            width={80}
          />
          
          <Tooltip 
            formatter={(value: number) => formatCurrency(value)}
            labelStyle={{ color: '#111' }}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          
          <Legend verticalAlign="bottom" wrapperStyle={{ paddingTop: "16px" }}/>

          <Area
            type="monotone"
            dataKey="totalBalance"
            name="Całkowita wartość"
            stroke="#8b5cf6"
            fillOpacity={1}
            fill="url(#colorBalance)"
          />

          <Area
            type="monotone"
            dataKey="totalInvested"
            name="Wpłacone środki"
            stroke="#ec4899"
            fillOpacity={1}
            fill="url(#colorInvested)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};