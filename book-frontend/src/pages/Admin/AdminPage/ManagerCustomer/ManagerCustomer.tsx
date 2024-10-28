import React from "react";
import { useEffect } from "react";
import NavAdmin from "../../AdminLayout/NavAdmin";
import HeaderAdmin from "../../AdminLayout/HeaderAdmin";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import Paper from "@mui/material/Paper";

// Định nghĩa kiểu cho props
interface ManagaerCustomerProps {
  setIsAdmin: (isAdmin: boolean) => void; // Hàm thay đổi trạng thái admin
}

const columns: GridColDef[] = [
  { field: "CustomerID", headerName: "Customer ID", width: 120 },
  { field: "Name", headerName: "Name", width: 200 },
  { field: "Email", headerName: "Email", width: 250 },
  { field: "PhoneNumber", headerName: "Phone Number", width: 150 },
  { field: "Address", headerName: "Address", width: 250 },
  {
    field: "PasswordHash",
    headerName: "Password Hash",
    width: 250,
  }, // Ẩn cột PasswordHash
];

const rows = [
  {
    id: 1,
    CustomerID: 201,
    Name: "John Doe",
    Email: "john.doe@example.com",
    PhoneNumber: "123-456-7890",
    Address: "123 Main St, Springfield, USA",
    PasswordHash: "hashed_password_1",
  },
  {
    id: 2,
    CustomerID: 202,
    Name: "Jane Smith",
    Email: "jane.smith@example.com",
    PhoneNumber: "987-654-3210",
    Address: "456 Elm St, Springfield, USA",
    PasswordHash: "hashed_password_2",
  },
];

const gridOptions = {
  columns: columns,
  rows: rows,
  columnVisibilityModel: {
    PasswordHash: false, // Ẩn cột PasswordHash
  },
};

const paginationModel = { page: 0, pageSize: 5 };

export const ManagaerCustomer: React.FC<ManagaerCustomerProps> = ({
  setIsAdmin,
}) => {
  useEffect(() => {
    setIsAdmin(true);
  }, []);

  return (
    <div>
      <HeaderAdmin namQuanLy="Tài khoản" />
      <div className="row">
        <div className="col-2">
          <div className="nav-admin">
            <NavAdmin setIsAdmin={setIsAdmin} />
          </div>
        </div>
        <div className="col-10">
          <Paper sx={{ height: 690, width: "100%" }}>
            <DataGrid
              rows={gridOptions.rows}
              columns={gridOptions.columns}
              initialState={{ pagination: { paginationModel } }}
              //neu muon an cot pass thi mo len
              //columnVisibilityModel={gridOptions.columnVisibilityModel}
              pageSizeOptions={[5, 10]}
              checkboxSelection
              sx={{ border: 0 }}
            />
          </Paper>
        </div>
      </div>
    </div>
  );
};
