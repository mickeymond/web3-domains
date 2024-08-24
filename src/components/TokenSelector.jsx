'use client'
import { useState } from 'react'
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { useLocalStorage } from 'usehooks-ts'

const tokens = [
  {
    id: "UsdcUsd",
    name: 'USDC',
    decimal: 18,
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ43MuDqq54iD1ZCRL_uthAPkfwSSL-J5qI_Q&s',
  },
  {
    id: "BtcUsd",
    name: 'BTC',
    decimal: 18,
    avatar: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
  },
  {
    id: "EthUsd",
    name: 'ETH',
    decimal: 18,
    avatar: 'https://images.seeklogo.com/logo-png/52/1/ethereum-logo-png_seeklogo-527153.png',
  },
  {
    id: "BnbUsd",
    name: 'BNB',
    decimal: 18,
    avatar: 'https://w7.pngwing.com/pngs/1007/775/png-transparent-bnb-cryptocurrencies-icon.png',
  }
]

export default function TokenSelector() {
  const [selected, setSelected] = useLocalStorage('PREFERRED_TOKEN', tokens[0])

  return (
    <Listbox value={selected} onChange={setSelected}>
      <Label className="block text-sm font-medium leading-6 text-gray-900">Select Preferred Token</Label>
      <div className="relative mt-2">
        <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
          <span className="flex items-center">
            <img alt="" src={selected.avatar} className="h-5 w-5 flex-shrink-0 rounded-full" />
            <span className="ml-3 block truncate">{selected.name}</span>
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
            <ChevronUpDownIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
          </span>
        </ListboxButton>

        <ListboxOptions
          transition
          className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
        >
          {tokens.map((person) => (
            <ListboxOption
              key={person.id}
              value={person}
              className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
            >
              <div className="flex items-center">
                <img alt="" src={person.avatar} className="h-5 w-5 flex-shrink-0 rounded-full" />
                <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
                  {person.name}
                </span>
              </div>

              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                <CheckIcon aria-hidden="true" className="h-5 w-5" />
              </span>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  )
}
