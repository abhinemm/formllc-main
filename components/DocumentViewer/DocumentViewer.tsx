import { Modal, Spin } from "antd";
import React, { useEffect, useState } from "react";
import styles from "./DocumentViewer.module.scss";
import Image from "next/image";
import axios from "axios";
import Loader from "../Loader";
import { CompanyStatus, DOCTYPE, UserTypesEnum } from "@/utils/constants";
import DocumentPreview from "../Modals/DocumentPreview";
import { DeleteOutlined } from "@ant-design/icons";
import { useAppContext } from "../Context/AppContext";

const DocumentViewer = ({
  open,
  onClose,
  stepId,
  companyId,
  openNotification,
  stepDetails,
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [downloadLoading, setDownloadLoading] = useState<boolean>(false);
  const [documents, setDocuments] = useState<any>([]);
  const [viewDocumentUrl, setViewDocumentUrl] = useState<any>(null);
  const { contextOptions } = useAppContext();

  useEffect(() => {
    (async () => {
      if (stepId && companyId) {
        await getCompanyDocument(stepId, companyId);
      }
    })();
  }, [stepId, companyId]);

  const getFileExtensionFromUrl = (url: string) => {
    return url.split(".").pop()?.split("?")[0] || "jpg";
  };

  const convertReponse = (data: any) => {
    let final: any = [];
    try {
      data.map((el: any) => {
        let obj = {
          ...el,
          documentUrl: JSON.parse(el?.documentUrl),
          value: JSON.parse(el.value),
        };
        final = [...final, obj];
      });
      setDocuments(final);
    } catch (error) {
      console.log("error", error);
      setDocuments([]);
    }
  };

  const getCompanyDocument = async (stepId: number, companyId: number) => {
    await axios
      .get(`/api/companyDocuments?companyId=${companyId}&stepId=${stepId}`)
      .then((res: any) => {
        if (res?.data?.length) {
          convertReponse(res?.data);
          setLoading(false);
        } else {
          setLoading(false);
        }
      })
      .catch((err: any) => {
        setLoading(false);
      });
  };

  const handleDownload = async (imageUrl, fileName: string) => {
    try {
      setDownloadLoading(true);
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const mimeType = blob.type;
      const extension = mimeType.split("/")[1];
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${fileName}.${extension}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setDownloadLoading(false);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      setDownloadLoading(false);
      console.error("Download failed:", error);
    }
  };

  const onChangeStatus = async (id, status) => {
    const body = {
      status: status,
    };
    setLoading(true);
    await axios
      .patch(`/api/companyDocuments?id=${id}`, body)
      .then((res: any) => {
        openNotification({
          type: "success",
          message:
            status === CompanyStatus.deleted
              ? "The company document has been deleted successfully."
              : "The company document has been restored successfully.",
          placement: "topRight",
        });
        getCompanyDocument(stepId, companyId);
      })
      .catch((err) => {
        openNotification({
          type: "success",
          message: "Oops! Something went wrong. Please try again later.",
          placement: "topRight",
        });
      });
  };

  const handleRedirection = () => {
    const test = `I’m unable to see any documents for my ${contextOptions?.selectedCompanyDetails?.companyName} ${contextOptions?.selectedCompanyDetails?.type} under the ‘${stepDetails?.title}’ step.`;
    const msg = encodeURIComponent(test);
    window.open(`https://wa.me/447909729519?text=${msg}`, "_blank");
    return;
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      closable={true}
      maskClosable={false}
    >
      <div className={styles.outerWrapper}>
        <h3>Company Documents</h3>
        {loading ? (
          <div className={styles.loadingWrapper}>
            <Spin />
          </div>
        ) : (
          <>
            {documents?.length > 0 ? (
              <>
                {documents?.map((el: any, idx: number) => (
                  <div className={styles.cardWarpper} key={idx}>
                    {contextOptions?.userData?.type !==
                      UserTypesEnum.customer && (
                      <>
                        {el?.status === CompanyStatus.active && (
                          <div
                            className={styles?.deleteWrapper}
                            onClick={() =>
                              onChangeStatus(el.id, CompanyStatus.deleted)
                            }
                          >
                            <DeleteOutlined />
                          </div>
                        )}
                        {el?.status === CompanyStatus.deleted && (
                          <>
                            <div className={styles.deleteMention}>
                              <h5>Deleted</h5>
                            </div>
                            <div className={styles?.deleteWrapper}>
                              <button
                                type="button"
                                onClick={() =>
                                  onChangeStatus(el.id, CompanyStatus.active)
                                }
                              >
                                Recover
                              </button>
                            </div>
                          </>
                        )}
                      </>
                    )}

                    <h4>{el?.value?.title}</h4>
                    <p>{el?.value?.decription}</p>
                    <div className={styles.documentWrapper}>
                      {el?.documentUrl?.type === DOCTYPE?.pdf && (
                        <Image
                          src="/images/PdfIcon.png"
                          alt="pdf icon"
                          height={40}
                          width={40}
                        />
                      )}
                      {el?.documentUrl?.type === DOCTYPE.doc && (
                        <Image
                          src="/images/documentIcon.png"
                          alt="Document icon"
                          height={40}
                          width={40}
                        />
                      )}
                      {el?.documentUrl?.type === DOCTYPE.img && (
                        <Image
                          src="/images/imageIcon.png"
                          alt="Image icon"
                          height={40}
                          width={40}
                        />
                      )}
                      <span>
                        {`${el?.value?.title}.${getFileExtensionFromUrl(
                          el?.documentUrl?.url
                        )}`}
                      </span>
                      <div className={styles.btnWrapper}>
                        <button
                          type="button"
                          onClick={() =>
                            setViewDocumentUrl(el?.documentUrl?.url)
                          }
                        >
                          View
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            handleDownload(
                              el?.documentUrl?.url,
                              el?.value?.title
                            )
                          }
                        >
                          Download
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className={styles.noDataWrapper}>
                <h6>No Document Found</h6>
                <button type="button" onClick={handleRedirection}>
                  Contact Support
                </button>
              </div>
            )}
          </>
        )}
      </div>
      <DocumentPreview
        onClose={() => setViewDocumentUrl(null)}
        open={viewDocumentUrl ? true : false}
        url={viewDocumentUrl}
      />
    </Modal>
  );
};

export default DocumentViewer;
