import { useEffect, useState } from 'react';
import { useListarGraficos } from './hooks/useListarGraficos';
import styles from './styles.module.scss';
import { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';
import { formatarDinheiro } from '@/helpers/convertNumberToMoney';
const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false, //carrega pelo browser apenas
}); //
export function IndicadoresGraficosPage() {

  const { listarDespesasDia,listarSaldoDia,
    listarDespesas3Mes,listarSaldoAno,listarSaldoMes,
    listarDespesasMes,listarRecebimentosMes,listarSaldoLiquidoMes,
    listarVendasClientes,listarVendasPendentesUsuario,listarVendasUsuario,
    desempenhoProduto,lucroBrutoPorProduto,lucroPorFormaPagamento,
    projecaoVendasFuturas
} = useListarGraficos()

const [dataListarDespesasDia,setDataListarDespesasDia] = useState<any>(null)
const [dataListarSaldoDia,setDataListarSaldoDia] = useState<any>(null)
const [dataListarDespesas3Mes,setDataListarDespesas3Mes] = useState<any>(null)
const [dataListarSaldoAno,setDataListarSaldoAno] = useState<any>(null)
const [dataListarSaldoMes,setDataListarSaldoMes] = useState<any>(null)
const [dataListarDespesasMes,setDataListarDespesasMes] = useState<any>(null)
const [dataListarRecebimentosMes,setDataListarRecebimentosMes] = useState<any>(null)
const [dataListarSaldoLiquidoMes,setDataListarSaldoLiquidoMes] = useState<any>(null)
const [dataListarVendasPendentesUsuario,setDataListarVendasPendentesUsuario] = useState<any>(null)
const [dataListarVendasUsuario,setDataListarVendasUsuario] = useState<any>(null)
const [dataListarVendasClientes,setDataListarVendasClientes] = useState<any>(null)
const [dataDesempenhoProduto, setDataDesempenhoProduto] = useState<any>(null);
const [dataLucroBrutoPorProduto, setDataLucroBrutoPorProduto] = useState<any>(null);
const [dataLucroPorFormaPagamento, setDataLucroPorFormaPagamento] = useState<any>(null);
const [dataProjecaoVendasFuturas, setDataProjecaoVendasFuturas] = useState<any>(null);

function obterArrayDeCores(qtdElementos: number) {
  const colors = [
    "#4A278B",
    "#5B31AF",
    "#7C42E0",
    "#8E5CE6",
    "#A076EB",
    "#B391F1",
    "#C5ABF6",
    "#D8C5FB",
    "#EADFFF",
    "#F5EDFF",

    // '#2F804C',  // Darker shade
    // '#3A925A',  // Slightly darker shade
    // '#41B06E',  // Base color
    // '#4BB97B',  // Slightly lighter shade
    // '#55C289',  // Lighter shade
    // '#5FCCA1',  // Even lighter shade
    // '#69D6B7',  // Lightest shade
    // '#72E0CD',  // Accent shade
    // '#7be9d8',  // Light accent
    // '#85ddd3'   // Very light accent
  ];

  if (qtdElementos <= 1) {
    return [colors[0]];
  }

  const arrayDeCores = [];
  const step = (colors.length - 1) / (qtdElementos - 1);

  for (let i = 0; i < qtdElementos; i++) {
    arrayDeCores.push(colors[Math.round(i * step)]);
  }

  return arrayDeCores;
}

const getChartData = (data:any) => {
  return data?.map((element:any) => ({ x: element.x, y: element.y })) || [];
};

const vendasClientes = dataListarVendasClientes?.map((element:any) => element.x) || [];
const valoresVendasClientes = dataListarVendasClientes?.map((element:any) => element.y) || [];


const vendasUsuario = dataListarVendasUsuario?.reduce((acc:any, element:any) => {
  acc.push(element.x);
  return acc;
}, []);
const valoresVendasUsuario = dataListarVendasUsuario?.reduce((acc:any, element:any) => {
  acc.push(element.y);
  return acc;
}, []);

const vendasUsuarioPendente = dataListarVendasPendentesUsuario?.reduce((acc:any, element:any) => {
  acc.push(element.x);
  return acc;
}, []);
const valoresVendasUsuarioPendente = dataListarVendasPendentesUsuario?.reduce((acc:any, element:any) => {
  acc.push(element.y);
  return acc;
}, []);

const recebimentosPorMes = dataListarRecebimentosMes?.reduce((acc:any, element:any) => {
  acc.push(element.x);
  return acc;
}, []);
const valoresRecebimentosPorMes = dataListarRecebimentosMes?.reduce((acc:any, element:any) => {
  acc.push(element.y);
  return acc;
}, []);

const saldoLiquidoMes = dataListarSaldoLiquidoMes?.reduce((acc:any, element:any) => {
  acc.push(element.x);
  return acc;
}, []);
const valoreSaldoLiquidoMes = dataListarSaldoLiquidoMes?.reduce((acc:any, element:any) => {
  acc.push(element.y);
  return acc;
}, []);

const optionsGraficoVendasCliente: ApexOptions = {
  title: {
    text: 'Compra por Cliente',
    style: {
      fontSize: '17px',
    },
  },
  colors: obterArrayDeCores(vendasClientes?.length || 1),
  plotOptions: {
    pie: {
      expandOnClick: true,
    },
  },
  legend: {
    offsetY: 20,
    width: 163,
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        legend: {
          position: 'bottom',
        },
      },
    },
  ],
  chart: {
    toolbar: {
      show: true,
    },
    zoom: {
      enabled: false,
    },
    foreColor: '#889aaf',
    fontFamily: 'Roboto',
  },
  grid: {
    show: true,
  },
  dataLabels: {
    enabled: true,
    dropShadow: {
      enabled: false,
    },
  },
  tooltip: {
    enabled: true,
  },
  noData: {
    text: 'Não há registros',
    align: 'center',
    verticalAlign: 'middle',
    offsetX: 0,
    offsetY: 0,
    style: {
      color: '#889aaf',
      fontSize: '14px',
      fontFamily: 'Roboto',
    },
  },
  labels: vendasClientes,
  fill: {
    opacity: 1,
  },
};


