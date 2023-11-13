import { useState } from 'react'
import { Outlet, NavLink, useLocation, Link } from 'react-router-dom'
import {
    MDBTypography,
    MDBContainer,
    MDBCollapse,
    MDBNavbarToggler,
    MDBNavbarItem,
    MDBNavbarNav,
    MDBIcon,
    MDBNavbar,
    MDBNavbarBrand,
} from 'mdb-react-ui-kit'

const Root = () => {
    const [openNav, setOpenNav] = useState(false)

    return (
        <div style={{ height: '100vh' }}>
            {useLocation().pathname === '/' ? (
                <MDBContainer
                    className="d-flex align-items-center justify-content-center"
                    style={{ height: '100%' }}
                >
                    <NavLink
                        to="/krasnoe-bedstvie"
                        className="nav-link hover-shadow nav-card "
                    >
                        <div className="bg-image">
                            <img
                                src="/images/HIJyR8H7a2Q.jpg"
                                className="img-fluid"
                                alt="Красное бедствие"
                            />
                            <div className="mask custom-mask">
                                <div className="d-flex justify-content-center align-items-center h-100">
                                    <MDBTypography
                                        tag="h3"
                                        className="text-center m-2 text-white "
                                    >
                                        Красное бедствие
                                    </MDBTypography>
                                </div>
                            </div>
                        </div>
                    </NavLink>
                </MDBContainer>
            ) : (
                <div>
                    <MDBNavbar expand="lg" light bgColor="light">
                        <MDBContainer fluid>
                            <MDBNavbarBrand tag={Link} to="/">
                                <i className="fas fa-house"></i>
                            </MDBNavbarBrand>
                            <MDBNavbarToggler
                                type="button"
                                aria-expanded="false"
                                aria-label="Toggle navigation"
                                onClick={() => setOpenNav(!openNav)}
                            >
                                <MDBIcon icon="bars" fas />
                            </MDBNavbarToggler>
                            <MDBCollapse
                                navbar
                                open={openNav}
                                className="me-auto mb-2 mb-lg-0"
                            >
                                <MDBNavbarNav>
                                    <MDBNavbarItem>
                                        <NavLink
                                            to="/krasnoe-bedstvie"
                                            className="nav-link"
                                        >
                                            Красное бедствие
                                        </NavLink>
                                    </MDBNavbarItem>
                                    <MDBNavbarItem>
                                        <NavLink
                                            to="/vzvod"
                                            className="nav-link"
                                        >
                                            Мрачный взвод
                                        </NavLink>
                                    </MDBNavbarItem>
                                </MDBNavbarNav>
                            </MDBCollapse>
                        </MDBContainer>
                    </MDBNavbar>
                    <Outlet />
                </div>
            )}
        </div>
    )
}

export default Root
