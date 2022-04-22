import { useState, useEffect } from 'react';
import { ChevronUpIcon } from '@heroicons/react/outline';

function ScrollToTopBtn() {
  const [visible, setVisible] = useState(false);

  // Show button when page is scorlled upto given distance
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  // Set the top cordinate to 0 make scrolling smooth
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      type="button"
      className="scrollTop text-slate-400"
      data-open={visible}
      onClick={scrollToTop}
    >
      <ChevronUpIcon className="h-6 w-6" />
    </button>
  );
}

export default ScrollToTopBtn;
