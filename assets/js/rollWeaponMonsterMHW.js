function generateNumbers() {
    const excludeNumbers = [];
    if (document.getElementById('exclude18').checked) excludeNumbers.push(18);
    if (document.getElementById('exclude32').checked) excludeNumbers.push(32);
    if (document.getElementById('exclude63').checked) excludeNumbers.push(63);
    if (document.getElementById('exclude69').checked) excludeNumbers.push(69);
    if (document.getElementById('exclude70').checked) excludeNumbers.push(70);
    if (document.getElementById('exclude71').checked) excludeNumbers.push(71);

    const firstGroupMin = 1;
    const firstGroupMax = 14;
    const secondGroupMin = 1;
    const secondGroupMax = 71;

    const selectedGroup = document.getElementById('selectGroup').value;

    let resultHTML = '';

    if (selectedGroup === 'firstGroup' || selectedGroup === 'bothGroups') {
      const randomNum1 = Math.floor(Math.random() * (firstGroupMax - firstGroupMin + 1)) + firstGroupMin;
      resultHTML += `<p>  ${randomNum1} - ${getFirstGroupText(randomNum1)}</p>`;
    }

    if (selectedGroup === 'secondGroup' || selectedGroup === 'bothGroups') {
      let randomNum2;
      do {
        randomNum2 = Math.floor(Math.random() * (secondGroupMax - secondGroupMin + 1)) + secondGroupMin;
      } while (excludeNumbers.includes(randomNum2));

      resultHTML += `<p>  ${randomNum2} - ${getSecondGroupText(randomNum2)}</p>`;
    }

    document.getElementById('result').innerHTML = resultHTML;
  }

  function getFirstGroupText(number) {
    switch (number) {
      case 1:
        return '大劍';
      case 2:
        return '太刀';
      case 3:
        return '單手劍';
      case 4:
        return '雙劍';
      case 5:
        return '大錘';
      case 6:
        return '狩獵笛';
      case 7:
        return '長槍';
      case 8:
        return '銃槍';
      case 9:
        return '斬擊斧';
      case 10:
        return '充能斧';
      case 11:
        return '操蟲棍';
      case 12:
        return '輕弩槍';
      case 13:
        return '重弩槍';
      case 14:
        return '弓箭';
      default:
        return `武器 ${number}`;
    }
  }

  function getSecondGroupText(number) {
    switch (number) {
      case 1:
        return '大兇豺龍';
      case 2:
        return '搔鳥';
      case 3:
        return '毒妖鳥';
      case 4:
        return '土砂龍';
      case 5:
        return '泥魚龍';
      case 6:
        return '飛雷龍';
      case 7:
        return '蠻顎龍';
      case 8:
        return '雌火龍';
      case 9:
        return '眩鳥';
      case 10:
        return '浮空龍';
      case 11:
        return '大兇顎龍';
      case 12:
        return '骨槌龍';
      case 13:
        return '風漂龍';
      case 14:
        return '慘爪龍';
      case 15:
        return '火龍';
      case 16:
        return '角龍';
      case 17:
        return '麒麟';
      case 18:
        return '熔山龍';
      case 19:
        return '岩賊龍';
      case 20:
        return '櫻火龍';
      case 21:
        return '爆鱗龍';
      case 22:
        return '恐爆龍';
      case 23:
        return '熔岩龍';
      case 24:
        return '爆錘龍';
      case 25:
        return '蒼火龍';
      case 26:
        return '黑角龍';
      case 27:
        return '滅盡龍';
      case 28:
        return '炎王龍';
      case 29:
        return '炎妃龍';
      case 30:
        return '鋼龍';
      case 31:
        return '屍套龍';
      case 32:
        return '絢輝龍';
      case 33:
        return '冥燈龍';
      case 34:
        return '冰魚龍';
      case 35:
        return '猛牛龍';
      case 36:
        return '痺毒龍';
      case 37:
        return '浮眠龍';
      case 38:
        return '水妖鳥';
      case 39:
        return '冰牙龍';
      case 40:
        return '迅龍';
      case 41:
        return '斬龍';
      case 42:
        return '轟龍';
      case 43:
        return '碎龍';
      case 44:
        return '硫斬龍';
      case 45:
        return '霜翼風飄龍';
      case 46:
        return '雷顎龍';
      case 47:
        return '兇爪龍';
      case 48:
        return '冰呪龍';
      case 49:
        return '紅蓮爆鱗龍';
      case 50:
        return '霧瘴屍套龍';
      case 51:
        return '溟波龍';
      case 52:
        return '惶怒恐暴龍';
      case 53:
        return '殲世滅盡龍';
      case 54:
        return '天地煌啼龍';
      case 55:
        return '雷狼龍';
      case 56:
        return '黑狼鳥';
      case 57:
        return '戰痕黑狼鳥';
      case 58:
        return '黑轟龍';
      case 59:
        return '金火龍';
      case 60:
        return '銀火龍';
      case 61:
        return '金獅子';
      case 62:
        return '獄狼龍';
      case 63:
        return '冥赤龍';
      case 64:
        return '激昂金獅子';
      case 65:
        return '猛爆碎龍';
      case 66:
        return '霜刃冰牙龍';
      case 67:
        return '煌黑龍';
      case 68:
        return '黑龍';
      case 69:
        return '貝希摩斯';
      case 70:
        return '鹿首精';
      case 71:
        return '古代鹿首精';
      default:
        return `魔物 ${number}`;
    }
    return `魔物 ${number}`;
  }