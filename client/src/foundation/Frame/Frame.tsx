import React from "react";
import { Layout, Menu, Card, Button, Input } from "antd";
import { styles } from "./frame.style";

export function Frame() {
  return (
    <Layout>
      <Layout.Header style={styles.Header}>
        <div className="logo" />
        <Menu theme="light" mode="horizontal">
          <Button type="primary" shape="round" style={styles.ShareButton}>
            Share
          </Button>
        </Menu>
      </Layout.Header>
      <Layout.Content style={styles.Content}>
        <Card style={styles.Card}>
          <Input></Input>
        </Card>
      </Layout.Content>
      <Layout.Footer style={{ textAlign: "center" }}>
        Scribble ©2020 Created by Jeff Wu
      </Layout.Footer>
    </Layout>
  );
}
