// ─── DATA ──────────────────────────────────────────────────────────
const USERS = [
  {
    id: 1,
    name: "Sarah Mitchell",
    email: "s.mitchell@acmecorp.com",
    dept: "Emergency Response",
    role: "Instructor",
    status: "certified",
    completion: 97,
    expiry: "Aug 2026",
    avatar: "SM",
    acolor: "avatar-colors",
  },
  {
    id: 2,
    name: "James Kim",
    email: "j.kim@acmecorp.com",
    dept: "Healthcare Ops",
    role: "Employee",
    status: "expiring",
    completion: 82,
    expiry: "Jun 2025",
    avatar: "JK",
    acolor: "avatar-colors-2",
  },
  {
    id: 3,
    name: "Lisa Roberts",
    email: "l.roberts@nwhealth.com",
    dept: "Corporate Training",
    role: "Manager",
    status: "expired",
    completion: 58,
    expiry: "Feb 2025",
    avatar: "LR",
    acolor: "",
  },
  {
    id: 4,
    name: "Tom Anderson",
    email: "t.anderson@nwhealth.com",
    dept: "Field Services",
    role: "Employee",
    status: "certified",
    completion: 91,
    expiry: "Mar 2027",
    avatar: "TA",
    acolor: "avatar-colors-3",
  },
  {
    id: 5,
    name: "Nina Patel",
    email: "n.patel@acmecorp.com",
    dept: "Healthcare Ops",
    role: "Instructor",
    status: "certified",
    completion: 100,
    expiry: "Dec 2026",
    avatar: "NP",
    acolor: "avatar-colors-4",
  },
  {
    id: 6,
    name: "Chris Wang",
    email: "c.wang@acmecorp.com",
    dept: "Emergency Response",
    role: "Admin",
    status: "certified",
    completion: 88,
    expiry: "Nov 2026",
    avatar: "CW",
    acolor: "",
  },
  {
    id: 7,
    name: "Emma Clarke",
    email: "e.clarke@techstart.io",
    dept: "Corporate Training",
    role: "Employee",
    status: "pending",
    completion: 34,
    expiry: "—",
    avatar: "EC",
    acolor: "avatar-colors",
  },
  {
    id: 8,
    name: "David Park",
    email: "d.park@techstart.io",
    dept: "Field Services",
    role: "Employee",
    status: "expiring",
    completion: 76,
    expiry: "Jul 2025",
    avatar: "DP",
    acolor: "avatar-colors-2",
  },
  {
    id: 9,
    name: "Rachel Foster",
    email: "r.foster@nwhealth.com",
    dept: "Healthcare Ops",
    role: "Manager",
    status: "certified",
    completion: 95,
    expiry: "Jan 2027",
    avatar: "RF",
    acolor: "avatar-colors-3",
  },
  {
    id: 10,
    name: "Mike Torres",
    email: "m.torres@acmecorp.com",
    dept: "Emergency Response",
    role: "Instructor",
    status: "expired",
    completion: 0,
    expiry: "Jan 2025",
    avatar: "MT",
    acolor: "avatar-colors-4",
  },
  {
    id: 11,
    name: "Amy Johnson",
    email: "a.johnson@techstart.io",
    dept: "Corporate Training",
    role: "Employee",
    status: "certified",
    completion: 79,
    expiry: "Sep 2026",
    avatar: "AJ",
    acolor: "",
  },
  {
    id: 12,
    name: "Ben Carter",
    email: "b.carter@nwhealth.com",
    dept: "Field Services",
    role: "Employee",
    status: "pending",
    completion: 22,
    expiry: "—",
    avatar: "BC",
    acolor: "avatar-colors",
  },
];

const STATUS_MAP = {
  certified: { label: "Certified", cls: "badge-green" },
  expiring: { label: "Expiring Soon", cls: "badge-amber" },
  expired: { label: "Expired", cls: "badge-red" },
  pending: { label: "Pending", cls: "badge-gray" },
};

const ROLE_COLORS = {
  Admin: "badge-purple",
  Instructor: "badge-teal",
  Manager: "badge-blue",
  Employee: "badge-gray",
};

// ─── NAVIGATION ────────────────────────────────────────────────────
let currentPage = "dashboard";

