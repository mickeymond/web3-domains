import './App.css';
import TokenSelector from "./components/TokenSelector";
import { Web3 } from "web3";
import { ChainlinkPlugin, MainnetPriceFeeds } from '@chainsafe/web3-plugin-chainlink';
import { useEffect, useState } from 'react';
import { mockDomains } from './data/domains';
import { useReadLocalStorage } from 'usehooks-ts';

// const web3 = new Web3('https://rpc-sepolia.rockx.com');
const web3 = new Web3();
const chainlinkPlugin = new ChainlinkPlugin();

web3.registerPlugin(chainlinkPlugin);

function App() {
  const [domains, setDomains] = useState(mockDomains);
  const token = useReadLocalStorage('PREFERRED_TOKEN');

  useEffect(() => {
    // Get price
    web3.chainlink.getPrice(MainnetPriceFeeds[token?.id] || MainnetPriceFeeds.UsdcUsd)
      .then(price => {
        setDomains(mockDomains.map(domain => ({ ...domain, price: domain.price * (price.answer.toString() / (10 ** (token?.decimal || 18))) })));
      })
      .catch(console.log);
  }, [token]);

  return (
    <div className='min-h-full'>
      <header className="bg-white shadow">
        <div className='flex justify-between items-center px-4 py-6'>
          <div className="">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Web3 Domains</h1>
          </div>
          <div>
            <TokenSelector />
          </div>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <ul role="list" className="divide-y divide-gray-100">
            {domains.map((domain) => (
              <li key={domain.id} className="flex justify-between gap-x-6 py-5">
                <div className="flex min-w-0 gap-x-4">
                  <img alt="" src={`https://ui-avatars.com/api/?name=${domain.name}`} className="h-12 w-12 flex-none rounded-full bg-gray-50" />
                  <div className="min-w-0 flex-auto">
                    <p className="text-lg font-semibold leading-6 text-gray-900">{domain.name}</p>
                    <p className="mt-1 truncate text-sm font-bold leading-5 text-gray-500">{domain.price} {token?.name || 'USDC'}</p>
                  </div>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-gray-900">{domain.role}</p>
                  {domain.lastSeen ? (
                    <p className="mt-1 text-sm font-bold leading-5 text-gray-500">
                      Last seen <time dateTime={domain.lastSeenDateTime}>{domain.lastSeen}</time>
                    </p>
                  ) : (
                    <div className="mt-1 flex items-center gap-x-1.5">
                      <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      </div>
                      <p className="text-sm font-bold leading-5 text-gray-500">Online</p>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  )
}

export default App
