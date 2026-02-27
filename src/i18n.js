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
                delete: "刪除",
                confirm: "確認",
                cancel: "取消",
                return: "返回",
                systemInfo: "系統資訊"
            },
            customer: {
                title: "客戶管理",
                listTitle: "客戶列表",
                dataTitle: "客戶資料",
                name: "客戶名稱",
                taxId: "客戶統編",
                owner: "業務窗口",
                phone: "客戶電話",
                contactPerson: "聯絡人",
                email: "email",
                address: "地址",
            },
            message: {
                customer: "客戶"
            },
            script: {
                "deleteConfirm": "確定刪除此{{entity}} ?"
            },
            data: {
                createdBy: "建立者",
                createdAt: "建立時間",
                modifiedBy: "修改者",
                modifiedAt: "修改時間",
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