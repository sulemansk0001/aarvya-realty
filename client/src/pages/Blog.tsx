import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react';
import { BlogService } from '../services/api';
import { BlogPost } from '../types';
import { ScrollAnimation } from '../components/common/ScrollAnimation';

export const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    BlogService.getAll().then(setPosts);
  }, []);

  const categories = ['All', 'Home Buying Guide', 'Market Trends', 'Finance & Loans'];

  const filteredPosts =
    selectedCategory === 'All' ? posts : posts.filter((p) => p.category === selectedCategory);

  return (
    <div className="bg-[#F5F7FA] min-h-screen py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollAnimation animation="fade-in" duration={500}>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-widest block mb-2">
              Market Insights & Guides
            </span>
            <h1 className="text-3xl sm:text-4xl font-poppins font-bold text-[#0B1F3B]">
              Pune Real Estate Knowledge Hub
            </h1>
            <p className="mt-3 text-base text-[#667085]">
              Actionable property research, home loan calculations, and legal advice for homebuyers in Maharashtra.
            </p>

            {/* Category Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-colors ${
                    selectedCategory === cat
                      ? 'bg-[#D4AF37] text-white shadow-sm'
                      : 'bg-white text-[#0B1F3B] border border-[#E0E6ED] hover:bg-neutral-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </ScrollAnimation>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredPosts.map((post, idx) => (
            <ScrollAnimation key={post.id} animation="slide-up" delay={idx * 100} duration={600}>
              <article
                className="h-full group bg-white rounded-2xl border border-[#E0E6ED] overflow-hidden shadow-subtle hover:shadow-cardHover hover:border-[#D4AF37] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <Link to={`/blog/${post.slug}`} className="block relative aspect-[16/10] overflow-hidden bg-neutral-100">
                    <img
                      src={post.image}
                      alt={post.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-3 left-3 bg-[#0B1F3B]/80 backdrop-blur-sm text-white text-[11px] font-semibold px-2.5 py-1 rounded">
                      {post.category}
                    </span>
                  </Link>

                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-[#667085] mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>{post.date}</span>
                      </span>
                      <span>&bull;</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>{post.readTime}</span>
                      </span>
                    </div>

                    <h2 className="font-poppins font-bold text-lg text-[#0B1F3B] group-hover:text-[#D4AF37] transition-colors line-clamp-2 mb-3">
                      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>

                    <p className="text-xs text-[#667085] leading-relaxed line-clamp-3">
                      {post.summary}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 border-t border-[#E0E6ED] flex items-center justify-between">
                  <span className="text-[11px] text-[#667085] font-medium">{post.author}</span>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#D4AF37] hover:text-[#B9952D]"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </div>
  );
};
