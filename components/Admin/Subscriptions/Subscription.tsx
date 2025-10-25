"use client";

import { ColDef } from "ag-grid-community";
import { notification } from "antd";
import { NotificationPlacement } from "antd/es/notification/interface";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./subscription.module.scss";
import AgGridTable from "../AgGridTable";

type NotificationType = "success" | "info" | "warning" | "error";

type NotificationMessage = {
  type: NotificationType;
  message: string;
  placement: NotificationPlacement;
};

const Subscription = () => {
  const [rowData, setRowData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showUserModal, setShowUserModal] = useState<boolean>(false);
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (data: NotificationMessage) => {
    api[data.type]({
      message: data.message,
      placement: data?.placement,
    });
  };

  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { headerName: "Sl.No", field: "slno", sortable: true, filter: true },
    {
      headerName: "Url",
      field: "url",
      sortable: true,
      filter: true,
    },
  ]);

  useEffect(() => {
    (async () => {
      await fetchWebhooks();
    })();
  }, []);

  const fetchWebhooks = async () => {
    setLoading(true);
    await axios
      .get(`/api/subscription`)
      .then((res: any) => {
        console.log("res", res);
        // if (res.data?.result?.status) {
        //   const filterData = res?.data?.result?.data?.map(
        //     (el: any, idx: number) => ({
        //       id: el.id,
        //       slno: idx + 1,
        //       url: el?.webhook_url ?? "--",
        //     })
        //   );
        //   setRowData(filterData);
        // }
        // const filterData = res?.data?.map((el: any, idx: number) => ({
        //   id: el.id,
        //   slno: idx + 1,
        //   fname: el?.firstName ?? "--",
        //   lname: el?.lastName ?? "--",
        //   email: el?.email ?? "--",
        //   status:
        //     el?.status === 1
        //       ? "Active"
        //       : el?.status === 2
        //       ? "Deleted"
        //       : "InActive",
        // }));
        // setRowData(filterData);
        setLoading(false);
      })
      .catch((err: any) => {
        setLoading(false);
      });
  };

  const handleRowClick = (params: any) => {
    if (params.id) {
      console.log("e.id", params);
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
    fetchWebhooks();
  };
  return (
    <section>
      {contextHolder}
      <div className={styles.headerWrapper}>
        <div className={styles.actionContentWrapper}>
          <div className={styles.createUser}>
            <button type="button" onClick={() => setShowUserModal(true)}>
              Create Webhook
            </button>
          </div>
        </div>
      </div>
      <div className={styles.agridWrapper}>
        <AgGridTable
          columnDefs={columnDefs}
          rowData={rowData}
          onRowClick={handleRowClick}
          loading={loading}
        />
      </div>

      {/* {showUserModal && (
        <CreateWebHook
          onClose={() => setShowUserModal(false)}
          onSubmit={handleSubmit}
          open={showUserModal}
          openNotification={openNotification}
        />
      )} */}
    </section>
  );
};

export default Subscription;
