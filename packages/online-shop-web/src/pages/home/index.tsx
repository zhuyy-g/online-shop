// 首页
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Search, Swiper, Image, Grid } from "react-vant"

import GoodsSketch from "../../components/GoodsSketch"
import "./index.less"
import { reqAuth, reqIndexCategory } from "../../api/index"
import { getSwiperList, getIndexnavsList, getHotGoodsList } from "./logic"
import { GoodsInfo } from "../../ts-type/goods"

const Home = () => {
    const navigate = useNavigate()
    const [value, setValue] = useState<string>("")
    const [swiperImgs, setSwiperImgs] = useState<Array<string>>([])
    const [indexnavsList, setIndexnavsList] = useState<Array<any>>([])
    const [hotGoodsList, setHotGoodsList] = useState<Array<GoodsInfo>>([])
    const [token, setToken] = useState<string>("")

    useEffect(() => {
        let userId = ""
        let token = ""
        // 后台读取Cookie，获取uid和Token，去数据库对比，如果都存在，且在有效期内，则通过uid直接获取用户信息
        const cookieList = document.cookie.split("; ")
        cookieList.length > 0 &&
            cookieList.forEach((item: string) => {
                if (item.indexOf("token") !== -1) {
                    token = item.split("=")?.[1]
                    setToken(token)
                }
                if (item.indexOf("userId") !== -1) userId = item.split("=")?.[1]
            })
        if (token && userId) {
            reqAuth({ token, userId }).then((res) => {
                if (res.data.msg !== "ok") {
                    navigate("/login")
                }
            })
        }
        if (!token) {
            navigate("/login")
        }
        reqIndexCategory().then((res) => {
            if (res.data.msg === "ok") {
                const successRes = res.data.data
                const swiperImgs = getSwiperList(successRes)
                const indexnavsList = getIndexnavsList(successRes)
                const hotGoodsList = getHotGoodsList(successRes)
                setSwiperImgs(swiperImgs)
                setIndexnavsList(indexnavsList)
                setHotGoodsList(hotGoodsList)
            }
        })
    }, [])
    return (
        <div>
            {token && (
                <div>
                    {/* 搜索 */}
                    <Search
                        shape="round"
                        value={value}
                        onChange={setValue}
                        placeholder="请输入搜索关键词"
                    />
                    {/* 轮播图 */}
                    <div className="demo-swiper">
                        <Swiper>
                            {swiperImgs.map((image, index) => (
                                <Swiper.Item key={index}>
                                    <Image lazyload src={image} />
                                </Swiper.Item>
                            ))}
                        </Swiper>
                    </div>
                    {/* 分类导航 */}
                    <div className="nav-wrap">
                        <Grid columnNum={5}>
                            {Array.from({ length: indexnavsList.length }, (_, i) => (
                                <Grid.Item key={i}>
                                    <Image src={indexnavsList[i].src} />
                                    <span style={{ marginTop: "10px" }}>
                                        {indexnavsList[i].text}
                                    </span>
                                </Grid.Item>
                            ))}
                        </Grid>
                    </div>
                    {/* 推荐商品列表 */}
                    <div className="hotGoods-wrap">
                        <Grid columnNum={2}>
                            {Array.from({ length: hotGoodsList.length }, (_, i) => (
                                <Grid.Item
                                    key={i}
                                    onClick={() => navigate(`detail/${hotGoodsList[i].id}`)}
                                >
                                    <GoodsSketch {...hotGoodsList[i]} />
                                </Grid.Item>
                            ))}
                        </Grid>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Home