const optionsGraficoVendasUsuario: ApexOptions = {
  title: {
    text: 'Vendas Por Usuário',
    style: {
      fontSize: '17px',
    },
  },
  chart: {
    toolbar: {
      show: true,
    },
    zoom: {
      enabled: false,
    },
    foreColor: '#889aaf',
    fontFamily: 'Roboto',
  },
  legend: {
    show: false,
  },
  grid: {
    show: true,
  },
  dataLabels: {
    enabled: true,
    dropShadow: {
      enabled: false,
    },
  },
  noData: {
    text: 'Não há registros',
    align: 'center',
    verticalAlign: 'middle',
    offsetX: 0,
    offsetY: 0,
    style: {
      color: '#889aaf',
      fontSize: '14px',
      fontFamily: 'Roboto'
    },
  },
  colors: obterArrayDeCores(valoresVendasUsuario?.length || 0),
  tooltip: {
    enabled: true,
  },
  xaxis: {
    type: 'category',
    categories: vendasUsuario,
  },
  fill: {
    opacity: 1,
  },
  plotOptions: {
    bar: {
      distributed: true,
    },
  },
};

const optionsGraficoVendasUsuarioPendente: ApexOptions = {
  title: {
    text: 'Vendas Pendentes Por Usuário',
    style: {
      fontSize: '17px',
    },
  },
  chart: {
    toolbar: {
      show: true,
    },
    zoom: {
      enabled: false,
    },
    foreColor: '#889aaf',
    fontFamily: 'Roboto',
  },
  legend: {
    show: false,
  },
  grid: {
    show: true,
  },
  dataLabels: {
    enabled: true,
    dropShadow: {
      enabled: false,
    },
  },
  noData: {
    text: 'Não há registros',
    align: 'center',
    verticalAlign: 'middle',
    offsetX: 0,
    offsetY: 0,
    style: {
      color: '#889aaf',
      fontSize: '14px',
      fontFamily: 'Roboto'
    },
  },
  colors: obterArrayDeCores(valoresVendasUsuarioPendente?.length || 0),
  tooltip: {
    enabled: true,
  },
  xaxis: {
    type: 'category',
    categories: vendasUsuarioPendente,
  },
  fill: {
    opacity: 1,
  },
  plotOptions: {
    bar: {
      distributed: true,
    },
  },
};

