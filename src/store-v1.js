import { combineReducers, createStore } from 'redux';

const accountState = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
};

const customerState = {
  fullName: '',
  nationalId: '',
  createdOn: '',
};

function accountReducer(state = accountState, action) {
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

function customerReducer(state = customerState, action) {
  switch (action.type) {
    case 'customer/createCus':
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalId: action.payload.nationalId,
        createdOn: action.payload.createdOn,
      };
    case 'customer/updateCusName':
      return {
        ...state,
        fullName: action.payload.fullName,
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer);

// store.dispatch({ type: 'account/deposit', payload: 500 });
// console.log(store.getState());
// store.dispatch({
//   type: 'account/requestLoan',
//   payload: {
//     loan: 1000,
//     loanPurpose: 'buy a car',
//   },
// });
// console.log(store.getState());
// store.dispatch({
//   type: 'account/payLoan',
// });
// console.log(store.getState());

function deposit(amount) {
  return {
    type: 'account/deposit',
    payload: amount,
  };
}

function withdraw(amount) {
  return {
    type: 'account/withdraw',
    payload: amount,
  };
}

function requestLoan(loan, purpose) {
  return {
    type: 'account/requestLoan',
    payload: {
      loan,
      purpose,
    },
  };
}

function payloan() {
  return {
    type: 'account/payLoan',
  };
}

function createCus(fullName, nationalId) {
  return {
    type: 'customer/createCus',
    payload: {
      fullName,
      nationalId,
      createdOn: new Date().toISOString(),
    },
  };
}

function updateCusName(fullName) {
  return {
    type: 'customer/updateCusName',
    payload: {
      fullName,
    },
  };
}

// store.dispatch(deposit(500));
// console.log(store.getState());
// store.dispatch(withdraw(200));
// console.log(store.getState());
// store.dispatch(requestLoan(200, 'to get a toy'));
// console.log(store.getState());
// store.dispatch(payloan());
// console.log(store.getState());
// store.dispatch(createCus('Sujay', '12324'));
// console.log(store.getState());
// store.dispatch(updateCusName('sanjay', '12324'));
// console.log(store.getState());
