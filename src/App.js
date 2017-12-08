import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

//Components
import Landing from './components/landing'

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <h1>Blog</h1>
                    <Route exact path="/" component={Landing}/>
                    {/*<Route exact path="/posts"/>  */}
                </div>
            </Router>
        );
    }
}

export default App;
