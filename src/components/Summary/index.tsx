import { useContext } from 'react';
import { TransactionsContext } from '../../TransactionsContext';

import Income from '../../assets/income.svg';
import Outcome from '../../assets/outcome.svg';
import Total from '../../assets/total.svg';

import { Conatiner } from "./style";

export function Summary() {

    const { transactions } = useContext(TransactionsContext)


    return (
        <Conatiner>
            <div>
                <header>
                    <p>Entradas</p>
                    <img src={Income} alt="income"/>
                </header>
                <strong>
                    R$ 1000.00
                </strong>
            </div>

            <div>
                <header>
                    <p>Saídas</p>
                    <img src={Outcome} alt="income"/>
                </header>
                <strong>
                    R$ -500.00
                </strong>
            </div>

            <div className='highlight-background'>
                <header>
                    <p>Total</p>
                    <img src={Total} alt="income"/>
                </header>
                <strong>
                    R$ 500.00
                </strong>
            </div>
        </Conatiner>
    )
}