'use client';

import { Card } from '@/components/ui/card';
import { Wallet, TrendingUp, PiggyBank } from "lucide-react";
import { InvestmentResult } from './InvestmentForm';

interface InvestmentSummaryProps {
  result: InvestmentResult;
}

const formatMoney = (value: number) => 
  new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN', maximumFractionDigits: 0 }).format(value);

export const InvestmentSummary = ({ result }: InvestmentSummaryProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-in fade-in slide-in-from-bottom-8 duration-500">

      <Card className="p-6 border-l-4 border-l-primary shadow-sm hover:shadow-md transition-shadow bg-primary/5 dark:bg-primary/10">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/20 rounded-full">
            <PiggyBank className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-medium uppercase tracking-wide">
              Wartość końcowa
            </p>
            <p className="text-3xl font-bold text-primary mt-1">
              {formatMoney(result.totalBalance)}
            </p>
          </div>
        </div>
      </Card>
      <Card className="p-6 border-l-4 border-l-pink-500 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-pink-100 dark:bg-pink-900/30 rounded-full">
            <Wallet className="w-6 h-6 text-pink-600 dark:text-pink-400" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-medium uppercase tracking-wide">
                Wpłacone środki
            </p>
            <p className="text-2xl font-bold text-foreground mt-1">
                {formatMoney(result.totalInvested)}
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-6 border-l-4 border-l-primary shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/20 dark:bg-indigo-900/30 rounded-full">
            <TrendingUp className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-medium uppercase tracking-wide">
                Wypracowany zysk
            </p>
            <p className="text-2xl font-bold text-primary mt-1">
                {formatMoney(result.interestEarned)}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};