import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
//import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
//import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
//import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { ProvincesInterface } from "../interfaces/IProvince"; //Playlist --> Province
import { RolesInterface } from "../interfaces/IRole"; //Reso --> Role
import { UsersInterface } from "../interfaces/IUser";

import {
  GetProvinces,
  GetRoles,
  CreateUsers,
} from "../services/HttpClientService";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function UserCreate() {
  const [provinces, setProvinces] = React.useState<ProvincesInterface[]>([]);
  const [roles, setRoles] = useState<RolesInterface[]>([]);
  const [user, setUser] = useState<Partial<UsersInterface>>();

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

   //เปิดปิดตัว alert
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
    //combobox
    const handleChange = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof UserCreate;
    setUser({
      ...user,
      [name]: event.target.value,
    });
  };

  //text field
  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof user;
    const { value } = event.target;
    setUser({ ...user, [id]: value });
  };
  
  const getProvinces = async () => {
    let res = await GetProvinces();
    if (res) {
      setProvinces(res);
    }
  };

  const getRoles = async () => {
    let res = await GetRoles();
    if (res) {
      setRoles(res);
    }
  };


  useEffect(() => {
    getProvinces();
    getRoles();
  }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };


  
  async function submit() {
    let data = {
      MemberClassID: 1,
      ProvinceID: convertType(user?.ProvinceID),
      RoleID: convertType(user?.RoleID),
      Pin: user?.Pin,
      FirstName: user?.FirstName,
      LastName: user?.LastName,
      Civ: user?.Civ,
      Phone: user?.Phone,
      Email: user?.Email,
      Password: user?.Civ,
      Address: user?.Address,
    };
    console.log(data);

    let res = await CreateUsers(data);
    if (res) {
      setSuccess(true);
    } else {
      setError(true);
    }
  }

  return (
    <Container maxWidth="md">
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success">
          บันทึกข้อมูลสำเร็จ
        </Alert>
      </Snackbar>
      <Snackbar
        open={error}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error">
          บันทึกข้อมูลไม่สำเร็จ
        </Alert>
      </Snackbar>
      <Paper>
        <Box
          display="flex"
          sx={{
            marginTop: 2,
          }}
        >
          <Box sx={{ paddingX: 2, paddingY: 1 }}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              ลงทะเบียนสมาชิก
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Grid container spacing={3} sx={{ padding: 2 }}>

        <Grid item xs={6}>
            <p>ชื่อ</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="FirstName"
                variant="outlined"
                type="string"
                size="medium"
                placeholder="กรุณากรอกชื่อ"
                value={user?.FirstName || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <p>นามสกุล</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="LastName"
                variant="outlined"
                type="string"
                size="medium"
                placeholder="กรุณากรอกนามสกุล"
                value={user?.LastName || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <p>รหัสนักศึกษา/อาจารย์</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="Pin"
                variant="outlined"
                type="string"
                size="medium"
                placeholder="กรุณากรอกชื่อรหัสนักศึกษา/อาจารย์"
                value={user?.Pin || ""}
                onChange={handleInputChange}
                inputProps={{maxLength :7}}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <p>เลขบัตรประชาชน</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="Civ"
                variant="outlined"
                type="string"
                size="medium"
                placeholder="กรุณากรอกเลขบัตรประชาชน"
                value={user?.Civ || ""}
                onChange={handleInputChange}
                onKeyPress={(e) => {
                  if (!/[0-9]/.test(e.key)){
                    e.preventDefault()
                  }
                }}
                inputProps={{maxLength :13}}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <p>เบอร์โทรศัพท์</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="Phone"
                variant="outlined"
                type="string"
                size="medium"
                placeholder="กรุณากรอกเบอร์โทรศัพท์"
                value={user?.Phone || ""}
                onChange={handleInputChange}
                onKeyPress={(e) => {
                  if (!/[0-9]/.test(e.key)){
                    e.preventDefault()
                  }
                }}
                inputProps={{maxLength :10}}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <p>อีเมลล์</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="Email"
                variant="outlined"
                type="string"
                size="medium"
                placeholder="กรุณากรอกอีเมลล์"
                value={user?.Email || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <p>ที่อยู่</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="Address"
                variant="outlined"
                type="string"
                size="medium"
                placeholder="กรุณากรอกที่อยู่"
                value={user?.Address || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>จังหวัด</p>
              <Select
                native
                value={user?.ProvinceID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "ProvinceID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกจังหวัด
                </option>
                {provinces.map((item: ProvincesInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>บทบาท</p>
              <Select
                native
                value={user?.RoleID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "RoleID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกบทบาท
                </option>
                {roles.map((item: RolesInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Button
              component={RouterLink}
              to="/users"
              variant="contained"
              color="inherit"
            >
              กลับ
            </Button>
            <Button
              style={{ float: "right" }}
              onClick={submit}
              variant="contained"
              color="primary"
            >
              บันทึก
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default UserCreate;