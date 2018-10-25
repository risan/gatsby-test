import React from "react";
import Container from "./container";
import Header from "./header";
import Navbar from "./navbar";
import Footer from "./footer";
import styles from "./layout.module.css";

export default ({ children }) => (
  <div className={styles.layout}>
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
