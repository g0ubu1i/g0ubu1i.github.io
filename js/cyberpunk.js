(function () {
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
