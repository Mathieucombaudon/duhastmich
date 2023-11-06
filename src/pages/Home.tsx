import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, TextInput, Title } from "@mantine/core";
import React from "react";

const Home = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [isLogged, setIsLogged] = React.useState(false);

  const userLoggedIn = JSON.parse(sessionStorage?.getItem("userData") ?? "{}");
  if (userLoggedIn.session === undefined || null) {
    setIsLogged(false);
  }
  if (userLoggedIn.session !== undefined) {
    setIsLogged(true);
  }

  const form = useForm({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validate: {
      username: (value) =>
        value.trim().length >= 6 ? null : "Username is too short",
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Email is not valid"),
      password: (value) =>
        value.trim().length >= 6 ? null : "Password is too short",
    },
  });
  const submitForm = (values: []) => {
    console.log(values);
  };

  return (
    <>
      {isLogged === false && (
        <>
          <Modal opened={opened} onClose={close} title="Register">
            <form onSubmit={form?.onSubmit((values) => submitForm(values))}>
              <TextInput
                required
                description="username Input"
                label="Username"
                placeholder="Username"
                name="username"
                {...form?.getInputProps("username")}
              />

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
                Register
              </Button>
            </form>
            <form onReset={form?.reset}>
              <Button variant="light" onClick={form?.reset}>
                Cancel
              </Button>
            </form>
          </Modal>
          <Button onClick={open}>Register</Button>
        </>
      )}

      {isLogged === true && (
        <div>
          <Title order={1}>Welcome {userLoggedIn.session.user.username}</Title>
        </div>
      )}
    </>
  );
};

export default Home;