const optionsGraficoVendasRecebimentosPorMes: ApexOptions = {
  title: {
    text: 'Recebimentos Por Mês',
    style: {
      fontSize: '17px',
    },
  },
  chart: {
    toolbar: {
      show: true,
    },
    zoom: {
      enabled: false,
    },
    foreColor: '#889aaf',
    fontFamily: 'Roboto',
  },
  legend: {
    show: false,
  },
  grid: {
    show: true,
  },
  dataLabels: {
    enabled: true,
    dropShadow: {
      enabled: false,
    },
  },
  noData: {
    text: 'Não há registros',
    align: 'center',
    verticalAlign: 'middle',
    offsetX: 0,
    offsetY: 0,
    style: {
      color: '#889aaf',
      fontSize: '14px',
      fontFamily: 'Roboto'
    },
  },
  colors: obterArrayDeCores(valoresRecebimentosPorMes?.length || 0),
  tooltip: {
    enabled: true,
  },
  xaxis: {
    type: 'category',
    categories: recebimentosPorMes,
  },
  fill: {
    opacity: 1,
  },
  plotOptions: {
    bar: {
      distributed: true,
    },
  },
};

const optionsGraficoSaldoLiquidoMes: ApexOptions = {
  title: {
    text: 'Saldo Liquido Por Mês',
    style: {
      fontSize: '17px',
    },
  },
  chart: {
    toolbar: {
      show: true,
    },
    zoom: {
      enabled: false,
    },
    foreColor: '#889aaf',
    fontFamily: 'Roboto',
  },
  legend: {
    show: false,
  },
  grid: {
    show: true,
  },
  dataLabels: {
    enabled: true,
    dropShadow: {
      enabled: false,
    },
  },
  noData: {
    text: 'Não há registros',
    align: 'center',
    verticalAlign: 'middle',
    offsetX: 0,
    offsetY: 0,
    style: {
      color: '#889aaf',
      fontSize: '14px',
      fontFamily: 'Roboto'
    },
  },
  colors: obterArrayDeCores(valoreSaldoLiquidoMes?.length || 0),
  tooltip: {
    enabled: true,
  },
  xaxis: {
    type: 'category',
    categories: saldoLiquidoMes,
  },
  fill: {
    opacity: 1,
  },
  plotOptions: {
    bar: {
      distributed: true,
    },
  },
};

const optionsDesempenhoProduto :ApexOptions = {
  title: {
    text: 'Produtos Vendidos(Qtd)',
    style: {
      fontSize: '17px',
    },
  },
  colors: obterArrayDeCores(dataDesempenhoProduto?.length || 0),
  chart: {
    toolbar: {
      show: true,
    },
    zoom: {
      enabled: false,
    },
    foreColor: '#889aaf',
    fontFamily: 'Roboto',
  },
  grid: {
    show: true,
  },
  dataLabels: {
    enabled: true,
    dropShadow: {
      enabled: false,
    },
  },
  tooltip: {
    enabled: true,
  },
  xaxis: {
    type: 'category',
    categories: dataDesempenhoProduto?.map((d:any) => d.x) || [],
  },
  fill: {
    opacity: 1,
  },
  plotOptions: {
    bar: {
      distributed: true,
    },
  },
};


const optionsLucroBrutoPorProduto :ApexOptions  = {
  title: {
    text: 'Lucro Bruto Por Produto',
    style: {
      fontSize: '17px',
    },
  },
  colors: obterArrayDeCores(dataLucroBrutoPorProduto?.length || 0),
  chart: {
    toolbar: {
      show: true,
    },
    zoom: {
      enabled: false,
    },
    foreColor: '#889aaf',
    fontFamily: 'Roboto',
  },
  grid: {
    show: true,
  },
  dataLabels: {
    enabled: true,
    dropShadow: {
      enabled: false,
    },
  },
  tooltip: {
    enabled: true,
  },
  xaxis: {
    type: 'category',
    categories: dataLucroBrutoPorProduto?.map((d:any) => d.x) || [],
  },
  fill: {
    opacity: 1,
  },
  plotOptions: {
    bar: {
      distributed: true,
    },
  },
};

