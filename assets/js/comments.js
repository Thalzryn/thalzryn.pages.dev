const API_URL = "https://api.thalzryn.com";

document.addEventListener("DOMContentLoaded", () => {
    const listEl = document.getElementById("comments-list");
    const formEl = document.getElementById("comment-form");
    const submitBtn = document.getElementById("submit-btn");

    if (!listEl || !formEl || !submitBtn) return;

    const escapeHtml = str => str.replace(/[&<>"']/g, m => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[m]));

    // 1. 取得並渲染留言列表
    async function fetchComments() {
        try {
            const res = await fetch(API_URL, { method: "GET" });
            const data = await res.json();
            
            if (data.success && data.comments && data.comments.length > 0) {
                listEl.innerHTML = data.comments.map(c => `
                    <div class="comment-item">
                        <div class="comment-header">
                            <span class="comment-nickname">${escapeHtml(c.nickname)}</span>
                            <span class="comment-date">${new Date(c.created_at).toLocaleString('zh-TW', { hour12: false })}</span>
                        </div>
                        <p class="comment-content">${escapeHtml(c.content)}</p>
                    </div>
                `).join("");
            } else if (data.success) {
                listEl.innerHTML = '<p class="comment-state-text">目前尚無留言，歡迎留下第一條留言。</p>';
            } else {
                listEl.innerHTML = `<p class="comment-state-text">載入失敗：${escapeHtml(data.error || "未知錯誤")}</p>`;
            }
        } catch (e) {
            listEl.innerHTML = '<p class="comment-state-text">網絡連線失敗，請稍後再試。</p>';
        }
    }

    // 2. 傳送新留言
    formEl.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        const nickname = document.getElementById("nickname").value.trim();
        const content = document.getElementById("content").value.trim();
        const turnstileToken = formEl.querySelector('[name="cf-turnstile-response"]')?.value;

        if (!nickname || !content) return;
        
        if (!turnstileToken) {
            alert("請先完成驗證");
            return;
        }

        submitBtn.disabled = true;
        submitBtn.innerText = "傳送中...";

        try {
            const res = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    nickname, 
                    content, 
                    token: turnstileToken 
                })
            });

            const data = await res.json();

            if (data.success) {
                document.getElementById("content").value = "";
                if (window.turnstile) window.turnstile.reset();
                fetchComments();
            } else {
                alert("傳送失敗：" + (data.error || "未知錯誤"));
                if (window.turnstile) window.turnstile.reset();
            }
        } catch (e) {
            alert("網絡錯誤，傳送失敗");
            if (window.turnstile) window.turnstile.reset();
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerText = "傳送留言";
        }
    });

    fetchComments();
});