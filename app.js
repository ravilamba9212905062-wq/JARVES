const $=x=>document.getElementById(x), chat=$("chat"), orb=$("orb"), status=$("status"), hint=$("hint"), mic=$("mic");
const SR=window.SpeechRecognition||window.webkitSpeechRecognition; let rec=null, listening=false;
$("api").value=localStorage.jarves_api||""; $("speak").checked=localStorage.jarves_speak!=="0";
function msg(t,c="bot"){let d=document.createElement("div");d.className="msg "+c;d.textContent=t;chat.appendChild(d);chat.scrollTop=chat.scrollHeight}
function say(t){if(!$("speak").checked||!speechSynthesis)return;speechSynthesis.cancel();let u=new SpeechSynthesisUtterance(t);u.lang="hi-IN";u.rate=.95;speechSynthesis.speak(u)}
function answer(t){msg(t);say(t);status.textContent="तैयार हूँ"}
function launch(url){window.location.href=url}
function command(t){
 let c=t.toLowerCase().trim();
 if(c.includes("whatsapp")||c.includes("व्हाट्सएप")){launch("whatsapp://");answer("WhatsApp खोल रहा हूँ।");return}
 if(c.includes("youtube")||c.includes("यूट्यूब")){let q=c.replace(/youtube|यूट्यूब|खोलो|खोल|चलाओ|पर/gi,"").trim();launch(q?"https://www.youtube.com/results?search_query="+encodeURIComponent(q):"https://www.youtube.com");answer(q?`YouTube पर ${q} खोज रहा हूँ।`:"YouTube खोल रहा हूँ।");return}
 if(c.includes("google")||c.includes("गूगल")||c.includes("सर्च")||c.includes("खोज")){let q=c.replace(/google|गूगल|सर्च|खोज|करो|करना|पर/gi,"").trim();launch(q?"https://www.google.com/search?q="+encodeURIComponent(q):"https://www.google.com");answer(q?`Google पर ${q} खोज रहा हूँ।`:"Google खोल रहा हूँ।");return}
 if(c.includes("setting")||c.includes("सेटिंग")){launch("intent:#Intent;action=android.settings.SETTINGS;end");answer("फोन की Settings खोलने की कोशिश कर रहा हूँ।");return}
 if(c.includes("wifi")||c.includes("वाईफाई")){launch("intent:#Intent;action=android.settings.WIFI_SETTINGS;end");answer("Wi‑Fi Settings खोलने की कोशिश कर रहा हूँ।");return}
 if(c.includes("bluetooth")||c.includes("ब्लूटूथ")){launch("intent:#Intent;action=android.settings.BLUETOOTH_SETTINGS;end");answer("Bluetooth Settings खोलने की कोशिश कर रहा हूँ।");return}
 if(c.includes("समय")||c.includes("time")){answer("अभी समय "+new Intl.DateTimeFormat("hi-IN",{hour:"numeric",minute:"2-digit"}).format(new Date())+" है।");return}
 if(c.includes("तारीख")||c.includes("date")){answer("आज "+new Intl.DateTimeFormat("hi-IN",{dateStyle:"full"}).format(new Date())+" है।");return}
 let endpoint=$("api").value.trim();
 if(endpoint){fetch(endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:t,language:"hi-IN",assistant:"JARVES"})}).then(r=>r.json()).then(d=>answer(d.reply||d.answer||d.message||"AI ने जवाब नहीं दिया।")).catch(()=>answer("AI server से connection नहीं हुआ।"));return}
 answer(`आपने कहा: "${t}"\nAI chat के लिए Settings में अपना secure AI Backend URL जोड़ें।`)}
function listen(){if(!SR){answer("इस browser/WebView में voice recognition उपलब्ध नहीं है।");return}if(listening){rec.stop();return}rec=new SR();rec.lang="hi-IN";rec.interimResults=false;rec.onstart=()=>{listening=true;orb.classList.add("listen");status.textContent="सुन रहा हूँ…";hint.textContent="बोलिए";mic.textContent="⏹️"};rec.onresult=e=>{let t=e.results[0][0].transcript;msg(t,"user");command(t)};rec.onerror=e=>answer(e.error==="not-allowed"?"Microphone permission दें।":"आवाज़ समझ नहीं आई।");rec.onend=()=>{listening=false;orb.classList.remove("listen");mic.textContent="🎙️";if(status.textContent==="सुन रहा हूँ…")status.textContent="तैयार हूँ";hint.textContent="माइक दबाकर बोलें"};rec.start()}
mic.onclick=listen;
document.querySelectorAll("[data-action]").forEach(b=>b.onclick=()=>command(b.dataset.action==="whatsapp"?"WhatsApp खोलो":b.dataset.action==="youtube"?"YouTube खोलो":b.dataset.action==="google"?"Google खोलो":"फोन की Settings खोलो"));
$("settings").onclick=()=>$("dlg").showModal();$("close").onclick=()=>$("dlg").close();$("save").onclick=()=>{localStorage.jarves_api=$("api").value.trim();localStorage.jarves_speak=$("speak").checked?"1":"0";$("dlg").close();answer("Settings सेव हो गईं।")};