const optionsLucroPorFormaPagamento :ApexOptions  = {
  title: {
    text: 'Lucro Por Forma de Pagamento',
    style: {
      fontSize: '17px',
    },
  },
  colors: obterArrayDeCores(dataLucroPorFormaPagamento?.length || 0),
  chart: {
    toolbar: {
      show: true,
    },
    zoom: {
      enabled: false,
    },
    foreColor: '#889aaf',
    fontFamily: 'Roboto',
  },
  grid: {
    show: true,
  },
  dataLabels: {
    enabled: true,
    dropShadow: {
      enabled: false,
    },
  },
  tooltip: {
    enabled: true,
  },
  xaxis: {
    type: 'category',
    categories: dataLucroPorFormaPagamento?.map((d:any) => d.x) || [],
  },
  fill: {
    opacity: 1,
  },
  plotOptions: {
    bar: {
      distributed: true,
    },
  },
};

const optionsProjecaoVendasFuturas :ApexOptions  = {
  title: {
    text: 'Projeção de Vendas Futuras',
    style: {
      fontSize: '17px',
    },
  },
  colors: obterArrayDeCores(dataProjecaoVendasFuturas?.length || 0),
  chart: {
    toolbar: {
      show: true,
    },
    zoom: {
      enabled: false,
    },
    foreColor: '#889aaf',
    fontFamily: 'Roboto',
  },
  grid: {
    show: true,
  },
  dataLabels: {
    enabled: true,
    dropShadow: {
      enabled: false,
    },
  },
  tooltip: {
    enabled: true,
  },
  xaxis: {
    type: 'category',
    categories: dataProjecaoVendasFuturas?.map((d:any) => d.x) || [],
  },
  fill: {
    opacity: 1,
  },
  plotOptions: {
    bar: {
      distributed: true,
    },
  },
};


