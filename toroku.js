document.addEventListener("DOMContentLoaded", function() {
  const form = document.querySelector("form");
  
  if (form) {
    form.addEventListener("submit", function(e) {
      // 1. デフォルトの送信処理（画面のリロード）を停止
      e.preventDefault(); 
      
      const submitButton = form.querySelector('input[type="submit"], button[type="submit"]');
      if (submitButton) submitButton.disabled = true; // 二重送信防止
      
      // 2. 非同期（バックグラウンド）でデータを送信
      fetch(form.action, {
        method: form.method || "POST",
        body: new FormData(form)
      })
      .then(response => {
        if (response.ok) {
          // 3-A. 送信成功後、画面に完了メッセージを表示させる場合
          document.body.innerHTML = `
            <div style="text-align: center; margin-top: 50px;">
              <h2>参加登録が完了しました</h2>
              <p>ご登録ありがとうございます。詳細が決まり次第ご連絡いたします。</p>
            </div>
          `;
          
          // 3-B. 別のサンクスページにリダイレクトさせる場合はこちらを使用
          // window.location.href = "https://example.com/thanks.html";
        } else {
          alert("送信に失敗しました。時間をおいて再度お試しください。");
          if (submitButton) submitButton.disabled = false;
        }
      })
      .catch(error => {
        alert("通信エラーが発生しました。");
        if (submitButton) submitButton.disabled = false;
      });
    });
  }
});