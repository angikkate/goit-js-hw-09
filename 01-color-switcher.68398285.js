let t=null;const e={startBtn:document.querySelector("button[data-start]"),stopBtn:document.querySelector("button[data-stop]")};e.startBtn.addEventListener("click",(function(){e.startBtn.disabled=!0,e.stopBtn.disabled=!1,t=setInterval((()=>{document.querySelector("body").style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3)})),e.stopBtn.addEventListener("click",(function(){clearInterval(t),e.startBtn.disabled=!1,e.stopBtn.disabled=!0}));
//# sourceMappingURL=01-color-switcher.68398285.js.map
