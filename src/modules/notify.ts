import Vue3Toasity, { type ToastContainerOptions } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { type UserModule } from '~/types'

export const install: UserModule = ({ app }) => {
  app.use(Vue3Toasity,
    {
      autoClose: 3000,
    } as ToastContainerOptions,
  )
}
