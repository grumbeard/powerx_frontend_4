import * as React from "react";
import * as ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Switch } from "react-router-dom";

const queryClient = new QueryClient();

ReactDOM.render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      
    </QueryClientProvider>
  </BrowserRouter>,
  document.querySelector("#root")
);