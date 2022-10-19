import Head from 'next/head';
import Header from '../components/Header';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Currency from 'react-currency-formatter';
import { useSelector } from 'react-redux';
import Button from '../components/Button';
import { selectBasketItems, selectBasketTotal } from '../redux/basketSlice';
import CheckoutProduct from '../components/CheckoutProduct';
// import CheckoutProduct from '../components/CheckoutProduct';
// import { fetchPostJSON } from '../utils/api-helpers';

const Checkout = () => {
  const items = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBasketTotal);
  const router = useRouter();
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState(
    {} as { [key: string]: Product[] }
  );

  useEffect(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item._id] = results[item._id] || []).push(item);
      return results;
    }, {} as { [key: string]: Product[] });

    setGroupedItemsInBasket(groupedItems);
  }, [items]);

  return (
    <div className='min-h-screen overflow-hidden bg-[#E7ECEE]'>
      <Head>
        <title>Bag </title>
        <link rel='icon' href='/favicon.co' />
      </Head>
      <Header />
      <main className='mx-auto max-w-5xl pb-24 '>
        <div className='px-5'>
          <h1 className='my-4 text-3xl font-semibold lg:text-4xl'>
            {items.length > 0 ? 'Review your bag' : 'Your bag is empty'}
          </h1>
          <p className='my-4'>Free delivery </p>
          {items.length === 0 && (
            <Button
              title='Continue Shopping'
              onClick={() => router.push('/')}
            />
          )}
        </div>
        {items.length > 0 && (
          <div className='mx-5 md:mx-8 '>
            {Object.entries(groupedItemsInBasket).map(([key, items]) => (
              <CheckoutProduct key={key} items={items} id={key} />
            ))}

            <div className='my-12 mt-6 ml-auto max-w-3xl'>
              <div className='divide-y divide-gray-300'>
                <div className='pb-4'>
                  <div className='flex justify-between'>
                    <p>Subtotal</p>
                    <p>
                      <Currency quantity={basketTotal} currency='USD' />
                    </p>
                  </div>
                  <div className='flex justify-between'>
                    <p>Shipping</p>
                    <p>FREE</p>
                  </div>
                </div>
                <div className='flex justify-between pt-4 text-xl font-semibold'>
                  <h4>Total</h4>
                  <h4>
                    <Currency quantity={basketTotal} currency='USD' />
                  </h4>
                </div>
              </div>
              <div className='float-right py-12'>
                <Button title='Check Out' width='full' />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Checkout;
