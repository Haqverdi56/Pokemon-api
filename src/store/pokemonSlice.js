import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import axios from "axios";

const initialState = {
    pokemonData:[],
    status: "idle",
    error: "",
    page: 1,
    pages: "",
}

export const fetchPokemons = createAsyncThunk("pokemons/getPokemons", async (page) => {
    const res = await axios(`https://pokeapi.co/api/v2/pokemon/?offset=${(page - 1) * 20}&limit=20`)
    return res.data
})


const pokemonSlice = createSlice({
    name: "pokemon",
    initialState,
    reducers: {
        changePage:(state, action) => {
            state.page = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPokemons.pending, (state, action) => {
            state.status = "loading"
            state.error= ''
        });
        builder.addCase(fetchPokemons.fulfilled, (state, action) => {
            state.pokemonData = [...action.payload.results];
            state.status = "success"
        });
        builder.addCase(fetchPokemons.rejected, (state, action) => {
            state.status = "failed"
            state.error = action.error.message
        })
    }
})

export const { changePage } = pokemonSlice.actions
 
export default pokemonSlice.reducer