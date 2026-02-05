<template>
  <div class="page">
    <section class="hero">
      <div class="hero__top">
        <h1 class="hero__title">Новое Конаково</h1>
      </div>

      <div class="hero__bottom">
        <!-- круг (фото) пересекает стык -->
        <div class="avatar" aria-label="Фото профиля">
          <img src="/public/avatar.png" alt="">
        </div>

        <!-- инфо справа -->
        <div class="info">
          <div class="info__name">Елизавета Стручкова</div>

          <div class="info__row">
            <div class="info__about">текст обо мне</div>
            <button class="info__btn" type="button">написать мне</button>
          </div>
        </div>

        <!-- бургер меню слева под кругом -->
        <button class="burger" type="button" aria-label="Открыть меню">
          <span class="burger__icon" aria-hidden="true"></span>
          бургер меню
        </button>

        <!-- карточки -->
        <div class="cards">
          <article v-for="n in 6" :key="n" class="card">
            <div class="card__text">
              карточка товара<br />
              с описанием и<br />
              подробнее
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* ВАЖНО: чтобы не было белого вокруг */
.page {
  width: 100%;
  min-height: 100vh;
  background: #d7d7d7;
}

/* основной блок на всю ширину */
.hero {
  width: 100%;
}

/* верхняя розовая зона */
.hero__top {
  background: #f3dede;
  padding: 28px 16px 56px;
  text-align: center;
}
.hero__title {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
}

/* нижняя серая зона */
.hero__bottom {
  position: relative;
  background: #d7d7d7;
  padding: 22px 16px 28px;
  min-height: 520px;
}

/* круг-аватар пересекает границу */
.avatar {
  position: absolute;
  left: 18px;
  top: -44px;
  width: 92px;
  height: 92px;
  border-radius: 50%;
  background: #efb0b0;
  display: grid;
  place-items: center;
  font-size: 12px;
}

/* блок инфо справа от круга */
.info {
  margin-left: 130px; /* чтобы уйти вправо от круга */
  padding-top: 6px;
}
.info__name {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 10px;
}
.info__row {
  display: flex;
  align-items: center;
  gap: 18px;
}
.info__about {
  font-size: 12px;
}
.info__btn {
  font-size: 11px;
  padding: 6px 10px;
  border: 0;
  background: #f3dede;
  cursor: pointer;
}

/* бургер слева под кругом */
.burger {
  margin-top: 62px; /* под кругом */
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border: 0;
  background: #e98f8f;
  font-size: 12px;
  cursor: pointer;
}
.burger__icon {
  width: 16px;
  height: 10px;
  position: relative;
  display: inline-block;
}
.burger__icon::before,
.burger__icon::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  height: 2px;
  background: #000;
}
.burger__icon::before { top: 0; }
.burger__icon::after { bottom: 0; }

/* сетка карточек: адаптивная, но по умолчанию 3 колонки как в макете */
.cards {
  margin-top: 18px;
  display: grid;
  grid-template-columns: repeat(3, minmax(120px, 1fr));
  gap: 18px;
  max-width: 520px; /* чтобы сетка визуально была как в рефе */
}

/* карточки */
.card {
  background: #9ed99a;
  min-height: 78px;
  display: grid;
  place-items: center;
  padding: 10px;
}
.card__text {
  font-size: 12px;
  line-height: 1.2;
  text-align: left;
}
</style>
