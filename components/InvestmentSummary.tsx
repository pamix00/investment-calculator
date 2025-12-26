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

  const roi = result.totalInvested > 0
    ? ((result.interestEarned / result.totalInvested) * 100).toFixed(2)
    : '0.00';

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8 mb-4 min-[2000px]:mb-8 animate-in fade-in slide-in-from-bottom-8 duration-500">

      <div className="rounded-xl transition-transform duration-200 ease-out hover:scale-103 shadow-sm cursor-default">
        <Card className="shadow-none p-4 min-[2000px]:p-6 border-l-4 border-l-primary bg-primary/5 dark:bg-primary/10 h-full">
          <div className="flex items-center gap-3 min-[2000px]:gap-4"> 
            <div className="p-3 min-[2000px]:p-3 bg-primary/20 rounded-full">
              <PiggyBank className="w-5 h-5 min-[2000px]:w-6 min-[2000px]:h-6 text-primary" />
            </div>
            <div>
              <p className="text-xs min-[2000px]:text-sm text-muted-foreground font-medium uppercase tracking-wide select-none">
                Wartość końcowa
              </p>
              <p className="text-2xl min-[2000px]:text-3xl font-bold text-primary mt-0.5 min-[2000px]:mt-1">
                {formatMoney(result.totalBalance)}
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="rounded-xl transition-transform duration-200 ease-out hover:scale-103 shadow-sm cursor-default">
        <Card className="shadow-none p-4 min-[2000px]:p-6 border-l-4 border-l-pink-500 h-full">
          <div className="flex items-center gap-3 min-[2000px]:gap-4">
            <div className="p-3 min-[2000px]:p-3 bg-pink-100 dark:bg-pink-900/30 rounded-full">
              <Wallet className="w-5 h-5 min-[2000px]:w-6 min-[2000px]:h-6 text-pink-600 dark:text-pink-400" />
            </div>
            <div>
              <p className="text-xs min-[2000px]:text-sm text-muted-foreground font-medium uppercase tracking-wide select-none">
                Wpłacone środki
              </p>
              <p className="text-xl min-[2000px]:text-2xl font-bold text-foreground mt-0.5 min-[2000px]:mt-1">
                {formatMoney(result.totalInvested)}
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="rounded-xl transition-transform duration-200 ease-out hover:scale-103 shadow-sm cursor-default">
        <Card className="shadow-none p-4 min-[2000px]:p-6 border-l-4 border-l-primary h-full">
          <div className="flex items-center gap-3 min-[2000px]:gap-4">
            <div className="p-3 min-[2000px]:p-3 bg-primary/20 rounded-full">
              <TrendingUp className="w-5 h-5 min-[2000px]:w-6 min-[2000px]:h-6 text-primary" />
            </div>
            
            <div className="flex-1">
              <p className="text-xs min-[2000px]:text-sm text-muted-foreground font-medium uppercase tracking-wide select-none">
                Wypracowany zysk
              </p>
              
              <div className="flex justify-between items-baseline mt-0.5 min-[2000px]:mt-1">
                <p className="text-xl min-[2000px]:text-2xl font-bold text-primary">
                  +{formatMoney(result.interestEarned)}
                </p>
                <span className="text-sm min-[2000px]:text-base font-medium text-primary/80">
                  ({roi}%)
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>

    </div>
  );
};