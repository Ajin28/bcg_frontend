import { useState, useEffect } from "react";
import bcgLogo from "../assets/bcg.png";
import LoginForm from "../component/LoginForm";
import { Card } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { RootState } from "../store/store";
import { Navigate } from "react-router-dom";
import { FaBoxes, FaTags } from "react-icons/fa";
import { GoArrowRight } from "react-icons/go";
import { getProductList } from "../features/product/productSlice";
import { Nav, Table, Tab, Tabs, Image, Pagination, Navbar, Form, Row, Button, Col , InputGroup} from "react-bootstrap";

import "./Page.scss";
import "./HomePage.scss";

function ProductTablePage() {
    const [form, showForm] = useState<"login" | "register" | null>(null);

    const dispatch = useAppDispatch();
    const { loading, error, product_list } = useAppSelector(
        (state: RootState) => state.product
    );

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    console.log(product_list);
    useEffect(() => {
        dispatch(
            getProductList({
                page: currentPage,
                page_size: 10,
            })
        );
    }, [dispatch]);

    useEffect(() => {
        if (product_list) setTotalPages(product_list.total_pages);
    }, [product_list]);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const renderPaginationItems = () => {
        const items = [];
        const range = 2; // Number of pages to show around the current page

        // Show the first page
        items.push(
            <Pagination.Item
                key={1}
                active={1 === currentPage}
                onClick={() => handlePageChange(1)}
            >
                1
            </Pagination.Item>
        );

        // Show ellipsis if needed before the current range
        if (currentPage - range > 2) {
            items.push(<Pagination.Ellipsis key="ellipsis-start" disabled />);
        }

        // Add pages around the current page
        for (
            let page = Math.max(2, currentPage - range);
            page <= Math.min(totalPages - 1, currentPage + range);
            page++
        ) {
            items.push(
                <Pagination.Item
                    key={page}
                    active={page === currentPage}
                    onClick={() => handlePageChange(page)}
                >
                    {page}
                </Pagination.Item>
            );
        }

        // Show ellipsis if needed after the current range
        if (currentPage + range < totalPages - 1) {
            items.push(<Pagination.Ellipsis key="ellipsis-end" disabled />);
        }

        // Show the last page
        if (totalPages > 1) {
            items.push(
                <Pagination.Item
                    key={totalPages}
                    active={totalPages === currentPage}
                    onClick={() => handlePageChange(totalPages)}
                >
                    {totalPages}
                </Pagination.Item>
            );
        }

        return items;
    };

    const getProductTable = () => {
        const data_list = product_list?.data.map((data: any) => {
            return (
                <tr>
                    <td>{data.id}</td>
                    <td>{data.name}</td>
                    <td>{data.cost_price}</td>
                    <td>{data.selling_price}</td>
                    <td>{data.category}</td>
                    <td>{data.stock_available}</td>
                    <td>{data.units_sold}</td>
                    <td>{data.demand_forecast}</td>
                    <td>{data.optimized_price}</td>
                    {/* <td>
                        {data.forecast_updated_at ? new Date(data.forecast_updated_at).toLocaleDateString("en-CA"): "-"}
                    </td> */}
                    <td>
                        {new Date(data.created_at).toLocaleDateString("en-CA")}
                    </td>
                    <td>
                        {new Date(data.updated_at).toLocaleDateString("en-CA")}
                    </td>
                </tr>
            );
        });

        return (
            <div className="table_container">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Product Id</th>
                            <th>Product Name</th>
                            <th>Cost Price</th>
                            <th>Selling Price</th>
                            <th>Category</th>
                            <th>Stock Available</th>
                            <th>Units Sold</th>
                            <th>Demand</th>
                            <th>Optimized Price</th>
                            {/* <th>Forecasted</th> */}
                            <th>Created</th>
                            <th>Updated</th>
                        </tr>
                    </thead>
                    <tbody>{data_list}</tbody>
                </Table>
                {/* Pagination */}
                <Pagination>
                    <Pagination.First onClick={() => handlePageChange(1)} />
                    <Pagination.Prev
                        onClick={() =>
                            handlePageChange(Math.max(currentPage - 1, 1))
                        }
                        disabled={currentPage === 1}
                    />

                    {/* Dynamic pagination items with ellipsis */}
                    {renderPaginationItems()}

                    <Pagination.Next
                        onClick={() =>
                            handlePageChange(
                                Math.min(currentPage + 1, totalPages)
                            )
                        }
                        disabled={currentPage === totalPages}
                    />
                    <Pagination.Last
                        onClick={() => handlePageChange(totalPages)}
                    />
                </Pagination>
            </div>
        );
    };

    return (
        <div className="page_container">
            <div className="product_container">
            
            {getProductTable()}
            </div>
           
        </div>
    );
}

export default ProductTablePage;
