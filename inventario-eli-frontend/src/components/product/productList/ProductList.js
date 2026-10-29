import React, { useEffect, useState } from 'react';
import "./productList.scss";
import { SpinnerImg } from "../../loader/Loader";
import { FaEdit, FaTrashAlt, FaSave } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import Search from '../../search/Search';
import { useDispatch, useSelector } from 'react-redux';
import { FILTER_PRODUCTS, selectFilteredProducts } from '../../../redux/features/product/filterSlice';
import ReactPaginate from 'react-paginate';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { deleteProduct, getProducts, updateProduct } from '../../../redux/features/product/productSlice';
import { Link } from 'react-router-dom';

const ProductList = ({ products, isLoading }) => {
  const [search, setSearch] = useState("");
  const filteredProducts = useSelector(selectFilteredProducts);
  const [pendingQuantity, setPendingQuantity] = useState({});

  const dispatch = useDispatch();

  // Suma visual local (pero solo cambia visualmente)
  const handlePlusClick = (productId) => {
    setPendingQuantity(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  };

  // Guardar: ahora sí actualiza el stock real
  const handleSaveClick = (productId, currentQuantity) => {
    const cantidadExtra = pendingQuantity[productId] || 0;
    if (cantidadExtra > 0) {
      handleStockChange(productId, currentQuantity + cantidadExtra);
      setPendingQuantity(prev => ({ ...prev, [productId]: 0 })); // Reset visual
    }
  };

  // Llama así al hacer click en los botones + y -
  const handleStockChange = (id, newQuantity) => {
    dispatch(updateProduct({ id, formData: { quantity: newQuantity } }))
      .then(() => dispatch(getProducts()));
  };

  const shortenText = (text, n) => {
    if (text.length > n) {
      return text.substring(0, n).concat("...");
    }
    return text;
  };

  const delProduct = async (id) => {
    await dispatch(deleteProduct(id));
    await dispatch(getProducts());
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: 'Borrar Producto',
      message: '¿Está seguro de borrarlo?',
      buttons: [
        {
          label: 'Borrar',
          onClick: () => delProduct(id)
        },
        {
          label: 'Cancelar',
        }
      ]
    });
  };

  // Paginación
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(filteredProducts.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredProducts.length / itemsPerPage) || 1);
  }, [itemOffset, itemsPerPage, filteredProducts]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % (filteredProducts.length || 1);
    setItemOffset(newOffset);
  };

  useEffect(() => {
    dispatch(FILTER_PRODUCTS({ products, search }));
  }, [products, search, dispatch]);

  return (
    <div className="product-list-container">
      {isLoading && <SpinnerImg />}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", flexWrap: "wrap", gap: "10px" }}>
        <h3>Inventario de Productos</h3>
        <Search value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      <div className="table-responsive">
        {!isLoading && filteredProducts.length === 0 ? (
          <p style={{ textAlign: "center", padding: "1rem" }}>No se encontraron productos.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map(product => {
                const sumaPendiente = pendingQuantity[product._id] || 0;
                return (
                  <tr key={product._id}>
                    <td>{shortenText(product.name, 25)}</td>
                    <td>{product.category}</td>
                    <td>s/{product.price}</td>
                    <td>
                      {Number(product.quantity) + Number(sumaPendiente)}
                      <button
                        className="stock-btn"
                        onClick={() => handlePlusClick(product._id)}
                        title="Sumar al stock"
                        style={{ marginLeft: "10px" }}
                      >+</button>
                      {sumaPendiente > 0 && (
                        <button
                          className="save-btn"
                          onClick={() => handleSaveClick(product._id, Number(product.quantity))}
                          style={{ marginLeft: "5px", cursor: "pointer", background: "transparent", border: "none" }}
                          title="Guardar"
                        >
                          <FaSave color="royalblue" size={18} />
                        </button>
                      )}
                    </td>
                    <td className='icons'>
                      <span style={{ marginRight: "10px" }}>
                        <Link to={`/product-detail/${product._id}`} title="Ver Detalle">
                          <AiOutlineEye size={22} color={"purple"} />
                        </Link>
                      </span>
                      <span style={{ marginRight: "10px" }}>
                        <Link to={`/edit-product/${product._id}`} title="Editar">
                          <FaEdit size={20} color={"green"} />
                        </Link>
                      </span>
                      <span>
                        <FaTrashAlt size={20} color={"red"} onClick={() => confirmDelete(product._id)} style={{ cursor: "pointer" }} title="Eliminar" />
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
      {filteredProducts.length > itemsPerPage && (
        <ReactPaginate
          breakLabel="..."
          nextLabel="Siguiente >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="< Anterior"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="activePage"
        />
      )}
    </div>
  );
};

export default ProductList;
