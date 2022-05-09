import { useTransactions } from '../../hooks/useTransactions';

import IncomeImg from '../../assets/income.svg';
import OutcomeImg from '../../assets/outcome.svg';
import TotalImg from '../../assets/total.svg';

import { Conatiner } from "./style";

export function Summary() {

    const { transactionsObj  } = useTransactions()

    const summary = transactionsObj.reduce((acc, transactionsObj) => {
        if(transactionsObj.type === 'deposit') {
            acc.deposits += transactionsObj.amount
            acc.total += transactionsObj.amount;
        } else {
            acc.withdraws += transactionsObj.amount;
            acc.total -= transactionsObj.amount;
        }

        return acc
    }, {
        deposits: 0,
        withdraws: 0,
        total: 0,
    })

    return (
        <Conatiner>
            <div>
                <header>
                    <p>Entradas</p>
                    <img src={IncomeImg} alt="income"/>
                </header>
                <strong>
                    {new Intl.NumberFormat('pt-BR', {
                        style:'currency',
                        currency: 'BRL'
                    }).format(summary.deposits)}    
                </strong>
            </div>

            <div>
                <header>
                    <p>Saídas</p>
                    <img src={OutcomeImg} alt="income"/>
                </header>
                <strong>
                    {new Intl.NumberFormat('pt-BR', {
                        style:'currency',
                        currency: 'BRL'
                    }).format(summary.withdraws)}    
                </strong>
            </div>

            <div className='highlight-background'>
                <header>
                    <p>Total</p>
                    <img src={TotalImg} alt="income"/>
                </header>
                <strong>
                    {new Intl.NumberFormat('pt-BR', {
                        style:'currency',
                        currency: 'BRL'
                    }).format(summary.total)}    
                </strong>
            </div>
        </Conatiner>
    )
}