import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
    en: {
        translation: {

        }
    },
    zh: {
        translation: {
            label: {
                searchCondition: "條件式搜索"
            },
            input: {
                placeholder: "請輸入{{field}}"
            },
            button: {
                clear: "清除",
                create: "新增",
                edit: "編輯",
                view: "查看",
                delete: "刪除"
            },
            customer: {
                listTitle: "客戶列表",
                dataTitle: "客戶資料",
                name: "客戶名稱",
                taxId: "客戶統編",
                owner: "業務窗口",
                phone: "客戶電話",
                contactPerson: "聯絡人",
                email: "email",
                address: "地址",
            }
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: "zh",
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;