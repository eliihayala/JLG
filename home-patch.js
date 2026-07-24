'use strict';

const originalRenderJLG = render;

homeView = function () {
  const alerts = buildAlerts();
  const important = alerts.filter(a => a.priority === 'Alta' || a.priority === 'Media').slice(0, 5);
  const alertsBlock = important.length
    ? `<section class="home-alerts">
        <div class="home-alert-head">
          <div>
            <span class="home-kicker">Atención requerida</span>
            <h2>Alertas pendientes</h2>
            <p>Situaciones que requieren revisión o seguimiento.</p>
          </div>
          <span class="home-alert-count">${important.length}</span>
        </div>
        <div class="home-alert-list">
          ${important.map(a => `
            <article class="home-alert-item">
              <span class="home-alert-icon">${a.type.includes('Factura') ? '$' : a.type.includes('Contrato') || a.type === 'Renovación' ? '▤' : '!'}</span>
              <div class="home-alert-copy">
                <b>${a.type}</b>
                <span>${a.client}</span>
                <small>${a.detail}</small>
              </div>
              <button class="btn soft" data-go="${a.go}">Revisar</button>
            </article>`).join('')}
        </div>
      </section>`
    : `<section class="home-no-alerts">
        <span>✓</span>
        <div><b>Sin alertas pendientes</b><p>No hay situaciones que requieran atención en este momento.</p></div>
      </section>`;

  return `<div class="home-page">
    <section class="jlg-welcome">
      <div class="jlg-welcome-overlay"></div>
      <div class="jlg-welcome-content">
        <img src="jlg-logo.png" alt="JLG Logistic Group">
        <span class="home-kicker light">Sistema integral de gestión</span>
        <h1>Inicio</h1>
        <p>Gestión operativa, documental y administrativa de JLG Logistic Group.</p>
      </div>
    </section>
    ${alertsBlock}
  </div>`;
};

render = function () {
  originalRenderJLG();
  const clientSelector = document.getElementById('globalClient');
  if (clientSelector) clientSelector.classList.toggle('hidden', state.module === 'inicio');
};
