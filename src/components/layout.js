import React from "react";
import Container from "./container";
import Header from "./header";
import Navbar from "./navbar";
import Footer from "./footer";

export default ({ children }) => (
  <div>
    <Header />
    <Navbar />
    <main>
      <Container>
        {children}
      </Container>
    </main>
    <Footer />
  </div>
);
