// 获取小人和房子元素
let character = document.createElement('div');
character.classList.add('character');
document.body.appendChild(character);

// 随机生成小人和房子的位置
function randomPosition(element) {
    let x = Math.random() * (window.innerWidth - 60);  // 宽度限制
    let y = Math.random() * (window.innerHeight - 60); // 高度限制
    element.style.left = `${x}px`;
    element.style.top = `${y}px`;
}
// 房子图标数组
const houseImages = [
    '../images/contact.png',
    '../images/diary.png',
    '../images/litdiary.png'
];


// 生成多个房子
let houses = [];
for (let i = 0; i < 3; i++) {
    let house = document.createElement('div');
    house.classList.add('house');
    house.style.backgroundImage = `url('${houseImages[i]}')`; // 使用不同的房子图标
    document.body.appendChild(house);
    randomPosition(house);
    house.dataset.url = `../page${i + 1}.html`;  // 每个房子对应一个页面
    houses.push(house);
}

// 随机生成小人位置
randomPosition(character);

// 小人移动逻辑
let moveSpeed = 10;  // 小人的移动速度
let moving = { up: false, down: false, left: false, right: false };

// 监听键盘按键，控制小人移动
document.addEventListener('keydown', (e) => {
    if (e.key === 'w') {
        // 检查小人是否在房子附近，按下 W 跳转
        for (let house of houses) {
            let houseRect = house.getBoundingClientRect();
            let characterRect = character.getBoundingClientRect();
            if (
                characterRect.left < houseRect.right &&
                characterRect.right > houseRect.left &&
                characterRect.top < houseRect.bottom &&
                characterRect.bottom > houseRect.top
            ) {
                // 小人和房子碰撞，跳转到对应页面
                window.location.href = house.dataset.url;
                break;
            }
        }
    }

    // 控制小人移动
    if (e.key === 'ArrowUp') {
        moving.up = true;
    } else if (e.key === 'ArrowDown') {
        moving.down = true;
    } else if (e.key === 'ArrowLeft') {
        moving.left = true;
    } else if (e.key === 'ArrowRight') {
        moving.right = true;
    }
});

// 小人持续移动
function moveCharacter() {
    let rect = character.getBoundingClientRect();

    if (moving.up && rect.top > 0) {
        character.style.top = `${rect.top - moveSpeed}px`;
    }
    if (moving.down && rect.bottom < window.innerHeight) {
        character.style.top = `${rect.top + moveSpeed}px`;
    }
    if (moving.left && rect.left > 0) {
        character.style.left = `${rect.left - moveSpeed}px`;
    }
    if (moving.right && rect.right < window.innerWidth) {
        character.style.left = `${rect.left + moveSpeed}px`;
    }
}

// 停止移动
document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowUp') {
        moving.up = false;
    } else if (e.key === 'ArrowDown') {
        moving.down = false;
    } else if (e.key === 'ArrowLeft') {
        moving.left = false;
    } else if (e.key === 'ArrowRight') {
        moving.right = false;
    }
});

// 设置小人持续移动
setInterval(moveCharacter, 1000 / 60);  // 每秒60帧
