import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import NavBar from "../components/Navbar";

const Login = () => {
  return (
    <>
      <NavBar />
      <Form>
        <Row
          style={{
            height: "100vh",
            justifyContent: "center",
            paddingTop: "20%",
          }}
        >
          <Col xs={6}>
            <Stack gap={6}>
              <h2 className=" text-white">Login</h2>
              <Form.Control type="email" placeholder="Email" />
              <Form.Control type="Password" placeholder="Password" />
              <Button variant="primary" type="submit">
                Register
              </Button>

              <Alert variant="danger">
                <p>An error occured</p>
              </Alert>
            </Stack>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Login;
