export function CardItem() {
  return (
    <div className="animate-pulse-fast block rounded-md w-full min-h-[30rem] bg-slate-100 dark:bg-slate-800"></div>
  );
}

export function SpinnerCard({ count = 8 }) {
  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-4">
        {Array.from({ length: count }).map((_, idx) => (
          <CardItem key={idx} />
        ))}
      </div>
    </>
  );
}

export function SpinnerDetailMovie() {
  return (
    <>
      <div className="animate-pulse-fast block rounded-lg p-4 w-full h-128 bg-slate-100 dark:bg-slate-800"></div>
      <div className="animate-pulse-fast block rounded-lg mt-10 w-full h-[60px] bg-slate-100 dark:bg-slate-800"></div>
      <div className="block w-full ">
        <div className="animate-pulse-fast block rounded-lg mt-5 mx-4 h-20 bg-slate-100 dark:bg-slate-800"></div>
      </div>
    </>
  );
}

export function SpinnerDetailPerson() {
  return (
    <>
      <div className="flex gap-6 mt-8">
        <div className="h-full w-96 hidden lg:block">
          <div className="animate-pulse-fast block rounded-2xl w-full h-128 bg-slate-100 dark:bg-slate-800"></div>
        </div>
        <div className="flex-1">
          <div className="flex gap-4 w-full">
            <div className="animate-pulse-fast block rounded-lg w-1/4 max-h-52 sm:max-h-72 order-2 sm:order-1 lg:hidden bg-slate-100 dark:bg-slate-800"></div>
            <div className="order-1 sm:order-2 w-3/4 lg:w-full">
              <div className="animate-pulse-fast block rounded-lg mb-4 w-2/3 h-10 bg-slate-100 dark:bg-slate-800"></div>
              <div className="animate-pulse-fast block rounded-lg mb-2 w-32 h-[28px] bg-slate-100 dark:bg-slate-800"></div>
              <div className="animate-pulse-fast block rounded-lg mb-4 w-full h-32 bg-slate-100 dark:bg-slate-800"></div>
            </div>
          </div>
          <hr className="my-4 border-slate-100 dark:border-slate-700" />
          <div className="grid grid-cols-2">
            <div className="animate-pulse-fast block rounded-lg mb-4 w-2/3 h-[56px] bg-slate-100 dark:bg-slate-800"></div>
            <div className="animate-pulse-fast block rounded-lg mb-4 w-2/3 h-[56px] bg-slate-100 dark:bg-slate-800"></div>
            <div className="animate-pulse-fast block rounded-lg mb-4 w-2/3 h-[56px] bg-slate-100 dark:bg-slate-800"></div>
            <div className="animate-pulse-fast block rounded-lg mb-4 w-2/3 h-[56px] bg-slate-100 dark:bg-slate-800"></div>
          </div>
          <div className="animate-pulse-fast block rounded-lg mb-4 w-2/3 h-[56px] bg-slate-100 dark:bg-slate-800"></div>
        </div>
      </div>
    </>
  );
}

export function SpinnerCarousel() {
  return (
    <>
      <div className="animate-pulse-fast block rounded-lg w-full h-64 sm:h-96 lg:h-128 bg-slate-100 dark:bg-slate-800"></div>
    </>
  );
}
export function SpinnerGenres() {
  return (
    <>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 w-full whitespace-nowrap overflow-hidden h-20 gap-4">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            className="animate-pulse-fast block rounded-md h-20 bg-slate-100 dark:bg-slate-800"
          ></div>
        ))}
      </div>
    </>
  );
}
