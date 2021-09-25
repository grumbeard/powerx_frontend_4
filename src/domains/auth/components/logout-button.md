To use `<LoginoutButton />`, ensure that the components that utilize it are wrapped in `<AuthProvider>`.

```jsx
import { AuthProvider } from "domains/auth/auth.state";

<AuthProvider>
  <LogoutButton />
</AuthProvider>
```