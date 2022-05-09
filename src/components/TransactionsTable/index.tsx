import { useTransactions } from "../../hooks/useTransactions";
import { Container } from "./style";

export function TransactionsTable() {
   const {transactionsObj} = useTransactions()
   
    return (
        <Container>
            <table>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Valor</th>
                        <th>Categoria</th>
                        <th>Data</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        transactionsObj.map(transactionsObj => {
                            return (
                                <tr key={transactionsObj.id}>
                                    <td>{transactionsObj.title}</td>
                                    <td className={transactionsObj.type}>
                                        {new Intl.NumberFormat('pt-BR', {
                                            style:'currency',
                                            currency: 'BRL'
                                        }).format(transactionsObj.amount)}
                                    </td>
                                    <td>{transactionsObj.category}</td>
                                    <td>
                                        {new Intl.DateTimeFormat('pt-BR').format(
                                            new Date(transactionsObj.createdAt)
                                        )}
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </Container>
    )
}