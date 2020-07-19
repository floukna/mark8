import React from "react";
import styled from "styled-components";

const Navbar = styled.div`
  z-index: 5;
  position: relative;
  background-color: rgb(0, 34, 64);
  color: rgb(255, 255, 255);
  border-bottom: 1px solid;

  .app-bar {
    max-width: 1048px;
    margin: 0px auto;
    padding: 10px;
  }
`;

export default function Header() {
  return (
    <Navbar>
      <div className="app-bar">
        <img src="/mark8_nav.svg" />
      </div>
    </Navbar>
  );
}
