import { showNotification } from "../../component/Notifications/showNotification";
import "react-toastify/dist/ReactToastify.css";

const customId = "custom-id-yes";
// const toastConfig = {
//   position: "top-right",
//   autoClose: 2000,
//   hideProgressBar: false,
//   closeOnClick: true,
//   pauseOnHover: true,
//   draggable: false,
//   progress: undefined,
//   toastId: customId,
//   delay: 0,
// };

function validateInput(input) {
  const lang = localStorage.getItem('lang');
  if (input === "") {
    showNotification(
      '',
      lang === 'en' ? 'Please fill the input field.' : '입력 필드를 채우십시오.',
      'danger',
      3000
    );
    // toast.error(<FormattedMessage id={"inputField"} />, { ...toastConfig });
    return false;
  }

  if (input.includes(".")) {
    let afterDecimal = input.split(".")[1];
    let beforeDecimal = input.split(".")[0];

    if (afterDecimal.length > 18) {
      showNotification(
        '',
        lang === 'en' ? 'Digits after decimal should not be greater than 18.' : '소수점 이하 자릿수는 18보다 클 수 없습니다.',
        'danger',
        3000
      );
      //toast.error(<FormattedMessage id={"digitsGreater18"} />, {...toastConfig,});
      return false;
    }

    let nonZeroInput = true;
    for (let i = 0; i < afterDecimal.length; i++) {
      if (parseInt(afterDecimal[i]) >= 1 && parseInt(afterDecimal[i]) <= 9) {
        nonZeroInput = false;
      }
    }

    let nonZeroInputBeforDecimal = true;
    for (let i = 0; i < beforeDecimal.length; i++) {
      if (parseInt(beforeDecimal[i]) >= 1 && parseInt(beforeDecimal[i]) <= 9) {
        nonZeroInputBeforDecimal = false;
      }
    }

    if (nonZeroInput && nonZeroInputBeforDecimal) {
      showNotification(
        '',
        lang === 'en' ? 'Please enter a valid input' : '유효한 입력을 입력하십시오',
        'danger',
        3000
      );
      //  toast.error(<FormattedMessage id={"validInput"} />, {...toastConfig,});
      return false;
    }
  }

  // if (input.length > 80) {
  //   toast.error("Input length greater than 25 can not be used", {
  //     ...toastConfig,
  //   });
  //   return false;
  // }
  // if (input.length > 25) {
  //   showNotification(
  //     '',
  //     lang === 'en' ? 'Input length greater than 25 can not be used' : '25보다 큰 입력 길이는 사용할 수 없습니다.',
  //     'danger',
  //     3000
  //   );
  //   //toast.error(<FormattedMessage id={"digitsGreater25"} />, {...toastConfig,});
  //   return false;
  // }

  if ( input === "0") {
    showNotification(
      '',
      lang === 'en' ? 'Please enter a valid input' : '유효한 입력을 입력하십시오',
      'danger',
      3000
    );
    return false
    //toast.error(<FormattedMessage id={"validInput"} />, {...toastConfig,});
    }
  if (input.includes(".") && !input.split(".")[1]) {
    showNotification(
      '',
      lang === 'en' ? 'Please enter a valid input' : '유효한 입력을 입력하십시오',
      'danger',
      3000
    );
   // toast.error(<FormattedMessage id={"validInput"} />, {...toastConfig,});
    return false;
  }

  let nonZeroInput = true;
  for (let i = 0; i < input.length; i++) {
    if (parseInt(input[i]) >= 1 && parseInt(input[i]) <= 9) {
      nonZeroInput = false;
    }
  }

  if (nonZeroInput) {
    showNotification(
      '',
      lang === 'en' ? 'Please enter a valid input' : '유효한 입력을 입력하십시오',
      'danger',
      3000
    );
   // toast.error(<FormattedMessage id={"validInput"} />, {...toastConfig,});
    return false;
  }

  return true;
}

export default validateInput;
