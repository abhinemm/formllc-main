"use client";
import React, { useEffect, useState } from "react";
import AgGridTable from "../AgGridTable";
import styles from "./PaymentsList.module.scss";
import axios from "axios";
import { ColDef } from "ag-grid-community";
import { PlusCircleOutlined } from "@ant-design/icons";
import { SquarePlus } from "lucide-react";
import { paymentType } from "../../PaymentSuccess/PaymentTemp";

const PaymentsList = () => {
  const [rowData, setRowData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [type, setType] = useState<any>(paymentType.oneTime);
  useEffect(() => {
    (async () => {
      await fetchPayments(type);
    })();
  }, [type]);

  function formatDate(inputDate: string): string {
    const date = new Date(inputDate);

    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" }); // e.g., "Mar"
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  }

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
    // {
    //   headerName: "Action",
    //   field: "action",
    //   floatingFilter: false,
    //   cellRenderer: (params) => {
    //     const data = params?.data;
    //     let menu: any = [];
    //     if (data.status === "Active") {
    //       menu = [
    //         {
    //           key: `${data?.id}-2`,
    //           label: "Delete",
    //           onClick: (event: any) => {
    //             // Prevent row click
    //             handleMenuClick(event);
    //           },
    //         },
    //         {
    //           key: `${data?.id}-0`,
    //           label: "In Active",
    //           onClick: (event: any) => {
    //             // Prevent row click
    //             handleMenuClick(event);
    //           },
    //         },
    //       ];
    //     } else if (data.status === "Deleted") {
    //       menu = [
    //         {
    //           key: `${data?.id}-1`,
    //           label: "Activate",
    //           onClick: (event: any) => {
    //             // Prevent row click
    //             handleMenuClick(event);
    //           },
    //         },
    //       ];
    //     } else {
    //       menu = [
    //         {
    //           key: `${data?.id}-1`,
    //           label: "Activate",
    //           onClick: (event: any) => {
    //             // Prevent row click
    //             handleMenuClick(event);
    //           },
    //         },
    //         {
    //           key: `${data?.id}-0`,
    //           label: "In Active",
    //           onClick: (event: any) => {
    //             // Prevent row click
    //             handleMenuClick(event);
    //           },
    //         },
    //       ];
    //     }

    //     if (data.status === "Deleted") {
    //       menu = [
    //         {
    //           key: `${data?.id}-1`,
    //           label: "Activate",
    //           onClick: (event: any) => {
    //             // Prevent row click
    //             handleMenuClick(event);
    //           },
    //         },
    //       ];
    //     }

    //     return (
    //       <Dropdown
    //         menu={{
    //           items: menu,
    //         }}
    //         trigger={["click"]}
    //       >
    //         <MoreOutlined style={{ fontSize: "20px" }} />
    //       </Dropdown>
    //     );
    //   },
    // },
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

  return (
    <>
      <div className={styles.headerWrapper}>
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
          {/* <button
            type="button"
            onClick={() => exportCompanies(companyStatus)}
            disabled={loading}
          >
            <ArrowDownToLine fontSize={16} />
            Export
          </button> */}
          <button type="button">
            <SquarePlus />
            Create New
          </button>
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
    </>
  );
};

export default PaymentsList;
