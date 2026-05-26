// Shared nav + auth check
async function initPage(activePage) {
  const res = await fetch('/api/auth/me');
  if (!res.ok) { window.location.href = '/pages/login.html'; return null; }
  const { user } = await res.json();

  // Fetch upcoming reminders for bell badge
  const remRes = await fetch('/api/reminders/upcoming');
  const reminders = remRes.ok ? await remRes.json() : [];
  const badge = reminders.length > 0 ? `<span class="bell-badge">${reminders.length}</span>` : '';

  document.body.insertAdjacentHTML('afterbegin', `
    <nav class="navbar">
      <span class="nav-brand">InternTrack</span>
      <ul class="nav-links">
        <li><a href="dashboard.html" class="${activePage === 'dashboard' ? 'active' : ''}">Dashboard</a></li>
        <li><a href="applications.html" class="${activePage === 'applications' ? 'active' : ''}">Applications</a></li>
        <li><a href="reviews.html" class="${activePage === 'reviews' ? 'active' : ''}">Reviews</a></li>
        <li><a href="reminders.html" class="${activePage === 'reminders' ? 'active' : ''}" style="position:relative">Reminders${badge}</a></li>
      </ul>
      <div class="nav-right">
        <a href="profile.html" class="nav-avatar" title="Profile">${user.name.charAt(0).toUpperCase()}</a>
        <a href="/api/auth/logout" class="btn btn-ghost" style="padding:7px 14px">Logout</a>
      </div>
    </nav>
  `);
  return user;
}

function showToast(msg, type = 'success') {
  let t = document.getElementById('toast');
  if (!t) { t = document.createElement('div'); t.id = 'toast'; t.className = 'toast'; document.body.appendChild(t); }
  t.textContent = msg;
  t.className = `toast ${type} show`;
  setTimeout(() => t.classList.remove('show'), 3000);
}

function getBadge(status) {
  const map = { Applied: 'applied', Interview: 'interview', Offer: 'offer', Rejected: 'rejected' };
  return `<span class="badge badge-${map[status]}">${status}</span>`;
}
