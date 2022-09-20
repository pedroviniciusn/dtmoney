import { createContext, useEffect, useState, ReactNode, useContext } from "react";
import { api } from "../services/api";


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
    transactionsObj: TransactionsProps[];
    createTransaction: (transactionsInput: TransactionsInput) => void;
}

export const TransactionsContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData
)

export function TransactionsProvider({children}: TransactionsProviderProps) {
    
    const [transactionsObj, setTransactionsObj] = useState<TransactionsProps[]>([])

    
    useEffect(() => {
        api.get('transactions')
        .then(response => setTransactionsObj(response.data.transactions))
    }, [])
    
    async function createTransaction(transactionsInput: TransactionsInput) {
        const response = await api.post('/transactions', {
          ...transactionsInput,
          createdAt: new Date()
        });
        const  {transactions}  = response.data;
         setTransactionsObj([...transactionsObj, transactions])
      }
    
    
    return (
        <TransactionsContext.Provider value={{transactionsObj, createTransaction}}>
            {children}
        </TransactionsContext.Provider>
    )
}

export function useTransactions() {
    const context = useContext(TransactionsContext)

    return context
}