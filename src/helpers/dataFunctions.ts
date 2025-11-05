import moment from 'moment'

export function onCalcularData(dias: number, data?: string, format?: string): string {
    if (!dias) {
      return format === 'iso' ? moment().format('YYYY-MM-DDTHH:mm') : moment().format('DD/MM/YYYY HH:mm:ss');
    }
    if (data) {
      return format === 'iso' ? moment(data).add(dias, 'days').format('YYYY-MM-DDTHH:mm') : moment(data).add(dias, 'days').format('DD/MM/YYYY HH:mm:ss');
    }
    return format === 'iso' ? moment().add(dias, 'days').format('YYYY-MM-DDTHH:mm') : moment().add(dias, 'days').format('DD/MM/YYYY HH:mm:ss');
}

export function onSubData(dias: number, data?: string, format?: string): string {
    if (!dias) {
      return format === 'iso' ? moment().format('YYYY-MM-DDTHH:mm') : moment().format('DD/MM/YYYY HH:mm:ss');
    }
    if (data) {
      return format === 'iso' ? moment(data).subtract(dias, 'days').format('YYYY-MM-DDTHH:mm') : moment(data).subtract(dias, 'days').format('DD/MM/YYYY HH:mm:ss');
    }
    return format === 'iso' ? moment().subtract(dias, 'days').format('YYYY-MM-DDTHH:mm') : moment().subtract(dias, 'days').format('DD/MM/YYYY HH:mm:ss');
}

  export function FormataStringData(data: string) {
    const [datePart, timePart] = data.split(' ');
    
    const [dia, mes, ano] = datePart.split('/');
    
    let formattedDate = ano + '-' + ('0' + mes).slice(-2) + '-' + ('0' + dia).slice(-2);
    
    if (timePart) {
      const [horas, minutos, segundos] = timePart.split(':');
      formattedDate += 'T' + ('0' + horas).slice(-2) + ':' + ('0' + minutos).slice(-2) + ':' + ('0' + segundos).slice(-2);
    } else {
      formattedDate += 'T00:00:00';
    }
  
    return formattedDate;
  }