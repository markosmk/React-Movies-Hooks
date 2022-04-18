function Score({ vote, text, url }) {
  return (
    <div className={`relative inline-flex items-center ${vote.class} text-sm`}>
      <svg
        className={`w-10 align-middle overflow-hidden -rotate-90 origin-center transform ${
          text && `mr-2`
        }`}
        viewBox="0 0 30 30"
        width="40"
        height="40"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="stroke-slate-700"
          strokeWidth="2"
          fill="none"
          cx="15"
          cy="15"
          r="14"
        ></circle>
        <circle
          className={`${vote.class}`}
          strokeWidth="2"
          strokeDasharray={`${vote.count * 9},100`}
          cx="15"
          cy="15"
          r="14"
        ></circle>
      </svg>
      <b className="w-10 h-10 leading-10 text-center absolute left-0 top-0 text-sm">
        {vote.count === '0.0' ? 'NR' : vote.count}
      </b>
      {text && url && (
        <a href={url} target="_blank" className={vote.class} rel="noreferrer" alt="IMDb">
          {' '}
          {text}
        </a>
      )}
      {text && !url && ` ${text}`}
    </div>
  );
}

export default Score;
