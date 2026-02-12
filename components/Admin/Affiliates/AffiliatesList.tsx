"use client";
import React, { useEffect, useState } from "react";
import AgGridTable from "../AgGridTable";
import { ColDef } from "ag-grid-community";
import styles from "./Affiliates.module.scss";
import { UserAddOutlined } from "@ant-design/icons";
import CreateUserModal from "./CreateUserModal";
import axios from "axios";
import { UserTypesEnum } from "@/utils/constants";
import { notification } from "antd";
import { NotificationPlacement } from "antd/es/notification/interface";
import { useRouter } from "next/navigation";

type NotificationType = "success" | "info" | "warning" | "error";

type NotificationMessage = {
  type: NotificationType;
  message: string;
  placement: NotificationPlacement;
};

const AffiliatesList = () => {
  const router = useRouter();
  const [showUserModal, setShowUserModal] = useState<boolean>(false);
  const [api, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState(true);
  const openNotification = (data: NotificationMessage) => {
    api[data.type]({
      message: data.message,
      placement: data?.placement,
    });
  };
  const [rowData, setRowData] = useState<any>([]);
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { headerName: "Sl.No", field: "slno", sortable: true, filter: true },
    {
      headerName: "First Name",
      field: "fname",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Last Name",
      field: "lname",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Email",
      field: "email",
      sortable: true,
      filter: true,
    },

    // {
    //   headerName: "Status",
    //   field: "status",
    //   sortable: true,
    //   filter: true,
    //   cellRenderer: (params) => {
    //     const value = params.value ? params.value.toLowerCase() : "";
    //     const color = value === "active" ? "green" : "red";
    //     const label = value === "active" ? "Active" : "Inactive";
    //     return (
    //       <span style={{ color: color, fontWeight: "bold" }}>{label}</span>
    //     );
    //   },
    // },
  ]);

  useEffect(() => {
    (async () => {
      await fetchMembers();
    })();
  }, []);

  const fetchMembers = async () => {
    setLoading(true);
    await axios
      .get(`/api/users?user=${UserTypesEnum.member}`)
      .then((res: any) => {
        const filterData = res?.data?.map((el: any, idx: number) => ({
          id: el.id,
          slno: idx + 1,
          fname: el?.firstName ?? "--",
          lname: el?.lastName ?? "--",
          email: el?.email ?? "--",
          // paymentStatus: el?.regPaymentStatus ? "paid" : "notPaid",
        }));

        setRowData(filterData);
        setLoading(false);
      })
      .catch((err: any) => {
        setLoading(false);
      });
  };
  const handleRowClick = (e: any) => {
    if (e.id) {
      router.push(`/admin/affiliates/${e.id}`);
      //   const selectedCompany = allCompanies?.find((el: any) => el.id === e.id);
      //   setContextOptions((prev) => ({
      //     ...prev,
      //     selectedCompanyDetails: selectedCompany,
      //   }));
      //   router.push(`/admin/company-details/${e.id}`);
    }
  };

  const handleSubmit = () => {
    setShowUserModal(false);
    fetchMembers();
  };
  return (
    <div>
      {contextHolder}
      <div className={styles.flexWrapper}>
        <button type="button" onClick={() => setShowUserModal(true)}>
          <UserAddOutlined /> Create New{" "}
        </button>
      </div>{" "}
      <AgGridTable
        columnDefs={columnDefs}
        rowData={rowData}
        onRowClick={handleRowClick}
        loading={loading}
      />
      {showUserModal && (
        <CreateUserModal
          onClose={() => setShowUserModal(false)}
          onSubmit={handleSubmit}
          open={showUserModal}
          openNotification={openNotification}
          userType={UserTypesEnum.member}
        />
      )}
    </div>
  );
};

export default AffiliatesList;
