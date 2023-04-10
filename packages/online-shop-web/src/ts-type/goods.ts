export interface GoodsInfo {
    id: number
    cover: string
    title: string
    desc: string
    oprice: number
    pprice: number
}

export interface GoodsDetailInfo {
    id: number
    title: string
    cover: string
    desc: string
    min_price: number
    min_oprice: number
    [propName: string]: any
}

export interface GoodsSkuInfo {
    goods_id: number
    name: string
    [propName: string]: any
}

export interface FavoriteGoodsInfo {
    checked: boolean
    id: number
    title: string
    cover: string
    pprice: number
    num: number
    minnum?: number
    maxnum?: number
    skus_type?: number
}

export interface SearchInfo {
    title: string
    page?: number
    all?: "desc" | "asc"
    sale_count?: "desc" | "asc"
    min_price?: "desc" | "asc"
    price?: string
}
