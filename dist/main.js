const heroVideo = document.querySelector('#hero-video');
const heroToggle = document.querySelector('#hero-toggle');
const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
let heroEnabled = !motionPreference.matches;

function syncHeroButton() {
  const paused = heroVideo.paused;
  const label = paused ? 'Play experiment preview' : 'Pause experiment preview';
  heroToggle.setAttribute('aria-label', label);
  heroToggle.title = label;
  heroToggle.querySelector('use').setAttribute('href', paused ? '#icon-play' : '#icon-pause');
}

heroVideo.addEventListener('play', syncHeroButton);
heroVideo.addEventListener('pause', syncHeroButton);
heroToggle.addEventListener('click', () => {
  heroEnabled = heroVideo.paused;
  if (heroEnabled) heroVideo.play().catch(syncHeroButton);
  else heroVideo.pause();
});
motionPreference.addEventListener('change', event => {
  if (event.matches) { heroEnabled = false; heroVideo.pause(); }
});

const heroObserver = new IntersectionObserver(([entry]) => {
  if (entry.isIntersecting && heroEnabled && !document.hidden) heroVideo.play().catch(syncHeroButton);
  else heroVideo.pause();
}, { threshold: 0.15 });
heroObserver.observe(heroVideo);
document.addEventListener('visibilitychange', () => {
  if (document.hidden) heroVideo.pause();
  else if (heroEnabled) {
    const rect = heroVideo.getBoundingClientRect();
    if (rect.bottom > 0 && rect.top < innerHeight) heroVideo.play().catch(syncHeroButton);
  }
});

const demos = {
  bread: { number: '01', title: 'A trace becomes a correction.', copy: 'A short trajectory drawn on the camera view guides the robot toward the toaster. The base policy refines the motion for insertion.', type: 'Visual trajectory prompt', icon: 'route', label: 'Insert bread experiment' },
  cup: { number: '02', title: 'A point makes the goal clear.', copy: 'A target point and directional corrections guide the cup toward the peg. Sparse guidance helps recover the motion while the policy handles the task.', type: 'Point + directional prompts', icon: 'target', label: 'Hang a cup experiment' },
  ball: { number: '03', title: 'A new layout. A little guidance.', copy: 'Guide the ball across an uneven platform toward the flag. Steered rollouts on the unseen layout also provide data for later policy improvement.', type: 'Sparse human guidance', icon: 'move', label: 'Push a ball experiment' }
};
const demoVideo = document.querySelector('#demo-video');
const demoPanel = document.querySelector('#demo-panel');
const tabs = [...document.querySelectorAll('[data-demo]')];

function selectDemo(tab) {
  if (tab.getAttribute('aria-selected') === 'true') return;
  const key = tab.dataset.demo;
  const demo = demos[key];
  demoVideo.pause();
  tabs.forEach(item => {
    const selected = item === tab;
    item.setAttribute('aria-selected', String(selected));
    item.tabIndex = selected ? 0 : -1;
  });
  demoPanel.setAttribute('aria-labelledby', tab.id);
  demoVideo.poster = `assets/${key}-poster.jpg`;
  demoVideo.querySelector('source').src = `assets/${key}.mp4`;
  demoVideo.setAttribute('aria-label', demo.label);
  demoVideo.load();
  document.querySelector('#demo-number').textContent = demo.number;
  document.querySelector('#demo-title').textContent = demo.title;
  document.querySelector('#demo-copy').textContent = demo.copy;
  document.querySelector('#demo-type').textContent = demo.type;
  document.querySelector('#demo-icon').setAttribute('href', `#icon-${demo.icon}`);
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectDemo(tab));
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next !== undefined) { event.preventDefault(); selectDemo(tabs[next]); tabs[next].focus(); }
  });
});

// Keep recorded experiments from competing for attention or audio.
document.querySelectorAll('video').forEach(video => {
  video.addEventListener('play', () => {
    document.querySelectorAll('video').forEach(other => {
      if (other !== video) other.pause();
    });
  });
});
