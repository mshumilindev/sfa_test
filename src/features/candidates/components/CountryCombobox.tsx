'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useId, useMemo, useRef, useState } from 'react';

import { countries } from '@/features/candidates/constants/countries';

import styles from './CountryCombobox.module.scss';

type CountryComboboxProps = {
  id: string;
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  describedBy?: string;
  invalid: boolean;
};

export const CountryCombobox = ({
  id,
  value,
  onChange,
  onBlur,
  describedBy,
  invalid,
}: CountryComboboxProps) => {
  const t = useTranslations('candidates.combobox');
  const listboxId = useId();
  const [query, setQuery] = useState(value);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredCountries = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) {
      return [...countries];
    }

    return countries.filter((country) => country.toLowerCase().includes(normalizedQuery));
  }, [query]);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, []);

  const selectCountry = (country: string) => {
    onChange(country);
    setQuery(country);
    setIsOpen(false);
  };

  const handleContainerBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setIsOpen(false);
      onBlur();
    }
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setIsOpen(true);
      setActiveIndex((index) => Math.min(index + 1, Math.max(filteredCountries.length - 1, 0)));
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setIsOpen(true);
      setActiveIndex((index) => Math.max(index - 1, 0));
      return;
    }

    if (event.key === 'Enter' && isOpen && filteredCountries[activeIndex]) {
      event.preventDefault();
      selectCountry(filteredCountries[activeIndex]);
      return;
    }

    if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div className={styles.combobox} onBlur={handleContainerBlur} ref={containerRef}>
      <input
        aria-activedescendant={
          isOpen && filteredCountries[activeIndex]
            ? `${listboxId}-option-${activeIndex}`
            : undefined
        }
        aria-autocomplete="list"
        aria-controls={listboxId}
        aria-describedby={describedBy}
        aria-expanded={isOpen}
        aria-invalid={invalid}
        autoComplete="off"
        className={styles.input}
        id={id}
        onChange={(event) => {
          setQuery(event.target.value);
          onChange(event.target.value);
          setIsOpen(true);
          setActiveIndex(0);
        }}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleInputKeyDown}
        placeholder={t('searchPlaceholder')}
        role="combobox"
        type="text"
        value={query}
      />
      {isOpen ? (
        <ul className={styles.listbox} id={listboxId} role="listbox">
          {filteredCountries.length === 0 ? (
            <li aria-selected={false} className={styles.emptyOption} role="option">
              {t('emptyResults')}
            </li>
          ) : (
            filteredCountries.map((country, index) => (
              <li
                aria-selected={country === value}
                className={`${styles.option} ${index === activeIndex ? styles.optionActive : ''}`}
                id={`${listboxId}-option-${index}`}
                key={country}
                onMouseDown={(event) => event.preventDefault()}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseUp={() => selectCountry(country)}
                role="option"
              >
                {country}
              </li>
            ))
          )}
        </ul>
      ) : null}
    </div>
  );
};
