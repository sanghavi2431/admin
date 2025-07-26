import useDynamicBorderRadius from "@/utils/hooks/useDynamicBorderRadius";

const HygieneSolutions = () => {
    const { elementRef, borderRadius} = useDynamicBorderRadius();

    const solutions = [
        {
            id: 1,
            icon: "/img/icons/hygiene-monitoring.png",
            title: "Hygiene Monitoring",
            description: "Monitor your business hygiene with Woloo's proprietary SaaS system."
        },
        {
            id: 2,
            icon: "/img/icons/hygiene-products.png", 
            title: "Hygiene Products",
            description: "Use your reward points to purchase hygiene essential products for your business."
        },
        {
            id: 3,
            icon: "/img/icons/hygiene-services.png",
            title: "Hygiene Services",
            description: "Maintain your business hygiene with Woloo's essential hygiene services."
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
            {solutions.map((solution) => (
                <div 
                ref={elementRef} 
                key={solution.id} 
                className="bg-white shadow-custom rounded-custom p-6 text-center flex flex-col items-center h-full"
                style={{borderRadius: `${borderRadius}px`}}
                >
                    <img src={solution.icon} alt={solution.title} className="w-14 h-14 md:w-16 md:h-16 mb-4" />
                    <h3 className="text-base md:text-lg font-bold text-black mb-2">{solution.title}</h3>
                    <p className="text-gray-500 text-xs md:text-sm">{solution.description}</p>
                </div>
            ))}
        </div>
    );
};

export default HygieneSolutions;
