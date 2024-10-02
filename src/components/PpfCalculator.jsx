import { useState } from "react";
import InvestmentForm from "./InvestmentForm";

const PpfCalculator = () => {
  const [calculated, setCalculated] = useState(false);
  const [finalAmount, setFinalAmount] = useState(0);

  // method to calculate PPF when invested monthly
  const calculatePpfTotalWithdrawlAmount_investedMonthly = (formData) => {
    // write logic
    let amountTillDate = 0;
    let depositAmount = parseInt(formData.depositAmount);
    let durationInYears = parseInt(formData.timeInYears);
    let rateOfInterest = parseInt(formData.rateOfInterest);

    while (durationInYears > 0) {
      // si = (p*r*t) / 100
      let interestEarnedThisYear = 0;
      let interest = 0;
      let months = 12;

      if (amountTillDate > 0) {
        // calculating interest on princple before start of this year
        interest = (amountTillDate * rateOfInterest * (12 / 12)) / 100;
      }

      while (months > 0) {
        // timeInYears = months / 12
        amountTillDate += depositAmount;
        interest += (depositAmount * rateOfInterest * (months / 12)) / 100;
        months -= 1;
      }

      interestEarnedThisYear += interest;
      amountTillDate += interestEarnedThisYear;
      durationInYears -= 1;
    }

    setCalculated(true);
    // setFinalAmount(amountTillDate.toFixed(2));
    setFinalAmount(
      amountTillDate.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      })
    );
  };

  const calculatePpfTotalWithdrawlAmount_investedAtTheBeginingOfFinancialYear =
    (formData) => {
      let amountTillDate = 0;
      let depositAmount = parseInt(formData.depositAmount);
      let durationInYears = parseInt(formData.timeInYears);
      let rateOfInterest = parseInt(formData.rateOfInterest);

      while (durationInYears > 0) {
        // si = (p*r*t) / 100
        let interestEarnedThisYear = 0;

        amountTillDate += depositAmount;
        interestEarnedThisYear = (amountTillDate * rateOfInterest ) / 100;

        amountTillDate += interestEarnedThisYear;
        durationInYears -= 1;
      }

      setCalculated(true);
    //   amountTillDate = depositAmount * ((1 + (rateOfInterest/100)) ** (durationInYears))
      setFinalAmount(
        amountTillDate.toLocaleString("en-IN", {
          style: "currency",
          currency: "INR",
        })
      );
    };

  const calculatePpf = (formData) => {
    if (formData.typeOfInvestment == "invest monthly") {
      calculatePpfTotalWithdrawlAmount_investedMonthly(formData);
    } else if (
      formData.typeOfInvestment ==
      "invest at the beginning of each financial year"
    ) {
      calculatePpfTotalWithdrawlAmount_investedAtTheBeginingOfFinancialYear(
        formData
      );
    }
  };

  return (
    <div className="h-[75%] sm:h-full sm:p-4 pt-12 flex flex-col items-center justify-between">
      <h1 className="w-full text-center py-2 font-bold text-xl bg-slate-400 text-white">
        PPF Calculator
      </h1>

      <InvestmentForm calculatePpf={calculatePpf} />

      {/* Show Result */}
      <h1 className="w-full text-center py-2 font-bold text-xl bg-slate-400 text-white">
        The Total Amout will be - &nbsp;
        {calculated == true ? (
          <span className="text-yellow-400">{finalAmount}</span>
        ) : (
          "!!"
        )}
      </h1>
    </div>
  );
};

export default PpfCalculator;
