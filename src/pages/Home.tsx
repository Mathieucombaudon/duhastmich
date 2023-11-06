import { Button, Container, Text, Title } from "@mantine/core";

const Home = () => {
  return (
    <Container>
      <Title order={1}>Home Page</Title>
      <Text fs="italic">Welcome to my new web page</Text>
      <Button variant="filled">Click me</Button>
    </Container>
  );
};

export default Home;
