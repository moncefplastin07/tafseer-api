import { serve } from "https://deno.land/std@0.154.0/http/server.ts";

import {
    DOMParser,
    Element,
  } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";
  
  
async function handler(_req:Request) { 
    const requestURL = new URL(_req.url)
    const ayaNumber = Number(requestURL.searchParams.get("aya"))
    const sorahNumber = Number(requestURL.pathname.substring(1)) || null
    console.log(sorahNumber)
    if (ayaNumber > 286 || sorahNumber > 114) {
        return  new Response({append:""}, {
            status: 404,
            headers: {
              "content-type": "application/json",
            },
          });
    }
  // Create a post request
  const response = await fetch(`https://quran.ksu.edu.sa/tafseer/saadi/sura${sorahNumber}-aya${ayaNumber}.html`)
  const document = new DOMParser().parseFromString(
    `${await response.text()}`,
    "text/html",
  )!;
  const tafseerConteiner = document.querySelector('#div_saadi')
  const tafseer = {
    ayah: tafseerConteiner.children[0].innerText,
    tafseerH: tafseerConteiner.children[2].innerText
  }
  return  new Response(JSON.stringify(tafseer), {
    status: response.status,
    headers: {
      "content-type": "application/json",
    },
  });
}

serve(handler);