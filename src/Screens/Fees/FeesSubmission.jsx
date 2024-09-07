import React, { useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material'

const FeesSubmission = () => {

  const [card, setCard] = useState('');

  const handleChange = (event) => {
    setCard(event.target.value);
  };

  return (
    <div className="App">
    <Navbar/> 
   <div className="main_display">
   <Sidebar/>
   <div className="Content">
    <Paper elevation={3} sx={{maxWidth: 600, display: 'flex', flexDirection: 'column', gap: 3, padding: '20px 30px', margin: '0 auto'}}>
    <p className="Form-heading" style={{ marginBottom: 70 }}> Payment for</p>
    <TextField color='success' id="outlined-basic" label="Name*" variant="outlined" />
    <TextField id="outlined-basic" label="Class*" variant="outlined" disabled/>
    <TextField id="outlined-basic" label="Amount*" variant="outlined" disabled/>
    <FormControl fullWidth color='success'>
  <InputLabel id="demo-simple-select-label">Payment Method</InputLabel>
  <Select
  value={card}
  label="Card"
  onChange={handleChange}
  labelId="demo-simple-select-label"
  >
    <MenuItem value={10}>Credit Card</MenuItem>
    <MenuItem value={20}>Debit Card</MenuItem>
    <MenuItem value={30}>Net Banking</MenuItem>
    <MenuItem value={40}>UPI</MenuItem>
  </Select>
</FormControl>
<Button sx={{backgroundColor: '#008000'}} variant='contained'>Submit Payment</Button>
    </Paper>
   </div>
   </div>
</div>
  )
}

export default FeesSubmission
