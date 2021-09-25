import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useHistory } from 'react-router';
import Notes from './client/components/Notes'
import Create from './client/components/Create'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import Layout from './client/components/Layout'
import Paper from '@material-ui/core/Paper'
import Signup from './client/components/Signup'
import { useState } from 'react'
let isSignUp = false

function App() {

  const [darkMode, setDarkMode] = useState(false)
  const [showLogIn, setShowLogIn] = useState(false)
  const history = useHistory()

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

  const onLogInButtonClick = () => {
    console.log("clicked");
  }

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Paper>
          <Layout darkMode={darkMode} onDarkModeChange={onDarkModeChange} onLogInButtonClick={onLogInButtonClick} theme={theme}>
            <Switch>
              <Route exact path="/">
                <Notes />
              </Route>
              <Route path="/create">
                <Create />
              </Route>
            </Switch>
          </Layout>
          <Switch>
            <Route exact path="/signup">
              <Signup />
            </Route>
          </Switch>
        </Paper>
      </Router>
    </ThemeProvider>
  );
}

export default App;
