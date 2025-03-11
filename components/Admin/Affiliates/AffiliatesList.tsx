"use client";
import React, { useState } from "react";
import AgGridTable from "../AgGridTable";
import { ColDef } from "ag-grid-community";
import styles from "./Affiliates.module.scss";
import { UserAddOutlined } from "@ant-design/icons";
import CreateUserModal from "./CreateUserModal";

const AffiliatesList = () => {
  const [showUserModal, setShowUserModal] = useState<boolean>(false);
  const staticData: any = [
    {
      id: 1,
      slno: 1,
      name: "Christin KF",
      email: "christin@gmail.com",
      status: "",
      action: "",
    },
  ];
  const [rowData, setRowData] = useState<any>(staticData);
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
      headerName: "Status",
      field: "status",
      sortable: true,
      filter: true,
      cellRenderer: (params) => {
        const value = params.value ? params.value.toLowerCase() : "";
        const color = value === "active" ? "green" : "red";
        const label = value === "active" ? "Active" : "Inactive";
        return (
          <span style={{ color: color, fontWeight: "bold" }}>{label}</span>
        );
      },
    },
  ]);
  const handleRowClick = (e: any) => {
    if (e.id) {
      console.log("e.id", e.id);

      //   const selectedCompany = allCompanies?.find((el: any) => el.id === e.id);
      //   setContextOptions((prev) => ({
      //     ...prev,
      //     selectedCompanyDetails: selectedCompany,
      //   }));
      //   router.push(`/admin/company-details/${e.id}`);
    }
  };

  const handleSubmit = () => {};
  return (
    <div>
      <div className={styles.flexWrapper}>
        <button type="button" onClick={() => setShowUserModal(true)}>
          <UserAddOutlined /> Create New{" "}
        </button>
      </div>{" "}
      <AgGridTable
        columnDefs={columnDefs}
        rowData={rowData}
        onRowClick={handleRowClick}
      />
      {showUserModal && (
        <CreateUserModal
          onClose={() => setShowUserModal(false)}
          onSubmit={handleSubmit}
          open={showUserModal}
        />
      )}
    </div>
  );
};

export default AffiliatesList;
