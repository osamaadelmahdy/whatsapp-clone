import React, { useRef } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
export default function Login({ onIdSubmit }) {
  const idRef = useRef();
  const handelSubmit = (e) => {
    e.preventDefault();
    onIdSubmit(idRef.current.value);
    console.log(idRef.current.value);
  };

  const createNewId = () => {
    onIdSubmit(uuidv4());
  };
  return (
    <Container
      className="d-flex align-items-center "
      style={{ height: "100vh" }}
    >
      <Form className="w-100" onSubmit={handelSubmit}>
        <Form.Group>
          <Form.Label>Enter your id</Form.Label>
          <Form.Control type="text" ref={idRef}></Form.Control>
        </Form.Group>
        <Button type="submit" className="mx-2">
          Login
        </Button>
        <Button vatiant="secondary" onClick={createNewId}>
          create new id
        </Button>
      </Form>
    </Container>
  );
}
