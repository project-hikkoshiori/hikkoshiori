import { Gender, UserType, WorkPattern } from "./types";

export const genderUI = (g: Gender) => {
    switch (g) {
        case "MAN":
            return "男性"
        case "WOMAN":
            return "女性"
        default:
            return "invalid"
    }
}

export const userTypeUI = (u: UserType) => {
    switch (u) {
        case "STUDENT":
            return "学生"
        case "NEW_WORKER":
            return "新社会人"
        case "WORKER":
            return "社会人"
        default:
            return "invalid"
    }
}

export const workPatternUI = (w: WorkPattern) => {
    switch (w) {
        case "REMOTE":
            return "リモート勤務"
        case "ELSE":
            return "その他(無職)"
        default: 
            return "invalid"
    }
}
