import React from "react";

export default async function List() {
  const products = await fetch(
    "https://strapi-app-tnshv.ondigitalocean.app/api/products",
    {
      headers: {
        Authorization: `Bearer 9c54bfb85749cfdc1ea1f98fb2f1a64b7cac4ad7662fda7a099556577a20343b945b20f2b1b68dfab82266337804834c1a1ef342c8a4c5e2886835ba072f49746a825df9e09c46fa214a33fa384134c89d18c0dae1d142c2c441f5876fa4a984012020b22d38a08b5fc2fd60ce80248ebae5c5c2f9511e84c7cae90cfe3a246c`,
      },
    }
  ).then((response) => response.json());

  console.log(products);

  return <div>List</div>;
}
