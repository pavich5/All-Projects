"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import "./products.css";
import { Formik } from "formik";
import Link from "next/link";

export interface Coffee {
  id?: number;
  name: string;
  description: string;
  price: number;
  image: string;
  brand: string;
  servings: number;
  flavor: string;
  isInCart?: boolean;
}

const Page = () => {
  const [dataBaseCoffe, setDataBaseCoffee] = useState<Coffee[]>([]);
  const [filteredCoffee, setFilteredCoffee] = useState(dataBaseCoffe);
  const [cartItems, setCartItems] = useState<Coffee[]>(() => {
    const storedItems = localStorage.getItem("cart");
    return storedItems ? JSON.parse(storedItems) : [];
  });  
  const [showAddForm, setShowAddForm] = useState(false);
  const ingredientOptions = ["Bubbles", "Milk", "Extra Sugar", "Double Coffee"];
  const router = useRouter();
  const { isSignedIn } = useUser();

  useEffect(() => {
    if (!isSignedIn) {
      router.push("/sign-up");
    }
  }, [isSignedIn]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:4000/api/products");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setDataBaseCoffee(data.allProducts);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  const filterCoffee = (flavor: string) => {
    const filteredData: Coffee[] = dataBaseCoffe?.filter(
      (coffee: Coffee) => coffee.flavor === flavor
    );
    const updatedFilteredData = filteredData.map((coffee) => {
      const isInCart = cartItems.some((cartItem) => cartItem.id === coffee.id);
      return { ...coffee, isInCart };
    });
    setFilteredCoffee(updatedFilteredData);
    setShowAddForm(false);
  };

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    const newCoffeeProduct: Coffee = {
      image: values.picture,
      description: values.details,
      price: parseFloat(values.price),
      flavor: values.type,
      brand: values.brand,
      name: values.name,
      servings: parseFloat(values.servings), 
    };
    try {
      const response = await fetch("http://localhost:4000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCoffeeProduct),
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setShowAddForm(false);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };
  
  const resetFilter = () => {
    const updatedAllCoffee = dataBaseCoffe.map((coffee) => {
      const isInCart = cartItems.some((cartItem) => cartItem.id === coffee.id);
      return { ...coffee, isInCart };
    });
    setFilteredCoffee(updatedAllCoffee);
  };

  const addToCart = (product: Coffee) => {
    const isAlreadyInCart = cartItems.some((item) => item.id === product.id);
    if (isAlreadyInCart) {
      return;
    }
    const updatedCartItems = cartItems.map((coffee) => {
      if (coffee.id === product.id) {
        return { ...coffee, isInCart: true };
      }
      return coffee;
    });
    updatedCartItems.push({ ...product, isInCart: true });
    setCartItems(updatedCartItems);
    localStorage.setItem("cart",JSON.stringify(cartItems))
  };
  return (
    <>
      <div className="coffeeFilters">
        <ul>
          <li onClick={() => filterCoffee("Espresso")}>Espresso</li>
          <li onClick={() => filterCoffee("Cappuccino")}>Cappuccino</li>
          <li onClick={() => filterCoffee("Iced Coffee")}>Iced Coffee</li>
          <li onClick={() => filterCoffee("Americano")}>Americano</li>
          <li onClick={() => filterCoffee("Decaf Coffee")}>Decaf Coffee</li>
          <li onClick={resetFilter}>Show All</li>
          <button onClick={() => setShowAddForm(!showAddForm)}>Custom</button>
        </ul>
      </div>
        <div className="productsPage">
          {filteredCoffee.map((coffee: Coffee) => (
            <div className="coffee" key={coffee.id}>
              <Link href={`/products/${coffee.id}`}>
                <img
                  src={coffee.image}
                  alt={coffee.flavor}
                  data-testid={coffee.flavor}
                />
              </Link>
              <h3>{coffee.flavor}</h3>
              <p>{coffee.description}</p>
              <p className="price">${coffee.price.toFixed(2)}</p>
              <button onClick={() => addToCart(coffee)} disabled={coffee.isInCart} >Add to Cart</button>
            </div>
          ))}
        </div>
      {showAddForm ? (
    <div className="formDetails">
    <h1>Add Custom Coffee</h1>
    <Formik
      initialValues={{
        type: "",
        details: "",
        price: "",
        picture: "",
        brand: "",
        name: "",
        servings: "",
        ingredients: [],
      }}
      validate={(values) => {
        const errors: any = {};
        if (!values.type) {
          errors.type = "Required";
        }
        if (!values.details) {
          errors.details = "Required";
        }
        if (!values.price) {
          errors.price = "Required";
        } else if (
          isNaN(Number(values.price)) ||
          Number(values.price) <= 0
        ) {
          errors.price = "Invalid price";
        }
        if (!values.picture) {
          errors.picture = "Required";
        }
        if (!values.brand) {
          errors.brand = "Required";
        }
        if (!values.name) {
          errors.name = "Required";
        }
        if (!values.servings) {
          errors.servings = "Required";
        } else if (
          isNaN(Number(values.servings)) ||
          Number(values.servings) <= 0
        ) {
          errors.servings = "Invalid servings";
        }
        if (values.ingredients.length === 0) {
          errors.ingredients = "Select at least one ingredient";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        handleSubmit(values, { setSubmitting });
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        setFieldValue,
      }) => (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Type</label>
            <input
              type="text"
              name="type"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.type}
            />
            {errors.type && touched.type && (
              <div className="error">{errors.type}</div>
            )}
          </div>
          <div>
            <label>Details</label>
            <input
              type="text"
              name="details"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.details}
            />
            {errors.details && touched.details && (
              <div className="error">{errors.details}</div>
            )}
          </div>
          <div>
            <label>Price</label>
            <input
              type="text"
              name="price"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.price}
            />
            {errors.price && touched.price && (
              <div className="error">{errors.price}</div>
            )}
          </div>
          <div>
            <label>Picture URL</label>
            <input
              type="text"
              name="picture"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.picture}
            />
            {errors.picture && touched.picture && (
              <div className="error">{errors.picture}</div>
            )}
          </div>
          <div>
            <label>Brand</label>
            <input
              type="text"
              name="brand"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.brand}
            />
            {errors.brand && touched.brand && (
              <div className="error">{errors.brand}</div>
            )}
          </div>
          <div>
            <label>Name</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            />
            {errors.name && touched.name && (
              <div className="error">{errors.name}</div>
            )}
          </div>
          <div>
            <label>Servings</label>
            <input
              type="text"
              name="servings"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.servings}
            />
            {errors.servings && touched.servings && (
              <div className="error">{errors.servings}</div>
            )}
          </div>
          <div>
            <label>Ingredients</label>
            {ingredientOptions.map((option) => (
              <div key={option}>
                <label>
                  <input
                    type="checkbox"
                    name="ingredients"
                    value={option}
                    checked={values.ingredients.includes(option)}
                    onChange={() => {
                      const newIngredients: string[] = [
                        ...values.ingredients,
                      ];
                      if (newIngredients.includes(option)) {
                        newIngredients.splice(
                          newIngredients.indexOf(option),
                          1
                        );
                      } else {
                        newIngredients.push(option);
                      }
                      setFieldValue("ingredients", newIngredients);
                    }}
                  />{" "}
                  {option}
                </label>
              </div>
            ))}
            {errors.ingredients && touched.ingredients && (
              <div className="error">{errors.ingredients}</div>
            )}
          </div>
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </form>
      )}
    </Formik>
  </div>
      ) : (
        null
      )}
    </>
  );
};

export default Page;
