import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

interface CategoryCardProps {
  title: string;
  count: number;
  image: string;
  bhk: string;
  desc?: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ title, count, image, bhk, desc }) => {
  const queryParam = bhk === 'Commercial' ? 'propertyType=Commercial+Office' : bhk === 'Villa' ? 'propertyType=Villa' : `bhk=${encodeURIComponent(bhk)}`;

  return (
    <Link
      to={`/properties?${queryParam}`}
      className="group relative bg-white rounded-xl border border-[#E0E6ED] overflow-hidden p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-cardHover hover:bg-[#0B1F3B] hover:border-[#0B1F3B] flex flex-col justify-between"
      data-cursor="card"
    >
      <div>
        {/* Subtle background thumbnail */}
        <div className="w-14 h-14 rounded-lg overflow-hidden mb-5 border border-[#E0E6ED] group-hover:border-white/30 transition-colors">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>

        <h3 className="font-poppins font-semibold text-lg text-[#0B1F3B] group-hover:text-white transition-colors duration-200">
          {title}
        </h3>

        {desc && (
          <p className="text-xs text-[#667085] group-hover:text-[#F5E6BD] transition-colors duration-200 mt-2 line-clamp-2">
            {desc}
          </p>
        )}
      </div>

      <div className="mt-6 pt-4 border-t border-[#E0E6ED] group-hover:border-white/20 flex items-center justify-between transition-colors">
        <span className="text-xs font-medium text-[#667085] group-hover:text-[#E0E6ED] transition-colors">
          {count} Properties Available
        </span>
        <div className="w-7 h-7 rounded-full bg-[#F5F7FA] group-hover:bg-[#D4AF37] text-[#0B1F3B] flex items-center justify-center transition-all duration-200 shadow-sm">
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>
    </Link>
  );
};
