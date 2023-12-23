import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    requestLoan(state, action) {
      if (state.loan > 0) return;
      state.balance += action.payload.loanAmount;
      state.loan += action.payload.loanAmount;
      state.loanPurpose = action.payload.loanPurpose;
    },
    payLoan(state) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = '';
    },
  },
});

export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

export function deposit(amount, currency) {
  if (currency === 'USD')
    return {
      type: 'account/deposit',
      payload: amount,
    };

  return async function (dispatch) {
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    dispatch({ type: 'account/deposit', payload: data.rates.USD });
  };
}

export default accountSlice.reducer;

/*
export default function accountReducer(state = initialState, action) {
  switch (action.type) {
    case 'account/deposit':
      return {
        ...state,
        balance: state.balance + action.payload,
      };
    case 'account/withdraw':
      return {
        ...state,
        balance: state.balance - action.payload,
      };
    case 'account/requestLoan':
      if (state.loan > 0)
        return {
          ...state,
          balance: state.balance + action.payload,
        };
      return {
        ...state,
        balance: state.balance + action.payload.loan,
        loanPurpose: action.payload.purpose,
        loan: action.payload.loan,
      };
    case 'account/payLoan':
      return {
        ...state,
        loan: 0,
        loanPurpose: '',
        balance: state.balance - state.loan,
      };
    default:
      return {
        ...state,
      };
  }
}

export function deposit(amount, currency) {
  if (currency === 'USD')
    return {
      type: 'account/deposit',
      payload: amount,
    };

  return async function (dispatch) {
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    dispatch({ type: 'account/deposit', payload: data.rates.USD });
  };
}

export function withdraw(amount) {
  return {
    type: 'account/withdraw',
    payload: amount,
  };
}

export function requestLoan(loan, purpose) {
  return {
    type: 'account/requestLoan',
    payload: {
      loan,
      purpose,
    },
  };
}

export function payloan() {
  return {
    type: 'account/payLoan',
  };
}
*/
