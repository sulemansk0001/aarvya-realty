import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, Tag, Share2, Phone, CheckCircle2 } from 'lucide-react';
import { BlogService } from '../services/api';
import { BlogPost } from '../types';
import { COMPANY_DETAILS } from '../utils/formatters';
import { ScrollAnimation } from '../components/common/ScrollAnimation';

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    BlogService.getBySlug(slug)
      .then((res) => setPost(res || null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center py-20 px-4">
        <div className="bg-white p-8 rounded-xl border border-[#E0E6ED] text-center max-w-md">
          <h2 className="text-xl font-bold font-poppins text-[#0B1F3B]">Article Not Found</h2>
          <Link to="/blog" className="mt-4 inline-block text-xs text-[#D4AF37] font-semibold underline">
            Return to Knowledge Hub
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F5F7FA] min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#667085] hover:text-[#D4AF37] mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Articles</span>
        </Link>

        {/* Article Container */}
        <ScrollAnimation animation="slide-up" duration={600}>
          <article className="bg-white rounded-2xl border border-[#E0E6ED] shadow-card overflow-hidden">
          {/* Header */}
          <div className="p-6 sm:p-10 border-b border-[#E0E6ED]">
            <span className="bg-[#F5F7FA] text-[#D4AF37] border border-[#E0E6ED] text-[11px] font-semibold px-3 py-1 rounded inline-block mb-3">
              {post.category}
            </span>
            <h1 className="text-2xl sm:text-4xl font-poppins font-bold text-[#0B1F3B] leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-[#667085] mt-4">
              <span className="font-semibold text-[#0B1F3B]">{post.author}</span>
              <span>&bull;</span>
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
          </div>

          {/* Hero Image */}
          <div className="relative aspect-[16/9] bg-neutral-100">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-10 space-y-6 text-sm text-[#0B1F3B] leading-relaxed">
            <p className="text-base font-medium text-[#0B1F3B] leading-relaxed border-l-4 border-[#D4AF37] pl-4 italic bg-[#F5F7FA] py-3 rounded-r">
              {post.summary}
            </p>

            {post.content.map((paragraph, idx) => (
              <p key={idx} className="leading-relaxed">
                {paragraph}
              </p>
            ))}

            {/* Tags */}
            <div className="pt-6 border-t border-[#E0E6ED] flex flex-wrap items-center gap-2">
              <Tag className="w-3.5 h-3.5 text-[#D4AF37]" />
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-[#F5F7FA] text-[#667085] text-xs px-2.5 py-1 rounded border border-[#E0E6ED]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Advisory Callout Box */}
          <div className="bg-[#0B1F3B] text-white p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-poppins font-bold text-lg">Looking to Invest in Pune Real Estate?</h3>
              <p className="text-xs text-neutral-300 mt-1">
                Get an objective property analysis and shortlist tailored to your budget from our Hinjewadi team.
              </p>
            </div>
            <a
              href={`tel:${COMPANY_DETAILS.phoneRaw}`}
              className="px-5 py-2.5 bg-[#D4AF37] hover:bg-[#B9952D] text-white text-xs font-semibold rounded whitespace-nowrap transition-colors flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call: {COMPANY_DETAILS.phoneDisplay}</span>
            </a>
          </div>
        </article>
      </ScrollAnimation>
    </div>
  </div>
);
};
