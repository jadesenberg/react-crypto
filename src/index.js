import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './index.css';
import Header from './components/common/Header';
import List from './components/coinlist/List';
import NotFound from './components/notfound/NotFound';
import Detail from './components/detail/Detail';

const App = () => {

    return (
        <BrowserRouter>
            <div>
                <Header />

                <Switch>
                    <Route path="/" exact component={List} />
                    <Route path="/currency/:id" component={Detail}/>
                    <Route component={NotFound} />
                </Switch>
            </div>
        </BrowserRouter>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);