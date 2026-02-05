<template>
    <div class="hero">
        <div class="hero__top">
            <div class="hero__title">Новое Конаково</div>
        </div>
        <div class="hero__bottom">
            <div class="avatar">
                <img src="/avatar.png" alt="ФОТО">
            </div>
            <div class="info">
                <div class="info__name">Елизавета Стручкова</div>
                <div class="info__row">
                    <div class="info__about">Делюсь событиями, практиками и прогулками в Конаково</div>
                    <button class="info__btn">написать мне</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.hero {
    position: relative;
}

.hero__top {
    background: #f4e6e6 url('/new_konakovo.png') center/cover no-repeat;
    height: 150px;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding-top: 16px;
    box-sizing: border-box;
}

.hero__title {
    font-size: 16px;
    color: #2b2b2b;
    background: rgba(244, 230, 230, 0.6);
    padding: 4px 10px;
    border-radius: 10px;
}

.hero__bottom {
    background: #d9d9d9;
    padding: 44px 18px 20px;
    position: relative;
    box-sizing: border-box;
}

.avatar {
    position: absolute;
    top: -55px;
    left: 18px;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: #e9b5b5;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
}

.avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

.info {
    margin-left: 150px;
    padding-top: 8px;
}

.info__name {
    font-size: 18px;
    color: #1f1f1f;
    margin-bottom: 6px;
    font-weight: 600;
}

.info__row {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
}

.info__about {
    font-size: 13px;
    color: #2b2b2b;
}

.info__btn {
    background: #f4e6e6;
    border: 1px solid #d9caca;
    padding: 4px 10px;
    font-size: 12px;
    color: #2b2b2b;
    cursor: pointer;
    border-radius: 6px;
}

@media (max-width: 900px) {
    .hero__bottom {
        padding: 44px 12px 20px;
    }

    .avatar {
        left: 12px;
    }

    .info {
        margin-left: 140px;
    }
}

@media (max-width: 520px) {
    .info__row {
        flex-direction: column;
        align-items: flex-start;
    }
}
</style>
