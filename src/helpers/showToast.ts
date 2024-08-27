// toastUtils.ts
import { toast } from 'react-toastify';
import { FiCheckCircle, FiXCircle, FiAlertCircle, FiInfo } from 'react-icons/fi';

const showToast = (type: 'success' | 'danger' | 'warning' | 'primary', message: string) => {
  // switch (type) {
  //   case 'success':
  //     toast.success(
  //       <>
  //         <FiCheckCircle /> {message}
  //       </>, {
  //         className: 'toast-success',
  //         bodyClassName: 'toast-body',
  //         progressClassName: 'toast-progress',
  //       }
  //     );
  //     break;
  //   case 'danger':
  //     toast.error(
  //       <>
  //         <FiXCircle /> {message}
  //       </>, {
  //         className: 'toast-danger',
  //         bodyClassName: 'toast-body',
  //         progressClassName: 'toast-progress',
  //       }
  //     );
  //     break;
  //   case 'warning':
  //     toast.warn(
  //       <>
  //         <FiAlertCircle /> {message}
  //       </>, {
  //         className: 'toast-warning',
  //         bodyClassName: 'toast-body',
  //         progressClassName: 'toast-progress',
  //       }
  //     );
  //     break;
  //   case 'primary':
  //     toast(
  //       <>
  //         <FiInfo /> {message}
  //       </>, {
  //         className: 'toast-primary',
  //         bodyClassName: 'toast-body',
  //         progressClassName: 'toast-progress',
  //       }
  //     );
  //     break;
  //   default:
  //     toast(
  //       <>
  //         <FiInfo /> {message}
  //       </>
  //     );
  // }
};

export default showToast;
