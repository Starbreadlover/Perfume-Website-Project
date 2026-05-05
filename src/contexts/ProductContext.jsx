import React, { createContext, useState, useEffect } from 'react';
import { 
    collection, 
    addDoc, 
    updateDoc, 
    deleteDoc, 
    doc, 
    onSnapshot, 
    query, 
    orderBy 
} from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    // Sync Products from Firestore
    useEffect(() => {
        const q = query(collection(db, "products"), orderBy("name"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const prods = [];
            querySnapshot.forEach((doc) => {
                prods.push({ id: doc.id, ...doc.data() });
            });
            setProducts(prods);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // Sync Orders from Firestore
    useEffect(() => {
        const q = query(collection(db, "orders"), orderBy("date", "desc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const ords = [];
            querySnapshot.forEach((doc) => {
                ords.push({ id: doc.id, ...doc.data() });
            });
            setOrders(ords);
        });

        return () => unsubscribe();
    }, []);

    const uploadImage = async (base64Image, fileName) => {
        if (!base64Image || !base64Image.startsWith('data:image')) return base64Image;
        
        const storageRef = ref(storage, `products/${Date.now()}_${fileName}`);
        const snapshot = await uploadString(storageRef, base64Image, 'data_url');
        return await getDownloadURL(snapshot.ref);
    };

    const addProduct = async (product) => {
        try {
            // If image is a base64 string, upload it to storage first
            const imageUrl = await uploadImage(product.image, product.name);
            await addDoc(collection(db, "products"), {
                ...product,
                image: imageUrl,
                createdAt: new Date().toISOString()
            });
        } catch (error) {
            console.error("Error adding product: ", error);
        }
    };

    const updateProduct = async (id, updatedProduct) => {
        try {
            let imageUrl = updatedProduct.image;
            // If image changed and is base64, upload new one
            if (updatedProduct.image && updatedProduct.image.startsWith('data:image')) {
                imageUrl = await uploadImage(updatedProduct.image, updatedProduct.name);
            }

            const productRef = doc(db, "products", id);
            await updateDoc(productRef, {
                ...updatedProduct,
                image: imageUrl
            });
        } catch (error) {
            console.error("Error updating product: ", error);
        }
    };

    const deleteProduct = async (id) => {
        try {
            await deleteDoc(doc(db, "products", id));
        } catch (error) {
            console.error("Error deleting product: ", error);
        }
    };

    const addOrder = async (order) => {
        try {
            await addDoc(collection(db, "orders"), {
                ...order,
                date: new Date().toISOString(),
                status: 'Pending'
            });
        } catch (error) {
            console.error("Error adding order: ", error);
        }
    };

    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            const orderRef = doc(db, "orders", orderId);
            await updateDoc(orderRef, { status: newStatus });
        } catch (error) {
            console.error("Error updating order status: ", error);
        }
    };

    const getProduct = (id) => {
        return products.find(p => p.id === id);
    };

    return (
        <ProductContext.Provider value={{ 
            products, 
            orders, 
            loading,
            addProduct, 
            updateProduct, 
            deleteProduct, 
            getProduct, 
            addOrder, 
            updateOrderStatus 
        }}>
            {children}
        </ProductContext.Provider>
    );
};

