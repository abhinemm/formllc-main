"use client";
import React, { useEffect, useState } from "react";
import AgGridTable from "../../AgGridTable";
import { ColDef } from "ag-grid-community";
import styles from "../Affiliates.module.scss";
import { Tooltip } from "antd";
import DashboardCard from "../../../Common/DashboardCard";
import axios from "axios";
import { UserTypesEnum } from "@/utils/constants";
import { useParams } from "next/navigation";
import { useAppContext } from "../../../Context/AppContext";
import { encryptURL } from "@/helpers/CryptoHelper";
import CopyLinkModal from "../../../Modals/CopyLinkModal/CopyLinkModal";

const UserDetails = () => {
  const params = useParams();
  const id = params?.id;
  const [loading, setLoading] = useState(true);
  const [rowData, setRowData] = useState<any>([]);
  const { contextOptions } = useAppContext();
  const [userDetails, setUserDetails] = useState<any>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [fullUrl, setFullUrl] = useState<any>(null);
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
    {
      headerName: "Credit Amount",
      field: "creditAmount",
      sortable: true,
      filter: true,
    },
  ]);

  useEffect(() => {
    (async () => {
      if (Number(id)) {
        setUserId(Number(id));
        await fetchMembersDetails(id);
      } else {
        if (contextOptions?.userData?.type === UserTypesEnum.member) {
          setUserId(contextOptions?.userData?.id ?? null);
          await fetchMembersDetails(contextOptions?.userData?.id);
        }
      }
    })();
  }, [id]);

  const fetchMembersDetails = async (id) => {
    setLoading(true);
    await axios
      .get(`/api/affiliates?referId=${id}`)
      .then((res: any) => {
        console.log("resresresresresresres", res);
        setUserDetails(res?.data);
        const filterData = res?.data?.companies?.map(
          (el: any, idx: number) => ({
            id: el.id,
            slno: idx + 1,
            companyName: `${el?.companyName ?? "--"} ${el?.type}`,
            registrationState: el?.registrationState ?? "--",
            ownerAndCompany: `${el?.ownerFname ?? "--"} ${
              el?.ownerLname ?? "--"
            }`,
            companyEmail: `${el?.ownerFname ?? "--"} ${el?.ownerLname ?? "--"}`,
            creditAmount: `$ ${res?.data?.amountPerCompany}`,
          })
        );

        setRowData(filterData);
        setLoading(false);
      })
      .catch((err: any) => {
        console.log("errerrerrerr", err);
        setLoading(false);
      });
  };

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

  const onCreateLink = async () => {
    const origin = window?.location?.origin;
    const encriptUrl = await encryptURL(`${userId}`);
    const fullUrl = `${origin}/${encriptUrl}`;
    setFullUrl(fullUrl);
    setOpenModal(true);
  };
  return (
    <div className={styles.affiliatesDetails}>
      <div className={styles.headerWrapper}>
        <div className={styles.cardsWrapper}>
          <DashboardCard
            title="Total Revenue"
            value={`$ ${userDetails?.totalAmountCredit ?? 0}`}
            change="16%"
            isPositive={true}
          />
          <DashboardCard
            title="Company Registrations (Total)"
            value={`${userDetails?.totalCompanies ?? 0}`}
            change="0.4%"
            isPositive={false}
          />
          <DashboardCard
            title="Commission per New Company"
            value={`$ ${userDetails?.amountPerCompany ?? 0}`}
            change="8%"
            isPositive={true}
          />
          {/* <DashboardCard
            title="Total Product"
            value="2,63,783"
            change="4%"
            isPositive={true}
          /> */}
        </div>
        {contextOptions?.userData?.type === UserTypesEnum.member && (
          <div className={styles.actionWrapper}>
            <button onClick={() => onCreateLink()}>Create Link</button>
          </div>
        )}
      </div>
      <AgGridTable
        columnDefs={columnDefs}
        rowData={rowData}
        onRowClick={handleRowClick}
        loading={loading}
      />
      <CopyLinkModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        link={fullUrl}
      />
    </div>
  );
};

export default UserDetails;
