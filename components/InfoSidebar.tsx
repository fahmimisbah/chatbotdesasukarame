import React from 'react';
import { MapPin, Fish, Home, Camera, ExternalLink, BedDouble, Globe, Ticket } from 'lucide-react';

export const InfoSidebar: React.FC = () => {
  const features = [
    {
      icon: <Fish className="w-5 h-5 text-teal-500" />,
      title: "Ekowisata Bahari",
      desc: "Transplantasi karang & snorkeling"
    },
    {
      icon: <Home className="w-5 h-5 text-teal-500" />,
      title: "Homestay Warga",
      desc: "Menginap nyaman suasana desa"
    },
    {
      icon: <Camera className="w-5 h-5 text-teal-500" />,
      title: "Spot Foto",
      desc: "Sunset view & jembatan pelangi"
    },
    {
      icon: <MapPin className="w-5 h-5 text-teal-500" />,
      title: "Lokasi",
      desc: "Carita, Pandeglang, Banten"
    }
  ];

  const mapLocations = [
    { name: "Pantai Sukarame", url: "https://maps.app.goo.gl/fDXaaujHS1juhjXA6" },
    { name: "Konservasi Alam Bawah Laut", url: "https://maps.app.goo.gl/EZJSmWZTB6Tf1TwS6" },
    { name: "Taman Pintar Sukarame", url: "https://maps.app.goo.gl/dhAqnVkf1x2tsraK9" },
    { name: "Jembatan Gantung", url: "https://maps.app.goo.gl/dMp7yKez9A5q7HyW8" },
    { name: "Curug Putri Carita", url: "https://maps.app.goo.gl/2MnuTibBkHPimXwVA" }
  ];

  const homestays = [
    { name: "Pondok Badak", price: "Rp 500rb", note: "Keluarga" },
    { name: "Tropical Homestay", price: "Rp 350rb", note: "Cozy" },
    { name: "Ceria Homestay", price: "Rp 250rb", note: "Hemat" }
  ];

  const packages = [
    "Transplantasi Karang",
    "Edutrip Sawah & Pahat",
    "Explore Teluk Carita",
    "One Day Trip",
    "Live In / 2 Hari 1 Malam",
    "Sewa Sepeda"
  ];

  return (
    <div className="hidden lg:flex flex-col w-80 bg-white border-r border-gray-200 h-full overflow-y-auto p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-teal-800 mb-2">Desa Wisata Sukarame</h2>
        <p className="text-sm text-gray-500">Jelajahi keindahan alam bawah laut dan keramahan lokal.</p>
      </div>

      <div className="space-y-6 mb-8">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Keunggulan Desa</h3>
        {features.map((item, idx) => (
          <div key={idx} className="flex items-start space-x-3 group cursor-default">
            <div className="p-2 bg-teal-50 rounded-lg group-hover:bg-teal-100 transition-colors">
              {item.icon}
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-800">{item.title}</h4>
              <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-3 mb-8">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Paket Wisata 🎒</h3>
        <div className="bg-white border border-gray-100 p-3 rounded-lg shadow-sm">
          <ul className="space-y-2">
            {packages.map((pkg, idx) => (
              <li key={idx} className="flex items-center text-sm text-gray-700">
                <Ticket className="w-3 h-3 text-teal-500 mr-2 flex-shrink-0" />
                <span className="truncate">{pkg}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="space-y-3 mb-8">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Info Penginapan 🏡</h3>
        <div className="grid gap-2">
          {homestays.map((home, idx) => (
             <div key={idx} className="bg-white border border-gray-100 p-3 rounded-lg shadow-sm hover:border-teal-200 transition-colors">
               <div className="flex justify-between items-start">
                 <div className="flex items-center gap-2">
                    <BedDouble className="w-4 h-4 text-teal-500" />
                    <span className="text-sm font-medium text-gray-800">{home.name}</span>
                 </div>
               </div>
               <div className="flex justify-between items-center mt-2">
                  <span className="text-xs bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full">{home.note}</span>
                  <span className="text-xs font-bold text-gray-600">{home.price}</span>
               </div>
             </div>
          ))}
        </div>
      </div>

      <div className="space-y-3 mb-8">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Peta Destinasi 📍</h3>
        <div className="bg-gray-50 rounded-xl p-2 border border-gray-100">
          {mapLocations.map((loc, idx) => (
            <a 
              key={idx} 
              href={loc.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all group text-xs text-gray-700 mb-1 last:mb-0"
            >
              <span className="truncate pr-2">{loc.name}</span>
              <ExternalLink className="w-3 h-3 text-gray-400 group-hover:text-teal-600 flex-shrink-0" />
            </a>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <a 
          href="https://jadesta.kemenparekraf.go.id/desa/sukarame" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-center w-full p-3 bg-teal-50 border border-teal-200 text-teal-700 hover:bg-teal-100 rounded-xl transition-all shadow-sm gap-2 text-sm font-semibold group"
        >
          <Globe className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span>Website Resmi Jadesta</span>
        </a>
      </div>

      <div className="mt-auto pt-4">
        <div className="bg-teal-50 rounded-xl p-4 border border-teal-100">
          <h4 className="text-sm font-bold text-teal-800 mb-1">Tips Berkunjung 💡</h4>
          <p className="text-xs text-teal-700 leading-relaxed">
            Bawalah pakaian ganti jika ingin snorkeling. Jagalah kebersihan laut dengan tidak membuang sampah sembarangan.
          </p>
        </div>
      </div>
    </div>
  );
};