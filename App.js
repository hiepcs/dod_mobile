import React from 'react';
import {Provider} from "react-redux";
import store from "./src/store";
import Navigation from "./src/pages/Navigation";


export default class App extends React.Component {

    componentDidMount() {
    }

    render() {
        return (
            <Provider store={store}>
                <Navigation/>
            </Provider>
        );
    }
}