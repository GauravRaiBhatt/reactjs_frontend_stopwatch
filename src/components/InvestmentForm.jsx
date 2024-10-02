import { useState, useEffect } from "react";

const InvestmentForm = ({calculatePpf}) => {
  const [formData, setFormData] = useState({
    typeOfInvestment: "invest monthly",
    depositAmount: "12500",
    timeInYears: "15",
    rateOfInterest: "7.1",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  // Validation function
  const validate = () => {
    const newErrors = {};

    
    // Deposit Amount validation (1 to 12500)
    if(formData.typeOfInvestment == "invest at the beginning of each financial year"){
        
        if (
            !formData.depositAmount ||
            formData.depositAmount < 1 ||
            formData.depositAmount > 150000
        ) {
            newErrors.depositAmount = "Deposit amount must be between 1 and 150000.";
        }

    }else{
        
        if (
            !formData.depositAmount ||
            formData.depositAmount < 1 ||
            formData.depositAmount > 12500
        ) {
            newErrors.depositAmount = "Deposit amount must be between 1 and 12500.";
        }
    }

    // Time in Years validation (1 to 15)
    if (
      !formData.timeInYears ||
      formData.timeInYears < 1 ||
      formData.timeInYears > 15
    ) {
      newErrors.timeInYears = "Time in years must be between 1 and 15.";
    }

    // Rate of Interest validation (1 to 100, can be float)
    if (
      !formData.rateOfInterest ||
      formData.rateOfInterest <= 0 ||
      formData.rateOfInterest > 100
    ) {
      newErrors.rateOfInterest = "Rate of interest must be between 1 and 100.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
        
    if (value == "invest at the beginning of each financial year") {
      setFormData({
        [name]: value,
        depositAmount: "150000",
        timeInYears: "15",
        rateOfInterest: "7.1",
      });
    }
    else if (value == "invest monthly") {
        setFormData({
          [name]: value,
          depositAmount: "12500",
          timeInYears: "15",
          rateOfInterest: "7.1",
        });
    }
    else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
        console.log("Form Data Submitted:", formData);
        calculatePpf(formData);        
    }
  };

  // Disable submit button if any errors exist or any field is empty
  useEffect(() => {
    const isFormValid =
      validate() && Object.values(formData).every((field) => field !== "");
    setIsSubmitDisabled(!isFormValid);
  }, [formData]);

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg"
    >
      {/* Type of Investment */}
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Type of Investment <span className="text-red-500">*</span>
        </label>
        <select
          name="typeOfInvestment"
          value={formData.typeOfInvestment}
          onChange={handleChange}
          className="block w-full border rounded-md p-2"
          required
        >
          <option value="invest monthly">Invest Monthly</option>
          <option value="invest at the beginning of each financial year">
            Invest at the Beginning of Each Financial Year
          </option>
        </select>
      </div>

      {/* Deposit Amount */}
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Deposit Amount <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          name="depositAmount"
          value={formData.depositAmount}
          onChange={handleChange}
          className="block w-full border rounded-md p-2"
          placeholder="Enter deposit amount (1-12500)"
          required
          min={1}
          max={
            formData.typeOfInvestment ==
            "invest at the beginning of each financial year"
              ? 150000
              : 12500
          }
        />
        {errors.depositAmount && (
          <p className="text-red-500 text-sm">{errors.depositAmount}</p>
        )}
      </div>

      {/* Time in Years */}
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Time in Years <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          name="timeInYears"
          value={formData.timeInYears}
          onChange={handleChange}
          className="block w-full border rounded-md p-2"
          placeholder="Enter time (1-15 years)"
          required
          min={1}
          max={15}
        />
        {errors.timeInYears && (
          <p className="text-red-500 text-sm">{errors.timeInYears}</p>
        )}
      </div>

      {/* Rate of Interest */}
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Rate of Interest (%) <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          step="0.01" // Allow float values
          name="rateOfInterest"
          value={formData.rateOfInterest}
          onChange={handleChange}
          className="block w-full border rounded-md p-2"
          placeholder="Enter rate of interest (1-100%)"
          required
          min={0.1}
          max={100}
        />
        {errors.rateOfInterest && (
          <p className="text-red-500 text-sm">{errors.rateOfInterest}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className={`w-full py-2 px-4 rounded ${
          isSubmitDisabled
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-700 text-white"
        }`}
        disabled={isSubmitDisabled}
      >
        Submit
      </button>
    </form>
  );
};

export default InvestmentForm;
