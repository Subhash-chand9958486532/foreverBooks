import React, { createContext, useEffect, useState } from "react";
import Loader from "../Loader";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import HelpIcon from '@mui/icons-material/Help';

export const Context = createContext();

export default function Store({ children }) {
    const [loaderCom, setLoaderCom] = useState(false)
    const [loginStatusPop, setLoginStatusPop] = useState(false)
    const [logSucc, setLogSucc] = useState({ status: false, msg: "" })
    const [logErro, setLogErr] = useState({ status: false, msg: "" })
    const token = "books002";
    const apiBase = "https://books.foreverbooks.co.in/laravel_api/api/";
    const productPath = "https://books.foreverbooks.co.in/laravel_api/assets/productImg/";
    const [cartList, setCartList] = useState([])
    const [cartListOff, setCartListOff] = useState([])
    const [noCartData, setnoCartData] = useState(false);
    const [isCartData, setisCartData] = useState(true);
    const [num, setNum] = useState()
    const [numOff, setNumOff] = useState()
    const [noRecord, setnoRecord] = useState(false)

    const [machineIdSta, setMachineId] = useState();
    const [alertMsg, setAlertMsg] = useState(false);
    const [notAllo, SetnotAllo] = useState(false);
    const [errSms, SeterrSms] = useState({ status: false, msg: "" });
    const [confirmPop, setConfirmPop] = useState(false);
    const [userAddress, setuserAddress] = useState([])
    const [userDel, setUserDet] = useState({ data: null, index: 0 });
    const [cartListIds, setCartListIds] = useState();
    const [addressIDS, setAddressIDS] = useState({ index: 0 });
    // var
    let addResIDs = ''
    let productAmount = 0;
    let quantity = 0;
    let totalAmount = 0;
    const discount = 0;
    let discountedAmt = 0;
    let grandTotal = 0;
    
    const [userData, setUserData] = useState({
        isLogin: false,
        customer_id: "",
        firstname: "",
        lastname: "",
        email: "",
        contact_no: "",
        token: token
    });

    useEffect(() => {
        getShipingCharge()
        getMachineId();
        getTotal();
        let userData = localStorage.getItem("token");
        // console.log(userData, 'first')
        if (userData != undefined) {
            userData = JSON.parse(userData);
            // console.log(userData)
            setUserData({
                isLogin: true,
                customer_id: userData.data.customer_id,
                firstname: userData.data.firstname,
                lastname: userData.data.lastname,
                email: userData.data.email,
                contact_no: userData.data.contact_no,
                token: token
            })
        }
    }, [])



    useEffect(() => {
        if (machineIdSta !== "") {
            getCartList();
        }
    }, [machineIdSta])

    useEffect(() => {
        if (userData.customer_id !== "") {
            getUserProfile();
            getSaveAddress();
            getOrderListData();
            getWishListFun();
           
        }
    }, [userData.customer_id])

    function getMachineId() {
        let machineId = localStorage.getItem('MachineId');
        if (machineId) {
            setMachineId(machineId)
        }
        if (!machineId) {
            machineId = crypto.randomUUID();
            localStorage.setItem('MachineId', machineId);
        }
        return machineId;
    }


    function login(data) {

        const token = "books002"
        setLoaderCom(true);
        fetch(apiBase + 'login', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then((userData) => {
                if (userData.status == "success") {
                    setUserData({
                        isLogin: true,
                        customer_id: userData.data.customer_id,
                        firstname: userData.data.firstname,
                        lastname: userData.data.lastname,
                        email: userData.data.email,
                        contact_no: userData.data.contact_no,
                        token: token

                    })
                    localStorage.setItem("token", JSON.stringify(userData))
                    setLogSucc((prev) => {
                        return { ...prev, status: true, msg: userData.message }
                    })
                    setLoginStatusPop(false);
                    setLoginStatusPop(true);
                    setLoaderCom(false);
                    setLogErr(false)
                    setTimeout(() => {
                        setLoginStatusPop(false);
                        window.location.href = "/cart"
                    }, 1000)

                } else {
                    setLoginStatusPop(true);
                    setLogErr((prev) => {
                        return { ...prev, status: true, msg: userData.message }
                    })
                }

            })
            .catch((catch_err) => {
                alert(catch_err)
            })
            .finally(() => {
                setLoaderCom(false);
            })
    }
    function logout() {

    }
    function hideLogPop() {
        setLoginStatusPop(false);
    }

    // cart list api start
    function getCartList() {
        if (userData.isLogin) {
            setLoaderCom(true)
            const postData = {
                "customer_id": userData.customer_id,
                "session_id": machineIdSta,
                "token": token,
            }

            fetch(apiBase + 'cartList', {
                method: "POST",
                body: JSON.stringify(postData),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
                .then(response => response.json())
                .then((cartData) => {
                    if (cartData.status == "success") {
                        setCartList(cartData.data);
                        const totalItem = cartData.data.length;
                        const crtIds = cartData.data.cart_id;
                        setCartListIds(crtIds)
                        setNum(totalItem);
                    } else {
                        // alert(cartData.message,  "else")
                    }
                })
                .catch((error) => {
                    alert(error.message, "cat")
                })
                .finally(() => {
                    setLoaderCom(false)
                })
        }

        else {
            setLoaderCom(true)
            const postData = {
                "session_id": machineIdSta,
                "token": token,
                "quantity": 1
            }
            fetch(apiBase + 'cartList', {
                method: "POST",
                body: JSON.stringify(postData),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
                .then(response => response.json())
                .then((cartData) => {
                    if (cartData.status == "success") {
                        setCartListOff(cartData.data);
                        const totalItem = cartData.data.length;
                        const crtIds = cartData.data.cart_id;
                        setCartListIds(crtIds)
                        setNum(totalItem);
                    } else {
                    }
                })
                .catch((error) => {
                    alert(error.message)
                })
                .finally(() => {
                    setLoaderCom(false)
                })
        }

    }
    // cart list api end

    // add More quantity start
    function increMent(item) {
        if (userData.isLogin) {
            const productIds = item.product_id;
            const proDeseIds = item.product_desc_id;
            const quantityNum = item.quantity;
            setLoaderCom(true);
            const postData = {
                "token": token,
                "customer_id": userData.customer_id,
                "session_id": machineIdSta,
                "product_id": productIds,
                "product_desc_id": proDeseIds,
                "quantity": 1
            }
            fetch(apiBase + 'addToCart', {
                method: "POST",
                body: JSON.stringify(postData),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
                .then(response => response.json())
                .then((cartData) => {
                    if (cartData.status == "success") {
                        setLoaderCom(false);
                        getCartList();
                    } else {
                        setAlertMsg(true);
                        SetnotAllo(false)
                        SeterrSms((prev) => {
                            return { ...prev, status: true, msg: cartData.message }
                        })
                    }
                })
                .catch((error) => {
                    alert(error.message)
                })
                .finally(() => {
                    setLoaderCom(false);
                })
        } else {
            const productIds = item.product_id;
            const proDeseIds = item.product_desc_id;
            const quantityNum = item.quantity;
            setLoaderCom(true);
            const postData = {
                "token": token,
                "session_id": machineIdSta,
                "product_id": productIds,
                "product_desc_id": proDeseIds,
                "quantity": 1
            }
            fetch(apiBase + 'addToCart', {
                method: "POST",
                body: JSON.stringify(postData),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
                .then(response => response.json())
                .then((cartData) => {
                    if (cartData.status == "success") {
                        setLoaderCom(false);
                        getCartList();
                    } else {
                        setAlertMsg(true);
                        SetnotAllo(false)
                        SeterrSms((prev) => {
                            return { ...prev, status: true, msg: cartData.message }
                        })
                    }
                })
                .catch((error) => {
                    alert(error.message)
                })
                .finally(() => {
                    setLoaderCom(false);
                })
        }
    }
    // add More quantity end

    //  less quantity start
    function dicreMent(item) {
        let qua = item.quantity;
        if (qua <= 1) {
            setAlertMsg(true);
            SetnotAllo(true)
            SeterrSms(false)
        } else {
            const crtIDs = item.cart_id;
            setLoaderCom(true);
            const postData = {
                "token": token,
                "cart_id": crtIDs,
            }
            fetch(apiBase + 'removeSingleItemFromCart', {
                method: "POST",
                body: JSON.stringify(postData),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
                .then(response => response.json())
                .then((cartData) => {
                    if (cartData.status == "success") {
                        setLoaderCom(false);
                        getCartList();
                    } else {
                        alert(cartData.message)
                    }
                })
                .catch((error) => {
                    alert(error.message)
                })
                .finally(() => {
                    setLoaderCom(false);
                })
        }

    }
    //  less quantity end
    // remove single item fun start
    function removeItem(Pids) {
        setLoaderCom(true)
        const cartIds = Pids;
        const apiUrl = 'https://books.foreverbooks.co.in/laravel_api/api/removeProductFromCart';
        const postData = {
            "token": token,
            "cart_id": cartIds,
        }
        console.log(postData, "subhash")
        fetch(apiUrl, {
            method: "post",
            body: JSON.stringify(postData),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then((sinItem) => {
                if (sinItem.status == "success") {
                    getCartList();
                } else {
                    alert(sinItem.message)
                }
            })
            .finally(() => {
                setLoaderCom(false);
            })
    }
    // remove single item fun end

    // remove all product start


    function confirm() {
        setLoaderCom(true);
        const cartListApi = "https://books.foreverbooks.co.in/laravel_api/api/removeAllItemsFromCart";
        const postData = {
            "token": token,
            "customer_id": userData.customer_id,
            "session_id": machineIdSta,
        }
        console.log(postData, "!!!!")
        fetch(cartListApi, {
            method: "post",
            body: JSON.stringify(postData),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(responce => responce.json())
            .then((allItemDta) => {
                if (allItemDta.status == "success") {
                    setConfirmPop(false);
                    getCartList();
                    setTimeout(() => {
                        window.location.reload();
                    }, 100)
                    setnoCartData(true)
                    setisCartData(false)
                } else {
                    alert(allItemDta.message)

                }
            })
            .finally(() => {
                setLoaderCom(false);
            })
    }
    // remove all product start

    function cancelPop() {
        setConfirmPop(false);
    }
    function removeAll() {
        setConfirmPop(true);
    }


    // hide Understand start
    function Understand() {
        setAlertMsg(false)
    }

    function getTotal() {
        if (userData.isLogin) {
            cartList.map((item) => {
                productAmount = (productAmount = item.getProductDesc[0].product_sale_price);
                quantity = (quantity = item.quantity)
                //  productAmount * quantity
                totalAmount += productAmount * quantity;
            });
            discountedAmt = totalAmount * discount / 100;
            grandTotal = totalAmount - (totalAmount * discount / 100);
        } else {
            cartListOff.map((item) => {
                productAmount = (productAmount = item.getProductDesc[0].product_sale_price);
                quantity = (quantity = item.quantity)
                //  productAmount * quantity
                totalAmount += productAmount * quantity;
            });
            discountedAmt = totalAmount * discount / 100;
            grandTotal = totalAmount - (totalAmount * discount / 100);
        }
    }

    function getSaveAddress() {
        const postData = {
            "customer_id": userData.customer_id,
            "token": token,
        }

        if (userData.customer_id !== "") {
            fetch(apiBase + 'getSavedAddress', {
                method: "POST",
                body: JSON.stringify(postData),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
                .then(response => response.json())
                .then((userAddre) => {
                    if (userAddre.status == "success") {
                        if (userAddre.data !== '') {
                            setAddressIDS(userAddre?.data[0]?.address_id)
                            setuserAddress(userAddre.data);
                        }
                        setUserDet((prev) => {
                            return { ...prev, data: userAddre.data, index: 0 }
                        })
                    } else {
                        alert(userAddre.message)
                    }
                })
                .catch((error) => {
                    alert(error.message)
                })
        }

    }

    // delete save address fun 
    function deleteSaveAddressFun(addIds) {
        let addressIds = addIds
        setLoaderCom(true)
        const postData = {
            "address_id": addressIds,
            "token": token,
        }
        fetch(apiBase + 'removeAddress', {
            method: "POST",
            body: JSON.stringify(postData),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then((delAddre) => {
                if (delAddre.status == "success") {
                    getSaveAddress()
                    setLoaderCom(false)
                } else {
                    alert(delAddre.message);
                }
            })
            .catch((error) => {
                alert(error.message)
            })
            .finally(() => {
                setLoaderCom(false)
            })
    }

    // select address
    function selectAddress(alldata, key) {
        addResIDs = alldata.address_id;
        console.log(addResIDs, "Address")
        setAddressIDS(addResIDs)
        let indexNo = key;
        setUserDet((prev) => {
            return { ...prev, index: indexNo }
        })
        getShipingCharge();

    }

    let cartIds = []
    for (let cart of cartList) {
        cartIds.push(cart.cart_id)
    }


    let ProDuctIdsInCart = []
    for (let cart of cartList) {
        ProDuctIdsInCart.push(cart.product_id)
    }

    // get user profile Data fun
    const [userProData, setUserProData] = useState([]);
    function getUserProfile() {
        const xdata = {
            "customer_id": userData.customer_id,
            "token": token
        }

        fetch(apiBase + 'getCustomerProfileData', {
            method: "POST",
            body: JSON.stringify(xdata),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then((proData) => {
                if (proData.status == "success") {
                    setUserProData(proData.data)
                } else {
                    alert(proData.message);
                }
            })
            .catch((error) => {
                alert(error.message)
            })

    }
    // edit profile fun


    // orderList fun
    const [orderLIST, setorderLIST] = useState([])
    function getOrderListData() {
        const xdata = {
            "customer_id": userData.customer_id,
            "token": token
        }
        fetch(apiBase + 'getOrderList', {
            method: "POST",
            body: JSON.stringify(xdata),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then((orderListdt) => {
                if (orderListdt.status == "success") {
                    setorderLIST(orderListdt.data.orders)
                } else {
                    // alert(orderListdt.message);
                }
            })
            .catch((error) => {
                alert(error.message)
            })
    }
    const [wishListData, setwishListData] = useState([])
    function getWishListFun() {
        const xdata = {
            "customer_id": userData.customer_id,
            "token": token,
            "session_id":machineIdSta
        }
        fetch(apiBase + 'getWishList', {
            method: "POST",
            body: JSON.stringify(xdata),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then((orderListdt) => {
                if (orderListdt.status == "success") {
                    setwishListData(orderListdt.data)
                } else {
                    // alert(orderListdt.message);
                }
            })
            .catch((error) => {
                alert(error.message)
            })
    }
    const [gettShip, setShip] = useState()

	function getShipingCharge() {
        setLoaderCom(true)
		const idsAddres = parseInt(addressIDS)
		const postData = {
			"address_id": idsAddres,
			"token": token,
		}
		fetch(apiBase + 'getShippingCharge', {
			method: "POST",
			body: JSON.stringify(postData),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			}
		})
			.then(resp => resp.json())
			.then((shiPdata) => {
				if (shiPdata.status == "success") {
					setShip(shiPdata.shippingCharge);
                    setLoaderCom(false)
				} else {
					// alert(shiPdata.message)
				}
			})
	}

    return (
        <>
            <Context.Provider
                value={
                    {
                        userData: userData,
                        login: login,
                        logout: logout,
                        token: token,
                        apiBase: apiBase,
                        getCartList: getCartList,
                        cartList: cartList,
                        num: num,
                        increMent: increMent,
                        dicreMent: dicreMent,
                        removeItem: removeItem,
                        confirm: confirm,
                        removeAll: removeAll,
                        noCartData: noCartData,
                        isCartData: isCartData,
                        getTotal: getTotal(),
                        productAmount: productAmount,
                        totalAmount: totalAmount,
                        discountedAmt: discountedAmt,
                        grandTotal: grandTotal,
                        getSaveAddress: getSaveAddress,
                        userAddress: userAddress,
                        deleteSaveAddressFun: deleteSaveAddressFun,
                        userDel: userDel,
                        productPath: productPath,
                        cartListIds: cartListIds,
                        selectAddress: selectAddress,
                        addressIDS: addressIDS,
                        machineIdSta: machineIdSta,
                        cartIds: cartIds,
                        ProDuctIdsInCart: ProDuctIdsInCart,
                        cartListOff: cartListOff,
                        numOff: numOff,
                        getUserProfile: getUserProfile,
                        userProData: userProData,
                        orderLIST: orderLIST,
                        wishListData:wishListData,
                        getWishListFun:getWishListFun,
                        setwishListData:setwishListData,
                        gettShip:gettShip,
                        getShipingCharge:getShipingCharge,

                    }
                }
            >
                {children}
            </Context.Provider>
            {loginStatusPop &&
                <>
                    <div className='mainPops '>
                        {logSucc.status &&
                            <div className="innerBoxes animate_animated animate_bounceIn">
                                <div className="logSmsBtn animate_animated animate_rubberBand"><CheckCircleIcon /></div>
                                <div className="alert alert-success py-2 mt-3" role="alert">
                                    {logSucc.msg}
                                </div>
                                <button className="btn btn-outline-success mt-4">Go for Shopping</button>
                            </div>
                        }

                        {logErro.status &&
                            <div className="innerBoxes animate_animated animate_bounceIn">
                                <div className="logSmsBtnErr animate_animated animate_rubberBand"><HighlightOffIcon /></div>
                                <div className="alert alert-danger py-2 mt-3" role="alert">
                                    {logErro.msg}
                                </div>
                                <button className="btn btn-outline-danger mt-4" onClick={hideLogPop}>Understand</button>
                            </div>
                        }
                    </div>
                </>
            }
            {alertMsg &&
                <div className='base'>
                    <div className='innerPop animate__animated animate__zoomIn'>
                        {errSms.status &&
                            <>
                                <div className='error animate__animated animate__bounceIn'><WarningAmberIcon /></div>
                                <h3>Alert</h3>
                                <p className='afretCon'>{errSms.msg}</p>
                            </>
                        }
                        {notAllo &&
                            <>
                                <div className='error animate__animated animate__bounceIn'><WarningAmberIcon /></div>
                                <h3>Alert</h3>
                                <p className='afretCon'>not allowed less then 1</p>
                            </>
                        }
                        <div className='buttonSec animate__animated animate__fadeInDown'>
                            <button className='btn btn-secondary' onClick={Understand}>Understand</button>
                        </div>
                    </div>
                </div>
            }
            {confirmPop &&
                <div className='base'>
                    <div className='innerPop animate__animated animate__zoomIn'>
                        <div className='QuestIcon animate__animated animate__bounceIn'><HelpIcon /></div>
                        <h3>Are you sure.</h3>
                        <p className='afretCon'>After confirmation will remove all item from your cart.</p>
                        <div className='buttonSec animate__animated animate__fadeInDown'>
                            <button className='btn btn-primary' onClick={confirm}>Confirm</button>
                            <button className='btn btn-danger' onClick={cancelPop}>Cancel</button>
                        </div>
                    </div>
                </div>
            }
            {loaderCom &&
                <Loader />
            }
        </>
    );
}