function navigate(page, el) {
  document
    .querySelectorAll(".nav-item")
    .forEach((n) => n.classList.remove("active"));
  el.classList.add("active");
  document
    .querySelectorAll(".page")
    .forEach((p) => p.classList.remove("active"));
  document.getElementById("page-" + page).classList.add("active");

  const titles = {
    dashboard: ["Dashboard", "/ Overview"],
    users: ["Users", "/ Management"],
  };
  document.getElementById("topbar-title").innerHTML =
    `${titles[page][0]} <span>${titles[page][1]}</span>`;
  currentPage = page;

  if (page === "users") renderUsers();
}

// ─── NOTIFICATIONS ──────────────────────────────────────────────────
function toggleNotifPanel() {
  document.getElementById("notif-panel").classList.toggle("open");
}

// ─── TOAST ──────────────────────────────────────────────────────────
function showToast(msg, icon = "✅") {
  const tc = document.getElementById("toast-container");
  const t = document.createElement("div");
  t.className = "toast";
  t.innerHTML = `<span>${icon}</span>${msg}`;
  t.onclick = () => t.remove();
  tc.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}

// ─── MODAL ──────────────────────────────────────────────────────────
function openModal(user) {
  const statusBadge = STATUS_MAP[user.status];
  const barColor =
    { certified: "green", expiring: "amber", expired: "red", pending: "amber" }[
      user.status
    ] || "";
  const certs = [
    {
      icon: "🫀",
      name: "CPR-AED",
      date: user.status === "expired" ? "Expired Jan 2025" : "Expires Aug 2026",
      badge: user.status,
    },
    {
      icon: "💊",
      name: "Basic Life Support (BLS)",
      date: "Valid until Dec 2026",
      badge: "certified",
    },
    {
      icon: "🏥",
      name: "First Aid",
      date: "Valid until Mar 2027",
      badge: "certified",
    },
  ];

  document.getElementById("modal-title").textContent = user.name;
  document.getElementById("modal-subtitle").textContent =
    `${user.role} · ${user.dept}`;

  document.getElementById("modal-body").innerHTML = `
    <div class="profile-header">
      <div class="avatar xl ${user.acolor}">${user.avatar}</div>
      <div class="profile-details">
        <div class="name">${user.name}</div>
        <div class="role">${user.role} · ${user.dept}</div>
        <div class="email">${user.email}</div>
      </div>
      <div style="margin-left:auto">
        <span class="badge ${statusBadge.cls}">${statusBadge.label}</span>
      </div>
    </div>
    <div class="detail-grid">
      <div class="detail-item"><label>Department</label><div class="value">${user.dept}</div></div>
      <div class="detail-item"><label>Role</label><div class="value">${user.role}</div></div>
      <div class="detail-item"><label>Completion</label><div class="value">${user.completion}%</div></div>
      <div class="detail-item"><label>Next Renewal</label><div class="value">${user.expiry}</div></div>
    </div>
    <div class="cert-section-title">📜 Certifications</div>
    ${certs
      .map(
        (c) => `
      <div class="cert-item">
        <div class="cert-item-left">
          <div class="cert-icon">${c.icon}</div>
          <div>
            <div class="cert-name">${c.name}</div>
            <div class="cert-date">${c.date}</div>
          </div>
        </div>
        <span class="badge ${STATUS_MAP[c.badge]?.cls || "badge-gray"}">${STATUS_MAP[c.badge]?.label || "N/A"}</span>
      </div>
    `,
      )
      .join("")}
    <div style="display:flex;gap:8px;margin-top:16px">
      <button class="btn btn-primary" onclick="showToast('Sending renewal reminder...','📧');closeModal()">Send Reminder</button>
      <button class="btn btn-secondary" onclick="showToast('Editing profile...','✏️');closeModal()">Edit Profile</button>
      <button class="btn btn-ghost" onclick="showToast('Report generated','📊');closeModal()">View Report</button>
    </div>
  `;

  document.getElementById("user-modal").classList.add("open");
  setTimeout(() => {
    const bars = document.querySelectorAll("#modal-body .progress-bar");
    bars.forEach((b) => (b.style.width = b.dataset.width + "%"));
  }, 50);
}

function closeModal() {
  document.getElementById("user-modal").classList.remove("open");
}
function closeModalOnBg(e) {
  if (e.target === e.currentTarget) closeModal();
}
function openAddUser() {
  showToast("Add User form opening...", "➕");
}

