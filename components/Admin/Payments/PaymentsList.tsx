"use client";
import React, { useEffect, useRef, useState } from "react";
import AgGridTable from "../AgGridTable";
import styles from "./PaymentsList.module.scss";
import axios from "axios";
import { ColDef } from "ag-grid-community";
import { MoreOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { SquarePlus } from "lucide-react";
import { paymentType } from "../../PaymentSuccess/PaymentTemp";
import { formatDate } from "@/helpers/helper";
import CreatePayments from "./CreatePayments";
import { Dropdown, notification } from "antd";
import { NotificationPlacement } from "antd/es/notification/interface";

type NotificationType = "success" | "info" | "warning" | "error";

type NotificationMessage = {
  type: NotificationType;
  message: string;
  placement: NotificationPlacement;
};

const PaymentsList = () => {
  const [rowData, setRowData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [type, setType] = useState<any>(paymentType.oneTime);
  const [open, setOpen] = useState<boolean>(false);
  const [api, contextHolder] = notification.useNotification();
  const [updatePayment, setupdatePayment] = useState<any>(null);
  const allPaymentRef = useRef<any>([]);
  useEffect(() => {
    (async () => {
      await fetchPayments(type);
    })();
  }, [type]);

  const openNotification = (data: NotificationMessage) => {
    api[data.type]({
      message: data.message,
      placement: data?.placement,
    });
  };

  const fetchPayments = async (type: string) => {
    setLoading(true);
    await axios
      .get(`/api/payment?type=${type}`)
      .then((res: any) => {
        const filterData = res?.data?.map((el: any, idx: number) => ({
          id: el.id,
          slno: idx + 1,
          transID: el?.transactionID ?? "--",
          resNo: el?.paymentId ?? "--",
          pType: el?.type === "sub" ? "Subscription" : "Registration",
          pDate: formatDate(el?.paymentDate) ?? "--",
          cName: `${el?.companyName ?? ""} ${el?.ctype ?? "--"}`,
          pFor: el?.registrationState ?? "--",
          status: el?.status,
          createdStatus: el?.createdBy == 1 ? "System" : "Manuel",
          createdBy: el?.createdBy,
        }));
        allPaymentRef.current = res?.data;
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
      headerName: "Transaction ID",
      field: "transID",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Referance Number",
      field: "resNo",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Payment Type",
      field: "pType",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Payment Date",
      field: "pDate",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Company Name",
      field: "cName",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Payment For",
      field: "pFor",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Created By",
      field: "createdStatus",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Status",
      field: "status",
      sortable: true,
      filter: true,

      cellRenderer: (params) => {
        const value = params.value;
        const color = value.toLowerCase() === "paid" ? "#198754" : "#dc3545";
        return (
          <span style={{ color: color, fontWeight: "bold" }}>{value}</span>
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
        if (data?.createdBy === 1) {
          return "";
        }
        menu = [
          {
            key: `${data?.id}-1`,
            label: "Edit",
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

  const handleCreatePayment = (ptype: any) => {
    if (ptype === type) {
      fetchPayments(ptype);
      setOpen(false);
      setupdatePayment(null);
    } else {
      setOpen(false);
      setType(ptype);
      setupdatePayment(null);
    }
  };

  const handleMenuClick = (e: any) => {
    const allPayment = allPaymentRef.current;
    if (!allPayment?.length) {
      console.warn("allCompanies is undefined at click time!");
      return;
    }
    const companyId = e?.key?.split("-")[0];
    const splitedNumber = Number(companyId);
    const findCompanyDetails = allPayment?.find(
      (el: any) => el?.id === splitedNumber
    );
    setupdatePayment(findCompanyDetails || null);
    setOpen(true);
  };

  return (
    <>
      <div className={styles.headerWrapper}>
        {contextHolder}
        <div className={styles.leftSide}>
          <button
            type="button"
            className={type === paymentType.oneTime ? styles.active : ""}
            onClick={() => setType(paymentType.oneTime)}
          >
            Registration
          </button>
          <button
            type="button"
            className={type === paymentType.sub ? styles.active : ""}
            onClick={() => setType(paymentType.sub)}
          >
            Subscription
          </button>
        </div>
        <div className={styles.rightSide}>
          <button type="button" onClick={() => setOpen(true)}>
            <SquarePlus />
            Create New
          </button>
        </div>
      </div>

      <CreatePayments
        onClose={() => setOpen(false)}
        open={open}
        onSuccess={handleCreatePayment}
        openNotification={openNotification}
        updatePayment={updatePayment}
      />

      <div className={styles.agridWrapper}>
        <AgGridTable
          columnDefs={columnDefs}
          rowData={rowData}
          onRowClick={handleRowClick}
          loading={loading}
        />
      </div>
    </>
  );
};

export default PaymentsList;
