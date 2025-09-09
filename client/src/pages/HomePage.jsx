import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import { ChartPie, Link, MonitorSmartphone, ShieldPlus } from 'lucide-react';
import Footer from '../components/Footer';

const HomePage = () => {

    const features = [
        {
            id: 1,
            title: "Clean & Professional Links",
            description: "Turn long, messy URLs into short, trustworthy links that look great everywhere.",
            icon: ShieldPlus,// you can replace with an icon component later
            gradient: "from-blue-500 to-cyan-500"
        },
        {
            id: 2,
            title: "Trackable Analytics",
            description: "Get insights on clicks, location, device, browser, and more to measure engagement.",
            icon: ChartPie,
            gradient: "from-purple-500 to-pink-500"
        },
        {
            id: 3,
            title: "Cross-Platform Friendly",
            description: "Short links work seamlessly on web, mobile, social apps, and even offline in QR codes.",
            icon: MonitorSmartphone,
            gradient: "from-green-500 to-emerald-500"
        },
        {
            id: 4,
            title: "Link Management",
            description: "Edit or update your short link’s destination anytime—without changing the short URL.",
            icon: Link,
            gradient: "from-gray-500 to-cyan-500"
        },
    ];


    return (
        <>
            <div >
                <Navbar />
                <Hero />
            </div>
            {/*  Features Section */}
            <section className="py-20 bg-gradient-to-l from-slate-900 via-purple-900 to-slate-900">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            Modern Features
                        </h2>
                        <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                            Cutting-edge functionality with beautiful design
                        </p>
                    </div>
                    <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>

                        {features.map((feature, index) => (
                            <div key={index} className="group relative overflow-hidden bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-slate-700 hover:border-slate-600 transition-all duration-300 hover:scale-105">
                                {/* Gradient Background on Hover */}
                                <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                                <div className={`relative w-14 h-14 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    <feature.icon className="w-7 h-7 text-white" />
                                </div>

                                <h3 className="relative text-2xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                                    {feature.title}
                                </h3>

                                <p className="relative text-slate-300 leading-relaxed group-hover:text-slate-200 transition-colors duration-300">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default HomePage