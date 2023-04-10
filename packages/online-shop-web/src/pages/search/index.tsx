import { useState, useEffect } from "react"
import { Search } from "react-vant"

import { reqSearch } from "../../api"

const SearchWrap = () => {
    const [value, setValue] = useState<string>("")
    useEffect(() => {
        if (value !== "") {
            const searchInfo = {
                title: value,
                page: 10
                // all: "desc",
                // sale_count: "desc",
                // min_price: "asc"
            }
            reqSearch(searchInfo).then((res) => {
                console.log(res)
            })
        }
    }, [value])
    return (
        <div>
            <Search
                shape="round"
                value={value}
                onChange={setValue}
                placeholder="请输入搜索关键词"
            />
        </div>
    )
}

export default SearchWrap
