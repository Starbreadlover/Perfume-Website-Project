import React, { createContext, useState, useEffect } from 'react';

export const ProductContext = createContext();

const initialProducts = [
    {
        id: "p1",
        name: "Oud & Velvet",
        price: 185,
        category: "Eau de Parfum",
        description: "A mysterious blend of agarwood, saffron, and dark rose. Perfect for evening wear.",
        stockStatus: "Available",
        stock: 5,
        image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: "p2",
        name: "Citrus Riviera",
        price: 120,
        category: "Eau de Toilette",
        description: "Bright lemon, bergamot, and a hint of sea salt. Like a breeze on the Mediterranean.",
        stockStatus: "Available",
        stock: 12,
        image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: "p3",
        name: "Midnight Ambre",
        price: 210,
        category: "Extrait de Parfum",
        description: "Warm amber, vanilla, and patchouli. A long-lasting and intimate fragrance.",
        stockStatus: "Sold Out",
        stock: 0,
        image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: "p4",
        name: "Floral Blush",
        price: 145,
        category: "Eau de Parfum",
        description: "Peony, jasmine, and white musk. Soft, delicate, and ultra-feminine.",
        stockStatus: "Available",
        stock: 8,
        image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=600&auto=format&fit=crop"
    }
];

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const storedProducts = localStorage.getItem('ls_products');
        if (storedProducts) {
            setProducts(JSON.parse(storedProducts));
        } else {
            setProducts(initialProducts);
            localStorage.setItem('ls_products', JSON.stringify(initialProducts));
        }

        const storedOrders = localStorage.getItem('ls_orders');
        if (storedOrders) {
            setOrders(JSON.parse(storedOrders));
        }
    }, []);

    const addProduct = (product) => {
        const newProduct = {
            ...product,
            id: Date.now().toString()
        };
        const updated = [...products, newProduct];
        setProducts(updated);
        localStorage.setItem('ls_products', JSON.stringify(updated));
    };

    const updateProduct = (id, updatedProduct) => {
        const updated = products.map(p => p.id === id ? { ...p, ...updatedProduct } : p);
        setProducts(updated);
        localStorage.setItem('ls_products', JSON.stringify(updated));
    };

    const deleteProduct = (id) => {
        const updated = products.filter(p => p.id !== id);
        setProducts(updated);
        localStorage.setItem('ls_products', JSON.stringify(updated));
    };

    const addOrder = (order) => {
        const newOrder = {
            ...order,
            id: Date.now().toString(),
            date: new Date().toISOString(),
            status: 'Pending'
        };
        const updated = [newOrder, ...orders];
        setOrders(updated);
        localStorage.setItem('ls_orders', JSON.stringify(updated));
    };

    const updateOrderStatus = (orderId, newStatus) => {
        const updated = orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o);
        setOrders(updated);
        localStorage.setItem('ls_orders', JSON.stringify(updated));
    };

    const getProduct = (id) => {
        return products.find(p => p.id === id);
    };

    return (
        <ProductContext.Provider value={{ products, orders, addProduct, updateProduct, deleteProduct, getProduct, addOrder, updateOrderStatus }}>
            {children}
        </ProductContext.Provider>
    );
};
