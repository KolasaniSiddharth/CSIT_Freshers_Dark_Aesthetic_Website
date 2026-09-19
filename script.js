const cursor = document.querySelector('.cursor-glow');
window.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) entry.target.classList.add('visible');
  });
}, {threshold:.12});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];
function resize(){ canvas.width=innerWidth; canvas.height=innerHeight; }
resize(); addEventListener('resize', resize);
function seed(){
  particles = Array.from({length: 90}, () => ({
    x:Math.random()*canvas.width, y:Math.random()*canvas.height,
    r:Math.random()*1.6+.2, vx:(Math.random()-.5)*.18, vy:(Math.random()-.5)*.18,
    a:Math.random()*.55+.1
  }));
}
seed();
function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p=>{
    p.x+=p.vx; p.y+=p.vy;
    if(p.x<0)p.x=canvas.width;if(p.x>canvas.width)p.x=0;
    if(p.y<0)p.y=canvas.height;if(p.y>canvas.height)p.y=0;
    ctx.globalAlpha=p.a; ctx.fillStyle='#d4a0ad';
    ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();
  });
  requestAnimationFrame(animate);
}
animate();
