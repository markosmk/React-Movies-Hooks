import { ExternalLinkIcon } from '@heroicons/react/outline';
import {
  IconSocialFacebook,
  IconSocialInstagram,
  IconSocialTwitter,
} from 'components/icons/IconSocial';

function ItemSocial({ url, type }) {
  const data = {
    imdb: {
      icon: <ExternalLinkIcon className="h-5 w-5" />,
      color: 'hover:text-slate-700 dark:hover:text-slate-400',
    },
    facebook: {
      icon: <IconSocialFacebook className="h-6 w-6 fill-current" />,
      color: 'hover:text-blue-600 dark:hover:text-blue-500',
    },
    instagram: {
      icon: <IconSocialInstagram className="h-6 w-6 fill-current" />,
      color: 'hover:text-pink-500 dark:hover:text-pink-500',
    },
    twitter: {
      icon: <IconSocialTwitter className="h-6 w-6 fill-current" />,
      color: 'hover:text-sky-400 dark:hover:text-sky-400',
    },
  };

  return (
    <a
      href={url}
      className={`${
        type === 'imdb' ? 'p-2' : 'p-1.5'
      } rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 dark:text-slate-400 ${
        data[type].color
      } transition-all active:scale-95`}
      alt={`link ${type}`}
      target="_blank"
      rel="noreferrer"
    >
      {data[type].icon}
    </a>
  );
}

export default ItemSocial;
