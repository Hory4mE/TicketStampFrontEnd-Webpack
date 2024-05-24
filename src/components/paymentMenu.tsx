import {
  NcTab,
  NcTabPanel,
  NcTabPanels,
  NcTabs,
} from "@nipacloud/nc-design-system-react";
import { FC, useState } from "react";
import CreditForm from "./creditForm";

const paymentMethods = [
  "SCB",
  "KBANK",
  "TTB",
  "CREDIT CARD",
  "Binance Smart Chain",
];

const PaymentTabs: FC = () => {
  const [selectedItem, setSelectedItem] = useState<string>("item1");

  const handleClick = (name: string) => {
    setSelectedItem(name);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto bg-white shadow-lg rounded-lg">
      <NcTabs
        group={selectedItem}
        onChange={(name: any) => handleClick(name)}
        className="flex justify-center border-b-2 border-grey-200 mb-4"
      >
        {paymentMethods.map((method, i) => (
          <NcTab
            key={i}
            label={method}
            name={`item${i + 1}`}
            className={`px-4 py-2 cursor-pointer transition-colors duration-300 ${
              selectedItem === `item${i + 1}`
                ? "text-blue-600 border-blue-0 border-b-2"
                : "text-grey-600 hover:text-blue-600"
            }`}
          />
        ))}
      </NcTabs>

      <NcTabPanels group={selectedItem} className="p-4">
        {paymentMethods.map((method, i) => (
          <NcTabPanel key={i} name={`item${i + 1}`} className="mt-4">
            <h2 className="text-xl font-semibold mb-2">{method}</h2>
            {method === "CREDIT CARD" ? (
              <CreditForm />
            ) : (
              <p className="text-grey-600">Form for {method}</p>
            )}
          </NcTabPanel>
        ))}
      </NcTabPanels>
    </div>
  );
};

export default PaymentTabs;
