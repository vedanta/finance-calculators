import React, { useState } from 'react';
import { Calculator, TrendingUp, DollarSign, BarChart3, Clock, AlertTriangle, CheckCircle, Info } from 'lucide-react';

const FinancialRatiosApp = () => {
  const [activeTab, setActiveTab] = useState('liquidity');
  const [calculations, setCalculations] = useState({});

  const tabs = [
    { id: 'liquidity', name: 'Liquidity & Debt Service', icon: DollarSign },
    { id: 'leverage', name: 'Leverage', icon: BarChart3 },
    { id: 'profitability', name: 'Profitability', icon: TrendingUp },
    { id: 'asset', name: 'Asset Management', icon: Clock }
  ];

  const calculateRatio = (ratioId, inputs) => {
    let result = 0;
    switch (ratioId) {
      case 'currentRatio':
        result = inputs.currentAssets / inputs.currentLiabilities;
        break;
      case 'quickRatio':
        result = (inputs.cash + inputs.marketableSecurities + inputs.accountsReceivable) / inputs.currentLiabilities;
        break;
      case 'timesInterestEarned':
        result = (inputs.pretaxOperatingProfit + inputs.interestExpense) / inputs.interestExpense;
        break;
      case 'daysCash':
        result = inputs.cash / (inputs.cashExpenses / 365);
        break;
      case 'debtToEquity':
        result = inputs.totalDebt / inputs.totalEquity;
        break;
      case 'debtToAssets':
        result = inputs.totalDebt / inputs.totalAssets;
        break;
      case 'cashFlowDebt':
        result = inputs.cashFlowFromOperations / inputs.totalDebt;
        break;
      case 'grossMargin':
        result = ((inputs.sales - inputs.cogs) / inputs.sales) * 100;
        break;
      case 'returnOnSales':
        result = (inputs.netIncome / inputs.netSales) * 100;
        break;
      case 'returnOnEquity':
        result = (inputs.netIncome / inputs.shareholdersEquity) * 100;
        break;
      case 'returnOnAssets':
        result = (inputs.netIncome / inputs.totalAssets) * 100;
        break;
      case 'earningsPerShare':
        result = inputs.netIncome / inputs.commonShares;
        break;
      case 'fullyDilutedEPS':
        result = inputs.netIncome / inputs.totalShares;
        break;
      case 'priceEarningsRatio':
        result = inputs.marketPrice / inputs.earningsPerShare;
        break;
      case 'dividendYield':
        result = (inputs.annualDividend / inputs.marketPrice) * 100;
        break;
      case 'inventoryTurnover':
        result = inputs.cogs / inputs.averageInventory;
        break;
      case 'daysSalesInventory':
        result = inputs.averageInventory / (inputs.cogs / 365);
        break;
      case 'daysSalesOutstanding':
        result = 365 / (inputs.netCreditSales / inputs.averageAccountsReceivable);
        break;
      case 'accountsPayableDays':
        result = 365 / (inputs.cogsCredit / inputs.averageAccountsPayable);
        break;
      case 'assetTurnover':
        result = inputs.netSales / inputs.averageTotalAssets;
        break;
      case 'capitalIntensity':
        result = inputs.netSales / inputs.ppe;
        break;
    }
    
    setCalculations(prev => ({
      ...prev,
      [ratioId]: isNaN(result) ? 0 : result
    }));
  };

  const getInterpretation = (ratioId, value) => {
    const interpretations = {
      currentRatio: {
        excellent: { min: 2.0, color: 'text-green-600', text: 'Excellent liquidity - can easily meet short-term obligations' },
        good: { min: 1.5, color: 'text-blue-600', text: 'Good liquidity - strong position to meet current obligations' },
        adequate: { min: 1.0, color: 'text-yellow-600', text: 'Adequate liquidity - can meet obligations but monitor carefully' },
        poor: { min: 0, color: 'text-red-600', text: 'Poor liquidity - may have difficulty meeting short-term obligations' }
      },
      quickRatio: {
        good: { min: 1.0, color: 'text-green-600', text: 'Good liquidity - can meet obligations without selling inventory' },
        moderate: { min: 0.5, color: 'text-yellow-600', text: 'Moderate liquidity - may need careful cash flow management' },
        poor: { min: 0, color: 'text-red-600', text: 'Poor liquidity - may struggle with immediate obligations' }
      },
      timesInterestEarned: {
        excellent: { min: 5.0, color: 'text-green-600', text: 'Excellent debt service capability' },
        good: { min: 2.5, color: 'text-blue-600', text: 'Good ability to service debt' },
        moderate: { min: 1.5, color: 'text-yellow-600', text: 'Moderate - limited margin for error' },
        poor: { min: 0, color: 'text-red-600', text: 'Poor - may have difficulty servicing debt' }
      },
      daysCash: {
        excellent: { min: 90, color: 'text-green-600', text: 'Excellent cash reserves' },
        good: { min: 60, color: 'text-blue-600', text: 'Good cash buffer' },
        moderate: { min: 30, color: 'text-yellow-600', text: 'Moderate reserves' },
        low: { min: 0, color: 'text-red-600', text: 'Low cash reserves - monitor closely' }
      },
      debtToEquity: {
        low: { max: 0.3, color: 'text-green-600', text: 'Low leverage - conservative capital structure' },
        moderate: { max: 1.0, color: 'text-blue-600', text: 'Moderate leverage - balanced structure' },
        high: { max: 2.0, color: 'text-yellow-600', text: 'High leverage - significant debt burden' },
        veryHigh: { max: Infinity, color: 'text-red-600', text: 'Very high leverage - potential financial risk' }
      },
      grossMargin: {
        excellent: { min: 50, color: 'text-green-600', text: 'Excellent margin - strong pricing power' },
        good: { min: 30, color: 'text-blue-600', text: 'Good margin - healthy profitability' },
        moderate: { min: 15, color: 'text-yellow-600', text: 'Moderate margin - room for improvement' },
        low: { min: 0, color: 'text-red-600', text: 'Low margin - cost management issues' }
      },
      returnOnEquity: {
        excellent: { min: 20, color: 'text-green-600', text: 'Excellent returns for shareholders' },
        good: { min: 15, color: 'text-blue-600', text: 'Good shareholder returns' },
        moderate: { min: 10, color: 'text-yellow-600', text: 'Moderate returns' },
        below: { min: 0, color: 'text-red-600', text: 'Below average returns' }
      }
    };

    const ratioInterp = interpretations[ratioId];
    if (!ratioInterp) return { color: 'text-gray-600', text: 'Calculate to see interpretation' };

    for (const [key, range] of Object.entries(ratioInterp)) {
      if (range.min !== undefined && value >= range.min) {
        return range;
      }
      if (range.max !== undefined && value <= range.max) {
        return range;
      }
    }
    
    return { color: 'text-gray-600', text: 'Calculate to see interpretation' };
  };

  const RatioCard = ({ ratio, inputs, ratioId }) => {
    const value = calculations[ratioId] || 0;
    const interpretation = getInterpretation(ratioId, value);
    
    return (
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">{ratio.name}</h3>
          <Calculator className="w-5 h-5 text-blue-500" />
        </div>
        
        <div className="mb-4">
          <div className="bg-gray-50 p-3 rounded-md font-mono text-sm text-gray-700 mb-2">
            {ratio.formula}
          </div>
          <p className="text-sm text-gray-600 mb-2">{ratio.description}</p>
          <p className="text-xs text-blue-600">{ratio.goodIs}</p>
        </div>

        <div className="space-y-3 mb-4">
          {inputs.map((input, index) => (
            <div key={index}>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                {input.label}
              </label>
              <input
                type="number"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={input.placeholder || "Enter value"}
                onChange={(e) => {
                  const inputs = ratio.inputs.reduce((acc, inp, i) => {
                    acc[inp.key] = i === index ? parseFloat(e.target.value) || 0 : 
                                   document.querySelector(`input[data-ratio="${ratioId}"][data-input="${inp.key}"]`)?.value || 0;
                    return acc;
                  }, {});
                  calculateRatio(ratioId, inputs);
                }}
                data-ratio={ratioId}
                data-input={input.key}
              />
            </div>
          ))}
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Result:</span>
            <span className="text-lg font-bold text-gray-900">
              {ratio.isPercentage ? `${value.toFixed(2)}%` : value.toFixed(2)}
            </span>
          </div>
          <div className={`text-sm ${interpretation.color}`}>
            <div className="flex items-start space-x-2">
              <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{interpretation.text}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const liquidityRatios = [
    {
      name: "Current Ratio",
      formula: "Current Assets ÷ Current Liabilities",
      description: "Shows ability to pay back short-term liabilities with short-term assets (cash, marketable securities, receivables)",
      goodIs: "Bigger is better. Minimum varies by firm but generally > 2.0",
      inputs: [
        { key: 'currentAssets', label: 'Current Assets ($)', placeholder: 'e.g., 150000' },
        { key: 'currentLiabilities', label: 'Current Liabilities ($)', placeholder: 'e.g., 75000' }
      ]
    },
    {
      name: "Quick (Acid Test) Ratio",
      formula: "(Cash + Marketable Securities + Accounts Receivable) ÷ Current Liabilities",
      description: "Shows ability to pay back short-term liabilities quicker than current ratio - excludes inventory",
      goodIs: "Bigger is better. Target > 1.0",
      inputs: [
        { key: 'cash', label: 'Cash ($)', placeholder: 'e.g., 25000' },
        { key: 'marketableSecurities', label: 'Marketable Securities ($)', placeholder: 'e.g., 15000' },
        { key: 'accountsReceivable', label: 'Accounts Receivable ($)', placeholder: 'e.g., 45000' },
        { key: 'currentLiabilities', label: 'Current Liabilities ($)', placeholder: 'e.g., 75000' }
      ]
    },
    {
      name: "Times Interest Earned",
      formula: "(Pretax Operating Profit + Interest Expense) ÷ Interest Expense",
      description: "Ability to meet annual interest expense",
      goodIs: "Bigger is better. Generally should exceed 2.5x",
      inputs: [
        { key: 'pretaxOperatingProfit', label: 'Pretax Operating Profit ($)', placeholder: 'e.g., 100000' },
        { key: 'interestExpense', label: 'Interest Expense ($)', placeholder: 'e.g., 15000' }
      ]
    },
    {
      name: "Days Cash",
      formula: "Cash ÷ (Cash Expenses ÷ 365 days)",
      description: "Number of days cash on hand balance can cover normal cash expenses",
      goodIs: "Target varies but generally 30-90 days is good",
      inputs: [
        { key: 'cash', label: 'Cash ($)', placeholder: 'e.g., 50000' },
        { key: 'cashExpenses', label: 'Annual Cash Expenses ($)', placeholder: 'e.g., 365000' }
      ]
    }
  ];

  const leverageRatios = [
    {
      name: "Debt to Equity Ratio",
      formula: "Total Debt ÷ Total Equity",
      description: "A measure of financial leverage. High ratio means aggressive financing with debt",
      goodIs: "Generally, lower is better. Above 1.0 warrants investigation",
      inputs: [
        { key: 'totalDebt', label: 'Total Debt ($)', placeholder: 'e.g., 200000' },
        { key: 'totalEquity', label: 'Total Equity ($)', placeholder: 'e.g., 300000' }
      ]
    },
    {
      name: "Debt to Total Assets Ratio",
      formula: "Total Debt ÷ Total Assets",
      description: "Defines the total amount of debt relative to assets",
      goodIs: "Generally, lower is better. Above 50% increases risk",
      isPercentage: true,
      inputs: [
        { key: 'totalDebt', label: 'Total Debt ($)', placeholder: 'e.g., 200000' },
        { key: 'totalAssets', label: 'Total Assets ($)', placeholder: 'e.g., 500000' }
      ]
    },
    {
      name: "Cash Flow/Debt",
      formula: "Cash Flow from Operations ÷ Total Debt",
      description: "Measure of annual cash flow to total debt. Indicates ability to service debt",
      goodIs: "More is better. Above 0.2 is generally good",
      inputs: [
        { key: 'cashFlowFromOperations', label: 'Cash Flow from Operations ($)', placeholder: 'e.g., 80000' },
        { key: 'totalDebt', label: 'Total Debt ($)', placeholder: 'e.g., 200000' }
      ]
    }
  ];

  const profitabilityRatios = [
    {
      name: "Gross Margin",
      formula: "(Sales - Cost of Goods Sold) ÷ Sales × 100%",
      description: "Proportion of each dollar of revenue retained as gross profit",
      goodIs: "Bigger is better; target varies by industry/product",
      isPercentage: true,
      inputs: [
        { key: 'sales', label: 'Sales Revenue ($)', placeholder: 'e.g., 500000' },
        { key: 'cogs', label: 'Cost of Goods Sold ($)', placeholder: 'e.g., 300000' }
      ]
    },
    {
      name: "Return on Sales (Profit Margin)",
      formula: "Net Income ÷ Net Sales × 100%",
      description: "Shows how much profit is produced per dollar of sales",
      goodIs: "Bigger is better; target varies by industry",
      isPercentage: true,
      inputs: [
        { key: 'netIncome', label: 'Net Income ($)', placeholder: 'e.g., 50000' },
        { key: 'netSales', label: 'Net Sales ($)', placeholder: 'e.g., 500000' }
      ]
    },
    {
      name: "Return on Equity",
      formula: "Net Income ÷ Shareholders' Equity × 100%",
      description: "Useful for comparing profitability to other organizations in same industry",
      goodIs: "Bigger is better. Above 15% is generally excellent",
      isPercentage: true,
      inputs: [
        { key: 'netIncome', label: 'Net Income ($)', placeholder: 'e.g., 50000' },
        { key: 'shareholdersEquity', label: 'Shareholders\' Equity ($)', placeholder: 'e.g., 300000' }
      ]
    },
    {
      name: "Return on Assets",
      formula: "Net Income ÷ Total Assets × 100%",
      description: "Shows earnings generated from invested capital (assets)",
      goodIs: "Bigger is better. Above 5% is generally good",
      isPercentage: true,
      inputs: [
        { key: 'netIncome', label: 'Net Income ($)', placeholder: 'e.g., 50000' },
        { key: 'totalAssets', label: 'Total Assets ($)', placeholder: 'e.g., 500000' }
      ]
    },
    {
      name: "Earnings Per Share",
      formula: "Net Income ÷ Number of Common Shares Outstanding",
      description: "Critical variable in determining share price - profitability relative to ownership",
      goodIs: "Bigger is better. Positive values indicate profitability",
      inputs: [
        { key: 'netIncome', label: 'Net Income ($)', placeholder: 'e.g., 50000' },
        { key: 'commonShares', label: 'Common Shares Outstanding', placeholder: 'e.g., 10000' }
      ]
    },
    {
      name: "Fully Diluted Earnings Per Share",
      formula: "Net Income ÷ Number of Total Common Shares (Outstanding and exercisable)",
      description: "Bottom line profit per share if all potential conversions were exercised",
      goodIs: "Bigger is better. More conservative than basic EPS",
      inputs: [
        { key: 'netIncome', label: 'Net Income ($)', placeholder: 'e.g., 50000' },
        { key: 'totalShares', label: 'Total Shares (Including Options)', placeholder: 'e.g., 12000' }
      ]
    },
    {
      name: "Price/Earnings Ratio",
      formula: "Market Price Per Share ÷ Earnings Per Share",
      description: "Shows how much investors are willing to pay per dollar of earnings",
      goodIs: "Target varies by stock type. 15-25 is often reasonable",
      inputs: [
        { key: 'marketPrice', label: 'Market Price Per Share ($)', placeholder: 'e.g., 25' },
        { key: 'earningsPerShare', label: 'Earnings Per Share ($)', placeholder: 'e.g., 2.5' }
      ]
    },
    {
      name: "Dividend Rate/Yield",
      formula: "Annual Cash Dividend ÷ Market Price Per Share × 100%",
      description: "Shows annual dividend payout relative to share price",
      goodIs: "Generally bigger is better but varies by company stage",
      isPercentage: true,
      inputs: [
        { key: 'annualDividend', label: 'Annual Cash Dividend ($)', placeholder: 'e.g., 1.2' },
        { key: 'marketPrice', label: 'Market Price Per Share ($)', placeholder: 'e.g., 25' }
      ]
    }
  ];

  const assetRatios = [
    {
      name: "Inventory Turnover",
      formula: "Cost of Goods Sold ÷ Average Inventory",
      description: "Compare against industry averages. Low turnover implies poor sales and excess inventory",
      goodIs: "Bigger is better; indicates faster movement of inventory",
      inputs: [
        { key: 'cogs', label: 'Cost of Goods Sold ($)', placeholder: 'e.g., 300000' },
        { key: 'averageInventory', label: 'Average Inventory ($)', placeholder: 'e.g., 50000' }
      ]
    },
    {
      name: "Days Sales in Inventory",
      formula: "Average Inventory ÷ (COGS ÷ 365 days)",
      description: "Average number of days inventory stays on hand",
      goodIs: "Lower is better. Under 60 days often indicates good management",
      inputs: [
        { key: 'averageInventory', label: 'Average Inventory ($)', placeholder: 'e.g., 50000' },
        { key: 'cogs', label: 'Cost of Goods Sold ($)', placeholder: 'e.g., 300000' }
      ]
    },
    {
      name: "Days Sales Outstanding",
      formula: "365 ÷ (Net Credit Sales ÷ Average Accounts Receivable)",
      description: "Average number of days to collect revenue after a sale; monitors credit policies",
      goodIs: "Lower is better. Under 45 days is generally good",
      inputs: [
        { key: 'netCreditSales', label: 'Net Credit Sales ($)', placeholder: 'e.g., 400000' },
        { key: 'averageAccountsReceivable', label: 'Average Accounts Receivable ($)', placeholder: 'e.g., 45000' }
      ]
    },
    {
      name: "Accounts Payable Days Outstanding",
      formula: "365 ÷ (COGS purchased on credit ÷ Average Accounts Payable)",
      description: "How long it takes company to pay invoices from trade creditors",
      goodIs: "Higher is better for cash flow management",
      inputs: [
        { key: 'cogsCredit', label: 'COGS Purchased on Credit ($)', placeholder: 'e.g., 250000' },
        { key: 'averageAccountsPayable', label: 'Average Accounts Payable ($)', placeholder: 'e.g., 35000' }
      ]
    },
    {
      name: "Asset Turnover Ratio",
      formula: "Net Sales ÷ Average Total Assets",
      description: "Company's ability to use assets to generate revenue per dollar of assets",
      goodIs: "Higher is better; compare to same sector organizations",
      inputs: [
        { key: 'netSales', label: 'Net Sales ($)', placeholder: 'e.g., 500000' },
        { key: 'averageTotalAssets', label: 'Average Total Assets ($)', placeholder: 'e.g., 500000' }
      ]
    },
    {
      name: "Capital Intensity Ratio",
      formula: "Net Sales ÷ (Property, Plant and Equipment)",
      description: "Company's ability to use long-term assets to generate sales or revenue",
      goodIs: "Higher is better; compare to same sector (often manufacturing)",
      inputs: [
        { key: 'netSales', label: 'Net Sales ($)', placeholder: 'e.g., 500000' },
        { key: 'ppe', label: 'Property, Plant & Equipment ($)', placeholder: 'e.g., 200000' }
      ]
    }
  ];

  const getCurrentRatios = () => {
    switch (activeTab) {
      case 'liquidity': return liquidityRatios;
      case 'leverage': return leverageRatios;
      case 'profitability': return profitabilityRatios;
      case 'asset': return assetRatios;
      default: return [];
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Calculator className="w-8 h-8 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900">Financial Ratios Calculator</h1>
            </div>
            <div className="text-sm text-gray-500">
              Complete Financial Analysis Tool
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <nav className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {getCurrentRatios().map((ratio, index) => (
            <RatioCard
              key={`${activeTab}-${index}`}
              ratio={ratio}
              inputs={ratio.inputs}
              ratioId={`${activeTab}${index}`}
            />
          ))}
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Info className="w-5 h-5 text-blue-500 mr-2" />
            Key Insights & Usage Guidelines
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
            <div>
              <h3 className="font-medium text-gray-800 mb-2">Industry Comparisons</h3>
              <ul className="space-y-1">
                <li>• Always compare ratios to industry benchmarks</li>
                <li>• Different industries have vastly different "normal" ranges</li>
                <li>• Use multiple ratios together for comprehensive analysis</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-800 mb-2">Trend Analysis</h3>
              <ul className="space-y-1">
                <li>• Single-period ratios provide limited insight</li>
                <li>• Track ratios over multiple periods to identify trends</li>
                <li>• Compare year-over-year and quarter-over-quarter changes</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-800 mb-2">Red Flags</h3>
              <ul className="space-y-1">
                <li>• Deteriorating trends across multiple ratio categories</li>
                <li>• Ratios significantly worse than industry averages</li>
                <li>• Inconsistent ratios (e.g., high profitability but poor liquidity)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-800 mb-2">Limitations</h3>
              <ul className="space-y-1">
                <li>• Ratios are based on historical financial data</li>
                <li>• May not reflect current market conditions</li>
                <li>• Should be used with qualitative analysis</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialRatiosApp;