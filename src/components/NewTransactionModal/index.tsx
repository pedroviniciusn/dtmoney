
import { useState, FormEvent, useContext } from 'react';
import Modal from 'react-modal'
import { TransactionsContext } from '../../TransactionsContext';


import IconCloseModal from '../../assets/close.svg'
import IncomeIcon from '../../assets/income.svg'
import OutcomeIcon from '../../assets/outcome.svg'

import { Container, RadioBox, TransactionTypeConatiner } from './style';
 
interface NewTransactionModalProps {
    isOpen: boolean ;
    onRequestClose: () => void
}

export function NewtransactionModal({isOpen, onRequestClose}: NewTransactionModalProps) {
    const { createTransaction } = useContext(TransactionsContext)
    
    
    const [title, setTitle] = useState('')
    const [amount, setAmount] = useState(0)
    const [category, setCategory] = useState('')
    const [type, setType] = useState('deposit')


     async function handleCreateNewTransaction(event: FormEvent) {
        event.preventDefault()

        await createTransaction({ type, title, amount, category });

        setType('deposit');
        setTitle('');
        setAmount(0);
        setCategory('');
        onRequestClose();
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >

        <button type="button" className='react-modal-close' onClick={onRequestClose}>
            <img src={IconCloseModal} alt='close modal' />
        </button>

        <Container onSubmit={handleCreateNewTransaction}>
            <h2>Cadastrar Transação</h2>

            <input
                placeholder="Título"
                value={title}
                onChange={event => setTitle(event.target.value)}
            />

            <input
                placeholder="Valor"
                value={amount}
                onChange={event => setAmount(Number(event.target.value))}
            />  

            <TransactionTypeConatiner>
                <RadioBox 
                type='button' 
                onClick={() => { setType('deposit') }}
                isActive={type === 'deposit'}
                activeColor='green'
                >
                    <img src={IncomeIcon} alt='Entrada'/>
                    <span>Entrada</span>
                </RadioBox>

                <RadioBox 
                type='button'
                onClick={() => { setType('withdraw') }}
                isActive={type === 'withdraw'}
                activeColor='red'
                >
                    <img src={OutcomeIcon} alt='saída'/>
                    <span>Saída</span>
                </RadioBox>
            </TransactionTypeConatiner>

             <input
                placeholder="Categoria"
                value={category}
                onChange={event => setCategory(event.target.value)}
            />

            <button type="submit">
                Cadastrar
            </button>

        </Container>
        </Modal>
    )
}
