import { ToastContainer } from "react-toastify"

const Layout = ({children}) => {
    return (
        <div className="container-fluid m-0 p-0 w-100">
            <div>
                <div className="row no-gutters justify-content-center m-0 p-0">
                    <div className="col-12 col-md-10 col-lg-9 m-0 p-0">
                        <div className="bg-white p-4 custom-box custom-shadow my-4">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer hideProgressBar />
        </div>
    )
}

export default Layout