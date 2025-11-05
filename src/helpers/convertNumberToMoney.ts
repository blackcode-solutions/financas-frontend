export function formatarDinheiro(numero:Number) {
    // Arredonda o número para duas casas decimais
    const valorFormatado = Number(numero)?.toFixed(2).toString();

    // Separa a parte inteira da parte decimal
    const [parteInteira, parteDecimal] = valorFormatado.split('.');

    // Adiciona o separador de milhares
    const parteInteiraFormatada = parteInteira.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    // Retorna o valor formatado
    return `R$ ${parteInteiraFormatada},${parteDecimal}`;
}