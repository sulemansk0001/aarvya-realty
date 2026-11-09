import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
  badge: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, image, link, badge }) => {
  return (
    <div className="group bg-white rounded-xl border border-[#E0E6ED] overflow-hidden transition-all duration-300 hover:border-[#D4AF37] hover:shadow-cardHover hover:-translate-y-1 flex flex-col justify-between" data-cursor="card">
      <div className="relative aspect-[16/10] overflow-hidden bg-[#071629]">
        <img
          src={image}
          alt={title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-[#0B1F3B]/90 backdrop-blur-sm text-[#D4AF37] border border-[#D4AF37]/40 text-[11px] font-semibold px-2.5 py-1 rounded shadow-sm">
            {badge}
          </span>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-poppins font-bold text-xl text-[#0B1F3B] group-hover:text-[#D4AF37] transition-colors duration-200 mb-2">
            {title}
          </h3>
          <p className="text-sm text-[#667085] leading-relaxed mb-6">
            {description}
          </p>
        </div>

        <div>
          <Link
            to={link}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0B1F3B] group-hover:text-[#D4AF37] transition-colors"
          >
            <span>Learn More</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#D4AF37]" />
          </Link>
        </div>
      </div>
    </div>
  );
};
