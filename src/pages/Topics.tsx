import React from 'react';
import { Scale, Car, Smartphone, Home as HomeIcon, Briefcase, FileText } from 'lucide-react';

export default function Topics() {
  const topicsList = [
    { title: "Consumer Rights", icon: <Scale />, desc: "Refunds, defective products, and misleading ads." },
    { title: "Traffic Violations", icon: <Car />, desc: "Challans, vehicle impounding, and your rights." },
    { title: "Cyber Crime", icon: <Smartphone />, desc: "Online fraud, identity theft, and reporting." },
    { title: "Property Law", icon: <HomeIcon />, desc: "Tenant rights, buying property, and disputes." },
    { title: "Employment Law", icon: <Briefcase />, desc: "Workplace harassment, salary disputes, and contracts." },
    { title: "Filing an FIR", icon: <FileText />, desc: "Step-by-step guide to reporting a crime to the police." },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Legal Topics Directory</h1>
      <p className="text-lg text-gray-600 mb-10">Select a category below to learn about your rights and procedures in plain language.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topicsList.map((topic, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-blue-500 transition-colors cursor-pointer flex gap-4 items-start">
            <div className="p-3 bg-blue-50 text-blue-900 rounded-lg">
              {topic.icon}
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-1">{topic.title}</h3>
              <p className="text-sm text-gray-600">{topic.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
