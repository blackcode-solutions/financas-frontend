interface IProps {
  value: number | string;
}
export function MoneyStatus({ value }: IProps) {
  return <span style={{color:'#2e7d32',fontWeight:'500'}}>{value}</span>;
}
