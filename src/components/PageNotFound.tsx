import { FunctionComponent } from "react";

interface PageNotFoundProps {}

const PageNotFound: FunctionComponent<PageNotFoundProps> = () => {
    return (
        <div className="container-fluid d-flex align-items-start justify-content-center vh-100">
            <p className="lilita-one-regular mt-5">Page Not Found 👀 </p>
        </div>
    );
};

export default PageNotFound;
