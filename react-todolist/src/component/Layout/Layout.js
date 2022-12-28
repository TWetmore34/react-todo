import React from "react";
import Header from "../Header/Header";

import "./Layout.css";

class Layout extends React.Component {
  render() {
    return (
      <>
        <header className="header">
          <Header />
        </header>
        <main className="content">{this.props.children}</main>
      </>
    );
  }
}

export default Layout;
