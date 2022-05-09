import { createContext, useEffect, useState, ReactNode } from "react";
import { api } from "./services/api";


interface TransactionsProps {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string;
}


interface TransactionsProviderProps {
    children: ReactNode;
}

type TransactionsInput = Omit<TransactionsProps, 'id' | 'createdAt'>

interface TransactionsContextData {
    transactions: TransactionsProps[];
    createTransaction: (transactions: TransactionsInput) => Promise<void>;
}

export const TransactionsContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData
)

export function TransactionsProvider({children}: TransactionsProviderProps) {
    
    const [transactions, setTransactions] = useState<TransactionsProps[]>([])

    
    useEffect(() => {
        api.get('transactions')
        .then(response => setTransactions(response.data.transactions))
    }, [])
    
    async function createTransaction(transactionsInput: TransactionsInput) {
        const response = await api.post('/transactions', {
          ...transactionsInput,
          createdAt: new Date()
        });
        const  {transactions}  = response.data;
        setTransactions([...transactions, transactions])
      }
    
    
    return (
        <TransactionsContext.Provider value={{transactions, createTransaction}}>
            {children}
        </TransactionsContext.Provider>
    )
}