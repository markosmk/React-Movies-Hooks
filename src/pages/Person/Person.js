import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import RelatedList from 'components/Details/RelatedList';
import ListCreditsPerson from './components/ListCreditsPerson';
import PresentationPerson from './components/PresentationPerson';
import { SpinnerDetailPerson } from 'components/Spinner';

import { getPerson } from 'store/actions/apiActions';
import useStore from 'store';
import shallow from 'zustand/shallow';

function Person() {
  const language = useStore((state) => state.language, shallow);
  const { id } = useParams();

  const [isLoading, setLoading] = useState(true);
  const [person, setPerson] = useState({});

  useEffect(() => {
    let unmounted = false;
    const fechDetail = async () => {
      if (unmounted) return;
      setLoading(true);
      const data = await getPerson(id, language);
      setPerson(data);
      setLoading(false);
    };
    fechDetail();
    return () => {
      unmounted = true;
    };
  }, [id, language]);

  if (isLoading || !person.hasOwnProperty('detail') || !person)
    return (
      <div className="container">
        <SpinnerDetailPerson />
      </div>
    );
  return (
    <>
      <div className="container">
        <PresentationPerson detail={person.detail} external_ids={person.external_ids} />

        <ListCreditsPerson cast={person.cast_credits} crew={person.crew_credits} />

        {person.cast?.length > 0 && (
          <RelatedList listing={person.cast} title={`Known as...`} />
        )}
      </div>
    </>
  );
}

export default Person;
