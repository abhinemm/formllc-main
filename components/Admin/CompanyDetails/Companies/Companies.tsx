"use client";

import { ColDef } from "ag-grid-community";
import Reac, { useEffect, useState } from "react";
import AgGridTable from "../../AgGridTable";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAppContext } from "../../../Context/AppContext";

const Companies: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState();
  const [allCompanies, setAllCompanies] = useState<any>();
  const { setContextOptions } = useAppContext();
  const [rowData, setRowData] = useState<any>([]);

  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { headerName: "Sl.No", field: "slno", sortable: true, filter: true },
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
  ]);
  useEffect(() => {
    (async () => {
      await fetchCompanies();
    })();
  }, []);

  const fetchCompanies = async () => {
    await axios
      .get(`/api/company`)
      .then((res: any) => {
        const filterData = res?.data?.map((el: any, idx: number) => ({
          id: el.id,
          slno: idx + 1,
          companyName: `${el?.companyName ?? "--"} ${el?.type}`,
          registrationState: el?.registrationState ?? "--",
          ownerAndCompany: `${el?.ownerFname ?? "--"} ${
            el?.ownerLname ?? "--"
          }`,
          companyEmail: `${el?.ownerFname ?? "--"} ${el?.ownerLname ?? "--"}`,
          phone: `${el?.countryCode ?? "--"} ${el?.phone}`,
          paymentStatus: el?.regPaymentStatus ? "paid" : "notPaid",
        }));
        setAllCompanies(res?.data);
        setRowData(filterData);
      })
      .catch((err: any) => {
        console.log("errerrerrerr", err);
      });
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

  return (
    <AgGridTable
      columnDefs={columnDefs}
      rowData={rowData}
      onRowClick={handleRowClick}
    />
  );
};

export default Companies;
