import {
    NcButton,
    NcMenu,
    NcMenuItem,
    NcMenuItems,
} from "@nipacloud/nc-design-system-react";
import { FC, useRef, useState } from "react";
import CreditForm from "./creditForm";

const paymentMethods = ["SCB", "KBANK", "TTB", "CREDIT CARD"];

const PaymentMenu: FC = () => {
  const ref = useRef<HTMLNcMenuElement>(null);
  const [selectedItem, setSelectedItem] = useState<number>();

  const toggle = () => {
    ref.current?.toggle();
  };

  const handleClick = (index: number) => {
    setSelectedItem(index);
  };

  return (
    <>
      <NcMenu ref={ref}>
        <NcButton onNcClick={toggle}>Open Menu</NcButton>

        <NcMenuItems className="w-[100px]">
          {paymentMethods.map((method, i) => (
            <NcMenuItem key={i} onNcClick={() => handleClick(i)}>
              {method}
            </NcMenuItem>
          ))}
        </NcMenuItems>
      </NcMenu>

      {selectedItem !== undefined && (
        <div>
          <h2>{paymentMethods[selectedItem]}</h2>
          {selectedItem === 3 ? (
            <CreditForm />
          ) : (
            <p>Form for {paymentMethods[selectedItem]}</p>
          )}
        </div>
      )}
    </>
  );
};

export default PaymentMenu;
