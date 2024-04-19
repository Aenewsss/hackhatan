class StorageService {
    setItem(key: string, value: any){
        localStorage.setItem(key, value)
    }

    getItem(key: string){
        return localStorage.getItem(key)
    }

    removeItem(key: string){
        localStorage.removeItem(key)
    }

    removeAll(){
        localStorage.clear()
    }
}

const storageService = new StorageService()

export default storageService