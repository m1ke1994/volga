<template>
    <div class="hero reveal">
        <div class="hero__top">
            <BurgerMenuButton class="hero__menu" @toggle="emit('toggle-menu')" />
            <div class="hero__title">Новое Конаково</div>
        </div>
        <div class="hero__bottom">
            <div class="avatar">
                <img src="/9.jpeg" alt="ФОТО">
            </div>
            <div class="info">
                <div class="info__name">Елизавета Стручкова</div>
                <div class="info__row">
                    <div class="info__about">Делюсь событиями, тишиной и теплыми практиками в Конаково. Я переехала из Москвы в Конаково и создала здесь пространство для осознанного отдыха, живых встреч и глубокого контакта с природой. Это место про замедление, внимание к себе и теплые человеческие связи — вдали от суеты и спешки. Я провожу экскурсии по природным местам, утренние практики, чайные церемонии и мастер-классы, объединяя их в цельный опыт. Для гостей Конаково становлюсь проводником, помогаю собрать день или путешествие под ваш ритм и интересы. А для местных создаю сообщество, где есть движение, поддержка, общение и ощущение «своего места».</div>
                    <button class="info__btn">Связаться со мной</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import BurgerMenuButton from './BurgerMenuButton.vue';

const emit = defineEmits(['toggle-menu']);
</script>

<style scoped>
.hero {
    position: relative;
}

.hero__top {
    position: relative;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0)) , url('/8.webp') center/cover no-repeat;
    height: 420px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 16px;
    box-sizing: border-box;
}

.hero__menu {
    position: absolute;
    right: 16px;
    top: 16px;
}

.hero__title {
    font-size: 28px;
    color: #f7f2ea;
    letter-spacing: 0.6px;
    background: rgba(36, 30, 24, 0.45);
    padding: 10px 22px;
    border-radius: 999px;
    text-align: center;
}

.hero__bottom {
    background: #e8dfd2;
    padding: 72px 32px 32px;
    position: relative;
    box-sizing: border-box;
}

.avatar {
    position: absolute;
    top: -82px;
    left: 140px;
    width: 190px;
    height: 190px;
    border-radius: 50%;
    background: #e9b5b5;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    box-shadow: 0 24px 40px rgba(27, 22, 18, 0.22);
    border: 3px solid rgba(255, 255, 255, 0.75);
}

.avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

.info {
    margin-left: 360px;
    padding-top: 8px;
}

.info__name {
    font-size: 26px;
    color: #2b2520;
    margin-bottom: 12px;
    font-weight: 600;
    letter-spacing: 0.2px;
}

.info__row {
    display: grid;
    gap: 14px;
}

.info__about {
    font-size: 14px;
    color: #3a2f27;
    line-height: 1.6;
}

.info__btn {
    background: linear-gradient(135deg, #c8b89f, #b7a58c);
    border: none;
    padding: 10px 18px;
    font-size: 13px;
    color: #2b2520;
    cursor: pointer;
    border-radius: 999px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
    transition: transform 200ms ease, box-shadow 200ms ease;
    justify-self: flex-start;
}

.info__btn:hover {
    transform: translateY(-1px) scale(1.02);
    box-shadow: 0 10px 18px rgba(0, 0, 0, 0.18);
}

@media (max-width: 1100px) {
    .avatar {
        left: 90px;
        width: 170px;
        height: 170px;
    }

    .info {
        margin-left: 300px;
    }
}

@media (max-width: 820px) {
    .hero__bottom {
        padding: 130px 20px 28px;
    }

    .avatar {
        left: 50%;
        transform: translateX(-50%);
    }

    .info {
        margin-left: 0;
        text-align: center;
    }

    .info__btn {
        justify-self: center;
    }
}
</style>