// ─── USER TABLE ──────────────────────────────────────────────────────
let filteredUsers = [...USERS];
let selectedIds = new Set();

function renderUsers() {
  renderTable();
  renderGrid();
  animateProgressBars();
}

function renderTable() {
  const tbody = document.getElementById("user-tbody");
  tbody.innerHTML = filteredUsers
    .map((u) => {
      const st = STATUS_MAP[u.status];
      const barC = {
        certified: "",
        expiring: "amber",
        expired: "red",
        pending: "amber",
      }[u.status];
      const roleC = ROLE_COLORS[u.role] || "badge-gray";
      return `
      <tr onclick="openModal(${JSON.stringify(u).replace(/"/g, "'").replace(/&/g, "&amp;")})" data-id="${u.id}" class="${selectedIds.has(u.id) ? "selected" : ""}">
        <td onclick="event.stopPropagation()">
          <label class="checkbox-wrap">
            <input type="checkbox" ${selectedIds.has(u.id) ? "checked" : ""} onchange="toggleRow(${u.id},this)">
          </label>
        </td>
        <td>
          <div class="user-cell">
            <div class="avatar sm ${u.acolor}">${u.avatar}</div>
            <div class="user-cell-info">
              <div class="user-cell-name">${u.name}</div>
              <div class="user-cell-email">${u.email}</div>
            </div>
          </div>
        </td>
        <td style="color:var(--text-secondary);font-size:0.82rem">${u.dept}</td>
        <td><span class="badge ${roleC}">${u.role}</span></td>
        <td><span class="badge ${st.cls}">${st.label}</span></td>
        <td>
          <div class="cert-bar-wrap">
            <div class="cert-mini-bar"><div class="cert-mini-fill ${barC}" style="width:${u.completion}%"></div></div>
            <span style="font-size:0.78rem;font-weight:700;color:var(--text-primary);min-width:32px">${u.completion}%</span>
          </div>
        </td>
        <td style="font-size:0.82rem;color:${u.status === "expired" ? "var(--red)" : u.status === "expiring" ? "var(--amber)" : "var(--text-secondary)"}">${u.expiry}</td>
        <td onclick="event.stopPropagation()">
          <div class="action-btns">
            <button class="btn btn-secondary btn-xs" onclick="openModal(${JSON.stringify(u).replace(/"/g, "'")})">View</button>
            <button class="btn btn-ghost btn-xs" onclick="showToast('Editing ${u.name}...','✏️')">Edit</button>
            <button class="btn btn-xs" style="background:var(--red-light);color:var(--red);border:none" onclick="showToast('${u.name} removed','🗑️')">🗑</button>
          </div>
        </td>
      </tr>
    `;
    })
    .join("");
  document.getElementById("filter-count").textContent =
    `${filteredUsers.length} users`;
  document.getElementById("pagination-info").textContent =
    `Showing 1–${Math.min(12, filteredUsers.length)} of ${filteredUsers.length} employees`;
}

function renderGrid() {
  const grid = document.getElementById("grid-view");
  grid.innerHTML = filteredUsers
    .map((u) => {
      const st = STATUS_MAP[u.status];
      const barC = {
        certified: "",
        expiring: "amber",
        expired: "red",
        pending: "amber",
      }[u.status];
      return `
      <div class="user-profile-card" onclick="openModal(${JSON.stringify(u).replace(/"/g, "'")})">
        <div class="avatar lg ${u.acolor}">${u.avatar}</div>
        <div class="name">${u.name}</div>
        <div class="role-label">${u.role} · ${u.dept}</div>
        <span class="badge ${st.cls}">${st.label}</span>
        <div class="cert-mini-row"><div class="cert-mini-row-fill ${barC}" style="width:${u.completion}%"></div></div>
        <div style="font-size:0.75rem;color:var(--text-muted);margin-bottom:10px">${u.completion}% certified</div>
        <div class="card-actions">
          <button class="btn btn-secondary btn-xs" onclick="event.stopPropagation();openModal(${JSON.stringify(u).replace(/"/g, "'")})">View</button>
          <button class="btn btn-ghost btn-xs" onclick="event.stopPropagation();showToast('Editing ${u.name}...','✏️')">Edit</button>
        </div>
      </div>
    `;
    })
    .join("");
}

