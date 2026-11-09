// ===== deans.js: Dean's List page (deans.html) =====
(function(){
  const essay = $('essay'), count = $('count');
  let current = null;

  loadPhoto();

  // Which evidence folder goes with which group
  const EVIDENCE_KEYS = {
    alive: 'ALU Alive',
    kmc: 'KMC',
    python: 'Student Success',
    class: 'Our Class'
  };

  function evidenceFor(g){
    const ev = NAME.evidence;
    if (!ev) return '';
    if (typeof ev === 'string') return ev;
    if (g && EVIDENCE_KEYS[g.id] && ev[EVIDENCE_KEYS[g.id]]) return ev[EVIDENCE_KEYS[g.id]];
    // Friends (or any group without its own folder) get every link
    return Object.values(ev).join('\n');
  }

  function renderDetails(g){
    const box = $('fields');
    box.innerHTML = '<p class="fields-title">My details for the form</p>';
    const ev = evidenceFor(g);
    const many = ev.includes('\n');
    renderFields(box, [
      ['Nominee name (first and last)', NAME.first + ' ' + NAME.last],
      ['Nominee email', NAME.email],
      ['Academic programme (pick this option)', NAME.programme],
      ['Intake (pick this option)', NAME.intake],
      [many ? 'Evidence of impact (paste all these links)' : 'Evidence of impact (paste this link)', ev]
    ]);
    box.querySelectorAll('.field b').forEach(b => { b.style.whiteSpace = 'pre-line'; });
  }

  function updateCount(){ count.textContent = wordCount(essay.value) + ' words'; }

  function pick(g, scroll){
    current = g;
    essay.value = g.dl;
    updateCount(); renderDetails(g); unlock('s2'); unlock('s3');
    if (scroll) $('s2').scrollIntoView({behavior: REDUCE ? 'auto' : 'smooth', block:'start'});
  }

  renderGroups($('groups'), pick);
  renderDetails(null);

  // Arriving from the main page with #group pre-selects it
  const fromHash = GROUPS.find(g => '#' + g.id === location.hash);
  if (fromHash) {
    const btn = $('groups').querySelector('[data-id="' + fromHash.id + '"]');
    if (btn) btn.setAttribute('aria-pressed','true');
    pick(fromHash, false);
  }

  essay.addEventListener('input', updateCount);
  $('reset').addEventListener('click', () => { if(current){ essay.value = current.dl; updateCount(); toast('Back to the original'); } });

  $('go').href = CONFIG.deansFormUrl;
  $('go').addEventListener('click', () => {
    if(!current) return;
    copyText(essay.value.trim()).then(ok => toast(ok ? 'Nomination copied. Paste it into the “why” box.' : 'Copy didn’t work. Select the text in step 2 and copy it.'));
  });

  $('done').addEventListener('click', () => {
    const t = $('thanks'); t.classList.add('show'); confetti();
    t.scrollIntoView({behavior: REDUCE ? 'auto' : 'smooth', block:'center'});
    countOnce('papa-dean-done', ['deans-done'].concat(current ? ['deans-done-' + current.id] : []));
  });
})();