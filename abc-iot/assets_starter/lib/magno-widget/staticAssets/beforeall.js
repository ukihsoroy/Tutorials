let priviewhasTokenFlag = false
let priviewGlobaltoken = ''

function setToken () {
  if (priviewhasTokenFlag) {
    return
  }
  const getToken = () => {
    try {
      token = ''
      $.ajax({
        type: 'POST',
        url: '/baas/auth/v1.0/login',
        data: JSON.stringify({
          'username': 'process.env.username',
          'password': 'process.env.password'
        }),
        async: false,
        contentType: 'application/json',
        success: function (response) {
          console.log(response)
          if (response && response.resCode == '0') {
            priviewGlobaltoken = response.result.token
            $.ajaxSetup({
              headers: {
                'access-token': priviewGlobaltoken
              }
            })
          }
        }
      })
    } catch (err) {

    }
  }
  getToken()
  hasTokenFlag = true
  setInterval(getToken, 10 * 60 * 1000 /* 10分钟更新一次token */)
}
setToken()
