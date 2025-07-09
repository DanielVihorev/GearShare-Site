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
    <article className='bg-white/5 border border-white/20 rounded-xl overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 flex flex-col'>
      <div className='h-48 bg-gray-900 flex items-center justify-center'>
        <Icon className='h-16 w-16 text-blue-400' />
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
        <div className='mt-auto pt-4 border-t border-white/10'>
          <span className='text-sm font-semibold text-blue-400'>
            {category?.name || "News"}
          </span>
        </div>
      </div>
    </article>
  );
};

export const NewsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] =
    useState<Category["id"]>("all");

  const filteredNews =
    selectedCategory === "all"
      ? newsItems
      : newsItems.filter((item) => item.category === selectedCategory);

  return (
    <div className='container mx-auto px-6 py-12'>
      {/* Page Header */}
      <div className='text-center mb-16'>
        <h1 className='text-5xl font-extrabold text-white mb-4'>
          GearShare News
        </h1>
        <p className='text-xl text-white/80 max-w-2xl mx-auto'>
          Stay updated with the latest app updates, features, and community
          news.
        </p>
      </div>

      {/* Category Filter */}
      <div className='flex justify-center flex-wrap gap-3 mb-12'>
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all duration-200 ${
                selectedCategory === category.id
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white"
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
        {filteredNews.map((item) => (
          <NewsCard key={item.id} item={item} />
        ))}
      </div>

      {/* Load More Button */}
      <div className='text-center mt-16'>
        <Button variant='primary' className='px-8 py-3 text-base'>
          Load More News
        </Button>
      </div>
    </div>
  );
};
