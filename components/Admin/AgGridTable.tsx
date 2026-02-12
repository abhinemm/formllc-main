"use client";

import React from "react";
import { AgGridReact } from "ag-grid-react";
import {
  AllCommunityModule,
  ModuleRegistry,
  themeQuartz,
  RowClickedEvent,
} from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);

type IAgGridTable = {
  rowData: any;
  columnDefs: any;
  onRowClick?: any;
  loading?: boolean;
};

type RowData = {
  slno: number;
  registrationState: string;
  type: string;
  ownerAndCompany: string;
  companyEmail: string;
  companyName: string;
};
const myTheme = themeQuartz.withParams({
  accentColor: "#15BDE8",
  backgroundColor: "#0C0C0D",
  borderColor: "#ffffff00",
  borderRadius: 20,
  browserColorScheme: "dark",
  cellHorizontalPaddingScale: 1,
  chromeBackgroundColor: {
    ref: "backgroundColor",
  },
  columnBorder: false,
  fontFamily: {
    googleFont: "Roboto",
  },
  fontSize: 16,
  foregroundColor: "#BBBEC9",
  headerBackgroundColor: "#182226",
  headerFontSize: 14,
  headerFontWeight: 500,
  headerTextColor: "#FFFFFF",
  headerVerticalPaddingScale: 0.9,
  iconSize: 20,
  rowBorder: false,
  rowVerticalPaddingScale: 1.2,
  sidePanelBorder: false,
  spacing: 8,
  wrapperBorder: false,
  wrapperBorderRadius: 0,
});

const AgGridTable: React.FC<IAgGridTable> = ({
  rowData = [],
  columnDefs = [],
  onRowClick,
  loading,
}) => {
  return (
    <div
      style={{
        height: 600,
        width: "100%",
      }}
    >
      <AgGridReact<RowData>
        rowData={rowData}
        columnDefs={columnDefs}
        rowModelType="clientSide"
        theme={myTheme}
        pagination={true}
        paginationPageSize={10}
        paginationPageSizeSelector={[10, 25, 50, 100, 200]}
        loading={loading ? true : false}
        onCellClicked={(params: any) => {
          if (params.column?.colId === "action") {
            params.event.stopPropagation();
          } else {
            const rowDetails = params.data; // Access the row's data
            onRowClick(rowDetails);
          }
        }}
      />
    </div>
  );
};

export default AgGridTable;
