import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Notes from './components/Notes'
import Create from './components/Create'
import { createTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles'
import Layout from './components/Layout'

const theme = createTheme({
  palette: {
    // type: "dark",
    primary: {
      main: "#6200ea"
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/">
              <Notes />
            </Route>
            <Route path="/create">
              <Create />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
