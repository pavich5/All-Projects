"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import coffees from "../data/coffees.json";
import "./products.css";
import { Formik } from "formik";
import Link from "next/link";

export interface Coffee {
  id: number;
  picture: string;
  details: string;
  price: number;
  type: string;
  isInCart?: boolean;
}

const Page = () => {
  const [allCoffee, setAllCoffee] = useState<Coffee[]>(() => {
    const coffeeData = localStorage.getItem("allCoffee");
    return coffeeData ? JSON.parse(coffeeData) : coffees;
  });
  const [filteredCoffee, setFilteredCoffee] = useState<Coffee[]>(allCoffee);
  const [cartItems, setCartItems] = useState<Coffee[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const ingredientOptions = ["Bubbles", "Milk", "Extra Sugar", "Double Coffee"];
  const router = useRouter();
  const { isSignedIn } = useUser();

  useEffect(() => {
    if (!isSignedIn) {
      router.push("/sign-up");
    } else{
      localStorage.setItem("allCoffee", JSON.stringify(coffees))
    }
  }, [isSignedIn]);

  const filterCoffee = (type: string) => {
    const filteredData: Coffee[] = allCoffee.filter(
      (coffee: Coffee) => coffee.type === type
    );
    const updatedFilteredData = filteredData.map((coffee) => {
      const isInCart = cartItems.some((cartItem) => cartItem.id === coffee.id);
      return { ...coffee, isInCart };
    });
    setFilteredCoffee(updatedFilteredData);
    setShowAddForm(false);
  };

  const handleSubmit = (values: any, { setSubmitting }: any) => {
    const newCoffeeProduct: Coffee = {
      id: allCoffee.length + 22,
      picture: values.picture,
      details: values.details,
      price: parseFloat(values.price),
      type: values.type,
      isInCart: false,
    };

    setAllCoffee([...allCoffee, newCoffeeProduct]);
    localStorage.setItem(
      "allCoffee",
      JSON.stringify([...allCoffee, newCoffeeProduct])
    );
    setShowAddForm(false);
  };

  const resetFilter = () => {
    const updatedAllCoffee = allCoffee.map((coffee) => {
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
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
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
      {!showAddForm ? (
        <div className="productsPage">
          {filteredCoffee.map((coffee: Coffee) => (
            <div className="coffee" key={coffee.id}>
              <Link href={`/products/${coffee.id}`}>
                <img
                  src={coffee.picture}
                  alt={coffee.type}
                  data-testid={coffee.type}
                />
              </Link>
              <h3>{coffee.type}</h3>
              <p>{coffee.details}</p>
              <p className="price">${coffee.price.toFixed(2)}</p>
              <button
                disabled={coffee.isInCart}
                onClick={() => addToCart(coffee)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="formDetails">
          <h1>Add Custom Coffee</h1>
          <Formik
            initialValues={{
              type: "",
              details: "",
              price: "",
              picture: "",
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
                isNaN(Number(values.price)) &&
                Number(values.price) <= 15
              ) {
                errors.price = "Invalid price";
              }
              if (!values.picture) {
                errors.picture = "Required";
              }
              if (values.ingredients.length === 0) {
                errors.ingredients = "Select at least one ingredient";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }: any) => {
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
                  {errors.type && touched.type && errors.type}
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
                  {errors.details && touched.details && errors.details}
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
                  {errors.price && touched.price && errors.price}
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
                  {errors.picture || (touched.picture && errors.picture)}
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
      )}
    </>
  );
};

export default Page;
