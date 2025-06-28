export default function PricingSection() {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      features: ['Access to basic chat', 'Limited messages/day', 'Community support'],
    },
    {
      name: 'Pro',
      price: '$9.99/mo',
      features: ['Unlimited messages', 'Priority AI responses', 'Email support'],
    },
    {
      name: 'Premium',
      price: '$29.99/mo',
      features: ['All Pro features', 'Faster response time', '1-on-1 AI consulting'],
    },
  ];

  return (
    <section id="pricing" className="scroll-mt-24 min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 py-20 px-4 text-white"
    >
      <h2 className="text-4xl font-bold mb-10">Pricing Plans</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="bg-gray-950 rounded-2xl shadow-2xl p-8 flex flex-col items-center hover:scale-105 transition-transform duration-300"
          >
            <h3 className="text-2xl font-semibold mb-4 text-indigo-400">{plan.name}</h3>
            <p className="text-4xl font-bold text-white mb-6">{plan.price}</p>
            <ul className="text-gray-300 space-y-3 mb-6 text-center">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 justify-center">
                  ✅ {feature}
                </li>
              ))}
            </ul>
            <button
              className="mt-auto text-white px-6 py-2 rounded-full 
              bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
              bg-[length:200%] bg-left hover:bg-right transition-[background-position] duration-500"
            >
              Choose {plan.name}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
