import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import {store} from './store/store.js';

function App() {
    return (
        <Provider Provider store={store}>
            <div className="AppContainer">
                <Outlet />
            </div>
        </Provider>
    );
}

export default App;
