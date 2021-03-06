import React, { SFC, useState, useEffect, createContext } from 'react';
import { Redirect, Route, RouteComponentProps, Switch, withRouter } from 'react-router';
import { useGetCartForCartContainerQuery } from './graphqlTypes';
import { HomeContainer } from './home/HomeContainer';
import CartContainer from './cart/CartContainer';
import { CheckoutContainer } from './checkout/CheckoutContainer';
import { OrderConfirmationPage } from './order_confirmation/OrderConfirmationPage';
import { ErrorPage } from './error/ErrorPage';
import { Header } from './Header';
import { Footer } from './Footer';
import { Navbar } from './navbar/Navbar';
import { ProductInfoFragment, CartItem } from '../client/graphqlTypes';
import Modal from '../client/modal/Modal';
import gql from 'graphql-tag';

gql`
    query GetCartForCartContainer {
        cart {
            productId
            quantity
        }
    }
`;

interface ModalContextState {
    openModal: (modalName: string) => void;
    closeModal: () => void;
    setSelectedProduct: (product: ProductInfoFragment) => void;
    setFlashMessage: (flashMessage: string) => void;
    flashMessage: string;
    modalIsShowing: boolean;
    selectedProduct: ProductInfoFragment;
    displayedModal: string;
}

interface CartContextState {
	cart: CartItem[];
	fetchCart: () => void;
}

interface HomepageContextState {
	countyFilter: string;
	categoryFilter: string;
	setCountyFilter: (filter: string) => void;
	setCategoryFilter: (filter: string) => void;
}

export const ModalContext = createContext<ModalContextState>({
    openModal: (modalName) => null,
    closeModal: () => null,
    setSelectedProduct: (product)=>null,
    setFlashMessage: (flashMessage) => null,
    flashMessage: "",
    modalIsShowing: false,
    selectedProduct: { name: "", id: "", size: "", material: "", description: "", styleNumber: "", imageUrl: ""},
    displayedModal: ""
});

export const CartContext = createContext<CartContextState>({
	cart: [],
	fetchCart: () => null
});

export const HomepageContext = createContext<HomepageContextState>({
	countyFilter: "default",
	categoryFilter: "default",
	setCountyFilter: (filter) => null,
	setCategoryFilter: (filter) => null
});

interface InternalAppContainerProps extends RouteComponentProps {}

const InternalAppContainer: SFC<InternalAppContainerProps> = (props) => {

	const { data, refetch } = useGetCartForCartContainerQuery();
	const cartData = data?.cart;
	const [modalIsShowing, setModalIsShowing] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState({ name: "", id: "", size: "", material: ""} );
    const [displayedModal, setDisplayedModal] = useState("");
	const [flashMessage, setFlashMessage] = useState("");
	const [cart, setCart] = useState(cartData);
	const [countyFilter, setCountyFilter] = useState("default");
	const [categoryFilter, setCategoryFilter] = useState("default");
	
	useEffect(() => {
		if (cartData != cart){
			setCart(cartData);
		}
	}, [cartData])

	if (!cart) return null;

    return (
			<>
				<CartContext.Provider value={{
					cart: cart,
					fetchCart: ()=>refetch()
				}}>
					<ModalContext.Provider value={{
						openModal: (modalName)=>{setDisplayedModal(modalName);setModalIsShowing(true);},
						closeModal: ()=>setModalIsShowing(false),
						setSelectedProduct: (selectedProduct: ProductInfoFragment)=>setSelectedProduct(selectedProduct),
						setFlashMessage: (message)=>setFlashMessage(message),
						flashMessage: flashMessage,
						modalIsShowing: modalIsShowing,
						selectedProduct: selectedProduct,
						displayedModal: displayedModal
					}}>
						<HomepageContext.Provider value={{
							countyFilter: countyFilter,
							categoryFilter: categoryFilter,
							setCountyFilter: (filter) => setCountyFilter(filter),
							setCategoryFilter: (filter) => setCategoryFilter(filter)
						}}>
							<Modal />
							<Header />
							<Switch>
								<Route path="/home" component={HomeContainer} />
								<Route path="/cart" component={CartContainer} />
								<Route path="/checkout" component={CheckoutContainer} />
								<Route path="/order-confirmation" component={OrderConfirmationPage} />
								<Route exact path="/error" component={ErrorPage} />
								<Route path="/contact">
									<Navbar />
								</Route>
								<Route path="*">
									<Redirect to="/home" />
								</Route>
							</Switch>
							<Footer />
						</HomepageContext.Provider>
					</ModalContext.Provider>
				</CartContext.Provider>
			</>
		);
}

export const AppContainer = withRouter(InternalAppContainer);
