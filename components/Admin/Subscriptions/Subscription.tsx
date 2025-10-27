"use client";

import { ColDef } from "ag-grid-community";
import { notification, Pagination } from "antd";
import { NotificationPlacement } from "antd/es/notification/interface";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./subscription.module.scss";
import AgGridTable from "../AgGridTable";
import { appendToGoogleSheet } from "./action";
import { downloadSubscriptionsAsCSV } from "./fileaction";

type NotificationType = "success" | "info" | "warning" | "error";

type NotificationMessage = {
  type: NotificationType;
  message: string;
  placement: NotificationPlacement;
};

type Pagination = {
  current_page: number;
  per_page: number;
  total_items: number;
  total_pages: number;
};

const Subscription = () => {
  const [rowData, setRowData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showUserModal, setShowUserModal] = useState<boolean>(false);
  const [datasValues, setdatasValues] = useState<any>([]);
  const [api, contextHolder] = notification.useNotification();
  const [page, setPage] = useState<number>(1);
  const [pagination, setPagination] = useState<Pagination>({
    current_page: 1,
    per_page: 10,
    total_items: 0,
    total_pages: 0,
  });
  const openNotification = (data: NotificationMessage) => {
    api[data.type]({
      message: data.message,
      placement: data?.placement,
    });
  };

  const subscribersColumnDefs: ColDef[] = [
    {
      headerName: "ID",
      field: "id",
      sortable: true,
      filter: true,
      width: 100,
    },
    {
      headerName: "Customer Name",
      valueGetter: (p) => p.data?.customer?.name || "",
      sortable: true,
      filter: true,
      flex: 1,
      width: 220,
    },
    {
      headerName: "Customer Email",
      valueGetter: (p) => p.data?.customer?.email || "",
      sortable: true,
      filter: "agTextColumnFilter",
      width: 220,
    },
    {
      headerName: "Customer Phone",
      valueGetter: (p) => formatPhone(p.data?.customer),
      sortable: true,
      filter: true,
      width: 160,
    },
    {
      headerName: "Product Title",
      valueGetter: (p) => p.data?.product?.title || "",
      sortable: true,
      filter: true,
      flex: 1,
    },
    {
      headerName: "Product Price",
      valueGetter: (p) => p.data?.product?.price ?? "",
      sortable: true,
      filter: true,
      width: 110,
      cellRenderer: (p) => (p.value ? `$${p.value}` : ""),
    },
    {
      headerName: "Subscription Status",
      valueGetter: (p) => p.data?.subscription?.status || "",
      sortable: true,
      filter: true,
      width: 140,
    },
    {
      headerName: "Service Type",
      valueGetter: (p) => p.data?.subscription?.service_type || "",
      sortable: true,
      filter: true,
      width: 140,
    },
    {
      headerName: "Payment Frequency (days)",
      valueGetter: (p) => p.data?.subscription?.payment_frequency ?? "",
      sortable: true,
      filter: true,
      width: 170,
    },
    {
      headerName: "Completion Date",
      valueGetter: (p) => p.data?.subscription?.completion_date || "",
      valueFormatter: (p) => formatDateHuman(p.value),
      sortable: true,
      filter: "agDateColumnFilter",
      width: 170,
    },
    {
      headerName: "Created At",
      valueGetter: (p) => p.data?.subscription?.created_at || "",
      valueFormatter: (p) => formatDateHuman(p.value),
      sortable: true,
      filter: "agDateColumnFilter",
      width: 160,
    },
    // optional hidden columns with raw ids for easier actions
    {
      headerName: "Customer ID",
      valueGetter: (p) => p.data?.customer?.id || "",
      hide: true,
    },
    {
      headerName: "Product ID",
      valueGetter: (p) => p.data?.product?.id || "",
      hide: true,
    },
    {
      headerName: "Subscription ID",
      valueGetter: (p) => p.data?.subscription?.id || "",
      hide: true,
    },
  ];

  function formatDateHuman(input?: string | null) {
    if (!input) return "";
    const d = new Date(input);
    if (Number.isNaN(d.getTime())) return input;
    const day = d.getDate();
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = monthNames[d.getMonth()];
    const year = d.getFullYear();
    return `${day}${getOrdinal(day)} ${month} ${year}`;
  }
  function getOrdinal(day: number) {
    if (day % 100 >= 11 && day % 100 <= 13) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  function formatPhone(customer: any) {
    if (!customer) return "";
    const cc = customer.country_code ? `+${customer.country_code}` : "";
    return `${cc} ${customer.phone || ""}`.trim();
  }

  useEffect(() => {
    (async () => {
      await fetchWebhooks(page);
    })();
  }, [page]);

  const fetchWebhooks = async (current) => {
    setLoading(true);
    await axios
      .get(`/api/subscription?page=${current}`)
      .then((res: any) => {
        if (res.data?.result?.data?.subscribers) {
          const final = res.data?.result?.data?.subscribers?.map((el: any) => {
            const obj = {
              id: el.id,
              customerName: el?.customer?.name,
              customerEmail: el?.customer?.email,
              customerPhone: `${el?.customer?.country_code} ${el?.customer?.phone}`,
              customerID: el?.customer?.id,
              productTitle: el?.product?.title,
              productPrice: el?.product?.price,
              subScriptionId: el?.subscription?.id,
              subscriptionStatus: el?.subscription?.status,
            };
            return obj;
          });
          setdatasValues(final);
          setRowData(res.data?.result?.data?.subscribers);
          setPagination((prev) => ({
            ...prev,
            total_items: res.data?.result?.data?.total_items ?? 0,
            total_pages: res.data?.result?.data?.total_pages ?? 0,
          }));
        }
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

  const handleDownloadCSV = async () => {
    try {
      const result: any = await downloadSubscriptionsAsCSV(datasValues);

      if (result.success) {
        // Create download link
        const blob = new Blob([result.csv], {
          type: "text/csv;charset=utf-8;",
        });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", `subscriptions-${page}.csv`);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } finally {
    }
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
    fetchWebhooks(page);
  };

  const getPageSize = (data: any) => {
    console.log("datadatadatadata", data);
  };

  const handleSubmitData = async () => {
    const data = {
      name: "christin",
      email: "chriistin",
      message: "this is  sample",
    };
    const result = await appendToGoogleSheet(data);
    if (result.success) {
      console.log("Data appended successfully!");
      // Reset form or show success message
    } else {
      console.error("Failed to append data");
      // Show error message
    }
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
      <button type="button" onClick={() => handleDownloadCSV()}>
        Add to sheet
      </button>
      <button type="button" onClick={() => setPage((prev) => prev + 1)}>
        Add one
      </button>
      {/* <div className={styles.agridWrapper}>
        <AgGridTable
          columnDefs={subscribersColumnDefs}
          rowData={rowData}
          onRowClick={handleRowClick}
          loading={loading}
        />
      </div> */}

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
