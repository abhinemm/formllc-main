"use client";
import React, { useEffect, useState } from "react";
import AgGridTable from "../AgGridTable";
import styles from "./EnquriesList.module.scss";
import axios from "axios";
import { ColDef } from "ag-grid-community";
import EnqurieView from "./EnqurieView";
import { Dropdown, notification } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import EmailSendModal from "../CompanyDetails/Companies/EmailSendModal";
import { NotificationPlacement } from "antd/es/notification/interface";
type NotificationType = "success" | "info" | "warning" | "error";
type NotificationMessage = {
  type: NotificationType;
  message: string;
  placement: NotificationPlacement;
};

const EnquriesList = () => {
  const [rowData, setRowData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showDetails, setShowDetails] = useState<any>(null);
  const [show, setShow] = useState<boolean>(false);
  const [emailSendID, setEmailSendID] = useState<any>(null);

  useEffect(() => {
    (async () => {
      await fetchEnquires();
    })();
  }, []);

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (data: NotificationMessage) => {
    api[data.type]({
      message: data.message,
      placement: data?.placement,
    });
  };

  function formatDate(inputDate: string): string {
    const date = new Date(inputDate);

    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" }); // e.g., "Mar"
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  }

  const fetchEnquires = async () => {
    setLoading(true);
    await axios
      .get(`/api/contactus`)
      .then((res: any) => {
        console.log("resresres", res);

        const filterData = res?.data?.map((el: any, idx: number) => ({
          id: el.id,
          slno: idx + 1,
          name: el?.subject ?? "--",
          email: el?.email ?? "--",
          phno: el?.phone ?? "--",
          des: el?.description ?? "--",
          date: el?.createdAt ? formatDate(el?.createdAt) : "--",
        }));
        setRowData(filterData);
        setLoading(false);
      })
      .catch((err: any) => {
        setLoading(false);
        console.log("errerrerrerr", err);
      });
  };

  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { headerName: "Sl.No", field: "slno", sortable: true, filter: true },
    {
      headerName: "Name",
      field: "name",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Email",
      field: "email",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Phone Number",
      field: "phno",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Description",
      field: "des",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Date",
      field: "date",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Action",
      field: "action",
      floatingFilter: false,
      cellRenderer: (params) => {
        const data = params?.data;
        let menu: any = [];
        if (data.email) {
          menu = [
            {
              key: `${data?.id}-2`,
              label: "Send Relay via Email",
              onClick: (event: any) => {
                // Prevent row click
                handleMenuClick(data.id);
              },
            },
          ];
        }

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

  const handleMenuClick = (id: number) => {
    setEmailSendID(id);
  };

  const handleRowClick = (params: any) => {
    if (params.id) {
      const selectedCompany = rowData?.find((el: any) => el.id === params.id);
      setShowDetails(selectedCompany);
      setShow(true);
    }
  };

  return (
    <div className={styles.agridWrapper}>
      {contextHolder}
      <AgGridTable
        columnDefs={columnDefs}
        rowData={rowData}
        onRowClick={handleRowClick}
        loading={loading}
      />
      {emailSendID && (
        <EmailSendModal
          onClose={() => {
            setEmailSendID(null);
          }}
          open={emailSendID ? true : false}
          companyDetails={
            rowData?.find((el: any) => el.id === emailSendID) ?? null
          }
          openNotification={openNotification}
          emailType="enquire.replay"
        />
      )}
      {show && (
        <EnqurieView
          details={showDetails}
          onClose={() => {
            setShow(false);
            setShowDetails(null);
          }}
          open={show}
        />
      )}
    </div>
  );
};

export default EnquriesList;
