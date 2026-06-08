import React, { useState } from 'react';

// ─── INJECT STYLES ────────────────────────────────────────────────────────────
function injectStyles() {
  if (document.getElementById('cz-onboarding-styles')) return;
  const style = document.createElement('style');
  style.id = 'cz-onboarding-styles';
  style.textContent = `
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --or: #F5A623;
      --lavande: #9B8ED4;
      --aubergine: #2D0A3E;
      --creme: #FFF8E8;
      --fond: #FAF8F5;
      --texte: #1A0A2E;
      --gris: #6B7280;
      --gris-clair: #E5E7EB;
      --vert: #10B981;
      --rouge: #EF4444;
    }
    body { font-family: 'Outfit', sans-serif; background: var(--fond); color: var(--texte); min-height: 100vh; }

    /* NAVBAR */
    .navbar { background: var(--creme); border-bottom: 2px solid var(--or); padding: 0 24px; height: 64px; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 100; }
    .navbar-logo { display: flex; align-items: center; gap: 10px; }
    .navbar-title { font-family: 'DM Serif Display', serif; font-size: 1.1rem; color: var(--aubergine); }
    .navbar-subtitle { font-size: 0.7rem; font-weight: 500; color: var(--gris); letter-spacing: 0.05em; text-transform: uppercase; }
    .navbar-badge { background: var(--or); color: var(--aubergine); font-size: 0.65rem; font-weight: 700; padding: 3px 8px; border-radius: 20px; letter-spacing: 0.05em; text-transform: uppercase; }

    /* HERO */
    .hero { background: linear-gradient(135deg, var(--aubergine) 0%, #1A0652 100%); padding: 44px 24px 38px; text-align: center; }
    .hero-tag { display: inline-block; background: rgba(245,166,35,0.15); border: 1px solid rgba(245,166,35,0.4); color: var(--or); font-size: 0.7rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; padding: 4px 14px; border-radius: 20px; margin-bottom: 14px; }
    .hero h1 { font-family: 'DM Serif Display', serif; font-size: clamp(1.6rem, 4vw, 2.3rem); color: #fff; line-height: 1.2; margin-bottom: 10px; }
    .hero h1 span { font-style: italic; color: var(--or); }
    .hero p { color: rgba(255,255,255,0.7); font-size: 0.88rem; max-width: 480px; margin: 0 auto; line-height: 1.6; }

    /* TABS */
    .tabs-wrapper { background: var(--creme); border-bottom: 1px solid var(--gris-clair); overflow-x: auto; -webkit-overflow-scrolling: touch; scrollbar-width: none; }
    .tabs-wrapper::-webkit-scrollbar { display: none; }
    .tabs { display: flex; min-width: max-content; padding: 0 16px; }
    .tab { display: flex; align-items: center; gap: 7px; padding: 14px 18px; font-size: 0.82rem; font-weight: 600; color: var(--gris); cursor: pointer; border-bottom: 3px solid transparent; white-space: nowrap; transition: all 0.2s; background: none; border-top: none; border-left: none; border-right: none; font-family: 'Outfit', sans-serif; }
    .tab:hover { color: var(--aubergine); }
    .tab.active { color: var(--aubergine); border-bottom-color: var(--or); }
    .tab-num { background: var(--gris-clair); color: var(--gris); font-size: 0.6rem; font-weight: 700; padding: 1px 5px; border-radius: 8px; }
    .tab.active .tab-num { background: var(--or); color: var(--aubergine); }

    /* MAIN */
    .main { max-width: 800px; margin: 0 auto; padding: 32px 16px 64px; }

    /* SECTION HEADER */
    .section-header { display: flex; align-items: flex-start; gap: 14px; margin-bottom: 28px; }
    .section-icon { width: 48px; height: 48px; background: linear-gradient(135deg, var(--aubergine), #4A1A6E); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.3rem; flex-shrink: 0; }
    .section-header h2 { font-family: 'DM Serif Display', serif; font-size: 1.4rem; color: var(--aubergine); margin-bottom: 4px; }
    .section-header p { font-size: 0.83rem; color: var(--gris); line-height: 1.5; }

    /* FORM */
    .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px; }
    @media (max-width: 560px) { .form-grid { grid-template-columns: 1fr; } }
    .field { display: flex; flex-direction: column; gap: 6px; }
    .field label { font-size: 0.78rem; font-weight: 600; color: var(--aubergine); letter-spacing: 0.03em; text-transform: uppercase; }
    .field select, .field input, .field textarea { font-family: 'Outfit', sans-serif; font-size: 0.88rem; padding: 10px 12px; border: 1.5px solid var(--gris-clair); border-radius: 8px; background: #fff; color: var(--texte); transition: border-color 0.2s; outline: none; width: 100%; }
    .field select:focus, .field input:focus, .field textarea:focus { border-color: var(--or); }
    .field textarea { resize: vertical; min-height: 80px; }

    /* PILIERS CHECKBOXES */
    .piliers-select { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 14px; }
    .pilier-chip { background: #fff; border: 1.5px solid var(--gris-clair); border-radius: 20px; padding: 6px 13px; font-size: 0.78rem; font-weight: 600; color: var(--gris); cursor: pointer; transition: all 0.15s; }
    .pilier-chip.selected { background: var(--aubergine); border-color: var(--aubergine); color: #fff; }
    .pilier-chip:hover:not(.selected) { border-color: var(--or); color: var(--aubergine); }

    /* OFFRE CARDS */
    .offre-cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 10px; margin-bottom: 14px; }
    .offre-card { background: #fff; border: 1.5px solid var(--gris-clair); border-radius: 10px; padding: 14px 12px; cursor: pointer; transition: all 0.2s; text-align: center; }
    .offre-card:hover { border-color: var(--lavande); }
    .offre-card.selected { background: rgba(155,142,212,0.08); border-color: var(--lavande); }
    .offre-card .offre-icon { font-size: 1.4rem; margin-bottom: 6px; }
    .offre-card .offre-label { font-size: 0.78rem; font-weight: 700; color: var(--aubergine); }
    .offre-card .offre-desc { font-size: 0.7rem; color: var(--gris); margin-top: 3px; }

    /* CTA BUTTON */
    .btn-generate { width: 100%; background: linear-gradient(135deg, var(--or), #E8960A); color: var(--aubergine); font-family: 'Outfit', sans-serif; font-size: 0.9rem; font-weight: 700; padding: 14px 24px; border: none; border-radius: 10px; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; justify-content: center; gap: 8px; margin-top: 8px; }
    .btn-generate:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(245,166,35,0.35); }
    .btn-generate:disabled { opacity: 0.6; cursor: not-allowed; }

    /* LOADING */
    .loading-box { background: #fff; border: 1.5px solid var(--gris-clair); border-radius: 12px; padding: 40px; text-align: center; margin-top: 24px; }
    .spinner { width: 36px; height: 36px; border: 3px solid var(--gris-clair); border-top-color: var(--or); border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 16px; }
    @keyframes spin { to { transform: rotate(360deg); } }
    .loading-box p { font-size: 0.85rem; color: var(--gris); }

    /* RESULT BOX */
    .result-box { background: #fff; border: 1.5px solid var(--gris-clair); border-radius: 12px; margin-top: 24px; overflow: hidden; }
    .result-header { background: linear-gradient(135deg, var(--aubergine), #4A1A6E); padding: 16px 20px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; }
    .result-header h3 { font-family: 'DM Serif Display', serif; color: #fff; font-size: 1rem; }
    .result-actions { display: flex; gap: 8px; }
    .btn-copy { font-family: 'Outfit', sans-serif; font-size: 0.75rem; font-weight: 600; padding: 6px 12px; border-radius: 6px; cursor: pointer; border: none; transition: all 0.15s; background: var(--or); color: var(--aubergine); }
    .btn-copy:hover { background: #e8960a; }
    .btn-regen { font-family: 'Outfit', sans-serif; font-size: 0.75rem; font-weight: 600; padding: 6px 12px; border-radius: 6px; cursor: pointer; background: rgba(255,255,255,0.15); color: #fff; border: 1px solid rgba(255,255,255,0.3); transition: all 0.15s; }
    .btn-regen:hover { background: rgba(255,255,255,0.25); }
    .result-body { padding: 24px 20px; }

    /* RESULT BLOCKS */
    .result-block { margin-bottom: 22px; }
    .result-block:last-child { margin-bottom: 0; }
    .result-block-title { font-size: 0.72rem; font-weight: 700; color: var(--or); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 10px; display: flex; align-items: center; gap: 6px; }
    .result-block-title::after { content: ''; flex: 1; height: 1px; background: var(--gris-clair); }
    .content-bubble { background: var(--fond); border-left: 3px solid var(--or); border-radius: 0 8px 8px 0; padding: 14px 16px; font-size: 0.87rem; line-height: 1.75; color: var(--texte); white-space: pre-wrap; word-break: break-word; }
    .content-bubble.lavande { border-left-color: var(--lavande); }
    .content-bubble.vert { border-left-color: var(--vert); }

    /* CHECKLIST */
    .checklist { list-style: none; }
    .checklist-item { display: flex; align-items: flex-start; gap: 10px; padding: 10px 0; border-bottom: 1px solid var(--gris-clair); }
    .checklist-item:last-child { border-bottom: none; }
    .checklist-check { width: 20px; height: 20px; border: 2px solid var(--or); border-radius: 4px; flex-shrink: 0; margin-top: 1px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.15s; }
    .checklist-check.checked { background: var(--or); border-color: var(--or); }
    .checklist-check.checked::after { content: '✓'; font-size: 0.7rem; font-weight: 700; color: var(--aubergine); }
    .checklist-text { font-size: 0.87rem; line-height: 1.5; }
    .checklist-text .item-label { font-weight: 600; color: var(--aubergine); }
    .checklist-text .item-detail { font-size: 0.78rem; color: var(--gris); margin-top: 2px; }
    .checklist-category { font-size: 0.7rem; font-weight: 700; color: var(--lavande); letter-spacing: 0.08em; text-transform: uppercase; padding: 12px 0 6px; }

    /* FEUILLE DE ROUTE TIMELINE */
    .roadmap { display: flex; flex-direction: column; gap: 0; }
    .roadmap-item { display: flex; gap: 16px; }
    .roadmap-left { display: flex; flex-direction: column; align-items: center; }
    .roadmap-dot { width: 34px; height: 34px; border-radius: 50%; background: var(--aubergine); display: flex; align-items: center; justify-content: center; font-size: 0.72rem; font-weight: 700; color: #fff; flex-shrink: 0; }
    .roadmap-dot.or { background: var(--or); color: var(--aubergine); }
    .roadmap-line { width: 2px; background: var(--gris-clair); flex: 1; min-height: 16px; margin: 4px 0; }
    .roadmap-content { flex: 1; padding-bottom: 20px; }
    .roadmap-week { font-size: 0.7rem; font-weight: 700; color: var(--or); letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 4px; }
    .roadmap-title { font-weight: 700; color: var(--aubergine); font-size: 0.9rem; margin-bottom: 6px; }
    .roadmap-actions { font-size: 0.83rem; line-height: 1.7; color: var(--texte); }

    /* CONTRAT SECTIONS */
    .contrat-section { background: var(--fond); border-radius: 10px; padding: 16px; margin-bottom: 12px; }
    .contrat-section-title { font-size: 0.72rem; font-weight: 700; color: var(--aubergine); text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 8px; border-bottom: 1px solid var(--gris-clair); padding-bottom: 6px; }
    .contrat-section-body { font-size: 0.86rem; line-height: 1.7; color: var(--texte); white-space: pre-wrap; }

    /* TIP */
    .tip-box { background: rgba(155,142,212,0.08); border: 1px solid rgba(155,142,212,0.3); border-radius: 10px; padding: 14px 16px; margin-top: 16px; font-size: 0.82rem; color: var(--aubergine); line-height: 1.6; }
    .tip-box strong { color: var(--lavande); }

    /* ERROR */
    .error-box { background: rgba(239,68,68,0.05); border: 1px solid rgba(239,68,68,0.2); border-radius: 10px; padding: 14px; margin-top: 16px; font-size: 0.85rem; color: var(--rouge); }

    /* FOOTER */
    .footer { text-align: center; padding: 20px; font-size: 0.72rem; color: var(--gris); }
    .footer span { color: var(--or); font-weight: 600; }

    /* TOAST */
    .toast { position: fixed; bottom: 24px; right: 24px; background: var(--aubergine); color: #fff; padding: 10px 18px; border-radius: 8px; font-size: 0.82rem; font-weight: 600; z-index: 999; animation: slideUp 0.25s ease; box-shadow: 0 4px 16px rgba(45,10,62,0.3); }
    @keyframes slideUp { from { transform: translateY(16px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

    /* RESPONSIVE */
    @media (max-width: 480px) {
      .navbar { padding: 0 14px; height: 56px; }
      .navbar-subtitle { display: none; }
      .hero { padding: 30px 14px 26px; }
      .hero h1 { font-size: 1.45rem; }
      .tab { padding: 11px 12px; font-size: 0.76rem; }
      .tab-num { display: none; }
      .main { padding: 20px 12px 48px; }
      .section-icon { width: 40px; height: 40px; font-size: 1.1rem; }
      .section-header h2 { font-size: 1.15rem; }
      .result-header { flex-direction: column; align-items: flex-start; padding: 12px 14px; }
      .result-body { padding: 16px 14px; }
      .offre-cards { grid-template-columns: 1fr 1fr; }
      .content-bubble { font-size: 0.83rem; }
      .toast { right: 12px; bottom: 14px; }
    }
  `;
  document.head.appendChild(style);
}

