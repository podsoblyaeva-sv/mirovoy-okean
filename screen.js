'use strict';
(()=>{
  const find=s=>document.querySelector(s);
  const make=(tag,cls)=>{const el=document.createElement(tag);el.className=cls;return el};
  const extra=make('dialog','lesson-extras');extra.id='lesson-extras';extra.setAttribute('aria-labelledby','extras-title');
  extra.innerHTML='<div class="dialog-heading"><h2 id="extras-title">Подробнее об океане</h2><button class="icon-btn" aria-label="Закрыть пояснения">×</button></div>';
  document.body.append(extra);extra.querySelector('button').onclick=()=>extra.close();
  for(const page of document.querySelectorAll('main > .page')){
    const box=make('div','extra-section');box.dataset.page=page.id;
    for(const e of [...page.children]) if(e.matches('.note,.source-note,.two-cards'))box.append(e);
    extra.append(box);
    const head=page.querySelector('.page-heading,.hero-copy');
    const more=make('button','more-button');more.type='button';more.textContent='Подробнее';
    more.onclick=()=>{extra.querySelectorAll('.extra-section').forEach(e=>e.hidden=e.dataset.page!==page.id);extra.showModal()};head.append(more);
    page.querySelectorAll(':scope > .next-section').forEach(e=>e.hidden=true);
  }
  const sources=make('button','sources-button');sources.textContent='Источники и пояснения';sources.onclick=()=>find('#sources-dialog').showModal();extra.append(sources);
  const hero=find('.hero'),copy=find('.hero-copy');copy.classList.add('page-heading');
  copy.querySelector('h1').innerHTML='Мировой <em>океан (1).</em>';
  const side=make('div','ocean-side');side.append(find('.globe-selection'),hero.querySelector('.detail-card'));hero.append(side);
  // Keep the textbook introduction accessible without duplicating it above the globe.
  for(const el of [copy.querySelector('.lead'),copy.querySelector('.hero-meta')])extra.querySelector('[data-page="oceans"]').prepend(el);
  find('#explore').hidden=true;find('.hero-tip').hidden=true;
  find('#coasts-title').innerHTML='Море, залив или <em>пролив?</em>';
  const coasts=find('#coasts'),mode=make('div','coast-modes');mode.innerHTML='<button class="active" aria-pressed="true">Понятия</button><button aria-pressed="false">Примеры проливов</button>';
  coasts.querySelector('.page-heading').after(mode);
  const concepts=make('div','concept-pane');concepts.append(find('#coast-tabs'),find('.coast-layout'));
  const straitsPane=make('div','straits-pane');straitsPane.hidden=true;straitsPane.append(find('#strait-buttons'),find('.strait-card'),find('#strait-note'));
  coasts.querySelector('.subheading').hidden=true;coasts.append(concepts,straitsPane);
  [...mode.children].forEach((b,i)=>b.onclick=()=>{concepts.hidden=!!i;straitsPane.hidden=!i;[...mode.children].forEach((x,j)=>{x.classList.toggle('active',i===j);x.setAttribute('aria-pressed',String(i===j))})});
  const modelPage=find('#model'),modelStage=make('div','model-stage');modelStage.append(find('.model-wrap'),find('.model-info'));modelPage.append(modelStage);
  const life=find('#life'),lifeStage=make('div','life-stage');lifeStage.append(find('#creature-grid'),find('#creature-detail'));life.append(lifeStage);
  extra.querySelector('[data-page="life"]').prepend(find('.life-banner'));
  // Resize the drawing to its actual available area, including after tab changes.
  new ResizeObserver(()=>requestAnimationFrame(resizeGlobe)).observe(find('#world'));
  const alignLabels=()=>{const host=find('#model-canvas'),labels=find('#model-labels');labels.style.top=host.offsetTop+'px';labels.style.height=host.clientHeight+'px';labels.style.bottom='auto'};
  new ResizeObserver(alignLabels).observe(find('#model-canvas'));
  window.addEventListener('hashchange',()=>go(location.hash.slice(1)));
  requestAnimationFrame(resizeGlobe);
})();
