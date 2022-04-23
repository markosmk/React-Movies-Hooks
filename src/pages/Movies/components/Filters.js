import Select from 'react-select';
import useStore from 'store';
import shallow from 'zustand/shallow';

function Filters({ query, filters, setFilters }) {
  const genres = useStore((state) => state.genres.results, shallow);
  const isLoadingGenres = useStore((state) => state.genres.isLoading, shallow);
  const providers = useStore((state) => state.providers.results, shallow);
  const isLoadingProviders = useStore((state) => state.genres.isLoading, shallow);

  // options for selects
  const optionsProviders = providers.map(({ id, name, logo }) => {
    return { value: id, label: name, logo };
  });

  const optionsGenres = genres.map(({ id, name }) => {
    return { value: id, label: name };
  });

  const optionsSorts = [
    { value: 'popularity.desc', label: 'Popularity desc' },
    { value: 'release_date.desc', label: 'Release Date desc' },
    { value: 'primary_release_date.desc', label: 'Primary Release desc' },
    { value: 'vote_average.desc', label: 'Vote Average desc' },
    { value: 'vote_count.desc', label: 'Vote Count desc' },
    { value: 'revenue.desc', label: 'Revenue desc' },
  ];

  // onChange for selects
  const onChangeProviders = (value = []) => {
    let newFilters =
      Array.isArray(value).length > 0
        ? [...value].map((item) => item.value)
        : [value?.value || ''];
    setFilters({ ...filters, providers: newFilters });
  };

  const onChangeGenres = (value) => {
    let newFilters = [...value].map((item) => item.value);
    setFilters({ ...filters, genres: newFilters });
  };

  const onChangeSorts = (value) => {
    setFilters({ ...filters, sort: value.value });
  };

  // TODO: update query options
  // useEffect(() => {
  //   if (query) {
  //     const providerSelect = optionsProviders.find(
  //       ({ value }) => Number(value) === Number(query)
  //     )?.value;
  //     if (providerSelect) {
  //       setFilters((f) => ({ ...f, providers: [providerSelect] }));
  //     }
  //   }
  // }, [query]);

  // TODO: Create use hook for management filters

  const themeModify = (theme) => ({
    ...theme,
    borderRadius: 6,
    colors: {
      ...theme.colors,
      primary: 'rgb(6 182 212)',
      primary50: 'rgb(226 232 240)',
      primary25: 'rgb(226 232 240)',
      neutral10: 'rgb(226 232 240)',
    },
  });

  return (
    <>
      <h2 className="text-2xl font-semibold my-6">Filters</h2>

      <div className="flex flex-col md:flex-row md:justify-between gap-8 mb-8">
        <Select
          options={optionsProviders}
          placeholder="Select Provider..."
          onChange={onChangeProviders}
          name="with_providers"
          isLoading={isLoadingProviders}
          className="w-full my-react-select-container"
          classNamePrefix="my-react-select"
          isClearable={true}
          formatOptionLabel={(provider) => (
            <div className="flex items-center">
              <img
                src={provider.logo}
                alt="provider logo"
                className="h-8 w-8 rounded-lg mr-2"
              />
              <span>{provider.label}</span>
            </div>
          )}
          theme={themeModify}
          // when handle searchParams by url query
          // defaultValue={
          //   optionsProviders &&
          //   query && [
          //     optionsProviders.find(({ value }) => Number(value) === Number(query)),
          //   ]
          // }
        />
        <Select
          options={optionsGenres}
          isMulti
          onChange={onChangeGenres}
          closeMenuOnSelect={false}
          placeholder="Select Genres..."
          name="with_genres"
          isLoading={isLoadingGenres}
          className="w-full my-react-select-container"
          classNamePrefix="my-react-select"
          theme={themeModify}
        />
        <Select
          options={optionsSorts}
          onChange={onChangeSorts}
          placeholder="Sort by..."
          name="with_sort"
          className="w-1/2 my-react-select-container"
          classNamePrefix="my-react-select"
          theme={themeModify}
        />
      </div>
    </>
  );
}

export default Filters;
