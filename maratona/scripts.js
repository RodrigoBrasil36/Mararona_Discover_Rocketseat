//abertura de novas transações
const Modal ={
    open(){
        //abrir Modal
        //add a clase active 
        document
            .querySelector('.modal-overlay').classList.add('active')

    },
    close(){
        //feacher Moad
        //remover a classe active
        document
            .querySelector('.modal-overlay').classList.remove('active');
    }
}
//transacoes da lista
const transactions=[
    {
        id:1,
        descriptions:'Luz',
        amount:-50000,
        date:'23/01/2021'
    },
    {
        id:2,
        descriptions:'Website',
        amount:500000,
        date:'23/01/2021'
    },
    {
        id:3,
        descriptions:'internet',
        amount:-20000,
        date:'23/01/2021'
    }
]

//Necessario somar as entrdas
//depois somas as saídas e
//remover das entras o valor das saídas
//assim chegando no valor total

const Transaction={
    incomes(){
        //somar sas entras
        let income=0;
        transactions.forEach(transaction=>{
            if(transaction.amount >0){
                income+=transaction.amount;
            }    
        })
        return income;
    },
    expenses(){
        //somar as saídas
        let expense=0;
        transactions.forEach(transaction=>{
            if(transaction.amount<0){
                expense+=transaction.amount;
            }    
        })
        return expense;
    },
    total(){
        return Transaction.incomes()+Transaction.expenses();
    }

}

const DOM={
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction,index){
        const tr=document.createElement('tr')
        tr.innerHTML=DOM.innerHTMLTransaction(transaction)

        DOM.transactionsContainer.appendChild(tr)
    },
    innerHTMLTransaction(transaction){
        const CSSclass=transaction.amount>0?"income":"expense"

        const amount=Utils.formatCurrency(transaction.amount)

        const html=`
        <td class="description">${transaction.descriptions}</td>
        <td class="${CSSclass}">${amount}</td>
         <td class="date">${transaction.date}</td>
        <td>
            <img src="./assets/minus.svg" alt="Remover transação">
        </td>
        `
        return html
    },
    updateBalance(){
        document
            .getElementById('incomeDisplay')
            .innerHTML=Utils.formatCurrency(Transaction.incomes())
        document
            .getElementById('expenseDisplay')
            .innerHTML=Utils.formatCurrency(Transaction.expenses())
        document
            .getElementById('totalDisplay')
            .innerHTML=Utils.formatCurrency(Transaction.total())
    }
}
const Utils={
    formatCurrency(value){
        const signal=Number(value)<0 ?"-":""
        
        value=String(value).replace(/\D/g,"")

        value=Number(value)/100

        value=value.toLocaleString("pt-BR",{
            style:"currency",
            currency:"BRL"
        })

        return signal+value
    }
}
transactions.forEach(function(transaction){
    DOM.addTransaction(transaction)
}) 
DOM.updateBalance()