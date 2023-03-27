import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthenticationStore = defineStore('AuthenticationStore', () => {
  const isLoggedIn = ref(false)
  const userInfo = ref(null)
 const loginLoading = ref(false)

  const login = (user) => {
    // const router = useRouter()
    loginLoading.value = true
    fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: user.username,
        password: user.password
        // expiresInMins: 60, // optional
      })
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        if(data.message === "Invalid credentials"){
            loginLoading.value = false
            isLoggedIn.value = false
            userInfo.value = null
            localStorage.setItem(
                'nimoInfo',
                JSON.stringify({
                    ...data,
                    isLoggedIn: false
                })
            )
            return
        }

        isLoggedIn.value = true
        userInfo.value = data.user
        localStorage.setItem(
          'nimoInfo',
          JSON.stringify({
            ...data,
            isLoggedIn: true
          })
        )
        loginLoading.value = false
      }).catch((err) => {
        console.log(err)
      }
        )
  }

    const checkAuth = () => {
        const nimoInfo = JSON.parse(localStorage.getItem('nimoInfo'))
        if (nimoInfo.token) {
            if (nimoInfo.isLoggedIn) {
                isLoggedIn.value = true
                userInfo.value = nimoInfo.user
                return true
            }
        }else{
            return false
        }
    }


  const logout = () => {
    isLoggedIn.value = false
    userInfo.value = null
    localStorage.setItem(
      'nimoInfo',
      JSON.stringify({
        isLoggedIn: false
      })
    )
  }

  return {
    isLoggedIn,
    userInfo,
    login,
    logout,
    checkAuth,
    loginLoading
  }
})
