import { Image, Tag } from "react-vant"

import { GoodsInfo } from "../../ts-type/goods"
import "./index.less"

const GoodsSketch = (props: GoodsInfo) => {
    const { cover, title, desc, oprice } = props
    return (
        <div className="goods-sketch-warp">
            <Image src={cover} />
            <div className="goods-sketch-desd">
                <Tag size="medium" type="primary" round>
                    {title}
                </Tag>
                {desc}
            </div>
            <div className="goods-sketch-price">{`¥${oprice}`}</div>
        </div>
    )
}

export default GoodsSketch
