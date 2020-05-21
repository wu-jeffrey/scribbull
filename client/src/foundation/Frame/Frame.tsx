import React from "react";
import { Layout, Button } from "antd";
import { styles } from "./frame.style";
import { useSession } from "../CallSession";
import { Editor, EditorContextProvider } from "../../sections";

export function Frame() {
  const { url } = useSession();

  return (
    <Layout>
      <Layout.Header style={styles.Header}>
        <Button
          type="primary"
          shape="round"
          style={styles.ShareButton}
          href={url}
        >
          Share
        </Button>
      </Layout.Header>
      <Layout.Content style={styles.Content}>
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
