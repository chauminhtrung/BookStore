import React from "react";
import { useEffect } from "react";
import NavAdmin from "../../AdminLayout/NavAdmin";
import HeaderAdmin from "../../AdminLayout/HeaderAdmin";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import Paper from "@mui/material/Paper";

// Định nghĩa kiểu cho props
interface ManagaerBookProps {
  setIsAdmin: (isAdmin: boolean) => void; // Hàm thay đổi trạng thái admin
}

const columns: GridColDef[] = [
  { field: "BookID", headerName: "Book ID", width: 100 },
  { field: "Title", headerName: "Title", width: 200 },
  { field: "AuthorID", headerName: "Author ID", width: 120 },
  { field: "Genre", headerName: "Genre", width: 150 },
  {
    field: "PublicationDate",
    headerName: "Publication Date",
    type: "string",
    width: 160,
  },
  { field: "Price", headerName: "Price", type: "number", width: 100 },
  { field: "Description", headerName: "Description", width: 250 },
  {
    field: "StockQuantity",
    headerName: "Stock Quantity",
    type: "number",
    width: 150,
  },
  { field: "ImageURL", headerName: "Image URL", width: 200 },
  { field: "Publisher", headerName: "Publisher", width: 150 },
  { field: "ISBN", headerName: "ISBN", width: 150 },
  { field: "SupplierID", headerName: "Supplier ID", width: 130 },
];

const rows = [
  {
    id: 1,
    BookID: 101,
    Title: "The Great Gatsby",
    AuthorID: 501,
    Genre: "Fiction",
    PublicationDate: "1925-04-10",
    Price: 15.99,
    Description:
      "A novel set in the Jazz Age that explores themes of wealth, society, and the American Dream.",
    StockQuantity: 120,
    ImageURL: "https://example.com/gatsby.jpg",
    Publisher: "Scribner",
    ISBN: "9780743273565",
    SupplierID: 301,
  },
  {
    id: 2,
    BookID: 102,
    Title: "1984",
    AuthorID: 502,
    Genre: "Dystopian",
    PublicationDate: "1949-06-08",
    Price: 12.99,
    Description:
      "A dystopian novel that delves into the dangers of totalitarianism and extreme political ideology.",
    StockQuantity: 200,
    ImageURL: "https://example.com/1984.jpg",
    Publisher: "Secker & Warburg",
    ISBN: "9780451524935",
    SupplierID: 302,
  },
];

const paginationModel = { page: 0, pageSize: 5 };

export const ManagaerBook: React.FC<ManagaerBookProps> = ({ setIsAdmin }) => {
  useEffect(() => {
    setIsAdmin(true);
  }, []);

  return (
    <div>
      <HeaderAdmin namQuanLy="Sách" />
      <div className="row">
        <div className="col-2">
          <div className="nav-admin">
            <NavAdmin setIsAdmin={setIsAdmin} />
          </div>
        </div>
        <div className="col-10">
          <Paper sx={{ height: 690, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{ pagination: { paginationModel } }}
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
