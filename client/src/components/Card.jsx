import React from 'react'
import { Lock, Users, Smartphone } from 'lucide-react'

const Card = () => {
    return (
        <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        Modern Features
                    </h2>
                    <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                        Cutting-edge functionality with beautiful design
                    </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        { icon: Users, title: "Collaboration", desc: "Work together seamlessly with your team",  },
                        { icon: Lock, title: "Privacy First", desc: "Your data is encrypted and secure", gradient: "from-purple-500 to-pink-500" },
                        { icon: Smartphone, title: "Mobile Ready", desc: "Perfect experience on any device", gradient: "from-green-500 to-emerald-500" }
                    ].map((feature, index) => (
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
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )

}

export default Card