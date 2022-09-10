import { DOMParser } from "./deps.ts";
export async function getTafseer (mofasir:string, sorah: string, ayah:string) {
    const response = await fetch(`http://quran.ksu.edu.sa/tafseer/${mofasir}/sura${sorah}-aya${ayah}.html`)
    const documentString = await response.text()
    const document = new DOMParser().parseFromString(
      `${documentString}`,
      "text/html",
    )!;
    const tafseerConteiner = document.querySelector(`#div_${mofasir}`)
    const [sorahNumberNode, sorahInArabicNode, sorahInEnglishNode] = document.querySelector(`#sowar_ul li.active a`).childNodes
    const ayahNumber = document.querySelector(`#ayat_ul li.active a`).innerText
    
    return {
      sorahInArabic:sorahInArabicNode.textContent.trim(),
      sorahInEnglish:sorahInEnglishNode.textContent.trim(),
      sorahNumber:sorahNumberNode.textContent.trim(),
      ayahNumber,
      mofasir,
      // sorahNumber:+sorah,
      // ayaNumber:+ayah,
      ayahText: tafseerConteiner.children[0].innerText,
      tafseerText: tafseerConteiner.children[2].innerText
    }
  }