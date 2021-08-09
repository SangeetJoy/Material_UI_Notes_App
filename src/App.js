import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Notes from './client/components/Notes'
import Create from './client/components/Create'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import Layout from './client/components/Layout'
import Paper from '@material-ui/core/Paper'
import { useState } from 'react'

function App() {

  const [darkMode, setDarkMode] = useState(false)


  const theme = createTheme({
    palette: {
      type: darkMode ? "dark" : "light",
      primary: {
        main: darkMode ? "#ae52d4" : "#6200ea"
      }
    }
  });

  const onDarkModeChange = () => {
    setDarkMode(!darkMode)
  }

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Paper>
          <Layout darkMode={darkMode} onDarkModeChange={onDarkModeChange} theme={theme}>
            <Switch>
              <Route exact path="/">
                <Notes />
              </Route>
              <Route path="/create">
                <Create />
              </Route>
            </Switch>
          </Layout>
        </Paper>
      </Router>
    </ThemeProvider>
  );
}

export default App;
