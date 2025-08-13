// kirim_telegram.js

'use strict';

// --- PENGATURAN - GANTI DENGAN DATA ANDA ---
const BOT_TOKEN = '8263122190:AAHFGPbqh6b9reGaXz-Npe3Dm-hEe1GIMSM'; // <-- Masukkan Token Bot Anda di sini
const CHAT_ID = '8398374896';   // <-- Masukkan Chat ID Anda/Grup di sini
const MESSAGE = '✅ Script Node.js masih menyala'; // Pesan yang ingin dikirim
const INTERVAL = 2 * 60 * 1000; // Interval dalam milidetik (2 menit)

/**
 * Fungsi untuk mengirim pesan ke Telegram menggunakan fetch
 * @param {string} messageText - Teks pesan yang ingin dikirim.
 */
async function sendTelegramMessage(messageText) {
    // Cek jika token atau chat ID belum diisi
    if (!BOT_TOKEN || !CHAT_ID || BOT_TOKEN === 'GANTI_DENGAN_TOKEN_ANDA') {
        console.error('❌ [ERROR] Harap masukkan BOT_TOKEN dan CHAT_ID yang valid di dalam file script!');
        // Hentikan interval agar tidak mencoba terus-menerus
        clearInterval(telegramInterval);
        return;
    }

    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    // Gunakan URLSearchParams untuk memformat data dengan benar
    const params = new URLSearchParams({
        chat_id: CHAT_ID,
        text: messageText
    });

    console.log(`[${new Date().toLocaleTimeString()}] Mengirim pesan...`);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params
        });

        const result = await response.json();

        if (result.ok) {
            console.log('✔️  Pesan berhasil terkirim!');
        } else {
            // Memberikan pesan error yang lebih jelas dari Telegram
            console.error(`❌ Gagal mengirim pesan: [${result.error_code}] ${result.description}`);
        }
    } catch (error) {
        console.error('❌ Terjadi error saat menghubungi API Telegram:', error.message);
    }
}

// --- MENGIRIM PESAN SECARA BERKALA ---
console.log('🚀 Skrip pengirim pesan otomatis Telegram (Node.js) telah dimulai.');
console.log(`Pesan akan dikirim setiap ${INTERVAL / 60000} menit.`);

// Kirim pesan pertama kali saat skrip dimuat
sendTelegramMessage(MESSAGE);

// Atur interval untuk pengiriman berikutnya
const telegramInterval = setInterval(() => {
    sendTelegramMessage(MESSAGE);
}, INTERVAL);

// Tambahkan kode ini di paling bawah file kirim_telegram.js Anda
const http = require('http');
http.createServer(function (req, res) {
  res.write("Saya hidup!");
  res.end();
}).listen(8080);
