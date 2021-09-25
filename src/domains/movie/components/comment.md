To use `<Comment />`, ensure that the components that utilize it are wrapped in both `<QueryClientProvider>` and `<AuthProvider>`.

When edits are made to the comment, it is indicated as "Edited: `<updatedAt>`" (see second comment for example)

```jsx
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from "domains/auth/auth.state";
const queryClient = new QueryClient();

const dateTime1 = new Date();
const dateTime2 = new Date().setHours(dateTime1.getHours() + 1);
const dateTime3 = new Date().setHours(dateTime1.getHours() + 2);
const comments = [
  {
    content: "This is a highly rational comment",
    rating: 4,
    userName: "IlUvMoViEs",
    createdAt: dateTime3,
    updatedAt: dateTime3
  },
  {
    content: "This is a highly irrational comment",
    rating: 1,
    userName: "CritiCurls",
    createdAt: dateTime1,
    updatedAt: dateTime2
  },
  {
    content: "This is so good movie, all thumbs",
    rating: 5,
    userName: "bot",
    createdAt: dateTime1,
    updatedAt: dateTime1
  }
];

<QueryClientProvider client={queryClient} >
  <AuthProvider>
    {comments.map(comment => <Comment comment={comment} />)}
  </AuthProvider>
</QueryClientProvider>
```