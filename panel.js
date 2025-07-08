const params = new URLSearchParams(window.location.search);
const url = params.get('console-url');
const iframe = document.getElementById('rails-console');

function cacheBust(url) {
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}_ts=${Date.now()}`;
}

iframe.src = cacheBust(url) || 'data:text/html,<p style="font-family:monospace;">Rails console not available.</p>';
