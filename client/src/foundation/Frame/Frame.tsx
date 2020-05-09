import React, { useCallback } from "react";
import { Layout, Menu, Card, Button, Input } from "antd";
import { styles } from "./frame.style";
import { useSession } from "../CallSession";

export function Frame() {
  const { url, data, send } = useSession();
  const onChange = useCallback(
    (event: any) => {
      if (send) {
        send(JSON.stringify({ test: event.target.value }));
      }
    },
    [send]
  );

  return (
    <Layout>
      <Layout.Header style={styles.Header}>
        <Menu theme="light" mode="horizontal"></Menu>
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
        <Card style={styles.Card}>
          <Input onChange={onChange}></Input>
        </Card>
      </Layout.Content>
      <Layout.Footer style={{ textAlign: "center" }}>
        Scribble ©2020 Created by Jeff Wu
      </Layout.Footer>
    </Layout>
  );
}
