import React, { useRef } from "react";
import { Button, Typography, Popover, Input, message } from "antd";
import { FaCopy } from "react-icons/fa";
import { useSession } from "../../../CallSession";

import "./TopBar.css";

const { Title } = Typography;

export function TopBar() {
  const { url } = useSession();
  const copyTarget = useRef(null);

  const copyToClipboard = () => {
    // @ts-ignore
    copyTarget.current?.select();
    document.execCommand("copy");
    message.success("link copied");
  };

  const shareContent = (
    <>
      Copy this link to share:
      <div className="CopyContainer">
        <Input ref={copyTarget} value={url} />
        <Button onClick={copyToClipboard}>
          <FaCopy />
        </Button>
      </div>
    </>
  );

  return (
    <div className="TopBar">
      <h2>Scribble</h2>
      <Popover
        placement="topLeft"
        title={"Share"}
        content={shareContent}
        trigger="click"
      >
        <Button className="ShareButton" type="primary" shape="round" href={url}>
          Share
        </Button>
      </Popover>
    </div>
  );
}
