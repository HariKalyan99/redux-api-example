import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchItems, addItem, deleteItem, updateItem } from './cartAPI';

const initialState = {
  items: [],
  status: 'idle',
};


export const fetchAsync = createAsyncThunk(
  'cart/fetchItems',
  async () => {
    const response = await fetchItems();
    return response.data;
  }
);

export const addAsync = createAsyncThunk(
  'cart/addItems',
  async (item) => {
    const {id, title, brand, price, thumbnail} = item
    const response = await addItem({id, title, brand, price, thumbnail, quantity: 1});
    return response.data;
  }
);

export const delAsync = createAsyncThunk(
  'cart/delItems',
  async (id) => {
    await deleteItem(id);
    return id;
  }
);

export const updateAsync = createAsyncThunk(
  'cart/updateItems',
  async ({id, change}) => {
    const response = await updateItem(id, change);
    return response.data;
  }
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload;
      }).addCase(addAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items.push(action.payload);
      }).addCase(delAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex(x => x.id === action.payload)
        state.items.splice(index, 1);
      }).addCase(updateAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex(x => x.id === action.payload.id)
        state.items.splice(index, 1, action.payload);
      });
  },
});

// export const {} = cartSlice.actions;
// ;

export default cartSlice.reducer;
