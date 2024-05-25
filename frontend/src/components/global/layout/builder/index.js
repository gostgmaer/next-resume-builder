
import { Fragment } from "react";

const BuilderLayout = ({ children }) => {
    return (
        <div className="text-white min-h-screen flex  justify-center items-start">
        <div className="w-4/5 m-auto">
            <div className="bg-white flex justify-center text-black rounded p-5" >
                {children}
            </div>
        </div>
    </div>
    );
};

export default BuilderLayout;
