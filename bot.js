const { myApp } = require('./config');
const { token } = require('./config');
const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot(token, { polling: true });

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
                        url: myApp // آدرس لینک مورد نظر خود را اینجا وارد کنید
                    }
                ]
            ]
        }
    };

    bot.sendMessage(chatId, welcomeMessage).then(() => {
        bot.sendMessage(chatId, personalizedMessage, options);
    });
});

bot.on('message', (msg) => {
    const chatId = msg.chat.id;

    if (msg.text !== "/start") {
        const options = {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: "Open ⬆️ ",
                            url: myApp // آدرس لینک مورد نظر خود را اینجا وارد کنید
                        }
                    ]
                ]
            }
        };

        bot.sendMessage(chatId, "برای باز کردن برنامه دکمه Open را لمس کنید:", options);
    }
});
