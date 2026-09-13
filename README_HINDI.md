# JARVES AI — Mobile Cloud APK Project

यह एक **pure HTML/CSS/JavaScript web project** है। इसे ऐसे cloud Android builder में upload करें जो Web App/HTML/PWA को APK में बदलता हो।

## APK बनाने का तरीका
1. ZIP extract करें या builder में ZIP upload करें।
2. Entry file: `index.html`
3. App name: `JARVES AI`
4. Package ID: `com.sahayakai.jarves` (यदि builder पूछे)
5. Portrait mode रखें।
6. Microphone permission ON करें।
7. Build APK.

## महत्वपूर्ण: फोन के apps/settings
Web app अकेले Android के हर app को नहीं खोल सकता। इस project में:
- WhatsApp: `whatsapp://`
- Android Settings: Android intent
- Wi‑Fi/Bluetooth: Android settings intents
- YouTube/Google: web URLs

अगर आपका cloud builder Android Intent/URL scheme को WebView में allow करता है, ये काम करेंगे। अगर नहीं करता, तो उस builder में Native Android bridge/Capacitor/WebView wrapper चुनें।

## "कोई भी ऐप खोलना"
Android security के कारण web page से मनमाने installed apps की पूरी सूची खोलना संभव नहीं है। Native APK में package-name आधारित Android intents/bridge जोड़ना पड़ेगा।

## AI बातचीत
Settings में अपना **secure AI backend URL** डालें। POST:
{"message":"यूज़र का सवाल","language":"hi-IN","assistant":"JARVES"}

Response:
{"reply":"AI का जवाब"}

API key frontend में न डालें। Backend में रखें।

## Voice
Chrome/WebView का SpeechRecognition support आवश्यक है। HTTPS और microphone permission आवश्यक हो सकती है।