useEffect(()=>{
  async function execFunction(){
    const despesasDia = await listarDespesasDia()
    setDataListarDespesasDia(despesasDia)
    const saldoDia = await listarSaldoDia()
    setDataListarSaldoDia(saldoDia)
    const despesas3Mes = await listarDespesas3Mes()
    setDataListarDespesas3Mes(despesas3Mes)
    const saldoAno = await listarSaldoAno()
    setDataListarSaldoAno(saldoAno)
    const saldoMes = await listarSaldoMes()
    setDataListarSaldoMes(saldoMes)
    const despesasMes = await listarDespesasMes()
    setDataListarDespesasMes(despesasMes)
    const recebimentosMes = await listarRecebimentosMes()
    setDataListarRecebimentosMes(recebimentosMes)
    const saldoLiquidoMes = await listarSaldoLiquidoMes()
    setDataListarSaldoLiquidoMes(saldoLiquidoMes)
    const vendasPendentesUsuario = await listarVendasPendentesUsuario()
    setDataListarVendasPendentesUsuario(vendasPendentesUsuario)
    const vendasUsuario = await listarVendasUsuario()
    setDataListarVendasUsuario(vendasUsuario)
    const vendasClientes = await listarVendasClientes()
    setDataListarVendasClientes(vendasClientes)
    const desempenhoProd = await desempenhoProduto();
      setDataDesempenhoProduto(desempenhoProd);
      const lucroBrutoProd = await lucroBrutoPorProduto();
      setDataLucroBrutoPorProduto(lucroBrutoProd);
      const lucroFormaPag = await lucroPorFormaPagamento();
      setDataLucroPorFormaPagamento(lucroFormaPag);
      const projecaoVendas = await projecaoVendasFuturas();
      setDataProjecaoVendasFuturas(projecaoVendas);
  }
  execFunction()
},[])

  return (
    <>
      <div className={styles.containerMain}>
          <div style={{padding:'0.4rem'}} className={styles.containerGraphics}>
          <div className={styles.graphic} >
            <Chart
                options={optionsGraficoVendasCliente}
                series={valoresVendasClientes}
                type="pie"
                height={280}
                // width={300}
              />
          </div>
          <div className={styles.graphic} >
            <Chart
                options={optionsGraficoVendasUsuario}
                series={[
                  { name: 'N° Vendas', data: valoresVendasUsuario },
                ]}
                type="bar"
                height={280}
                // width={300}
              />
          </div>
          <div className={styles.graphic} >
            <Chart
                options={optionsGraficoVendasUsuarioPendente}
                series={[
                  { name: 'N° Vendas', data: valoresVendasUsuarioPendente },
                ]}
                type="bar"
                height={280}
                // width={300}
              />
          </div>
          </div>
          <div style={{padding:'0.4rem'}} className={styles.containerGraphics}>
          <div
            className={styles.containerData}
            style={{
              backgroundColor: `white`,
              cursor: 'auto',
            }}
          >
            <span>Saldo Dia</span>
            <div className={styles.numberGraphics}>
              <h4>{formatarDinheiro(dataListarSaldoDia?.valorTotal || 0) || 'R$ 0,00'}</h4>
            </div>
          </div>
          <div className={styles.graphic} >
            <Chart
                options={optionsGraficoVendasRecebimentosPorMes}
                series={[
                  { name: 'Valor Total ', data: valoresRecebimentosPorMes },
                ]}
                type="bar"
                height={280}
                // width={300}
              />
          </div>
          <div className={styles.graphic} >
            <Chart
                options={optionsGraficoSaldoLiquidoMes}
                series={[
                  { name: 'Valor Total', data: valoreSaldoLiquidoMes },
                ]}
                type="line"
                height={280}
                // width={300}
              />
          </div>
          </div>
          <div style={{padding:'0.4rem'}} className={styles.containerGraphics}>
          <div
            className={styles.containerData}
            style={{
              backgroundColor: `white`,
              cursor: 'auto',
            }}
          >
            <span>Saldo Mês</span>
            <div className={styles.numberGraphics}>
              <h4>{formatarDinheiro(dataListarSaldoMes?.valorTotal || 0) || 'R$ 0,00'}</h4>
            </div>
          </div>
          <div
            className={styles.containerData}
            style={{
              backgroundColor: `white`,
              cursor: 'auto',
            }}
          >
            <span>Saldo Ano</span>
            <div className={styles.numberGraphics}>
              <h4>{formatarDinheiro(dataListarSaldoAno?.valorTotal || 0) || 'R$ 0,00'}</h4>
            </div>
          </div>
          <div
            className={styles.containerData}
            style={{
              backgroundColor: `white`,
              cursor: 'auto',
            }}
          >
            <span>Despesas Dia</span>
            <div className={styles.numberGraphics}>
              <h4>{formatarDinheiro(dataListarDespesasDia?.valorTotal || 0) || 'R$ 0,00'}</h4>
            </div>
          </div>
        
          </div>
          <div style={{padding:'0.4rem'}} className={styles.containerGraphics}>
          <div
            className={styles.containerData}
            style={{
              backgroundColor: `white`,
              cursor: 'auto',
            }}
          >
            <span>Despesas do Mês</span>
            <div className={styles.numberGraphics}>
              <h4>{formatarDinheiro(dataListarDespesasMes?.valorTotal || 0) || 'R$ 0,00'}</h4>
            </div>
          </div>
          <div className={styles.graphic}>
          <Chart
            options={optionsProjecaoVendasFuturas}
            series={[{ data: getChartData(dataProjecaoVendasFuturas) }]}
            type="bar"
            height={280}
          />
        </div>
          <div
            className={styles.containerData}
            style={{
              backgroundColor: `white`,
              cursor: 'auto',
            }}
          >
            <span>Despesas dos últimos 3 mêses</span>
            <div className={styles.numberGraphics}>
              <h4>{formatarDinheiro(dataListarDespesas3Mes?.valorTotal || 0) || 'R$ 0,00'}</h4>
            </div>
          </div>
          
          </div>
          <div style={{padding:'0.4rem'}} className={styles.containerGraphics}>
          <div className={styles.graphic}>
          <Chart
            options={optionsDesempenhoProduto}
            series={[{ data: getChartData(dataDesempenhoProduto) }]}
            type="bar"
            height={280}
          />
        </div>
        <div className={styles.graphic}>
          <Chart
            options={optionsLucroPorFormaPagamento}
            series={[{ data: getChartData(dataLucroPorFormaPagamento) }]}
            type="bar"
            height={280}
          />
        </div>
        <div className={styles.graphic}>
          <Chart
            options={optionsLucroBrutoPorProduto}
            series={[{ data: getChartData(dataLucroBrutoPorProduto) }]}
            type="bar"
            height={280}
          />
        </div>
          </div>
      </div>
    </>
  );
}
