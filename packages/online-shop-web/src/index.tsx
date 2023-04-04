import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./redux/store"
import { ConfigProvider } from "react-vant"

// import App from './app';
import Router from "./router"
import { themeVars } from "./common/theme"
import "./style.less"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <ConfigProvider themeVars={themeVars}>
                <Router />
            </ConfigProvider>
        </Provider>
    </React.StrictMode>
)
