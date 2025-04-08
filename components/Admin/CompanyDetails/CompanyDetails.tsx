"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./CompanyDetails.module.scss";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { useAppContext } from "../../Context/AppContext";
import {
  StepsTakenStatusEnum,
  StepsTakenStatusViewEnum,
} from "@/utils/constants";
import Image from "next/image";
import { MoreOutlined, DownloadOutlined } from "@ant-design/icons";
import { Dropdown, notification, Skeleton, Spin } from "antd";
import {
  BTNCOLORS,
  nextImageFormats,
  SLIDEACTTION,
} from "@/constants/constants";
import { NotificationPlacement } from "antd/es/notification/interface";
import TransparentLoader from "../../TransparentLoader";
import ActionPopup from "./ActionPopup";
import DocumentPreview from "../../Modals/DocumentPreview";
import UploadDocument from "./UploadDocument";
import DocumentViewer from "../../DocumentViewer/DocumentViewer";
import { getFileExtensionFromUrl } from "@/helpers/helper";

type NotificationType = "success" | "info" | "warning" | "error";

type NotificationMessage = {
  type: NotificationType;
  message: string;
  placement: NotificationPlacement;
};

type DocumentViewer = {
  open: boolean;
  companyId: number | null;
  stepId: number | null;
};

const CompanyDetails = () => {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();
  const { contextOptions, setContextOptions } = useAppContext();
  const [documentUploadStatus, setDocumentUploadStatus] =
    useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [docUrl, setDocUrl] = useState<string>("");
  const [appiCalledStatus, setAppiCalledStatus] = useState<boolean>(false);
  const [showDocumentViewer, setShowDocumentViewer] = useState<boolean>(false);
  const [allSteps, setAllSteps] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [companyDetails, setCompanyDetails] = useState<any>(null);
  const [downloadLoading, setDownloadLoading] = useState<boolean>(false);
  const [api, contextHolder] = notification.useNotification();
  const [actionLoader, setActionLoader] = useState<boolean>(false);
  const [modalStatus, setModalStatus] = useState<any>(false);
  const [docUrls, setDocUrls] = useState<any>([]);
  const [stepId, setStepId] = useState<any>();
  const [stepTakes, setStepTakes] = useState<any>({});
  const [stepTakenLoading, setStepTakenLoading] = useState<boolean>(false);
  const [documentViewer, setDocumentViewer] = useState<DocumentViewer>({
    open: false,
    companyId: null,
    stepId: null,
  });
  const openNotification = (data: NotificationMessage) => {
    api[data.type]({
      message: data.message,
      placement: data?.placement,
    });
  };

  useEffect(() => {
    (async () => {
      if (id) {
        if (contextOptions?.selectedCompanyDetails) {
          setCompanyDetails(contextOptions?.selectedCompanyDetails);
        } else {
          await getCompanyDetails(Number(id));
        }
        getAllSteps(Number(id));
      } else {
        router.push("/admin");
      }
    })();
  }, []);

  useEffect(() => {
    if (companyDetails?.document) {
      const splited =
        contextOptions?.selectedCompanyDetails?.document?.split(",");
      if (splited?.length) {
        setDocUrls(splited);
      }
    }
  }, [companyDetails?.document]);

  const getCompanyDetails = async (companyId: number) => {
    await axios
      .get(`/api/company?id=${companyId}`)
      .then((res: any) => {
        if (res?.data?.length) {
          const details = res?.data;
          if (details?.length) {
            setContextOptions((prev) => ({
              ...prev,
              selectedCompanyDetails: details[0],
            }));
            setCompanyDetails(details[0]);
          }
        }
      })
      .catch((err: any) => {
        setLoading(false);
      });
  };

  const getAllSteps = async (id: any) => {
    setStepTakenLoading(true);
    await axios
      .get(`/api/steps`)
      .then((res: any) => {
        if (res?.data?.length) {
          const sortedData = res?.data.sort(
            (a: any, b: any) => a.position - b.position
          );
          setAllSteps(sortedData);
          setAppiCalledStatus(true);
          if (id && id != 0) {
            getAllTakenSteps(id);
          } else {
            setAllSteps(sortedData);
          }
        }
      })
      .catch((err: any) => {
        setLoading(false);
      });
  };

  const getAllTakenSteps = async (companyId: number) => {
    await axios
      .get(`/api/stepsTaken?companyId=${companyId}`)
      .then((res: any) => {
        if (res?.data?.length) {
          const assignedData = res?.data;
          let sorted: any = {};
          assignedData?.map((el: any) => {
            sorted = {
              ...sorted,
              [el?.stepId]: el,
            };
          });
          setStepTakenLoading(false);
         

          setStepTakes(sorted);
        } else {
          setStepTakenLoading(false);
        }
        setLoading(false);
      })
      .catch((err: any) => {
        setStepTakenLoading(false);
        setLoading(false);
      });
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (scrollRef.current) {
      e.preventDefault();
      scrollRef.current.scrollLeft += e.deltaY > 0 ? 50 : -50;
    }
  };

  const handleDownload = async (imageUrl) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      // Get the file extension from MIME type
      const mimeType = blob.type; // e.g., "image/jpeg"
      const extension = mimeType.split("/")[1]; // Extract "jpeg" from "image/jpeg"
      // Create a downloadable file
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      const fileName = getFileNameFromUrl(imageUrl);

      link.download = `${companyDetails?.ownerFname}-${
        companyDetails.companyName
      }-${fileName?.split(".")[0]}.${extension}`; // Dynamic file extension
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Cleanup
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };
  const getFileNameFromUrl = (url: string) => {
    return url.split("/").pop()?.split("?")[0] || "default.jpg";
  };

  const handleMenuClick = (e: any) => {
    if (e.key) {
      const type = e.key?.split("-")[0];
      const stepId = Number(e.key?.split("-")[1]);
      let body: any;
      switch (stepId) {
        case 1:
          body = {
            status: type,
          };
          if (stepTakes[stepId].status !== type) {
            updateStepStatus(stepId, body, Number(id));
          }
          break;
        case 2:
          body = {
            status: type,
          };
          if (stepTakes[stepId].status !== type) {
            updateStepStatus(stepId, body, Number(id));
          }
          break;
        case 3:
          body = {
            status: type,
          };
          if (stepTakes[stepId].status !== type) {
            updateStepStatus(stepId, body, Number(id));
          }
          break;
        case 4:
          setStepId(stepId);
          setDocumentUploadStatus(true);
          break;
        case 5:
          setStepId(stepId);
          setDocumentUploadStatus(true);
          break;
        default:
          break;
      }
    }
  };

  const handleGetmenu = (stepId: number, menus: any = []) => {
    return menus?.map((el: any) => ({
      key: `${el.key}-${stepId}`,
      label: el.label,
    }));
  };

  const updateStepStatus = async (
    stepId: number,
    body: any,
    companyId: number
  ) => {
    try {
      await axios
        .patch(`/api/stepsTaken?stepId=${stepId}&companyId=${companyId}`, body)
        .then((res: any) => {
          openNotification({
            type: "success",
            message: "Status Updated successfully",
            placement: "topRight",
          });
          setActionLoader(false);
          getAllTakenSteps(Number(id));
        })
        .catch((err: any) => {
          openNotification({
            type: "error",
            message: "Something went wrong!",
            placement: "topRight",
          });
          setActionLoader(false);
        });
    } catch (error) {
      openNotification({
        type: "error",
        message: "Something went wrong!",
        placement: "topRight",
      });
      setActionLoader(false);
    }
  };

  const checkCompleted = (status: any) => {
    if (status === StepsTakenStatusEnum.completed) {
      return true;
    }
    if (status === StepsTakenStatusEnum.documents) {
      return true;
    }
    return false;
  };

  const onCompleteUpload = (stepId: number) => {
    if (stepTakes[stepId].status !== StepsTakenStatusEnum.documents) {
      const body = {
        status: StepsTakenStatusEnum.documents,
      };
      updateStepStatus(stepId, body, Number(id));
    }
    setDocumentUploadStatus(false);
  };

  const handleClickViewDoc = (stepId: number, status: string) => {
    if (status === StepsTakenStatusEnum.contactSupport) {
      const companyName = companyDetails.companyName;
      const ownerName = `${companyDetails?.ownerFname} ${companyDetails?.ownerLname}`;
      const finalName = ownerName?.replace(" ", "%20");
      window.open(
        `https://api.whatsapp.com/send?phone=447909729519&text=Hello,%20I%20need%20assistance%20with%20creating%20a%20bank%20account%20for%20my%20LLC.%20Could%20you%20please%20help%20me%20with%20this?%0A%0ALLC%20Name:%20${companyName}%0AOwner%20Name:%20${finalName}%0ACompany%20Email:%20${companyDetails?.companyEmail}`,
        "_blank"
      );
      return;
    }
    if (StepsTakenStatusEnum.documents === status) {
      setDocumentViewer(() => ({
        open: true,
        companyId: Number(id),
        stepId: stepId,
      }));
    }
  };

  return (
    <section className={styles.userDashSection}>
      {contextHolder}
      {actionLoader ? (
        <TransparentLoader />
      ) : (
        <>
          <div
            ref={scrollRef}
            // onWheel={handleWheel}
            className={styles.userStepsMainWrapper}
          >
            <ul>
              {allSteps?.map((item: any, index: number) => (
                <li
                  className={`${
                    checkCompleted(stepTakes[item?.id]?.status ?? null)
                      ? styles.StepCompleted
                      : ""
                  }`}
                  key={index}
                >
                  <div className={styles.stepCountWrapper}>
                    <h5>step {item.position}</h5>
                    {SLIDEACTTION[item.position] ? (
                      <Dropdown
                        menu={{
                          items: handleGetmenu(
                            item?.id,
                            SLIDEACTTION[item.position]
                          ),
                          onClick: handleMenuClick,
                          selectedKeys: [
                            contextOptions?.selectedCompany?.id?.toString(),
                          ],
                        }}
                        trigger={["click"]}
                      >
                        <MoreOutlined style={{ fontSize: "20px" }} />
                      </Dropdown>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className={styles.stepContent}>
                    <h6>{item.title}</h6>
                    <p className={styles.underlined}>{item.description}</p>
                  </div>
                  {stepTakenLoading ? (
                    <Skeleton.Button
                      active={true}
                      size={"default"}
                      shape={"default"}
                    />
                  ) : (
                    <div
                      className={styles.buttonAbsoluteWarpper}
                      style={
                        {
                          "--btn-bg":
                            BTNCOLORS[stepTakes[item?.id]?.status]?.bgColor,
                          "--text-color":
                            BTNCOLORS[stepTakes[item?.id]?.status]?.textColor,
                        } as React.CSSProperties
                      }
                    >
                      <button
                        type="button"
                        onClick={() =>
                          handleClickViewDoc(
                            item?.id,
                            stepTakes[item?.id]?.status
                          )
                        }
                      >
                        {" "}
                        {StepsTakenStatusViewEnum[
                          stepTakes[item?.id]?.status
                        ] ?? ""}{" "}
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
          {companyDetails ? (
            <div className={styles.deatialsMainWrapper}>
              <h3>Details</h3>
              <label htmlFor="">Personal and company details</label>
              <div className={styles.detailsListWrapper}>
                <div className={styles.deatilsItem}>
                  <h6>Company Name</h6>
                  <div>
                    <label htmlFor="">
                      <span>{`${companyDetails.companyName} ${companyDetails.type}`}</span>
                    </label>
                  </div>
                </div>
                <div className={styles.deatilsItem}>
                  <h6>Company Email</h6>
                  <div>
                    <label htmlFor="">
                      <span>{companyDetails?.companyEmail}</span>
                    </label>
                  </div>
                </div>
                <div className={styles.deatilsItem}>
                  <h6>State</h6>
                  <div>
                    <label htmlFor="">
                      <span>{companyDetails?.registrationState}</span>
                    </label>
                  </div>
                </div>
                <div className={styles.deatilsItem}>
                  <h6>Company Type</h6>
                  <div>
                    <label htmlFor="">
                      <span>{companyDetails?.type}</span>
                    </label>
                  </div>
                </div>
                <div className={styles.deatilsItem}>
                  <h6>Responsible Party</h6>
                  <div>
                    <label htmlFor="">
                      Name
                      <span>
                        {`${companyDetails?.ownerFname} ${companyDetails?.ownerLname}`}
                      </span>
                    </label>
                    <label htmlFor="">
                      Address
                      <span>
                        {`${companyDetails?.streetAddress}, ${companyDetails?.city}, ${companyDetails?.state}, ${companyDetails?.country}`}
                        {/* adderss line 1 , addressline 2 <article>(100%)</article>{" "} */}
                      </span>
                    </label>
                    <label htmlFor="">
                      Phone
                      <span>{`${companyDetails?.countryCode ?? " "} ${
                        companyDetails?.phone ?? ""
                      }`}</span>
                    </label>
                    <label htmlFor="">
                      Email
                      <span>{companyDetails?.companyEmail}</span>
                    </label>
                  </div>
                </div>
                <div className={styles.deatilsItem}>
                  <h6>Owner</h6>
                  <div>
                    <label htmlFor="">
                      Name
                      <span>
                        {`${companyDetails?.ownerFname} ${companyDetails?.ownerLname}`}
                      </span>
                    </label>
                    <label htmlFor="">
                      Address
                      <span>
                        {`${companyDetails?.streetAddress}, ${companyDetails?.city}, ${companyDetails?.state}, ${companyDetails?.country}`}
                        {/* adderss line 1 , addressline 2 <article>(100%)</article>{" "} */}
                      </span>
                    </label>
                    <label htmlFor="">
                      Phone
                      <span>{`${companyDetails?.countryCode ?? " "} ${
                        companyDetails?.phone ?? ""
                      }`}</span>
                    </label>
                    <label htmlFor="">
                      Email
                      <span>{companyDetails?.companyEmail}</span>
                    </label>
                  </div>
                </div>
                <div className={styles.deatilsItem}>
                  <h6>Proof of address</h6>
                  <div>
                    <label htmlFor="" className={styles.documentWrapper}>
                      {docUrls?.map((el: any, idx: number) => (
                        <>
                          {nextImageFormats.includes(
                            getFileExtensionFromUrl(el)
                          ) ? (
                            <div className={styles.imageWrapper} key={idx}>
                              <Image
                                key={idx}
                                src={el}
                                alt="proof of address"
                                width={100}
                                height={100}
                                className={styles.document}
                                onClick={() => {
                                  setDocUrl(el);
                                  setShowDocumentViewer(true);
                                }}
                              />
                              <button
                                type="button"
                                onClick={() => handleDownload(el)}
                              >
                                {downloadLoading ? (
                                  <Spin />
                                ) : (
                                  <>
                                    <DownloadOutlined />
                                    Download
                                  </>
                                )}
                              </button>
                            </div>
                          ) : (
                            <>
                              {getFileExtensionFromUrl(el) === "pdf" ? (
                                <div className={styles.imageWrapper} key={idx}>
                                  <Image
                                    key={idx}
                                    src="/images/PdfIcon.png"
                                    alt="proof of address"
                                    width={100}
                                    height={100}
                                    className={styles.document}
                                    onClick={() => {
                                      setDocUrl(el);
                                      setShowDocumentViewer(true);
                                    }}
                                  />
                                  <button
                                    type="button"
                                    onClick={() => handleDownload(el)}
                                  >
                                    {downloadLoading ? (
                                      <Spin />
                                    ) : (
                                      <>
                                        <DownloadOutlined />
                                        Download
                                      </>
                                    )}
                                  </button>
                                </div>
                              ) : getFileExtensionFromUrl(el) === "doc" ? (
                                <div className={styles.imageWrapper} key={idx}>
                                  <Image
                                    key={idx}
                                    src="/images/documentIcon.png"
                                    alt="proof of address"
                                    width={100}
                                    height={100}
                                    className={styles.document}
                                    onClick={() => {
                                      setDocUrl(el);
                                      setShowDocumentViewer(true);
                                    }}
                                  />
                                  <button
                                    type="button"
                                    onClick={() => handleDownload(el)}
                                  >
                                    {downloadLoading ? (
                                      <Spin />
                                    ) : (
                                      <>
                                        <DownloadOutlined />
                                        Download
                                      </>
                                    )}
                                  </button>
                                </div>
                              ) : (
                                <div className={styles.imageWrapper} key={idx}>
                                  <Image
                                    key={idx}
                                    src="/images/imageIcon.png"
                                    alt="proof of address"
                                    width={100}
                                    height={100}
                                    className={styles.document}
                                    onClick={() => {
                                      setDocUrl(el);
                                      setShowDocumentViewer(true);
                                    }}
                                  />
                                  <button
                                    type="button"
                                    onClick={() => handleDownload(el)}
                                  >
                                    {downloadLoading ? (
                                      <Spin />
                                    ) : (
                                      <>
                                        <DownloadOutlined />
                                        Download
                                      </>
                                    )}
                                  </button>
                                </div>
                              )}
                            </>
                          )}
                        </>
                      ))}
                    </label>
                  </div>
                </div>
                <div className={styles.deatilsItem}>
                  <h6>Mailing Address</h6>
                  <div>
                    <label htmlFor="">
                      Address
                      <span>
                        adderss line 1 , addressline 2 <article>(100%)</article>{" "}
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <h2>No Data found</h2>
            </div>
          )}
        </>
      )}
      <DocumentPreview
        onClose={() => setShowDocumentViewer(false)}
        open={showDocumentViewer}
        url={docUrl}
      />
      {documentUploadStatus && (
        <UploadDocument
          open={documentUploadStatus}
          onClose={() => setDocumentUploadStatus(false)}
          stepId={stepId}
          openNotification={openNotification}
          companyId={Number(id)}
          onCompleted={onCompleteUpload}
        />
      )}
      {documentViewer?.open && (
        <DocumentViewer
          open={documentViewer?.open}
          companyId={documentViewer.companyId}
          stepId={documentViewer.stepId}
          onClose={() =>
            setDocumentViewer((prev) => ({
              ...prev,
              open: false,
            }))
          }
        />
      )}
      <ActionPopup open={modalStatus} onClose={() => setModalStatus(false)} />
    </section>
  );
};

export default CompanyDetails;
