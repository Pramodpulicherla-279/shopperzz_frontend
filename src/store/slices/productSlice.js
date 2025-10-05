import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getDemandedProducts,
  getProducts,
  getCartProducts,
} from '../../api/services/product.service';

// interface ProductState {
//   items: Product[];
//   status: 'idle' | 'loading' | 'succeeded' | 'failed';
//   error: string | null;
// }

// const initialState = {
//   items: [],
//   status: 'idle',
//   error: null,
// };

const initialProductsState = {
  items: [],
  status: 'idle',
  error: null,
};

const initialDemandedProductsState = {
  items: [],
  status: 'idle',
  error: null,
};

const initialCartProductsState = {
  items: [],
  status: 'idle',
  error: null,
};

// Create an async thunk to fetch products
export const fetchDemandedProducts = createAsyncThunk(
  'demandedProducts/fetchDemandedProducts',
  async () => {
    const demandedProducts = await getDemandedProducts();
    return demandedProducts;
  },
);

// Add a new thunk for fetching all products for the ProductList screen
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const products = await getProducts();
    return products;
  },
);

// Add a new thunk for fetching all cart products for the Cart screen
export const fetchCartProducts = createAsyncThunk(
  'cartProducts/fetchcartProducts',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;

      if (!token) {
        return thunkAPI.rejectWithValue('No Authentication token found.');
      }

      // Pass the token to your updated service function
      const data = await getCartProducts(token);
      return data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  },
);

const productSlice = createSlice({
  name: 'products',
  initialState: initialProductsState,
  reducers: {},
  extraReducers: builder => {
    builder
      // Add cases for all products
      .addCase(fetchProducts.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

const demandedProductSlice = createSlice({
  name: 'demandedProducts',
  initialState: initialDemandedProductsState,
  reducers: {},
  extraReducers: builder => {
    builder
      // Add cases for demanded products
      .addCase(fetchDemandedProducts.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchDemandedProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchDemandedProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

const cartProductSlice = createSlice({
  name: 'cartProducts',
  initialState: initialCartProductsState,
  reducers: {},
  extraReducers: builder => {
    builder
      // Add cases for demanded products
      .addCase(fetchCartProducts.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchCartProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCartProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

// export default productSlice.reducer;
export const productReducer = productSlice.reducer;
export const demandedProductReducer = demandedProductSlice.reducer;
export const cartProductReducer = cartProductSlice.reducer;
