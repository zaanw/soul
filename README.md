# SØUL — GitHub Pages edition

Your mind. Your rules.

Статическая версия интерфейса SØUL AI. **AI-сервер не подключён.** Это не полноценная серверная версия и не симулятор ответов AI.

Работают адаптивный интерфейс, мобильное меню, темы Dark/Light/System, русский/английский, локальные черновики (создание, переименование, поиск, удаление и экспорт JSON), локальные пользовательские правила. Данные находятся в localStorage текущего браузера и удаляются при очистке данных сайта. Правила никуда не передаются: AI в этой версии нет. При отправке показывается честное сообщение о неподключённом AI. API-ключи не запрашиваются и не хранятся.

Полное серверное приложение: https://github.com/zaanw/s-ulai

## Windows 11

Установите Node.js 22 LTS и Git:

```powershell
git clone https://github.com/zaanw/soul.git
cd soul
npm ci
npm run dev
```

Откройте `/soul/` на локальном порту 3000. Для статической сборки:

```powershell
npm run lint
npm run build
```

Файлы находятся в `out/`, base path — `/soul`.

## Публикация

Settings → Pages → Source → GitHub Actions.
Workflow `.github/workflows/pages.yml` собирает и публикует сайт при push в `main`.
Ожидаемый адрес после успешной публикации: https://zaanw.github.io/soul/

GitHub Pages не выполняет API-маршруты Next.js и не запускает SQLite. Настоящий AI требует отдельного защищённого сервера. Секреты в статический сайт добавлять нельзя.

## OpenRouter через GitHub Pages (экспериментально)

GitHub Pages не может безопасно хранить OpenRouter API-ключ. В ветке `feature/pages-openrouter-client` интерфейс может подключаться к отдельному серверу SØUL API. Укажите **только публичный URL API, без ключей** в GitHub Settings → Secrets and variables → Actions → Variables → `SOUL_API_URL`, например `https://api.example.com`. Pages workflow подставит его как `NEXT_PUBLIC_SOUL_API_URL` при сборке.

Сервер должен поддерживать POST `/api/chat`, поток OpenAI-compatible SSE, HTTPS и CORS только для `https://zaanw.github.io`; также обязательны аутентификация и rate limiting перед публичным запуском, иначе чужие пользователи могут расходовать ваш API-баланс. Серверный код находится в отдельном PR #1 и пока не развёрнут. Без API сайт продолжит работать в режиме локальных черновиков.

Не объединяйте PR до проверки `npm ci`, `npm run lint`, `npm run build` и браузерных тестов. GitHub Pages не может выполнить эти серверные функции самостоятельно.
