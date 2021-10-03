import ContentLoader from 'react-content-loader';
import './Spinner.css';

const CardItem = (props) => (
  <ContentLoader
    speed={2}
    width={270}
    height={440}
    viewBox="0 0 270 440"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    style={{ width: '100%', height: 'auto' }}
    {...props}
  >
    <rect x="0" y="0" rx="16" ry="16" width="270" height="400" />
    <rect x="0" y="420" rx="8" ry="8" width="170" height="20" />
  </ContentLoader>
);

const PosterItem = (props) => (
  <ContentLoader
    speed={2}
    width={461}
    height={664}
    viewBox="0 0 461 664"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    style={{ width: '100%', height: 'auto' }}
    {...props}
  >
    <rect x="0" y="0" rx="16" ry="16" width="461" height="664" />
  </ContentLoader>
);

const ContentItem = (props) => (
  <ContentLoader
    speed={2}
    width={660}
    height={664}
    viewBox="0 0 660 664"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    style={{ width: '100%', height: 'auto' }}
    {...props}
  >
    <rect x="0" y="0" rx="8" ry="8" width="100" height="27" />
    <rect x="0" y="46" rx="8" ry="8" width="660" height="50" />
    <rect x="0" y="120" rx="8" ry="8" width="460" height="27" />
    <rect x="0" y="160" rx="8" ry="8" width="660" height="20" />
    <rect x="0" y="205" rx="8" ry="8" width="460" height="20" />
    <rect x="0" y="250" rx="8" ry="8" width="360" height="20" />
    <rect x="0" y="295" rx="8" ry="8" width="260" height="20" />
    <rect x="0" y="340" rx="8" ry="8" width="360" height="20" />
    <rect x="0" y="385" rx="8" ry="8" width="160" height="20" />
  </ContentLoader>
);
export function SpinnerItem() {
  return (
    <>
      <div className="place-left" style={{ width: '100%' }}>
        <PosterItem />
      </div>
      <div className="place-right" style={{ width: '100%' }}>
        <ContentItem />
      </div>
    </>
  );
}

export function SpinnerCard() {
  return (
    <>
      <div className="border">
        <CardItem />
      </div>
      <div className="border">
        <CardItem />
      </div>
      <div className="border">
        <CardItem />
      </div>
      <div className="border">
        <CardItem />
      </div>
    </>
  );
}
