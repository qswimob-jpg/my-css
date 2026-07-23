// ページ全体を監視し、submitイベントが発生した時だけキャッチする手法（イベントデリゲーション）
document.addEventListener("submit", function(e) {
  // 送信元がフォームであるか確認
  if (e.target && e.target.tagName === 'FORM') {
    e.preventDefault(); // デフォルトの画面遷移を停止
    
    const form = e.target;
    const submitButton = form.querySelector('input[type="submit"], button[type="submit"]');
    if (submitButton) submitButton.disabled = true;
    
    fetch(form.action, {
      method: form.method || "POST",
      body: new FormData(form)
    })
    .then(response => {
      if (response.ok) {
        // 完了メッセージに書き換え
        document.body.innerHTML = `
          <div style="text-align: center; margin-top: 50px;">
            <h2>参加登録が完了しました</h2>
            <p>ご登録ありがとうございます。</p>
          </div>
        `;
      } else {
        alert("送信に失敗しました。");
        if (submitButton) submitButton.disabled = false;
      }
    })
    .catch(error => {
      alert("通信エラーが発生しました。");
      if (submitButton) submitButton.disabled = false;
    });
  }
});