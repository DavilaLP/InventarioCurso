// Pruebas unitarias de utilidades y formateo del Frontend (CI)

export const formatNumbers = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const validateEmail = (email) => {
  return Boolean(
    email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  );
};

describe("Pruebas Unitarias del Frontend (CI)", () => {
  test("validateEmail valida correos válidos e inválidos", () => {
    expect(validateEmail("usuario@empresa.com")).toBe(true);
    expect(validateEmail("correo_sin_arroba")).toBe(false);
  });

  test("formatNumbers formatea números con separador de miles", () => {
    expect(formatNumbers(1000)).toBe("1,000");
    expect(formatNumbers(5500200)).toBe("5,500,200");
  });
});
