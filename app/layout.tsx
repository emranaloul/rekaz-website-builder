import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Rekaz Website Builder',
  description: 'Build your website with Rekaz',
  generator: 'Rekaz',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <link
          rel='icon'
          type='image/png'
          href='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAo1JREFUWEftlkto1FAUhv8z1kqrYjeCrnrHR5PBpQu3dVEoooiOQksRi4LQhShIMxRaiFChzSB25c4HjlbpSPGxENyoe3GnZBScZOXG7rTd1BxN6tTMTB43KaEbs0zOPd93z7mPEDb5oU3m47+AdAVYR662LH75WuaAeR6Um1aNei1tK+UFAKppwgkAue+uqYY1l0ZCXqC9Ak08ZswUytZEUglpAX/ij/qhzo6fy0dAPMXAQOPbn2S6YljXk0ikEnAB7LUkXwF4xA8kwoQya83ISqQWMEviDhgXgkBJJFIJmOPiNghjUbOUlUgsYGriFoCrMiWWkUguUBJzYFyREXBj4iQSC7hJayVxjxmjshLM6C+UrXeB60U2SSPOXf2mJuYJGJIfSzdUoz65YYF0cHfLcrFg2IsbEuCz2PI5LyoMDMvPfC2SCQ+I6QfA+8G8oJbtu77DKz6dCzf3iSoxTsVHS0QwDLVslbxFGhf+Ru/v2LNiLUTD6RGR84GZbsbl+wtdP7IjBVz43hX7CZiLYYmJcL+vy7pIOhxT6x1h0EEwrBzhBAOn28YRT6uz9lRsC95fOrx1x66lKggnw2fFFaXbHnXhrTGmJtz7wCvz+tMCD22BC9/Z832RQcdD4cwPle32+SC4O8bUeqsAnYmCBwp4M+9ZegbgWGjZgcd9descVeH/Q2oK/6TlB3Lg197LgJkHtuDL5QPbnK7Vl/47vl2Cnyp1eygK3hhjloQGh3erZXs8YjL/PpmaeAVgMLTshKry1RqWgcvshrYWmONiEITnADoDErz41i2KR/W3q7LJZeLatmGIRCbw0F3QIpEZPFTA20Zr7RjLouxNR4NMn7KMib0LsoRHtiBrcCP/b66x7yEcsCWSAAAAAElFTkSuQmCC'
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
