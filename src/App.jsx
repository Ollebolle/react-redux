import React from 'react'
import {
  HashRouter,
  Route,
  Link,
  Switch
} from 'react-router-dom'
import { Provider } from 'react-redux'
import routes from './routes'
import configureStore from './store/configureStore'

const store = configureStore()

const App = () => (
  <Provider store={store}>
    <HashRouter>
      <main className="container">
        <Switch>
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
        </Switch>
      </main>
    </HashRouter>
  </Provider>
)

export default App
