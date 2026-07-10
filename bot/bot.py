import os
import json
import logging
import threading
from dotenv import load_dotenv
from telegram import Update, WebAppInfo, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import ApplicationBuilder, CommandHandler, ContextTypes, MessageHandler, filters
from flask import Flask, request, jsonify

# Загружаем переменные окружения
load_dotenv()
BOT_TOKEN = os.getenv("BOT_TOKEN")
MINI_APP_URL = os.getenv("MINI_APP_URL")

# Настройка логирования
logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s", level=logging.INFO
)

# --- Telegram Bot Handlers ---
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

async def handle_web_app_data(update: Update, context: ContextTypes.DEFAULT_TYPE):
    try:
        data = json.loads(update.message.web_app_data.data)
        logging.info(f"Получен заказ: {data}")
        await update.message.reply_text(
            f"✅ Заказ принят! Сумма: {data.get('total', 0)} ₽. Скоро с вами свяжутся."
        )
    except Exception as e:
        logging.error(f"Ошибка обработки заказа: {e}")
        await update.message.reply_text("❌ Произошла ошибка при обработке заказа.")

# --- Функция запуска бота (в отдельном потоке) ---
def run_bot():
    application = ApplicationBuilder().token(BOT_TOKEN).build()
    application.add_handler(CommandHandler("start", start))
    application.add_handler(MessageHandler(filters.StatusUpdate.WEB_APP_DATA, handle_web_app_data))
    print("Бот запущен...")
    application.run_polling()

# --- Flask веб-сервер (для поддержки Web Service) ---
app = Flask(__name__)

@app.route('/')
def health():
    return jsonify({"status": "ok"}), 200

# Запускаем бота в фоновом потоке, чтобы не блокировать Flask
if __name__ == "__main__":
    bot_thread = threading.Thread(target=run_bot, daemon=True)
    bot_thread.start()

    # Запускаем Flask-сервер (порт берём из переменной окружения Render)
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)