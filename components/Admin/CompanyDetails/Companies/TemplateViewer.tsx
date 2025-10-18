import { Modal } from "antd";
import React from "react";

interface ITemplateViewer {
  open: boolean;
  onClose: () => void;
  html?: string; //make title optional
}

const TemplateViewer: React.FC<ITemplateViewer> = ({ onClose, open, html }) => {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      closable={true}
      className="currencyModal"
      width={"50%"}
    >
      <div className="IframeWrapper">
        <iframe
          title="Email Preview"
          srcDoc={html}
          style={{
            width: "100%",
            height: "80vh",
            border: "1px solid #ccc",
            borderRadius: "8px",
            background: "white",
          }}
        />
      </div>
    </Modal>
  );
};

export default TemplateViewer;
