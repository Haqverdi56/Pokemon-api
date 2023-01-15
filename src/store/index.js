import { configureStore } from '@reduxjs/toolkit'
import pokemonReducer from './pokemonSlice' 

const store = configureStore({
    reducer: {
        pokemons: pokemonReducer,
    }
})

export default store