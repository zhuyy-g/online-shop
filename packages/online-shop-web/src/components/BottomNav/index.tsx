import React from "react"
import { useNavigate } from "react-router-dom"
import { Tabbar } from "react-vant"
import { HomeO, Search } from "@react-vant/icons"

const BottomNav = () => {
    const navigate = useNavigate()
    const [name, setName] = React.useState<string>("/")

    const changeTabEvent = (active: number | string) => {
        setName(active.toString())
        navigate(active.toString())
    }

    return (
        <div className="demo-tabbar">
            <Tabbar value={name} onChange={changeTabEvent}>
                <Tabbar.Item icon={<HomeO />} name="/">
                    首页
                </Tabbar.Item>
                <Tabbar.Item icon={<Search />} name="cart">
                    购物车
                </Tabbar.Item>
            </Tabbar>
        </div>
    )
}

export default BottomNav
