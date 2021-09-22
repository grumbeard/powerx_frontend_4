import * as React from "react";
import * as ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./index.css";

import { AppShell } from './app-shell';
import { Movies } from './pages/movies';
import { Movie } from './pages/movie';
import { AuthProvider } from "domains/auth/auth.state";
import { LoginPage } from './pages/login';
import { RegisterPage } from './pages/register';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 3000
    }
  }
});

ReactDOM.render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppShell>
          <Switch>
            <Route path='/login' component={LoginPage} />
            <Route path='/register' component={RegisterPage} />
            <Route path='/movie/:movieId' component={Movie} />
            <Route path='/' exact component={Movies} />
            <Route path='*' />
          </Switch>
        </AppShell>
      </AuthProvider>
    </QueryClientProvider>
  </BrowserRouter>,
  document.querySelector("#root")
);