import { LOGO_NOT_IMAGE, LOGO_45 } from 'config';

export const adapterProvider = (listing) => {
  return listing.map((item) => {
    return {
      id: item.provider_id,
      name: item.provider_name,
      logo: item.logo_path ? LOGO_45 + item.logo_path : LOGO_NOT_IMAGE,
    };
  });
};

export const adapterProviderMovies = (listing, region) => {
  return {
    buy: adapterProvider(listing[region]?.buy || []),
    flatrate: adapterProvider(listing[region]?.flatrate || []),
    rent: adapterProvider(listing[region]?.rent || []),
  };
};
