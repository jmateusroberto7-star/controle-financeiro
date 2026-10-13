// Elementos da página
const descricao = document.getElementById('descricao');
const valor = document.getElementById('valor');
const tipo = document.getElementById('tipo');
const btnAdicionar = document.getElementById('btn-adicionar');
const listaTransacoes = document.getElementById('lista-transacoes');
const valorSaldo = document.getElementById('valor-saldo');

// Armazena todas as transações
let transacoes = [];

// Adiciona nova transação
btnAdicionar.addEventListener('click', () => {
    // Validação simples
    if (!descricao.value || !valor.value) {
        alert('Preencha todos os campos!');
        return;
    }

    // ✅ Ajuste: converte vírgula para ponto automaticamente
    let valorLimpo = valor.value.replace(',', '.');
    let valorNumerico = parseFloat(valorLimpo);

    if (isNaN(valorNumerico)) {
        alert('Digite um valor válido!');
        return;
    }

    // Cria objeto com os dados
    const transacao = {
        id: Date.now(),
        descricao: descricao.value,
        valor: valorNumerico,
        tipo: tipo.value
    };

    // Adiciona na lista
    transacoes.push(transacao);

    // Atualiza a tela
    atualizarTela();

    // Limpa os campos
    descricao.value = '';
    valor.value = '';
});

// Atualiza tudo na tela
function atualizarTela() {
    atualizarLista();
    atualizarSaldo();
}

// Formata valor para exibição com vírgula
function formatarValor(valor) {
    return valor.toFixed(2).replace('.', ',');
}

// Atualiza a lista de transações
function atualizarLista() {
    if (transacoes.length === 0) {
        listaTransacoes.innerHTML = '<li>Nenhuma transação registrada.</li>';
        return;
    }

    listaTransacoes.innerHTML = '';

    transacoes.forEach(t => {
        const li = document.createElement('li');
        li.className = t.tipo;

        const sinal = t.tipo === 'entrada' ? '+' : '-';
        const classeValor = t.tipo === 'entrada' ? 'valor-entrada' : 'valor-saida';

        li.innerHTML = `
            <span>${t.descricao}</span>
            <span class="${classeValor}">${sinal} R$ ${formatarValor(t.valor)}</span>
        `;

        listaTransacoes.appendChild(li);
    });
}

// Calcula e mostra o saldo total
function atualizarSaldo() {
    let total = 0;

    transacoes.forEach(t => {
        if (t.tipo === 'entrada') {
            total += t.valor;
        } else {
            total -= t.valor;
        }
    });

    valorSaldo.textContent = `R$ ${formatarValor(total)}`;
    
    // Muda a cor se for negativo
    if (total < 0) {
        valorSaldo.style.color = '#fef2f2';
    } else {
        valorSaldo.style.color = 'white';
    }
}