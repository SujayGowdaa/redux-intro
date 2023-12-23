import { useSelector } from 'react-redux';

function formatCurrency(value) {
  return new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}

function BalanceDisplay() {
  const actBal = useSelector((state) => state.account.balance);

  return <div className='balance'>{formatCurrency(actBal)}</div>;
}

export default BalanceDisplay;