function filterUsers() {
  const q = document.getElementById("user-search").value.toLowerCase();
  const st = document.getElementById("filter-status").value;
  const dp = document.getElementById("filter-dept").value;
  const rl = document.getElementById("filter-role").value;
  filteredUsers = USERS.filter((u) => {
    const matchQ =
      !q ||
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.dept.toLowerCase().includes(q);
    const matchS = !st || u.status === st;
    const matchD = !dp || u.dept.includes(dp);
    const matchR = !rl || u.role === rl;
    return matchQ && matchS && matchD && matchR;
  });
  renderTable();
  renderGrid();
}

function globalSearch(val) {
  if (currentPage !== "users") return;
  document.getElementById("user-search").value = val;
  filterUsers();
}

function sortTable(field) {
  filteredUsers.sort((a, b) => {
    const av = a[field] || "";
    const bv = b[field] || "";
    return av > bv ? 1 : -1;
  });
  renderTable();
  showToast(`Sorted by ${field}`, "↕");
}

function toggleRow(id, cb) {
  if (cb.checked) selectedIds.add(id);
  else selectedIds.delete(id);
  updateSelectionUI();
  renderTable();
}

function toggleSelectAll(cb) {
  if (cb.checked) filteredUsers.forEach((u) => selectedIds.add(u.id));
  else selectedIds.clear();
  updateSelectionUI();
  renderTable();
}

function updateSelectionUI() {
  const n = selectedIds.size;
  const el = document.getElementById("selected-count");
  el.textContent = `${n} selected`;
  el.classList.toggle("visible", n > 0);
  document.getElementById("bulk-action-btn").style.display =
    n > 0 ? "" : "none";
  document.getElementById("bulk-delete-btn").style.display =
    n > 0 ? "" : "none";
}

function switchPage(btn) {
  document
    .querySelectorAll(".page-btn")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  showToast(`Page ${btn.textContent} loaded`, "📄");
}

// ─── VIEW TOGGLE ────────────────────────────────────────────────────
function setView(v) {
  const tableWrap = document.getElementById("table-view");
  const gridView = document.getElementById("grid-view");
  document
    .getElementById("view-table-btn")
    .classList.toggle("active", v === "table");
  document
    .getElementById("view-grid-btn")
    .classList.toggle("active", v === "grid");
  tableWrap.classList.toggle("hidden", v === "grid");
  gridView.classList.toggle("active", v === "grid");
}

// ─── PROGRESS BARS ──────────────────────────────────────────────────
function animateProgressBars() {
  setTimeout(() => {
    document.querySelectorAll(".progress-bar[data-width]").forEach((bar) => {
      bar.style.width = bar.dataset.width + "%";
    });
  }, 200);
}

// ─── CHART TAB ──────────────────────────────────────────────────────
function setChartTab(el, period) {
  document
    .querySelectorAll(".chart-tab")
    .forEach((t) => t.classList.remove("active"));
  el.classList.add("active");
  drawCertChart(period);
}

