const params = new URLSearchParams(window.location.search);
const url = params.get('console-url');
const iframe = document.getElementById('rails-console');

iframe.src = url || 'data:text/html,<p style="font-family:monospace;">Rails console not available.</p>';
