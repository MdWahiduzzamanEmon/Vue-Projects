import { toast } from 'vue3-toastify';

export default function NotifyToast(message, type) {
  toast(message, {
    type: type,
    position: 'top-center',
    timeout: 1500,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: false,
    closeButton: 'button',
    icon: true,
    rtl: false,
    multiple: false,
  });
}
