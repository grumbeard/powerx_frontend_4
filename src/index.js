import * as React from "react";
import * as ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./index.css";

import { AppShell } from './app-shell';
import { Movies } from './pages/movies';
import { Movie } from './pages/movie';

const queryClient = new QueryClient();

ReactDOM.render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AppShell>
        <Switch>
          <Route path='/login' />
          <Route path='/register' />
          <Route path='/movie/:movieId' component={Movie} />
          <Route path='/' exact component={Movies} />
          <Route path='*' />
        </Switch>
      </AppShell>
    </QueryClientProvider>
  </BrowserRouter>,
  document.querySelector("#root")
);