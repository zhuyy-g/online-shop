import { useState, useRef } from "react"
import { ProductCard, Checkbox, SubmitBar } from "react-vant"
import type { CheckboxGroupInstance } from "react-vant"
import { useAppSelector } from "../../redux/hooks"

import { selectFavoriteGoods } from "../../redux/favoriteGoods/FavoriteGoodsSlice"
import "./index.less"

// 购物车
const Cart = () => {
    const ref = useRef<CheckboxGroupInstance>(null)
    const [checkAll, setCheckAll] = useState<any>([])
    const [totalPrice, setTotalPrice] = useState<number>(0)
    const favoriteGoods = useAppSelector(selectFavoriteGoods)

    const changeCheckAllEvent = (names: any[]) => {
        const totalPrice = names.reduce((initPrice, name) => {
            const temp = favoriteGoods.find(({ id }) => id === name)
            if (temp?.pprice && temp?.num) {
                return initPrice + temp?.pprice * temp?.num
            }
            return initPrice
        }, 0)
        setTotalPrice(totalPrice)
        setCheckAll(names)
    }

    const toggleCheckAllEvent = () => {
        if (checkAll.length === favoriteGoods.length) {
            ref.current?.toggleAll()
        } else {
            ref.current?.toggleAll(true)
        }
    }

    return (
        <div className="demo-checkbox">
            <div className="demo-checkbox-title">购物车</div>
            <Checkbox.Group
                ref={ref}
                value={checkAll}
                onChange={(names) => changeCheckAllEvent(names)}
            >
                {favoriteGoods.map((item) => (
                    <Checkbox
                        name={item.id}
                        key={item.id}
                        checked={checkAll.includes(item.id)}
                        checkedColor="#bb2649"
                    >
                        <ProductCard
                            num={item.num}
                            price={item.pprice}
                            desc={item.desc}
                            title={item.title}
                            thumb={item.cover}
                        />
                    </Checkbox>
                ))}
            </Checkbox.Group>
            <SubmitBar price={totalPrice * 100} buttonText="提交订单">
                <Checkbox
                    onClick={toggleCheckAllEvent}
                    checked={checkAll.length === favoriteGoods.length}
                    checkedColor="#bb2649"
                >
                    全选
                </Checkbox>
            </SubmitBar>
        </div>
    )
}

export default Cart
