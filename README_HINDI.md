# JARVES AI — Native Android / Always Listening Project

यह project Android Studio/Gradle based native APK के लिए तैयार किया गया है। इसका उद्देश्य:
- एक ON/OFF switch
- Foreground Service
- microphone permission
- Hindi speech recognition
- Hindi Text-to-Speech
- "Hey JARVES" style wake phrase workflow
- Google / YouTube / WhatsApp / Android Settings खोलने के लिए intents
- secure AI backend से बातचीत

## Build
Android Studio में project खोलें और Gradle sync के बाद APK build करें।

अगर किसी cloud builder में Android/Gradle project import उपलब्ध है, पूरा ZIP upload करें। केवल "HTML to APK" builder में यह native background service काम नहीं करेगा।

## Important
Android लगातार microphone listening को background में चलाने के लिए Foreground Service और microphone permission मांगता है। Android की battery/privacy restrictions के कारण इसे पूरी तरह hidden/background process की तरह नहीं चलाया जा सकता।

यह sample wake phrase को speech-recognition results से पहचानता है; production-quality low-power wake-word engine अलग native wake-word SDK के साथ बेहतर रहेगा।

## AI backend
Settings में backend URL जोड़ें। Backend POST:
{"message":"...","language":"hi-IN","assistant":"JARVES"}
और JSON:
{"reply":"..."}
दे।

API key APK में न रखें।
