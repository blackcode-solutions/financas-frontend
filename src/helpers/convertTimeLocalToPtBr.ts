export const convertToPtBrFormat = (dateTime:string) => {
    const [date, time] = dateTime.split('T');
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year} ${time}`;
  };

  export const convertToISOFormat = (ptBrDateTime:string) => {
    const [date, time] = ptBrDateTime.split(' ');
    const [day, month, year] = date.split('/');
    return `${year}-${month}-${day}T${time}`;
  };


  export function returnDateAndMinuts(){
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
  
    const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;

    return formattedDateTime
  }

  export function returnDate(hours:string,minutes:string){
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
  
    const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;

    return formattedDateTime
  }