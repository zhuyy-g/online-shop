import { useEffect, useState, useRef } from "react"
import { Card, Image, Toast, Tag, ActionBar, Sku } from "react-vant"
import type { SkuInstance } from "react-vant"
import { ArrowLeft, CartO, ChatO, ShopO } from "@react-vant/icons"
import { useParams, useNavigate } from "react-router-dom"
import { useAppDispatch } from "../../redux/hooks"
import { addFavoriteGoods } from "../../redux/favoriteGoods/FavoriteGoodsSlice"

import { reqGoodsDetail } from "../../api/index"
import { GoodsDetailInfo, GoodsSkuInfo } from "../../ts-type/goods"
import { getSkuData } from "./data"
import "./index.less"

const demoData = getSkuData()

const GoodsDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const ref = useRef<SkuInstance>(null)
    const dispatch = useAppDispatch()

    const [goodsNum, setGoodsNum] = useState<number>(1)
    const [goodsDetail, setGoodsDetail] = useState<GoodsDetailInfo>({
        id: 1,
        title: "",
        cover: "",
        desc: "",
        min_price: 1,
        min_oprice: 1
    })
    const [isExist, setIsExist] = useState<Boolean>(true)
    // 商品的参数列表
    const [skuList, setSkuList] = useState<Array<GoodsSkuInfo>>([])

    useEffect(() => {
        if (typeof id === "string") {
            reqGoodsDetail(id)
                .then((res) => {
                    if (res?.data?.msg === "ok") {
                        const successRes = res.data.data
                        setGoodsDetail(successRes)
                        setSkuList(successRes.goodsSkusCard)
                    }
                })
                .catch(() => {
                    setIsExist(false)
                })
        }
    }, [])

    // 加入购物车事件
    const addCartEvent = () => {
        const temp = {
            checked: true,
            id: goodsDetail.id,
            title: goodsDetail.title,
            cover: goodsDetail.cover,
            pprice: goodsDetail.min_oprice,
            desc: goodsDetail.desc,
            num: goodsNum
        }
        dispatch(addFavoriteGoods(temp))
        navigate("/cart")
    }

    return (
        <div>
            {isExist ? (
                <Card round style={{ marginBottom: 20 }}>
                    <Card.Header onClick={() => navigate(-1)}>
                        <ArrowLeft />
                    </Card.Header>
                    <Card.Body>
                        <Image src={goodsDetail.cover} />
                        <div className="goods-detail-warp">
                            <div className="goods-detail-warp-price">
                                <div>{`¥${goodsDetail.min_oprice}`}</div>
                                <Tag size="medium" type="primary" round>{`折后¥${
                                    goodsDetail.min_oprice - goodsDetail.sale_count
                                }`}</Tag>
                            </div>
                            <div className="goods-detail-warp-title">
                                <span>{goodsDetail.title}</span>
                                <span style={{ marginLeft: "10px" }}>{goodsDetail.desc}</span>
                            </div>
                        </div>
                        <div className="goods-detail-warp">
                            {skuList.length > 0 &&
                                skuList.map((item) => (
                                    <div className="goods-sku-warp-item" key={item.id}>
                                        <div className="goods-sku-warp-item-left">{item.name}</div>
                                        <div className="goods-sku-warp-item-right">
                                            {item.goodsSkusCardValue.map(
                                                (item1: { value: string }) => (
                                                    <div
                                                        className="goods-sku-warp-item-detail"
                                                        key={item1.value}
                                                    >
                                                        {item1.value}
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                ))}
                        </div>
                        <div className="goods-commont-warp" />
                    </Card.Body>
                </Card>
            ) : (
                <div>商品不存在</div>
            )}
            <div className="demo-action-bar">
                <ActionBar>
                    <ActionBar.Icon
                        icon={<ChatO />}
                        text="客服"
                        onClick={() => console.log("chat click")}
                    />
                    <ActionBar.Icon
                        icon={<CartO />}
                        text="购物车"
                        onClick={() => console.log("cart click")}
                    />
                    <ActionBar.Icon
                        icon={<ShopO />}
                        text="店铺"
                        onClick={() => console.log("shop click")}
                    />
                    <ActionBar.Button
                        type="danger"
                        text="加入购物车"
                        onClick={() => ref.current?.show()}
                    />
                </ActionBar>
            </div>
            <Sku
                ref={ref}
                sku={demoData.sku}
                goods={demoData.goods_info}
                goodsId={demoData.goods_id}
                properties={demoData.properties}
                onAddCart={addCartEvent}
                onBuyClicked={(value) => Toast(JSON.stringify(value))}
                onStepperChange={(v) => setGoodsNum(v)}
            />
        </div>
    )
}

export default GoodsDetail
