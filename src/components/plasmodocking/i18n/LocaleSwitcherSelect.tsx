'use client';

import * as Select from '@radix-ui/react-select';
import clsx from 'clsx';
import { useTransition } from 'react';
import { CheckIcon } from '@radix-ui/react-icons';
import { setUserLocale } from '@/services/locale';
import { Locale } from '@/i18n/config';
import { IoLanguageSharp } from "react-icons/io5";
type Props = {
  defaultValue: string;
  items: Array<{ value: string; label: string }>;
  label: string;
};

export default function LocaleSwitcherSelect({
  defaultValue,
  items,
  label
}: Props) {
  const [isPending, startTransition] = useTransition();

  function onChange(value: string) {
    const locale = value as Locale;
    startTransition(() => {
      setUserLocale(locale);
    });
  }

  return (
    <div className="relative">
      <Select.Root defaultValue={defaultValue} onValueChange={onChange}>
        <Select.Trigger
          aria-label={label}
          className={clsx(
            'flex items-center justify-between rounded-sm p-2 transition-colors hover:bg-slate-200 w-full', // Ajuste para ocupar a largura total no mobile
            isPending && 'pointer-events-none opacity-60'
          )}
        >
          <Select.Icon>
            <IoLanguageSharp className="h-5 w-5 text-white" />
            {/* <LanguageIcon className="h-6 w-6 text-slate-600 transition-colors group-hover:text-slate-900" /> */}
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            align="start"
            className="min-w-[8rem] overflow-hidden rounded-sm bg-white py-1 shadow-md z-50" // Certifique-se de que o z-index esteja correto
            position="popper"
          >
            <Select.Viewport>
              {items.map((item) => (
                <Select.Item
                  key={item.value}
                  className="flex cursor-default items-center px-3 py-2 text-base data-[highlighted]:bg-slate-100"
                  value={item.value}
                >
                  <div className="mr-2 w-[1rem]">
                    {item.value === defaultValue && (
                      <CheckIcon className="h-5 w-5 text-slate-600" />
                    )}
                  </div>
                  <span className="text-slate-900">{item.label}</span>
                </Select.Item>
              ))}
            </Select.Viewport>
            <Select.Arrow className="fill-white text-white" />
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}
