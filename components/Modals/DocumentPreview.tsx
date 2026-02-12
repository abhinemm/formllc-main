import { Modal } from "antd";
import React from "react";

interface IDocumentPreview {
  open: boolean;
  onClose: () => void;
  url?: string; //make title optional
}

const DocumentPreview: React.FC<IDocumentPreview> = ({
  onClose,
  open,
  url,
}) => {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      closable={true}
      className="currencyModal"
      width={"70%"}
    >
      <div className="IframeWrapper">
        <iframe src={url}></iframe>
      </div>
    </Modal>
  );
};

export default DocumentPreview;
