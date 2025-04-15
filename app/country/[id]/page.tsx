'use client';

import { countriesApi } from '@/app/services';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

type DetailedCountry = {
  cca3: string;
  flags: {
    svg: string;
  };
  name: {
    common: string;
  };
  capital: string[];
  region: string;
  population: number;
  languages: Record<string, string>;
  currencies: Record<string, { name: string; symbol: string }>;
  tld: string[];
  borders: string[];
};

export default function Country() {
  const params = useParams();

  const [id, setId] = useState<string | null>(null);
  const [country, setCountry] = useState<DetailedCountry>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params?.id && params.id !== id) {
      setId(params.id as string);
    }
  }, [params, id]);

  useEffect(() => {
    if (id === null) {
      return;
    }
    const fetchCountries = async () => {
      const [response, error] = await countriesApi.getCountry(id);
      setLoading(false);

      if (error) {
        setError(error);
        return;
      }

      setCountry(response);
    };
    fetchCountries();
  }, [id]);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;

  const {
    flags,
    name,
    capital,
    region,
    population,
    languages,
    currencies,
    tld,
    borders,
  } = country ?? {};

  const { svg: flag } = flags ?? {};
  const { common: countryName } = name ?? {};
  const [capitalName] = capital ?? '';
  const languageNames = Object.values(languages ?? {}).join(', ');
  const currencieName = Object.values(currencies ?? {})
    .map(({ name, symbol }) => `${name} ${symbol}`)
    .join(', ');
  const [topLevelDomain] = tld ?? [];
  const bordersIds = borders?.join(', ') ?? '';

  return (
    <>
      <div className="mb-8">
        <Link href={'/'}>
          <button className="cursor-pointer bg-gray-200 hover:bg-gray-300 font-semibold py-2 px-4 rounded">
            Back
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-4">
        <div className="flex items-center md:w-[400px]">
          <Image
            src={flag || '/flag-placeholder.svg'}
            alt={`Flag of ${countryName}`}
            className="max-h-80 object-cover rounded-lg"
            width={750}
            height={375}
            quality={80}
            priority={true}
          />
        </div>
        <div className="flex flex-col justify-center p-6 text-sm text-gray-600">
          <h2 className="text-xl font-semibold mb-4">
            {countryName} {id}
          </h2>
          <div className="space-y-2">
            <div className="flex items-center gap-1">
              <span className="font-semibold">Capital:</span>
              <span>{capitalName}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-semibold">Region:</span>
              <span>{region}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-semibold">Population:</span>
              <span>{population}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-semibold">Languages:</span>
              <span>{languageNames}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-semibold">Currency:</span>
              <span>{currencieName}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-semibold">Top Level Domain:</span>
              <span>{topLevelDomain}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-semibold">Borders:</span>
              <span>{bordersIds}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
