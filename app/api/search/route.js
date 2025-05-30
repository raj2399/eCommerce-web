export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const category = searchParams.get('category') || '';
    const filtersStr = searchParams.get('filters');
    const filters = filtersStr ? JSON.parse(decodeURIComponent(filtersStr)) : {};

    const mockData = {
      'running-shoes': {
        products: [
          {
            id: 1,
            name: 'Nike Air Zoom',
            price: 129.99,
            brand: 'Nike',
            color: 'Black',
            size: 9,
            image: 'https://placehold.co/400x300?text=Product+Image',
          },
          {
            id: 2,
            name: 'Adidas Ultraboost',
            price: 179.99,
            brand: 'Adidas',
            color: 'White',
            size: 10,
            image: 'https://placehold.co/400x300?text=Product+Image',
          }
        ],
        facets: {
          attributes: [
            {
              name: 'brand',
              type: 'string',
              values: [
                { value: 'Nike', count: 1 },
                { value: 'Adidas', count: 1 },
              ],
            },
            {
              name: 'color',
              type: 'string',
              values: [
                { value: 'Black', count: 1 },
                { value: 'White', count: 1 },
              ],
            },
            {
              name: 'size',
              type: 'number',
              values: [
                { value: '9', count: 1 },
                { value: '10', count: 1 },
              ],
            },
          ],
        },
      },
      'televisions': {
        products: [
          {
            id: 3,
            name: 'Samsung 4K Smart TV',
            price: 699.99,
            brand: 'Samsung',
            screenSize: 55,
            resolution: '4K',
            image: 'https://placehold.co/400x300?text=Product+Image',
          },
          {
            id: 4,
            name: 'LG OLED TV',
            price: 1299.99,
            brand: 'LG',
            screenSize: 65,
            resolution: '4K',
            image: 'https://placehold.co/400x300?text=Product+Image',
          }
        ],
        facets: {
          attributes: [
            {
              name: 'brand',
              type: 'string',
              values: [
                { value: 'Samsung', count: 1 },
                { value: 'LG', count: 1 },
              ],
            },
            {
              name: 'screenSize',
              type: 'number',
              values: [
                { value: '55', count: 1 },
                { value: '65', count: 1 },
              ],
            },
            {
              name: 'resolution',
              type: 'string',
              values: [
                { value: '4K', count: 2 },
              ],
            },
          ],
        },
      },
    };

    if (!category) {
      const allProducts = Object.values(mockData).flatMap(cat => cat.products);
      return Response.json({
        products: allProducts,
        facets: {
          attributes: [],
        },
      });
    }

    const categoryData = mockData[category];
    if (!categoryData) {
      return Response.json({
        products: [],
        facets: {
          attributes: [],
        },
      });
    }

    let filteredProducts = categoryData.products;
    if (Object.keys(filters).length > 0) {
      filteredProducts = filteredProducts.filter(product => {
        return Object.entries(filters).every(([key, value]) => {
          if (key === 'minPrice') return product.price >= value;
          if (key === 'maxPrice') return product.price <= value;
          return product[key] === value;
        });
      });
    }

    if (query) {
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    return Response.json({
      products: filteredProducts,
      facets: categoryData.facets,
    });
  } catch (error) {
    console.error('Search API error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
} 