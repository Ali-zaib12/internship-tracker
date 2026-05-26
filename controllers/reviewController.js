const db = require('../config/db');

exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT r.*, u.name as author FROM reviews r 
       JOIN users u ON r.user_id = u.id 
       ORDER BY r.created_at DESC`
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.create = async (req, res) => {
  const { company, rating, title, body, would_recommend } = req.body;
  try {
    await db.query(
      'INSERT INTO reviews (user_id, company, rating, title, body, would_recommend) VALUES (?, ?, ?, ?, ?, ?)',
      [req.user.id, company, rating, title, body, would_recommend]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.remove = async (req, res) => {
  try {
    await db.query('DELETE FROM reviews WHERE id = ? AND user_id = ?', [req.params.id, req.user.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
