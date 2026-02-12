"use client";

import { ColDef } from "ag-grid-community";
import Reac, { useEffect, useRef, useState } from "react";
import AgGridTable from "../../AgGridTable";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAppContext } from "../../../Context/AppContext";
import { Dropdown, notification } from "antd";
import {
  UserAddOutlined,
  MoreOutlined,
  PlusCircleOutlined,
  CloudDownloadOutlined,
} from "@ant-design/icons";
import { NotificationPlacement } from "antd/es/notification/interface";
import styles from "./Companies.module.scss";
import CreateCompany from "../../../Modals/CreateCompany/CreateCompany";
import { ArrowDownToLine, HousePlus, SubscriptIcon } from "lucide-react";
import UpdatePaymentStatus from "./UpdatePaymentStatus";
import EmailSendModal from "./EmailSendModal";
type NotificationType = "success" | "info" | "warning" | "error";

type NotificationMessage = {
  type: NotificationType;
  message: string;
  placement: NotificationPlacement;
};

const Companies: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [allCompanies, setAllCompanies] = useState<any>();
  const { setContextOptions } = useAppContext();
  const [rowData, setRowData] = useState<any>([]);
  const [updatePaymentStatus, setUpdatePaymentStatus] = useState(false);
  const [updateCompany, setUpdateCompany] = useState<any>(null);
  const [showCreateCompany, setShowCreateCompany] = useState<boolean>(false);
  const [emailSendID, setEmailSendID] = useState<any>(null);
  const allCompaniesRef = useRef<any>([]);
  const [companyStatus, setCompanyStatus] = useState<number>(1);
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { headerName: "Sl.No", field: "slno", sortable: true, filter: true },
    {
      headerName: "User Name",
      field: "customerName",
      sortable: true,
      filter: true,
    },
    {
      headerName: "User Email",
      field: "customerEmail",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Company Name",
      field: "companyName",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Registration State",
      field: "registrationState",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Owner Name",
      field: "ownerAndCompany",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Company Email",
      field: "companyEmail",
      sortable: true,
      filter: true,
    },
    { headerName: "Phone", field: "phone", sortable: true, filter: true },
    {
      headerName: "Payment Status",
      field: "paymentStatus",
      sortable: true,
      filter: true,
      cellRenderer: (params) => {
        const value = params.value ? params.value.toLowerCase() : "";
        const color = value === "paid" ? "green" : "red";
        const label = value === "paid" ? "Paid" : "Not Paid";
        return (
          <span style={{ color: color, fontWeight: "bold" }}>{label}</span>
        );
      },
    },
    {
      headerName: "Subscription Status",
      field: "subscriptionStatus",
      sortable: true,
      filter: true,
      cellRenderer: (params) => {
        const value = params.value ? params.value.toLowerCase() : "";
        const color = value === "paid" ? "green" : "red";
        const label = value === "paid" ? "Paid" : "Not Paid";
        return (
          <span style={{ color: color, fontWeight: "bold" }}>{label}</span>
        );
      },
    },
    {
      headerName: "Action",
      field: "action",
      floatingFilter: false,
      cellRenderer: (params) => {
        const data = params?.data;
        let menu: any = [];

        menu = [
          {
            key: `${data?.id}-1`,
            label: "Edit",
            onClick: (event: any) => {
              // Prevent row click
              handleMenuClick(event);
            },
          },
          {
            key: `${data?.id}-2`,
            label: "Whatsapp",
            onClick: (event: any) => {
              // Prevent row click
              handleWhatsapp(data?.phone);
            },
          },
          {
            key: `${data?.id}-3`,
            label: "Update Payment",
            onClick: (event: any) => {
              // Prevent row click
              handleUpdatePayment(data.id);
            },
          },
          {
            key: `${data?.id}-4`,
            label: "Send Email",
            onClick: (event: any) => {
              // Prevent row click
              handleEmailSendClick(data.id);
            },
          },
        ];
        return (
          <Dropdown
            menu={{
              items: menu,
            }}
            trigger={["click"]}
          >
            <MoreOutlined style={{ fontSize: "20px" }} />
          </Dropdown>
        );
      },
    },
  ]);

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (data: NotificationMessage) => {
    api[data.type]({
      message: data.message,
      placement: data?.placement,
    });
  };
  useEffect(() => {
    (async () => {
      await fetchCompanies(companyStatus);
    })();
  }, [companyStatus]);

  const fetchCompanies = async (status) => {
    setLoading(true);
    await axios
      .get(`/api/company?status=${status}`)
      .then((res: any) => {
        const filterData = res?.data?.map((el: any, idx: number) => ({
          id: el.id,
          slno: idx + 1,
          customerName: `${el?.firstName ?? "--"} ${el?.lastName ?? ""}`,
          customerEmail: el?.email,
          companyName: `${el?.companyName ?? "--"} ${el?.type}`,
          registrationState: el?.registrationState ?? "--",
          ownerAndCompany: `${el?.ownerFname ?? "--"} ${
            el?.ownerLname ?? "--"
          }`,
          companyEmail: `${el?.ownerFname ?? "--"} ${el?.ownerLname ?? "--"}`,
          phone: `${el?.countryCode ?? "--"} ${el?.phone}`,
          paymentStatus: el?.regPaymentStatus ? "paid" : "notPaid",
          subscriptionStatus: el?.subsriptionPaymentStatus ? "paid" : "notPaid",
        }));
        allCompaniesRef.current = res?.data;

        setAllCompanies(res?.data);
        setRowData(filterData);
        setLoading(false);
      })
      .catch((err: any) => {
        setLoading(false);
      });
    setLoading(false);
  };

  const handleRowClick = (e: any) => {
    if (e.id) {
      const selectedCompany = allCompanies?.find((el: any) => el.id === e.id);
      setContextOptions((prev) => ({
        ...prev,
        selectedCompanyDetails: selectedCompany,
      }));
      router.push(`/admin/company-details/${e.id}`);
    }
  };

  const handleWhatsapp = (phone: any) => {
    if (phone) {
      const number = phone.replace(/\s+/g, "").replace(/\+/g, "");
      const link = `https://wa.me/${number}`;
      window.open(link, "_blank");
    } else {
      openNotification({
        type: "error",
        message: "No phone number found",
        placement: "topRight",
      });
    }
  };

  const handleMenuClick = (e: any) => {
    const companies = allCompaniesRef.current;
    if (!companies?.length) {
      console.warn("allCompanies is undefined at click time!");
      return;
    }

    const companyId = e?.key?.split("-")[0];
    const splitedNumber = Number(companyId);
    const findCompanyDetails = companies?.find(
      (el: any) => el?.id === splitedNumber
    );

    setUpdateCompany(findCompanyDetails || null);
    setShowCreateCompany(true);
  };

  const handleUpdatePayment = (id: number) => {
    const companies = allCompaniesRef.current;
    if (!companies?.length) {
      console.warn("allCompanies is undefined at click time!");
      return;
    }
    if (id) {
      const splitedNumber = Number(id);
      const findCompanyDetails = companies?.find(
        (el: any) => el?.id === splitedNumber
      );
      setUpdateCompany(findCompanyDetails || null);
      setUpdatePaymentStatus(true);
    }
  };

  const exportCompanies = async (status) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/company/export?status=${status}`, {
        method: "GET",
      });
      if (!res.ok) throw new Error("Failed to export");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      setLoading(false);
      a.href = url;
      const now = new Date();
      const iso = now.toISOString().replace(/[:.]/g, "-");
      a.download = `company_${iso}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSendClick = (id: number) => {
    setEmailSendID(id);
    // const findData = allCompanies?.find((el: any) => el.id == id);
    // console.log("findDatafindDatafindData", findData);
    // if (findData) {
    //   setEmailSendID(findData);
    // }
  };

  return (
    <div>
      {contextHolder}
      <div className={styles.headerWrapper}>
        <div className={styles.leftSide}>
          <button
            type="button"
            className={companyStatus === 1 ? styles.active : ""}
            onClick={() => setCompanyStatus(1)}
          >
            Active
          </button>
          <button
            type="button"
            className={companyStatus === 0 ? styles.active : ""}
            onClick={() => setCompanyStatus(0)}
          >
            Inactive
          </button>
          <button
            type="button"
            className={companyStatus === 2 ? styles.active : ""}
            onClick={() => setCompanyStatus(2)}
          >
            Deleted
          </button>
        </div>
        <div className={styles.rightSide}>
          <button
            type="button"
            onClick={() => exportCompanies(companyStatus)}
            disabled={loading}
          >
            <ArrowDownToLine fontSize={16} />
            Export
          </button>
          <button type="button" onClick={() => setShowCreateCompany(true)}>
            <HousePlus />
            Create New
          </button>
        </div>
      </div>
      {/* {companyStatus === 1 && (
        <ActiveCompanies
          columnDefs={columnDefs}
          handleRowClick={handleRowClick}
          loading={loading}
          rowData={rowData}
        />
      )} */}

      <AgGridTable
        columnDefs={columnDefs}
        rowData={rowData}
        onRowClick={handleRowClick}
        loading={loading}
      />
      {showCreateCompany && (
        <CreateCompany
          open={showCreateCompany}
          onClose={() => {
            setShowCreateCompany(false);
            setUpdateCompany(null);
          }}
          openNotification={openNotification}
          updateCompany={updateCompany}
          onSuccess={async () => {
            setShowCreateCompany(false);
            setUpdateCompany(null);
            await fetchCompanies(companyStatus);
          }}
        />
      )}
      {updatePaymentStatus && (
        <UpdatePaymentStatus
          onClose={() => setUpdatePaymentStatus(false)}
          open={updatePaymentStatus}
          companyDetails={updateCompany}
          onSuccess={async () => {
            setUpdatePaymentStatus(false);
            setUpdateCompany(null);
            await fetchCompanies(companyStatus);
          }}
          openNotification={openNotification}
        />
      )}
      {emailSendID && (
        <EmailSendModal
          onClose={() => {
            setEmailSendID(null);
          }}
          open={emailSendID ? true : false}
          companyDetails={allCompanies.find((el: any) => el.id == emailSendID)}
          openNotification={openNotification}
        />
      )}
    </div>
  );
};

export default Companies;
