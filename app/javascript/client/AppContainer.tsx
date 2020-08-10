import React, { SFC, useState, createContext } from 'react';
import { Redirect, Route, RouteComponentProps, Switch, withRouter } from 'react-router';
import { HomeContainer } from './home/HomeContainer';
import { CartContainer } from './cart/CartContainer';
import { CheckoutContainer } from './checkout/CheckoutContainer';
import { OrderConfirmationPage } from './order_confirmation/OrderConfirmationPage';
import { ErrorPage } from './error/ErrorPage';
import { Header } from './Header';
import { Footer } from './Footer';
import Modal from '../client/modal/Modal';
import { ProductInfoFragment } from '../client/graphqlTypes';
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
	cart: {};
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
	cart: {}
});

interface InternalAppContainerProps extends RouteComponentProps {}

const InternalAppContainer: SFC<InternalAppContainerProps> = (props) => {

	const [modalIsShowing, setModalIsShowing] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState({ name: "", id: "", size: "", material: ""} );
    const [displayedModal, setDisplayedModal] = useState("");
	const [flashMessage, setFlashMessage] = useState("");
	const [cart, setCart] = useState({});

    return (
			<>
				<CartContext.Provider value={{
					cart: cart
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
					<Modal />
				<Header />
				<Switch>
					<Route path="/home" component={HomeContainer} />
					<Route path="/cart" component={CartContainer} />
					<Route path="/checkout" component={CheckoutContainer} />
					<Route path="/order-confirmation" component={OrderConfirmationPage} />
					<Route exact path="/error" component={ErrorPage} />
					<Route path="*">
						<Redirect to="/home" />
					</Route>
				</Switch>
				<Footer />
				</ModalContext.Provider>
				</CartContext.Provider>
			</>
		);
}

export const AppContainer = withRouter(InternalAppContainer);
