import React from "react";
import { CardLoginAkademik } from "./card-login-akademik";
import { Container} from "@nextui-org/react";

export const LoginAkademik = () => (
  <Container sm css={{ maxWidth: "400px", marginTop: "20vh", "@media (max-width: 768px)": { marginTop: "5vh" }}}>
    <CardLoginAkademik />
  </Container>
);
