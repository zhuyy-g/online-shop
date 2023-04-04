import { GoodsInfo } from "../../ts-type/goods"

export const getSwiperList = (res: Record<any, any>) => {
    let swiperImgs: Array<string> = []
    const successRes = res.data.find((item: { type: string }) => item.type === "swiper")
    swiperImgs = successRes?.data.map((item: { src: any }) => {
        return item.src
    })
    return swiperImgs
}

export const getIndexnavsList = (res: Record<any, any>) => {
    let indexnavsList: Array<any> = []
    const successRes = res.data.find((item: { type: string }) => item.type === "indexnavs")
    indexnavsList = successRes?.data
    return indexnavsList
}

export const getHotGoodsList = (res: Record<any, any>) => {
    let hotGoodsList: Array<GoodsInfo> = []
    const successRes = res.data.find((item: { type: string }) => item.type === "list")
    hotGoodsList = successRes?.data
    let i = 25
    hotGoodsList.forEach((hotGoods) => {
        hotGoods.id = i++
    })
    return hotGoodsList
}
