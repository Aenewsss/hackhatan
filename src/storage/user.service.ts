import { UserEnum } from "./types"

class UserService {
    getUser() {
        if (typeof window == 'undefined') return { email: '', level: 0, name: 1, points: 0 }

        const email = localStorage.getItem(UserEnum.USER_EMAIL) || ''
        const level = Number(localStorage.getItem(UserEnum.USER_LEVEL))
        const name = localStorage.getItem(UserEnum.USER_NAME)
        const points = Number(localStorage.getItem(UserEnum.USER_POINTS))
        return { email, level, name, points }
    }
}

const userService = new UserService()

export default userService