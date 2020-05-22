import React from "react";
import { Layout, Divider } from "antd";
import { Editor, EditorContextProvider, Toolbar } from "../../sections";
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
        <EditorContextProvider>
          <Editor />
        </EditorContextProvider>
      </Layout.Content>
      <Layout.Footer style={{ textAlign: "center" }}>
        Scribble ©2020 Created by Jeff Wu
      </Layout.Footer>
    </Layout>
  );
}
