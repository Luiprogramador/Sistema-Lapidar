(function() {
    const link = document.createElement('link');
    link.rel = 'icon';
    
    // Identifica se a página atual está na raiz ou na pasta 'pages'
    if (window.location.pathname.includes('/pages/')) {
        link.href = '../assets/favicon.png'; // Caminho se estiver na pasta pages
    } else {
        link.href = './assets/favicon.png';  // Caminho se estiver na raiz (index.html)
    }
    
    // Caso use formato .ico, mude para: 'image/x-icon'
    link.type = 'image/png'; 
    
    document.head.appendChild(link);
})();
