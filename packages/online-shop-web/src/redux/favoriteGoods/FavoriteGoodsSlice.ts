import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { RootState } from "../store"

// Define a type for the slice state
interface FavoriteGoodsState {
    checked: boolean
    id: number
    title: string
    cover: string
    pprice: number
    num: number
    desc: string
    minnum?: number
    maxnum?: number
    skus_type?: number
}

// Define the initial state using that type
const initialState: Array<FavoriteGoodsState> = []

export const FavoriteGoodsSlice = createSlice({
    name: "favoriteGoods",
    initialState,
    reducers: {
        // 购物车新增一条数据
        addFavoriteGoods: (state, action: PayloadAction<FavoriteGoodsState>) => {
            state.push(action.payload)
        },
        // 切换购物车中某条数据的选中状态
        updateFavoriteGoods: (state, action: PayloadAction<FavoriteGoodsState>) => {
            const temp = state.find(({ id }) => id === action.payload.id)
            if (temp?.checked) {
                temp.checked = action.payload.checked
            }
        }
    }
})

export const { addFavoriteGoods, updateFavoriteGoods } = FavoriteGoodsSlice.actions

export const selectFavoriteGoods = (state: RootState) => state.favoriteGoods

export default FavoriteGoodsSlice.reducer
