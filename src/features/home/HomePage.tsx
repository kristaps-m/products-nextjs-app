import React from "react";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
      <h2 className="text-3xl font-bold mb-4">Welcome to Our Product Shop</h2>
      <p className="text-lg text-center mb-8">
        Explore our wide range of high-quality products.
      </p>

      <div className="product flex items-center justify-center p-4 bg-white rounded-lg shadow-lg">
        <img
          src="https://fastly.picsum.photos/id/292/3852/2556.jpg?hmac=cPYEh0I48Xpek2DPFLxTBhlZnKVhQCJsbprR-Awl9lo"
          width={500}
          height={500}
          alt="Product Image"
          className="product-image rounded-lg"
        />
        <div className="product-details ml-4">
          <h3 className="text-xl font-semibold">
            Top Product of the prevous month:
          </h3>
          <br />
          <h3 className="text-lg font-semibold text-blue-600">Onion</h3>
          <br />
          <p className="text-sm max-w-[50%]">
            An onion also known as the bulb onion or common onion, is a
            vegetable that is the most widely cultivated species of the genus
            Allium.
          </p>
          <p className="text-sm max-w-[50%]">
            The shallot is a botanical variety of the onion which was classified
            as a separate species until 2011. Its close relatives include
            garlic, scallion, leek, and chive.
          </p>
          <p className="text-sm font-semibold text-green-600">Price: $8.99</p>
        </div>
      </div>
      <p>
        DISCLAIMER: Images are just to represent possible picture size in a real
        application. Do not take what&apos;s displayed in pictures seriously.
      </p>
    </div>
  );
}
