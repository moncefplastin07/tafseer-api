import { serve } from "./deps.ts";
import { getTafseer } from "./getTafseer.ts";
async function handler(_req:Request) { 
    const requestURL = new URL(_req.url)
    const urlPathName = requestURL.pathname.split('/').slice(1)
    const [mofasir, sorah, ayah] = urlPathName
    if (urlPathName.length < 3) {
      return  new Response(JSON.stringify({error:"الرابط الذي قمت بادخاله غير صالح"}), {
        status: 404,
        headers: {
          "content-type": "application/json",
        },
      });
    }
    if (+ayah > 286 || +sorah > 114) {
        return  new Response(JSON.stringify({error:"الاية او السورة التي قمت بادخالها خير موجودة"}), {
            status: 404,
            headers: {
              "content-type": "application/json",
            },
          });
    }
  // Create a post request
 const tafseer = await getTafseer(mofasir,sorah,ayah)
  return  new Response(JSON.stringify(tafseer), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
}

serve(handler);