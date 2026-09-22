const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
const manualVideos = [...document.querySelectorAll('video:not([data-loop-video])')];
const loopPlayers = [...document.querySelectorAll('[data-loop-player]')].map(container => {
  const video = container.querySelector('[data-loop-video]');
  const button = container.querySelector('[data-loop-toggle]');
  const state = { video, button, inView: false, enabled: !motionPreference.matches };
  state.updateButton = () => {
    const label = `${video.paused ? 'Play' : 'Pause'} ${container.dataset.label}`;
    button.setAttribute('aria-label', label);
    button.title = label;
    button.querySelector('use').setAttribute('href', video.paused ? '#icon-play' : '#icon-pause');
  };
  video.addEventListener('play', state.updateButton);
  video.addEventListener('pause', state.updateButton);
  button.addEventListener('click', () => {
    state.enabled = video.paused;
    if (state.enabled) manualVideos.forEach(other => other.pause());
    syncLoops();
  });
  return state;
});

function syncLoops() {
  const suspended = document.hidden || manualVideos.some(video => !video.paused);
  for (const player of loopPlayers) {
    if (player.inView && player.enabled && !suspended) player.video.play().catch(player.updateButton);
    else player.video.pause();
  }
}

// Silent previews may play together; full videos suspend those loops.
const loopObserver = new IntersectionObserver(entries => {
  for (const entry of entries) {
    loopPlayers.find(player => player.video === entry.target).inView = entry.isIntersecting;
  }
  syncLoops();
}, { threshold: 0.2 });
loopPlayers.forEach(player => loopObserver.observe(player.video));
document.addEventListener('visibilitychange', syncLoops);
motionPreference.addEventListener('change', event => {
  if (event.matches) loopPlayers.forEach(player => { player.enabled = false; });
  syncLoops();
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

manualVideos.forEach(video => {
  video.addEventListener('play', () => {
    manualVideos.forEach(other => {
      if (other !== video) other.pause();
    });
    syncLoops();
  });
  video.addEventListener('pause', syncLoops);
  video.addEventListener('ended', syncLoops);
});
