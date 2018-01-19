import React from 'react'
import {
  HashRouter,
  Route,
  Link,
  Switch
} from 'react-router-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import routes from './routes'
import configureStore, { history } from './store/configureStore'

const store = configureStore()

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <main className="container">
        {
          routes.map((route, index) => (
            <Route
              exact
              path={ route.url }
              component={ route.component }
              key={ route.url }
            />
          ))
        }
      </main>
    </ConnectedRouter>
  </Provider>
)

export default App
