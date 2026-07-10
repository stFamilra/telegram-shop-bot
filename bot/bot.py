import os
import json
import logging
from dotenv import load_dotenv
from telegram import Update, WebAppInfo, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import ApplicationBuilder, CommandHandler, ContextTypes, MessageHandler, filters

# Загружаем переменные окружения
load_dotenv()
BOT_TOKEN = os.getenv("BOT_TOKEN")
MINI_APP_URL = os.getenv("MINI_APP_URL")

# Настройка логирования
logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s", level=logging.INFO
)

# Команда /start
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    keyboard = [
        [InlineKeyboardButton(
            "🛍️ Открыть каталог",
            web_app=WebAppInfo(url=MINI_APP_URL)
        )]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    await update.message.reply_text(
        "Добро пожаловать в каталог! Нажмите кнопку ниже, чтобы открыть магазин.",
        reply_markup=reply_markup
    )

# Обработчик данных из Mini App
async def handle_web_app_data(update: Update, context: ContextTypes.DEFAULT_TYPE):
    try:
        data = json.loads(update.message.web_app_data.data)
        # Здесь можно сохранить заказ в БД, отправить уведомление и т.д.
        # Пока просто выводим в консоль и отвечаем пользователю
        logging.info(f"Получен заказ: {data}")
        await update.message.reply_text(
            f"✅ Заказ принят! Сумма: {data.get('total', 0)} ₽. Скоро с вами свяжутся."
        )
    except Exception as e:
        logging.error(f"Ошибка обработки заказа: {e}")
        await update.message.reply_text("❌ Произошла ошибка при обработке заказа.")

def main():
    # Создаём приложение
    application = ApplicationBuilder().token(BOT_TOKEN).build()

    # Регистрируем обработчики
    application.add_handler(CommandHandler("start", start))
    application.add_handler(MessageHandler(filters.StatusUpdate.WEB_APP_DATA, handle_web_app_data))

    # Запускаем бота (polling)
    print("Бот запущен...")
    application.run_polling()

if __name__ == "__main__":
    main()