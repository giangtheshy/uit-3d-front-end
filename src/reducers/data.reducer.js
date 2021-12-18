import * as types from "../constant";

export default (state = [], { payload, type }) => {
  switch (type) {
    case types.GET_DATA:
      return [...payload];
   
    default:
      return state;
  }
};
