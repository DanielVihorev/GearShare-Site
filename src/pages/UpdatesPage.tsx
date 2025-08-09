import React from "react";
import { updates, type UpdateItem } from "../features/updates/UpdatesData";
import { Button } from "../components/ui/Button";
import {
  DownloadIcon,
  BugIcon,
  ZapIcon,
  StarIcon,
  ShieldIcon,
  CalendarIcon,
} from "../components/icons";

// A small component for the update cards to keep the main component clean
const UpdateCard: React.FC<{ item: UpdateItem }> = ({ item }) => {
  const getStatusClasses = (status: UpdateItem["status"]) => {
    switch (status) {
      case "latest":
        return "bg-green-500 text-white";
      case "stable":
        return "bg-blue-500 text-white";
      case "beta":
        return "bg-yellow-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getTypeClasses = (type: UpdateItem["type"]) => {
    switch (type) {
      case "major":
        return "bg-purple-500/20 text-purple-300 border-purple-500/30";
      case "minor":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      case "patch":
        return "bg-green-500/20 text-green-300 border-green-500/30";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  const TypeIcon =
    item.type === "major"
      ? StarIcon
      : item.type === "patch"
      ? BugIcon
      : ZapIcon;

  return (
    <div
      className={`bg-white/5 border border-white/20 rounded-2xl overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 hover:border-blue-400 hover:ring-2 hover:ring-blue-400 ${
        item.featured
          ? "ring-2 ring-blue-500 hover:ring-4 hover:ring-blue-400"
          : ""
      }`}
    >
      <div className='p-6'>
        <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4'>
          <div className='flex items-center gap-3 mb-4 sm:mb-0'>
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusClasses(
                item.status
              )}`}
            >
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </span>
            <span
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold border ${getTypeClasses(
                item.type
              )}`}
            >
              <TypeIcon className='w-4 h-4' />
              {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
            </span>
          </div>
          <div className='text-left sm:text-right flex-shrink-0'>
            <p className='text-2xl font-bold text-white'>v{item.version}</p>
            <p className='text-sm text-white/70 flex items-center gap-1.5 mt-1'>
              <CalendarIcon className='w-4 h-4' />
              {new Date(item.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        <div className='mb-4'>
          <h3 className='text-xl font-bold text-white mb-2'>{item.title}</h3>
          <p className='text-white/80'>{item.description}</p>
        </div>

        <div className='grid md:grid-cols-2 gap-6'>
          <div>
            <h4 className='font-semibold text-white mb-3 flex items-center gap-2'>
              <ZapIcon className='w-5 h-5 text-green-400' />
              New Features
            </h4>
            <ul className='space-y-2 text-sm text-white/80'>
              {item.features.map((feature, i) => (
                <li key={i} className='flex items-start gap-2'>
                  <span className='w-1.5 h-1.5 bg-green-400 rounded-full mt-2 shrink-0'></span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className='font-semibold text-white mb-3 flex items-center gap-2'>
              <BugIcon className='w-5 h-5 text-red-400' />
              Bug Fixes
            </h4>
            <ul className='space-y-2 text-sm text-white/80'>
              {item.bugFixes.map((fix, i) => (
                <li key={i} className='flex items-start gap-2'>
                  <span className='w-1.5 h-1.5 bg-red-400 rounded-full mt-2 shrink-0'></span>
                  {fix}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className='mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
          <div className='flex items-center gap-6 text-sm text-white/70'>
            <span className='flex items-center gap-1.5'>
              <DownloadIcon className='w-4 h-4' />
              {item.downloadSize}
            </span>
            <span className='flex items-center gap-1.5'>
              <ShieldIcon className='w-4 h-4' />
              {item.compatibility}
            </span>
          </div>
          <Button
            variant='secondary'
            className='hover:transform hover:scale-105 transition-transform duration-200'
          >
            Download
          </Button>
        </div>
      </div>
    </div>
  );
};

export const UpdatesPage: React.FC = () => {
  return (
    <div className='container mx-auto px-6 py-12'>
      <div className='text-center mb-16'>
        <h1 className='text-5xl font-extrabold text-white mb-4'>App Updates</h1>
        <p className='text-xl text-white/80 max-w-2xl mx-auto'>
          A complete history of our releases, features, and fixes.
        </p>
      </div>
      <div className='space-y-8 max-w-4xl mx-auto'>
        {updates.map((update) => (
          <UpdateCard key={update.version} item={update} />
        ))}
      </div>
    </div>
  );
};
