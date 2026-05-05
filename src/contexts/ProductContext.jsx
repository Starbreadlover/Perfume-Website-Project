import React, { createContext, useState, useEffect, useCallback } from 'react';
import { 
    collection, 
    addDoc, 
    updateDoc, 
    deleteDoc, 
    doc, 
    onSnapshot, 
    query, 
    orderBy,
    limit,
    startAfter,
    getDocs
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import imageCompression from 'browser-image-compression';
import { db, storage } from '../firebase';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Sync Products from Firestore (Real-time for public site)
    useEffect(() => {
        const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const prods = [];
            querySnapshot.forEach((doc) => {
                prods.push({ id: doc.id, ...doc.data() });
            });
            setProducts(prods);
            setLoading(false);
        }, (err) => {
            console.error("Firestore error:", err);
            setError("Failed to fetch products.");
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
        }, (err) => {
            console.error("Orders sync error:", err);
        });

        return () => unsubscribe();
    }, []);

    const compressAndUploadImage = async (imageFile, fileName) => {
        try {
            const options = {
                maxSizeMB: 0.8,
                maxWidthOrHeight: 1200,
                useWebWorker: true
            };
            const compressedFile = await imageCompression(imageFile, options);
            const storageRef = ref(storage, `products/${Date.now()}_${fileName}`);
            const snapshot = await uploadBytes(storageRef, compressedFile);
            return await getDownloadURL(snapshot.ref);
        } catch (error) {
            console.error("Image optimization failed:", error);
            throw new Error("Failed to optimize and upload image.");
        }
    };

    const addProduct = async (product, imageFile) => {
        try {
            let imageUrl = product.image;
            if (imageFile) {
                imageUrl = await compressAndUploadImage(imageFile, product.name);
            }
            
            await addDoc(collection(db, "products"), {
                ...product,
                image: imageUrl,
                createdAt: new Date().toISOString()
            });
        } catch (err) {
            console.error("Error adding product: ", err);
            throw err;
        }
    };

    const updateProduct = async (id, updatedProduct, imageFile) => {
        try {
            let imageUrl = updatedProduct.image;
            if (imageFile) {
                imageUrl = await compressAndUploadImage(imageFile, updatedProduct.name);
            }

            const productRef = doc(db, "products", id);
            await updateDoc(productRef, {
                ...updatedProduct,
                image: imageUrl,
                updatedAt: new Date().toISOString()
            });
        } catch (err) {
            console.error("Error updating product: ", err);
            throw err;
        }
    };

    const deleteProduct = async (id) => {
        try {
            await deleteDoc(doc(db, "products", id));
        } catch (err) {
            console.error("Error deleting product: ", err);
            throw err;
        }
    };

    const addOrder = async (order) => {
        try {
            await addDoc(collection(db, "orders"), {
                ...order,
                date: new Date().toISOString(),
                status: 'Pending'
            });
        } catch (err) {
            console.error("Error adding order: ", err);
            throw err;
        }
    };

    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            const orderRef = doc(db, "orders", orderId);
            await updateDoc(orderRef, { status: newStatus });
        } catch (err) {
            console.error("Error updating order status: ", err);
            throw err;
        }
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
            updateOrderStatus 
        }}>
            {children}
        </ProductContext.Provider>
    );
};


