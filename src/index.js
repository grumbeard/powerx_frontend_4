import * as React from "react";
import * as ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Movies } from './pages/movies'

const queryClient = new QueryClient();

ReactDOM.render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <Switch>
        <Route path='/login' />
        <Route path='/register' />
        <Route path='/movie/:movieId' />
        <Route path='/' exact component={Movies} />
        <Route path='*' />
      </Switch>
    </QueryClientProvider>
  </BrowserRouter>,
  document.querySelector("#root")
);