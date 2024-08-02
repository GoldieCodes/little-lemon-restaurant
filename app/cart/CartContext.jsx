"use client"
import { createContext, useContext, useState, useEffect } from "react"
import { getDocs, collection } from "firebase/firestore"
import { db } from "../firebase"
import { LoggedinUserParams } from "../login/LoginChecker"
import { doc, setDoc, deleteDoc, getDoc, updateDoc } from "firebase/firestore"
import { toast } from "react-toastify"
import useRedirectToLogin from "@/hooks/useRedirectToLogin"

const CartVariables = createContext()

export default function CartContext({ children }) {
  const redirect = useRedirectToLogin("Login to add items to cart")
  const [cartNumber, setCartNumber] = useState(0)
  const [newItemAdded, setNewItemAdded] = useState(false)
  const [cartData, setCartData] = useState([])
  const { currentUser } = LoggedinUserParams()

  useEffect(() => {
    fetchCartItemsFromDB()
  }, [newItemAdded, currentUser])

  //I'm fetching the cart data from the db and using it to display the number on the cart
  //and also using it to display the cart page
  const fetchCartItemsFromDB = async () => {
    if (currentUser != null) {
      const docSnaps = await getDocs(
        collection(db, "users", currentUser, "cart")
      )
      const data = docSnaps.docs.map((docSnap) => docSnap.data())
      setCartData(data)
      setCartNumber(data.length)
    }
  }

  //This function is used in the add to cart button on the menu items, to add the item to the db
  const addToCart = async (menu) => {
    if (currentUser == null) {
      redirect()
    } else {
      const docRef = doc(db, "users", currentUser, "cart", menu.id.toString())
      const cartItem = await getDoc(docRef)
      if (cartItem.exists()) {
        toast.warn("This dish is already in your cart", {
          autoClose: 3500,
        })
      } else {
        await setDoc(docRef, {
          title: menu.title,
          price: menu.price,
          img: menu.img,
          description: menu.description,
          id: menu.id,
          quantity: 1,
          numOfOrderPrice: menu.price,
        })
      }
      setNewItemAdded(true)
      setTimeout(() => {
        setNewItemAdded(false)
      }, 10000)
      console.log(newItemAdded)
    }
  }

  async function removeFromCart(menuId) {
    await deleteDoc(doc(db, "users", currentUser, "cart", menuId.toString()))
    setCartData((prevItems) => prevItems.filter((item) => item.id !== menuId))
    setCartNumber((prevItems) => prevItems - 1)
  }

  const increaseOrderNum = async (itemId) => {
    setCartData((prevItems) => {
      return prevItems.map((item) => {
        if (item.id === itemId) {
          const updatedQuantity = item.quantity + 1
          const updatedPrice = (item.price * updatedQuantity).toFixed(2)
          updateCartData(itemId, updatedQuantity, updatedPrice)
          return {
            ...item,
            numOfOrderPrice: updatedPrice,
            quantity: updatedQuantity,
          }
        }
        return item
      })
    })
  }

  // Function to decrease quantity
  const decreaseOrderNum = async (itemId) => {
    setCartData((prevItems) => {
      return prevItems.map((item) => {
        if (item.id === itemId && item.quantity > 1) {
          const updatedQuantity = item.quantity - 1
          const updatedPrice = (item.price * updatedQuantity).toFixed(2)
          updateCartData(itemId, updatedQuantity, updatedPrice)
          return {
            ...item,
            numOfOrderPrice: updatedPrice,
            quantity: updatedQuantity,
          }
        }
        return item
      })
    })
  }

  // Function to update quantity in Firestore
  const updateCartData = async (itemId, quantity, newPrice) => {
    try {
      const itemRef = doc(db, "users", currentUser, "cart", itemId.toString())
      await updateDoc(itemRef, { quantity, newPrice })
    } catch (error) {
      console.error("Error updating document: ", error)
    }
  }

  return (
    <CartVariables.Provider
      value={{
        cartNumber,
        newItemAdded,
        cartData,
        addToCart,
        removeFromCart,
        increaseOrderNum,
        decreaseOrderNum,
      }}
    >
      {children}
    </CartVariables.Provider>
  )
}

export const CartContextParams = () => useContext(CartVariables)
