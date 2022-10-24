import React, { useState, useEffect} from "react";
import { BillInterface } from "../interfaces/IBill";

import {GetBills} from "../services/HttpClientService";


import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

function Bills() {
    const [bills, setBills] = useState<BillInterface[]>([]);

    useEffect(() => {
        getBills();
    }, []);
    
    const getBills = async () => {
        let res = await GetBills();
        if (res) {
            setBills(res);
            console.log(res)
        }
    };

    const columns: GridColDef[] = [
        { field: "ID", headerName: "ลำดับ", width: 50},
      //  { field: "User", headerName: "ชื่อสมาชิก", width: 250, valueFormatter: (params) => params.value.User},
      //  { field: "Book", headerName: "ชื่อหนังสือ", width: 250, valueFormatter: (params) => params.value.Book},
      //  { field: "Member", headerName: "สิทธิ์", width: 250, valueFormatter: (params) => params.value.Member},
      //  { field: "Employee", headerName: "พนังงาน", width: 250, valueFormatter: (params) => params.value.Employee},
      { field: "Book", headerName: "ไอดีหนังสือ", width: 150, valueFormatter: (params) => params.value.Name},
        { field: "Price", headerName: "ราคา", width: 250, valueFormatter: (params) => params.value.Price},
        { field: "Discount", headerName: "ส่วนลด", width: 250, valueFormatter: (params) => params.value.Discount},
        { field: "Total", headerName: "ราคารวม", width: 250, valueFormatter: (params) => params.value.Total},        
        { field: "User", headerName: "ชื่อสมาชิก", width: 250, valueFormatter: (params) => params.value.FirstName},
        { field: "MemberClass", headerName: "ชื่อสิทธิ์", width: 250, valueFormatter: (params) => params.value.Name},
        { field: "Employee", headerName: "ไอดีพนักงาน", width: 150, valueFormatter: (params) => params.value.FirstName},
        { field: "BillTime", headerName: "วันที่และเวลา", width: 250 },  
        
      

    ];
    return(
        <div>
          <Container maxWidth="md">
            <Box
              display="flex"
              sx={{
                marginTop: 2,
              }}
            >
              <Box flexGrow={1}>
                <Typography
                  component="h2"
                  variant="h6"
                  color="primary"
                  gutterBottom
                >
                  ใบแจ้งค่าใช้จ่าย
                </Typography>
              </Box>
              <Box>
                <Button
                  component={RouterLink}
                  to="/createbills"
                  variant="contained"
                  color="primary"
                >
                  สร้างใบแจ้งค่าใช้จ่าย
                </Button>
              </Box>
            </Box>
            <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
              <DataGrid
                rows={bills}
                getRowId={(row) => row.ID}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
              />
            </div>
          </Container>
        </div>
      );
    }
export default Bills;    
    