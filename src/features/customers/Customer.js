import { useSelector } from 'react-redux';

function Customer() {
  const cusName = useSelector((state) => state.customer.fullName);

  return <h2>👋 Welcome, {cusName}</h2>;
}

export default Customer;
