const { token } = require('./config');
const { myApp } = require('./config');
const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot(token, { polling: true });

// مدیریت خطاهای عمومی
bot.on('polling_error', (error) => {
    console.error(`Polling error: ${error.code}`, error);
});

bot.on('webhook_error', (error) => {
    console.error(`Webhook error: ${error.code}`, error);
});

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const firstName = msg.from.first_name;

    const welcomeMessage = "سلام به ربات vendorsBot خوش آمدید اینجا میتونید یه فروشگاه تلگرامی کامل با همه امکانات بدون کد نویس ایجاد کنی و اون رو هر لحظه مدیریت کنی";
    const personalizedMessage = `سلام ${firstName}، برای ایجاد فروشگاهی مدنظر خود دکمه زیر را لمس کنید:`;

    const options = {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: "باز کردن برنامه",
                        callback_data: "open_app"
                    }
                ]
            ]
        }
    };

    bot.sendMessage(chatId, welcomeMessage).then(() => {
        bot.sendMessage(chatId, personalizedMessage, options);
    }).catch((error) => {
        console.error(`Error sending message: ${error.message}`);
    });
});

bot.on('callback_query', (callbackQuery) => {
    const msg = callbackQuery.message;
    const chatId = msg.chat.id;

    if (callbackQuery.data === 'open_app') {
        bot.sendMessage(chatId, 'برای باز کردن برنامه، [اینجا کلیک کنید](https://rezanuts.ir)', { parse_mode: 'Markdown' }).catch((error) => {
            console.error(`Error sending message: ${error.message}`);
        });
    }
});

// مدیریت پیام‌های دیگر و نمایش لینک
bot.on('message', (msg) => {
    const chatId = msg.chat.id;

    if (msg.text !== "/start") {
        const options = {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: "Open ⬆️",
                            url: myApp
                        }
                    ]
                ]
            }
        };

        bot.sendMessage(chatId, "برای باز کردن برنامه دکمه Open را لمس کنید:", options).catch((error) => {
            console.error(`Error sending message: ${error.message}`);
        });
    }
});