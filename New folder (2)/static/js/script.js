// script.js
const startBtn = document.getElementById('startBtn');
const intro = document.getElementById('intro');
const gameRoot = document.getElementById('gameRoot');
const bgAudio = document.getElementById('bgAudio');
const clickSfx = document.getElementById('clickSfx');
const successSfx = document.getElementById('successSfx');

const checkBtn = document.getElementById('checkBtn');
const restartBtn = document.getElementById('restartBtn');
const guessInput = document.getElementById('guessInput');
const messageDiv = document.getElementById('message');
const attemptsSpan = document.getElementById('attempts');

let attempts = 0;

// Start game (user interaction to allow audio autoplay)
startBtn.addEventListener('click', async () => {
  playClick();
  // small delay for dramatic effect
  intro.classList.add('hidden');
  await sleep(250);
  gameRoot.classList.remove('hidden');
  // start bg audio
  try {
    bgAudio.volume = 0.2;
    await bgAudio.play();
  } catch (e) {
    console.warn('Autoplay blocked: user interaction required for sound.');
  }
  // focus input
  guessInput.focus();
  // subtle pulse
  document.querySelector('.card').animate([{transform:'translateZ(30px) scale(1)'},{transform:'translateZ(40px) scale(1.01)'}],{duration:900,iterations:1,easing:'ease-out'});
});

// helper sleep
function sleep(ms){ return new Promise(r => setTimeout(r, ms)); }

// play click
function playClick(){ if(clickSfx) { clickSfx.currentTime=0; clickSfx.play().catch(()=>{}); } }
// play success
function playSuccess(){ if(successSfx) { successSfx.currentTime=0; successSfx.play().catch(()=>{}); } }

// fetch helper
async function postJSON(url, data){
  const res = await fetch(url, {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify(data)
  });
  return res.json();
}

const celebrateSfx = document.getElementById('celebrateSfx');

function playCelebrate(){
    if(celebrateSfx){
        celebrateSfx.currentTime=0;
        celebrateSfx.play().catch(()=>{});
    }
}

// check guess
checkBtn.addEventListener('click', async () => {
  playClick();
  const val = guessInput.value.trim();
  if(!val){ showMsg('Enter a number between 1 and 100'); return; }
  // visual click pop
  checkBtn.animate([{transform:'translateY(0)'},{transform:'translateY(-6px)'}],{duration:140,iterations:1,easing:'ease-out'});
  try {
    const resp = await postJSON('/guess', { guess: val });
    if(resp.status === 'ok'){
      attempts = resp.attempts || attempts+1;
      attemptsSpan.textContent = attempts;
      if(resp.result === 'low'){
        showMsg('📉 Too low — go higher!', true);
      } else if(resp.result === 'high'){
        showMsg('📈 Too high — go lower!', true);
      } else if(resp.result === 'correct'){
        showMsg(`🎉 Correct! You won in ${resp.attempts} tries!`, false,true);
        playSuccess();
        playCelebrate();
        // flare animation
        flareWin();
      }
    } else {
      showMsg('Error: ' + (resp.message || 'Try again'));
    }
  } catch (err) {
    console.error(err);
    showMsg('Server error — try refreshing');
  }
});

// restart
restartBtn.addEventListener('click', async () => {
  playClick();
  const res = await postJSON('/restart', {});
  if(res.status === 'ok'){
    attempts = 0;
    attemptsSpan.textContent = attempts;
    showMsg('🔄 Game reset. New number generated!', true);
    guessInput.value = '';
    guessInput.focus();
  } else {
    showMsg('Could not restart. Try refresh.');
  }
});

// show message with style
function showMsg(text, subtle=false, celebrate=false){
  messageDiv.style.display = 'block';
  messageDiv.textContent = text;
  if(celebrate){
    messageDiv.style.background = 'linear-gradient(90deg, rgba(0,255,180,0.5), rgba(255,0,200,0.5))';
    messageDiv.style.color = '#021';
  } else {
    messageDiv.style.background = 'linear-gradient(90deg, rgba(0,245,255,0.35), rgba(255,0,193,0.35))';
    messageDiv.style.color = '#001825';
  }
  // small pop
  messageDiv.animate([{transform:'scale(0.96)',opacity:0},{transform:'scale(1)',opacity:1}],{duration:260,easing:'cubic-bezier(.2,.9,.2,1)'});
}

// small win flare animation
function flareWin(){
  const ring = document.createElement('div');
  ring.style.position='absolute';
  ring.style.width='360px';
  ring.style.height='360px';
  ring.style.borderRadius='50%';
  ring.style.border='2px solid rgba(255,255,255,0.06)';
  ring.style.left='50%';
  ring.style.top='50%';
  ring.style.transform='translate(-50%,-50%)';
  ring.style.zIndex='1';
  ring.style.pointerEvents='none';
  document.querySelector('.card').appendChild(ring);
  ring.animate([{opacity:1,transform:'scale(0.6)'},{opacity:0,transform:'scale(1.4)'}],{duration:900, easing:'ease-out'}).onfinish = ()=> ring.remove();
}

// PARTICLE BACKGROUND (simple)
(function particles(){
  const canvas = document.getElementById('bgCanvas');
  const ctx = canvas.getContext('2d');
  let w=canvas.width=innerWidth, h=canvas.height=innerHeight;
  window.addEventListener('resize', ()=>{ w=canvas.width=innerWidth; h=canvas.height=innerHeight; });

  const N = Math.floor((w*h)/60000)*40 + 40; // scale particles by screen
  const parts = [];
  for(let i=0;i<N;i++){
    parts.push({
      x: Math.random()*w,
      y: Math.random()*h,
      r: Math.random()*1.6 + 0.4,
      vx: (Math.random()-0.5)*0.2,
      vy: -0.1 - Math.random()*0.3,
      hue: Math.random()*360
    });
  }

  function frame(){
    ctx.clearRect(0,0,w,h);
    for(let p of parts){
      p.x += p.vx; p.y += p.vy;
      if(p.y < -10){ p.y = h + 10; p.x = Math.random()*w; }
      if(p.x < -10) p.x = w + 10;
      if(p.x > w + 10) p.x = -10;
      ctx.beginPath();
      ctx.fillStyle = `hsla(${(p.hue+200)%360}, 90%, 60%, 0.06)`;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fill();
    }
    requestAnimationFrame(frame);
  }
  frame();
})();

