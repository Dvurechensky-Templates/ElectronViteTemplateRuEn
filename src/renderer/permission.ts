import router from "./router";
import Performance from "@renderer/utils/performance";

var end = null;
router.beforeEach((to, from, next) => {
  end = Performance.startExecute(
    `${from.path} => ${to.path} Маршрутизация займёт время`
  ); /// Мониторинг производительности маршрутизации
  next();
  setTimeout(() => {
    end();
  }, 0);
});

router.afterEach(() => {});