// ─── SYNC SUPABASE ────────────────────────────────────────────────────────────

async function syncToSupabase(table, data, agent) {
  try {
    await fetch('/api/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ table, action: 'insert', data, agent }),
    });
  } catch (e) {
    console.warn('Sync Supabase échouée:', e.message);
  }
}

// ─── CONSTANTS ────────────────────────────────────────────────────────────────

const PILIERS = ['Cash', 'Stratégie', 'Clients', 'Équipe', 'Risques', 'Croissance', 'Résilience'];

const SECTEURS = [
  'BTP / Artisanat', 'Commerce de détail', 'Restauration / CHR',
  'Services aux entreprises', 'Santé / Bien-être', 'Transport / Logistique',
  'Industrie / Production', 'Immobilier', 'Auto-entrepreneur / Freelance'
];

const OFFRES = [
  { id: 'intensif', icon: '🚀', label: 'Intensif 1 mois', desc: '4 modules, 8 séances' },
  { id: 'suivi3', icon: '📅', label: 'Suivi 3 mois', desc: 'Accompagnement mensuel' },
  { id: 'suivi6', icon: '🎯', label: 'Suivi 6 mois', desc: 'Transformation complète' },
  { id: 'diag', icon: '🔍', label: 'Diagnostic seul', desc: 'Rapport L1.1' },
];

