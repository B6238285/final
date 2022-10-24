import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { UsersInterface } from "../interfaces/IUser";
import { BookInterface } from "../interfaces/IBook";
import { MemberClassesInterface } from "../interfaces/IMemberClass";
import { GetBook, GetUsers, GetMemberClasses, Bills, GetuserByrole} from "../services/HttpClientService";
import { BillInterface } from "../interfaces/IBill";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Box, Container } from "@mui/system";
import { Divider, FormControl, Grid, Paper, Snackbar, Typography } from "@mui/material";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});





function BillCreate(){
  /*   const [getp, Setgetp] = useState<Partial<UsersInterface>>({ID:0}); */
   // const [userMemberClass, SetuserMemberClass] = useState<UsersInterface[]>([]);
  //  const [employees, setEmployees] = useState<EmployeesInterface[]>([]);
    const [users, setUsers] = useState<UsersInterface[]>([]);
    const [books, setBooks] = useState<BookInterface[]>([]);
    const [memberclasses, setMemberClasses] = useState<MemberClassesInterface[]>([]);
    const [bill, setBill] = useState<Partial<BillInterface>>({
        BillTime: new Date(),
    });


    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    
    /* const apiUrl = "http://localhost:8080";
    
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    }; */
    
   /*  const getformember = async () => { 
      console.log(getp.ID)
      fetch(`${apiUrl}/select/user/get/member/`+ getp.ID, requestOptions)
        .then((response) => response.json())
        .then((res) => {
          if (res.data) {
            SetuserMemberClass(res.data);
            console.log(res.data);
        } else { 
           console.log(res.error);
    }
    });
    
    } */

   /*  const handleUser= (event: SelectChangeEvent) => {
      const name = event.target.name as keyof typeof getp;
      Setgetp({...getp, [name]: event.target.value, });
      setBill({
          MemberClassID:0,
          BillTime: new Date(),
      });
      getformember()
  }; */
    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
      ) => {
        if (reason === "clickaway") {
          return;
        }
        setSuccess(false);
        setError(false);
      };

      const handleChange = (event: SelectChangeEvent) => {
        console.log(event.target.name);
        console.log(event.target.value);
    
        
        const name = event.target.name as keyof typeof bill;
        setBill({
          ...bill,
          [name]: event.target.value,
        });
      };
      

      const getUsers = async () => {
        let res = await GetuserByrole();
        if(res) {
          setUsers(res);
        }
      };
      const getMemberClasses = async () => {
        let res = await GetMemberClasses();
        if(res) {
          setMemberClasses(res);
        }
      };

      const getBooks = async () => {
        let res = await GetBook();
        if(res) {
          setBooks(res);
        }
      };

      useEffect(() => {
        //getEmployees();
        getUsers();
        getMemberClasses();
        getBooks();
      }, []);

      const convertType = (data: string | number | undefined) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
      };

      async function submit() {
        let data = {
          EmployeeID: convertType(localStorage.getItem("id") as string),
          BookID: convertType(bill.BookID),
          UserID: convertType(bill.UserID),
          MemberClassID: convertType(bill.MemberClassID),
          BillTime: bill.BillTime,
          
        
  
        };

        let res = await Bills(data);
        if (res) {
          setSuccess(true);
        } else {
          setError(true);
        }
        console.log(data);
      }
      

      return(
        <Container maxWidth="md">
          <Snackbar
            open={success}
            autoHideDuration={3000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}>
            <Alert 
              onClose={handleClose} severity="success">บันทึกข้อมูลสำเร็จ
            </Alert>
          </Snackbar>

          <Snackbar 
            open={error}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}>
            <Alert 
              onClose={handleClose} severity="error">บันทึกข้อมูลไม่สำเร็จ สิทธิ์ไม่ถูกต้อง
            </Alert>
          </Snackbar>

          <Paper>
            <Box display="flex" sx={{marginTop: 2, }}>  
              <Box sx={{ paddingX: 2, paddingY: 1 }}>
                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                บันทึกการขายหนังสือ
                </Typography>
              </Box>       
            </Box>
            <Divider>
              <Grid container spacing={3} sx={{ padding: 2 }}>
                
                {/* <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <p>ชื่อสมาชิก</p>
                    <Select native value={getp.ID + ""} onChange={handleUser} inputProps={{name: "ID", }}>
                      <option aria-label="None" value="0">
                        เลือกสมาชิก
                      </option>
                      {users.map((item: UsersInterface) => (
                        <option value={item.ID} key={item.ID}>
                          {item.FirstName}
                        </option>
                      ))
                      }
                    </Select>
                  </FormControl>
                </Grid> */} {/* ของอนัน */}
                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <p>ชื่อสมาชิก</p>
                    <Select native value={bill.UserID + ""} onChange={handleChange} inputProps={{name: "UserID", }}>
                      <option aria-label="None" value="0">
                        เลือกสมาชิก
                      </option>
                      {users.map((item: UsersInterface) => (
                        <option value={item.ID} key={item.ID}>
                          {item.FirstName}
                        </option>
                      ))
                      }
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <p>ชื่อหนังสือ</p>
                    <Select native value={bill.BookID + ""} onChange={handleChange} inputProps={{name: "BookID", }}>
                      <option aria-label="None" value="">
                        เลือกหนังสือ
                      </option>
                      {books.map((item: BookInterface) => (
                        <option value={item.ID} key={item.ID}>
                          {item.Name}
                        </option>
                      ))
                      }
                    </Select>
                  </FormControl>
                </Grid>

               {/* <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <p>สิทธิ์</p>
                    <Select native value={bill.MemberClassID + ""} onChange={handleChange} inputProps={{name: "MemberClassID", }}>
                      <option aria-label="None" value="">
                        เลือกสิทธิ์
                      </option>
                      {users.map((item: UsersInterface) => (
                        <option value={item.MemberClassID} key={item.MemberClassID}>
                          {item.MemberClass?.Name}
                        </option>
                      ))
                      }
                    </Select>
                  </FormControl>
                </Grid> */}
                   
                  <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <p>สิทธิ์</p>
                    <Select native value={bill.MemberClassID + ""} onChange={handleChange} inputProps={{name: "MemberClassID", }}>
                    <option aria-label="None" value="">
                        เลือกสิทธิ์
                      </option>
                      {memberclasses.map((item: MemberClassesInterface) => (
                        <option value={item.ID} key={item.ID}>
                          {item.Name}
                        </option>
                      ))
                      }
                    </Select>
                  </FormControl>
                </Grid>  

                {/* <Grid item xs={6}>
                  <FormControl fullWidth variant="outlined">
                    <p>พนักงงาน</p>
                    <Select native value={bill.EmployeeID + ""} onChange={handleChange} inputProps={{name: "EmployeeID", }}>
                      <option aria-label="None" value="">
                        เลือกพนังงาน
                      </option>
                      {employees.map((item: EmployeesInterface) => (
                        <option value={item.ID} key={item.ID}>
                          {item.Name}
                        </option>
                      ))
                      }
                    </Select>
                  </FormControl>
                </Grid> */}

                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <p>วันที่และเวลา</p>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        value={bill.BillTime}
                        onChange={(newValue) => {
                          setBill({
                            ...bill,
                            BillTime: newValue,
                          });
                        }}
                        renderInput={(params) => <TextField {...params} />}/>
                    </LocalizationProvider>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Button component={RouterLink} to="/bills" variant="contained" color="inherit">
                    กลับ
                  </Button>
                  <Button style={{ float: "right" }} onClick={submit} variant="contained" color="primary">
                    บันทึก
                  </Button>
                </Grid>

                

                



              </Grid>
            </Divider>
          </Paper> 

        </Container>
      )



}
export default BillCreate;
