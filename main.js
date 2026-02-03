const $ = (s) => document.querySelector(s);
const $$ = (s) => Array.from(document.querySelectorAll(s));

function setLang(lang){
  const dict = I18N[lang] || I18N.vi;

  document.documentElement.lang = lang === "zh" ? "zh-CN" : lang;

  $$("[data-i18n]").forEach(el=>{
    const key = el.getAttribute("data-i18n");
    if(dict[key]) el.textContent = dict[key];
  });

  // button state + persist
  $$(".lang__btn").forEach(b=>b.classList.toggle("active", b.dataset.lang === lang));
  localStorage.setItem("cooltek_lang", lang);
}

function initLang(){
  const saved = localStorage.getItem("cooltek_lang");
  const browser = (navigator.language || "vi").toLowerCase();
  if(saved) return setLang(saved);
  if(browser.startsWith("zh")) return setLang("zh");
  if(browser.startsWith("en")) return setLang("en");
  return setLang("vi");
}

function initForm(){
  const form = $("#quoteForm");
  form.addEventListener("submit", (e)=>{
    e.preventDefault();
    const fd = new FormData(form);
    const subject = "Inquiry from cooltek.vn";
    const body = [
      `Name: ${fd.get("name")||""}`,
      `Company: ${fd.get("company")||""}`,
      `Phone: ${fd.get("phone")||""}`,
      `Email: ${fd.get("email")||""}`,
      `Need: ${fd.get("need")||""}`,
    ].join("\n");

    // change this to your real mailbox
    const to = "sales@cooltek.vn";
    window.location.href = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}

function initMobileMenu(){
  const btn = $("#menuBtn");
  const nav = $("#mobileNav");
  btn.addEventListener("click", ()=>{
    const open = nav.style.display === "flex";
    nav.style.display = open ? "none" : "flex";
  });
  $$("#mobileNav a").forEach(a=>a.addEventListener("click", ()=> nav.style.display="none"));
}

document.addEventListener("DOMContentLoaded", ()=>{
  $("#year").textContent = new Date().getFullYear();

  $$(".lang__btn").forEach(btn=>{
    btn.addEventListener("click", ()=> setLang(btn.dataset.lang));
  });

  initLang();
  initForm();
  initMobileMenu();
});
