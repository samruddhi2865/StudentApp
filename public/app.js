// public/app.js
async function loadAll() {
  const res = await fetch('/api/students');
  const list = await res.json();
  renderTable(list);
}

function renderTable(list) {
  const tbody = document.querySelector('#table tbody');
  tbody.innerHTML = '';
  list.forEach(r => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${r.rollno}</td>
      <td>${r.name}</td>
      <td>${r.day1}</td>
      <td>${r.day2}</td>
      <td>${r.day3}</td>
      <td>${r.day4}</td>
      <td>${r.percentage}</td>
    `;
    tbody.appendChild(tr);
  });
}

async function recompute() {
  const res = await fetch('/api/recompute', { method: 'POST' });
  const j = await res.json();
  alert('Recompute result: ' + JSON.stringify(j));
  await loadAll();
}

async function showStats() {
  const res = await fetch('/api/stats');
  const j = await res.json();
  const el = document.getElementById('stats');
  el.innerHTML = `<p>Count: ${j.count} — Max: ${j.max} — Min: ${j.min} — Avg: ${j.avg}</p>`;
}

async function sortAndLoad() {
  const by = document.getElementById('sortBy').value;
  const order = document.getElementById('order').value;
  const res = await fetch(`/api/sorted?by=${encodeURIComponent(by)}&order=${encodeURIComponent(order)}`);
  const list = await res.json();
  renderTable(list);
}

document.getElementById('btnLoad').addEventListener('click', loadAll);
document.getElementById('btnRecompute').addEventListener('click', recompute);
document.getElementById('btnStats').addEventListener('click', showStats);
document.getElementById('btnSort').addEventListener('click', sortAndLoad);

// auto-load on page open
loadAll();
