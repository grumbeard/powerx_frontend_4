To use `<CommentForm />`, ensure that the components that utilize it are wrapped in both `<QueryClientProvider>` and `<AuthProvider>`.

Only authenticated users may submit comment using `<CommentForm />`.

```jsx
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from "domains/auth/auth.state";
const queryClient = new QueryClient();

<QueryClientProvider client={queryClient} >
  <AuthProvider>
    <CommentForm movieId="someMovieId" />
  </AuthProvider>
</QueryClientProvider>
```