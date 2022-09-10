import { DOMParser } from "./deps.ts";
export async function getTafseer (mofasir:string, sorah: string, ayah:string) {
    const response = await fetch(`http://quran.ksu.edu.sa/tafseer/${mofasir}/sura${sorah}-aya${ayah}.html`)
    console.log(response.url)
    const documentString = await response.text()
    const document = new DOMParser().parseFromString(
      `${documentString}`,
      "text/html",
    )!;
    const tafseerConteiner = document.querySelector(`#div_${mofasir}`)
    return {
      mofasir,
      ayahText: tafseerConteiner.children[0].innerText,
      tafseerText: tafseerConteiner.children[2].innerText
    }
  }