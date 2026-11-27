// Pruebas unitarias conectadas al código real del Frontend (CI)
jest.mock("axios", () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    post: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
  },
}));

import { formatNumbers } from "./components/product/productSummary/ProductSummary";
import { validateEmail } from "./services/authService";
import productReducer, {
  CALC_STORE_VALUE,
  CALC_OUTOFSTOCK,
  CALC_CATEGORY,
} from "./redux/features/product/productSlice";

describe("Pruebas Unitarias del Código Real del Frontend (CI)", () => {
  test("validateEmail real de authService valida correos válidos e inválidos", () => {
    expect(Boolean(validateEmail("usuario@empresa.com"))).toBe(true);
    expect(Boolean(validateEmail("correo_sin_arroba"))).toBe(false);
  });

  test("formatNumbers real de ProductSummary formatea números con separador de miles", () => {
    expect(formatNumbers(1000)).toBe("1,000");
    expect(formatNumbers(5500200)).toBe("5,500,200");
  });

  test("productSlice calcula correctamente el valor total, agotados y categorías", () => {
    const sampleProducts = [
      { name: "Laptop", category: "Tecnología", price: 1500, quantity: 2 },
      { name: "Mouse", category: "Tecnología", price: 50, quantity: 0 },
      { name: "Silla", category: "Oficina", price: 300, quantity: "3" },
    ];

    let state = productReducer(undefined, CALC_STORE_VALUE(sampleProducts));
    expect(state.totalStoreValue).toBe(3900);

    state = productReducer(state, CALC_OUTOFSTOCK(sampleProducts));
    expect(state.outOfStock).toBe(1);

    state = productReducer(state, CALC_CATEGORY(sampleProducts));
    expect(state.category).toEqual(["Tecnología", "Oficina"]);
  });
});
