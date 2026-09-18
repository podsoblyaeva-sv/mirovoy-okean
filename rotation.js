'use strict';
(()=>{
 const foot=document.querySelector('.globe-footer');
 const toggle=document.createElement('button');toggle.id='globe-auto';toggle.className='text-btn';toggle.type='button';toggle.textContent='⏸ Пауза';toggle.setAttribute('aria-label','Приостановить вращение глобуса');toggle.setAttribute('aria-pressed','true');foot.insertBefore(toggle,document.getElementById('reset-globe'));
 let enabled=true,last=0,raf=0,hold=0;
 function update(){toggle.textContent=enabled?'⏸ Пауза':'▶ Вращать';toggle.setAttribute('aria-pressed',String(enabled));toggle.setAttribute('aria-label',enabled?'Приостановить вращение глобуса':'Запустить вращение глобуса')}
 toggle.onclick=()=>{enabled=!enabled;update();last=0};
 const pauseBriefly=()=>{hold=performance.now()+1600};
 document.getElementById('ocean-buttons').addEventListener('click',pauseBriefly);document.getElementById('reset-globe').addEventListener('click',pauseBriefly);canvas.addEventListener('pointerdown',()=>{hold=Infinity});canvas.addEventListener('pointerup',pauseBriefly);canvas.addEventListener('pointercancel',pauseBriefly);
 function tick(t){if(document.hidden||document.getElementById('oceans').hidden){last=0;raf=0;return}const dt=last?Math.min((t-last)/1000,.05):0;last=t;if(enabled&&!mapMode&&t>hold){rotation[0]+=dt*6;drawWorld()}raf=requestAnimationFrame(tick)}
 function start(){if(!raf&&!document.hidden&&!document.getElementById('oceans').hidden){last=0;raf=requestAnimationFrame(tick)}}
 new MutationObserver(start).observe(document.getElementById('oceans'),{attributes:true,attributeFilter:['hidden']});document.addEventListener('visibilitychange',start);start();
 document.querySelector('#globe-hint').textContent='Вращается само · можно повернуть вручную';
})();
