export type LocalStorageType = "carts";
export type OutputType = {
  status: "success" | "error";
  message: string;
};
export const setLocalStorage = <T>(
  id: LocalStorageType,
  value: T
): OutputType => {
  if (id === "carts") {
    const currentCarts = localStorage.getItem("carts");
    if (currentCarts) {
      const parsedCurrentCarts: T[] = JSON.parse(currentCarts);
      const sameValueCarts = parsedCurrentCarts.filter((id) => id !== value);
      if (sameValueCarts.length !== 0) {
        const newCarts = [...parsedCurrentCarts, value];
        localStorage.setItem("carts", JSON.stringify(newCarts));
        return {
          status: "success",
          message: "Product added in cart",
        };
      }
      return {
        status: "error",
        message: "This product is already existed in cart",
      };
    } else {
      const newCarts = [value];
      localStorage.setItem("carts", JSON.stringify(newCarts));
      return {
        status: "success",
        message: "Product added in cart",
      };
    }
  }
  return {
    status: "error",
    message: "System error is occured",
  };
};
