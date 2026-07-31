import {ref} from "vue"

import fr from "../locales/fr"
import en from "../locales/en"



const browserLang =
navigator.language.startsWith("fr")
?
"fr"
:
"en"



const currentLang =
ref(browserLang)



const translations={

fr,
en

}



export function useLanguage(){



const t=(section,key)=>{


return translations[currentLang.value]
[section]
[key]


}



const changeLanguage=(lang)=>{

currentLang.value=lang

}



return{

t,
currentLang,
changeLanguage

}



}