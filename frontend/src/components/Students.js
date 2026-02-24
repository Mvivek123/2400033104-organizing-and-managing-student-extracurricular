import React, { useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Button, TextField } from '@mui/material';

export default function Students() {
  const [students, setStudents] = useState([
    { name: 'Alice', club: 'Art Club' },
    { name: 'Bob', club: 'Coding Circle' },
  ]);
  const [newStudent, setNewStudent] = useState({ name: '', club: '' });

  const addStudent = () => {
    if (newStudent.name.trim() && newStudent.club.trim()) {
      setStudents([...students, { ...newStudent }]);
      setNewStudent({ name: '', club: '' });
    }
  };

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>
        Student Management
      </Typography>
      <Box display="flex" mb={2} gap={1}>
        <TextField
          label="Student Name"
          value={newStudent.name}
          onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
          size="small"
        />
        <TextField
          label="Club"
          value={newStudent.club}
          onChange={(e) => setNewStudent({ ...newStudent, club: e.target.value })}
          size="small"
        />
        <Button variant="contained" onClick={addStudent}>
          Add
        </Button>
      </Box>
      <List>
        {students.map((stu, idx) => (
          <ListItem key={idx} divider>
            <ListItemText primary={stu.name} secondary={stu.club} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}