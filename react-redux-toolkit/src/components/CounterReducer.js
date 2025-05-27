import { createSlice } from "@reduxjs/toolkit";

const CounterReducer = createSlice({
  name: "counter",
  initialState: 0,
  reducers: {
    increment: (state, action) => state + action.payload,
    decrement: (state) => state - 1,
  },
});

export const { increment, decrement } = CounterReducer.actions;

export default CounterReducer;
