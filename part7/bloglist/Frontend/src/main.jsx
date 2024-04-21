import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import store from './store'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import React from 'react'
import CustomThemeProvider from './components/CustomThemeProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <Router>
            <CustomThemeProvider>
                <App />
            </CustomThemeProvider>
        </Router>
    </Provider>
)
