import { Route, Switch } from "react-router-dom";
import AllQuotes from "./pages/AllQuotes";
import QuoteDetail from "./pages/QuoteDetail";
import NewQuote from "./pages/NewQuote";
import { Redirect } from "react-router-dom";
import Layout from "./components/layout/Layout";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <Redirect to='/quotes'></Redirect>
        </Route>

        {/* route for list of quotes */}
        <Route path='/quotes' exact>
          <AllQuotes />
        </Route>

        {/* route for quotes detail. quoteId = dynamic segment, so that we can load same component for different quotes. here we encoded quote identifier(quoteId) in the url so that we can get it inside of the loaded component. */}
        <Route path='/quotes/:quoteId'>
          <QuoteDetail />
        </Route>

        {/* route for adding new quote */}
        <Route path='/new-quote'>
          <NewQuote />
        </Route>

        {/* '*'signals react-router that any url(path) shd match this route. */}
        {/* this route is for - when user finds a route that is not available in our defined routes(pages). */}
        {/* route for matching all the incoming requests eg:- http://localhost:3000/hello */}
        <Route path='*'>
          <NotFound />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
