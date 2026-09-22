const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
const manualVideos = [...document.querySelectorAll('video:not([data-loop-video])')];
const loopPlayers = [...document.querySelectorAll('[data-loop-player]')].map(container => {
  const video = container.querySelector('[data-loop-video]');
  const state = { video, inView: false, enabled: !motionPreference.matches };
  video.setAttribute('role', 'button');
  video.tabIndex = 0;
  state.updateLabel = () => {
    const label = `${video.paused ? 'Play' : 'Pause'} ${container.dataset.label}`;
    video.setAttribute('aria-label', label);
  };
  const toggle = () => {
    state.enabled = video.paused;
    if (state.enabled) manualVideos.forEach(other => other.pause());
    syncLoops();
  };
  state.updateLabel();
  video.addEventListener('play', state.updateLabel);
  video.addEventListener('pause', state.updateLabel);
  video.addEventListener('click', toggle);
  video.addEventListener('keydown', event => {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      toggle();
    }
  });
  return state;
});

function syncLoops() {
  const suspended = document.hidden || manualVideos.some(video => !video.paused);
  for (const player of loopPlayers) {
    if (player.inView && player.enabled && !suspended) player.video.play().catch(player.updateLabel);
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
  bread: { title: 'A trace becomes a correction.', copy: 'A short trajectory drawn on the camera view guides the robot toward the toaster. The base policy refines the motion for insertion.', label: 'Insert bread experiment' },
  cup: { title: 'A point and a coarse direction.', copy: 'A point prompt specifies where the end effector should go, while a coarse directional prompt adjusts its motion in the robot\'s global frame. Together, these sparse inputs steer the cup onto the peg.', label: 'Hang a cup experiment' },
  ball: { title: 'A new layout. A little guidance.', copy: 'We train the policy on multiple layouts and deploy it on an unseen layout where it fails to complete the task autonomously. Human steering enables completion, and the resulting steered rollouts can be used for online training to teach the policy the new layout.', label: 'Push a ball experiment' }
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