// ─── CHARTS ─────────────────────────────────────────────────────────
function drawCertChart(period = "monthly") {
  const canvas = document.getElementById("certChart");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const W = canvas.offsetWidth || 600;
  const H = 200;
  canvas.width = W * devicePixelRatio;
  canvas.height = H * devicePixelRatio;
  canvas.style.width = W + "px";
  canvas.style.height = H + "px";
  ctx.scale(devicePixelRatio, devicePixelRatio);
  ctx.clearRect(0, 0, W, H);

  const labels =
    period === "monthly"
      ? [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ]
      : period === "quarterly"
        ? ["Q1 2024", "Q2 2024", "Q3 2024", "Q4 2024"]
        : ["2020", "2021", "2022", "2023", "2024", "2025"];

  const datasets = [
    {
      label: "Completed",
      color: "#2563eb",
      data: labels.map(() => Math.floor(Math.random() * 40 + 60)),
    },
    {
      label: "Renewals",
      color: "#059669",
      data: labels.map(() => Math.floor(Math.random() * 25 + 20)),
    },
    {
      label: "Pending",
      color: "#f59e0b",
      data: labels.map(() => Math.floor(Math.random() * 15 + 5)),
    },
  ];

  const padL = 40,
    padR = 16,
    padT = 16,
    padB = 36;
  const cW = W - padL - padR,
    cH = H - padT - padB;
  const maxVal = 120;
  const n = labels.length;

  // Grid lines
  ctx.strokeStyle = "#e4e9f2";
  ctx.lineWidth = 1;
  [0, 0.25, 0.5, 0.75, 1].forEach((t) => {
    const y = padT + cH * t;
    ctx.beginPath();
    ctx.moveTo(padL, y);
    ctx.lineTo(W - padR, y);
    ctx.stroke();
    ctx.fillStyle = "#a0aec0";
    ctx.font = "10px DM Sans";
    ctx.fillText(Math.round(maxVal * (1 - t)), 4, y + 4);
  });

  // Draw bars
  const groupW = cW / n;
  const barW = Math.min(groupW * 0.22, 18);
  const groupGap = (groupW - barW * datasets.length) / 2;

  datasets.forEach((ds, di) => {
    ds.data.forEach((v, i) => {
      const x = padL + i * groupW + groupGap + di * (barW + 2);
      const barH = (v / maxVal) * cH;
      const y = padT + cH - barH;
      const grad = ctx.createLinearGradient(0, y, 0, padT + cH);
      grad.addColorStop(0, ds.color);
      grad.addColorStop(1, ds.color + "40");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.roundRect(x, y, barW, barH, [4, 4, 0, 0]);
      ctx.fill();
    });
  });

  // X labels
  ctx.fillStyle = "#6b7a99";
  ctx.font = "10px DM Sans";
  ctx.textAlign = "center";
  labels.forEach((l, i) => {
    ctx.fillText(l, padL + i * groupW + groupW / 2, H - padB + 16);
  });

  // Legend
  const legY = H - 6;
  datasets.forEach((ds, i) => {
    const lx = padL + i * 100;
    ctx.fillStyle = ds.color;
    ctx.fillRect(lx, legY - 8, 10, 10);
    ctx.fillStyle = "#6b7a99";
    ctx.textAlign = "left";
    ctx.fillText(ds.label, lx + 14, legY);
  });
}

function drawDonutChart() {
  const canvas = document.getElementById("donutChart");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const size = 110;
  canvas.width = size * devicePixelRatio;
  canvas.height = size * devicePixelRatio;
  ctx.scale(devicePixelRatio, devicePixelRatio);

  const cx = 55,
    cy = 55,
    r = 42,
    inner = 28;
  const data = [
    { val: 142, color: "#2563eb" },
    { val: 89, color: "#059669" },
    { val: 61, color: "#7c3aed" },
    { val: 26, color: "#0891b2" },
  ];
  const total = data.reduce((s, d) => s + d.val, 0);
  let angle = -Math.PI / 2;

  data.forEach((d) => {
    const slice = (d.val / total) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, angle, angle + slice);
    ctx.closePath();
    ctx.fillStyle = d.color;
    ctx.fill();
    angle += slice;
  });

  // Inner circle
  ctx.beginPath();
  ctx.arc(cx, cy, inner, 0, Math.PI * 2);
  ctx.fillStyle = "#fff";
  ctx.fill();

  // Center text
  ctx.fillStyle = "#0d1526";
  ctx.font = `bold 13px Sora`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("318", cx, cy - 5);
  ctx.font = "9px DM Sans";
  ctx.fillStyle = "#a0aec0";
  ctx.fillText("Total", cx, cy + 8);
}

// ─── KPI COUNTER ANIMATION ────────────────────────────────────────
function animateCounters() {
  document.querySelectorAll(".kpi-value[data-count]").forEach((el) => {
    const target = parseInt(el.dataset.count);
    const isPercent = el.textContent.includes("%") || target < 100;
    const duration = 1200;
    const start = performance.now();
    function update(now) {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      const val = Math.round(ease * target);
      el.textContent = isPercent ? val + "%" : val;
      if (t < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  });
}

// ─── INIT ─────────────────────────────────────────────────────────
window.addEventListener("load", () => {
  animateCounters();
  animateProgressBars();
  setTimeout(() => {
    drawCertChart();
    drawDonutChart();
  }, 100);
  window.addEventListener("resize", () => {
    drawCertChart();
    drawDonutChart();
  });
});

// Close notif panel on outside click
document.addEventListener("click", (e) => {
  const panel = document.getElementById("notif-panel");
  if (
    panel.classList.contains("open") &&
    !panel.contains(e.target) &&
    !e.target.closest(".icon-btn")
  ) {
    panel.classList.remove("open");
  }
});
