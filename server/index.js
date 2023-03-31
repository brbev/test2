const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 3001;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'school-management-app',
  password: 'admin',
  port: 5432,
});

app.use(cors());
app.use(express.json());

app.post('/api/attendance', async (req, res) => {
  try {
    const { date, students } = req.body;

    const client = await pool.connect();

    await client.query('BEGIN');

    const attendanceInsertQuery = `
      INSERT INTO attendance (date, student_id, present)
      VALUES ($1, $2, $3)
      ON CONFLICT (date, student_id) DO UPDATE SET present = excluded.present;
    `;

    for (const student of students) {
      await client.query(attendanceInsertQuery, [date, student.id, student.present]);
    }

    await client.query('COMMIT');

    res.status(200).send({ message: 'Attendance data saved successfully.' });
  } catch (error) {
    console.error('Error saving attendance data:', error);
    res.status(500).send({ message: 'Error saving attendance data.' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
