# Ticket Management System

Система управления обращениями (тикетами) с REST API.

## Технологии

- Node.js + Express
- TypeScript
- PostgreSQL
- Prisma ORM
- Docker & Docker Compose
- Swagger/OpenAPI

## Запуск через Docker

1. Клонируйте репозиторий:
```bash
git clone https://github.com/nenertiy/express-backend-ticket.git
cd express-backend-ticket
```

2. Создайте файл `.env` в корне проекта:
```env
DATABASE_URL="postgresql://postgres:password@postgres:5432/ticketdb?schema=public"
```

3. Запустите приложение через Docker Compose:
```bash
docker-compose up --build
```

Приложение будет доступно по адресу: `http://localhost:4000`
Swagger документация: `http://localhost:4000/docs`

## API Endpoints

### Создание тикета
```http
POST /api/tickets

{
  "title": "Проблема с входом",
  "content": "Не могу войти в систему"
}
```

### Взять тикет в работу
```http
PATCH /api/tickets/:id/take
```

### Завершить тикет
```http
PATCH /api/tickets/:id/complete

{
  "solution": "Проблема решена путем сброса пароля"
}
```

### Отменить тикет
```http
PATCH /api/tickets/:id/cancel

{
  "cancelReason": "Дубликат тикета"
}
```

### Получить список тикетов
```http
GET /api/tickets                    # Все тикеты
GET /api/tickets?date=2024-03-20   # Тикеты за конкретную дату
GET /api/tickets?startDate=2024-03-01&endDate=2024-03-31   # Тикеты за период
```

### Отменить все тикеты в работе
```http
POST /api/tickets/cancel-all
```

## Статусы тикетов

- `NEW` - Новый тикет
- `IN_PROGRESS` - Тикет в работе
- `COMPLETED` - Тикет завершен
- `CANCELLED` - Тикет отменен

## Разработка

1. Установка зависимостей:
```bash
npm install
```

2. Генерация Prisma клиента:
```bash
npx prisma generate
```

3. Применение миграций:
```bash
npx prisma migrate dev
```

4. Запуск в режиме разработки:
```bash
npm run dev
```

## Порты

- API: 4000
- PostgreSQL: 5434 (внешний порт)
