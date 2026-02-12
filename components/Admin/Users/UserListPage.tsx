"use client";
import React, { useEffect, useState } from "react";
import styles from "./users.module.scss";
import AgGridTable from "../AgGridTable";
import { ColDef } from "ag-grid-community";
import { UserTypesEnum } from "@/utils/constants";
import axios from "axios";
import { UserAddOutlined, MoreOutlined } from "@ant-design/icons";
import CreateUserModal from "../Affiliates/CreateUserModal";
import { Dropdown, notification } from "antd";
import { NotificationPlacement } from "antd/es/notification/interface";
import { log } from "node:console";
import ComfirmationModal from "../../ConfirmationModal/ComfirmationModal";

type NotificationType = "success" | "info" | "warning" | "error";

type NotificationMessage = {
  type: NotificationType;
  message: string;
  placement: NotificationPlacement;
};

const UserListPage = () => {
  const [activeTabs, setActiveTabs] = useState<string>(UserTypesEnum.customer);
  const [rowData, setRowData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showUserModal, setShowUserModal] = useState<boolean>(false);
  const [api, contextHolder] = notification.useNotification();
  const [actionId, setActionId] = useState<any>(null);
  const openNotification = (data: NotificationMessage) => {
    api[data.type]({
      message: data.message,
      placement: data?.placement,
    });
  };

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

    {
      headerName: "Status",
      field: "status",
      sortable: true,
      filter: true,

      cellRenderer: (params) => {
        const value = params.value;
        const color =
          value === "Active"
            ? "#198754"
            : value === "Deleted"
            ? "#dc3545"
            : "#fd7e14";
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
        if (data.status === "Active") {
          menu = [
            {
              key: `${data?.id}-2`,
              label: "Delete",
              onClick: (event: any) => {
                // Prevent row click
                handleMenuClick(event);
              },
            },
            {
              key: `${data?.id}-0`,
              label: "In Active",
              onClick: (event: any) => {
                // Prevent row click
                handleMenuClick(event);
              },
            },
          ];
        } else if (data.status === "Deleted") {
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
        } else {
          menu = [
            {
              key: `${data?.id}-1`,
              label: "Activate",
              onClick: (event: any) => {
                // Prevent row click
                handleMenuClick(event);
              },
            },
            {
              key: `${data?.id}-0`,
              label: "In Active",
              onClick: (event: any) => {
                // Prevent row click
                handleMenuClick(event);
              },
            },
          ];
        }

        if (data.status === "Deleted") {
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

  useEffect(() => {
    (async () => {
      await fetchMembers(activeTabs);
    })();
  }, [activeTabs]);

  const fetchMembers = async (type: string) => {
    setLoading(true);
    await axios
      .get(`/api/users?user=${type}`)
      .then((res: any) => {
        const filterData = res?.data?.map((el: any, idx: number) => ({
          id: el.id,
          slno: idx + 1,
          fname: el?.firstName ?? "--",
          lname: el?.lastName ?? "--",
          email: el?.email ?? "--",
          status:
            el?.status === 1
              ? "Active"
              : el?.status === 2
              ? "Deleted"
              : "InActive",
        }));
        setRowData(filterData);
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

  const handleMenuClick = (e: any) => {
    setActionId(e?.key);
  };

  const handleSubmit = () => {
    setShowUserModal(false);
    if (activeTabs === UserTypesEnum.manager) {
      fetchMembers(activeTabs);
    }
  };

  const onConfirm = async (userId: number, status: number) => {
    setActionId(null);
    const body = {
      status: status,
    };
    await axios
      .patch(`/api/users?id=${userId}`, body)
      .then((res: any) => {
        fetchMembers(activeTabs);
        openNotification({
          type: "success",
          message: res?.data?.message ?? "Status Updated",
          placement: "topRight",
        });
      })
      .catch((err: any) => {
        openNotification({
          type: "error",
          message: err?.response?.data?.message ?? "Something went wrong",
          placement: "topRight",
        });
      });
  };

  return (
    <section>
      {contextHolder}
      <div className={styles.headerWrapper}>
        <div className={styles.actionContentWrapper}>
          <div className={styles.createUser}>
            <button type="button" onClick={() => setShowUserModal(true)}>
              <UserAddOutlined />
              Create Manager
            </button>
          </div>
          <div className={styles.actionFlex}>
            <button
              type="button"
              className={
                activeTabs === UserTypesEnum.customer ? `${styles.active}` : ""
              }
              onClick={() => {
                setActiveTabs(UserTypesEnum.customer);
              }}
            >
              Customers
            </button>
            <button
              type="button"
              className={
                activeTabs === UserTypesEnum.manager ? `${styles.active}` : ""
              }
              onClick={() => {
                setActiveTabs(UserTypesEnum.manager);
              }}
            >
              Managers
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

      {showUserModal && (
        <CreateUserModal
          onClose={() => setShowUserModal(false)}
          onSubmit={handleSubmit}
          open={showUserModal}
          openNotification={openNotification}
          userType={UserTypesEnum.manager}
        />
      )}
      {actionId && (
        <ComfirmationModal
          onClose={() => setActionId(null)}
          open={actionId ? true : false}
          onConfirm={onConfirm}
          value={actionId}
        />
      )}
    </section>
  );
};

export default UserListPage;
