import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Product {
    id: number;
    name: string;
    description: string;
    cost_price: string; // Stored as string to match JSON format
    selling_price: string; // Stored as string to match JSON format
    category: string;
    stock_available: number;
    units_sold: number;
    last_recorded_units_sold: number;
    customer_rating: string; // Stored as string to match JSON format
    demand_forecast: number;
    optimized_price: string; // Stored as string to match JSON format
    forecast_updated_at: string | null; // Nullable timestamp
    created_at: string; // Timestamp in ISO format
    updated_at: string; // Timestamp in ISO format
}

interface ProductResponse{
    data : Product
}

interface ProductDeleteResponse{
    data : boolean
}



interface ProductList {
    page: number;
    count: number;
    page_size: number;
    total_pages: number;
    data: Product[];
}

interface ProductDetailRequest{
    id: number
}

interface ProductUpdateRequest {
    id: string;
    name?: string;
    category?: string;
    cost_price?: number;
    selling_price?: number;
    description?: string;
    stock?: number;
    units_sold?: number;
}

interface ProductCreateRequest {
    name: string;
    category: string;
    cost_price: number;
    selling_price: number;
    description: string;
    stock: number;
    units_sold: number;
    rating: number;
}

interface LoginRequest {
    email: string;
    password: string;
}

interface RegisterRequest {
    email: string;
    password: string;
    role: string;
    first_name: string;
    last_name?: string;
}

interface ProductState {
    loading: boolean;
    error: string | null;
    product: Product | null;
    product_list: ProductList|null;
}

interface ProductListRequest {
    page_size: number;
    page: number;
    name?: string;
    category?: string;
}

const initialState: ProductState = {
    loading: false,
    error: null,
    product: null,
    product_list: null
};

export const getProductList = createAsyncThunk<
    ProductList,
    ProductListRequest,
    { rejectValue: string }
>("product/product_list", async (payload, { rejectWithValue }) => {
    const token = localStorage.getItem('accessToken')

    try {
        const response = await axios.request({
            baseURL: `http://localhost:8000/product/`,
            timeout: 10000,
            data: payload,
            method: "GET",
            headers:{
                Authorization: `Bearer ${token}`,
            }
        });

        return response.data;
    } catch (error: any) {
        return rejectWithValue(
            error?.response?.data?.message || "Something went wrong"
        );
    }
});

export const createProduct = createAsyncThunk<
    ProductCreateRequest,
    ProductResponse,
    { rejectValue: string }
>("product/create", async (payload, { rejectWithValue }) => {
    try {
        const response = await axios.request({
            baseURL: `http://localhost:8000/product/create/`,
            timeout: 10000,
            data: payload,
            method: "POST",
        });

        return response.data;
    } catch (error: any) {
        return rejectWithValue(
            error?.response?.data?.message || "Something went wrong"
        );
    }
});

export const updateProduct = createAsyncThunk<
    ProductUpdateRequest,
    ProductResponse,
    { rejectValue: string }
>("product/create", async (payload, { rejectWithValue }) => {
    try {
        const response = await axios.request({
            baseURL: `http://localhost:8000/product/update/`,
            timeout: 10000,
            data: payload,
            method: "PUT",
        });

        return response.data;
    } catch (error: any) {
        return rejectWithValue(
            error?.response?.data?.message || "Something went wrong"
        );
    }
});

export const deleteProduct = createAsyncThunk<
    ProductDetailRequest,
    ProductDeleteResponse,
    { rejectValue: string }
>("product/delete", async (payload, { rejectWithValue }) => {
    try {
        const response = await axios.request({
            baseURL: `http://localhost:8000/product/delete/`,
            timeout: 10000,
            data: payload,
            method: "DELETE",
        });

        return response.data;
    } catch (error: any) {
        return rejectWithValue(
            error?.response?.data?.message || "Something went wrong"
        );
    }
});

// export const getProductForecast = createAsyncThunk<
//     ProductCreateRequest,
//     ProductResponse,
//     { rejectValue: string }
// >("product/create", async (payload, { rejectWithValue }) => {
//     try {
//         const response = await axios.request({
//             baseURL: `http://localhost:8000/product/create`,
//             timeout: 10000,
//             data: payload,
//             method: "POST",
//         });

//         return response.data;
//     } catch (error: any) {
//         return rejectWithValue(
//             error?.response?.data?.message || "Something went wrong"
//         );
//     }
// });

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        clearProduct(state) {
            state.product = null;
            state.loading = false;
            state.error = null;
            state.product_list = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProductList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                getProductList.fulfilled,
                (state, action: PayloadAction<ProductList>) => {
                    state.loading = false;
                    state.product_list = action.payload;
                }
            )
            .addCase(getProductList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
            })
          
    },
});

export const { clearProduct } = productSlice.actions;

export default productSlice.reducer;
