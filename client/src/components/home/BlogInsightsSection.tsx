import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { BLOG_POSTS } from '../../data/mockData';
import { ScrollAnimation } from '../common/ScrollAnimation';

export const BlogInsightsSection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimation animation="fade-in" duration={500}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-4">
            <div>
              <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-widest block mb-2">
                Knowledge Hub
              </span>
              <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-[#0B1F3B]">
                Latest Real Estate Insights
              </h2>
              <p className="mt-2 text-base text-[#667085]">
                Analysis, market trends, and advisory guides for property buyers in Pune and Maharashtra.
              </p>
            </div>

            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0B1F3B] hover:text-[#D4AF37] transition-colors self-start sm:self-auto hover:translate-x-1"
            >
              <span>View All Articles</span>
              <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
            </Link>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_POSTS.slice(0, 3).map((post, idx) => (
            <ScrollAnimation key={post.id} animation="slide-up" delay={idx * 100} duration={600}>
              <article className="h-full group bg-white rounded-xl border border-[#E0E6ED] overflow-hidden shadow-subtle hover:shadow-cardHover hover:border-[#D4AF37] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between" data-cursor="card">
                <div>
                  <Link to={`/blog/${post.slug}`} className="block relative aspect-[16/10] overflow-hidden bg-[#071629]">
                    <img
                      src={post.image}
                      alt={post.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-[#0B1F3B]/90 backdrop-blur-sm text-[#D4AF37] border border-[#D4AF37]/40 text-[11px] font-semibold px-2.5 py-1 rounded shadow-sm">
                        {post.category}
                      </span>
                    </div>
                  </Link>

                  <div className="p-6">
                    <div className="flex items-center gap-4 text-xs text-[#667085] mb-3">
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

                    <Link to={`/blog/${post.slug}`} className="block group">
                      <h3 className="font-poppins font-bold text-lg text-[#0B1F3B] group-hover:text-[#D4AF37] transition-colors leading-snug mb-2 line-clamp-2">
                        {post.title}
                      </h3>
                    </Link>

                    <p className="text-sm text-[#667085] line-clamp-3 leading-relaxed mb-4">
                      {post.summary}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B1F3B] hover:text-[#D4AF37] transition-colors"
                  >
                    <span>Read Full Article</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                  </Link>
                </div>
              </article>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
};
