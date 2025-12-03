import axios from 'axios'
const serves = axios.create({
  baseURL: __CONFIG__.BASE_API,
  timeout: 5000,
})

// Установите перехватчик перед отправкой запроса.
serves.interceptors.request.use(
  (config) => {
    // Настройте, какая обработка данных необходима перед отправкой.
    return config
  },
  (err) => Promise.reject(err),
)

// Настройте перехватчик принятия запросов
serves.interceptors.response.use(
  (res) => {
    // Какая обработка выполняется после настройки параметров приема данных?
    if (res.data.code === 50000) {
      // ElMessage.error(res.data.data);
    }
    return res
  },
  (err) => {
    // Проверьте, содержит ли информация об исключении запроса строку «timeout».
    if (err.message.includes('timeout')) {
      console.log('Обратный вызов при ошибке', err)
    }
    if (err.message.includes('Network Error')) {
      console.log('Обратный вызов при ошибке', err)
    }
    return Promise.reject(err)
  },
)

export default serves
