"use client";

import { ColDef } from "ag-grid-community";
import Reac, { useEffect, useState } from "react";
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
  const [updateCompany, setUpdateCompany] = useState<any>(null);
  const [showCreateCompany, setShowCreateCompany] = useState<boolean>(false);
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
            label: "Activate",
            onClick: (event: any) => {
              // Prevent row click
              handleMenuClick(event);
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

  const handleMenuClick = (e: any) => {
    console.log("updateCompany", e?.key);
    const companyId = e?.key?.split("-")[1];
    console.log("companyId-------------", companyId);
    const findCompanyDetails = allCompanies?.find(
      (el: any) => el?.id === companyId
    );
    setUpdateCompany(
      Object.keys(findCompanyDetails)?.length > 0 ? findCompanyDetails : null
    );
    console.log("findCompanyDetails", findCompanyDetails);
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
    </div>
  );
};

export default Companies;
