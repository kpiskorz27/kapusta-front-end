import React from "react";
import ReactDOM from "react-dom/client";
import { App2 } from "./components/App2";
import "./index.css";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/storeP";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App2 />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
