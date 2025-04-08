"use client";
import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import styles from "./ImageUploadComponent.module.scss";
import { CloseOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import Image from "next/image";
const MAXFILE = 3;

const ImageUploadComponent = ({ openNotification, onSubmitImg, fileArray }) => {
  const [uploadedImages, setUploadedImages] = useState<any>([]);
  const [uploading, setUploading] = useState(false);

  // Handle file drop
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > MAXFILE || uploadedImages?.length > MAXFILE) {
      openNotification({
        type: "error",
        message: `You can only upload up to ${MAXFILE} images.`,
        placement: "topRight",
      });
      return;
    }
    for (const file of acceptedFiles) {
      const obj = {
        file: file,
        urlBlo: URL.createObjectURL(file),
        liveUrl: null,
        loading: false,
        uploadStatus: false,
      };
      setUploadedImages((prev) => [...prev, obj]);
    }

    setUploading(false);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/jpeg": [], "image/png": [] },
    onDrop,
    multiple: true,
    maxFiles: 3,
  });

  const handleUploadImage = async () => {
    if (!uploadedImages.length) {
      openNotification({
        type: "warning",
        message: "Please upload at least one image.",
        placement: "topRight",
      });
      return;
    }
    setUploading(true);
    let urls: any = [];
    let tempVal: any = uploadedImages;
    for (let i = 0; i < uploadedImages?.length; i++) {
      const item = uploadedImages[i];
      tempVal[i].loading = true;
      setUploadedImages(tempVal);
      const url = await handleFileUpload(item?.file, i);
      if (url) {
        urls = [...urls, url];
      } else {
        if (item.liveUrl) {
          urls = [...urls, item.liveUrl];
        }
      }
    }
    onSubmitImg(urls);
    setUploading(false);
  };

  const handleFileUpload = async (file: any, index: number) => {
    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_UPLOADURL!,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.url) {
        let tempArray: any = uploadedImages;
        tempArray[index].liveUrl = response.data.url;
        tempArray[index].loading = false;
        tempArray[index].uploadStatus = true;
        tempArray[index].file = null;
        setUploadedImages(tempArray);
      }
      return response.data.url;
    } catch (error) {
      openNotification({
        type: "error",
        message: "Error uploading file. Please try again.",
        placement: "topRight",
      });
    }
  };

  const onCloseFile = (index: number) => {
    setUploadedImages((prevItems) => prevItems.filter((_, i) => i !== index));
    if (fileArray?.length) {
      let newArray = fileArray?.filter((_, i) => i !== index);
      onSubmitImg(newArray);
    }
  };

  return (
    <div className={styles.passportUploader}>
      {/* Dropzone Area */}
      <div {...getRootProps()} className={styles.dropzone}>
        <input {...getInputProps()} />
        <p>Drag & drop passport photos here, or click to select</p>
      </div>

      {/* Display Uploaded Images */}
      <div className={styles.imageGrid}>
        {uploadedImages.map((url, index) => (
          <div className={styles.imageOuterWrapper} key={index}>
            {!uploading && (
              <div
                className={styles.closeIcon}
                onClick={() => onCloseFile(index)}
              >
                <CloseOutlined />
              </div>
            )}
            <div key={index} className={styles.imageContainer}>
              <img src={url?.liveUrl ?? url.urlBlo} alt="Uploaded" />
            </div>
            {url.loading && (
              <div className={styles.loader}>
                <Spin size="large" />
              </div>
            )}
            {url.uploadStatus && (
              <div className={styles.successWrapper}>
                <Image
                  src="/images/checked.png"
                  alt="uploaded"
                  width={40}
                  height={40}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className={styles.btnWrapper} onClick={handleUploadImage}>
        <button type="submit" disabled={uploading}>
          {uploading ? <Spin /> : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default ImageUploadComponent;
