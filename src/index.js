import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, HashRouter } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.less';
import './index.less';
import App from './App'
import http from '@/common/http'
http.setConfig({
    baseURL: process.env.REACT_APP_APIBASE || ''
})

ReactDOM.render(
    <HashRouter>
        <App />
    </HashRouter>,
    document.getElementById("root")
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
