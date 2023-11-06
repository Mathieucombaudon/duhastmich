import React, { useEffect } from "react";
import axios from "axios";
import { Container, TextInput, Button, Alert } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconInfoCircle } from "@tabler/icons-react";
import { Link } from "react-router-dom";
function Login(props) {
  const [loginStatus, setLoginStatus] = React.useState(false);
  const [isAuth, setIsAuth] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [userData, setUserData] = React.useState({});

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Email is not valid"),
      password: (value) =>
        value.trim().length >= 5 ? null : "Password is too short",
    },
  });

  axios.defaults.withCredentials = true;
  async function SignIn(values) {
    try {
      const res = await axios.post("http://localhost:3000/login", {
        email: values.email,
        password: values.password,
        headers: {
          "Content-Type": "application/json",
          "x-acccess-token": sessionStorage.getItem("token"),
        },
      });
      if (res.data) {
        setLoginStatus(true);
        setSuccess(true);
        setUserData(res.data);
        setIsAuth(res.data.auth);
        sessionStorage.setItem("userData", JSON.stringify(res.data));
        sessionStorage.setItem("token", res.data.token);
      }
    } catch (err) {
      console.log(err);
      setError(true);
    }
  }

  const icon = <IconInfoCircle />;

  return (
    <Container>
      <form
        className="form-group"
        onSubmit={form?.onSubmit((values) => SignIn(values))}
      >
        <TextInput
          required
          type="email"
          description="Email Input"
          label="Email"
          placeholder="Email"
          name="email"
          {...form?.getInputProps("email")}
        />

        <TextInput
          required
          type="password"
          description="Password Input"
          label="Password"
          placeholder="Password"
          name="password"
          {...form?.getInputProps("password")}
        />
        <Button variant="primary" type="submit">
          Sin In
        </Button>
      </form>
      <form onReset={form?.reset}>
        <Button variant="light" onClick={form?.reset}>
          Cancel
        </Button>
      </form>
      {error && (
        <Alert variant="light" color="red" title="Erreur !">
          <p>Invalid credentials</p>
        </Alert>
      )}
      {success && (
        <Alert variant="light" color="green" title="Succès !" icon={icon}>
          <p>Successfully logged in</p>

          <Link to="/">Home</Link>
        </Alert>
      )}
    </Container>
  );
}

export default Login;
