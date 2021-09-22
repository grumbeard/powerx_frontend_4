import * as React from "react";
import cn from "classnames";
import { Button } from "components/button";
import { TextField } from "components/text-field";
import { useRegister } from "../auth.state";

export const RegisterForm = ({...props}) => {
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [avatar, setAvatar] = React.useState("");
  const [status, setStatus] = React.useState("idle");
  const register = useRegister();
  const className = cn("max-w-md mx-auto m-6 shadow", props.className);

  return (
    <div className={className}>
      <form
        onSubmit={(ev) => {
          ev.preventDefault();
          setStatus("loading");
          register({ name, email, password, avatar }).catch(() => setStatus("error"));
        }}
        className="p-6"
      >
        {status === "error" && (
          <div className="p-2 text-red-800 bg-red-200 rounded-sm">
            Fail to register.
          </div>
        )}
        <div className="text-3xl mt-4 mb-8 font-extrabold text-center">
          Register
        </div>
        <div className="space-y-6">
          <TextField
            label="Name"
            value={name}
            onChangeValue={setName}
            name="name"
            id="name"
            autoFocus
            required
            disabled={status === "loading"}
          />
          <TextField
            label="Email"
            value={email}
            onChangeValue={setEmail}
            name="username"
            id="username"
            required
            disabled={status === "loading"}
          />
          <TextField
            label="Password"
            value={password}
            onChangeValue={setPassword}
            name="password"
            id="password"
            type="password"
            required
            disabled={status === "loading"}
          />
          <TextField
            label="Avatar"
            value={avatar}
            onChangeValue={setAvatar}
            name="avatar"
            id="avatar"
            type="text"
            required
            disabled={status === "loading"}
          />
          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={status === "loading"}
          >
            Register
          </Button>
        </div>
      </form>
    </div>
  );
};
