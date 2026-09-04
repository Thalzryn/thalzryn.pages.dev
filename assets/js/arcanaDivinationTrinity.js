const allCards = [
    { image: 'https://img.thalzryn.com/arcanaDivination/spire_front.png', meaning: '建築相關的事情/創造的成功與靈感的乍現。', name: '建築神之塔 [正位] 建築與工藝之神比爾格', position: 1 },
    { image: 'https://img.thalzryn.com/arcanaDivination/ewer_front.png', meaning: '學術相關的事情/知識與情感的流動。', name: '河流神之瓶 [正位] 河流與知識之神沙利亞克', position: 2 },
    { image: 'https://img.thalzryn.com/arcanaDivination/bole_front.png', meaning: '大地、農業相關的事情/穩固和豐饒的生命力。', name: '世界樹之幹 [正位] 大地與豐饒女神諾菲卡', position: 3 },
    { image: 'https://img.thalzryn.com/arcanaDivination/arrow_front.png', meaning: '水、海、船相關的事情/未來的探索和新的冒險。', name: '放浪神之箭 [正位] 海洋與航海女神利姆萊茵', position: 4 },
    { image: 'https://img.thalzryn.com/arcanaDivination/balance_front.png', meaning: '法律、審判相關的事情/光明和公正的審判。', name: '太陽神之衡 [正位] 太陽與審理女神阿澤瑪', position: 5 },
    { image: 'https://img.thalzryn.com/arcanaDivination/spear_front.png', meaning: '戰鬥相關的事情/戰鬥的勝利和決心。', name: '戰爭神之槍 [正位] 冰河與戰爭女神哈羅妮', position: 6 },
    { image: 'https://img.thalzryn.com/arcanaDivination/spire_back.png', meaning: '挑戰與苦難的考驗。', name: '建築神之塔 [逆位] 彗星與破壞之神拉爾戈', position: -1 },
    { image: 'https://img.thalzryn.com/arcanaDivination/ewer_back.png', meaning: '情感與知識的阻滯與混亂。', name: '河流神之瓶 [逆位] 行星與命運女神妮美雅', position: -2 },
    { image: 'https://img.thalzryn.com/arcanaDivination/bole_back.png', meaning: '時間的緊迫和自身的不穩定。', name: '世界樹之幹 [逆位] 重力與光陰之神阿爾基克', position: -3 },
    { image: 'https://img.thalzryn.com/arcanaDivination/arrow_back.png', meaning: '迷失與不安的方向。', name: '放浪神之箭 [逆位] 山嶽與放浪之神奧修昂', position: -4 },
    { image: 'https://img.thalzryn.com/arcanaDivination/balance_back.png', meaning: '商業交易的損失和未知的挑戰。', name: '太陽神之衡 [逆位] 地底與商貿之神納爾札爾', position: -5 },
    { image: 'https://img.thalzryn.com/arcanaDivination/spear_back.png', meaning: '衝突的結束和和平的重返。', name: '戰爭神之槍 [逆位] 雙月與慈愛女神梅茵菲娜', position: -6 }
];

function drawCards() {
    const cardContainer = document.getElementById('cardContainer');
    cardContainer.innerHTML = '';

    const drawnCards = [];
    const availableCards = [...allCards];

    for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * availableCards.length);
        const randomCard = availableCards.splice(randomIndex, 1)[0];

        drawnCards.push(randomCard);
        

        const positionP = document.createElement('p');
        if (i === 0) {
            positionP.textContent = '過去';
        } else if (i === 1) {
            positionP.textContent = '現在';
        } else {
            positionP.textContent = '未來';
        }
        cardContainer.appendChild(positionP);

        const cardImage = document.createElement('img');
        cardImage.src = randomCard.image;
        cardImage.alt = '卡牌';
        cardContainer.appendChild(cardImage);


        const nameP = document.createElement('p');
        nameP.textContent = randomCard.name;
        cardContainer.appendChild(nameP);

        const meaningP = document.createElement('p');
        meaningP.textContent = '意義：' + randomCard.meaning;
        cardContainer.appendChild(meaningP);

        // 移除相應的逆位或正位卡
        const positionToRemove = randomCard.position > 0 ? -randomCard.position : Math.abs(randomCard.position);
        const indexToRemove = availableCards.findIndex(card => card.position === positionToRemove);
        if (indexToRemove !== -1) {
            availableCards.splice(indexToRemove, 1);
        }
    }
}

const drawnCards = [
    { image: 'https://img.thalzryn.com/arcanaDivination/spire_front.png', name: '[正位] 建築與工藝之神比爾格', meaning: '第一張卡的正面意義' },
    { image: 'https://img.thalzryn.com/arcanaDivination/ewer_front.png', name: '[正位] 河流與知識之神沙利亞克', meaning: '第二張卡的正面意義' },
    { image: 'https://img.thalzryn.com/arcanaDivination/bole_front.png', name: '[正位] 大地與豐饒女神諾菲卡', meaning: '第三張卡的正面意義' },
];

const cardContainer = document.getElementById('cardContainer');

drawnCards.forEach(card => {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';
    cardDiv.innerHTML = `
        <img src="${card.image}" alt="卡牌">
        <p>卡牌名稱：${card.name}</p>
        <p>卡牌意義：${card.meaning}</p>
    `;
    cardContainer.appendChild(cardDiv);
});
document.addEventListener('DOMContentLoaded', () => {
    const cardContainer = document.getElementById('cardContainer');
    cardContainer.innerHTML = '';
});