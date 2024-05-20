import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { store } from "./redux/store";
import { Provider as ReduxProvider } from "react-redux";
import { ThemeProvider } from "./style/ThemeContext";
import GlobalStyle from "./style/GlobalStyle";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ReduxProvider store={store}>
    <App />
  </ReduxProvider>
);

reportWebVitals(console.log);
