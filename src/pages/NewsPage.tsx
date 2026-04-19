import React, { useState } from "react";
import {
  newsItems,
  categories,
  type NewsItem,
  type Category,
} from "../features/news/NewsData";
import { ClockIcon, CalendarIcon } from "../components/icons";
import { Button } from "../components/ui/Button";

// Helper function to format date strings
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// A small component for the news cards to keep the main component clean
const NewsCard: React.FC<{ item: NewsItem }> = ({ item }) => {
  const category = categories.find((cat) => cat.id === item.category);
  const Icon = item.icon;
  return (
    <article className='bg-white/10 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden cursor-pointer transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 flex flex-col shadow-lg hover:shadow-2xl hover:shadow-blue-500/20 hover:border-blue-400 hover:ring-2 hover:ring-blue-400'>
      <div className='h-48 bg-gradient-to-br from-blue-600/20 to-indigo-700/20 flex items-center justify-center border-b border-white/10'>
        <Icon className='h-16 w-16 text-blue-300' />
      </div>
      <div className='p-6 flex flex-col flex-grow'>
        <div className='flex items-center text-xs text-white/70 mb-3 gap-4'>
          <span className='flex items-center gap-1.5'>
            <CalendarIcon className='w-4 h-4' /> {formatDate(item.date)}
          </span>
          <span className='flex items-center gap-1.5'>
            <ClockIcon className='w-4 h-4' /> {item.readTime}
          </span>
        </div>
        <h3 className='text-xl font-bold text-white mb-2 flex-grow'>
          {item.title}
        </h3>
        <p className='text-white/80 text-sm leading-relaxed mb-4 line-clamp-3'>
          {item.excerpt}
        </p>
        <div className='mt-auto pt-4 border-t border-white/20'>
          <span className='text-sm font-semibold text-blue-300'>
            {category?.name || "News"}
          </span>
        </div>
      </div>
    </article>
  );
};

const PAGE_SIZE = 6;

export const NewsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category["id"]>("all");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filteredNews =
    selectedCategory === "all"
      ? newsItems
      : newsItems.filter((item) => item.category === selectedCategory);

  const visibleNews = filteredNews.slice(0, visibleCount);
  const hasMore = visibleCount < filteredNews.length;

  const handleCategoryChange = (id: Category["id"]) => {
    setSelectedCategory(id);
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-700 via-indigo-800 to-gray-900'>
      <div className='container mx-auto px-6 py-12'>
        <div className='text-center mb-16'>
          <h1 className='text-5xl font-extrabold text-white mb-4'>GearShare News</h1>
          <p className='text-xl text-white/80 max-w-2xl mx-auto'>
            Stay updated with the latest app updates, features, and community news.
          </p>
        </div>

        {/* Category Filter */}
        <div className='flex justify-center flex-wrap gap-3 mb-12'>
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all duration-200 ${
                  selectedCategory === category.id
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white border border-white/20"
                }`}
              >
                <Icon className='w-5 h-5' />
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>

        {/* News Grid */}
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {visibleNews.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>

        {filteredNews.length === 0 && (
          <p className="text-center text-white/50 py-16 text-lg">No news in this category yet.</p>
        )}

        {/* Load More */}
        {hasMore && (
          <div className='text-center mt-12'>
            <Button
              variant='primary'
              className='px-8 py-3 text-base'
              onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
            >
              Load More News
            </Button>
          </div>
        )}

        {!hasMore && filteredNews.length > 0 && (
          <p className="text-center text-white/40 mt-10 text-sm">You've reached the end.</p>
        )}
      </div>
    </div>
  );
};
