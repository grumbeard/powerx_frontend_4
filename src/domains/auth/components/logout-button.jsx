import { Button } from "components/button";
import { useLogout } from "../auth.state";

export const LogoutButton = ({...props}) => {
  const logout = useLogout();

  return (
    <Button variant="outline" onClick={logout} {...props}>
      Logout
    </Button>
  );
};
