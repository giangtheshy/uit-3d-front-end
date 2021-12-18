import * as types from "../constant";
import * as apis from "../apis";

export const getAllData = () => async (dispatch) => {
  try {
    const { data } = await apis.getAllData();
    dispatch({
      type: types.GET_DATA,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};
export const getBlockData = (block) => async (dispatch) => {
  try {
    const { data } = await apis.getBlockData(block);
    dispatch({
      type: types.GET_DATA,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};
