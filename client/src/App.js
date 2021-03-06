import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import Navbar from "react-bootstrap/Navbar";
import Badge from "react-bootstrap/Badge";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import { useContext, useState } from "react";
import { Store } from "./Store";
import CartScreen from "./screens/CartScreen";
import SigninScreen from "./screens/SigninScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import SignupScreen from "./screens/SignupScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PrescriptionScreen from "./screens/PrescriptionScreen";
import SearchBox from "./components/SearchBox";
import SearchScreen from "./screens/SearchScreen";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardScreen from "./screens/DashboardScreen";
import AdminRoute from "./components/AdminRoute";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import MapScreen from "./screens/MapScreen";
import logo from "./assets/logo.png";
import About from "./components/About/About";
import Footer from "./components/Footer/footer";
import Uploads from "./components/Uploads";
import profileimage from "./assets/profileimage.png";
import iconadmin from "./assets/icon-admin.png";
import cartimg from "./assets/cart.png";
import "./index.css";

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { fullBox, cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
    window.location.href = "/signin";
  };
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  // const [categories, setCategories] = useState([]);

  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       const endpoint = `/api/products/categories`
  //       const { data } = await axiosGet(endpoint);
  //       setCategories(data);
  //     } catch (err) {
  //       toast.error(getError(err));
  //     }
  //   };
  //   fetchCategories();
  // }, []);
  return (
    <BrowserRouter>
      <div
        className={
          sidebarIsOpen
            ? fullBox
              ? "site-container active-cont d-flex flex-column full-box"
              : "site-container active-cont d-flex flex-column"
            : fullBox
            ? "site-container d-flex flex-column full-box"
            : "site-container d-flex flex-column"
        }
      >
        <ToastContainer position="bottom-center" limit={1} />
        <header>
          <Navbar
            className="navbar"
            expand="lg"
            fixed="top"
            style={{ zIndex: 100 }}
          >
            <Container fluid>
              <LinkContainer to="/">
                <Navbar.Brand className="mx-5" href="#home">
                  <img className="logo" src={logo} alt="" />
                </Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <SearchBox />
                <Nav
                  className="me-auto mx-auto my-2 my-lg-0"
                  style={{ fontSize: "1.2rem" }}
                >
                  <Nav.Link style={{ marginLeft: "200px" }} href="/">
                    Home
                  </Nav.Link>
                  <Nav.Link href="/#glasses">Glasses</Nav.Link>
                  <Nav.Link href="/upload">Virtual Optician</Nav.Link>
                  <Nav.Link href="/about">About</Nav.Link>
                  <Link to="/cart" className="nav-link">
                    <img src={cartimg} alt="" />

                    {cart.cartItems.length > 0 && (
                      <Badge pill bg="danger">
                        {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                      </Badge>
                    )}
                  </Link>

                  {userInfo ? (
                    userInfo.isAdmin ? (
                      <>
                        <div className="image-container">
                          <img src={iconadmin} alt="" />
                        </div>

                        <NavDropdown
                          style={{ fontWeight: "bold" }}
                          title="Admin"
                          id="admin-nav-dropdown"
                        >
                          <LinkContainer to="/admin/dashboard">
                            <NavDropdown.Item>Dashboard</NavDropdown.Item>
                          </LinkContainer>
                          <LinkContainer to="/admin/products">
                            <NavDropdown.Item>Products</NavDropdown.Item>
                          </LinkContainer>
                          <LinkContainer to="/admin/orders">
                            <NavDropdown.Item>Orders</NavDropdown.Item>
                          </LinkContainer>
                          <LinkContainer to="/admin/users">
                            <NavDropdown.Item>Users</NavDropdown.Item>
                          </LinkContainer>
                          <NavDropdown.Divider />
                          <Link
                            className="dropdown-item"
                            to="#signout"
                            onClick={signoutHandler}
                          >
                            Sign Out
                          </Link>
                        </NavDropdown>
                      </>
                    ) : (
                      <>
                        <div className="image-container">
                          <img src={profileimage} alt="" />
                        </div>
                        <NavDropdown
                          style={{ fontWeight: "bold" }}
                          title={userInfo.name}
                          id="basic-nav-dropdown"
                        >
                          <LinkContainer to="/profile">
                            <NavDropdown.Item>User Profile</NavDropdown.Item>
                          </LinkContainer>
                          <LinkContainer to="/prescription">
                            <NavDropdown.Item>Prescription</NavDropdown.Item>
                          </LinkContainer>
                          <LinkContainer to="/orderhistory">
                            <NavDropdown.Item>Order History</NavDropdown.Item>
                          </LinkContainer>
                          <NavDropdown.Divider />
                          <Link
                            className="dropdown-item"
                            to="#signout"
                            onClick={signoutHandler}
                          >
                            Sign Out
                          </Link>
                        </NavDropdown>
                      </>
                    )
                  ) : (
                    <Link className="nav-link" to="/signin">
                      Sign In
                    </Link>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>

        <main>
          <Routes>
            <Route
              path="/product/:slug"
              element={
                <Container className="mt-3">
                  <ProductScreen />
                </Container>
              }
            />
            <Route
              path="/upload/*"
              element={
                <Container className="mt-3">
                  <Uploads />{" "}
                </Container>
              }
            />
            <Route
              path="/about"
              element={
                <Container className="mt-3">
                  <About />
                </Container>
              }
            />
            <Route
              path="/cart"
              element={
                <Container className="mt-3">
                  <CartScreen />
                </Container>
              }
            />
            <Route path="/search" element={<SearchScreen />} />
            <Route path="/signin" element={<SigninScreen />} />
            <Route path="/signup" element={<SignupScreen />} />
            <Route
              path="/prescription"
              element={
                <Container className="mt-3">
                  <ProtectedRoute>
                    <PrescriptionScreen />
                  </ProtectedRoute>
                </Container>
              }
            />
            <Route
              path="/profile"
              element={
                <Container className="mt-3">
                  <ProtectedRoute>
                    <ProfileScreen />
                  </ProtectedRoute>
                </Container>
              }
            />
            <Route
              path="/map"
              element={
                <ProtectedRoute>
                  <MapScreen />
                </ProtectedRoute>
              }
            />
            <Route
              path="/placeorder"
              element={
                <Container className="mt-3">
                  <PlaceOrderScreen />
                </Container>
              }
            />
            <Route
              path="/order/:id"
              element={
                <Container className="mt-3">
                  <ProtectedRoute>
                    <OrderScreen />
                  </ProtectedRoute>
                </Container>
              }
            ></Route>
            <Route
              path="/orderhistory"
              element={
                <Container className="mt-3">
                  <ProtectedRoute>
                    <OrderHistoryScreen />
                  </ProtectedRoute>
                </Container>
              }
            ></Route>
            <Route
              path="/shipping"
              element={
                <Container className="mt-3">
                  <ShippingAddressScreen />
                </Container>
              }
            ></Route>
            <Route
              path="/payment"
              element={
                <Container className="mt-3">
                  <PaymentMethodScreen />
                </Container>
              }
            ></Route>
            {/* Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <Container className="mt-3">
                  <AdminRoute>
                    <DashboardScreen />
                  </AdminRoute>
                </Container>
              }
            ></Route>
            <Route
              path="/admin/orders"
              element={
                <Container className="mt-3">
                  <AdminRoute>
                    <OrderListScreen />
                  </AdminRoute>
                </Container>
              }
            ></Route>
            <Route
              path="/admin/users"
              element={
                <Container className="mt-3">
                  <AdminRoute>
                    <UserListScreen />
                  </AdminRoute>
                </Container>
              }
            ></Route>
            <Route
              path="/admin/products"
              element={
                <Container className="mt-3">
                  <AdminRoute>
                    <ProductListScreen />
                  </AdminRoute>
                </Container>
              }
            ></Route>
            <Route
              path="/admin/product/:id"
              element={
                <Container className="mt-3">
                  <AdminRoute>
                    <ProductEditScreen />
                  </AdminRoute>
                </Container>
              }
            ></Route>
            <Route
              path="/admin/user/:id"
              element={
                <Container className="mt-3">
                  <AdminRoute>
                    <UserEditScreen />
                  </AdminRoute>
                </Container>
              }
            ></Route>

            <Route path="/" element={<HomeScreen />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
