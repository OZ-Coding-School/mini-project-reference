import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { store } from "./redux/store";
import { Provider as ReduxProvider } from "react-redux";
import { CustomThemeProvider } from "./style/ThemeContext";
import GlobalStyle from "./style/GlobalStyle";
import { BookmarkProvider } from "./contexts/BookmarkContext";
import { AuthProvider } from "./components/LogIn/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ReduxProvider store={store}>
    <AuthProvider>
      <BookmarkProvider>
        <CustomThemeProvider>
          <GlobalStyle />
          <App />
        </CustomThemeProvider>
      </BookmarkProvider>
    </AuthProvider>
  </ReduxProvider>
);

reportWebVitals(console.log);
