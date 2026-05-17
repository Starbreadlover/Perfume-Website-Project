import React, { createContext, useState, useEffect, useCallback } from 'react';
import imageCompression from 'browser-image-compression';
import supabase from '../supabase';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProducts = useCallback(async () => {
        const { data, error: err } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false });

        if (err) {
            console.error("Supabase error:", err);
            setError(`Failed to fetch products: ${err.message}`);
        } else {
            setProducts((data || []).map(row => ({ ...row, image: row.image_url })));
        }
    }, []);

    const fetchOrders = useCallback(async () => {
        const { data, error: err } = await supabase
            .from('orders')
            .select('*')
            .order('date', { ascending: false });

        if (err) {
            console.error("Orders fetch error:", err);
        } else {
            setOrders(data || []);
        }
    }, []);

    useEffect(() => {
        fetchProducts().then(() => setLoading(false));
        fetchOrders();
    }, [fetchProducts, fetchOrders]);

    const compressAndUploadImage = async (imageFile) => {
        const options = {
            maxSizeMB: 0.8,
            maxWidthOrHeight: 1200,
            useWebWorker: false
        };
        const compressedFile = await imageCompression(imageFile, options);

        const formData = new FormData();
        formData.append('file', compressedFile);
        formData.append('upload_preset', 'perfume_images');

        const res = await fetch('https://api.cloudinary.com/v1_1/dybaq1zkl/image/upload', {
            method: 'POST',
            body: formData
        });

        const data = await res.json();
        if (!res.ok) {
            throw new Error(`Cloudinary error: ${data?.error?.message || res.statusText}`);
        }
        return data.secure_url;
    };

    const addProduct = async (product, imageFile) => {
        let imageUrl = product.image;
        if (imageFile) {
            imageUrl = await compressAndUploadImage(imageFile);
        }
        const { error: err } = await supabase.from('products').insert({
            name: product.name,
            description: product.description,
            price: Number(product.price),
            category: product.category,
            stock: Number(product.stock),
            image_url: imageUrl,
        });
        if (err) throw new Error(err.message || "Failed to save to database.");
        await fetchProducts();
    };

    const updateProduct = async (id, updatedProduct, imageFile) => {
        let imageUrl = updatedProduct.image;
        if (imageFile) {
            imageUrl = await compressAndUploadImage(imageFile);
        }
        const { error: err } = await supabase.from('products').update({
            name: updatedProduct.name,
            description: updatedProduct.description,
            price: Number(updatedProduct.price),
            category: updatedProduct.category,
            stock: Number(updatedProduct.stock),
            image_url: imageUrl,
        }).eq('id', id);
        if (err) throw new Error(err.message || "Failed to update product.");
        await fetchProducts();
    };

    const deleteProduct = async (id) => {
        const { error: err } = await supabase.from('products').delete().eq('id', id);
        if (err) throw new Error(err.message || "Failed to delete product.");
        await fetchProducts();
    };

    const addOrder = async (order) => {
        const { error: err } = await supabase.from('orders').insert({
            ...order,
            date: new Date().toISOString(),
            status: 'Pending',
        });
        if (err) throw new Error(err.message || "Failed to place order.");
        await fetchOrders();
    };

    const updateOrderStatus = async (orderId, newStatus) => {
        const { error: err } = await supabase
            .from('orders')
            .update({ status: newStatus })
            .eq('id', orderId);
        if (err) throw new Error(err.message || "Failed to update order status.");
        await fetchOrders();
    };

    const getProduct = useCallback((id) => {
        return products.find(p => p.id === id);
    }, [products]);

    return (
        <ProductContext.Provider value={{
            products,
            orders,
            loading,
            error,
            addProduct,
            updateProduct,
            deleteProduct,
            getProduct,
            addOrder,
            updateOrderStatus,
        }}>
            {children}
        </ProductContext.Provider>
    );
};
