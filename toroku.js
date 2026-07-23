(function() {
  // 完了画面のHTMLに書き換える関数
  function showThanksPage() {
    document.body.innerHTML = `
      <div style="text-align: center; margin-top: 50px; padding: 20px; font-family: sans-serif;">
        <h2 style="color: #333;">参加登録が完了しました</h2>
        <p>ご登録ありがとうございます。<br>※この画面はそのまま閉じてかまいません。</p>
      </div>
    `;
    // 別のページに飛ばしたい場合は上のinnerHTMLを消して、以下の行の「//」を外してURLを指定します
    // window.location.href = "https://example.com/thanks.html";
  }

  // --- 1. Fetch API (最近の通信方式) を監視 ---
  const originalFetch = window.fetch;
  window.fetch = async function(...args) {
    const response = await originalFetch.apply(this, args);
    const options = args[1] || {};
    const method = options.method ? options.method.toUpperCase() : 'GET';
    
    // POST（データ送信）リクエストが成功（ステータス200番台）した場合
    if (response.ok && method === 'POST') {
        // システム側の処理が終わるのを少し待ってから画面を切り替え
        setTimeout(showThanksPage, 500); 
    }
    return response;
  };

  // --- 2. XMLHttpRequest (従来の通信方式) を監視 ---
  const originalOpen = XMLHttpRequest.prototype.open;
  const originalSend = XMLHttpRequest.prototype.send;
  
  XMLHttpRequest.prototype.open = function(method, url, ...rest) {
    this._requestMethod = method.toUpperCase();
    return originalOpen.call(this, method, url, ...rest);
  };
  
  XMLHttpRequest.prototype.send = function(...args) {
    this.addEventListener('load', function() {
        // 送信が成功（ステータス200番台）した場合
        if (this.status >= 200 && this.status < 300 && this._requestMethod === 'POST') {
            setTimeout(showThanksPage, 500);
        }
    });
    return originalSend.apply(this, args);
  };
})();