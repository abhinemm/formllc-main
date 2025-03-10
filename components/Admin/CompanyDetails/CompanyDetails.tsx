"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./CompanyDetails.module.scss";
import { useParams, usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { useAppContext } from "../../Context/AppContext";
import { StepsTakenStatusEnum, StepsView } from "@/utils/constants";
import Image from "next/image";
import {
  VerticalAlignBottomOutlined,
  EditOutlined,
  MoreOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { Dropdown, notification, Spin } from "antd";
import { SLIDEACTTION } from "@/constants/constants";
import { NotificationPlacement } from "antd/es/notification/interface";
import TransparentLoader from "../../TransparentLoader";
import ActionPopup from "./ActionPopup";
import DocumentPreview from "../../Modals/DocumentPreview";

type NotificationType = "success" | "info" | "warning" | "error";

type NotificationMessage = {
  type: NotificationType;
  message: string;
  placement: NotificationPlacement;
};

const CompanyDetails = () => {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();
  const { contextOptions, setContextOptions } = useAppContext();
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
  }, [id]);

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
    await axios
      .get(`/api/steps`)
      .then((res: any) => {
        if (res?.data?.length) {
          const sortedData = res?.data.sort(
            (a: any, b: any) => a.position - b.position
          );
          setAppiCalledStatus(true);
          if (id && id != 0) {
            getAllTakenSteps(sortedData, id);
          } else {
            setAllSteps(sortedData);
          }
        }
      })
      .catch((err: any) => {
        setLoading(false);
      });
  };

  const getAllTakenSteps = async (sortedData: any, companyId: number) => {
    await axios
      .get(`/api/stepsTaken?companyId=${companyId}`)
      .then((res: any) => {
        if (res?.data?.length) {
          const assignedData = res?.data;
          const finalSteps = sortedData?.map((el: any) => ({
            ...el,
            stepTaken: assignedData?.find(
              (data: any) => data?.stepId === el.id
            ),
          }));

          // const sortedData: StepsAttributes[] = res?.data.sort(
          //   (a: any, b: any) => a.position - b.position
          // );
          setAllSteps(finalSteps);
        } else {
          setAllSteps(sortedData);
        }
        setLoading(false);
      })
      .catch((err: any) => {
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
      const type = e.key?.split("/")[0];
      const stepId = Number(e.key?.split("/")[1]);
      let body: any;
      switch (type) {
        case "verified-1":
          body = {
            status: StepsTakenStatusEnum?.completed,
          };
          updateStepStatus(stepId, body, Number(id));
          break;

        case "actionRequired-1":
          setStepId(stepId);
          break;

        default:
          break;
      }
    }
  };

  const handleGetmenu = (stepId: number, menus: any = []) => {
    return menus?.map((el: any) => ({
      key: `${el.key}/${stepId}`,
      label: el.label,
    }));
  };

  const updateStepStatus = async (
    stepId: number,
    body: any,
    companyId: number
  ) => {
    try {
      setActionLoader(true);
      await axios
        .patch(`/api/stepsTaken?stepId=${stepId}&companyId=${companyId}`, body)
        .then((res: any) => {
          openNotification({
            type: "success",
            message: "Status Updated successfully",
            placement: "topRight",
          });
          setActionLoader(false);
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

  return (
    <section className={styles.userDashSection}>
      {actionLoader ? (
        <TransparentLoader />
      ) : (
        <>
          <div
            ref={scrollRef}
            onWheel={handleWheel}
            className={styles.userStepsMainWrapper}
          >
            <ul>
              {/* <li className={styles.StepCompleted}> 
            if a step is completed add this class to the li for the style 
              */}

              {allSteps?.map((item: any, index: number) => (
                <li
                  className={`${
                    item?.stepTaken?.status == StepsTakenStatusEnum.completed
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

                    {/* {item?.stepTaken && (
                    <span className={styles[item?.stepTaken?.status]}>
                      {StepsView[item?.stepTaken?.status]}
                    </span>
                  )} */}
                  </div>
                  <div className={styles.stepContent}>
                    <h6>{item.title}</h6>

                    <p className={styles.underlined}>{item.description}</p>
                  </div>

                  <button> button </button>
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
                        <div className={styles.imageWrapper}>
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
                      ))}

                      {/* <div className={styles.actionBtnWrapper}>
                        <button
                          type="button"
                          onClick={() =>
                            handleDownload(companyDetails?.document)
                          }
                        >
                          {downloadLoading ? (
                            <Spin />
                          ) : (
                            <VerticalAlignBottomOutlined
                              style={{ fontSize: "20px" }}
                            />
                          )}
                        </button>
                        <button type="button">
                          <EditOutlined style={{ fontSize: "20px" }} />
                        </button>
                      </div> */}
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
      <ActionPopup open={modalStatus} onClose={() => setModalStatus(false)} />
    </section>
  );
};

export default CompanyDetails;
