import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import store from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";

import 'leaflet/dist/leaflet.css';


let persistor = persistStore(store);

createRoot(document.getElementById("root")).render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
          <Toaster/>
        </BrowserRouter>
      </PersistGate>
    </Provider>
);
