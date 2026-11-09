// ===== script.js: Reconciliation League page (index.html) =====
(function(){
  const essay = $('essay'), count = $('count'), go = $('go');
  let current = null;

  loadPhoto();

  // FormAssembly field IDs from the ALU form
  function formLink(){
    const p = new URLSearchParams();
    p.set('tfa_2', NAME.first);
    p.set('tfa_3', NAME.last);
    p.set('tfa_1654', 'tfa_1655');          // Campus: ALU
    p.set('tfa_1662', NAME.year);
    if (essay.value.trim()) p.set('tfa_1652', essay.value.trim());
    return CONFIG.formUrl + '?' + p.toString();
  }
  function refreshLink(){ go.href = formLink(); }

  function updateCount(){
    const n = wordCount(essay.value);
    count.textContent = n + ' words' + (n < 100 ? ', needs at least 100' : n > 150 ? ', trim it to 150 or fewer' : ', perfect');
    count.classList.toggle('bad', n < 100 || n > 150);
  }

  renderGroups($('groups'), g => {
    current = g;
    essay.value = g.rl;
    updateCount(); refreshLink(); unlock('s2'); unlock('s3');
    $('deansLink').href = 'deans.html#' + g.id;
    $('s2').scrollIntoView({behavior: REDUCE ? 'auto' : 'smooth', block:'start'});
  });

  essay.addEventListener('input', () => { updateCount(); refreshLink(); });
  $('reset').addEventListener('click', () => { if(current){ essay.value = current.rl; updateCount(); refreshLink(); toast('Back to the original'); } });

  renderFields($('fields'), [
    ['First name', NAME.first],
    ['Last name', NAME.last],
    ['Campus (pick this option)', 'ALU'],
    ['Year', NAME.year]
  ]);

  refreshLink();
  go.addEventListener('click', () => {
    if(!current) return;
    refreshLink();
    copyText(essay.value.trim()).then(ok => toast(ok ? 'Opening the form. Your essay is copied too, just in case.' : 'Opening the form.'));
  });

  $('done').addEventListener('click', () => {
    const t = $('thanks'); t.classList.add('show'); confetti();
    t.scrollIntoView({behavior: REDUCE ? 'auto' : 'smooth', block:'center'});
    countOnce('papa-rl-done', ['nominated'].concat(current ? ['nominated-' + current.id] : []));
  });
})();