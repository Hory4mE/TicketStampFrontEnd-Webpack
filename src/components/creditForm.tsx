import { FormErrors, NcButton, NcForm, NcLabel, NcScrollbar, NcTextField } from "@nipacloud/nc-design-system-react";
import { FC, useRef, useState } from "react";

const CreditForm: FC = () => {
    const formRef = useRef<HTMLNcFormElement>(null);
    const scrollRef = useRef<HTMLNcScrollbarElement>(null);
    const [errors, setErrors] = useState<FormErrors>({});
  
    const submitForm = async () => {
      if (formRef.current) {
        const [result, errorElement] =
          await formRef.current.validateWithFirstError();
  
        setErrors(result);
  
        if (errorElement) {
          scrollRef.current?.setScroll({
            top: errorElement.offsetTop,
            behavior: "smooth",
          });
        }
      }
    };
  
    return (
      <>
        <div className="my-7 max-h-[900px] border">
          <NcScrollbar ref={scrollRef}>
            <div className="p-3">
              <div className="mb-5">Add a Credit Card</div>
  
              <NcForm ref={formRef}>
                <NcTextField
                  role="textbox"
                  name="firstName"
                  required
                  error={errors.firstName}
                >
                  <NcLabel slot="label">Fisrt Name</NcLabel>
                </NcTextField>
  
                <NcTextField
                  className="mt-3"
                  name="lastName"
                  required
                  error={errors.lastName}
                >
                  <NcLabel slot="label">Last Name</NcLabel>
                </NcTextField>
  
                <NcTextField
                  className="mt-3"
                  name="address1"
                  required
                  error={errors.address1}
                >
                  <NcLabel slot="label">Address Line 1</NcLabel>
                </NcTextField>
  
                <NcTextField
                  className="mt-3"
                  name="address2"
                  error={errors.address2}
                >
                  <NcLabel slot="label">Address Line 2</NcLabel>
                </NcTextField>
  
                <NcTextField
                  className="mt-3"
                  name="cardNumber"
                  required
                  error={errors.cardNumber}
                >
                  <NcLabel slot="label">Card Number</NcLabel>
                </NcTextField>
  
                <div className="mt-3 flex items-center gap-3">
                  <NcTextField name="date" required error={errors.date}>
                    <NcLabel slot="label">Date</NcLabel>
                  </NcTextField>
  
                  <NcTextField name="cvc" required error={errors.cvc}>
                    <NcLabel slot="label">CVC</NcLabel>
                  </NcTextField>
                </div>
  
                <NcButton className="mt-3" onClick={submitForm}>
                  Submit
                </NcButton>
              </NcForm>
            </div>
          </NcScrollbar>
        </div>
      </>
    );
}

export default CreditForm;