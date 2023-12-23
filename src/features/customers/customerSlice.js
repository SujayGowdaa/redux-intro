import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fullName: '',
  nationalId: '',
  createdOn: '',
};
// Redux Modern
const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    createCus(state, action) {
      state.fullName = action.payload.fullName;
      state.nationalId = action.payload.nationalId;
      state.createdOn = action.payload.createdOn;
    },
    updateCusName(state, action) {
      state.fullName = action.payload;
    },
  },
});

export const { createCus, updateCusName } = customerSlice.actions;
export default customerSlice.reducer;

// Redux classic
// export default function customerReducer(state = customerState, action) {
//   switch (action.type) {
//     case 'customer/createCus':
//       return {
//         ...state,
//         fullName: action.payload.fullName,
//         nationalId: action.payload.nationalId,
//         createdOn: action.payload.createdOn,
//       };
//     case 'customer/updateCusName':
//       return {
//         ...state,
//         fullName: action.payload.fullName,
//       };
//     default:
//       return state;
//   }
// }

// export function createCus(fullName, nationalId) {
//   return {
//     type: 'customer/createCus',
//     payload: {
//       fullName,
//       nationalId,
//       createdOn: new Date().toISOString(),
//     },
//   };
// }

// export function updateCusName(fullName) {
//   return {
//     type: 'customer/updateCusName',
//     payload: {
//       fullName,
//     },
//   };
// }
