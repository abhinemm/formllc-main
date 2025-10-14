"use client";

import { ColDef } from "ag-grid-community";
import Reac, { useEffect, useRef, useState } from "react";
import AgGridTable from "../../AgGridTable";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAppContext } from "../../../Context/AppContext";
import { Dropdown, notification } from "antd";
import { UserAddOutlined, MoreOutlined } from "@ant-design/icons";
import { NotificationPlacement } from "antd/es/notification/interface";
import styles from "./Companies.module.scss";
import CreateCompany from "../../../Modals/CreateCompany/CreateCompany";
import { SubscriptIcon } from "lucide-react";
import UpdatePaymentStatus from "./UpdatePaymentStatus";
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
  const allCompaniesRef = useRef<any>([]);
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
      await fetchCompanies();
    })();
  }, []);

  const fetchCompanies = async () => {
    setLoading(true);
    await axios
      .get(`/api/company`)
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
        console.log("res?.datares?.datares?.data", res?.data);

        setAllCompanies(res?.data);
        setRowData(filterData);
        setLoading(false);
      })
      .catch((err: any) => {
        setLoading(false);
        console.log("errerrerrerr", err);
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

  // const handleMenuClick = (e: any) => {
  //   console.log("updateCompany", e?.key);
  //   const companyId = e?.key?.split("-")[0];
  //   console.log("companyId-------------", companyId);
  //   const splitedNumber = Number(companyId);
  //   console.log("splitedNumbersplitedNumber", splitedNumber);
  //   console.log("allCompaniesallCompaniesallCompanies", allCompanies);
  //   const findCompanyDetails = allCompanies?.find(
  //     (el: any) => el?.id === splitedNumber
  //   );
  //   console.log("findCompanyDetailsfindCompanyDetails", findCompanyDetails);

  //   setUpdateCompany(
  //     Object.keys(findCompanyDetails)?.length > 0 ? findCompanyDetails : null
  //   );
  //   console.log("findCompanyDetails", findCompanyDetails);
  // };
  const handleMenuClick = (e: any) => {
    console.log("INSIDE handleMenuClick", allCompaniesRef.current);
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

    console.log("Matched Company:", findCompanyDetails);
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
  return (
    <div>
      {contextHolder}
      <div className={styles.actionContentWrapper}>
        <div className={styles.createUser}>
          <button type="button" onClick={() => setShowCreateCompany(true)}>
            <UserAddOutlined />
            Create Company
          </button>
        </div>
      </div>
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
            await fetchCompanies();
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
            await fetchCompanies();
          }}
          openNotification={openNotification}
        />
      )}
    </div>
  );
};

export default Companies;