const TABS = [
  { id: 'email', icon: '✉️', label: 'Email bienvenue', num: '01' },
  { id: 'contrat', icon: '📄', label: 'Contrat simplifié', num: '02' },
  { id: 'roadmap', icon: '🗺️', label: 'Feuille de route', num: '03' },
  { id: 'checklist', icon: '✅', label: 'Checklist démarrage', num: '04' },
];

// ─── API CALL ─────────────────────────────────────────────────────────────────

async function callAPI(systemPrompt, userPrompt) {
  const res = await fetch('/api/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 4000,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }]
    })
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`API ${res.status}: ${errText}`);
  }
  const data = await res.json();
  const raw = (data.content?.[0]?.text || data.content?.map?.(b => b.text || '').join('') || '').replace(/```json|```/g, '').trim();
  const jsonMatch = raw.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
  return JSON.parse(jsonMatch ? jsonMatch[0] : raw);
}

// ─── SHARED CLIENT FORM ───────────────────────────────────────────────────────

function ClientForm({ form, setForm, showOffre = true, showPiliers = false }) {
  const f = (k, v) => setForm(p => ({ ...p, [k]: v }));
  function togglePilier(p) {
    const cur = form.piliers || [];
    setForm(prev => ({ ...prev, piliers: cur.includes(p) ? cur.filter(x => x !== p) : [...cur, p] }));
  }

  return (
    <>
      <div className="form-grid">
        <div className="field">
          <label>Prénom du client *</label>
          <input value={form.prenom || ''} onChange={e => f('prenom', e.target.value)} placeholder="ex: Thomas" />
        </div>
        <div className="field">
          <label>Nom de l'entreprise</label>
          <input value={form.entreprise || ''} onChange={e => f('entreprise', e.target.value)} placeholder="ex: SARL Durand BTP" />
        </div>
        <div className="field">
          <label>Secteur d'activité</label>
          <select value={form.secteur || ''} onChange={e => f('secteur', e.target.value)}>
            <option value="">Choisir...</option>
            {SECTEURS.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div className="field">
          <label>Tarif mensuel (€)</label>
          <input type="number" value={form.tarif || ''} onChange={e => f('tarif', e.target.value)} placeholder="ex: 500" />
        </div>
        <div className="field">
          <label>Date de démarrage</label>
          <input type="date" value={form.dateDebut || ''} onChange={e => f('dateDebut', e.target.value)} />
        </div>
        <div className="field">
          <label>Email client</label>
          <input type="email" value={form.email || ''} onChange={e => f('email', e.target.value)} placeholder="client@email.com" />
        </div>
      </div>

      {showOffre && (
        <div style={{ marginBottom: 14 }}>
          <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--aubergine)', textTransform: 'uppercase', letterSpacing: '0.03em', marginBottom: 10 }}>Offre souscrite</label>
          <div className="offre-cards">
            {OFFRES.map(o => (
              <div key={o.id} className={`offre-card ${form.offre === o.id ? 'selected' : ''}`} onClick={() => f('offre', o.id)}>
                <div className="offre-icon">{o.icon}</div>
                <div className="offre-label">{o.label}</div>
                <div className="offre-desc">{o.desc}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showPiliers && (
        <div style={{ marginBottom: 14 }}>
          <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--aubergine)', textTransform: 'uppercase', letterSpacing: '0.03em', marginBottom: 10 }}>Piliers prioritaires identifiés</label>
          <div className="piliers-select">
            {PILIERS.map(p => (
              <div key={p} className={`pilier-chip ${(form.piliers || []).includes(p) ? 'selected' : ''}`} onClick={() => togglePilier(p)}>{p}</div>
            ))}
          </div>
        </div>
      )}

      <div className="field" style={{ marginBottom: 14 }}>
        <label>Contexte / problématique principale</label>
        <textarea value={form.contexte || ''} onChange={e => f('contexte', e.target.value)} placeholder="Ex: trésorerie tendue, perte de 2 clients clés, équipe démotivée..." />
      </div>
    </>
  );
}

// ─── MODULE 1 : EMAIL BIENVENUE ───────────────────────────────────────────────

function ModuleEmail({ onToast }) {
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  async function generate() {
    if (!form.prenom) return;
    setLoading(true); setError(''); setResult(null);
    try {
      const offre = OFFRES.find(o => o.id === form.offre)?.label || 'Accompagnement CapZéniths';
      const sys = `Tu es Ogan, fondateur de CapZéniths. Tu rédiges un email de bienvenue chaleureux mais direct pour un nouveau client. Réponds UNIQUEMENT en JSON valide sans backticks. Format: {"objet": "...", "email_court": "...", "email_long": "...", "ps": "..."}. Règles: tutoiement, style CapZéniths (direct, humain, sans jargon creux), email_court = version concise (~150 mots), email_long = version complète (~280 mots) avec prochaines étapes concrètes, ps = post-scriptum motivant.`;
      const prompt = `Client: ${form.prenom}${form.entreprise ? ` (${form.entreprise})` : ''} | Secteur: ${form.secteur || 'TPE/PME'} | Offre: ${offre}${form.tarif ? ` | Tarif: ${form.tarif}€/mois` : ''}${form.dateDebut ? ` | Démarrage: ${form.dateDebut}` : ''}${form.contexte ? ` | Contexte: ${form.contexte}` : ''}. Génère l'email de bienvenue.`;
      const data = await callAPI(sys, prompt);
      setResult(data);
      await syncToSupabase('onboardings', {
        client_nom: `${form.prenom}${form.entreprise ? ` — ${form.entreprise}` : ''}`,
        offre: form.offre || '', date_debut: form.dateDebut || new Date().toISOString().slice(0,10),
        email_genere: true, contrat_genere: false, roadmap_generee: false, checklist_generee: false,
      }, 'onboarding');
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  }

  return (
    <div>
      <div className="section-header">
        <div className="section-icon">✉️</div>
        <div>
          <h2>Email de bienvenue</h2>
          <p>Deux versions (courte et longue) avec objet optimisé — prêtes à copier dans Brevo ou Gmail.</p>
        </div>
      </div>

      <ClientForm form={form} setForm={setForm} showOffre showPiliers={false} />

      <button className="btn-generate" onClick={generate} disabled={loading || !form.prenom}>
        {loading ? '⏳ Rédaction...' : '✉️ Générer l\'email de bienvenue'}
      </button>

      {loading && <div className="loading-box"><div className="spinner"></div><p>Rédaction en cours...</p></div>}
      {error && <div className="error-box">❌ {error}</div>}

      {result && (
        <div className="result-box">
          <div className="result-header">
            <h3>Email de bienvenue — {form.prenom}</h3>
            <div className="result-actions">
              <button className="btn-regen" onClick={generate}>↺</button>
              <button className="btn-copy" onClick={() => navigator.clipboard.writeText(`Objet: ${result.objet}\n\n${result.email_long}\n\nP.S. ${result.ps}`).then(() => onToast('Copié ✓'))}>Copier</button>
            </div>
          </div>
          <div className="result-body">
            <div className="result-block">
              <div className="result-block-title">📧 Objet de l'email</div>
              <div style={{ background: 'var(--fond)', padding: '10px 14px', borderRadius: 8, fontWeight: 700, fontSize: '0.9rem' }}>{result.objet}</div>
            </div>
            <div className="result-block">
              <div className="result-block-title">✂️ Version courte</div>
              <div className="content-bubble">{result.email_court}</div>
              <div style={{ marginTop: 8, display: 'flex', justifyContent: 'flex-end' }}>
                <button className="btn-copy" style={{ padding: '4px 10px', fontSize: '0.7rem' }} onClick={() => navigator.clipboard.writeText(result.email_court).then(() => onToast('Copié ✓'))}>Copier</button>
              </div>
            </div>
            <div className="result-block">
              <div className="result-block-title">📝 Version complète</div>
              <div className="content-bubble lavande">{result.email_long}</div>
              <div style={{ marginTop: 8, display: 'flex', justifyContent: 'flex-end' }}>
                <button className="btn-copy" style={{ padding: '4px 10px', fontSize: '0.7rem' }} onClick={() => navigator.clipboard.writeText(result.email_long).then(() => onToast('Copié ✓'))}>Copier</button>
              </div>
            </div>
            {result.ps && (
              <div className="result-block">
                <div className="result-block-title">💬 Post-scriptum</div>
                <div className="content-bubble vert">{result.ps}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── MODULE 2 : CONTRAT SIMPLIFIÉ ────────────────────────────────────────────

function ModuleContrat({ onToast }) {
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  async function generate() {
    if (!form.prenom) return;
    setLoading(true); setError(''); setResult(null);
    try {
      const offre = OFFRES.find(o => o.id === form.offre)?.label || 'Accompagnement CapZéniths';
      const sys = `Tu es Ogan, fondateur de CapZéniths. Tu rédiges un contrat de prestation simplifié (pas juridique, récapitulatif d'engagement clair). Réponds UNIQUEMENT en JSON valide sans backticks. Format: {"sections": [{"titre": "...", "contenu": "..."}], "mention_legale": "..."}. Sections attendues: "Parties", "Objet de la prestation", "Durée et modalités", "Tarif et paiement", "Engagements CapZéniths", "Engagements du client", "Résiliation", "Confidentialité". Style clair, sans jargon juridique lourd, professionnel mais humain.`;
      const prompt = `Client: ${form.prenom}${form.entreprise ? `, ${form.entreprise}` : ''} | Email: ${form.email || 'à compléter'} | Offre: ${offre} | Tarif: ${form.tarif ? `${form.tarif}€/mois` : 'à définir'} | Démarrage: ${form.dateDebut || 'à définir'} | Secteur: ${form.secteur || 'TPE/PME'}. Génère le contrat simplifié.`;
      const data = await callAPI(sys, prompt);
      setResult(data);
      await syncToSupabase('onboardings', {
        client_nom: `${form.prenom}${form.entreprise ? ` — ${form.entreprise}` : ''}`,
        offre: form.offre || '', date_debut: form.dateDebut || new Date().toISOString().slice(0,10),
        contrat_genere: true, email_genere: false, roadmap_generee: false, checklist_generee: false,
      }, 'onboarding');
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  }

  function copyAll() {
    if (!result) return;
    const txt = result.sections.map(s => `${s.titre.toUpperCase()}\n${s.contenu}`).join('\n\n') + (result.mention_legale ? `\n\n${result.mention_legale}` : '');
    navigator.clipboard.writeText(txt).then(() => onToast('Contrat copié ✓'));
  }

  return (
    <div>
      <div className="section-header">
        <div className="section-icon">📄</div>
        <div>
          <h2>Contrat simplifié</h2>
          <p>Un récapitulatif d'engagement clair et professionnel — pas un contrat juridique, mais un document qui cadre la relation.</p>
        </div>
      </div>

      <ClientForm form={form} setForm={setForm} showOffre showPiliers={false} />

      <button className="btn-generate" onClick={generate} disabled={loading || !form.prenom}>
        {loading ? '⏳ Génération...' : '📄 Générer le contrat simplifié'}
      </button>

      {loading && <div className="loading-box"><div className="spinner"></div><p>Rédaction du contrat en cours...</p></div>}
      {error && <div className="error-box">❌ {error}</div>}

      {result && (
        <div className="result-box">
          <div className="result-header">
            <h3>Contrat — {form.prenom}{form.entreprise ? ` / ${form.entreprise}` : ''}</h3>
            <div className="result-actions">
              <button className="btn-regen" onClick={generate}>↺</button>
              <button className="btn-copy" onClick={copyAll}>Copier tout</button>
            </div>
          </div>
          <div className="result-body">
            {result.sections?.map((s, i) => (
              <div key={i} className="contrat-section">
                <div className="contrat-section-title">{s.titre}</div>
                <div className="contrat-section-body">{s.contenu}</div>
              </div>
            ))}
            {result.mention_legale && (
              <div className="tip-box" style={{ marginTop: 12 }}>
                <strong>⚖️ Mention :</strong> {result.mention_legale}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── MODULE 3 : FEUILLE DE ROUTE ─────────────────────────────────────────────

function ModuleRoadmap({ onToast }) {
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  async function generate() {
    if (!form.prenom) return;
    setLoading(true); setError(''); setResult(null);
    try {
      const offre = OFFRES.find(o => o.id === form.offre)?.label || 'Accompagnement CapZéniths';
      const piliers = (form.piliers || []).join(', ') || 'à identifier';
      const sys = `Tu es Ogan, fondateur de CapZéniths. Tu génères une feuille de route d'accompagnement personnalisée. Réponds UNIQUEMENT en JSON valide sans backticks. Format: {"titre": "...", "objectif_global": "...", "etapes": [{"semaine": "...", "titre": "...", "actions": "...", "livrable": "..."}], "indicateurs_succes": ["...", "..."], "message_final": "..."}. 4 à 8 étapes selon la durée. Actions concrètes, livrables précis, basés sur les 7 piliers CapZéniths.`;
      const prompt = `Client: ${form.prenom}${form.entreprise ? ` (${form.entreprise})` : ''} | Secteur: ${form.secteur || 'TPE/PME'} | Offre: ${offre} | Piliers prioritaires: ${piliers} | Contexte: ${form.contexte || 'non précisé'}. Génère la feuille de route personnalisée.`;
      const data = await callAPI(sys, prompt);
      setResult(data);
      await syncToSupabase('onboardings', {
        client_nom: `${form.prenom}${form.entreprise ? ` — ${form.entreprise}` : ''}`,
        offre: form.offre || '', date_debut: form.dateDebut || new Date().toISOString().slice(0,10),
        roadmap_generee: true, email_genere: false, contrat_genere: false, checklist_generee: false,
        piliers_prioritaires: (form.piliers || []).join(','),
      }, 'onboarding');
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  }

  function copyAll() {
    if (!result) return;
    const txt = `${result.titre}\n\nObjectif: ${result.objectif_global}\n\n` +
      result.etapes.map(e => `${e.semaine} — ${e.titre}\n${e.actions}\nLivrable: ${e.livrable}`).join('\n\n') +
      `\n\nIndicateurs de succès:\n${result.indicateurs_succes?.map(i => `• ${i}`).join('\n')}` +
      (result.message_final ? `\n\n${result.message_final}` : '');
    navigator.clipboard.writeText(txt).then(() => onToast('Feuille de route copiée ✓'));
  }

  return (
    <div>
      <div className="section-header">
        <div className="section-icon">🗺️</div>
        <div>
          <h2>Feuille de route</h2>
          <p>Un plan d'accompagnement semaine par semaine avec livrables et indicateurs de succès — personnalisé par pilier.</p>
        </div>
      </div>

      <ClientForm form={form} setForm={setForm} showOffre showPiliers />

      <button className="btn-generate" onClick={generate} disabled={loading || !form.prenom}>
        {loading ? '⏳ Génération...' : '🗺️ Générer la feuille de route'}
      </button>

      {loading && <div className="loading-box"><div className="spinner"></div><p>Construction de la feuille de route...</p></div>}
      {error && <div className="error-box">❌ {error}</div>}

      {result && (
        <div className="result-box">
          <div className="result-header">
            <h3>{result.titre || `Feuille de route — ${form.prenom}`}</h3>
            <div className="result-actions">
              <button className="btn-regen" onClick={generate}>↺</button>
              <button className="btn-copy" onClick={copyAll}>Copier</button>
            </div>
          </div>
          <div className="result-body">
            {result.objectif_global && (
              <div style={{ background: 'rgba(245,166,35,0.08)', border: '1px solid rgba(245,166,35,0.3)', borderRadius: 8, padding: '12px 16px', marginBottom: 20, fontSize: '0.87rem', lineHeight: 1.6 }}>
                🎯 <strong>Objectif global :</strong> {result.objectif_global}
              </div>
            )}
            <div className="roadmap">
              {result.etapes?.map((e, i) => (
                <div key={i} className="roadmap-item">
                  <div className="roadmap-left">
                    <div className={`roadmap-dot ${i === 0 ? 'or' : ''}`}>{i + 1}</div>
                    {i < result.etapes.length - 1 && <div className="roadmap-line"></div>}
                  </div>
                  <div className="roadmap-content">
                    <div className="roadmap-week">{e.semaine}</div>
                    <div className="roadmap-title">{e.titre}</div>
                    <div className="roadmap-actions">{e.actions}</div>
                    {e.livrable && (
                      <div style={{ marginTop: 6, display: 'inline-flex', alignItems: 'center', gap: 5, background: 'rgba(155,142,212,0.1)', border: '1px solid rgba(155,142,212,0.25)', borderRadius: 6, padding: '4px 10px', fontSize: '0.75rem', fontWeight: 600, color: 'var(--lavande)' }}>
                        📎 {e.livrable}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {result.indicateurs_succes?.length > 0 && (
              <div className="tip-box" style={{ marginTop: 4 }}>
                <strong>✅ Indicateurs de succès :</strong><br />
                {result.indicateurs_succes.map((ind, i) => <div key={i}>• {ind}</div>)}
              </div>
            )}
            {result.message_final && (
              <div className="content-bubble vert" style={{ marginTop: 14 }}>{result.message_final}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── MODULE 4 : CHECKLIST DÉMARRAGE ──────────────────────────────────────────

function ModuleChecklist({ onToast }) {
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [checked, setChecked] = useState({});

  async function generate() {
    if (!form.prenom) return;
    setLoading(true); setError(''); setResult(null); setChecked({});
    try {
      const offre = OFFRES.find(o => o.id === form.offre)?.label || 'Accompagnement CapZéniths';
      const sys = `Tu es Ogan, fondateur de CapZéniths. Tu génères une checklist de démarrage complète pour l'onboarding d'un nouveau client. Réponds UNIQUEMENT en JSON valide sans backticks. Format: {"categories": [{"nom": "...", "items": [{"label": "...", "detail": "...", "responsable": "ogan|client|ensemble"}]}]}. Catégories attendues: "Avant la première séance", "Administrative & contractuelle", "Outils & accès", "Diagnostic initial", "Communication & relation". 4 à 6 items par catégorie, concrets et actionnables.`;
      const prompt = `Client: ${form.prenom}${form.entreprise ? ` (${form.entreprise})` : ''} | Offre: ${offre} | Secteur: ${form.secteur || 'TPE/PME'} | Contexte: ${form.contexte || 'démarrage standard'}. Génère la checklist d'onboarding.`;
      const data = await callAPI(sys, prompt);
      setResult(data);
      await syncToSupabase('onboardings', {
        client_nom: `${form.prenom}${form.entreprise ? ` — ${form.entreprise}` : ''}`,
        offre: form.offre || '', date_debut: form.dateDebut || new Date().toISOString().slice(0,10),
        checklist_generee: true, email_genere: false, contrat_genere: false, roadmap_generee: false,
      }, 'onboarding');
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  }

  function toggleCheck(catIdx, itemIdx) {
    const key = `${catIdx}-${itemIdx}`;
    setChecked(p => ({ ...p, [key]: !p[key] }));
  }

  const totalItems = result?.categories?.reduce((s, c) => s + c.items.length, 0) || 0;
  const doneItems = Object.values(checked).filter(Boolean).length;
  const pct = totalItems > 0 ? Math.round((doneItems / totalItems) * 100) : 0;

  const RESP_COLORS = { ogan: 'var(--lavande)', client: 'var(--or)', ensemble: 'var(--vert)' };
  const RESP_LABELS = { ogan: '👤 Ogan', client: '🏢 Client', ensemble: '🤝 Ensemble' };

  return (
    <div>
      <div className="section-header">
        <div className="section-icon">✅</div>
        <div>
          <h2>Checklist démarrage</h2>
          <p>Toutes les actions à cocher avant et pendant la première séance — avec responsable clairement indiqué.</p>
        </div>
      </div>

      <ClientForm form={form} setForm={setForm} showOffre showPiliers={false} />

      <button className="btn-generate" onClick={generate} disabled={loading || !form.prenom}>
        {loading ? '⏳ Génération...' : '✅ Générer la checklist'}
      </button>

      {loading && <div className="loading-box"><div className="spinner"></div><p>Création de la checklist...</p></div>}
      {error && <div className="error-box">❌ {error}</div>}

      {result && (
        <div className="result-box">
          <div className="result-header">
            <h3>Checklist — {form.prenom}</h3>
            <div className="result-actions">
              <button className="btn-regen" onClick={generate}>↺</button>
              <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 6, padding: '4px 10px', fontSize: '0.78rem', fontWeight: 700, color: pct === 100 ? 'var(--or)' : '#fff' }}>
                {doneItems}/{totalItems} — {pct}%
              </div>
            </div>
          </div>
          <div className="result-body">
            {pct > 0 && (
              <div style={{ marginBottom: 20 }}>
                <div style={{ background: 'var(--gris-clair)', borderRadius: 6, height: 8, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${pct}%`, background: pct === 100 ? 'var(--vert)' : 'var(--or)', borderRadius: 6, transition: 'width 0.3s' }}></div>
                </div>
                {pct === 100 && <div style={{ textAlign: 'center', marginTop: 8, color: 'var(--vert)', fontWeight: 700, fontSize: '0.85rem' }}>🎉 Onboarding complété !</div>}
              </div>
            )}
            {result.categories?.map((cat, ci) => (
              <div key={ci}>
                <div className="checklist-category">{cat.nom}</div>
                <ul className="checklist">
                  {cat.items.map((item, ii) => {
                    const key = `${ci}-${ii}`;
                    const isDone = checked[key];
                    return (
                      <li key={ii} className="checklist-item">
                        <div className={`checklist-check ${isDone ? 'checked' : ''}`} onClick={() => toggleCheck(ci, ii)}></div>
                        <div className="checklist-text" style={{ opacity: isDone ? 0.5 : 1 }}>
                          <div className="item-label" style={{ textDecoration: isDone ? 'line-through' : 'none' }}>{item.label}</div>
                          {item.detail && <div className="item-detail">{item.detail}</div>}
                        </div>
                        {item.responsable && (
                          <div style={{ marginLeft: 'auto', flexShrink: 0, fontSize: '0.68rem', fontWeight: 700, color: RESP_COLORS[item.responsable] || 'var(--gris)', background: 'var(--fond)', padding: '2px 7px', borderRadius: 10, whiteSpace: 'nowrap' }}>
                            {RESP_LABELS[item.responsable] || item.responsable}
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
            <div style={{ marginTop: 16, display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn-copy" onClick={() => {
                const txt = result.categories.map(c =>
                  `${c.nom}\n${c.items.map(i => `☐ ${i.label}${i.detail ? ` — ${i.detail}` : ''} [${i.responsable}]`).join('\n')}`
                ).join('\n\n');
                navigator.clipboard.writeText(txt).then(() => onToast('Checklist copiée ✓'));
              }}>Copier la checklist</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────

export default function App() {
  injectStyles();
  const [activeTab, setActiveTab] = useState('email');
  const [toast, setToast] = useState('');

  function showToast(msg) { setToast(msg); setTimeout(() => setToast(''), 2500); }

  const modules = {
    email: <ModuleEmail onToast={showToast} />,
    contrat: <ModuleContrat onToast={showToast} />,
    roadmap: <ModuleRoadmap onToast={showToast} />,
    checklist: <ModuleChecklist onToast={showToast} />,
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="16" fill="#2D0A3E"/>
            <rect x="7" y="19" width="4" height="6" rx="0.8" fill="#F5A623"/>
            <rect x="13" y="15" width="4" height="10" rx="0.8" fill="#F5A623"/>
            <rect x="19" y="11" width="4.5" height="14" rx="0.8" fill="#F5A623"/>
            <polygon points="21.25,4 22.2,7 25.3,7 22.8,8.8 23.7,11.8 21.25,10 18.8,11.8 19.7,8.8 17.2,7 20.3,7" fill="#F5A623"/>
          </svg>
          <div>
            <div className="navbar-title"><span style={{ color: '#F5A623' }}>Cap</span><span style={{ color: '#9B8ED4' }}>Zéniths</span></div>
            <div className="navbar-subtitle">Agent Onboarding</div>
          </div>
        </div>
        <div className="navbar-badge">🤝 Onboarding</div>
      </nav>

      <div className="hero">
        <div className="hero-tag">🤝 Accueil Client</div>
        <h1>Transforme la signature <span>en démarrage béton</span></h1>
        <p>Email de bienvenue, contrat simplifié, feuille de route et checklist — tout ce qu'il faut pour démarrer sans friction.</p>
      </div>

      <div className="tabs-wrapper">
        <div className="tabs">
          {TABS.map(tab => (
            <button key={tab.id} className={`tab ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id)}>
              {tab.icon} {tab.label}
              <span className="tab-num">{tab.num}</span>
            </button>
          ))}
        </div>
      </div>

      <main className="main">
        {modules[activeTab]}
      </main>

      <div className="footer">
        <span>CapZéniths</span> · Agent Onboarding · Méthode 7 Piliers · Tous droits réservés
      </div>

      {toast && <div className="toast">{toast}</div>}
    </>
  );
}
