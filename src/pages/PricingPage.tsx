import React, { useState } from "react";
import { pricingPlans, type Plan } from "../features/pricing/pricingData";
import { CheckIcon } from "../components/icons";
import { Button } from "../components/ui/Button";

const PricingCard: React.FC<{ plan: Plan; isAnnual: boolean }> = ({
  plan,
  isAnnual,
}) => {
  const billingCycle = isAnnual ? "/year" : "/month";
  const fullPrice = isAnnual ? plan.price.annually : plan.price.monthly;

  return (
    <div
      className={`bg-white/5 border rounded-2xl p-8 flex flex-col ${
        plan.isFeatured
          ? "border-blue-500 ring-2 ring-blue-500"
          : "border-white/20"
      }`}
    >
      {plan.isFeatured && (
        <div className='bg-blue-500 text-white text-xs font-bold uppercase tracking-wider px-4 py-1 rounded-full self-start mb-4'>
          Most Popular
        </div>
      )}
      <h3 className='text-2xl font-bold text-white'>{plan.name}</h3>
      <p className='text-white/70 mt-2 mb-6 flex-grow'>{plan.description}</p>
      <div className='mb-8'>
        <span className='text-5xl font-extrabold text-white'>${fullPrice}</span>
        <span className='text-white/70'>{billingCycle}</span>
        {isAnnual && (
          <p className='text-sm text-green-400 mt-1'>
            Billed annually. Save 20%!
          </p>
        )}
      </div>
      <ul className='space-y-4 mb-8'>
        {plan.features.map((feature, index) => (
          <li key={index} className='flex items-center gap-3'>
            <CheckIcon className='w-5 h-5 text-green-400' />
            <span className='text-white/90'>{feature}</span>
          </li>
        ))}
      </ul>
      <Button
        variant={plan.isFeatured ? "primary" : "secondary"}
        className='w-full mt-auto justify-center'
      >
        Choose Plan
      </Button>
    </div>
  );
};

export const PricingPage: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <div className='container mx-auto px-6 py-12'>
      <div className='text-center mb-12 max-w-3xl mx-auto'>
        <h1 className='text-4xl lg:text-5xl font-extrabold text-white mb-4'>
          Find the Perfect Plan
        </h1>
        <p className='text-lg text-white/80'>
          Start for free, then upgrade to a plan that fits your business needs.
          Simple, transparent pricing.
        </p>
      </div>

      <div className='flex justify-center items-center gap-4 mb-12'>
        <span
          className={`font-semibold ${
            !isAnnual ? "text-white" : "text-white/60"
          }`}
        >
          Monthly
        </span>
        <button
          onClick={() => setIsAnnual(!isAnnual)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            isAnnual ? "bg-blue-600" : "bg-white/20"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              isAnnual ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
        <span
          className={`font-semibold ${
            isAnnual ? "text-white" : "text-white/60"
          }`}
        >
          Annually (Save 20%)
        </span>
      </div>

      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto'>
        {pricingPlans.map((plan) => (
          <PricingCard key={plan.name} plan={plan} isAnnual={isAnnual} />
        ))}
      </div>
    </div>
  );
};
