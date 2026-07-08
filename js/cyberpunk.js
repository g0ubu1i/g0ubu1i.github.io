(function () {
  var prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var progress = document.createElement('div');
  progress.className = 'read-progress';
  progress.setAttribute('aria-hidden', 'true');
  document.body.appendChild(progress);

  function updateProgress() {
    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - window.innerHeight;
    var ratio = height > 0 ? Math.min(1, Math.max(0, scrollTop / height)) : 0;
    progress.style.transform = 'scaleX(' + ratio + ')';
  }

  updateProgress();
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);

  if (!prefersReducedMotion) {
    window.addEventListener('pointermove', function (event) {
      document.documentElement.style.setProperty('--cursor-x', event.clientX + 'px');
      document.documentElement.style.setProperty('--cursor-y', event.clientY + 'px');
    }, { passive: true });
  }

  var revealItems = document.querySelectorAll('.post-card, .archive-item, .post-content > *, .toc-panel');
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    revealItems.forEach(function (item) {
      item.classList.add('reveal-item');
    });
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revealItems.forEach(function (item) {
      observer.observe(item);
    });
  }

  var blocks = Array.prototype.slice.call(document.querySelectorAll('figure.highlight, .post-content pre')).filter(function (block) {
    return block.matches('figure.highlight') || !block.closest('figure.highlight');
  });
  blocks.forEach(function (block) {
    if (block.dataset.copyReady === 'true') return;
    block.dataset.copyReady = 'true';
    var button = document.createElement('button');
    button.className = 'copy-code';
    button.type = 'button';
    button.textContent = '复制';
    button.setAttribute('aria-label', '复制代码块');
    button.addEventListener('click', function () {
      var code = block.querySelector('td.code pre, code, pre');
      if (!code) return;
      navigator.clipboard.writeText(code.innerText).then(function () {
        button.textContent = '已复制';
        setTimeout(function () { button.textContent = '复制'; }, 1400);
      });
    });
    block.appendChild(button);
  });
})();
