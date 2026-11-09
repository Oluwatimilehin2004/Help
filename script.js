// ===== script.js: Reconciliation League page (index.html) =====
(function(){
  const essay = $('essay'), count = $('count');
  let current = null;

  loadPhoto();

  function updateCount(){
    const n = wordCount(essay.value);
    count.textContent = n + ' words' + (n < 100 ? ', needs at least 100' : n > 150 ? ', trim it to 150 or fewer' : ', perfect');
    count.classList.toggle('bad', n < 100 || n > 150);
  }

  renderGroups($('groups'), g => {
    current = g;
    essay.value = g.rl;
    updateCount(); unlock('s2'); unlock('s3');
    $('deansLink').href = 'deans.html#' + g.id;
    $('s2').scrollIntoView({behavior: REDUCE ? 'auto' : 'smooth', block:'start'});
  });

  essay.addEventListener('input', updateCount);
  $('reset').addEventListener('click', () => { if(current){ essay.value = current.rl; updateCount(); toast('Back to the original'); } });

  renderFields($('fields'), [
    ['First name', NAME.first],
    ['Last name', NAME.last],
    ['Full name, if the form asks for it', NAME.full],
    ['Student email', NAME.email],
    ['Year of study', NAME.year]
  ]);

  $('go').href = CONFIG.formUrl;
  $('go').addEventListener('click', () => {
    if(!current) return;
    copyText(essay.value.trim()).then(ok => toast(ok ? 'Nomination copied. Paste it into the form.' : 'Copy didn’t work. Select the text in step 2 and copy it.'));
  });

  $('done').addEventListener('click', () => {
    const t = $('thanks'); t.classList.add('show'); confetti();
    t.scrollIntoView({behavior: REDUCE ? 'auto' : 'smooth', block:'center'});
    countOnce('papa-rl-done', ['nominated'].concat(current ? ['nominated-' + current.id] : []));
  });
})();
