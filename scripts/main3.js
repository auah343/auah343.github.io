

// 初始化页面
document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.article-container');

    articles.forEach(article => {
        const articleEl = document.createElement('article');
        articleEl.className = 'article-card';
        articleEl.dataset.id = article.id;
        articleEl.innerHTML = `
            <div class="article-header">
                <h2>${article.title}</h2>
                <span class="article-date">${article.date}</span>
            </div>
            <div class="article-content">
                <p>${article.content}</p>
            </div>
            <div class="article-footer">
                <button class="like-btn">
                    <span class="like-icon">❤️</span>
                    <span class="like-count">${article.likes}</span>
                </button>
            </div>
        `;

        // 添加点赞功能
        const likeBtn = articleEl.querySelector('.like-btn');
        const likeCount = articleEl.querySelector('.like-count');

        likeBtn.addEventListener('click', () => {
            const newCount = parseInt(likeCount.textContent) + 1;
            likeCount.textContent = newCount;
            localStorage.setItem(`article_${article.id}_likes`, newCount);

            // 添加动画效果
            likeBtn.style.transform = 'scale(1.1)';
            setTimeout(() => {
                likeBtn.style.transform = 'scale(1)';
            }, 200);
        });

        container.appendChild(articleEl);
    });
});

