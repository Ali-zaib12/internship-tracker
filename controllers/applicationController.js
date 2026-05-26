const db = require('../config/db');

exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM applications WHERE user_id = ? ORDER BY created_at DESC',
      [req.user.id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getOne = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM applications WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.create = async (req, res) => {
  const { company, role, location, status, applied_date, notes } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO applications (user_id, company, role, location, status, applied_date, notes) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [req.user.id, company, role, location, status || 'Applied', applied_date, notes]
    );
    res.json({ success: true, id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.update = async (req, res) => {
  const { company, role, location, status, applied_date, notes } = req.body;
  try {
    await db.query(
      'UPDATE applications SET company=?, role=?, location=?, status=?, applied_date=?, notes=? WHERE id=? AND user_id=?',
      [company, role, location, status, applied_date, notes, req.params.id, req.user.id]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.remove = async (req, res) => {
  try {
    await db.query('DELETE FROM applications WHERE id = ? AND user_id = ?', [req.params.id, req.user.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.stats = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT 
        COUNT(*) as total,
        SUM(status = 'Applied') as applied,
        SUM(status = 'Interview') as interviews,
        SUM(status = 'Offer') as offers,
        SUM(status = 'Rejected') as rejected
      FROM applications WHERE user_id = ?`,
      [req.user.id]
    );
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
