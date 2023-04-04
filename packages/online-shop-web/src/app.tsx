import { Outlet } from "react-router-dom"

import BottomNav from "./components/BottomNav"

const App = () => {
    return (
        <div>
            <BottomNav />
            <Outlet />
        </div>
    )
}

export default App
