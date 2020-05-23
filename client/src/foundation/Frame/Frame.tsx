import React from "react";
import { Layout } from "antd";
import { Editor, Toolbar } from "../../sections";
import { TopBar } from "./components";
import "./frame.css";

export function Frame() {
  return (
    <Layout>
      <Layout.Header className="Header">
        <TopBar />
        <Toolbar />
      </Layout.Header>
      <Layout.Content className="Content">
        <Editor />
      </Layout.Content>
      <Layout.Footer style={{ textAlign: "center" }}>
        Scribble ©2020 Created by Jeff Wu
      </Layout.Footer>
    </Layout>
  );
}
