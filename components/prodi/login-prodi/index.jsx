import React from "react";
import { CardLoginProdi } from "./card-login-prodi";
import { Container} from "@nextui-org/react";

export const LoginProdi = () => (
  <Container sm css={{ maxWidth: "400px", marginTop: "20vh", "@media (max-width: 768px)": { marginTop: "5vh" }}}>
    <CardLoginProdi />
  </Container>
);
